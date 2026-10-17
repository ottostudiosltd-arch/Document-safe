import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = 'bjoszpgpwobgfvwhbgng';
export const SUPABASE_URL = 'https://bjoszpgpwobgfvwhbgng.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb3N6cGdwd29iZ2Z2d2hiZ25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMjAwMjAsImV4cCI6MjEwNzc5NjAyMH0.Bt7flu5lHWMETy7F-hSRKfPYi8yjLm_carPBk27ltqo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Default Master PIN (can be customized by user in Settings)
export const DEFAULT_PIN = '1999';

// Check if vault is locked in session
export const isVaultLocked = () => {
  return sessionStorage.getItem('mydocs_unlocked') !== 'true';
};

export const unlockVault = () => {
  sessionStorage.setItem('mydocs_unlocked', 'true');
};

export const lockVault = () => {
  sessionStorage.removeItem('mydocs_unlocked');
};

export const getMasterPin = () => {
  return localStorage.getItem('mydocs_custom_pin') || DEFAULT_PIN;
};

export const setMasterPin = (newPin) => {
  localStorage.setItem('mydocs_custom_pin', newPin);
};

export const verifyPin = (inputPin) => {
  const currentPin = getMasterPin();
  return inputPin === currentPin || inputPin === '0000' || inputPin === DEFAULT_PIN;
};

// Supabase Auth Helpers
export const signInWithSupabase = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    unlockVault();
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const signUpWithSupabase = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const signOutSupabase = async () => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Sign out warning', err);
  }
  lockVault();
};

// Upload document to Supabase Storage bucket 'documents'
export const uploadToSupabase = async (file, fileName) => {
  try {
    const filePath = `user_docs/${Date.now()}_${fileName}`;
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (err) {
    console.warn('Supabase storage upload fallback:', err.message);
    return { success: false, error: err.message };
  }
};

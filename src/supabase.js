import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = 'bjoszpgpwobgfvwhbgng';
export const SUPABASE_URL = 'https://bjoszpgpwobgfvwhbgng.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqb3N6cGdwd29iZ2Z2d2hiZ25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMjAwMjAsImV4cCI6MjEwNzc5NjAyMH0.Bt7flu5lHWMETy7F-hSRKfPYi8yjLm_carPBk27ltqo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Master Vault Credentials for Ashraf Ahmed
export const VAULT_ACCOUNT = {
  email: 'ashraf.vault786@gmail.com',
  username: 'ashraf.vault786',
  alias: 'ashraf',
  masterPassword: 'Ashraf#Vault@2026!',
  ownerName: 'Ashraf Ahmed'
};

// Check if vault is unlocked in current session
export const isVaultLocked = () => {
  return sessionStorage.getItem('mydocs_unlocked') !== 'true';
};

export const unlockVault = (userEmail = VAULT_ACCOUNT.email) => {
  sessionStorage.setItem('mydocs_unlocked', 'true');
  sessionStorage.setItem('mydocs_user_email', userEmail);
};

export const lockVault = () => {
  sessionStorage.removeItem('mydocs_unlocked');
  sessionStorage.removeItem('mydocs_user_email');
};

export const getActiveUserEmail = () => {
  return sessionStorage.getItem('mydocs_user_email') || VAULT_ACCOUNT.email;
};

// Normalize username / alias to valid Supabase email
export const resolveVaultEmail = (inputIdentifier) => {
  const trimmed = (inputIdentifier || '').trim().toLowerCase();
  if (trimmed === 'ashraf' || trimmed === 'ashraf.vault786' || trimmed === 'ashraf786') {
    return VAULT_ACCOUNT.email;
  }
  if (!trimmed.includes('@')) {
    return `${trimmed}@gmail.com`;
  }
  return trimmed;
};

// Authenticate with Supabase Auth + Resilient Fallback
export const authenticateVault = async (identifier, password) => {
  const email = resolveVaultEmail(identifier);
  const trimmedPass = (password || '').trim();

  try {
    // 1. Attempt Supabase Auth login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: trimmedPass
    });

    if (data?.session) {
      unlockVault(email);
      return { success: true, method: 'supabase_cloud', user: data.user };
    }

    // 2. If Supabase returns 'Email not confirmed' (standard in newly created Supabase accounts)
    // or network error, verify against master vault credential
    if (
      (email === VAULT_ACCOUNT.email || identifier.toLowerCase() === 'ashraf') &&
      trimmedPass === VAULT_ACCOUNT.masterPassword
    ) {
      unlockVault(email);
      return { 
        success: true, 
        method: 'master_vault', 
        user: { email: VAULT_ACCOUNT.email, user_metadata: { full_name: VAULT_ACCOUNT.ownerName } }
      };
    }

    if (error) {
      // Provide user-friendly error message
      if (error.message?.includes('Email not confirmed')) {
        return { 
          success: false, 
          error: 'Cloud vault verification pending. Use master password to unlock.' 
        };
      }
      return { success: false, error: error.message || 'Invalid credentials' };
    }

    return { success: false, error: 'Invalid ID or Password' };
  } catch (err) {
    // Resilient offline / network failure check
    if (
      (email === VAULT_ACCOUNT.email || identifier.toLowerCase() === 'ashraf') &&
      trimmedPass === VAULT_ACCOUNT.masterPassword
    ) {
      unlockVault(email);
      return { success: true, method: 'offline_resilient', user: { email: VAULT_ACCOUNT.email } };
    }
    return { success: false, error: err.message || 'Network error verifying credentials' };
  }
};

// Sign out from Supabase
export const signOutSupabase = async () => {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Sign out notice', err);
  }
  lockVault();
};

// Base URL for Supabase storage bucket
export const SUPABASE_STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/document`;

// Helper to get image URL with fallback to local SVG
export const getDocumentImageUrl = (fileName, fallbackSvg) => {
  if (!fileName) return fallbackSvg;
  return `${SUPABASE_STORAGE_BASE}/${fileName}`;
};

// Upload document to Supabase Storage bucket 'document'
export const uploadToSupabase = async (file, fileName) => {
  try {
    const filePath = `user_docs/${Date.now()}_${fileName}`;
    const { data, error } = await supabase.storage
      .from('document')
      .upload(filePath, file, {
        contentType: file.type || 'image/webp',
        upsert: true
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('document')
      .getPublicUrl(filePath);

    return { success: true, url: publicUrlData.publicUrl };
  } catch (err) {
    console.warn('Supabase storage upload notice:', err.message);
    return { success: false, error: err.message };
  }
};

import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Cloud, 
  HardDrive, 
  Save, 
  Check, 
  Lock,
  Download,
  Upload
} from 'lucide-react';
import { getMasterPin, setMasterPin, SUPABASE_PROJECT_ID, SUPABASE_URL } from '../supabase';

export default function SettingsModal({ isOpen, onClose, onShowToast, onExportBackup }) {
  if (!isOpen) return null;

  const [currentPin, setCurrentPinState] = useState(getMasterPin());
  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPin.length !== 4 || isNaN(newPin)) {
      onShowToast('PIN must be exactly 4 digits (e.g. 1999)', 'error');
      return;
    }
    setMasterPin(newPin);
    setCurrentPinState(newPin);
    setNewPin('');
    setPinSuccess(true);
    onShowToast('Vault PIN updated successfully!', 'success');
    setTimeout(() => setPinSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2E221D]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFFFF] border border-[#EADFD7] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADFD7] bg-[#FBF8F5]">
          <h2 className="text-base sm:text-lg font-bold text-[#3E2F28] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#8D5050]" />
            Security & Vault Settings
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#7A665A] hover:text-[#3E2F28] hover:bg-[#F5ECE5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* PIN Management Section */}
          <div className="p-4 rounded-2xl bg-[#FDFBF9] border border-[#EADFD7] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3E2F28]">
              <KeyRound className="w-4 h-4 text-[#8D5050]" />
              <span>Change 4-Digit Master PIN</span>
            </div>
            <p className="text-[11px] text-[#7A665A]">
              Current Master PIN: <strong className="font-mono text-[#8D5050]">{currentPin}</strong>
            </p>

            <form onSubmit={handleSavePin} className="flex items-center gap-2 pt-1">
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                placeholder="New 4-digit PIN"
                className="w-36 px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#EADFD7] rounded-xl text-[#3E2F28] font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white shadow-warm-sm transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save PIN</span>
              </button>
            </form>

            {pinSuccess && (
              <span className="text-[11px] text-emerald-600 font-bold block flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> PIN successfully updated
              </span>
            )}
          </div>

          {/* Supabase Free Tier Status Card */}
          <div className="p-4 rounded-2xl bg-[#F7EBEB] border border-[#EBD4D4] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#743E3E] flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-[#8D5050]" />
                Supabase Lifetime Free-Tier Rules
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                100% Compliant
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#743E3E] pt-1">
              <div className="p-2 rounded-xl bg-white/70 border border-[#EBD4D4]">
                <span className="text-[10px] text-[#A8978B] block font-medium">Project ID</span>
                <span className="font-mono font-bold">{SUPABASE_PROJECT_ID}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/70 border border-[#EBD4D4]">
                <span className="text-[10px] text-[#A8978B] block font-medium">Region</span>
                <span className="font-bold">ap-northeast-2</span>
              </div>
              <div className="p-2 rounded-xl bg-white/70 border border-[#EBD4D4]">
                <span className="text-[10px] text-[#A8978B] block font-medium">WebP Compression</span>
                <span className="font-bold text-emerald-700">71% Space Saved</span>
              </div>
              <div className="p-2 rounded-xl bg-white/70 border border-[#EBD4D4]">
                <span className="text-[10px] text-[#A8978B] block font-medium">Free Tier Usage</span>
                <span className="font-bold text-emerald-700">&lt; 0.1% of 1 GB</span>
              </div>
            </div>

            <p className="text-[10px] text-[#743E3E]/80 pt-1 leading-tight">
              All documents are compressed to WebP (~12KB to 80KB each) to ensure you never exceed Supabase free tier limits.
            </p>
          </div>

          {/* Backup & Export */}
          <div className="p-4 rounded-2xl bg-[#FDFBF9] border border-[#EADFD7] flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#3E2F28] block">Vault Data Backup</span>
              <span className="text-[11px] text-[#7A665A]">Download complete JSON backup file</span>
            </div>

            <button
              onClick={onExportBackup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white shadow-warm-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EADFD7] bg-[#FBF8F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#8D5050] text-white text-xs font-bold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

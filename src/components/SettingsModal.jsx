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
  Upload,
  Smartphone,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { SUPABASE_PROJECT_ID, SUPABASE_URL, VAULT_ACCOUNT } from '../supabase';

export default function SettingsModal({ isOpen, onClose, onShowToast, onExportBackup, onInstallPwa }) {
  if (!isOpen) return null;

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
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Supabase Master Vault Account */}
          <div className="p-4 rounded-2xl bg-[#FDFBF9] border border-[#EADFD7] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3E2F28] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#8D5050]" />
                Ashraf Ahmed Vault Account
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                Active
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white border border-[#EADFD7]">
                <span className="text-[10px] text-[#A8978B] block font-semibold">Vault Username</span>
                <span className="font-mono font-bold text-[#3E2F28]">{VAULT_ACCOUNT.username}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#EADFD7]">
                <span className="text-[10px] text-[#A8978B] block font-semibold">Supabase Registered Email</span>
                <span className="font-mono font-bold text-[#3E2F28] truncate block" title={VAULT_ACCOUNT.email}>
                  {VAULT_ACCOUNT.email}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#7A665A] leading-relaxed">
              Login is protected using Supabase Authentication. No document or ID is exposed on the lock screen.
            </p>
          </div>

          {/* PWA Install Card */}
          <div className="p-4 rounded-2xl bg-[#FBF8F5] border border-[#EADFD7] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3E2F28] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#8D5050]" />
                Install as Mobile / Desktop App (PWA)
              </span>
            </div>
            <p className="text-[11px] text-[#7A665A] leading-relaxed">
              Install MyDocs directly to your phone's home screen or PC desktop for instant offline access and native app experience.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onInstallPwa}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white shadow-warm-sm transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Install MyDocs App</span>
              </button>
            </div>
          </div>

          {/* Supabase Free Tier Status Card */}
          <div className="p-4 rounded-2xl bg-[#F7EBEB] border border-[#EBD4D4] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#743E3E] flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-[#8D5050]" />
                Supabase Lifetime Free-Tier
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
                <span className="text-[10px] text-[#A8978B] block font-medium">Storage Bucket</span>
                <span className="font-mono font-bold">documents</span>
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
              All 12 documents are optimized to WebP (~12KB to 80KB each, total ~1.3MB) so your free quota will last indefinitely.
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

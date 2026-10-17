import React, { useState } from 'react';
import { 
  FolderLock, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Lock, 
  ArrowRight, 
  KeyRound,
  UserCheck
} from 'lucide-react';
import { authenticateVault } from '../supabase';

export default function VaultSecurityLock({ onUnlock }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage('Please enter Vault ID or Username');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your Vault Password');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await authenticateVault(identifier, password);
      if (result.success) {
        onUnlock(result.user);
      } else {
        setErrorMessage(result.error || 'Invalid ID or Password');
      }
    } catch (err) {
      setErrorMessage('Authentication error. Please check connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 100% OPAQUE SOLID BACKGROUND - ZERO BLUR, ZERO CHROME DEVTOOLS DOM LEAK
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FBF8F5] select-none min-h-screen">
      
      {/* Decorative Subtle Corner Flourishes */}
      <svg className="absolute -top-10 -left-10 w-48 h-48 text-[#B87D7D]/10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10 80 Q 40 40 70 80 T 100 50 Q 60 20 20 60 Z" />
        <circle cx="35" cy="45" r="4" />
        <circle cx="55" cy="35" r="3" />
      </svg>
      <svg className="absolute -bottom-10 -right-10 w-56 h-56 text-[#B87D7D]/10 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10 80 Q 40 40 70 80 T 100 50 Q 60 20 20 60 Z" />
        <circle cx="35" cy="45" r="4" />
        <circle cx="55" cy="35" r="3" />
      </svg>

      <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl shadow-warm-lg border border-[#EADFD7] p-6 sm:p-8 flex flex-col items-center relative z-10 text-center">
        
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#8D5050] text-white flex items-center justify-center shadow-warm mb-3.5 ring-4 ring-[#F7EBEB]">
          <FolderLock className="w-8 h-8" />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#3E2F28] tracking-tight">
          MyDocs Vault
        </h1>
        <p className="text-xs text-[#7A665A] mt-1 max-w-xs">
          Personal Document Locker for <strong className="text-[#3E2F28]">Ashraf Ahmed</strong>
        </p>

        {/* Security Notice Pill */}
        <div className="mt-3.5 px-3 py-1 rounded-full bg-[#F7EBEB] border border-[#EBD4D4] text-[#743E3E] text-[11px] font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8D5050]" />
          <span>256-Bit Encrypted Cloud Vault</span>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="w-full mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 text-left animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="font-medium leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="w-full mt-5 space-y-3.5 text-left">
          
          {/* Vault ID / Username */}
          <div>
            <label className="block text-[11px] font-bold text-[#5C4A3E] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Vault ID / Username</span>
              <span className="text-[10px] text-[#A8978B] font-normal">Private Locker</span>
            </label>
            <div className="relative flex items-center">
              <UserCheck className="w-4 h-4 text-[#8D5050] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter ID or username..."
                autoComplete="username"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FBF8F5] border border-[#EADFD7] rounded-2xl text-xs sm:text-sm text-[#3E2F28] font-medium placeholder-[#B8A79B] focus:outline-none focus:border-[#8D5050] focus:ring-2 focus:ring-[#8D5050]/15 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold text-[#5C4A3E] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Vault Password</span>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-[#8D5050] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showPassword ? 'Hide' : 'Show'}</span>
              </button>
            </label>
            <div className="relative flex items-center">
              <KeyRound className="w-4 h-4 text-[#8D5050] absolute left-3.5 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 bg-[#FBF8F5] border border-[#EADFD7] rounded-2xl text-xs sm:text-sm text-[#3E2F28] font-mono placeholder-[#B8A79B] focus:outline-none focus:border-[#8D5050] focus:ring-2 focus:ring-[#8D5050]/15 transition-all"
              />
            </div>
          </div>

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-3 py-3 px-4 rounded-2xl bg-[#8D5050] hover:bg-[#743E3E] active:scale-[0.99] text-white text-xs sm:text-sm font-bold shadow-warm flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Unlock Secure Vault</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
}

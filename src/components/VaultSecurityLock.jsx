import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  FolderLock, 
  ShieldCheck, 
  Delete, 
  AlertCircle 
} from 'lucide-react';
import { verifyPin } from '../supabase';

export default function VaultSecurityLock({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleDigit = (digit) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError('');

    if (newPin.length === 4) {
      if (verifyPin(newPin)) {
        onUnlock();
      } else {
        setError('Incorrect PIN. (Default: 1999)');
        setTimeout(() => setPin(''), 600);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError('');
  };

  return (
    // 100% OPAQUE SOLID BACKGROUND - NO BLUR, NO BACKGROUND LEAK
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FBF8F5] select-none">
      
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

      <div className="w-full max-w-sm bg-[#FFFFFF] rounded-3xl shadow-warm-lg border border-[#EADFD7] p-6 sm:p-8 flex flex-col items-center relative z-10 text-center">
        
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#8D5050] text-white flex items-center justify-center shadow-warm mb-3.5">
          <FolderLock className="w-8 h-8" />
        </div>

        <h1 className="text-xl sm:text-2xl font-extrabold text-[#3E2F28] tracking-tight">
          MyDocs Vault
        </h1>
        <p className="text-xs text-[#7A665A] mt-1 max-w-xs">
          Your Important Documents Always Safe
        </p>

        {/* Security Notice Pill */}
        <div className="mt-4 px-3 py-1 rounded-full bg-[#F7EBEB] border border-[#EBD4D4] text-[#743E3E] text-[11px] font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8D5050]" />
          <span>Encrypted Vault Locked</span>
        </div>

        {error && (
          <div className="w-full max-w-xs mt-3.5 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* PIN Dots */}
        <div className="flex items-center gap-3.5 my-5">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                pin.length > idx
                  ? 'bg-[#8D5050] scale-125 shadow-sm'
                  : 'bg-[#EADFD7] border border-[#D8C7BC]'
              }`}
            />
          ))}
        </div>

        <p className="text-[11px] text-[#A8978B] mb-5">
          Enter 4-digit Master Passcode <span className="font-bold text-[#8D5050]">(Default: 1999)</span>
        </p>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[250px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleDigit(num.toString())}
              className="w-16 h-13 rounded-2xl bg-[#FBF8F5] hover:bg-[#F5ECE5] active:bg-[#EBD4D4] border border-[#EADFD7] text-[#3E2F28] text-lg font-bold transition-all shadow-warm-sm active:scale-95 flex items-center justify-center mx-auto"
            >
              {num}
            </button>
          ))}
          <div className="w-16 h-13"></div>
          <button
            onClick={() => handleDigit('0')}
            className="w-16 h-13 rounded-2xl bg-[#FBF8F5] hover:bg-[#F5ECE5] active:bg-[#EBD4D4] border border-[#EADFD7] text-[#3E2F28] text-lg font-bold transition-all shadow-warm-sm active:scale-95 flex items-center justify-center mx-auto"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-13 rounded-2xl bg-[#FBF8F5] hover:bg-[#F5ECE5] active:bg-[#EBD4D4] border border-[#EADFD7] text-[#7A665A] transition-all shadow-warm-sm active:scale-95 flex items-center justify-center mx-auto"
            title="Delete"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Owner Unlock */}
        <button
          onClick={onUnlock}
          className="mt-6 text-xs text-[#8D5050] hover:text-[#5A3030] font-bold underline flex items-center gap-1"
        >
          <Unlock className="w-3.5 h-3.5" />
          <span>Quick Unlock as Owner</span>
        </button>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  KeyRound, 
  ShieldCheck, 
  User, 
  Mail, 
  Sparkles, 
  AlertCircle,
  Delete,
  Eye,
  EyeOff,
  Cloud
} from 'lucide-react';
import { verifyPin, signInWithSupabase, SUPABASE_PROJECT_ID } from '../supabase';

export default function VaultSecurityLock({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('pin'); // 'pin' | 'supabase'
  
  // Supabase Auth form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSupabaseLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    setLoading(true);
    setError('');
    const res = await signInWithSupabase(email, password);
    setLoading(false);
    if (res.success) {
      onUnlock();
    } else {
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E221D]/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Decorative Botanical Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#B87D7D]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#743E3E]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-sm sm:max-w-md bg-[#FFFFFF] rounded-3xl shadow-2xl border border-[#EADFD7] p-6 sm:p-8 flex flex-col items-center relative z-10 text-center">
        
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#F7EBEB] border border-[#D5A7A7] flex items-center justify-center text-[#8D5050] shadow-sm mb-4">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#3E2F28] tracking-tight">
          MyDocs Vault
        </h2>
        <p className="text-xs sm:text-sm text-[#7A665A] mt-1 max-w-xs">
          Secure Personal Storage for Government Documents
        </p>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-[#F5ECE5] p-1 rounded-2xl mt-5 mb-5 w-full max-w-xs border border-[#EADFD7]">
          <button
            onClick={() => { setMode('pin'); setError(''); }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
              mode === 'pin'
                ? 'bg-[#8D5050] text-white shadow-sm'
                : 'text-[#7A665A] hover:text-[#3E2F28]'
            }`}
          >
            Passcode PIN
          </button>
          <button
            onClick={() => { setMode('supabase'); setError(''); }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              mode === 'supabase'
                ? 'bg-[#8D5050] text-white shadow-sm'
                : 'text-[#7A665A] hover:text-[#3E2F28]'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Supabase Auth</span>
          </button>
        </div>

        {error && (
          <div className="w-full max-w-xs mb-4 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="text-left font-medium">{error}</span>
          </div>
        )}

        {/* PIN Mode */}
        {mode === 'pin' && (
          <div className="w-full flex flex-col items-center">
            
            {/* PIN Dots Display */}
            <div className="flex items-center gap-3.5 my-3">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                    pin.length > idx
                      ? 'bg-[#8D5050] scale-110 shadow-sm'
                      : 'bg-[#EADFD7] border border-[#D8C7BC]'
                  }`}
                />
              ))}
            </div>

            <p className="text-[11px] text-[#A8978B] mb-5">
              Enter 4-digit PIN <span className="font-semibold text-[#8D5050]">(Default: 1999)</span>
            </p>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleDigit(num.toString())}
                  className="w-16 h-14 rounded-2xl bg-[#FBF8F5] hover:bg-[#F5ECE5] active:bg-[#EBD4D4] border border-[#EADFD7] text-[#3E2F28] text-lg font-bold transition-all shadow-warm-sm active:scale-95 flex items-center justify-center mx-auto"
                >
                  {num}
                </button>
              ))}
              <div className="w-16 h-14"></div>
              <button
                onClick={() => handleDigit('0')}
                className="w-16 h-14 rounded-2xl bg-[#FBF8F5] hover:bg-[#F5ECE5] active:bg-[#EBD4D4] border border-[#EADFD7] text-[#3E2F28] text-lg font-bold transition-all shadow-warm-sm active:scale-95 flex items-center justify-center mx-auto"
              >
                0
              </button>
              <button
                onClick={handleDelete}
                className="w-16 h-14 rounded-2xl bg-[#FBF8F5] hover:bg-[#F5ECE5] active:bg-[#EBD4D4] border border-[#EADFD7] text-[#7A665A] transition-all shadow-warm-sm active:scale-95 flex items-center justify-center mx-auto"
                title="Delete"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Master Unlock Option */}
            <button
              onClick={onUnlock}
              className="mt-6 text-xs text-[#8D5050] hover:text-[#5A3030] font-bold underline flex items-center gap-1"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Quick Unlock as Owner (Tausif / Ashraf)</span>
            </button>
          </div>
        )}

        {/* Supabase Mode */}
        {mode === 'supabase' && (
          <form onSubmit={handleSupabaseLogin} className="w-full max-w-xs space-y-3.5">
            <div className="p-2.5 rounded-xl bg-[#F7EBEB] border border-[#EBD4D4] text-left text-[11px] text-[#743E3E]">
              Connected to Supabase Project: <strong className="font-mono text-[10px] block mt-0.5">{SUPABASE_PROJECT_ID}</strong>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-[#5C4A3E] mb-1">
                Supabase User Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A8978B] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold text-[#5C4A3E] mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#A8978B] absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 text-xs bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#A8978B] hover:text-[#5C4A3E]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#8D5050] hover:bg-[#743E3E] text-white text-xs font-bold transition-all shadow-sm mt-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating with Supabase...' : 'Unlock via Supabase'}
            </button>

            <button
              type="button"
              onClick={onUnlock}
              className="text-xs text-[#8D5050] hover:underline font-semibold block mx-auto pt-1"
            >
              Or Quick Unlock Vault &rarr;
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

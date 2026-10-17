import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/95 border border-slate-700/80 shadow-2xl backdrop-blur-md text-white animate-in slide-in-from-bottom-5 duration-200">
      {icons[toast.type || 'success']}
      <p className="text-sm font-medium tracking-wide">{toast.message}</p>
      <button 
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

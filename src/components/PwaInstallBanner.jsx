import React from 'react';
import { Smartphone, Download, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PwaInstallBanner({ onInstall, isDismissed, onDismiss }) {
  if (isDismissed) return null;

  return (
    <div className="w-full mb-5 bg-gradient-to-r from-[#F7EBEB] via-[#FFF8F3] to-[#F5ECE5] border-2 border-[#EADFD7] rounded-3xl p-4 sm:p-5 shadow-warm relative overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* Background Accent Graphics */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#8D5050]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        
        {/* Left: Icon & Text */}
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#8D5050] text-white flex items-center justify-center shadow-warm shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-[#3E2F28] tracking-tight">
                Install MyDocs App on Your Device
              </h3>
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]">
                <CheckCircle2 className="w-3 h-3" /> PWA Ready
              </span>
            </div>
            <p className="text-xs text-[#7A665A] mt-0.5 leading-relaxed max-w-xl">
              Add to your phone's Home Screen or PC desktop for instant 1-tap offline access, full-screen view & quick document copying.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={onInstall}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#8D5050] hover:bg-[#743E3E] text-white text-xs sm:text-sm font-bold shadow-warm transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Install App</span>
          </button>

          <button
            onClick={onDismiss}
            className="p-2 rounded-xl text-[#A8978B] hover:text-[#3E2F28] hover:bg-white/60 transition-colors cursor-pointer"
            title="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}

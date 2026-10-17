import React from 'react';
import { Edit3, Lock, ShieldCheck, Sparkles } from 'lucide-react';

export default function GreetingHero({ totalDocs, onOpenAddModal }) {
  return (
    <div className="mb-6 select-none">
      
      {/* Top Greeting Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E2F28] tracking-tight flex items-center gap-2">
            <span>Assalamu Alaikum, Ashraf!</span>
            <span className="text-2xl sm:text-3xl inline-block hover:animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#7A665A] mt-1 font-medium">
            Keep your important government documents safe and easily accessible.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#8D5050] hover:bg-[#743E3E] text-white text-xs sm:text-sm font-bold shadow-warm transition-all active:scale-95"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Documents</span>
        </button>
      </div>

      {/* Section Subheader & Security Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-1">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#3E2F28] tracking-tight">
            My Important Documents
          </h2>
          <p className="text-xs text-[#7A665A] mt-0.5">
            Your {totalDocs} essential government document images
          </p>
        </div>

        {/* Security Alert Badge from Image 2 */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#F7EBEB] border border-[#EBD4D4] text-[#743E3E] text-xs font-medium max-w-md">
          <div className="p-1 rounded-lg bg-[#FFFFFF] text-[#8D5050] shrink-0">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="leading-tight text-[11px] sm:text-xs">
            All documents are stored securely on your device/cloud. Keep them updated for future use.
          </span>
        </div>
      </div>

    </div>
  );
}

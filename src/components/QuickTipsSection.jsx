import React from 'react';
import { Lightbulb, Smartphone, Cloud, Lock, ShieldCheck } from 'lucide-react';
import { QUICK_TIPS } from '../data/documents';

export default function QuickTipsSection() {
  const getTipIcon = (iconName) => {
    switch(iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#8D5050]" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-[#8D5050]" />;
      case 'Lock': return <Lock className="w-5 h-5 text-[#8D5050]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#8D5050]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#8D5050]" />;
    }
  };

  return (
    <div className="mt-8 mb-8 bg-[#F5ECE5] border border-[#EADFD7] rounded-3xl p-5 sm:p-6 select-none relative overflow-hidden">
      
      {/* Decorative Botanical Flourish (SVG) */}
      <svg className="absolute -bottom-6 -right-6 w-36 h-36 text-[#B87D7D]/15 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10 80 Q 40 40 70 80 T 100 50 Q 60 20 20 60 Z" />
        <circle cx="35" cy="45" r="4" />
        <circle cx="55" cy="35" r="3" />
      </svg>

      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-xl bg-[#FFFFFF] text-[#8D5050] shadow-warm-sm">
          <Lightbulb className="w-4 h-4" />
        </div>
        <h3 className="font-extrabold text-sm sm:text-base text-[#3E2F28] tracking-tight">
          Quick Access Tips
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        {QUICK_TIPS.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EADFD7] shadow-warm-sm"
          >
            <div className="p-2 rounded-xl bg-[#F7EBEB] shrink-0 mt-0.5">
              {getTipIcon(tip.icon)}
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#3E2F28] leading-snug">
                {tip.title}
              </h4>
              <p className="text-[11px] text-[#7A665A] mt-0.5 leading-tight">
                {tip.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

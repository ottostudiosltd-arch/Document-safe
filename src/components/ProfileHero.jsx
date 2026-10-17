import React from 'react';
import { 
  User, 
  Copy, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Phone, 
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { PROFILE_INFO } from '../data/documents';

export default function ProfileHero({ onCopy, onOpenQuickCopy }) {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-card bg-gradient-to-br from-slate-900/90 via-slate-850/80 to-brand-950/40 border border-slate-700/60 p-5 sm:p-6 shadow-xl mb-8">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-brand-500/40 shadow-lg shadow-brand-500/20 bg-slate-800">
              <img 
                src="/documents/aadhaar_front.jpg" 
                alt="Ashraf Ahmed" 
                className="w-full h-full object-cover object-top scale-125"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<div class="w-full h-full flex items-center justify-center text-brand-400 font-bold text-2xl">AA</div>';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow-md" title="All Records Verified">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" /> Hafiz-ul-Quran
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% KYC Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {PROFILE_INFO.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              {PROFILE_INFO.honorific}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-400" />
                <span>DOB: <strong className="text-slate-300">{PROFILE_INFO.dob}</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Assam & Pune (MH)</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PROFILE_INFO.primaryMobile}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Numbers Bar */}
        <div className="w-full lg:w-auto flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1 text-brand-300">
              <Lock className="w-3 h-3" /> Quick 1-Click Copy IDs
            </span>
            <button 
              onClick={onOpenQuickCopy}
              className="text-xs text-brand-400 hover:text-brand-300 underline font-medium"
            >
              View Full Sheet &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PROFILE_INFO.quickNumbers.map((item) => (
              <button
                key={item.label}
                onClick={() => onCopy(item.value, item.label)}
                className="group flex flex-col items-start p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700 hover:border-brand-500/50 transition-all text-left shadow-sm active:scale-95"
                title={`Click to copy ${item.label}`}
              >
                <div className="w-full flex items-center justify-between text-[10px] text-slate-400 group-hover:text-brand-300 font-medium">
                  <span>{item.label}</span>
                  <Copy className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-white truncate w-full mt-0.5">
                  {item.value}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

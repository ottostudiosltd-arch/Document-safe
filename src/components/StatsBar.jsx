import React from 'react';
import { ShieldCheck, HardDrive, Wifi, Sparkles, FolderArchive } from 'lucide-react';

export default function StatsBar({ totalDocs, customCount }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
          <FolderArchive className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">Total Documents</span>
          <span className="text-lg font-bold text-white">{totalDocs} Secure Docs</span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">KYC Status</span>
          <span className="text-lg font-bold text-emerald-400">100% Verified</span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
          <Wifi className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">PWA Offline Mode</span>
          <span className="text-lg font-bold text-sky-400">Available 24/7</span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase font-semibold block">Custom Added</span>
          <span className="text-lg font-bold text-amber-300">{customCount} Custom</span>
        </div>
      </div>
    </div>
  );
}

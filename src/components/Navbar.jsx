import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  Download, 
  ClipboardCopy, 
  Moon, 
  Sun,
  Smartphone,
  HardDriveDownload,
  Lock
} from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenAddModal,
  onOpenQuickCopy,
  onExportBackup,
  isDarkMode,
  setIsDarkMode,
  canInstallPwa,
  onInstallPwa,
  totalDocs
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-700/60 bg-slate-900/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 text-white shadow-lg shadow-brand-500/20">
              <ShieldCheck className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  DocuSafe <span className="text-xs px-2 py-0.5 rounded-full font-semibold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30">PWA</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Secure Personal Vault • {totalDocs} Documents Safe
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents, numbers, tags (e.g. Aadhaar, PAN)..."
                className="w-full pl-9 pr-10 py-1.5 text-sm bg-slate-800/80 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Copy Cheat-Sheet */}
            <button
              onClick={onOpenQuickCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors shadow-sm"
              title="Open Quick Copy Sheet"
            >
              <ClipboardCopy className="w-4 h-4 text-brand-400" />
              <span className="hidden sm:inline">Quick Copy</span>
            </button>

            {/* Install PWA Button */}
            {canInstallPwa && (
              <button
                onClick={onInstallPwa}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 rounded-lg transition-colors shadow-sm"
                title="Install PWA on device"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}

            {/* Backup / Export */}
            <button
              onClick={onExportBackup}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Backup Vault Data (JSON)"
            >
              <HardDriveDownload className="w-4 h-4" />
            </button>

            {/* Add Document Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-sky-600 hover:from-brand-500 hover:to-sky-500 rounded-lg shadow-md shadow-brand-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Doc</span>
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="py-2.5 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents, IDs, tags..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-800/90 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}

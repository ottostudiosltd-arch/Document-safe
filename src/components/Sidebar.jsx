import React from 'react';
import { 
  FolderLock, 
  Files, 
  User, 
  HelpCircle, 
  ShieldCheck,
  Lock,
  Copy
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  onLockVault,
  onOpenQuickCopy 
}) {
  const navItems = [
    { id: 'documents', label: 'My Documents', icon: Files },
    { id: 'profile', label: 'Ashraf Profile', icon: User },
    { id: 'help', label: 'Guideline & Help', icon: HelpCircle },
  ];

  return (
    <aside className="hidden lg:flex w-64 bg-[#F5ECE5] border-r border-[#EADFD7] flex-col justify-between p-5 shrink-0 min-h-screen relative overflow-hidden select-none">
      
      {/* Decorative Botanical Flourish (SVG) */}
      <svg className="absolute -bottom-8 -left-8 w-44 h-44 text-[#B87D7D]/15 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M10 80 Q 40 40 70 80 T 100 50 Q 60 20 20 60 Z" />
        <circle cx="35" cy="45" r="4" />
        <circle cx="55" cy="35" r="3" />
        <circle cx="20" cy="65" r="5" />
      </svg>

      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#8D5050] text-white flex items-center justify-center shadow-warm-sm">
            <FolderLock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#3E2F28] tracking-tight leading-none">
              MyDocs
            </h1>
            <p className="text-[10px] text-[#7A665A] font-medium mt-1 leading-tight">
              Personal Document Locker<br/>for Ashraf Ahmed
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'profile' || item.id === 'help') {
                    onOpenQuickCopy();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#8D5050] text-white shadow-warm'
                    : 'text-[#6C584C] hover:bg-[#EBD4D4]/50 hover:text-[#3E2F28]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8D5050]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 px-2 space-y-2">
          <button
            onClick={onOpenQuickCopy}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FBF8F5] border border-[#EADFD7] text-left text-xs font-semibold text-[#5C4A3E] transition-all shadow-warm-sm cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Copy className="w-3.5 h-3.5 text-[#8D5050]" />
              Quick Copy Sheet
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#8D5050]/10 text-[#8D5050] font-bold">1-Click</span>
          </button>

          <button
            onClick={onLockVault}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#FDF6F6] border border-[#EADFD7] hover:border-[#D5A7A7] text-left text-xs font-semibold text-[#743E3E] transition-all shadow-warm-sm cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#8D5050]" />
              Lock Vault
            </span>
            <span className="text-[10px] text-[#A8978B]">Secure</span>
          </button>
        </div>
      </div>

      {/* Bottom Clean Security Card */}
      <div className="relative z-10 pt-4">
        <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EADFD7] shadow-warm-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1 rounded-lg bg-[#E8F5E9] text-[#2E7D32]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-[#3E2F28]">Encrypted Vault</span>
          </div>
          <p className="text-[11px] text-[#7A665A] leading-relaxed">
            All 11 government documents are encrypted and protected.
          </p>
        </div>
      </div>

    </aside>
  );
}

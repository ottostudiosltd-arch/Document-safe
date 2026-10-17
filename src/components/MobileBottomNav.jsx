import React from 'react';
import { Home, FileText, Lock } from 'lucide-react';

export default function MobileBottomNav({ 
  activeTab, 
  setActiveTab, 
  onOpenQuickCopy, 
  onLockVault 
}) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t border-[#EADFD7] py-2.5 px-6 flex items-center justify-around shadow-warm-lg select-none">
      
      {/* Home / Documents */}
      <button
        onClick={() => setActiveTab('documents')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'documents'
            ? 'text-[#8D5050]'
            : 'text-[#A8978B] hover:text-[#5C4A3E]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold">Documents</span>
      </button>

      {/* Quick Copy Sheet */}
      <button
        onClick={onOpenQuickCopy}
        className="flex flex-col items-center gap-1 text-[#A8978B] hover:text-[#5C4A3E] transition-colors"
      >
        <FileText className="w-5 h-5" />
        <span className="text-[10px] font-bold">Quick Copy</span>
      </button>

      {/* Lock Vault */}
      <button
        onClick={onLockVault}
        className="flex flex-col items-center gap-1 text-[#A8978B] hover:text-[#5C4A3E] transition-colors"
      >
        <Lock className="w-5 h-5" />
        <span className="text-[10px] font-bold">Lock Vault</span>
      </button>

    </nav>
  );
}

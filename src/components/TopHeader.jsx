import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  Search, 
  ChevronDown, 
  Lock, 
  Plus, 
  FolderLock, 
  Smartphone,
  Menu,
  X,
  Copy
} from 'lucide-react';
import { PROFILE_INFO } from '../data/documents';

export default function TopHeader({
  searchTerm,
  setSearchTerm,
  totalDocs,
  onOpenAddModal,
  onLockVault,
  onOpenQuickCopy,
  canInstallPwa,
  onInstallPwa,
  onToggleMobileMenu
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="w-full bg-[#FBF8F5] border-b border-[#EADFD7] sticky top-0 z-30 px-4 sm:px-6 py-3.5 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Mobile Left: Menu Toggle & Title */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <button 
            onClick={onToggleMobileMenu}
            className="p-2 rounded-xl bg-[#F5ECE5] text-[#3E2F28] hover:bg-[#EADFD7] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#8D5050] text-white flex items-center justify-center">
              <FolderLock className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base text-[#3E2F28] tracking-tight">
              MyDocs
            </span>
          </div>
        </div>

        {/* Center Pill: Search & Info */}
        <div className="hidden sm:flex flex-1 max-w-lg mx-auto">
          <div className="w-full relative flex items-center bg-[#FFFFFF] border border-[#EADFD7] rounded-full px-4 py-2 shadow-warm-sm">
            <ShieldCheck className="w-4 h-4 text-[#8D5050] shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Your ${totalDocs} important documents at one place (Search ID, name...)`}
              className="w-full bg-transparent text-xs sm:text-sm text-[#3E2F28] placeholder-[#A8978B] focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[11px] font-bold text-[#A8978B] hover:text-[#3E2F28] ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: Install PWA, Notification, Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {canInstallPwa && (
            <button
              onClick={onInstallPwa}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] hover:bg-[#C8E6C9] transition-all"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install PWA</span>
            </button>
          )}

          {/* Add Doc Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white shadow-warm-sm transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Add Doc</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full bg-[#FFFFFF] border border-[#EADFD7] hover:bg-[#F5ECE5] flex items-center justify-center text-[#5C4A3E] transition-colors relative shadow-warm-sm"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#8D5050]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-[#FFFFFF] border border-[#EADFD7] rounded-2xl p-3 shadow-warm-lg z-50 text-left animate-in fade-in duration-150">
                <span className="text-xs font-bold text-[#3E2F28] block mb-2">Vault Activity</span>
                <div className="text-[11px] space-y-2 text-[#7A665A]">
                  <div className="p-2 rounded-xl bg-[#F7EBEB] text-[#743E3E]">
                    🛡️ <strong>100% Compressed:</strong> All 12 documents converted to WebP (71% storage saved).
                  </div>
                  <div className="p-2 rounded-xl bg-[#E8F5E9] text-[#2E7D32]">
                    ☁️ <strong>Cloud Vault:</strong> Encrypted & Synced.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#EADFD7] hover:bg-[#F5ECE5] transition-colors shadow-warm-sm"
            >
              <div className="w-7 h-7 rounded-full bg-[#8D5050] text-white font-bold text-xs flex items-center justify-center">
                A
              </div>
              <span className="text-xs font-bold text-[#3E2F28] hidden sm:inline">
                Ashraf
              </span>
              <ChevronDown className="w-3 h-3 text-[#A8978B]" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#FFFFFF] border border-[#EADFD7] rounded-2xl p-2 shadow-warm-lg z-50 text-left animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-[#F5ECE5]">
                  <span className="text-xs font-bold text-[#3E2F28] block">Ashraf Ahmed</span>
                  <span className="text-[10px] text-[#A8978B] block">Personal Document Vault</span>
                </div>
                
                <button
                  onClick={() => { onOpenQuickCopy(); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#5C4A3E] hover:bg-[#F5ECE5] flex items-center gap-2 transition-colors mt-1"
                >
                  <Copy className="w-3.5 h-3.5 text-[#8D5050]" />
                  <span>Quick Copy Sheet</span>
                </button>

                <button
                  onClick={() => { onLockVault(); setProfileDropdownOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#743E3E] hover:bg-[#FDF6F6] flex items-center gap-2 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#8D5050]" />
                  <span>Lock Vault</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="mt-2.5 sm:hidden">
        <div className="w-full relative flex items-center bg-[#FFFFFF] border border-[#EADFD7] rounded-full px-3.5 py-1.5 shadow-warm-sm">
          <ShieldCheck className="w-4 h-4 text-[#8D5050] shrink-0 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 10 important documents..."
            className="w-full bg-transparent text-xs text-[#3E2F28] placeholder-[#A8978B] focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}

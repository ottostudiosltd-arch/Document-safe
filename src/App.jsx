import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import GreetingHero from './components/GreetingHero';
import MyDocCard from './components/MyDocCard';
import QuickTipsSection from './components/QuickTipsSection';
import MobileBottomNav from './components/MobileBottomNav';
import DocumentModal from './components/DocumentModal';
import DocumentFormModal from './components/DocumentFormModal';
import QuickCopyModal from './components/QuickCopyModal';
import SettingsModal from './components/SettingsModal';
import VaultSecurityLock from './components/VaultSecurityLock';
import Toast from './components/Toast';
import { INITIAL_DOCUMENTS } from './data/documents';
import { unlockVault, lockVault, isVaultLocked } from './supabase';
import { FolderOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDoc, setActiveDoc] = useState(null);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQuickCopyOpen, setIsQuickCopyOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Security Lock state
  const [isLocked, setIsLocked] = useState(() => isVaultLocked());

  // Custom user docs in localStorage
  const [customDocs, setCustomDocs] = useState(() => {
    try {
      const saved = localStorage.getItem('mydocs_custom_documents');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // PWA Install state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) {
      showToast('To install: On Mobile tap "Share" > "Add to Home Screen". On Desktop click Install icon in address bar.', 'info');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('MyDocs PWA installed successfully!', 'success');
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = (text, label) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label || 'Value'}: ${text}`);
      }).catch(() => fallbackCopy(text, label));
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text, label) => {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label || 'Value'}: ${text}`);
    } catch (e) {
      showToast(`Manual copy: ${text}`, 'error');
    }
    document.body.removeChild(el);
  };

  const handleUnlock = () => {
    unlockVault();
    setIsLocked(false);
    showToast('Vault unlocked successfully! 🛡️', 'success');
  };

  const handleLockVault = () => {
    lockVault();
    setIsLocked(true);
    showToast('Vault is now locked', 'info');
  };

  const handleSaveCustomDoc = (newDoc) => {
    const updated = [newDoc, ...customDocs];
    setCustomDocs(updated);
    try {
      localStorage.setItem('mydocs_custom_documents', JSON.stringify(updated));
    } catch (e) {}
    showToast(`Added "${newDoc.title}" to vault!`, 'success');
  };

  const handleExportBackup = () => {
    const allDocs = [...customDocs, ...INITIAL_DOCUMENTS];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allDocs, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `MyDocs_Backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Vault backup file downloaded!', 'success');
  };

  // Combine initial documents + custom documents
  const allDocuments = useMemo(() => {
    return [...INITIAL_DOCUMENTS, ...customDocs];
  }, [customDocs]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    if (!searchTerm.trim()) return allDocuments;
    const q = searchTerm.toLowerCase();
    return allDocuments.filter((doc) => {
      const inTitle = doc.title?.toLowerCase().includes(q);
      const inNumber = doc.docNumber?.toLowerCase().includes(q);
      const inIssuer = doc.issuer?.toLowerCase().includes(q);
      const inTags = doc.tags?.some(t => t.toLowerCase().includes(q));
      return inTitle || inNumber || inIssuer || inTags;
    });
  }, [allDocuments, searchTerm]);

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#3E2F28] font-sans flex antialiased selection:bg-[#D5A7A7] selection:text-[#3E2F28]">
      
      {/* Left Sidebar (Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'settings') setIsSettingsOpen(true);
          else if (tab === 'profile') setIsQuickCopyOpen(true);
          else setActiveTab(tab);
        }}
        onLockVault={handleLockVault}
        onOpenQuickCopy={() => setIsQuickCopyOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        
        {/* Top Header */}
        <TopHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalDocs={allDocuments.length}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onLockVault={handleLockVault}
          onOpenQuickCopy={() => setIsQuickCopyOpen(true)}
          canInstallPwa={canInstallPwa}
          onInstallPwa={handleInstallPwa}
          onToggleMobileMenu={() => setIsSettingsOpen(true)}
        />

        {/* Content Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          
          {/* Greeting Hero */}
          <GreetingHero
            totalDocs={allDocuments.length}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />

          {/* Document Cards Grid matching Image 2 */}
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
              {filteredDocuments.map((doc) => (
                <MyDocCard
                  key={doc.id}
                  doc={doc}
                  onSelectDoc={setActiveDoc}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#FFFFFF] border border-[#EADFD7] rounded-3xl shadow-warm-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#F5ECE5] flex items-center justify-center mx-auto mb-3 text-[#8D5050]">
                <FolderOpen className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#3E2F28]">No documents found</h3>
              <p className="text-xs text-[#7A665A] mt-1 mb-4">
                No documents match "{searchTerm}".
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#8D5050] text-white"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Quick Access Tips Section matching Image 2 */}
          <QuickTipsSection />

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (as shown on the iPhone in Image 2) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'settings') setIsSettingsOpen(true);
          else setActiveTab(tab);
        }}
        onOpenQuickCopy={() => setIsQuickCopyOpen(true)}
        onLockVault={handleLockVault}
      />

      {/* Vault Security Screen (when locked) */}
      {isLocked && (
        <VaultSecurityLock onUnlock={handleUnlock} />
      )}

      {/* Document Detail & Inspection Modal */}
      <DocumentModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
        onCopy={handleCopy}
      />

      {/* Add Document Modal */}
      <DocumentFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCustomDoc}
      />

      {/* Quick Copy Cheat-Sheet */}
      <QuickCopyModal
        isOpen={isQuickCopyOpen}
        onClose={() => setIsQuickCopyOpen(false)}
        onCopy={handleCopy}
      />

      {/* Settings Modal (PIN & Supabase status) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onShowToast={showToast}
        onExportBackup={handleExportBackup}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

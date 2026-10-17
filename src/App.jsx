import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProfileHero from './components/ProfileHero';
import CategoryFilter from './components/CategoryFilter';
import DocumentCard from './components/DocumentCard';
import DocumentModal from './components/DocumentModal';
import DocumentFormModal from './components/DocumentFormModal';
import QuickCopyModal from './components/QuickCopyModal';
import StatsBar from './components/StatsBar';
import Toast from './components/Toast';
import { INITIAL_DOCUMENTS } from './data/documents';
import { ShieldCheck, Plus, Sparkles, FolderOpen, Heart, HardDrive } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  
  // Modals & Drawers
  const [activeDoc, setActiveDoc] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isQuickCopyOpen, setIsQuickCopyOpen] = useState(false);
  
  // Custom added documents stored in LocalStorage
  const [customDocs, setCustomDocs] = useState(() => {
    try {
      const saved = localStorage.getItem('docusafe_custom_docs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to parse saved docs', e);
      return [];
    }
  });

  // PWA Install state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Listen for PWA install prompt
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
      showToast('PWA is ready. On mobile: Tap "Share" & select "Add to Home Screen". On Chrome/Edge: Click install icon in URL bar.', 'info');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('DocuSafe PWA installed successfully!', 'success');
      setCanInstallPwa(false);
    }
    setDeferredPrompt(null);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const handleCopy = (text, label) => {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label || 'Value'}: ${text}`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text, label) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label || 'Value'}: ${text}`);
    } catch (err) {
      showToast(`Failed to copy automatically. Manual copy: ${text}`, 'error');
    }
    document.body.removeChild(textArea);
  };

  // Add new document
  const handleSaveCustomDoc = (newDoc) => {
    const updated = [newDoc, ...customDocs];
    setCustomDocs(updated);
    try {
      localStorage.setItem('docusafe_custom_docs', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    showToast(`Added "${newDoc.title}" to vault!`, 'success');
  };

  // Export Backup
  const handleExportBackup = () => {
    const allDocs = [...customDocs, ...INITIAL_DOCUMENTS];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allDocs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `DocuSafe_Backup_Ashraf_Ahmed_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Vault backup file downloaded successfully!', 'success');
  };

  // Combine initial documents + custom documents
  const allDocuments = useMemo(() => {
    return [...customDocs, ...INITIAL_DOCUMENTS];
  }, [customDocs]);

  // Counts by category
  const countsByCategory = useMemo(() => {
    const counts = { all: allDocuments.length };
    allDocuments.forEach((doc) => {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    });
    return counts;
  }, [allDocuments]);

  // Filter & Search
  const filteredDocuments = useMemo(() => {
    return allDocuments.filter((doc) => {
      // Category match
      const matchCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      if (!matchCategory) return false;

      // Search match
      if (!searchTerm.trim()) return true;
      const query = searchTerm.toLowerCase();

      const inTitle = doc.title?.toLowerCase().includes(query);
      const inNumber = doc.docNumber?.toLowerCase().includes(query);
      const inIssuer = doc.issuer?.toLowerCase().includes(query);
      const inNotes = doc.notes?.toLowerCase().includes(query);
      const inTags = doc.tags?.some(t => t.toLowerCase().includes(query));
      const inFields = doc.keyFields?.some(f => 
        f.label?.toLowerCase().includes(query) || f.value?.toLowerCase().includes(query)
      );

      return inTitle || inNumber || inIssuer || inNotes || inTags || inFields;
    });
  }, [allDocuments, selectedCategory, searchTerm]);

  // Sort
  const sortedDocuments = useMemo(() => {
    const list = [...filteredDocuments];
    switch(sortOption) {
      case 'title-asc':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'date-desc':
        return list.sort((a, b) => (b.issueDate || '').localeCompare(a.issueDate || ''));
      case 'expiry-asc':
        return list.sort((a, b) => (a.expiryDate || '').localeCompare(b.expiryDate || ''));
      default:
        return list;
    }
  }, [filteredDocuments, sortOption]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenQuickCopy={() => setIsQuickCopyOpen(true)}
        onExportBackup={handleExportBackup}
        canInstallPwa={canInstallPwa}
        onInstallPwa={handleInstallPwa}
        totalDocs={allDocuments.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Profile Card / Digital Locker Intro */}
        <ProfileHero 
          onCopy={handleCopy}
          onOpenQuickCopy={() => setIsQuickCopyOpen(true)}
        />

        {/* Stats Metrics */}
        <StatsBar 
          totalDocs={allDocuments.length} 
          customCount={customDocs.length} 
        />

        {/* Categories, Sort & Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          countsByCategory={countsByCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Document Grid / List View */}
        {sortedDocuments.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
              : "space-y-3"
          }>
            {sortedDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                viewMode={viewMode}
                onSelectDoc={setActiveDoc}
                onCopy={handleCopy}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-2xl glass-card border border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <FolderOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No documents matched</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5">
              {searchTerm 
                ? `No documents found matching "${searchTerm}". Try a different keyword.` 
                : 'No documents in this category yet.'}
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-900/60 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span className="font-semibold text-slate-300">DocuSafe PWA</span>
            <span>—</span>
            <span>Personal Document Vault for Ashraf Ahmed</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for a friend
            </span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Offline Ready
            </span>
          </div>

        </div>
      </footer>

      {/* Modals & Dialogs */}
      <DocumentModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
        onCopy={handleCopy}
      />

      <DocumentFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveCustomDoc}
      />

      <QuickCopyModal
        isOpen={isQuickCopyOpen}
        onClose={() => setIsQuickCopyOpen(false)}
        onCopy={handleCopy}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

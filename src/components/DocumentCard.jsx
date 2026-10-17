import React, { useState } from 'react';
import { 
  Copy, 
  ExternalLink, 
  Download, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  RotateCw, 
  Calendar, 
  Building,
  Printer,
  Sparkles
} from 'lucide-react';

export default function DocumentCard({
  doc,
  viewMode = 'grid',
  onSelectDoc,
  onCopy,
  onPrint
}) {
  const [showBack, setShowBack] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const activeImage = showBack && doc.backImage ? doc.backImage : doc.image;

  // Mask number unless revealed or not sensitive
  const formatDocNumber = (num, isMaskable) => {
    if (!isMaskable || revealed) return num;
    if (num.length > 8) {
      return num.slice(0, 4) + ' •••• •••• ' + num.slice(-4);
    }
    return '•••••••• ' + num.slice(-4);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = activeImage;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If List View
  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelectDoc(doc)}
        className="glass-card hover:bg-slate-800/90 rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group border border-slate-700/60 hover:border-brand-500/40"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
            <img 
              src={activeImage} 
              alt={doc.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {doc.backImage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBack(!showBack);
                }}
                className="absolute bottom-1 right-1 p-1 rounded-md bg-slate-900/80 text-white hover:bg-brand-600 transition-colors text-[9px] flex items-center gap-0.5"
                title="Flip to back"
              >
                <RotateCw className="w-2.5 h-2.5" />
              </button>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/25">
                {doc.category}
              </span>
              {doc.badge && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {doc.badge}
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors truncate">
              {doc.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400">
              <span className="font-mono text-slate-200 font-medium">
                {doc.docNumber}
              </span>
              <span>•</span>
              <span className="truncate max-w-[200px]">{doc.issuer}</span>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(doc.docNumber, `${doc.title} Number`);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Copy Number"
          >
            <Copy className="w-3.5 h-3.5 text-brand-400" />
            <span className="hidden sm:inline">Copy No.</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Download Document"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectDoc(doc)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors"
          >
            <span>Inspect</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div 
      onClick={() => onSelectDoc(doc)}
      className="group glass-card rounded-2xl overflow-hidden border border-slate-700/60 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-950/40 cursor-pointer"
    >
      {/* Thumbnail Header */}
      <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
        <img 
          src={activeImage} 
          alt={doc.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase bg-slate-900/85 backdrop-blur-md text-brand-300 border border-brand-500/30 shadow-md">
            {doc.category}
          </span>

          <div className="flex items-center gap-1">
            {doc.status === 'Verified' && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
        </div>

        {/* Flip Side Toggle (if dual-sided document like Aadhaar) */}
        {doc.backImage && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBack(!showBack);
            }}
            className="absolute bottom-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-brand-600 text-white text-xs font-semibold backdrop-blur-md border border-slate-700 hover:border-brand-400 transition-all shadow-md flex items-center gap-1"
            title="Flip to back view"
          >
            <RotateCw className="w-3 h-3" />
            <span>{showBack ? 'Front' : 'Back Side'}</span>
          </button>
        )}

        {/* Zoom Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 pointer-events-none">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-brand-300 border border-brand-500/40 backdrop-blur-md flex items-center gap-1 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Tap to Inspect
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-brand-300 transition-colors leading-snug">
              {doc.title}
            </h3>
          </div>

          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 truncate">
            <Building className="w-3 h-3 shrink-0 text-slate-500" />
            <span className="truncate">{doc.issuer}</span>
          </p>

          {/* Document Number with One-Click Copy */}
          <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                Document Number / ID
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-brand-300 tracking-wider truncate block">
                {formatDocNumber(doc.docNumber, doc.keyFields?.some(f => f.maskable))}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {doc.keyFields?.some(f => f.maskable) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRevealed(!revealed);
                  }}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  title={revealed ? "Hide Number" : "Show Full Number"}
                >
                  {revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(doc.docNumber, `${doc.title} Number`);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white text-slate-300 transition-colors"
                title="Copy Number"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Key-Fields List */}
          {doc.keyFields && doc.keyFields.length > 0 && (
            <div className="mt-3 space-y-1.5 text-xs">
              {doc.keyFields.slice(1, 3).map((field, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-400">
                  <span className="text-slate-400 truncate max-w-[120px]">{field.label}:</span>
                  <span className="font-medium text-slate-200 truncate max-w-[160px] text-right font-mono">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span>{doc.issueDate || 'Active'}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title="Download Image"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            
            <button
              onClick={() => onSelectDoc(doc)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-600/90 hover:bg-brand-500 text-white font-semibold transition-all shadow-sm"
            >
              <span>View</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

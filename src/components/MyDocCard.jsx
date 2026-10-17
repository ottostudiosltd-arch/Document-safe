import React, { useState } from 'react';
import { 
  MoreVertical, 
  CheckCircle2, 
  Copy, 
  Download, 
  Eye, 
  RotateCw,
  ExternalLink
} from 'lucide-react';

export default function MyDocCard({ doc, onSelectDoc, onCopy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const activeImage = showBack && doc.backImage ? doc.backImage : doc.image;

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(activeImage);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_${showBack ? 'back' : 'front'}.webp`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const link = document.createElement('a');
      link.href = activeImage;
      link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.webp`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setMenuOpen(false);
  };

  return (
    <div
      onClick={() => onSelectDoc(doc)}
      className="group relative bg-[#FFFFFF] border border-[#EADFD7] hover:border-[#D5A7A7] rounded-3xl p-3.5 sm:p-4 shadow-warm-sm hover:shadow-warm transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
    >
      
      {/* Top Header Row: Number Badge & 3-Dots Menu */}
      <div className="flex items-center justify-between w-full mb-2.5">
        
        {/* Number Badge (1, 2, 3...) from Image 2 */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-[#F7EBEB] text-[#8D5050] font-extrabold text-xs sm:text-sm flex items-center justify-center border border-[#EBD4D4] shadow-sm">
          {doc.numberBadge || '#'}
        </div>

        {/* 3-Dots Action Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1 rounded-lg text-[#A8978B] hover:text-[#3E2F28] hover:bg-[#F5ECE5] transition-colors"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-7 w-40 bg-[#FFFFFF] border border-[#EADFD7] rounded-2xl p-1.5 shadow-warm-lg z-30 text-left animate-in fade-in duration-150"
            >
              <button
                onClick={() => {
                  onCopy(doc.docNumber, `${doc.title} Number`);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#5C4A3E] hover:bg-[#F5ECE5] flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5 text-[#8D5050]" />
                <span>Copy ID</span>
              </button>

              {doc.backImage && (
                <button
                  onClick={() => {
                    setShowBack(!showBack);
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#5C4A3E] hover:bg-[#F5ECE5] flex items-center gap-2"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#8D5050]" />
                  <span>{showBack ? 'Show Front' : 'Show Back'}</span>
                </button>
              )}

              <button
                onClick={handleDownload}
                className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#5C4A3E] hover:bg-[#F5ECE5] flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#8D5050]" />
                <span>Download WebP</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Miniature Document Preview Graphic */}
      <div className="relative w-full aspect-[16/10] bg-[#FBF8F5] border border-[#F0E6DE] rounded-2xl overflow-hidden flex items-center justify-center p-1 group-hover:shadow-sm transition-all">
        <img
          src={activeImage}
          alt={doc.title}
          onError={(e) => {
            const fallback = showBack && doc.backFallbackSvg ? doc.backFallbackSvg : doc.fallbackSvg;
            if (fallback && e.target.src !== fallback) {
              e.target.src = fallback;
            }
          }}
          className="w-full h-full object-cover object-center rounded-xl group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Back side indicator tag if dual-sided */}
        {doc.backImage && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setShowBack(!showBack);
            }}
            className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-[#2E221D]/75 text-white text-[9px] font-bold backdrop-blur-sm hover:bg-[#8D5050] transition-colors flex items-center gap-1 shadow-sm"
            title="Click to flip front/back"
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span>{showBack ? 'Back' : 'Front'}</span>
          </div>
        )}
      </div>

      {/* Title & Status */}
      <div className="mt-3 text-center flex flex-col items-center">
        <h3 className="font-bold text-xs sm:text-sm text-[#3E2F28] group-hover:text-[#8D5050] transition-colors truncate w-full">
          {doc.title}
        </h3>

        {/* Document ID snippet */}
        <p className="font-mono text-[10px] text-[#A8978B] truncate w-full mt-0.5">
          {doc.docNumber}
        </p>

        {/* Status Pill: ✓ Uploaded (from Image 2) */}
        <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9] text-[10px] sm:text-[11px] font-bold">
          <CheckCircle2 className="w-3 h-3" />
          <span>Uploaded</span>
        </div>
      </div>

    </div>
  );
}

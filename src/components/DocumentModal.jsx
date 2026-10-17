import React, { useState, useEffect } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  Printer, 
  Share2, 
  Copy, 
  CheckCircle2, 
  Building, 
  Calendar, 
  Tag, 
  Maximize2,
  Minimize2,
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function DocumentModal({ doc, onClose, onCopy }) {
  const [showBack, setShowBack] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setZoomLevel(1);
    setRotation(0);
    setShowBack(false);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [doc]);

  if (!doc) return null;

  const currentImage = showBack && doc.backImage ? doc.backImage : doc.image;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImage);
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
      link.href = currentImage;
      link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_${showBack ? 'back' : 'front'}.webp`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: doc.title,
          text: `${doc.title} - ${doc.docNumber} (Ashraf Ahmed)`,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      onCopy(
        `${doc.title}\nNumber: ${doc.docNumber}\nIssuer: ${doc.issuer}\nHolder: ${doc.holderName || 'Ashraf Ahmed'}`,
        `${doc.title} Details`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#2E221D]/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div className={`w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#FFFFFF] border border-[#EADFD7] rounded-3xl shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 max-h-screen rounded-none z-50' : ''
      }`}>
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#EADFD7] bg-[#FBF8F5] shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#F7EBEB] text-[#8D5050] font-extrabold text-xs flex items-center justify-center border border-[#EBD4D4]">
              {doc.numberBadge || '#'}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#3E2F28] flex items-center gap-2">
                {doc.title}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
                  <CheckCircle2 className="w-3 h-3" /> Uploaded
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-xl text-[#7A665A] hover:text-[#3E2F28] hover:bg-[#F5ECE5] transition-colors hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#7A665A] hover:text-[#3E2F28] hover:bg-[#F5ECE5] transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          
          {/* Left: Image Viewer */}
          <div className="lg:col-span-7 bg-[#2E221D] flex flex-col items-center justify-between p-4 relative min-h-[340px] sm:min-h-[420px] border-b lg:border-b-0 lg:border-r border-[#EADFD7]">
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden relative">
              <div 
                className="transition-transform duration-200 ease-out flex items-center justify-center max-h-full max-w-full"
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotation}deg)`
                }}
              >
                <img 
                  src={currentImage} 
                  alt={doc.title} 
                  onError={(e) => {
                    const fallback = showBack && doc.backFallbackSvg ? doc.backFallbackSvg : doc.fallbackSvg;
                    if (fallback && e.target.src !== fallback) {
                      e.target.src = fallback;
                    }
                  }}
                  className="max-h-[460px] w-auto max-w-full object-contain rounded-xl shadow-2xl select-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Viewer Controls */}
            <div className="w-full flex items-center justify-between gap-2 mt-3 pt-3 border-t border-white/10 z-10 px-2">
              {doc.backImage ? (
                <button
                  onClick={() => setShowBack(!showBack)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white transition-colors shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{showBack ? 'Show Front' : 'Show Back Side'}</span>
                </button>
              ) : (
                <span className="text-[11px] text-white/50 font-medium">WebP Compressed Scan</span>
              )}

              <div className="flex items-center gap-1 bg-[#FFFFFF]/10 backdrop-blur-md rounded-xl p-1 text-white">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-40"
                  disabled={zoomLevel <= 0.75}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono px-1 select-none">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-40"
                  disabled={zoomLevel >= 3}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-3.5 bg-white/20 mx-0.5"></div>
                <button
                  onClick={handleRotate}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="px-2 py-0.5 text-[10px] font-bold hover:bg-white/20 rounded-md transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right: Metadata Details */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-[#FFFFFF] overflow-y-auto">
            <div className="space-y-4">
              
              {/* Document ID Box */}
              <div className="p-3.5 rounded-2xl bg-[#FBF8F5] border border-[#EADFD7]">
                <span className="text-[10px] text-[#7A665A] uppercase tracking-wider font-bold block">
                  Document ID / Number
                </span>
                <div className="flex items-center justify-between mt-1 gap-2">
                  <span className="font-mono text-base font-extrabold text-[#8D5050] tracking-wide break-all select-all">
                    {doc.docNumber}
                  </span>
                  <button
                    onClick={() => onCopy(doc.docNumber, `${doc.title} Number`)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white transition-colors shrink-0 shadow-warm-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Extracted Details List */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-[#7A665A] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#8D5050]" />
                  Verified Document Fields
                </h4>

                {doc.keyFields?.map((field, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FDFBF9] border border-[#EADFD7] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="text-[#A8978B] block text-[10px] font-semibold">
                        {field.label}
                      </span>
                      <span className="font-bold text-[#3E2F28] mt-0.5 block break-all font-mono select-all">
                        {field.value}
                      </span>
                    </div>

                    {field.copyable && (
                      <button
                        onClick={() => onCopy(field.value, field.label)}
                        className="p-1.5 rounded-lg hover:bg-[#F5ECE5] text-[#7A665A] hover:text-[#3E2F28] transition-colors shrink-0"
                        title={`Copy ${field.label}`}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                {doc.issuer && (
                  <div className="p-2.5 rounded-xl bg-[#FDFBF9] border border-[#EADFD7] flex items-start gap-2 text-xs">
                    <Building className="w-4 h-4 text-[#8D5050] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#A8978B] block text-[10px] font-semibold">Issuing Authority</span>
                      <span className="font-medium text-[#3E2F28] mt-0.5 block">{doc.issuer}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-5 mt-4 border-t border-[#EADFD7] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#FBF8F5] hover:bg-[#F5ECE5] text-[#3E2F28] border border-[#EADFD7] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#FBF8F5] hover:bg-[#F5ECE5] text-[#3E2F28] border border-[#EADFD7] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white shadow-warm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download WebP</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

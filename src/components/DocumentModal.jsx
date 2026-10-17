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
    // Reset zoom and rotation on doc change
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

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_${showBack ? 'back' : 'front'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      } catch (err) {
        console.log('Share canceled', err);
      }
    } else {
      onCopy(
        `${doc.title}\nNumber: ${doc.docNumber}\nIssuer: ${doc.issuer}\nHolder: ${doc.holderName || 'Ashraf Ahmed'}`,
        `${doc.title} Details`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Dialog Container */}
      <div className={`w-full max-w-6xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 max-h-screen rounded-none z-50' : ''
      }`}>
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/95 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {doc.category}
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {doc.title}
                {doc.status === 'Verified' && (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Document" />
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Image Viewer & Details */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0">
          
          {/* Left Column: Interactive Image Viewer */}
          <div className="lg:col-span-7 bg-slate-950 flex flex-col items-center justify-between p-4 relative min-h-[360px] sm:min-h-[440px] border-b lg:border-b-0 lg:border-r border-slate-800">
            
            {/* Image Canvas / Viewport */}
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
                  className="max-h-[500px] w-auto max-w-full object-contain rounded-lg shadow-2xl select-none"
                  draggable={false}
                />
              </div>
            </div>

            {/* Viewer Controls Toolbar */}
            <div className="w-full flex items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-sm z-10 px-2">
              {/* Flip Button */}
              {doc.backImage ? (
                <button
                  onClick={() => setShowBack(!showBack)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{showBack ? 'Show Front' : 'Show Back Side'}</span>
                </button>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Single Sided Document</span>
              )}

              {/* Zoom & Rotate Controls */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={handleZoomOut}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
                  disabled={zoomLevel <= 0.75}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono px-1.5 text-slate-400 select-none">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-40"
                  disabled={zoomLevel >= 3}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-slate-800 mx-1"></div>
                <button
                  onClick={handleRotate}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
                  title="Reset Zoom & Rotation"
                >
                  Reset
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Structured Metadata & Actions */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-slate-900 overflow-y-auto">
            <div className="space-y-5">
              
              {/* Document Primary Identifier Box */}
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
                  Document Identifier / Number
                </span>
                <div className="flex items-center justify-between mt-1 gap-2">
                  <span className="font-mono text-lg font-bold text-brand-300 tracking-wider break-all select-all">
                    {doc.docNumber}
                  </span>
                  <button
                    onClick={() => onCopy(doc.docNumber, `${doc.title} Number`)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shrink-0 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>

              {/* Key Extracted Details List */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-400" />
                  Extracted Record Details
                </h4>

                <div className="space-y-2">
                  {doc.keyFields?.map((field, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <span className="text-slate-400 block text-[11px] font-medium">
                          {field.label}
                        </span>
                        <span className="font-semibold text-slate-200 mt-0.5 block break-all font-mono select-all">
                          {field.value}
                        </span>
                      </div>

                      {field.copyable && (
                        <button
                          onClick={() => onCopy(field.value, field.label)}
                          className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors shrink-0"
                          title={`Copy ${field.label}`}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  {doc.issuer && (
                    <div className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 flex items-start gap-2 text-xs">
                      <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Issuing Authority</span>
                        <span className="font-medium text-slate-200 mt-0.5 block">{doc.issuer}</span>
                      </div>
                    </div>
                  )}

                  {doc.notes && (
                    <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-slate-300">
                      <strong className="text-slate-200 block mb-1">Notes:</strong>
                      {doc.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {doc.tags && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  {doc.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Print Document"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Share Document"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

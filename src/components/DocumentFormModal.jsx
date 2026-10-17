import React, { useState } from 'react';
import { X, Upload, Camera, Save, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/documents';

export default function DocumentFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Identity');
  const [docNumber, setDocNumber] = useState('');
  const [holderName, setHolderName] = useState('Ashraf Ahmed');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError('Image file is too large (max 15MB)');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Document title is required');
      return;
    }
    if (!docNumber.trim()) {
      setError('Document Number or ID is required');
      return;
    }
    if (!imagePreview) {
      setError('Please upload or snap a photo of the document');
      return;
    }

    const newDoc = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category,
      docNumber: docNumber.trim(),
      holderName: holderName.trim(),
      issuer: issuer.trim() || 'Official Issuer',
      issueDate: issueDate || 'Recent',
      expiryDate: expiryDate || 'Not specified',
      badge: 'Custom Added',
      status: 'User Added',
      image: imagePreview,
      notes: notes.trim(),
      tags: [category, 'Custom'],
      keyFields: [
        { label: 'Document Number', value: docNumber.trim(), copyable: true },
        { label: 'Holder Name', value: holderName.trim(), copyable: true },
        ...(issueDate ? [{ label: 'Issue Date', value: issueDate }] : []),
        ...(expiryDate ? [{ label: 'Expiry Date', value: expiryDate }] : [])
      ]
    };

    onSave(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Add New Document to Vault
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Document Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Passport, Gas Bill, Marksheet"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Document Number & Holder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Document Number / ID *
              </label>
              <input
                type="text"
                required
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="e.g. Z1234567"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Holder Name
              </label>
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="Name on Document"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Issuer & Issue Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Issuing Authority
              </label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Govt of India, SBI, Board"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Issue Date / Valid Till
              </label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="e.g. 15/08/2024"
                className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Document Photo / Scan *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-xl hover:border-brand-500 transition-colors bg-slate-800/40">
              {imagePreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-44 object-contain rounded-lg border border-slate-700 shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview(null)}
                    className="text-xs text-rose-400 hover:text-rose-300 underline font-medium"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <Upload className="w-8 h-8" />
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="flex text-xs text-slate-300 justify-center">
                    <label className="relative cursor-pointer rounded-md font-semibold text-brand-400 hover:text-brand-300 focus-within:outline-none">
                      <span>Upload a file</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        onChange={handleImageChange}
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1">or snap photo from camera</p>
                  </div>
                  <p className="text-[11px] text-slate-500">PNG, JPG, JPEG up to 15MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Notes / Remarks
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details, application numbers, or reference notes..."
              className="w-full px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/20 transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Save Document</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

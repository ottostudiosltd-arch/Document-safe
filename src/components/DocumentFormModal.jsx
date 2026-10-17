import React, { useState } from 'react';
import { X, Upload, Camera, Save, AlertCircle, Cloud } from 'lucide-react';
import { uploadToSupabase } from '../supabase';

export default function DocumentFormModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Identity');
  const [docNumber, setDocNumber] = useState('');
  const [holderName, setHolderName] = useState('Ashraf Ahmed');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError('Image file is too large (max 15MB)');
        return;
      }
      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
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

    setUploading(true);
    let finalImageUrl = imagePreview;

    // Try uploading to Supabase if possible
    if (selectedFile) {
      const uploadRes = await uploadToSupabase(selectedFile, selectedFile.name);
      if (uploadRes.success && uploadRes.url) {
        finalImageUrl = uploadRes.url;
      }
    }
    setUploading(false);

    const newDoc = {
      id: 'custom-' + Date.now(),
      numberBadge: '+',
      title: title.trim(),
      category,
      docNumber: docNumber.trim(),
      holderName: holderName.trim(),
      issuer: issuer.trim() || 'Official Authority',
      issueDate: issueDate || 'Recent',
      badge: 'Custom Doc',
      status: 'Uploaded',
      image: finalImageUrl,
      notes: notes.trim(),
      tags: [category, 'Custom'],
      keyFields: [
        { label: 'Document Number', value: docNumber.trim(), copyable: true },
        { label: 'Holder Name', value: holderName.trim(), copyable: true },
        ...(issueDate ? [{ label: 'Issue Date', value: issueDate }] : [])
      ]
    };

    onSave(newDoc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2E221D]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#FFFFFF] border border-[#EADFD7] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADFD7] bg-[#FBF8F5]">
          <h2 className="text-base sm:text-lg font-bold text-[#3E2F28] flex items-center gap-2">
            Add New Document to Vault
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#7A665A] hover:text-[#3E2F28] hover:bg-[#F5ECE5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
                Document Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Passport, Ayushman Card, Marksheet"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              >
                <option value="Identity">Identity & Legal</option>
                <option value="Banking">Banking & Finance</option>
                <option value="Licence">Licences & Transport</option>
                <option value="Education">Education & Hifz</option>
                <option value="Certificates">Official Certificates</option>
              </select>
            </div>
          </div>

          {/* Document Number & Holder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
                Document Number / ID *
              </label>
              <input
                type="text"
                required
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
                placeholder="e.g. MH12 2026..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] font-mono focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
                Holder Name
              </label>
              <input
                type="text"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                placeholder="Ashraf Ahmed"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              />
            </div>
          </div>

          {/* Issuer & Issue Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
                Issuing Authority
              </label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Govt of India, SBI"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
                Issue Date / Valid Till
              </label>
              <input
                type="text"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="e.g. 15/08/2026"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
              Document Scan / Photo *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#EADFD7] border-dashed rounded-2xl hover:border-[#8D5050] transition-colors bg-[#FBF8F5]">
              {imagePreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-40 object-contain rounded-xl border border-[#EADFD7] shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setSelectedFile(null); }}
                    className="text-xs text-[#8D5050] hover:underline font-bold"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#A8978B]">
                    <Upload className="w-7 h-7" />
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="flex text-xs text-[#7A665A] justify-center">
                    <label className="relative cursor-pointer rounded-md font-bold text-[#8D5050] hover:text-[#743E3E] focus-within:outline-none">
                      <span>Upload document</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment"
                        onChange={handleImageChange}
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1">or take photo</p>
                  </div>
                  <p className="text-[11px] text-[#A8978B]">WebP, JPG, PNG up to 15MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#5C4A3E] mb-1">
              Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any details or remarks..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FBF8F5] border border-[#EADFD7] rounded-xl text-[#3E2F28] focus:outline-none focus:ring-2 focus:ring-[#8D5050]"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-[#EADFD7] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#7A665A] hover:text-[#3E2F28] bg-[#F5ECE5] hover:bg-[#EADFD7]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#8D5050] hover:bg-[#743E3E] shadow-warm transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{uploading ? 'Processing...' : 'Save Document'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

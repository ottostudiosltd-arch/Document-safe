import React from 'react';
import { X, Copy, ShieldCheck, User, CreditCard, MapPin, Award } from 'lucide-react';
import { PROFILE_INFO } from '../data/documents';

export default function QuickCopyModal({ isOpen, onClose, onCopy }) {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Identity & Government Numbers',
      icon: <ShieldCheck className="w-4 h-4 text-[#8D5050]" />,
      items: [
        { label: 'Aadhaar Number', value: '6431 7055 4663' },
        { label: 'Aadhaar Virtual ID (VID)', value: '9194 1580 2705 4659' },
        { label: 'PAN Card Number', value: 'DJKPA4828J' },
        { label: 'Voter ID (EPIC Number)', value: 'GQF0193532' },
        { label: 'Driving Licence Number', value: 'MH12 20220062042' }
      ]
    },
    {
      title: 'Banking & Financial Details',
      icon: <CreditCard className="w-4 h-4 text-[#8D5050]" />,
      items: [
        { label: 'HDFC Bank Account Number', value: '50100552781561' },
        { label: 'HDFC IFSC Code', value: 'HDFC0002872' },
        { label: 'HDFC Customer ID', value: '205199504' },
        { label: 'HDFC MICR Code', value: '411240047' },
        { label: 'Branch Name', value: 'SHIKRAPUR (Branch Code: 2872)' },
        { label: 'Debit Card Number', value: '4191 8802 3171 1157' }
      ]
    },
    {
      title: 'Personal & Family Information',
      icon: <User className="w-4 h-4 text-[#8D5050]" />,
      items: [
        { label: 'Full Legal Name', value: 'ASHRAF AHMED' },
        { label: 'Honorific Title', value: 'Hafiz Mohammad Ashraf Ahmed' },
        { label: 'Date of Birth (DOB)', value: '01/01/1999' },
        { label: 'Gender', value: 'Male' },
        { label: "Father's Name", value: 'MD SAFIQUR RAHMAN' },
        { label: "Mother's Name", value: 'MARIAM BEGUM' },
        { label: 'Spouse Name', value: 'SAJIDA SULTANA' },
        { label: 'Primary Contact Mobile', value: '+91 91706 62037' }
      ]
    },
    {
      title: 'Official Addresses',
      icon: <MapPin className="w-4 h-4 text-[#8D5050]" />,
      items: [
        { 
          label: 'Permanent Address (Assam)', 
          value: '204, VILL-SHERALIPUR, Lamajuar, PO: Lamajuar, P.S. Badarpur, DIST: Sribhumi / Karimganj, Assam - 788701' 
        },
        { 
          label: 'Current Address (Maharashtra)', 
          value: 'GAT NO 983/3B PUNE NAGAR RD NR MALTHAN PHATA, Shikrapur, Shirur, Pune, Maharashtra - 412208' 
        }
      ]
    },
    {
      title: 'Certificate Reference Numbers',
      icon: <Award className="w-4 h-4 text-[#8D5050]" />,
      items: [
        { label: 'Marriage Certificate Ref', value: 'MMR/SKB/C-572/2022 (Serial 1339)' },
        { label: 'Panchayat Identification Sl.', value: 'Memo LGP Sl. No. 34 (Holding 193)' },
        { label: 'Janakalyan School Leaving No', value: 'No. 45/26' },
        { label: 'Hifz Sanad Certificate No', value: 'No. 6745/56 (Akkalkuwa)' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2E221D]/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FFFFFF] border border-[#EADFD7] rounded-3xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADFD7] bg-[#FBF8F5] shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#3E2F28] flex items-center gap-2">
              <Copy className="w-5 h-5 text-[#8D5050]" />
              Quick Copy Cheat-Sheet
            </h2>
            <p className="text-xs text-[#7A665A] mt-0.5">
              1-Click instant copy for KYC, online forms, visa & banking portals
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#7A665A] hover:text-[#3E2F28] hover:bg-[#F5ECE5]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {sections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A665A] flex items-center gap-2">
                {sec.icon}
                <span>{sec.title}</span>
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {sec.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-2.5 sm:p-3 rounded-2xl bg-[#FDFBF9] hover:bg-[#FBF8F5] border border-[#EADFD7] hover:border-[#D5A7A7] flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] text-[#A8978B] block font-medium">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#3E2F28] block truncate mt-0.5 select-all">
                        {item.value}
                      </span>
                    </div>

                    <button
                      onClick={() => onCopy(item.value, item.label)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#8D5050] hover:bg-[#743E3E] text-white transition-all shadow-warm-sm shrink-0 active:scale-95"
                      title={`Copy ${item.label}`}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EADFD7] bg-[#FBF8F5] flex items-center justify-between text-xs text-[#7A665A] shrink-0">
          <span>Protected Local Vault • All data verified</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#8D5050] hover:bg-[#743E3E] text-white font-bold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

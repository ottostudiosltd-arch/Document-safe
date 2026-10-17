const BASE = import.meta.env.BASE_URL || './';
const docImg = (file) => `${BASE}documents/${file}`;

export const INITIAL_DOCUMENTS = [
  {
    id: 'aadhaar',
    numberBadge: 1,
    title: 'Aadhaar Card',
    category: 'Identity',
    docNumber: '6431 •••• 4663',
    rawDocNumber: '6431 7055 4663',
    vid: '9194 1580 2705 4659',
    holderName: 'Ashraf Ahmed',
    dob: '01/01/1999',
    gender: 'Male',
    issuer: 'Unique Identification Authority of India (UIDAI)',
    issueDate: '16/07/2021',
    expiryDate: 'Lifetime Validity',
    badge: 'National ID',
    status: 'Uploaded',
    address: '204, VILL-SHERALIPUR, Lamajuar, PO: Lamajuar, DIST: Sribhumi, Assam - 788701',
    image: docImg('aadhaar_front.webp'),
    backImage: docImg('aadhaar_back.webp'),
    notes: 'Official UIDAI Aadhaar card with online QR verification code and Virtual ID (VID).',
    tags: ['Aadhaar', 'UIDAI', 'National ID', 'KYC', 'Official'],
    keyFields: [
      { label: 'Aadhaar Number', value: '6431 7055 4663', copyable: true, maskable: true },
      { label: 'Virtual ID (VID)', value: '9194 1580 2705 4659', copyable: true },
      { label: 'Date of Birth', value: '01/01/1999', copyable: true },
      { label: 'Gender', value: 'Male' },
      { label: 'Permanent Address', value: '204, VILL-SHERALIPUR, Lamajuar, PO: Lamajuar, DIST: Sribhumi, Assam - 788701', copyable: true }
    ]
  },
  {
    id: 'pan',
    numberBadge: 2,
    title: 'PAN Card',
    category: 'Identity',
    docNumber: 'DJKPA••••J',
    rawDocNumber: 'DJKPA4828J',
    holderName: 'ASHRAF AHMED',
    fatherName: 'MD SAFIQUR RAHMAN',
    dob: '01/01/1999',
    issuer: 'Income Tax Department, Government of India',
    issueDate: '09/03/2026',
    expiryDate: 'Lifetime Validity',
    badge: 'Tax & Banking ID',
    status: 'Uploaded',
    image: docImg('pan_card.webp'),
    notes: 'Primary Tax & Banking Identification card issued by Income Tax Department.',
    tags: ['PAN', 'Tax', 'Income Tax', 'KYC', 'Finance'],
    keyFields: [
      { label: 'PAN Number', value: 'DJKPA4828J', copyable: true, highlight: true },
      { label: "Father's Name", value: 'MD SAFIQUR RAHMAN', copyable: true },
      { label: 'Date of Birth', value: '01/01/1999', copyable: true },
      { label: 'Issuer', value: 'Income Tax Department (GOI)' }
    ]
  },
  {
    id: 'driving-licence',
    numberBadge: 3,
    title: 'Driving Licence',
    category: 'Licence',
    docNumber: 'MH12 20220062042',
    rawDocNumber: 'MH12 20220062042',
    holderName: 'ASHRAF AHMED',
    fatherName: 'SAFIQUR RAHMAN',
    dob: '01-01-1999',
    issuer: 'Govt. of Maharashtra Motor Vehicles Dept (MH12 Pune)',
    issueDate: '22-07-2022',
    expiryDate: '31-12-2038',
    badge: 'Valid till 2038',
    status: 'Uploaded',
    address: 'GAT NO 983/3B PUNE NAGAR RD NR MALTHAN PHATA, Shikrapur, Shirur, Pune, MH, PIN: 412208',
    image: docImg('driving_licence.webp'),
    notes: 'Smart Card Motor Driving Licence for Motorcycle with Gear (MCWG). RTO MH12 Pune.',
    tags: ['Driving Licence', 'Transport', 'MH12 Pune', 'Smart Card', 'MCWG'],
    keyFields: [
      { label: 'DL Number', value: 'MH12 20220062042', copyable: true, highlight: true },
      { label: 'Class of Vehicle', value: 'MCWG (Motor Cycle With Gear)' },
      { label: 'Valid Until', value: '31-12-2038 (NT)', highlight: true },
      { label: 'Issuing Authority', value: 'MH12 (Pune, Maharashtra)' }
    ]
  },
  {
    id: 'voter-id',
    numberBadge: 4,
    title: 'Voter ID',
    category: 'Identity',
    docNumber: 'GQF0193532',
    rawDocNumber: 'GQF0193532',
    holderName: 'Ashraf Ahmed',
    fatherName: 'Md Safiqur Rahman',
    dob: '01-01-1999',
    issuer: 'Election Commission of India',
    issueDate: '15-05-2026',
    expiryDate: 'Lifetime Validity',
    badge: 'Electoral ID',
    status: 'Uploaded',
    address: '204, Sheralipur (Blk-1 & 2), Badarpur, Bhanga Bazar, District - Sribhumi, Assam - 788701',
    image: docImg('voter_id.webp'),
    notes: 'Assembly Constituency 123 - Karimganj North, Polling Station 634 NO.SHERALIPUR L.P. SCHOOL.',
    tags: ['Voter ID', 'EPIC', 'Election Commission', 'Constituency 123'],
    keyFields: [
      { label: 'EPIC Number', value: 'GQF0193532', copyable: true, highlight: true },
      { label: 'Assembly Constituency', value: '123-KARIMGANJ NORTH' },
      { label: 'Polling Station', value: '634 NO.SHERALIPUR L.P. SCHOOL' },
      { label: 'Serial No', value: '631', copyable: true }
    ]
  },
  {
    id: 'identification-certificate',
    numberBadge: 5,
    title: 'Passport / Verification',
    category: 'Certificates',
    docNumber: 'Memo LGP / Sl. 34',
    rawDocNumber: 'Memo LGP / Sl. 34 (Holding 193)',
    holderName: 'Ashraf Ahmed',
    fatherName: 'Md. Safiqur Rahman',
    issuer: 'Office of the Lamajuar Gaon Panchayat, Dist. Sribhumi, Assam',
    issueDate: '29/09/2026',
    expiryDate: 'Official Certificate',
    badge: 'Passport Verification',
    status: 'Uploaded',
    image: docImg('identification_certificate.webp'),
    notes: 'Official residence & identification certificate issued for the purpose of Applying for Passport. Holding No. 193.',
    tags: ['Passport', 'Panchayat', 'Verification', 'Assam'],
    keyFields: [
      { label: 'Certificate Sl. No', value: '34 (Memo LGP)', copyable: true, highlight: true },
      { label: 'Holding Number', value: '193', copyable: true },
      { label: 'Issued For Purpose', value: 'Applying for Passport', highlight: true }
    ]
  },
  {
    id: 'marriage-certificate',
    numberBadge: 6,
    title: 'Marriage Certificate',
    category: 'Certificates',
    docNumber: 'MMR/SKB/C-572/2022',
    rawDocNumber: 'MMR/SKB/C-572/2022',
    holderName: 'Ashraf Ahmed & Sajida Sultana',
    issuer: 'Govt. of Assam — Muslim Marriage Registrar (Quazi), Karimganj',
    issueDate: '16/12/2022',
    expiryDate: 'Permanent Legal Record',
    badge: 'Nikahnama',
    status: 'Uploaded',
    image: docImg('marriage_certificate.webp'),
    notes: 'Solemnized on 07/12/2022. Registered in Office of Muslim Marriage Registrar under Mahamadan Law (Shariat Act).',
    tags: ['Marriage', 'Nikahnama', 'Govt of Assam', 'Legal Record'],
    keyFields: [
      { label: 'Ref Number', value: 'MMR/SKB/C-572/2022', copyable: true, highlight: true },
      { label: 'Register Serial No', value: '1339 of 2022', copyable: true },
      { label: 'Groom', value: 'Ashraf Ahmed s/o Safiqur Rahman' },
      { label: 'Bride', value: 'Sajida Sultana d/o Maulana Abdul Gani' }
    ]
  },
  {
    id: 'hifz-certificate',
    numberBadge: 7,
    title: 'Education Certificate',
    category: 'Education',
    docNumber: 'No. 6745/56',
    rawDocNumber: 'No. 6745/56',
    holderName: 'Hafiz Mohammad Ashraf Ahmed',
    fatherName: 'Mohammad Safiqur Rahman',
    issuer: 'Jamia Islamia Ishaatul Uloom Akkalkuwa, Maharashtra',
    issueDate: '31/05/2015',
    expiryDate: 'Lifetime Honor',
    badge: 'Sanad Distinction',
    status: 'Uploaded',
    image: docImg('hifz_certificate.webp'),
    notes: 'Completed complete memorization of the Holy Quran (Hifz) with distinction (Aala grade) at Jamia Islamia Ishaatul Uloom Akkalkuwa.',
    tags: ['Hifz', 'Sanad', 'Islamic Certificate', 'Akkalkuwa', 'Honor'],
    keyFields: [
      { label: 'Sanad Number', value: '6745/56', copyable: true, highlight: true },
      { label: 'Honorific', value: 'Hafiz Mohammad Ashraf Ahmed' },
      { label: 'Institution', value: 'Jamia Islamia Ishaatul Uloom Akkalkuwa' },
      { label: 'Result', value: 'Aala (Distinction / First Class)', highlight: true }
    ]
  },
  {
    id: 'hdfc-account',
    numberBadge: 8,
    title: 'Bank Passbook',
    category: 'Banking',
    docNumber: '50100552781561',
    rawDocNumber: '50100552781561',
    holderName: 'ASHRAF AHMED',
    issuer: 'HDFC Bank Ltd — Shikrapur Branch',
    issueDate: '30/08/2022',
    expiryDate: 'Active Account',
    badge: 'HDFC Savings',
    status: 'Uploaded',
    image: docImg('bank_passbook.webp'),
    notes: 'Primary HDFC Savings Bank account at Shikrapur Branch (Code 2872), Tal Shirur, Dist Pune.',
    tags: ['Bank', 'HDFC Bank', 'Passbook', 'IFSC', 'Finance'],
    keyFields: [
      { label: 'Account Number', value: '50100552781561', copyable: true, highlight: true },
      { label: 'IFSC Code', value: 'HDFC0002872', copyable: true, highlight: true },
      { label: 'Customer ID', value: '205199504', copyable: true },
      { label: 'Branch Name', value: 'SHIKRAPUR [Code: 2872]' }
    ]
  },
  {
    id: 'hdfc-debit-card',
    numberBadge: 9,
    title: 'Debit Card (HDFC)',
    category: 'Banking',
    docNumber: '4191 •••• •••• 1157',
    rawDocNumber: '4191 8802 3171 1157',
    holderName: 'Ashraf Ahmed',
    issuer: 'HDFC Bank / VISA Platinum',
    issueDate: '08/2022',
    expiryDate: '08/27',
    badge: 'VISA Platinum',
    status: 'Uploaded',
    image: docImg('hdfc_debit_card.webp'),
    notes: 'HDFC MoneyBack Contactless Chip Debit Card linked to primary savings account.',
    tags: ['Debit Card', 'HDFC', 'Visa', 'Card', 'Banking'],
    keyFields: [
      { label: 'Card Number', value: '4191 8802 3171 1157', copyable: true, maskable: true, highlight: true },
      { label: 'Valid Thru', value: '08/27', copyable: true },
      { label: 'Card Network', value: 'VISA Platinum Contactless' }
    ]
  },
  {
    id: 'discover-pulse-card',
    numberBadge: 10,
    title: 'Discover / Pulse Card',
    category: 'Banking',
    docNumber: '3615 •••• •••• 0666',
    rawDocNumber: '3615 730149 0666',
    holderName: 'Ashraf Ahmed',
    issuer: 'Discover / Pulse Network',
    issueDate: '11/2025',
    expiryDate: '11/30',
    badge: 'Pulse / Discover',
    status: 'Uploaded',
    image: docImg('discover_card.webp'),
    notes: 'Discover / Pulse network payment card. Valid thru Nov 2030.',
    tags: ['Payment Card', 'Discover', 'Pulse', 'Financial'],
    keyFields: [
      { label: 'Card Number', value: '3615 730149 0666', copyable: true, maskable: true },
      { label: 'Valid Thru', value: '11/30', copyable: true },
      { label: 'CVV Security Code', value: '257', copyable: true, sensitive: true }
    ]
  },
  {
    id: 'school-leaving-certificate',
    numberBadge: 11,
    title: 'School TC Certificate',
    category: 'Education',
    docNumber: 'No. 45/26',
    rawDocNumber: 'No. 45/26',
    holderName: 'ASHRAF AHMED',
    fatherName: 'MD SAFIQUR RAHMAN',
    motherName: 'MARIAM BEGUM',
    dob: '01/01/1999',
    issuer: 'Office of Headmaster, Janakalyan M. E. School',
    issueDate: '28/09/2026',
    expiryDate: 'Permanent Record',
    badge: 'School TC',
    status: 'Uploaded',
    image: docImg('school_leaving_certificate.webp'),
    notes: 'Transfer / School Leaving Certificate. Completed Class VIII on 31/12/2011.',
    tags: ['School', 'TC', 'Janakalyan', 'Academic'],
    keyFields: [
      { label: 'Certificate No', value: '45/26', copyable: true },
      { label: 'Mother Name', value: 'MARIAM BEGUM' },
      { label: 'Father Name', value: 'MD SAFIQUR RAHMAN' }
    ]
  }
];

export const PROFILE_INFO = {
  fullName: 'Ashraf Ahmed',
  honorific: 'Hafiz Mohammad Ashraf Ahmed',
  greetingName: 'Ashraf Ahmed',
  dob: '01 January 1999',
  gender: 'Male',
  fatherName: 'Md. Safiqur Rahman',
  motherName: 'Mariam Begum',
  spouseName: 'Sajida Sultana',
  primaryMobile: '+91 91706 62037',
  permanentAddress: '204, Village Sheralipur, P.O. Lamajuar, P.S. Badarpur, District Sribhumi / Karimganj, Assam - 788701',
  currentAddress: 'Gat No. 983/3B, Pune-Nagar Road, Near Malthan Phata, Shikrapur, Tal. Shirur, Dist. Pune, Maharashtra - 412208',
  quickNumbers: [
    { label: 'Aadhaar', value: '6431 7055 4663' },
    { label: 'PAN', value: 'DJKPA4828J' },
    { label: 'Voter ID', value: 'GQF0193532' },
    { label: 'Driving Lic.', value: 'MH12 20220062042' },
    { label: 'HDFC A/C', value: '50100552781561' },
    { label: 'IFSC Code', value: 'HDFC0002872' }
  ]
};

export const QUICK_TIPS = [
  {
    icon: 'Smartphone',
    title: 'Always keep these images updated',
    desc: 'Take clear photos with readable numbers and dates.'
  },
  {
    icon: 'Cloud',
    title: 'Encrypted offline and cloud storage',
    desc: 'Instant access anytime, even without an active internet connection.'
  },
  {
    icon: 'Lock',
    title: 'Keep your device password protected',
    desc: 'Secure vault lock prevents unauthorized access.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Useful during verification, travel or emergencies',
    desc: 'Instant 1-click copy when filling official forms.'
  }
];

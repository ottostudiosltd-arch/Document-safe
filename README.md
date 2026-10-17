# 🛡️ DocuSafe PWA — Personal Document Vault

> **A Secure, High-Performance Progressive Web App (PWA) Document Vault built for Ashraf Ahmed.**

DocuSafe is designed to safely store, categorize, view, and quickly copy essential personal, identity, educational, and financial documents with 100% offline access.

---

## ✨ Key Features

- **📱 Fully Installable PWA (Progressive Web App):**
  - Works on Android, iOS, Windows, Mac, and Linux.
  - Installable directly to home screen or desktop.
  - 100% Offline Support powered by Service Worker caching.

- **🗂️ Pre-Cataloged Documents with High-Precision Metadata:**
  - **Aadhaar Card** (Front & Back view with flip support, VID, and masked display)
  - **Permanent Account Number (PAN Card)**
  - **Election Commission Voter ID Card (e-EPIC)**
  - **Maharashtra State Motor Driving Licence (MCWG)**
  - **HDFC Bank Savings Account Passbook** (Account No, IFSC, Customer ID, MICR)
  - **HDFC MoneyBack VISA Platinum Debit Card**
  - **Discover / Pulse Global Payment Card** (with CVV eye toggle)
  - **Government Marriage Certificate (Nikahnama)**
  - **Lamajuar Gaon Panchayat Identification Certificate** (Passport purpose)
  - **Janakalyan School Leaving / Transfer Certificate (TC)**
  - **Sanad Takmeel Hifz-ul-Quran** (Quran Graduation Certificate with Distinction)

- **⚡ 1-Click Quick Copy & Form-Filler Cheat-Sheet:**
  - Instant copy buttons for all document IDs, bank details, and addresses.
  - Eliminates manual typing errors when applying for passports, loans, jobs, or KYC verifications.

- **🔍 Smart Search & Categorization:**
  - Instant client-side search across document numbers, issuer names, tags, and notes.
  - Filter by category: Identity, Banking, Licence, Education & Hifz, Certificates.
  - Sort by Recent, Name (A-Z), and Expiry.
  - Grid View & List View toggles.

- **🖼️ Interactive Image Inspection Modal:**
  - Zoom In / Zoom Out / Reset controls.
  - 90-degree image rotation.
  - Print layout support.
  - Download high-res document images.
  - Dual-side flip support for two-sided documents (Aadhaar).

- **➕ Add New Documents & Local Persistence:**
  - Add new documents using device camera or file upload.
  - Stores files and metadata safely in browser storage (`localStorage`).
  - One-click JSON backup export and restore.

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/ottostudiosltd-arch/Document-safe.git

# Navigate to project directory
cd Document-safe

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 🔒 Security & Privacy
- **Client-Side Only**: All document data is stored locally on the client's device. No documents are uploaded to untrusted external third-party servers.
- **Offline First**: Service worker caches all images and scripts for fast, offline viewing anywhere without internet access.

---

## 🛠️ Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **PWA:** Web App Manifest + Service Worker Cache API

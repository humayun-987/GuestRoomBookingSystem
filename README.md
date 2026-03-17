<div align="center">

# 🏛️ IITK Guest Room Management System

**A full-stack hostel guest room booking portal for IIT Kanpur**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5-0170FE?style=flat-square&logo=antdesign)](https://ant.design)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Document%20Upload-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

*Streamlining guest room bookings across IIT Kanpur hostels — from request to check-out.*

[Features](#-features) · [Roles](#-roles) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Firestore Schema](#-firestore-schema) · [Deployment](#-deployment)

---

</div>

## 📸 Overview

GRMS is a role-based web application that manages the complete lifecycle of guest room bookings at IIT Kanpur hostels. Students apply for guest rooms, wardens review and approve requests, caretakers handle physical check-in/check-out, and administrators oversee the entire system — all through a single unified portal.

The system enforces institutional access control at every level: only `@iitk.ac.in` email addresses are accepted, staff accounts require invite codes, and sensitive admin actions require passkey verification.

---

## ✨ Features

### For Students
- Self-registration with `@iitk.ac.in` email enforcement
- Room availability map with real-time status (Available / Booked / Pending / Maintenance)
- Multi-step booking form with guest details, dates, and purpose
- Mandatory document upload — Aadhar, College ID, Guest ID (via Cloudinary)
- Email notification assistant — pre-filled email body, subject, CC ready to copy and send to warden
- Live warden decision ticker on dashboard (colour-coded: green / amber / red)
- Full booking history with status tracking

### For Wardens
- Scoped dashboard — only bookings for their assigned hostel
- One-click Approve / Conditional Approve / Reject actions
- Condition notes attached to approvals (visible to caretaker and student)
- Document viewer — opens each uploaded ID in a new tab for review

### For Caretakers
- Check-in / check-out guest management with timestamps
- Passkey displayed on dashboard (used by admin to unlock hostel for editing)
- Active guest list and booking history per hostel

### For Administrators
- Full hostel and room management (add hostels, configure rooms, toggle AC, set capacity)
- Session-based passkey unlock per hostel — caretaker's invite code is the hostel key
- Maintenance mode per room — set duration, auto-clears on expiry, cancels overlapping bookings
- System-wide booking oversight with filters by hostel and status
- Admin override cancel on any active booking (passkey + reason required)
- **Super Admin gate** — invite code management is locked behind a hardcoded passkey, invisible to regular admins

---

## 👥 Roles

| Role | Access Method | Responsibility |
|------|--------------|----------------|
| **Student** | Self-register (`@iitk.ac.in`) | Submit bookings, upload documents, track status |
| **Warden** | Invite code | Review and approve/reject bookings for their hostel |
| **Caretaker** | Invite code | Check guests in and out; owns the hostel passkey |
| **Admin** | Invite code | Manage rooms, monitor all bookings, generate invite codes |
| **Super Admin** | Hardcoded passkey | Generate/revoke invite codes and staff passkeys |

> Super Admin is not a separate account — it's an elevated mode within any admin session, activated by entering `IITK-GRMS-SA-2025` in the Invite Codes tab. **Change this before deploying to production.**

---

## 🔄 Booking Lifecycle

```
Student Submits
      │
      ▼
  [ PENDING ] ──── Warden Reviews ────┬──► [ APPROVED ]
                                      ├──► [ CONDITIONAL ]
                                      └──► [ REJECTED ]
                                               │
                          ┌────────────────────┘
                          ▼
                   Caretaker Acts
                          │
                    ┌─────┴──────┐
                    ▼            ▼
              [ CHECKED IN ]   (bypass)
                    │
                    ▼
              [ CHECKED OUT ]

  Admin / Maintenance can set ──► [ CANCELLED ] at any active stage
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + React Router v6 |
| UI Components | Ant Design 5 |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| File Storage | Cloudinary (unsigned upload preset) |
| Styling | Custom CSS-in-JS via injected style tags |
| Fonts | Cormorant Garamond (serif headings), system sans |
| Hosting | Firebase Hosting (recommended) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** and **Firestore** enabled
- A Cloudinary account with an unsigned upload preset

### 1. Clone the repository

```bash
git clone https://github.com/your-org/iitk-grms.git
cd iitk-grms
npm install
```

### 2. Configure Firebase

Create `src/firebaseConfig.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
```

### 3. Configure Cloudinary

In `src/pages/StudentDashboard.jsx`, update the upload constants:

```js
const CLOUD_NAME    = "your_cloud_name";
const UPLOAD_PRESET = "your_unsigned_preset";
```

### 4. Set the Super Admin Passkey

In `src/pages/AdminHostels.jsx`, line 17:

```js
const SUPER_ADMIN_KEY = "YOUR-CUSTOM-PASSKEY-HERE";
```

> ⚠️ This value lives only in source code — it is never written to the database.

### 5. Set the Portal URL

In `src/pages/StudentDashboard.jsx`:

```js
const PORTAL_URL = "https://your-deployed-domain.com";
```

### 6. Run locally

```bash
npm run dev
```

### 7. Set up Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Students can read/write their own profile
    match /users_student/{uid} {
      allow read, write: if request.auth.uid == uid;
    }

    // Staff profiles readable by authenticated users
    match /users_warden/{uid}    { allow read: if request.auth != null; allow write: if request.auth.uid == uid; }
    match /users_caretaker/{uid} { allow read: if request.auth != null; allow write: if request.auth.uid == uid; }
    match /users_admin/{uid}     { allow read: if request.auth != null; allow write: if request.auth.uid == uid; }

    // Bookings — students own theirs, staff read all
    match /bookings/{bookingId} {
      allow read:   if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }

    // Hostels and rooms — read by all authenticated, write by admin
    match /hostels/{hostelId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
      match /rooms/{roomId} {
        allow read, write: if request.auth != null;
      }
    }

    // Invite codes — read by authenticated users (passkey verified client-side)
    match /invite_codes/{codeId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📁 Project Structure

```
src/
├── firebaseConfig.js          # Firebase initialisation
├── index.js                   # App entry point + routes
│
├── components/
│   ├── NavigationBar.jsx
│   └── SizedBox.jsx
│
└── pages/
    ├── PortalTheme.js          # Global CSS variables + shared styles
    ├── AuthContext.jsx         # Auth state, role detection, logout
    ├── ProtectedRoute.jsx      # Role-gated route wrapper
    │
    ├── LandingPage.jsx         # Public landing page
    ├── Login.jsx               # Sign-in page
    ├── Signup.jsx              # Multi-step registration (student + staff)
    │
    ├── StudentDashboard.jsx    # Booking form, status tracker, ticker
    ├── WardenDashboard.jsx     # Booking review and approval
    ├── CaretakerDashboard.jsx  # Check-in / check-out management
    ├── AdminHostels.jsx        # Hostel/room admin + super admin gate
    └── roomAvailability.jsx    # Public room status component
```

---

## 🗃 Firestore Schema

```
hostels/{hostelId}
  ├── name, createdAt
  └── rooms/{roomId}
        ├── capacity, ac, maintenance
        ├── maintenanceNote, maintenanceFrom, maintenanceTo, maintenanceDays

bookings/{bookingId}
  ├── hostelId, hostelName, roomId, roomCapacity, roomAc
  ├── studentId, studentName, phone
  ├── guestName, guestRelation, purpose
  ├── checkIn, checkOut, bookedAt
  ├── status: "pending" | "approved" | "conditional" | "rejected"
  │          | "checked_in" | "checked_out" | "cancelled"
  ├── wardenNote, reviewedAt, checkedInAt, checkedOutAt, cancelledAt
  └── documents: { aadhar, collegeId, guestId }   ← Cloudinary URLs

users_student/{uid}
  └── name, email, phone, rollNo, hostel, department, role, createdAt

users_warden/{uid}
  └── name, email, phone, role, hostelId, hostelName, createdAt

users_caretaker/{uid}
  └── name, email, phone, role, hostelId, hostelName, createdAt

users_admin/{uid}
  └── name, email, role, createdAt

invite_codes/{codeId}           ← Document ID = the passkey (e.g. CARETAKER-A3F9K2)
  └── role, hostelId, hostelName, used, createdAt, usedBy, usedAt
```

---

## 🔐 Security Model

The system has three independent layers of access control:

**1. Email domain enforcement**
All registrations require `@iitk.ac.in` — enforced client-side (live validation) and server-side (Firebase rejects other domains via a pre-check in signup logic).

**2. Invite code system**
Warden, caretaker, and admin accounts can only be created by redeeming a one-time invite code generated by a super admin. Codes are single-use and stored in Firestore.

**3. Passkey system (three tiers)**

| Passkey | What It Unlocks | Where It Lives |
|---------|----------------|----------------|
| Caretaker invite code ID | Hostel room editing (admin), booking cancellation (admin), hostel deletion (admin) | Firestore `invite_codes` collection |
| Caretaker dashboard display | Shown to caretaker on their dashboard for sharing with admin | Firestore (same doc ID) |
| Super Admin key | Invite Codes tab — generate / revoke all staff codes | **Hardcoded in source only** — never in database |

---

## 🚢 Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

### Environment checklist before going live

- [ ] Update `PORTAL_URL` in `StudentDashboard.jsx` to your live domain
- [ ] Change `SUPER_ADMIN_KEY` in `AdminHostels.jsx` from the default value
- [ ] Set Firestore security rules (see above)
- [ ] Enable Firebase Authentication → Email/Password provider
- [ ] Create Cloudinary upload preset (`iitk_docs`) set to **Unsigned**
- [ ] Delete all test Firebase Auth users and test Firestore documents
- [ ] Re-register all real staff accounts under the live system

---

## 📋 Routes

| Path | Component | Access |
|------|-----------|--------|
| `/` | `LandingPage` | Public |
| `/login` | `Login` | Public |
| `/signup` | `Signup` | Public |
| `/student/dashboard` | `StudentDashboard` | Role: student |
| `/warden/dashboard` | `WardenDashboard` | Role: warden |
| `/caretaker/dashboard` | `CaretakerDashboard` | Role: caretaker |
| `/admin/hostels` | `AdminHostels` | Role: admin |
| `*` | Redirect | → `/` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built for **IIT Kanpur** · Hostel Administration

*For issues or feature requests, open a GitHub issue.*

</div>

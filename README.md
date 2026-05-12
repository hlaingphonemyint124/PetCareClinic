# 🐾 PawCare Clinic — React + Supabase Full-Stack App

A production-ready, modern veterinary clinic system with **3D animated design**, **4-role dashboards**, and full **Supabase** backend integration.

---

## ✨ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router v6 |
| **Styling** | Tailwind CSS v3, Framer Motion (3D animations) |
| **3D / Animation** | Framer Motion, CSS 3D transforms, particle effects |
| **Charts** | Recharts |
| **Backend** | Supabase (PostgreSQL + Auth + RLS) |
| **Icons** | Lucide React |
| **Toast** | React Hot Toast |

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
cd pawcare-clinic
npm install
```

### 2. Configure Supabase
```bash
cp .env.example .env
```
Edit `.env` and fill in your values:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here
```

### 3. Set up the database
- Go to [supabase.com](https://supabase.com) → Your Project → SQL Editor
- Paste the entire contents of `supabase-schema.sql` and click **Run**

### 4. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## 🎭 Demo Login (No Supabase needed)

On the login page, click any demo button to instantly access:

| Role | Features |
|------|----------|
| **Pet Owner** | Pet profiles, medical history, vaccination tracker, appointments, invoices |
| **Veterinarian** | Schedule, patient records, prescription pad, lab results |
| **Receptionist** | Live queue, walk-in registration, check-in, invoices |
| **Admin** | Analytics dashboard, user/pet/service management, blog, settings |

---

## 📁 Project Structure

```
pawcare-clinic/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── supabase-schema.sql          ← Run this in Supabase SQL Editor
└── src/
    ├── main.jsx                 ← Entry point
    ├── App.jsx                  ← Router + providers
    ├── styles/
    │   └── globals.css          ← Tailwind + 3D animation styles
    ├── lib/
    │   ├── supabase.js          ← Supabase client + all DB helpers
    │   ├── AppContext.jsx       ← Global auth state
    │   └── demoData.js          ← Demo data for development
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx       ← Glassmorphism navbar
    │   │   └── Sidebar.jsx      ← Role-based dashboard sidebar
    │   ├── public/
    │   │   ├── Hero.jsx         ← 3D animated hero with floating cards
    │   │   └── Sections.jsx     ← Services, Vets, Blog, CTA, Footer
    │   └── shared/
    │       └── UI.jsx           ← Badge, Modal, StatCard, Table, etc.
    └── pages/
        ├── PublicPages.jsx      ← Home, About, Services, Vets, Blog,
        │                           Contact, Booking, Login, Register
        ├── OwnerPages.jsx       ← Owner dashboard (5 pages)
        └── DashboardPages.jsx   ← Vet, Receptionist, Admin dashboards
```

---

## 🌐 Pages

### Public Website
| Route | Page |
|-------|------|
| `/` | Home — Hero, Services, Vets, Testimonials, Blog, CTA |
| `/about` | About — Story, mission, certifications |
| `/services` | Services — All services with pricing |
| `/vets` | Doctors — Vet profiles with booking |
| `/blog` | Blog — Pet care articles with categories |
| `/contact` | Contact — Form, map, hours |
| `/booking` | Appointment booking — 5-step wizard |
| `/login` | Sign in (demo + Supabase Auth) |
| `/register` | Create account |

### Owner Dashboard (`/dashboard/owner/*`)
- Dashboard overview
- Pet profiles (CRUD)
- Medical history timeline
- Vaccination tracker + certificates
- Appointments (upcoming + history)
- Invoices & payments

### Vet Dashboard (`/dashboard/vet/*`)
- Daily schedule with real-time status
- Patient list
- Add diagnosis / medical record
- Prescription pad (add/remove meds)
- Lab results (CBC table viewer)

### Reception Dashboard (`/dashboard/reception/*`)
- Live queue management
- Walk-in registration
- Appointment check-in
- Customer management
- Invoice builder

### Admin Dashboard (`/dashboard/admin/*`)
- Analytics (revenue charts, service mix pie chart)
- User management (CRUD + roles)
- All pets management
- Services pricing management
- Blog post management
- System settings + Supabase config

---

## 🗄️ Database Schema

**13 tables** in `supabase-schema.sql`:

| Table | Purpose |
|-------|---------|
| `users` | All staff, vets, owners |
| `pets` | Pet profiles |
| `services` | Clinic services + pricing |
| `appointments` | Bookings |
| `medical_records` | Diagnoses, treatments, prescriptions |
| `vaccinations` | Vaccine records + certificates |
| `payments` | Invoices + payments |
| `payment_items` | Line items per invoice |
| `lab_results` | CBC, X-ray, ultrasound results |
| `prescriptions` | Prescription pads |
| `blog_posts` | Pet care articles |
| `reminders` | Vaccine/appointment reminders |
| `queue` | Reception live queue |

**4 views** for common queries:
- `upcoming_vaccinations` — due within 30 days
- `todays_schedule` — today's appointments
- `monthly_revenue` — revenue by month
- `pet_health_overview` — pet summary with overdue vaccines

**Auto-triggers:**
- `updated_at` auto-timestamps
- `invoice_number` auto-generation
- User profile auto-creation on Supabase Auth signup

---

## 🔐 Authentication

### With Supabase (Production)
1. Enable **Email** provider in Supabase Auth settings
2. Optionally enable **Google OAuth** (add client credentials)
3. The `handle_new_user()` trigger auto-creates a `users` row on signup
4. Set user role: `update users set role = 'vet' where email = 'vet@example.com';`

### Row Level Security
All tables have RLS enabled with policies:
- **Owners** — see only their own pets, appointments, records
- **Vets** — see all patients, manage clinical records
- **Receptionists** — manage queue, appointments, invoices
- **Admins** — full access to everything

---

## 🎨 Design System

### Colors (in `tailwind.config.js`)
```js
green:  '#00e5a0'  // Primary actions, healthy status
amber:  '#ffb84d'  // Warnings, upcoming
blue:   '#4da6ff'  // Info, male indicator
red:    '#ff4d6d'  // Danger, overdue, urgent
purple: '#b48aff'  // Specialty, premium
teal:   '#2dd4bf'  // Teal accents
```

### 3D Effects
- **Glassmorphism** — `glass`, `glass-green`, `glass-strong` classes
- **3D card hover** — `vet-card-3d` class (perspective transform)
- **Floating cards** — `float-card-1/2/3` animations
- **Particle field** — CSS animated particles in hero
- **Gradient text** — `gradient-text`, `gradient-text-warm`
- **Neon glow** — `neon-text`, `shadow-green-glow`
- **Ambient orbs** — radial gradient blobs with float animation

### Fonts
- **Instrument Serif** — Display headings (`font-display`)
- **Outfit** — Body text (`font-body`)

---

## 🚢 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```
Set env vars in Vercel dashboard.

### Netlify
```bash
npm run build
# Drag dist/ folder to netlify.com/drop
```

### Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 📞 Customization

Update clinic details in `src/components/public/Sections.jsx` (Footer) and `src/pages/PublicPages.jsx`:

```js
// Clinic info
name:      "PawCare Clinic"
address:   "123 Sukhumvit Road, Bangkok"
phone:     "02-xxx-xxxx"
emergency: "02-xxx-9999"
email:     "info@pawcare.co.th"
hours:     "Mon–Fri 8:00–20:00, Sat–Sun 9:00–18:00"
```

---

## 📄 License

MIT — Free for personal and commercial use.

Built with ❤️ for pet lovers. React + Supabase + Tailwind + Framer Motion.

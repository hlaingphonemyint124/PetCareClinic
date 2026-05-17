# PawCare Clinic — Real Test Accounts

## 🔐 Login at: http://localhost:5173/login

No demo buttons. Use these real credentials:

---

### 👑 Admin Account
| Field    | Value                      |
|----------|----------------------------|
| Email    | `admin@pawcare.co.th`      |
| Password | `PawCare@Admin2026`        |
| Role     | Administrator              |
| Name     | Admin Supanya              |
| Access   | Full system — analytics, users, all pets, services, settings |

---

### 🩺 Veterinarian Account
| Field    | Value                      |
|----------|----------------------------|
| Email    | `somchai@pawcare.co.th`    |
| Password | `PawCare@Vet2026`          |
| Role     | Veterinarian               |
| Name     | Dr. Somchai Panya          |
| Access   | Schedule, patients, records, prescriptions, lab results |

---

### 🗂️ Receptionist Account
| Field    | Value                      |
|----------|----------------------------|
| Email    | `nipa@pawcare.co.th`       |
| Password | `PawCare@Rec2026`          |
| Role     | Receptionist               |
| Name     | Nipa Ruangrit              |
| Access   | Queue, walk-ins, check-in, invoices, customers |

---

### 🐾 Pet Owner Account
| Field    | Value                      |
|----------|----------------------------|
| Email    | `john@petowner.com`        |
| Password | `PawCare@Owner2026`        |
| Role     | Pet Owner                  |
| Name     | John Park                  |
| Pets     | Buddy (Golden Retriever), Luna (Siamese Cat) |
| Access   | My pets, appointments, medical records, vaccinations, billing |

---

## 📌 Quick Notes

- These accounts work **without Supabase** (stored in memory)
- With Supabase connected, use the SQL below to create real DB users
- Pet owners can **book appointments** after signing in
- Booking requires login — unauthenticated users see a sign-in prompt

---

## 🗄️ To Create These in Supabase Auth

Run in Supabase Dashboard → Authentication → Users → Invite user,
or use the SQL in `supabase-schema.sql` and also run `supabase-seed.sql`.

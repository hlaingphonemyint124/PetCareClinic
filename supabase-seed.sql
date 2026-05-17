-- ================================================================
-- PawCare Clinic — SEED DATA (supabase-seed.sql)
-- Run AFTER supabase-schema.sql
--
-- Creates 4 real user accounts + all test data
-- Accounts match TEST_ACCOUNTS.md credentials
-- ================================================================

-- ── STEP 1: Create auth users via Supabase Auth ──────────────────
-- Run these in the Supabase Dashboard → SQL Editor
-- They create auth.users entries and the trigger auto-creates
-- matching rows in the public.users table.

-- NOTE: Replace with real UUIDs after running auth.users inserts.
-- For testing, you can use Supabase Dashboard → Authentication →
-- Add User to create each account, then note the UUID.

-- Placeholder UUIDs for seeding — replace with real ones:
-- Admin:        'aaaaaaaa-0001-0001-0001-000000000001'
-- Vet:          'bbbbbbbb-0002-0002-0002-000000000002'
-- Receptionist: 'cccccccc-0003-0003-0003-000000000003'
-- Owner:        'dddddddd-0004-0004-0004-000000000004'

-- ── STEP 2: Upsert public.users profiles ─────────────────────────
insert into users (id, name, email, role, phone, is_active) values
  ('aaaaaaaa-0001-0001-0001-000000000001', 'Admin Supanya',      'admin@pawcare.co.th',  'admin',         '02-111-2222', true),
  ('bbbbbbbb-0002-0002-0002-000000000002', 'Dr. Somchai Panya',  'somchai@pawcare.co.th','vet',           '02-111-3333', true),
  ('cccccccc-0003-0003-0003-000000000003', 'Nipa Ruangrit',      'nipa@pawcare.co.th',   'receptionist',  '02-111-4444', true),
  ('dddddddd-0004-0004-0004-000000000004', 'John Park',          'john@petowner.com',    'owner',         '081-234-5678',true)
on conflict (id) do update set
  name       = excluded.name,
  email      = excluded.email,
  role       = excluded.role,
  phone      = excluded.phone,
  is_active  = excluded.is_active;

-- ── STEP 3: Additional vets ───────────────────────────────────────
insert into users (id, name, email, role, phone, is_active) values
  ('eeeeeeee-0005-0005-0005-000000000005', 'Dr. Nattaya Siri',  'nattaya@pawcare.co.th', 'vet', '02-111-5555', true),
  ('ffffffff-0006-0006-0006-000000000006', 'Dr. James Wong',    'james@pawcare.co.th',   'vet', '02-111-6666', true),
  ('gggggggg-0007-0007-0007-000000000007', 'Dr. Priya Mehta',   'priya@pawcare.co.th',   'vet', '02-111-7777', true)
on conflict (id) do update set name = excluded.name;

-- ── STEP 4: Pets for John Park (Owner) ───────────────────────────
insert into pets (owner_id, pet_name, species, breed, gender, birth_date, weight, allergies, notes, is_active) values
  ('dddddddd-0004-0004-0004-000000000004', 'Buddy', 'Dog', 'Golden Retriever', 'Male',   '2021-05-12', 28.0, 'None known',
   'Friendly and energetic. Loves fetch. Very food motivated.', true),
  ('dddddddd-0004-0004-0004-000000000004', 'Luna',  'Cat', 'Siamese',          'Female', '2020-09-03', 4.2,  'Penicillin (skin reaction)',
   'Indoor cat. Shy with strangers. Requires gentle handling.', true);

-- Save pet IDs for reference
-- Buddy = pet id 1, Luna = pet id 2 (adjust if needed based on your auto-increment)

-- ── STEP 5: Appointments ─────────────────────────────────────────
insert into appointments (pet_id, vet_id, service_id, service_name, appointment_date, status, room, notes, created_by) values
  -- Upcoming
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 1, 'General Consultation', now() + interval '2 days' + interval '10 hours', 'confirmed', 'Room 3', 'Annual wellness checkup', 'dddddddd-0004-0004-0004-000000000004'),
  (2, 'gggggggg-0007-0007-0007-000000000007', 2, 'Vaccination — Core',   now() + interval '5 days' + interval '14 hours', 'pending',   'Room 1', 'FVRCP booster overdue',    'dddddddd-0004-0004-0004-000000000004'),
  -- Past completed
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 4, 'CBC Blood Panel',      now() - interval '30 days', 'completed', 'Room 3', 'Pre-surgical bloodwork', 'dddddddd-0004-0004-0004-000000000004'),
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 2, 'Vaccination — Core',   now() - interval '90 days', 'completed', 'Room 2', 'DHPP annual booster',    'dddddddd-0004-0004-0004-000000000004'),
  (2, 'gggggggg-0007-0007-0007-000000000007', 1, 'General Consultation', now() - interval '60 days', 'completed', 'Room 1', 'Skin irritation follow-up', 'dddddddd-0004-0004-0004-000000000004'),
  (1, 'eeeeeeee-0005-0005-0005-000000000005', 8, 'Dental Cleaning',      now() - interval '180 days','completed', 'Room 5', 'Scale & polish under anesthesia', 'dddddddd-0004-0004-0004-000000000004');

-- ── STEP 6: Medical Records ───────────────────────────────────────
insert into medical_records (pet_id, vet_id, appointment_id, complaint, diagnosis, treatment, prescription, notes, visit_date, follow_up_date, fee) values
  -- Buddy's records
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 3,
   'Annual wellness exam, owner reports mild ear scratching',
   'Routine Annual Wellness Exam + Mild Otitis Externa (Right Ear)',
   'Full physical examination. Ear flush and cytology performed. Blood draw for CBC + Chemistry panel.',
   'Otomax ear drops (Gentamicin/Betamethasone): 5 drops right ear BID × 7 days. Omega-3 supplement daily.',
   'All vitals within normal limits. Weight stable at 28kg. BCS 5/9. Heart/lungs clear. Dental tartar grade 2 — recommend cleaning. Ear cytology: Malassezia moderate, no bacteria.',
   now()::date - 30, now()::date + 14, 1500.00),

  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 4,
   'Annual vaccination appointment',
   'Vaccination Update — DHPP + Leptospirosis',
   'Administered DHPP 4-in-1 booster (SQ left shoulder) and Leptospirosis (SQ right shoulder). 15-min post-vaccine observation — no adverse reactions.',
   'No medications. Next DHPP due: July 2026. Rabies booster overdue — schedule asap.',
   'Microchip confirmed: 392-100-XXXXX. Owner reminded about Rabies overdue.',
   now()::date - 90, now()::date + 275, 800.00),

  (1, 'eeeeeeee-0005-0005-0005-000000000005', 6,
   'Scheduled dental cleaning — tartar grade 2-3',
   'Periodontal Disease Grade 2 — Dental Scaling & Polish',
   'Pre-anesthetic bloodwork reviewed (normal). IV catheter placed. Induced with Propofol, maintained on Isoflurane. Full mouth radiographs — no extractions required. Ultrasonic scaling + polishing all teeth. Recovery uneventful.',
   'Meloxicam 1.5mg/mL: 1mg/kg PO SID × 3 days with food. Chlorhexidine oral rinse: apply to gums BID × 7 days.',
   'Grade 2 generalized gingivitis. No tooth mobility. Owner educated on home dental care — daily brushing recommended. Next dental recheck in 6 months.',
   now()::date - 180, now()::date + 180, 3200.00),

  -- Luna's records
  (2, 'gggggggg-0007-0007-0007-000000000007', 5,
   'Owner reports excessive grooming, hair loss on lower abdomen and inner thighs x 3 weeks',
   'Feline Hypersensitivity Dermatitis — likely environmental/flea allergy',
   'Skin scraping (negative for mites). Tape cytology: eosinophils present. Trichogram: normal hair shafts. Intradermal allergy testing recommended.',
   'Prednisolone 5mg: 1 tab PO SID × 5 days, then every other day × 5 days. Revolution Plus (topical): apply monthly for flea prevention. Hill''s z/d diet trial: 8 weeks strict.',
   'No fleas found on examination but flea allergy most likely trigger. Penicillin allergy noted — avoid all beta-lactams. Owner instructed on strict diet trial protocol. Recheck in 4 weeks.',
   now()::date - 60, now()::date + 28, 1800.00);

-- ── STEP 7: Vaccinations ─────────────────────────────────────────
insert into vaccinations (pet_id, vet_id, vaccine_name, administered_date, next_due_date, batch_number, manufacturer) values
  -- Buddy
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 'DHPP Combo (Distemper/Hepatitis/Parvo/Parainfluenza)', '2025-07-05', '2026-07-05', 'BN-2025-4421', 'Zoetis'),
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 'Leptospirosis 4-way',  '2025-07-05', '2026-07-05', 'BN-2025-4422', 'Boehringer Ingelheim'),
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 'Rabies (3-year)',       '2023-07-05', '2026-01-05', 'BN-2023-1105', 'Merial'),
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 'Bordetella (Kennel Cough)','2025-09-12','2026-09-12','BN-2025-7732', 'Merck'),
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 'Canine Influenza H3N2',  '2025-01-10', '2026-05-20', 'BN-2025-0110', 'Zoetis'),
  -- Luna
  (2, 'gggggggg-0007-0007-0007-000000000007', 'FVRCP (Feline 3-in-1)', '2025-02-14', '2026-02-14', 'BN-2025-2201', 'Zoetis'),
  (2, 'gggggggg-0007-0007-0007-000000000007', 'Rabies (1-year feline)', '2025-08-20', '2026-08-20', 'BN-2025-5510', 'Merial'),
  (2, 'gggggggg-0007-0007-0007-000000000007', 'FeLV (Feline Leukemia)', '2025-02-14', '2026-02-14', 'BN-2025-2202', 'Boehringer Ingelheim');

-- ── STEP 8: Lab Results ───────────────────────────────────────────
insert into lab_results (pet_id, vet_id, appointment_id, test_type, result_data, interpretation, status, test_date) values
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 3, 'CBC + Chemistry Panel',
  '{
    "CBC": {
      "WBC":         {"value": "8.2",  "unit": "K/μL",   "ref": "6.0-17.0",  "status": "normal"},
      "RBC":         {"value": "6.4",  "unit": "M/μL",   "ref": "5.5-8.5",   "status": "normal"},
      "Hemoglobin":  {"value": "14.2", "unit": "g/dL",   "ref": "12.0-18.0", "status": "normal"},
      "Hematocrit":  {"value": "42",   "unit": "%",      "ref": "37-55",     "status": "normal"},
      "Platelets":   {"value": "285",  "unit": "K/μL",   "ref": "200-500",   "status": "normal"},
      "Neutrophils": {"value": "74",   "unit": "%",      "ref": "60-77",     "status": "normal"},
      "Lymphocytes": {"value": "18",   "unit": "%",      "ref": "12-30",     "status": "normal"},
      "Eosinophils": {"value": "7",    "unit": "%",      "ref": "2-10",      "status": "normal"}
    },
    "Chemistry": {
      "ALT":         {"value": "42",   "unit": "U/L",    "ref": "10-100",    "status": "normal"},
      "ALP":         {"value": "88",   "unit": "U/L",    "ref": "23-212",    "status": "normal"},
      "BUN":         {"value": "18",   "unit": "mg/dL",  "ref": "7-27",      "status": "normal"},
      "Creatinine":  {"value": "0.9",  "unit": "mg/dL",  "ref": "0.5-1.8",   "status": "normal"},
      "Glucose":     {"value": "98",   "unit": "mg/dL",  "ref": "70-138",    "status": "normal"},
      "Total Protein":{"value":"6.8",  "unit": "g/dL",   "ref": "5.2-8.2",   "status": "normal"},
      "Calcium":     {"value": "10.1", "unit": "mg/dL",  "ref": "8.9-11.4",  "status": "normal"}
    }
  }',
  'All CBC and chemistry parameters within normal reference ranges. No evidence of anemia, infection, hepatopathy, or azotemia. Patient is in excellent systemic health. Pre-surgical clearance granted.',
  'normal',
  now()::date - 30);

-- ── STEP 9: Prescriptions ─────────────────────────────────────────
insert into prescriptions (pet_id, vet_id, appointment_id, medications, instructions, refills) values
  (1, 'bbbbbbbb-0002-0002-0002-000000000002', 3,
  '[
    {"drug": "Otomax Ear Drops (Gentamicin/Betamethasone)", "dose": "5 drops", "frequency": "BID", "duration": "7 days", "route": "Right ear (otic)"},
    {"drug": "Omega-3 Fatty Acid Supplement (Nordic Naturals)", "dose": "1 capsule", "frequency": "SID", "duration": "Ongoing", "route": "Oral with food"}
  ]',
  'Give ear drops after cleaning ear with cotton ball. Give omega-3 with morning meal. Return if ear scratching persists after 7 days or worsens.',
  0),

  (2, 'gggggggg-0007-0007-0007-000000000007', 5,
  '[
    {"drug": "Prednisolone 5mg", "dose": "1 tablet (5mg)", "frequency": "SID × 5 days, then EOD × 5 days", "duration": "10 days total", "route": "Oral with food"},
    {"drug": "Revolution Plus (Selamectin/Sarolaner)", "dose": "1 pipette (blue = 2.5-5kg)", "frequency": "Monthly", "duration": "Ongoing", "route": "Topical — apply to back of neck"}
  ]',
  'IMPORTANT — Penicillin allergy on file. Never administer any beta-lactam antibiotic. Give Prednisolone with food to avoid stomach upset. Apply Revolution Plus by parting fur at base of neck. Monitor for vomiting or lethargy.',
  1);

-- ── STEP 10: Payments ─────────────────────────────────────────────
insert into payments (appointment_id, user_id, subtotal, tax_amount, total_amount, status, payment_method, paid_at) values
  (3, 'dddddddd-0004-0004-0004-000000000004', 1500.00, 105.00, 1605.00, 'paid',    'card',     now() - interval '30 days'),
  (4, 'dddddddd-0004-0004-0004-000000000004',  800.00,  56.00,  856.00, 'paid',    'qr',       now() - interval '90 days'),
  (5, 'dddddddd-0004-0004-0004-000000000004', 1800.00, 126.00, 1926.00, 'paid',    'cash',     now() - interval '60 days'),
  (6, 'dddddddd-0004-0004-0004-000000000004', 3200.00, 224.00, 3424.00, 'paid',    'card',     now() - interval '180 days'),
  (1, 'dddddddd-0004-0004-0004-000000000004',  500.00,  35.00,  535.00, 'pending', null,       null),
  (2, 'dddddddd-0004-0004-0004-000000000004',  350.00,  24.50,  374.50, 'pending', null,       null);

-- ── STEP 11: Payment line items ───────────────────────────────────
-- Get the payment IDs from above inserts (adjust IDs as needed)
insert into payment_items (payment_id, description, quantity, unit_price) values
  (1, 'General Physical Examination',          1,  500.00),
  (1, 'Ear Flush & Cytology',                  1,  400.00),
  (1, 'CBC Blood Panel',                       1,  800.00),
  (1, 'Otomax Ear Drops (14mL)',               1,  280.00),
  (1, 'Omega-3 Supplement (60 caps)',          1,  350.00),
  (2, 'DHPP Vaccination',                      1,  350.00),
  (2, 'Leptospirosis Vaccination',             1,  250.00),
  (2, 'Vaccination Consultation',             1,   200.00),
  (3, 'General Consultation',                  1,  500.00),
  (3, 'Intradermal Skin Testing',             1,   800.00),
  (3, 'Prednisolone 5mg x 10 tabs',           1,   120.00),
  (3, 'Revolution Plus (topical)',            1,    380.00),
  (4, 'Dental Scaling & Polishing',           1,  1200.00),
  (4, 'General Anaesthesia (30 min)',         1,   800.00),
  (4, 'Full Mouth Radiographs (10 views)',    1,   600.00),
  (4, 'IV Fluid Therapy',                    1,    350.00),
  (4, 'Meloxicam 1.5mg/mL (10mL)',           1,    250.00);

-- ── STEP 12: Reminders ────────────────────────────────────────────
insert into reminders (user_id, pet_id, type, title, message, due_date) values
  ('dddddddd-0004-0004-0004-000000000004', 1, 'vaccine',
   'Rabies Vaccine Overdue — Buddy',
   'Buddy''s Rabies vaccination is overdue since January 2026. Please schedule immediately.',
   now()::date),
  ('dddddddd-0004-0004-0004-000000000004', 1, 'vaccine',
   'Canine Influenza Due Soon — Buddy',
   'Buddy''s Canine Influenza H3N2 vaccine is due in 7 days (May 20, 2026).',
   now()::date + 7),
  ('dddddddd-0004-0004-0004-000000000004', 2, 'vaccine',
   'FVRCP Vaccination Overdue — Luna',
   'Luna''s FVRCP (Feline 3-in-1) vaccine was due Feb 14, 2026 and is now overdue.',
   now()::date - 90),
  ('dddddddd-0004-0004-0004-000000000004', 2, 'vaccine',
   'FeLV Vaccination Overdue — Luna',
   'Luna''s Feline Leukemia vaccine is overdue. Please schedule at next visit.',
   now()::date - 90),
  ('dddddddd-0004-0004-0004-000000000004', 1, 'appointment',
   'Upcoming Appointment — General Checkup',
   'Reminder: Buddy has a General Checkup with Dr. Somchai in 2 days.',
   now()::date + 2),
  ('dddddddd-0004-0004-0004-000000000004', 1, 'checkup',
   'Dental Recheck Due — Buddy',
   'Buddy is due for a dental recheck (6 months post-cleaning). Please schedule.',
   now()::date + 30);

-- ── STEP 13: Blog posts (published sample) ────────────────────────
update blog_posts set
  author_id = 'bbbbbbbb-0002-0002-0002-000000000002',
  is_published = true,
  published_at = now() - interval '4 months'
where title like '%Dog%';

update blog_posts set
  author_id = 'eeeeeeee-0005-0005-0005-000000000005',
  is_published = true,
  published_at = now() - interval '3 months'
where title like '%Cat%';

-- ── DONE ─────────────────────────────────────────────────────────
-- Summary of seeded data:
--   4 user accounts (admin, vet, receptionist, owner)
--   3 additional vet profiles
--   2 pets (Buddy the Golden Retriever, Luna the Siamese cat)
--   6 appointments (2 upcoming, 4 completed)
--   4 medical records with full clinical detail
--   8 vaccination records
--   1 detailed lab result (CBC + Chemistry with JSON data)
--   2 prescriptions with medication details
--   6 payments (4 paid, 2 pending) with line items
--   6 reminders (overdue vaccines + upcoming appts)
-- ================================================================

-- ================================================================
-- PawCare Clinic — Complete Supabase SQL Schema
-- Run this in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql
-- ================================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ================================================================
-- TABLES
-- ================================================================

-- ── USERS ────────────────────────────────────────────────────────
create table if not exists users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text unique not null,
  role        text not null default 'owner'
                check (role in ('owner','vet','receptionist','admin')),
  phone       text,
  avatar_url  text,
  is_active   boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── PETS ─────────────────────────────────────────────────────────
create table if not exists pets (
  id           bigint generated always as identity primary key,
  owner_id     uuid references users(id) on delete cascade,
  pet_name     text not null,
  species      text check (species in ('Dog','Cat','Rabbit','Bird','Reptile','Hamster','Other')),
  breed        text,
  gender       text check (gender in ('Male','Female','Unknown')),
  birth_date   date,
  weight       numeric(6,2),
  allergies    text,
  microchip    text,
  color        text,
  photo_url    text,
  notes        text,
  is_active    boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── SERVICES ─────────────────────────────────────────────────────
create table if not exists services (
  id               bigint generated always as identity primary key,
  service_name     text not null,
  description      text,
  price            numeric(10,2) not null,
  duration_minutes int,
  category         text check (category in ('consultation','vaccination','diagnostics','surgery','dental','grooming','boarding','emergency','other')),
  icon             text default '🩺',
  is_active        boolean default true,
  created_at       timestamptz default now()
);

-- ── APPOINTMENTS ─────────────────────────────────────────────────
create table if not exists appointments (
  id               bigint generated always as identity primary key,
  pet_id           bigint references pets(id) on delete cascade,
  vet_id           uuid references users(id) on delete set null,
  service_id       bigint references services(id) on delete set null,
  service_name     text,
  appointment_date timestamptz not null,
  duration_minutes int default 30,
  status           text default 'pending'
                     check (status in ('pending','confirmed','in_progress','completed','cancelled','no_show')),
  room             text,
  notes            text,
  created_by       uuid references users(id),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── MEDICAL RECORDS ───────────────────────────────────────────────
create table if not exists medical_records (
  id               bigint generated always as identity primary key,
  pet_id           bigint references pets(id) on delete cascade,
  vet_id           uuid references users(id) on delete set null,
  appointment_id   bigint references appointments(id) on delete set null,
  complaint        text,
  diagnosis        text not null,
  treatment        text,
  prescription     text,
  notes            text,
  visit_date       date not null default current_date,
  follow_up_date   date,
  fee              numeric(10,2),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── VACCINATIONS ──────────────────────────────────────────────────
create table if not exists vaccinations (
  id                bigint generated always as identity primary key,
  pet_id            bigint references pets(id) on delete cascade,
  vet_id            uuid references users(id) on delete set null,
  appointment_id    bigint references appointments(id) on delete set null,
  vaccine_name      text not null,
  administered_date date not null,
  next_due_date     date,
  batch_number      text,
  manufacturer      text,
  route             text default 'subcutaneous',
  site              text,
  certificate_id    text unique default (
    'CERT-' || to_char(now(),'YYYY') || '-' || lpad(floor(random()*99999)::text, 5, '0')
  ),
  created_at        timestamptz default now()
);

-- ── PAYMENTS ──────────────────────────────────────────────────────
create table if not exists payments (
  id               bigint generated always as identity primary key,
  appointment_id   bigint references appointments(id) on delete set null,
  user_id          uuid references users(id) on delete set null,
  subtotal         numeric(10,2) not null default 0,
  tax_amount       numeric(10,2) not null default 0,
  discount         numeric(10,2) not null default 0,
  total_amount     numeric(10,2) not null,
  status           text default 'pending'
                     check (status in ('pending','paid','partial','refunded','void')),
  payment_method   text check (payment_method in ('cash','card','qr','transfer','insurance')),
  invoice_number   text unique default (
    'INV-' || to_char(now(),'YYYY') || '-' || lpad(floor(random()*9999)::text, 4, '0')
  ),
  notes            text,
  paid_at          timestamptz,
  created_at       timestamptz default now()
);

-- ── PAYMENT ITEMS ─────────────────────────────────────────────────
create table if not exists payment_items (
  id           bigint generated always as identity primary key,
  payment_id   bigint references payments(id) on delete cascade,
  description  text not null,
  quantity     int not null default 1,
  unit_price   numeric(10,2) not null,
  total        numeric(10,2) generated always as (quantity * unit_price) stored
);

-- ── LAB RESULTS ───────────────────────────────────────────────────
create table if not exists lab_results (
  id               bigint generated always as identity primary key,
  pet_id           bigint references pets(id) on delete cascade,
  vet_id           uuid references users(id) on delete set null,
  appointment_id   bigint references appointments(id) on delete set null,
  test_type        text not null,
  result_data      jsonb,
  interpretation   text,
  status           text default 'pending'
                     check (status in ('normal','abnormal','critical','pending')),
  test_date        date not null default current_date,
  created_at       timestamptz default now()
);

-- ── PRESCRIPTIONS ─────────────────────────────────────────────────
create table if not exists prescriptions (
  id               bigint generated always as identity primary key,
  pet_id           bigint references pets(id) on delete cascade,
  vet_id           uuid references users(id) on delete set null,
  appointment_id   bigint references appointments(id) on delete set null,
  rx_number        text unique default ('RX-' || to_char(now(),'YYYY') || '-' || lpad(floor(random()*9999)::text, 4, '0')),
  medications      jsonb not null default '[]',
  instructions     text,
  refills          int default 0,
  is_active        boolean default true,
  created_at       timestamptz default now()
);

-- ── BLOG POSTS ────────────────────────────────────────────────────
create table if not exists blog_posts (
  id           bigint generated always as identity primary key,
  title        text not null,
  slug         text unique,
  content      text,
  excerpt      text,
  category     text,
  tags         text[],
  emoji        text default '📝',
  author_id    uuid references users(id) on delete set null,
  is_published boolean default false,
  published_at timestamptz,
  read_time    text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── REMINDERS ─────────────────────────────────────────────────────
create table if not exists reminders (
  id           bigint generated always as identity primary key,
  user_id      uuid references users(id) on delete cascade,
  pet_id       bigint references pets(id) on delete cascade,
  type         text check (type in ('vaccine','appointment','checkup','medication','grooming')),
  title        text not null,
  message      text,
  due_date     date not null,
  is_sent      boolean default false,
  created_at   timestamptz default now()
);

-- ── QUEUE ─────────────────────────────────────────────────────────
create table if not exists queue (
  id               bigint generated always as identity primary key,
  appointment_id   bigint references appointments(id) on delete cascade,
  queue_number     int,
  status           text default 'waiting'
                     check (status in ('waiting','in-room','completed','skipped')),
  priority         text default 'normal'
                     check (priority in ('normal','urgent','emergency')),
  checked_in_at    timestamptz default now(),
  room             text,
  created_at       timestamptz default now()
);

-- ================================================================
-- INDEXES
-- ================================================================
create index if not exists idx_pets_owner on pets(owner_id);
create index if not exists idx_pets_species on pets(species);
create index if not exists idx_appointments_pet on appointments(pet_id);
create index if not exists idx_appointments_vet on appointments(vet_id);
create index if not exists idx_appointments_date on appointments(appointment_date);
create index if not exists idx_appointments_status on appointments(status);
create index if not exists idx_medical_records_pet on medical_records(pet_id);
create index if not exists idx_vaccinations_pet on vaccinations(pet_id);
create index if not exists idx_vaccinations_due on vaccinations(next_due_date);
create index if not exists idx_payments_user on payments(user_id);
create index if not exists idx_payments_status on payments(status);
create index if not exists idx_blog_posts_published on blog_posts(is_published, published_at desc);

-- ================================================================
-- AUTO-UPDATE TRIGGERS
-- ================================================================
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger trg_users_updated before update on users for each row execute procedure update_updated_at();
create trigger trg_pets_updated before update on pets for each row execute procedure update_updated_at();
create trigger trg_appointments_updated before update on appointments for each row execute procedure update_updated_at();
create trigger trg_medical_records_updated before update on medical_records for each row execute procedure update_updated_at();
create trigger trg_blog_posts_updated before update on blog_posts for each row execute procedure update_updated_at();

-- ================================================================
-- ROW LEVEL SECURITY
-- ================================================================
alter table users enable row level security;
alter table pets enable row level security;
alter table appointments enable row level security;
alter table medical_records enable row level security;
alter table vaccinations enable row level security;
alter table payments enable row level security;
alter table payment_items enable row level security;
alter table lab_results enable row level security;
alter table prescriptions enable row level security;
alter table reminders enable row level security;
alter table queue enable row level security;
alter table services enable row level security;
alter table blog_posts enable row level security;

-- Helper: get current user's role
create or replace function get_my_role()
returns text as $$
  select role from users where id = auth.uid()
$$ language sql security definer stable;

-- ── USERS policies ───────────────────────────────────────────────
create policy "Users can read own profile" on users for select using (id = auth.uid());
create policy "Staff can read all users" on users for select using (get_my_role() in ('vet','admin','receptionist'));
create policy "Admin can manage users" on users for all using (get_my_role() = 'admin');

-- ── SERVICES policies (public read) ──────────────────────────────
create policy "Public can read services" on services for select using (is_active = true);
create policy "Admin can manage services" on services for all using (get_my_role() = 'admin');

-- ── BLOG policies (public read of published) ─────────────────────
create policy "Public can read published blogs" on blog_posts for select using (is_published = true);
create policy "Admin can manage blogs" on blog_posts for all using (get_my_role() = 'admin');
create policy "Vets can create blogs" on blog_posts for insert with check (get_my_role() in ('vet','admin'));

-- ── PETS policies ────────────────────────────────────────────────
create policy "Owners see own pets" on pets for select using (owner_id = auth.uid());
create policy "Owners manage own pets" on pets for all using (owner_id = auth.uid());
create policy "Staff see all pets" on pets for select using (get_my_role() in ('vet','admin','receptionist'));
create policy "Staff can update pets" on pets for update using (get_my_role() in ('vet','admin','receptionist'));

-- ── APPOINTMENTS policies ─────────────────────────────────────────
create policy "Owners see own appointments" on appointments for select
  using (pet_id in (select id from pets where owner_id = auth.uid()));
create policy "Owners can book appointments" on appointments for insert
  with check (pet_id in (select id from pets where owner_id = auth.uid()));
create policy "Owners can cancel appointments" on appointments for update
  using (pet_id in (select id from pets where owner_id = auth.uid()) and status in ('pending','confirmed'));
create policy "Staff see all appointments" on appointments for select
  using (get_my_role() in ('vet','admin','receptionist'));
create policy "Staff can manage appointments" on appointments for all
  using (get_my_role() in ('vet','admin','receptionist'));

-- ── MEDICAL RECORDS policies ──────────────────────────────────────
create policy "Owners see own pet records" on medical_records for select
  using (pet_id in (select id from pets where owner_id = auth.uid()));
create policy "Vets can manage records" on medical_records for all
  using (get_my_role() in ('vet','admin'));
create policy "Receptionist read records" on medical_records for select
  using (get_my_role() = 'receptionist');

-- ── VACCINATIONS policies ─────────────────────────────────────────
create policy "Owners see own pet vaccines" on vaccinations for select
  using (pet_id in (select id from pets where owner_id = auth.uid()));
create policy "Staff manage vaccines" on vaccinations for all
  using (get_my_role() in ('vet','admin','receptionist'));

-- ── PAYMENTS policies ─────────────────────────────────────────────
create policy "Owners see own payments" on payments for select using (user_id = auth.uid());
create policy "Staff manage payments" on payments for all
  using (get_my_role() in ('admin','receptionist'));

-- ── LAB RESULTS policies ──────────────────────────────────────────
create policy "Owners see own lab results" on lab_results for select
  using (pet_id in (select id from pets where owner_id = auth.uid()));
create policy "Vets manage lab results" on lab_results for all
  using (get_my_role() in ('vet','admin'));

-- ── PRESCRIPTIONS policies ────────────────────────────────────────
create policy "Owners see own prescriptions" on prescriptions for select
  using (pet_id in (select id from pets where owner_id = auth.uid()));
create policy "Vets manage prescriptions" on prescriptions for all
  using (get_my_role() in ('vet','admin'));

-- ── REMINDERS policies ────────────────────────────────────────────
create policy "Users see own reminders" on reminders for select using (user_id = auth.uid());
create policy "System manages reminders" on reminders for all using (get_my_role() in ('admin','vet'));

-- ── QUEUE policies ────────────────────────────────────────────────
create policy "Staff manage queue" on queue for all
  using (get_my_role() in ('vet','admin','receptionist'));

-- ================================================================
-- SAMPLE DATA
-- ================================================================

-- Services
insert into services (service_name, description, price, duration_minutes, category, icon) values
  ('General Consultation',  'Full physical exam & wellness check', 500, 30, 'consultation', '🩺'),
  ('Vaccination — Core',    'DHPP / FVRCP / Rabies',              350, 15, 'vaccination',   '💉'),
  ('Vaccination — Lifestyle','Bordetella / Leptospirosis',         250, 15, 'vaccination',   '💉'),
  ('CBC Blood Panel',       'Complete blood count in-house',       800, 60, 'diagnostics',   '🔬'),
  ('Blood Chemistry Panel', 'Full metabolic panel',               1200, 60, 'diagnostics',   '🔬'),
  ('Digital X-Ray',         'Single radiographic view',           1200, 30, 'diagnostics',   '📡'),
  ('Ultrasound',            'Abdominal or cardiac imaging',       1500, 45, 'diagnostics',   '🖥️'),
  ('Dental Cleaning',       'Scaling + polishing under anesthesia',1200,150, 'dental',        '🦷'),
  ('Tooth Extraction',      'Per tooth, simple',                   800, 60, 'dental',        '🦷'),
  ('Grooming — Small',      'Bath + trim + nail for <10 kg',      400, 60, 'grooming',      '✂️'),
  ('Grooming — Large',      'Bath + trim + nail for 10 kg+',      700,120, 'grooming',      '✂️'),
  ('Pet Boarding',          'Overnight supervised stay',           600,1440,'boarding',       '🏨'),
  ('Emergency Consult',     '24/7 critical care surcharge',       1500, 30, 'emergency',     '🚑'),
  ('Spay Surgery',          'Female sterilization',               3500,180, 'surgery',       '⚕️'),
  ('Neuter Surgery',        'Male sterilization',                 2500, 90, 'surgery',       '⚕️'),
  ('Soft Tissue Surgery',   'General soft tissue procedures',     8000,240, 'surgery',       '⚕️');

-- Blog posts
insert into blog_posts (title, slug, excerpt, category, emoji, is_published, published_at, read_time) values
  ('10 Foods Your Dog Should Never Eat',        '10-foods-dogs-avoid',    'From chocolate to xylitol — everyday foods that are dangerous for dogs.',  'Nutrition',  '🥗', true,  now() - interval '4 months',  '5 min'),
  ('The Complete Cat Vaccination Guide',         'cat-vaccination-guide',  'Everything about core and non-core vaccines for your feline friend.',       'Prevention', '💉', true,  now() - interval '3 months',  '7 min'),
  ('How to Brush Your Pet''s Teeth at Home',     'pet-dental-home-care',   'Step-by-step guide to a dental routine your pet will tolerate.',             'Dental',     '🦷', true,  now() - interval '2 months',  '4 min'),
  ('Understanding Your Cat''s Sleep Patterns',   'cat-sleep-patterns',     'Cats sleep up to 16 hours — here''s what''s normal and what''s not.',        'Wellness',   '😴', true,  now() - interval '6 weeks',   '3 min'),
  ('Exercise Requirements for Dog Breeds',       'dog-exercise-guide',     'From border collies to bulldogs — how much exercise does your dog need?',    'Exercise',   '🏃', true,  now() - interval '1 month',   '6 min'),
  ('Pet First Aid: What Every Owner Should Know','pet-first-aid-basics',   'Essential skills that could save your pet''s life in an emergency.',          'First Aid',  '🌡️', false, null,                          '8 min');

-- ================================================================
-- USEFUL VIEWS
-- ================================================================

-- Upcoming vaccinations due within 30 days
create or replace view upcoming_vaccinations as
select
  v.id, v.vaccine_name, v.next_due_date, v.certificate_id,
  p.pet_name, p.species,
  u.name as owner_name, u.email as owner_email, u.phone as owner_phone,
  (v.next_due_date - current_date) as days_until_due
from vaccinations v
join pets p on p.id = v.pet_id
join users u on u.id = p.owner_id
where v.next_due_date between current_date - interval '7 days' and current_date + interval '30 days'
order by v.next_due_date;

-- Today's appointment schedule
create or replace view todays_schedule as
select
  a.id, a.appointment_date, a.status, a.room, a.service_name,
  p.pet_name, p.species,
  owner.name as owner_name, owner.phone as owner_phone,
  vet.name as vet_name
from appointments a
join pets p on p.id = a.pet_id
join users owner on owner.id = p.owner_id
left join users vet on vet.id = a.vet_id
where date(a.appointment_date at time zone 'Asia/Bangkok') = current_date
order by a.appointment_date;

-- Revenue summary by month
create or replace view monthly_revenue as
select
  date_trunc('month', created_at) as month,
  count(*) as invoice_count,
  sum(total_amount) filter (where status = 'paid') as revenue,
  sum(total_amount) filter (where status = 'pending') as outstanding
from payments
group by 1
order by 1 desc;

-- Pet health overview
create or replace view pet_health_overview as
select
  p.id, p.pet_name, p.species, p.breed, p.weight,
  u.name as owner_name, u.email as owner_email,
  (select max(visit_date) from medical_records where pet_id = p.id) as last_visit,
  (select count(*) from medical_records where pet_id = p.id) as total_visits,
  (select count(*) from vaccinations where pet_id = p.id and next_due_date < current_date) as overdue_vaccines
from pets p
join users u on u.id = p.owner_id
where p.is_active = true;

-- ================================================================
-- FUNCTIONS
-- ================================================================

-- Auto-generate invoice number on payment insert
create or replace function generate_invoice_number()
returns trigger as $$
begin
  if new.invoice_number is null then
    new.invoice_number := 'INV-' || to_char(now(),'YYYY') || '-' ||
      lpad((select coalesce(max(id),0)+1 from payments)::text, 4, '0');
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_generate_invoice before insert on payments
for each row execute procedure generate_invoice_number();

-- Create user profile on auth signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into users (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'owner')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ================================================================
-- DONE ✅
-- Tables: users, pets, services, appointments, medical_records,
--         vaccinations, payments, payment_items, lab_results,
--         prescriptions, blog_posts, reminders, queue
-- Views:  upcoming_vaccinations, todays_schedule,
--         monthly_revenue, pet_health_overview
-- RLS policies for all tables
-- Auto-triggers for updated_at and invoice numbers
-- Sample data for services and blog posts
-- ================================================================

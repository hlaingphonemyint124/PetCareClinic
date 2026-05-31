export const DEMO_PETS = [
  { id: 1, pet_name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', gender: 'Male', birth_date: '2021-05-12', weight: 28, health: 92, emoji: '🐕', color: 'green', status: 'Healthy', next_vaccine: 'Jul 2026', owner_name: 'Kyaw Zin', allergies: 'None', notes: 'Loves fetch. Friendly with all animals.' },
  { id: 2, pet_name: 'Luna', species: 'Cat', breed: 'Siamese', gender: 'Female', birth_date: '2020-09-03', weight: 4.2, health: 78, emoji: '🐈', color: 'amber', status: 'Checkup Due', next_vaccine: 'Apr 2026', owner_name: 'Kyaw Zin', allergies: 'Penicillin', notes: 'Indoor cat. Shy with strangers.' },
  { id: 3, pet_name: 'Max', species: 'Dog', breed: 'German Shepherd', gender: 'Male', birth_date: '2019-11-08', weight: 34, health: 85, emoji: '🐕', color: 'blue', status: 'Healthy', next_vaccine: 'Nov 2026', owner_name: 'Aung Myat', allergies: 'None', notes: 'Working dog. Hip dysplasia watch.' },
  { id: 4, pet_name: 'Mochi', species: 'Rabbit', breed: 'Holland Lop', gender: 'Female', birth_date: '2022-01-20', weight: 1.8, health: 95, emoji: '🐇', color: 'purple', status: 'Healthy', next_vaccine: 'Jan 2027', owner_name: 'Thin Zar', allergies: 'None', notes: 'Loves leafy greens.' },
  { id: 5, pet_name: 'Rio', species: 'Bird', breed: 'African Grey Parrot', gender: 'Male', birth_date: '2018-07-22', weight: 0.5, health: 70, emoji: '🦜', color: 'teal', status: 'Monitoring', next_vaccine: 'N/A', owner_name: 'Zaw Lin', allergies: 'None', notes: 'Feather plucking behavior. Needs enrichment.' },
  { id: 6, pet_name: 'Coco', species: 'Cat', breed: 'Persian', gender: 'Female', birth_date: '2021-03-15', weight: 5.1, health: 88, emoji: '🐈', color: 'amber', status: 'Healthy', next_vaccine: 'Mar 2026', owner_name: 'Su Su', allergies: 'None', notes: 'Daily brushing required.' },
]

export const DEMO_APPOINTMENTS = [
  { id: 1, pet_name: 'Buddy', owner: 'Kyaw Zin', service: 'General Checkup', vet: 'Dr. Htet Aung', date: '2026-05-10', time: '10:00', status: 'confirmed', room: 'Room 3', fee: 15000 },
  { id: 2, pet_name: 'Luna', owner: 'Su Su', service: 'Skin Consultation', vet: 'Dr. Aye Myat', date: '2026-05-10', time: '10:30', status: 'confirmed', room: 'Room 1', fee: 20000 },
  { id: 3, pet_name: 'Mochi', owner: 'Thin Zar', service: 'Vaccination', vet: 'Dr. Htet Aung', date: '2026-05-10', time: '11:00', status: 'waiting', room: 'Room 3', fee: 10000 },
  { id: 4, pet_name: 'Max', owner: 'Aung Myat', service: 'Blood Panel', vet: 'Dr. Htet Aung', date: '2026-05-10', time: '09:00', status: 'completed', room: 'Room 2', fee: 25000 },
  { id: 5, pet_name: 'Rio', owner: 'Zaw Lin', service: 'Wing Exam', vet: 'Dr. Kyaw Thu', date: '2026-05-11', time: '14:00', status: 'pending', room: 'Room 4', fee: 15000 },
  { id: 6, pet_name: 'Bella', owner: 'Nwe Ni', service: 'Dental Cleaning', vet: 'Dr. Khin May', date: '2026-05-12', time: '09:00', status: 'pending', room: 'Room 5', fee: 35000 },
]

export const DEMO_RECORDS = [
  { id: 1, date: 'Jan 15, 2026', diagnosis: 'Routine Annual Wellness Exam', vet: 'Dr. Htet Aung Kyaw', treatment: 'Physical examination, blood panel, fecal test', prescription: 'Heartgard Plus (monthly)', notes: 'All vitals normal. Weight stable at 28kg. Dental cleaning recommended.', fee: 40000 },
  { id: 2, date: 'Oct 22, 2025', diagnosis: 'Otitis Externa (Ear Infection)', vet: 'Dr. Aye Myat Noe', treatment: 'Ear flush, cytology performed', prescription: 'Otomax ear drops BID × 7 days', notes: 'Malassezia overgrowth. Recheck in 2 weeks.', fee: 25000 },
  { id: 3, date: 'Jul 5, 2025', diagnosis: 'Vaccination Update', vet: 'Dr. Htet Aung Kyaw', treatment: 'DHPP booster + Rabies administered', prescription: 'None', notes: 'No adverse reactions. Next due Jul 2026.', fee: 22000 },
  { id: 4, date: 'Mar 12, 2025', diagnosis: 'Acute Lameness — Right Forelimb', vet: 'Dr. Khin May Soe', treatment: 'X-ray (no fracture), rest protocol', prescription: 'Carprofen 25mg SID × 5 days, Gabapentin 100mg BID × 3 days', notes: 'Soft tissue sprain. Full recovery expected.', fee: 65000 },
]

export const DEMO_VACCINES = [
  { id: 1, name: 'DHPP Combo', given: 'Jul 2025', next: '2026-07-05', status: 'ok', batch: 'BN-2025-4421' },
  { id: 2, name: 'Rabies', given: 'Jul 2024', next: '2026-01-10', status: 'overdue', batch: 'BN-2024-1130' },
  { id: 3, name: 'Bordetella', given: 'Sep 2025', next: '2026-09-12', status: 'ok', batch: 'BN-2025-7732' },
  { id: 4, name: 'Leptospirosis', given: 'Jul 2025', next: '2026-07-05', status: 'ok', batch: 'BN-2025-4422' },
  { id: 5, name: 'Canine Influenza', given: 'Jan 2025', next: '2026-05-20', status: 'upcoming', batch: 'BN-2025-0110' },
]

export const DEMO_INVOICES = [
  { id: 'INV-2026-008', date: '10 May 2026', client: 'Kyaw Zin', pet: 'Buddy', service: 'Checkup + Blood Panel', amount: 42000, status: 'pending', method: null },
  { id: 'INV-2026-007', date: '5 May 2026', client: 'Su Su', pet: 'Luna', service: 'Skin Consultation', amount: 20000, status: 'paid', method: 'Card' },
  { id: 'INV-2026-006', date: '28 Apr 2026', client: 'Thin Zar', pet: 'Mochi', service: 'Vaccination', amount: 10000, status: 'paid', method: 'QR' },
  { id: 'INV-2026-005', date: '15 Apr 2026', client: 'Aung Myat', pet: 'Max', service: 'Blood Panel + X-Ray', amount: 60000, status: 'paid', method: 'Cash' },
  { id: 'INV-2025-041', date: '22 Oct 2025', client: 'Kyaw Zin', pet: 'Buddy', service: 'Ear Treatment', amount: 25000, status: 'paid', method: 'Card' },
]

export const DEMO_SERVICES = [
  { id: 1, name: 'General Consultation', desc: 'Full physical exam & wellness check', price: 15000, duration: '30 min', category: 'consultation', icon: '🩺' },
  { id: 2, name: 'Vaccination', desc: 'Core & lifestyle vaccines with digital cert', price: 10000, duration: '15 min', category: 'vaccination', icon: '💉' },
  { id: 3, name: 'CBC Blood Panel', desc: 'Complete blood count in-house', price: 25000, duration: '1 hr', category: 'diagnostics', icon: '🔬' },
  { id: 4, name: 'Digital X-Ray', desc: 'Radiographic imaging', price: 35000, duration: '30 min', category: 'diagnostics', icon: '📡' },
  { id: 5, name: 'Ultrasound', desc: 'Abdominal / cardiac imaging', price: 45000, duration: '45 min', category: 'diagnostics', icon: '🖥️' },
  { id: 6, name: 'Dental Cleaning', desc: 'Scaling & polishing under anesthesia', price: 35000, duration: '2–3 hrs', category: 'dental', icon: '🦷' },
  { id: 7, name: 'Grooming (Small)', desc: 'Bath, trim, nail for <10 kg', price: 12000, duration: '1 hr', category: 'grooming', icon: '✂️' },
  { id: 8, name: 'Grooming (Large)', desc: 'Bath, trim, nail for 10+ kg', price: 20000, duration: '2 hrs', category: 'grooming', icon: '✂️' },
  { id: 9, name: 'Pet Boarding', desc: 'Overnight supervised stay', price: 18000, duration: '/night', category: 'boarding', icon: '🏨' },
  { id: 10, name: 'Emergency', desc: '24/7 critical care', price: 45000, duration: 'Varies', category: 'emergency', icon: '🚑' },
  { id: 11, name: 'Spay/Neuter', desc: 'Sterilization surgery', price: 100000, duration: '2–4 hrs', category: 'surgery', icon: '⚕️' },
]

export const DEMO_VETS = [
  { id: 1, name: 'Dr. Htet Aung Kyaw', spec: 'Internal Medicine', exp: '15 yrs', emoji: '👨‍⚕️', rating: 4.9, reviews: 142, days: 'Mon Wed Fri', color: 'green', edu: 'University of Veterinary Science, Yangon, DVM', tags: ['Cardiology', 'Oncology', 'Internal Med'] },
  { id: 2, name: 'Dr. Khin May Soe', spec: 'Surgery & Oncology', exp: '12 yrs', emoji: '👩‍⚕️', rating: 4.8, reviews: 98, days: 'Tue Thu Sat', color: 'amber', edu: 'University of Veterinary Science, Yangon, DVM + PhD', tags: ['Surgery', 'Oncology', 'Laparoscopy'] },
  { id: 3, name: 'Dr. Kyaw Thu Zin', spec: 'Exotic Animals', exp: '8 yrs', emoji: '👨‍⚕️', rating: 4.9, reviews: 76, days: 'Mon Tue Wed', color: 'blue', edu: 'Yezin Agricultural University, DVM', tags: ['Avian', 'Reptiles', 'Exotic'] },
  { id: 4, name: 'Dr. Aye Myat Noe', spec: 'Dermatology', exp: '10 yrs', emoji: '👩‍⚕️', rating: 4.7, reviews: 63, days: 'Wed Thu Fri', color: 'purple', edu: 'University of Veterinary Science, Nay Pyi Taw, DVM', tags: ['Dermatology', 'Allergy', 'Nutrition'] },
]

export const DEMO_QUEUE = [
  { n: 1, pet: 'Buddy', owner: 'Kyaw Zin', vet: 'Dr. Htet Aung', status: 'in-room', wait: '—', room: 'Room 3', priority: 'normal' },
  { n: 2, pet: 'Luna', owner: 'Su Su', vet: 'Dr. Htet Aung', status: 'waiting', wait: '12 min', room: '—', priority: 'normal' },
  { n: 3, pet: 'Rex', owner: 'Walk-in', vet: 'Dr. Kyaw Thu', status: 'waiting', wait: '28 min', room: '—', priority: 'urgent' },
  { n: 4, pet: 'Mochi', owner: 'Thin Zar', vet: 'Dr. Htet Aung', status: 'waiting', wait: '35 min', room: '—', priority: 'normal' },
  { n: 5, pet: 'Bella', owner: 'Nwe Ni', vet: 'Dr. Aye Myat', status: 'waiting', wait: '42 min', room: '—', priority: 'normal' },
]

export const DEMO_BLOG = [
  { id: 1, title: '10 Foods Your Dog Should Never Eat', category: 'Nutrition', author: 'Dr. Htet Aung', date: 'Jan 15, 2026', emoji: '🥗', readTime: '5 min', published: true },
  { id: 2, title: 'The Complete Cat Vaccination Guide', category: 'Prevention', author: 'Dr. Khin May', date: 'Feb 3, 2026', emoji: '💉', readTime: '7 min', published: true },
  { id: 3, title: 'How to Brush Your Pet\'s Teeth', category: 'Dental', author: 'Dr. Kyaw Thu', date: 'Feb 20, 2026', emoji: '🦷', readTime: '4 min', published: true },
  { id: 4, title: 'Understanding Your Cat\'s Sleep Patterns', category: 'Wellness', author: 'Dr. Aye Myat', date: 'Mar 1, 2026', emoji: '😴', readTime: '3 min', published: true },
  { id: 5, title: 'Exercise Requirements for Dog Breeds', category: 'Exercise', author: 'Dr. Htet Aung', date: 'Mar 8, 2026', emoji: '🏃', readTime: '6 min', published: true },
  { id: 6, title: 'Pet First Aid: What Every Owner Needs', category: 'First Aid', author: 'Dr. Khin May', date: '—', emoji: '🌡️', readTime: '8 min', published: false },
]

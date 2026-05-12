import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Auth helpers ──────────────────────────────────────────────────
export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUp = (email, password, meta) =>
  supabase.auth.signUp({ email, password, options: { data: meta } })

export const signOut = () => supabase.auth.signOut()

export const getUser = () => supabase.auth.getUser()

// ── Pets ──────────────────────────────────────────────────────────
export const fetchPets = (ownerId) =>
  supabase.from('pets').select('*').eq('owner_id', ownerId).order('created_at', { ascending: false })

export const fetchAllPets = () =>
  supabase.from('pets').select('*, users(name, email)').order('created_at', { ascending: false })

export const insertPet = (data) =>
  supabase.from('pets').insert(data).select().single()

export const updatePet = (id, data) =>
  supabase.from('pets').update(data).eq('id', id).select().single()

export const deletePet = (id) =>
  supabase.from('pets').delete().eq('id', id)

// ── Appointments ──────────────────────────────────────────────────
export const fetchAppointments = (filters = {}) => {
  let q = supabase.from('appointments').select(`
    *, pets(pet_name, species, breed, photo_url),
    users!appointments_vet_id_fkey(name),
    services(service_name, price)
  `)
  if (filters.petId) q = q.eq('pet_id', filters.petId)
  if (filters.vetId) q = q.eq('vet_id', filters.vetId)
  if (filters.status) q = q.eq('status', filters.status)
  if (filters.date) q = q.gte('appointment_date', filters.date)
  return q.order('appointment_date', { ascending: true })
}

export const insertAppointment = (data) =>
  supabase.from('appointments').insert(data).select().single()

export const updateAppointment = (id, data) =>
  supabase.from('appointments').update(data).eq('id', id)

// ── Medical Records ───────────────────────────────────────────────
export const fetchMedicalRecords = (petId) =>
  supabase.from('medical_records').select('*, users(name)').eq('pet_id', petId).order('visit_date', { ascending: false })

export const insertMedicalRecord = (data) =>
  supabase.from('medical_records').insert(data).select().single()

// ── Vaccinations ──────────────────────────────────────────────────
export const fetchVaccinations = (petId) =>
  supabase.from('vaccinations').select('*').eq('pet_id', petId).order('next_due_date', { ascending: true })

export const insertVaccination = (data) =>
  supabase.from('vaccinations').insert(data).select().single()

// ── Payments ──────────────────────────────────────────────────────
export const fetchPayments = (userId) =>
  supabase.from('payments').select('*, payment_items(*)').eq('user_id', userId).order('created_at', { ascending: false })

export const fetchAllPayments = () =>
  supabase.from('payments').select('*, users(name), payment_items(*)').order('created_at', { ascending: false })

// ── Services ──────────────────────────────────────────────────────
export const fetchServices = () =>
  supabase.from('services').select('*').eq('is_active', true).order('category')

// ── Users ─────────────────────────────────────────────────────────
export const fetchUsers = () =>
  supabase.from('users').select('*').order('created_at', { ascending: false })

// ── Blog ──────────────────────────────────────────────────────────
export const fetchBlogPosts = (published = true) =>
  supabase.from('blog_posts').select('*, users(name)').eq('is_published', published).order('published_at', { ascending: false })

// ── Analytics ─────────────────────────────────────────────────────
export const fetchAnalytics = async () => {
  const [pets, appointments, payments, users] = await Promise.all([
    supabase.from('pets').select('id', { count: 'exact' }),
    supabase.from('appointments').select('id, status', { count: 'exact' }),
    supabase.from('payments').select('amount, status'),
    supabase.from('users').select('id, role', { count: 'exact' }),
  ])
  return { pets, appointments, payments, users }
}

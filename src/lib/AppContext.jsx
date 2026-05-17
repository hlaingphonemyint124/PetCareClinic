import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'

const AppContext = createContext(null)

// ── 4 REAL TEST ACCOUNTS ─────────────────────────────────────────
// These are the only valid credentials. No demo buttons, no shortcuts.
export const TEST_ACCOUNTS = [
  {
    id: 'real-admin-001',
    name: 'Admin Supanya',
    email: 'admin@pawcare.co.th',
    password: 'PawCare@Admin2026',
    role: 'admin',
    avatar: 'AS',
    phone: '02-111-2222',
    joined: '2010-01-01',
  },
  {
    id: 'real-vet-001',
    name: 'Dr. Somchai Panya',
    email: 'somchai@pawcare.co.th',
    password: 'PawCare@Vet2026',
    role: 'vet',
    avatar: 'SP',
    phone: '02-111-3333',
    joined: '2012-03-15',
  },
  {
    id: 'real-rec-001',
    name: 'Nipa Ruangrit',
    email: 'nipa@pawcare.co.th',
    password: 'PawCare@Rec2026',
    role: 'receptionist',
    avatar: 'NR',
    phone: '02-111-4444',
    joined: '2020-06-01',
  },
  {
    id: 'real-owner-001',
    name: 'John Park',
    email: 'john@petowner.com',
    password: 'PawCare@Owner2026',
    role: 'owner',
    avatar: 'JP',
    phone: '081-234-5678',
    joined: '2024-01-20',
  },
]

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try Supabase session first
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users').select('*').eq('id', session.user.id).single()
          if (profile) { setUser(profile); setLoading(false); return }
        }
      } catch { /* Supabase not configured — use local auth below */ }

      // Restore local session from sessionStorage
      try {
        const saved = sessionStorage.getItem('pawcare_user')
        if (saved) setUser(JSON.parse(saved))
      } catch { /* ignore */ }
      setLoading(false)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users').select('*').eq('id', session.user.id).single()
        if (profile) { setUser(profile); return }
      }
      if (event === 'SIGNED_OUT') {
        sessionStorage.removeItem('pawcare_user')
        setUser(null)
      }
    })

    init()
    return () => subscription.unsubscribe()
  }, [])

  // Real login — checks TEST_ACCOUNTS or Supabase
  const login = async (email, password) => {
    // 1. Try Supabase Auth first (real production login)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error && data?.user) {
        const { data: profile } = await supabase
          .from('users').select('*').eq('id', data.user.id).single()
        if (profile) {
          setUser(profile)
          sessionStorage.setItem('pawcare_user', JSON.stringify(profile))
          return { success: true, user: profile }
        }
      }
    } catch { /* Supabase not ready, fall through to local */ }

    // 2. Fall back to local test accounts
    const found = TEST_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    )
    if (found) {
      const { password: _pw, ...safeUser } = found
      setUser(safeUser)
      sessionStorage.setItem('pawcare_user', JSON.stringify(safeUser))
      return { success: true, user: safeUser }
    }

    return { success: false, error: 'Invalid email or password.' }
  }

  // Real register — saves to Supabase or local list
  const register = async (name, email, password, phone) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { name, phone, role: 'owner' } }
      })
      if (!error && data?.user) {
        return { success: true, message: 'Account created! Please check your email to verify.' }
      }
      if (error) return { success: false, error: error.message }
    } catch { /* Supabase not ready */ }

    // Local registration (demo/offline)
    const exists = TEST_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase())
    if (exists) return { success: false, error: 'An account with this email already exists.' }

    const newUser = {
      id: 'local-' + Date.now(),
      name, email, password, phone,
      role: 'owner',
      avatar: name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase(),
      joined: new Date().toISOString().split('T')[0],
    }
    TEST_ACCOUNTS.push(newUser)
    const { password: _pw, ...safeUser } = newUser
    setUser(safeUser)
    sessionStorage.setItem('pawcare_user', JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  const logout = async () => {
    try { await supabase.auth.signOut() } catch { /* ignore */ }
    sessionStorage.removeItem('pawcare_user')
    setUser(null)
  }

  const getDashboardPath = (role) => ({
    owner: '/dashboard/owner',
    vet: '/dashboard/vet',
    receptionist: '/dashboard/reception',
    admin: '/dashboard/admin',
  }[role] || '/dashboard/owner')

  return (
    <AppContext.Provider value={{ user, setUser, loading, login, register, logout, getDashboardPath }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

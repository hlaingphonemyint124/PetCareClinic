import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'

const AppContext = createContext(null)

// ── 4 REAL TEST ACCOUNTS ─────────────────────────────────────────
export const TEST_ACCOUNTS = [
  {
    id: 'real-admin-001',
    name: 'Admin Thida',
    email: 'admin@mingalarpetclinic.com',
    password: 'Mingalar@Admin2026',
    role: 'admin',
    avatar: 'AT',
    phone: '09-111-22222',
    joined: '2010-01-01',
  },
  {
    id: 'real-vet-001',
    name: 'Dr. Htet Aung Kyaw',
    email: 'htetaung@mingalarpetclinic.com',
    password: 'Mingalar@Vet2026',
    role: 'vet',
    avatar: 'HA',
    phone: '09-111-33333',
    joined: '2012-03-15',
  },
  {
    id: 'real-rec-001',
    name: 'Ma Ei Phyu',
    email: 'eiphyu@mingalarpetclinic.com',
    password: 'Mingalar@Rec2026',
    role: 'receptionist',
    avatar: 'EP',
    phone: '09-111-44444',
    joined: '2020-06-01',
  },
  {
    id: 'real-owner-001',
    name: 'Kyaw Zin',
    email: 'kyawzin@petowner.com',
    password: 'Mingalar@Owner2026',
    role: 'owner',
    avatar: 'KZ',
    phone: '09-981-234567',
    joined: '2024-01-20',
  },
]

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users').select('*').eq('id', session.user.id).single()
          if (profile) { setUser(profile); setLoading(false); return }
        }
      } catch { /* Supabase not configured */ }

      try {
        const saved = sessionStorage.getItem('mingalar_user')
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
        sessionStorage.removeItem('mingalar_user')
        setUser(null)
      }
    })

    init()
    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error && data?.user) {
        const { data: profile } = await supabase
          .from('users').select('*').eq('id', data.user.id).single()
        if (profile) {
          setUser(profile)
          sessionStorage.setItem('mingalar_user', JSON.stringify(profile))
          return { success: true, user: profile }
        }
      }
    } catch { /* fall through */ }

    const found = TEST_ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    )
    if (found) {
      const { password: _pw, ...safeUser } = found
      setUser(safeUser)
      sessionStorage.setItem('mingalar_user', JSON.stringify(safeUser))
      return { success: true, user: safeUser }
    }

    return { success: false, error: 'Invalid email or password.' }
  }

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
    sessionStorage.setItem('mingalar_user', JSON.stringify(safeUser))
    return { success: true, user: safeUser }
  }

  const logout = async () => {
    try { await supabase.auth.signOut() } catch { /* ignore */ }
    sessionStorage.removeItem('mingalar_user')
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

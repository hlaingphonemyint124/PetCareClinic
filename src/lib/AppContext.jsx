import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AppContext = createContext(null)

// Demo users for development without Supabase
export const DEMO_USERS = {
  owner: { id: 'demo-owner', name: 'John Park', email: 'owner@demo.com', role: 'owner', avatar: 'JP' },
  vet: { id: 'demo-vet', name: 'Dr. Somchai Panya', email: 'vet@demo.com', role: 'vet', avatar: 'SP' },
  receptionist: { id: 'demo-rec', name: 'Nipa Ruang', email: 'rec@demo.com', role: 'receptionist', avatar: 'NP' },
  admin: { id: 'demo-admin', name: 'Admin User', email: 'admin@demo.com', role: 'admin', avatar: 'AD' },
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [supabaseReady, setSupabaseReady] = useState(false)

  useEffect(() => {
    // Check Supabase session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setUser(profile || session.user)
          setSupabaseReady(true)
        }
      } catch {
        // Supabase not configured — demo mode
      } finally {
        setLoading(false)
      }
    }
    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase.from('users').select('*').eq('id', session.user.id).single()
        setUser(profile || session.user)
        setSupabaseReady(true)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const loginDemo = (role) => {
    setUser(DEMO_USERS[role])
    setLoading(false)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const getDashboardPath = (role) => {
    const paths = { owner: '/dashboard/owner', vet: '/dashboard/vet', receptionist: '/dashboard/reception', admin: '/dashboard/admin' }
    return paths[role] || '/dashboard/owner'
  }

  return (
    <AppContext.Provider value={{ user, setUser, loading, supabaseReady, loginDemo, logout, getDashboardPath }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

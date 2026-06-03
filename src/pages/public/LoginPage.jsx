import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp, TEST_ACCOUNTS } from '../../lib/AppContext'
import toast from 'react-hot-toast'
import { LOGO_URI } from '../../lib/logoData'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, getDashboardPath } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = new URLSearchParams(location.search).get('redirect') || null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name?.split(' ')[0]}!`)
      navigate(redirectTo || getDashboardPath(result.user.role))
    } else {
      toast.error(result.error || 'Login failed.')
    }
  }

  const quickLogin = async (acc) => {
    setLoading(true)
    const result = await login(acc.email, acc.password)
    setLoading(false)
    if (result.success) {
      toast.success(`Logged in as ${result.user.name}`)
      navigate(redirectTo || getDashboardPath(result.user.role))
    }
  }

  const ROLE_COLORS = { admin: '#ff6b6b', vet: '#C9A84C', receptionist: '#e8c870', owner: '#7eb5ff' }

  return (
    <div className="min-h-screen flex" style={{background: 'var(--bg-1)'}}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-12 relative overflow-hidden"
        style={{background:'linear-gradient(160deg,#0a1628 0%,#0c1e3a 100%)',borderRight:'1px solid rgba(201,168,76,0.12)'}}>
        {/* BG orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{background:'radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)'}} />
        <div className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full pointer-events-none"
          style={{background:'radial-gradient(circle,rgba(77,130,201,0.06) 0%,transparent 70%)'}} />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={LOGO_URI} alt="Mingalar Pet Clinic" className="w-16 h-16 object-contain" style={{filter:"drop-shadow(0 0 12px rgba(201,168,76,0.4))"}} />
            <div>
              <div className="font-display text-2xl font-semibold" style={{color:'#C9A84C'}}>Mingalar</div>
              <div className="text-xs tracking-widest" style={{color:'rgba(201,168,76,0.45)'}}>PET CLINIC</div>
            </div>
          </Link>
        </div>

        {/* Center tagline */}
        <div className="relative z-10">
          <div className="font-display text-4xl text-white leading-tight mb-4">
            Caring for your<br/><span style={{color:'#C9A84C'}}>beloved pets</span>
          </div>
          <p className="text-sm leading-relaxed" style={{color: 'var(--text-muted)'}}>
            Yangon's premier veterinary clinic. Professional care for every paw, whisker, and feather.
          </p>
          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[['3,200+','Pet Patients'],['15+','Years of Care'],['4','Specialist Vets'],['24/7','Emergency']].map(([n,l])=>(
              <div key={l} className="p-3 rounded-xl" style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.12)'}}>
                <div className="font-display text-xl font-semibold" style={{color:'#C9A84C'}}>{n}</div>
                <div className="text-xs mt-0.5" style={{color:'rgba(232,228,217,0.4)'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs relative z-10" style={{color:'rgba(232,228,217,0.2)'}}>© 2026 Mingalar Pet Clinic · Yangon, Myanmar</div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div className="w-full max-w-md" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <img src={LOGO_URI} alt="Mingalar" className="w-11 h-11 object-contain" style={{filter:"drop-shadow(0 0 8px rgba(201,168,76,0.3))"}} />
            <span className="font-display text-xl" style={{color:'#C9A84C'}}>Mingalar Pet Clinic</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl text-white mb-2">Welcome back</h1>
            <p className="text-sm" style={{color:'rgba(232,228,217,0.4)'}}>Sign in to access your dashboard</p>
          </div>

          {/* Quick login demo pills */}
          <div className="mb-6">
            <div className="text-xs mb-3 font-semibold tracking-wider uppercase" style={{color:'rgba(201,168,76,0.45)'}}>Quick Demo Login</div>
            <div className="grid grid-cols-2 gap-2">
              {TEST_ACCOUNTS.map(acc => (
                <button key={acc.id} onClick={() => quickLogin(acc)}
                  className="flex items-center gap-2 p-2.5 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
                  style={{background: 'var(--bg-input)',border:`1px solid ${ROLE_COLORS[acc.role]}22`}}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{background:`${ROLE_COLORS[acc.role]}18`,color:ROLE_COLORS[acc.role]}}>
                    {acc.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate leading-none">{acc.name.split(' ')[0]}</div>
                    <div className="text-[10px] capitalize mt-0.5 truncate" style={{color:ROLE_COLORS[acc.role]}}>{acc.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1" style={{background:'rgba(201,168,76,0.12)'}} />
            <span className="text-xs" style={{color: 'var(--text-faint)'}}>or sign in manually</span>
            <div className="h-px flex-1" style={{background:'rgba(201,168,76,0.12)'}} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com"
                value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Password</label>
              <input className="form-input" type="password" placeholder="••••••••"
                value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{color: 'var(--text-faint)'}}>
            New patient?{' '}
            <Link to="/register" className="font-semibold hover:underline" style={{color:'#C9A84C'}}>Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useApp } from '../../lib/AppContext'
import clsx from 'clsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Doctors', to: '/vets' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const { user, logout, getDashboardPath } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const ROLE_COLORS = { admin:'#ff4d6d', vet:'#00e5a0', receptionist:'#ffb84d', owner:'#4da6ff' }
  const rc = ROLE_COLORS[user?.role] || '#00e5a0'

  return (
    <motion.nav
      className={clsx('fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'border-b border-white/[0.06]' : 'bg-transparent')}
      style={scrolled ? { background:'rgba(8,11,18,0.9)', backdropFilter:'blur(24px)' } : {}}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center text-lg font-bold shadow-green-glow group-hover:scale-110 transition-transform duration-300">🐾</div>
          <span className="font-display text-lg text-white">PawCare</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className="text-sm font-medium text-white/45 hover:text-white transition-colors duration-200 relative group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-2.5 rounded-full px-3 py-2 transition-all duration-200 hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background:`${rc}20`, color: rc }}>
                  {user.avatar || user.name?.[0] || '?'}
                </div>
                <span className="text-white/70 text-sm font-medium">{user.name?.split(' ')[0]}</span>
                <ChevronDown size={13} className={clsx('text-white/30 transition-transform', dropOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-50"
                    style={{ background:'rgba(12,15,24,0.97)', border:'1px solid rgba(255,255,255,0.08)', boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}
                    initial={{ opacity:0, scale:0.95, y:-8 }}
                    animate={{ opacity:1, scale:1, y:0 }}
                    exit={{ opacity:0, scale:0.95, y:-8 }}
                    transition={{ duration:0.15 }}>
                    <div className="p-3 border-b border-white/[0.06]">
                      <div className="text-white text-xs font-semibold truncate">{user.name}</div>
                      <div className="text-white/30 text-[11px] truncate">{user.email}</div>
                    </div>
                    <div className="p-1.5">
                      <button onClick={() => { navigate(getDashboardPath(user.role)); setDropOpen(false) }}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        📊 My Dashboard
                      </button>
                      {user.role === 'owner' && (
                        <>
                          <button onClick={() => { navigate('/dashboard/owner/pets'); setDropOpen(false) }}
                            className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                            🐾 My Pets
                          </button>
                          <button onClick={() => { navigate('/booking'); setDropOpen(false) }}
                            className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                            📅 Book Appointment
                          </button>
                        </>
                      )}
                    </div>
                    <div className="p-1.5 border-t border-white/[0.06]">
                      <button onClick={() => { logout(); setDropOpen(false) }}
                        className="w-full text-left px-3 py-2 rounded-xl text-sm text-red/70 hover:text-red hover:bg-red/5 transition-all">
                        🚪 Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost py-2 text-sm">Sign In</Link>
              <Link to="/booking" className="btn-primary py-2.5 text-sm">Book Appointment →</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/50 hover:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-white/[0.06] px-6 py-4"
            style={{ background:'rgba(8,11,18,0.97)', backdropFilter:'blur(24px)' }}
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}>
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                className="block py-3 text-white/50 hover:text-white text-sm border-b border-white/[0.04] last:border-0 transition-colors">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/login" className="btn-ghost flex-1 justify-center text-sm py-2.5" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/booking" className="btn-primary flex-1 justify-center text-sm" onClick={() => setMobileOpen(false)}>Book Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

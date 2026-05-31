import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Calendar } from 'lucide-react'
import { useApp } from '../../lib/AppContext'
import { LOGO_URI } from '../../lib/logoData'
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
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close dropdown on route change
  useEffect(() => { setDropOpen(false); setMobileOpen(false) }, [location.pathname])

  const ROLE_COLORS = { admin: '#ff6b6b', vet: '#C9A84C', receptionist: '#e8c870', owner: '#7eb5ff' }
  const rc = ROLE_COLORS[user?.role] || '#C9A84C'

  return (
    <motion.nav
      className={clsx('fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? '' : 'bg-transparent')}
      style={scrolled ? { background: 'rgba(6,10,20,0.96)', backdropFilter: 'blur(28px)', borderBottom: '1px solid rgba(201,168,76,0.14)' } : {}}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}>

      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img src={LOGO_URI} alt="Mingalar Pet Clinic" className="w-11 h-11 object-contain group-hover:scale-110 transition-transform duration-300" style={{filter:"drop-shadow(0 0 8px rgba(201,168,76,0.35))"}} />
          <div className="hidden sm:block">
            <div className="font-display text-base leading-none" style={{color:'#C9A84C'}}>Mingalar</div>
            <div className="text-[9px] tracking-[0.15em]" style={{color:'rgba(201,168,76,0.45)'}}>PET CLINIC</div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(l => {
            const active = location.pathname === l.to
            return (
              <Link key={l.to} to={l.to}
                className={clsx('text-sm font-medium transition-colors duration-200 relative group py-1',
                  active ? 'text-[#C9A84C]' : 'text-white/45 hover:text-white')}>
                {l.label}
                <span className={clsx('absolute -bottom-0.5 left-0 right-0 h-px transition-transform duration-300 origin-left',
                  active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')}
                  style={{background:'#C9A84C'}} />
              </Link>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* Dashboard link pill */}
              <button onClick={() => navigate(getDashboardPath(user.role))}
                className="text-white/50 hover:text-white text-sm transition-colors duration-200 px-3 py-2 rounded-xl hover:bg-white/[0.05]">
                Dashboard
              </button>
              {/* User dropdown */}
              <div className="relative">
                <button onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2.5 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${rc}22`, color: rc }}>{user.name?.[0] || '?'}</div>
                  <span className="text-white/70 text-sm font-medium">{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={13} className={clsx('text-white/30 transition-transform duration-200', dropOpen && 'rotate-180')} />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl overflow-hidden z-50"
                      style={{ background: 'rgba(7,12,22,0.98)', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.15 }}>
                      <div className="p-3.5 border-b border-[rgba(201,168,76,0.1)]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: `${rc}22`, color: rc }}>{user.name?.[0] || '?'}</div>
                          <div className="min-w-0">
                            <div className="text-white text-xs font-semibold truncate">{user.name}</div>
                            <div className="text-white/30 text-[10px] truncate">{user.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-1.5">
                        <button onClick={() => navigate(getDashboardPath(user.role))}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2.5">
                          <span>📊</span> My Dashboard
                        </button>
                        {user.role === 'owner' && (
                          <>
                            <button onClick={() => navigate('/dashboard/owner/pets')}
                              className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2.5">
                              <span>🐾</span> My Pets
                            </button>
                            <button onClick={() => navigate('/booking')}
                              className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2.5">
                              <span>📅</span> Book Appointment
                            </button>
                          </>
                        )}
                      </div>
                      <div className="p-1.5 border-t border-[rgba(201,168,76,0.1)]">
                        <button onClick={logout}
                          className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-red/60 hover:text-red hover:bg-red/5 transition-all flex items-center gap-2.5">
                          <span>🚪</span> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/50 hover:text-white text-sm transition-colors duration-200 px-3 py-2">
                Sign In
              </Link>
              {/* Primary CTA — always visible */}
              <Link to="/booking"
                className="btn-primary py-2.5 text-sm px-5 flex items-center gap-2">
                <Calendar size={14} />
                Book Appointment
              </Link>
            </>
          )}
        </div>

        {/* Mobile: Book CTA + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link to="/booking" className="btn-primary py-2 text-xs px-4 flex items-center gap-1.5">
            <Calendar size={12} /> Book
          </Link>
          <button className="text-white/50 hover:text-white p-2 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-[rgba(201,168,76,0.1)] px-5 py-4"
            style={{ background: 'rgba(8,11,18,0.98)', backdropFilter: 'blur(28px)' }}
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <div className="space-y-0.5 mb-4">
              {NAV_LINKS.map(l => {
                const active = location.pathname === l.to
                return (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                    className={clsx('block py-3 px-3 rounded-xl text-sm transition-all duration-150',
                      active ? 'text-[#C9A84C] bg-[rgba(201,168,76,0.08)]' : 'text-white/50 hover:text-white hover:bg-[rgba(201,168,76,0.05)]')}>
                    {l.label}
                  </Link>
                )
              })}
            </div>
            {user ? (
              <div className="border-t border-[rgba(201,168,76,0.1)] pt-4 space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${rc}22`, color: rc }}>{user.name?.[0] || '?'}</div>
                  <div>
                    <div className="text-white text-sm font-semibold">{user.name}</div>
                    <div className="text-white/30 text-xs capitalize">{user.role}</div>
                  </div>
                </div>
                <button onClick={() => navigate(getDashboardPath(user.role))}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  📊 My Dashboard
                </button>
                <button onClick={logout}
                  className="w-full text-left px-3 py-3 rounded-xl text-sm text-red/60 hover:text-red hover:bg-red/5 transition-all">
                  🚪 Sign Out
                </button>
              </div>
            ) : (
              <div className="border-t border-[rgba(201,168,76,0.1)] pt-4 flex gap-3">
                <Link to="/login" className="btn-ghost flex-1 justify-center text-sm py-3" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link to="/booking" className="btn-primary flex-1 justify-center text-sm" onClick={() => setMobileOpen(false)}>Book Now</Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

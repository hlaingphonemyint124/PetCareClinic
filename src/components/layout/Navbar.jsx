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
  const { user, logout, getDashboardPath } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent'
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center text-bg font-bold text-lg shadow-green-glow group-hover:scale-110 transition-transform duration-300">
            🐾
          </div>
          <span className="font-display text-xl text-white">PawCare</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(l => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 relative group">
              {l.label}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(getDashboardPath(user.role))}
                className="flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-white/70 hover:text-white hover:border-white/15 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-green/20 text-green flex items-center justify-center text-xs font-bold">
                  {user.avatar || user.name?.[0]}
                </div>
                {user.name?.split(' ')[0]}
                <ChevronDown size={13} />
              </button>
              <button onClick={logout} className="btn-ghost text-xs py-2 px-4">
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost py-2 text-sm">Sign In</Link>
              <Link to="/booking" className="btn-primary py-2.5">
                <span>Book Appointment</span>
                <span>→</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white/60 hover:text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass-strong border-t border-white/5 px-6 py-4"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          >
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                className="block py-3 text-white/60 hover:text-white text-sm border-b border-white/5 last:border-0">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/login" className="btn-ghost flex-1 justify-center text-sm py-2.5">Sign In</Link>
              <Link to="/booking" className="btn-primary flex-1 justify-center text-sm">Book Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

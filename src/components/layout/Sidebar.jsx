import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../../lib/AppContext'
import clsx from 'clsx'

const NAV_BY_ROLE = {
  owner: [
    { section: 'Overview', items: [{ icon: '🏠', label: 'Dashboard', to: '/dashboard/owner' }] },
    { section: 'My Pets', items: [
      { icon: '🐾', label: 'Pet Profiles', to: '/dashboard/owner/pets' },
      { icon: '📋', label: 'Medical Records', to: '/dashboard/owner/records' },
      { icon: '💉', label: 'Vaccinations', to: '/dashboard/owner/vaccines', badge: '2', badgeColor: 'red' },
    ]},
    { section: 'Appointments', items: [
      { icon: '📅', label: 'My Appointments', to: '/dashboard/owner/appointments' },
      { icon: '➕', label: 'Book New', to: '/booking' },
    ]},
    { section: 'Billing', items: [{ icon: '💳', label: 'Invoices', to: '/dashboard/owner/billing' }] },
  ],
  vet: [
    { section: 'Vet Panel', items: [
      { icon: '🏠', label: 'Dashboard', to: '/dashboard/vet' },
      { icon: '📅', label: 'My Schedule', to: '/dashboard/vet/schedule', badge: '8', badgeColor: 'green' },
      { icon: '🐾', label: 'Patients', to: '/dashboard/vet/patients' },
    ]},
    { section: 'Clinical', items: [
      { icon: '📋', label: 'Medical Records', to: '/dashboard/vet/records' },
      { icon: '💊', label: 'Prescriptions', to: '/dashboard/vet/prescriptions' },
      { icon: '🔬', label: 'Lab Results', to: '/dashboard/vet/lab' },
    ]},
  ],
  receptionist: [
    { section: 'Reception', items: [
      { icon: '🏠', label: 'Dashboard', to: '/dashboard/reception' },
      { icon: '🚦', label: 'Live Queue', to: '/dashboard/reception/queue', badge: '5', badgeColor: 'amber' },
      { icon: '📅', label: 'Appointments', to: '/dashboard/reception/appointments' },
      { icon: '🚶', label: 'Walk-ins', to: '/dashboard/reception/walkins' },
    ]},
    { section: 'Admin', items: [
      { icon: '👥', label: 'Customers', to: '/dashboard/reception/customers' },
      { icon: '🧾', label: 'Invoices', to: '/dashboard/reception/invoices' },
    ]},
  ],
  admin: [
    { section: 'Analytics', items: [
      { icon: '📊', label: 'Dashboard', to: '/dashboard/admin' },
    ]},
    { section: 'Management', items: [
      { icon: '👥', label: 'Users', to: '/dashboard/admin/users' },
      { icon: '🩺', label: 'Veterinarians', to: '/dashboard/admin/vets' },
      { icon: '🐾', label: 'All Pets', to: '/dashboard/admin/pets' },
      { icon: '📅', label: 'Appointments', to: '/dashboard/admin/appointments' },
      { icon: '🔧', label: 'Services', to: '/dashboard/admin/services' },
    ]},
    { section: 'Finance', items: [
      { icon: '💳', label: 'Payments', to: '/dashboard/admin/payments' },
      { icon: '🧾', label: 'Invoices', to: '/dashboard/admin/invoices' },
    ]},
    { section: 'Content', items: [
      { icon: '📝', label: 'Blog Posts', to: '/dashboard/admin/blog' },
      { icon: '⚙️', label: 'Settings', to: '/dashboard/admin/settings' },
    ]},
  ],
}

const ROLE_CONFIG = {
  owner:        { label: 'Pet Owner',     color: '#4da6ff', bg: 'rgba(77,166,255,0.1)',  border: 'rgba(77,166,255,0.2)'  },
  vet:          { label: 'Veterinarian',  color: '#00e5a0', bg: 'rgba(0,229,160,0.1)',   border: 'rgba(0,229,160,0.2)'   },
  receptionist: { label: 'Receptionist',  color: '#ffb84d', bg: 'rgba(255,184,77,0.1)',  border: 'rgba(255,184,77,0.2)'  },
  admin:        { label: 'Administrator', color: '#ff4d6d', bg: 'rgba(255,77,109,0.1)',  border: 'rgba(255,77,109,0.2)'  },
}

export default function Sidebar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const role = user?.role || 'owner'
  const navSections = NAV_BY_ROLE[role] || NAV_BY_ROLE.owner
  const rc = ROLE_CONFIG[role]

  return (
    <motion.aside
      className="w-[232px] h-screen sticky top-0 flex flex-col overflow-hidden flex-shrink-0"
      style={{ background: 'rgba(8,11,18,0.97)', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      initial={{ x: -232, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Top ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${rc.color}10 0%, transparent 70%)` }} />

      {/* Logo */}
      <div className="h-[64px] flex items-center px-5 gap-3 flex-shrink-0 relative z-10"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: `${rc.color}18`, border: `1px solid ${rc.color}35`, boxShadow: `0 0 16px ${rc.color}20` }}>
          🐾
        </div>
        <div>
          <div className="font-display text-sm text-white leading-none">PawCare</div>
          <div className="text-[10px] mt-0.5 font-medium" style={{ color: rc.color }}>{rc.label}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden relative z-10
        [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full"
        style={{ scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
        {navSections.map((section) => (
          <div key={section.section} className="mb-4">
            <div className="px-3 py-1 text-[9px] font-bold tracking-[0.18em] uppercase mb-1"
              style={{ color: 'rgba(255,255,255,0.14)' }}>
              {section.section}
            </div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to.split('/').length <= 3}
              >
                {({ isActive }) => (
                  <div className={clsx(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium mb-0.5 transition-all duration-200 cursor-pointer relative',
                    isActive ? 'text-white' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'
                  )}>
                    {isActive && (
                      <motion.div className="absolute inset-0 rounded-xl" layoutId={`nav-active-${role}`}
                        style={{ background: `${rc.color}10`, border: `1px solid ${rc.color}22` }}
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }} />
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ background: rc.color, boxShadow: `0 0 6px ${rc.color}` }} />
                    )}
                    <span className="text-base w-5 text-center flex-shrink-0 relative z-10">{item.icon}</span>
                    <span className="flex-1 truncate relative z-10">{item.label}</span>
                    {item.badge && (
                      <span className="relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: item.badgeColor==='red' ? 'rgba(255,77,109,0.2)' : item.badgeColor==='amber' ? 'rgba(255,184,77,0.2)' : 'rgba(0,229,160,0.15)',
                          color: item.badgeColor==='red' ? '#ff4d6d' : item.badgeColor==='amber' ? '#ffb84d' : '#00e5a0',
                        }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bottom user card */}
      <div className="p-3 flex-shrink-0 relative z-10"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        {/* Visit Website link */}
        <NavLink to="/"
          className="flex items-center gap-2.5 px-3 py-2 mb-2 rounded-xl text-xs font-medium transition-all duration-200 hover:bg-white/[0.04] group"
          style={{ color: 'rgba(255,255,255,0.3)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0 group-hover:-translate-x-0.5 transition-transform duration-200">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span className="group-hover:text-white/60 transition-colors">Back to Website</span>
        </NavLink>
        <div className="flex items-center gap-1.5 px-2 mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00e5a0' }} />
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.18)' }}>Online</span>
        </div>
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-200 cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: rc.bg, border: `1px solid ${rc.border}`, color: rc.color }}>
            {user?.avatar || user?.name?.[0] || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate leading-none mb-0.5">{user?.name || 'Guest'}</div>
            <div className="text-[10px] truncate font-medium" style={{ color: rc.color }}>{rc.label}</div>
          </div>
          <button onClick={() => { logout(); navigate('/') }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-red/10"
            style={{ color: 'rgba(255,255,255,0.15)' }}
            title="Sign out">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.aside>
  )
}

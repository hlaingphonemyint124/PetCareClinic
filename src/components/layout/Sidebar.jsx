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
      { icon: '💉', label: 'Vaccinations', to: '/dashboard/owner/vaccines', badge: '2' },
    ]},
    { section: 'Appointments', items: [
      { icon: '📅', label: 'My Appointments', to: '/dashboard/owner/appointments' },
      { icon: '➕', label: 'Book New', to: '/booking' },
    ]},
    { section: 'Billing', items: [
      { icon: '💳', label: 'Invoices', to: '/dashboard/owner/billing' },
    ]},
  ],
  vet: [
    { section: 'Vet Panel', items: [
      { icon: '🏠', label: 'Dashboard', to: '/dashboard/vet' },
      { icon: '📅', label: 'My Schedule', to: '/dashboard/vet/schedule', badge: '8' },
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
      { icon: '🚦', label: 'Live Queue', to: '/dashboard/reception/queue', badge: '5' },
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

const ROLE_COLORS = {
  owner: { text: 'text-blue', bg: 'bg-blue/10', border: 'border-blue/20' },
  vet: { text: 'text-green', bg: 'bg-green/10', border: 'border-green/20' },
  receptionist: { text: 'text-amber', bg: 'bg-amber/10', border: 'border-amber/20' },
  admin: { text: 'text-red', bg: 'bg-red/10', border: 'border-red/20' },
}

export default function Sidebar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const role = user?.role || 'owner'
  const navSections = NAV_BY_ROLE[role] || NAV_BY_ROLE.owner
  const rc = ROLE_COLORS[role]

  return (
    <motion.aside
      className="w-[240px] h-screen sticky top-0 bg-bg-2 border-r border-white/5 flex flex-col overflow-y-auto"
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Logo */}
      <div className="h-[60px] flex items-center px-5 gap-3 border-b border-white/5 flex-shrink-0">
        <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center text-base shadow-green-glow">🐾</div>
        <span className="font-display text-base text-white">PawCare</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navSections.map(section => (
          <div key={section.section} className="mb-3">
            <div className="px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-white/20 mb-1">
              {section.section}
            </div>
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === `/dashboard/${role}`}
                className={({ isActive }) => clsx('sidebar-item', isActive && 'active')}
              >
                <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-white/5 flex-shrink-0">
        <div className={clsx('flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer hover:bg-white/[0.03] transition-all duration-200', rc.border, rc.bg)}>
          <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0', rc.bg, rc.text)}>
            {user?.avatar || user?.name?.[0] || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{user?.name || 'Guest'}</div>
            <div className={clsx('text-[10px] capitalize', rc.text)}>{role}</div>
          </div>
          <button
            onClick={() => { logout(); navigate('/') }}
            className="text-white/20 hover:text-red transition-colors text-xs"
            title="Sign out"
          >
            🚪
          </button>
        </div>
      </div>
    </motion.aside>
  )
}

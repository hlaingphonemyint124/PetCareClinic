import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import clsx from 'clsx'

// ── Badge ─────────────────────────────────────────────────────────
export function Badge({ variant = 'gray', children, className }) {
  const variants = {
    green: 'badge-green', amber: 'badge-amber', red: 'badge-red',
    blue: 'badge-blue', purple: 'badge-purple', gray: 'badge-gray', teal: 'bg-teal/10 text-teal',
  }
  return <span className={clsx('badge', variants[variant], className)}>{children}</span>
}

// ── Status Badge ──────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    confirmed: ['green', '✓ Confirmed'], pending: ['amber', '⏳ Pending'],
    completed: ['gray', '✓ Completed'], cancelled: ['red', '✕ Cancelled'],
    waiting: ['blue', '● Waiting'], 'in-room': ['green', '▶ In Room'],
    'in-progress': ['green', '▶ In Progress'], active: ['green', 'Active'],
    inactive: ['gray', 'Inactive'], paid: ['green', '✓ Paid'], overdue: ['red', '⚠ Overdue'],
    upcoming: ['amber', '⚡ Due Soon'], ok: ['green', '✓ Up to Date'],
  }
  const [variant, label] = map[status] || ['gray', status]
  return <Badge variant={variant}>{label}</Badge>
}

// ── Modal ─────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, size = 'md' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={clsx('modal-box', size === 'lg' && 'modal-box-lg')}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-7 py-5" style={{borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
              <h2 className="font-display text-xl text-white">{title}</h2>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-red/10 hover:text-red flex items-center justify-center text-white/40 transition-all duration-200">
                <X size={15} />
              </button>
            </div>
            <div className="px-7 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Spinner ───────────────────────────────────────────────────────
export function Spinner({ size = 'md', color = 'green' }) {
  const sizes = { sm: 'w-4 h-4 border', md: 'w-6 h-6 border-2', lg: 'w-10 h-10 border-2' }
  return (
    <div className={clsx(
      sizes[size], 'rounded-full animate-spin',
      color === 'green' ? 'border-[rgba(201,168,76,0.2)] border-t-[#C9A84C]' : 'border-white/20 border-t-white'
    )} />
  )
}

// ── Loading Screen ────────────────────────────────────────────────
export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5" style={{background:'var(--bg-1)'}}>
      <div className="relative">
        <div className="w-20 h-20 rounded-full animate-pulse" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)'}} />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">🐾</div>
      </div>
      <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{borderColor:'rgba(201,168,76,0.2)',borderTopColor:'#C9A84C'}} />
      <p className="text-sm animate-pulse" style={{color:'rgba(201,168,76,0.45)'}}>Loading Mingalar Pet Clinic...</p>
    </div>
  )
}

// ── Stat Card ─────────────────────────────────────────────────────
export function StatCard({ icon, value, label, change, changeUp, color = 'green', delay = 0 }) {
  const colors = {
    green: 'bg-[rgba(201,168,76,0.12)] text-[#C9A84C]', amber: 'bg-[rgba(232,200,112,0.1)] text-[#e8c870]',
    blue: 'bg-[rgba(126,181,255,0.1)] text-[#7eb5ff]', red: 'bg-red/10 text-red',
    purple: 'bg-purple/10 text-purple', teal: 'bg-teal/10 text-teal',
  }
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3', colors[color])}>
        {icon}
      </div>
      <div className="font-display text-3xl text-white leading-none mb-1">{value}</div>
      <div className="text-white/40 text-xs font-medium mb-1">{label}</div>
      {change && (
        <div className={clsx('text-xs flex items-center gap-1', changeUp ? 'text-[#C9A84C]' : 'text-red')}>
          {changeUp ? '▲' : '▼'} {change}
        </div>
      )}
    </motion.div>
  )
}

// ── Empty State ───────────────────────────────────────────────────
export function EmptyState({ icon = '🐾', title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4 animate-float">{icon}</div>
      <h3 className="font-display text-xl text-white mb-2">{title}</h3>
      {desc && <p className="text-white/40 text-sm mb-6 max-w-xs">{desc}</p>}
      {action}
    </div>
  )
}

// ── Avatar ────────────────────────────────────────────────────────
export function Avatar({ initials, color = 'green', size = 'md', emoji }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-2xl' }
  const colors = {
    green: 'bg-[rgba(201,168,76,0.12)] text-[#C9A84C]', amber: 'bg-[rgba(232,200,112,0.1)] text-[#e8c870]',
    blue: 'bg-[rgba(126,181,255,0.1)] text-[#7eb5ff]', red: 'bg-red/10 text-red', purple: 'bg-purple/10 text-purple',
  }
  return (
    <div className={clsx('rounded-full flex items-center justify-center font-bold flex-shrink-0', sizes[size], colors[color])}>
      {emoji || initials}
    </div>
  )
}

// ── Table Wrapper ─────────────────────────────────────────────────
export function TableWrap({ children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/5">
      <table className="data-table">{children}</table>
    </div>
  )
}

// ── Progress Bar ──────────────────────────────────────────────────
export function ProgressBar({ value, color = 'gold', animated = true }) {
  const colorMap = {
    gold: 'linear-gradient(90deg,#C9A84C,#f0d080)',
    amber: 'linear-gradient(90deg,#e8c870,#f0d080)',
    red: 'linear-gradient(90deg,#ff6b6b,#ff9999)',
    blue: 'linear-gradient(90deg,#7eb5ff,#aacfff)',
  }
  const bg = colorMap[color] || colorMap.gold
  return (
    <div className="progress-bar w-full flex-1">
      <div className="progress-fill" style={{width: `${Math.min(value,100)}%`, background: bg}} />
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
      <div>
        <h2 className="font-display text-2xl text-white">{title}</h2>
        {subtitle && <p className="text-white/40 text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

// ── Card ──────────────────────────────────────────────────────────
export function Card({ children, className, hover = false, glow }) {
  const glowColors = { green: 'hover:shadow-green-glow', amber: 'hover:shadow-[0_0_30px_rgba(232,200,112,0.3)]' }
  return (
    <div className={clsx(
      'glass rounded-2xl p-5',
      hover && 'transition-all duration-300 cursor-pointer hover:border-white/10 hover:-translate-y-1',
      glow && glowColors[glow],
      className
    )}>
      {children}
    </div>
  )
}

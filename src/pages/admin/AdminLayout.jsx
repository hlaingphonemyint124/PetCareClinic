import { motion } from 'framer-motion'
import Sidebar from '../../components/layout/Sidebar'
import toast from 'react-hot-toast'

export function AdminLayout({ title, subtitle, children, action }) {
  return (
    <div className="flex h-screen bg-[#080f1c] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-[64px] border-b border-[rgba(201,168,76,0.1)] flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: 'rgba(6,11,20,0.9)', backdropFilter: 'blur(24px)', borderBottom:'1px solid rgba(201,168,76,0.1)' }}>
          <div>
            <h1 className="text-white font-semibold text-sm leading-none">{title}</h1>
            {subtitle && <p className="text-white/25 text-xs mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/25 border bg-transparent">
              <span>🔍</span>
              <input className="bg-transparent outline-none w-32 placeholder:text-white/15 text-white/70" placeholder="Search anything..." />
              <span className="text-white/10 text-[10px] border border-white/10 rounded px-1 py-0.5">⌘K</span>
            </div>
            <button className="w-9 h-9 rounded-xl border bg-transparent flex items-center justify-center text-sm hover:border-white/10 hover:bg-white/5 transition-all relative"
              onClick={() => toast('3 new notifications')}>
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#C9A84C'}} />
            </button>
            <button className="w-9 h-9 rounded-xl border bg-transparent flex items-center justify-center text-sm hover:border-white/10 transition-all">📤</button>
            {action && <div>{action}</div>}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto" style={{ background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.02) 0%, transparent 50%), #080f1c' }}>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

const COLORS = {
  green:  { bg: 'rgba(201,168,76,0.08)',  border: 'rgba(201,168,76,0.15)',  text: '#C9A84C',  shadow: '0 0 30px rgba(201,168,76,0.08)' },
  amber:  { bg: 'rgba(232,200,112,0.08)', border: 'rgba(232,200,112,0.15)', text: '#e8c870',  shadow: '0 0 30px rgba(232,200,112,0.08)' },
  blue:   { bg: 'rgba(126,181,255,0.08)', border: 'rgba(126,181,255,0.15)', text: '#7eb5ff',  shadow: '0 0 30px rgba(126,181,255,0.08)' },
  red:    { bg: 'rgba(255,77,109,0.08)', border: 'rgba(255,77,109,0.15)', text: '#ff4d6d',  shadow: '0 0 30px rgba(255,77,109,0.08)' },
  purple: { bg: 'rgba(180,138,255,0.08)',border: 'rgba(180,138,255,0.15)',text: '#b48aff',  shadow: '0 0 30px rgba(180,138,255,0.08)' },
  teal:   { bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.15)', text: '#2dd4bf',  shadow: '0 0 30px rgba(45,212,191,0.08)' },
}

export function PremiumStat({ icon, value, label, change, changeUp, color, delay = 0, glow }) {
  const c = COLORS[color] || COLORS.green
  return (
    <motion.div
      className="relative rounded-2xl p-5 overflow-hidden cursor-default group"
      style={{ background: 'rgba(15,18,28,0.8)', border: `1px solid ${c.border}`, boxShadow: glow ? c.shadow : 'none' }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -3, boxShadow: c.shadow.replace('0.08','0.18') }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.text}, transparent)`, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}>{icon}</div>
        <div className="font-display text-3xl text-white leading-none mb-1.5">{value}</div>
        <div className="text-white/35 text-xs font-medium mb-2">{label}</div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${changeUp ? 'text-[#C9A84C]' : 'text-red'}`}>
            <span>{changeUp ? '↑' : '↓'}</span><span>{change}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

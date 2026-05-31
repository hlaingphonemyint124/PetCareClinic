import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, ChevronRight, AlertCircle } from 'lucide-react'
import { DashLayout } from './DashLayout'
import { StatCard, StatusBadge, ProgressBar, SectionHeader } from '../../components/shared/UI'
import { DEMO_PETS, DEMO_APPOINTMENTS, DEMO_VACCINES } from '../../lib/demoData'
import { useApp } from '../../lib/AppContext'
import clsx from 'clsx'

export function OwnerDashboard() {
  const { user } = useApp()
  const myPets = DEMO_PETS.slice(0, 2)
  const upcoming = DEMO_APPOINTMENTS.filter(a => ['confirmed','pending'].includes(a.status)).slice(0, 2)
  const overdue = DEMO_VACCINES.filter(v => v.status === 'overdue')
  const dueSoon = DEMO_VACCINES.filter(v => v.status === 'upcoming')

  const firstName = user?.name?.split(' ')[0] || 'there'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <DashLayout title="Dashboard">
      <SectionHeader
        title={`${greeting}, ${firstName} 👋`}
        subtitle="Here's what's happening with your pets today."
        action={<Link to="/booking" className="btn-primary text-sm py-2.5"><Plus size={14} /> Book Appointment</Link>}
      />

      {overdue.length > 0 && (
        <motion.div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-6"
          style={{ background:'rgba(255,77,109,0.08)', border:'1px solid rgba(255,77,109,0.2)' }}
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
          <AlertCircle size={18} className="text-red flex-shrink-0" />
          <div className="flex-1">
            <span className="text-red font-semibold text-sm">Action Required: </span>
            <span className="text-red/70 text-sm">{overdue.length} vaccination{overdue.length>1?'s':''} overdue for your pets. Schedule immediately.</span>
          </div>
          <Link to="/dashboard/owner/vaccines" className="text-red text-xs font-semibold hover:underline flex-shrink-0">View →</Link>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🐾" value={myPets.length} label="Registered Pets" color="blue" delay={0} />
        <StatCard icon="📅" value={upcoming.length} label="Upcoming Appts" color="green" delay={0.07} />
        <StatCard icon="💉" value={overdue.length + dueSoon.length} label="Vaccine Alerts" color="amber" delay={0.14} />
        <StatCard icon="📋" value="8" label="Total Visits" color="purple" delay={0.21} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">My Pets</h3>
            <Link to="/dashboard/owner/pets" className="text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] flex items-center gap-1 transition-colors">View all <ChevronRight size={12}/></Link>
          </div>
          <div className="space-y-3">
            {myPets.map((p, i) => (
              <motion.div key={p.id}
                className="rounded-2xl p-4 flex items-center gap-4 group cursor-pointer transition-all duration-200 hover:border-white/10"
                style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}
                initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.1+0.3 }}
                whileHover={{ x:3 }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background:`rgba(${p.color==='green'?'0,229,160':p.color==='amber'?'255,184,77':'77,166,255'},0.1)`, border:`2px solid rgba(${p.color==='green'?'0,229,160':p.color==='amber'?'255,184,77':'77,166,255'},0.2)` }}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{p.pet_name}</div>
                  <div className="text-white/30 text-xs mb-2">{p.breed} · {p.gender}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1"><ProgressBar value={p.health} color={p.health>85?'gold':'amber'} /></div>
                    <span className={clsx('text-xs font-semibold',p.health>85?'text-[#C9A84C]':'text-[#e8c870]')}>{p.health}%</span>
                  </div>
                </div>
                <StatusBadge status={p.health>85?'active':'upcoming'} />
              </motion.div>
            ))}
            <Link to="/dashboard/owner/pets"
              className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm text-white/25 hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.2)] transition-all duration-200"
              style={{ border:'1px dashed rgba(255,255,255,0.08)' }}>
              <Plus size={14}/> Add New Pet
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Upcoming Appointments</h3>
              <Link to="/dashboard/owner/appointments" className="text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] flex items-center gap-1 transition-colors">View all <ChevronRight size={12}/></Link>
            </div>
            <div className="space-y-2.5">
              {upcoming.map((a, i) => (
                <motion.div key={a.id}
                  className="rounded-2xl p-4 flex items-center gap-4"
                  style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08+0.4 }}>
                  <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-lg flex-shrink-0">🩺</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{a.service} — {a.pet_name}</div>
                    <div className="text-white/30 text-xs mt-0.5">{a.vet} · {a.date} · {a.time} · {a.room}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Vaccination Alerts</h3>
              <Link to="/dashboard/owner/vaccines" className="text-xs text-[#C9A84C]/70 hover:text-[#C9A84C] flex items-center gap-1 transition-colors">View all <ChevronRight size={12}/></Link>
            </div>
            <div className="space-y-2">
              {[...overdue, ...dueSoon].slice(0,3).map((v, i) => (
                <motion.div key={v.id}
                  className="rounded-xl p-3.5 flex items-center gap-3"
                  style={{ background:`rgba(${v.status==='overdue'?'255,77,109':'255,184,77'},0.06)`, border:`1px solid rgba(${v.status==='overdue'?'255,77,109':'255,184,77'},0.15)` }}
                  initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06+0.5 }}>
                  <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0', v.status==='overdue'?'bg-red/10':'bg-[rgba(232,200,112,0.1)]')}>💉</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">Buddy — {v.name}</div>
                    <div className={clsx('text-xs', v.status==='overdue'?'text-red/60':'text-[#e8c870]/60')}>Due: {v.next}</div>
                  </div>
                  <StatusBadge status={v.status} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  )
}

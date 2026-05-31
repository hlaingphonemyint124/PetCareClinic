import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Download, FileText, Shield } from 'lucide-react'
import { DashLayout } from './DashLayout'
import { Modal, StatusBadge, SectionHeader, StatCard } from '../../components/shared/UI'
import { DEMO_RECORDS, DEMO_VACCINES, DEMO_APPOINTMENTS, DEMO_INVOICES } from '../../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

// ── MEDICAL RECORDS ───────────────────────────────────────────────
export function OwnerRecords() {
  const [petTab, setPetTab] = useState(0)
  return (
    <DashLayout title="Medical Records">
      <SectionHeader title="Medical Records" subtitle="Complete clinical history for your pets" />
      <div className="flex gap-2 mb-6">
        {['🐕 Buddy','🐈 Luna'].map((p,i)=>(
          <button key={i} onClick={()=>setPetTab(i)}
            className={clsx('px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              petTab===i?'text-white':'text-white/30 hover:text-white/60')}
            style={petTab===i?{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.25)'}:{border:'1px solid rgba(255,255,255,0.06)'}}>
            {p}
          </button>
        ))}
      </div>
      <div className="timeline">
        {DEMO_RECORDS.map((r,i)=>(
          <motion.div key={r.id} className="timeline-item"
            initial={{opacity:0,x:-16}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}>
            <div className="timeline-dot" />
            <div className="rounded-2xl p-5 ml-2" style={{background:'rgba(15,18,28,0.8)',border:'1px solid rgba(255,255,255,0.05)'}}>
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <div className="text-white/25 text-xs mb-1">📅 {r.date}</div>
                  <div className="font-semibold text-white">{r.diagnosis}</div>
                  <div className="text-[#C9A84C] text-xs mt-0.5">👨‍⚕️ {r.vet}</div>
                </div>
                <div className="text-[#C9A84C] font-display text-xl">฿{r.fee.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-white/40 mb-4">
                <div className="rounded-xl p-3" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/20 text-[10px] uppercase tracking-wider mb-1">Treatment</div>
                  <div className="text-white/50 leading-relaxed">{r.treatment}</div>
                </div>
                <div className="rounded-xl p-3" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/20 text-[10px] uppercase tracking-wider mb-1">Prescription</div>
                  <div className="text-white/50 leading-relaxed">{r.prescription}</div>
                </div>
              </div>
              {r.notes&&<div className="text-xs text-white/30 rounded-xl p-3 leading-relaxed mb-3" style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.04)'}}>{r.notes}</div>}
              <div className="flex gap-2">
                <button className="btn-ghost text-xs py-1.5 px-4" onClick={()=>toast('Downloading report...')}><FileText size={11} className="inline mr-1"/>View Full</button>
                <button className="btn-ghost text-xs py-1.5 px-4" onClick={()=>toast.success('Report downloaded!')}><Download size={11} className="inline mr-1"/>Download PDF</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </DashLayout>
  )
}

// ── VACCINATIONS ──────────────────────────────────────────────────
export function OwnerVaccines() {
  const [certOpen, setCertOpen] = useState(false)
  const [selectedVac, setSelectedVac] = useState(null)
  const openCert = (v) => { setSelectedVac(v); setCertOpen(true) }

  return (
    <DashLayout title="Vaccinations">
      <SectionHeader title="Vaccination Tracker" subtitle="Monitor and manage your pets' immunization schedules"
        action={<button className="btn-ghost text-sm py-2.5" onClick={()=>toast.success('Reminders enabled!')}>🔔 Enable Reminders</button>} />

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl p-4 text-center" style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)'}}>
          <div className="font-display text-2xl text-[#C9A84C] mb-0.5">{DEMO_VACCINES.filter(v=>v.status==='ok').length}</div>
          <div className="text-[#C9A84C]/60 text-xs">Up to Date</div>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{background:'rgba(232,200,112,0.06)',border:'1px solid rgba(232,200,112,0.15)'}}>
          <div className="font-display text-2xl text-[#e8c870] mb-0.5">{DEMO_VACCINES.filter(v=>v.status==='upcoming').length}</div>
          <div className="text-[#e8c870]/60 text-xs">Due Soon</div>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{background:'rgba(255,77,109,0.06)',border:'1px solid rgba(255,77,109,0.15)'}}>
          <div className="font-display text-2xl text-red mb-0.5">{DEMO_VACCINES.filter(v=>v.status==='overdue').length}</div>
          <div className="text-red/60 text-xs">Overdue</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[{pet:'🐕 Buddy', vaccines:DEMO_VACCINES},{pet:'🐈 Luna', vaccines:DEMO_VACCINES.slice(0,3)}].map(({pet,vaccines})=>(
          <div key={pet}>
            <h3 className="font-semibold text-white mb-4">{pet}</h3>
            <div className="space-y-2">
              {vaccines.map((v,i)=>(
                <motion.div key={v.id}
                  className="rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200 group"
                  style={{ background:'rgba(15,18,28,0.8)', border:`1px solid rgba(${v.status==='overdue'?'255,77,109':v.status==='upcoming'?'255,184,77':'0,229,160'},0.1)` }}
                  initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}}
                  whileHover={{x:3}}>
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0',
                    v.status==='overdue'?'bg-red/10':v.status==='upcoming'?'bg-[rgba(232,200,112,0.1)]':'bg-[rgba(201,168,76,0.1)]')}>💉</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm truncate">{v.name}</div>
                    <div className="text-white/25 text-xs">Given: {v.given} · Next: {v.next}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={v.status} />
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] transition-all"
                      style={{border:'1px solid rgba(255,255,255,0.06)'}}
                      onClick={()=>openCert(v)}><Shield size={13}/></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal open={certOpen} onClose={()=>setCertOpen(false)} title="📜 Vaccination Certificate">
        <div className="rounded-2xl p-6 text-center" style={{background:'rgba(201,168,76,0.05)',border:'2px solid rgba(201,168,76,0.2)'}}>
          <div className="text-4xl mb-3">🏅</div>
          <div className="font-display text-xl text-white mb-1">Vaccination Certificate</div>
          <div className="text-white/25 text-xs mb-5">Mingalar Pet Clinic · Yangon · License #VH-MM-2024-0091</div>
          <div className="rounded-xl p-4 text-left" style={{background:'rgba(255,255,255,0.03)'}}>
            <div className="grid grid-cols-2 gap-y-2.5 text-sm">
              {[['Pet Name','Buddy'],['Breed','Golden Retriever'],['Owner','Kyaw Zin'],['Vaccine',selectedVac?.name||'DHPP + Rabies'],['Administered',selectedVac?.given||'Jul 5, 2025'],['Valid Until',selectedVac?.next||'Jul 5, 2026'],['Batch No',selectedVac?.batch||'BN-2025-4421'],['Vet','Dr. Htet Aung Kyaw, DVM']].map(([k,v])=>(
                <><span key={`k-${k}`} className="text-white/25">{k}:</span><span key={`v-${k}`} className="text-white font-medium">{v}</span></>
              ))}
            </div>
          </div>
          <div className="text-[#C9A84C] text-xs mt-4">✅ Digitally verified · Valid certificate</div>
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <button className="btn-ghost" onClick={()=>setCertOpen(false)}>Close</button>
          <button className="btn-primary" onClick={()=>toast.success('Certificate PDF downloaded!')}><Download size={14}/>Download PDF</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

// ── APPOINTMENTS ──────────────────────────────────────────────────
export function OwnerAppointments() {
  const [tab, setTab] = useState('upcoming')
  const upcoming = DEMO_APPOINTMENTS.filter(a=>['confirmed','pending'].includes(a.status))
  const completed = DEMO_APPOINTMENTS.filter(a=>a.status==='completed')

  return (
    <DashLayout title="My Appointments">
      <SectionHeader title="My Appointments" subtitle="Track and manage all your pet appointments"
        action={<Link to="/booking" className="btn-primary text-sm py-2.5"><Plus size={14}/> Book New</Link>} />
      <div className="flex gap-2 mb-6">
        {[['upcoming',`Upcoming (${upcoming.length})`],['completed',`Completed (${completed.length})`]].map(([v,l])=>(
          <button key={v} onClick={()=>setTab(v)}
            className={clsx('px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              tab===v?'text-white':'text-white/30 hover:text-white/60')}
            style={tab===v?{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.25)'}:{border:'1px solid rgba(255,255,255,0.06)'}}>
            {l}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {(tab==='upcoming'?upcoming:completed).map((a,i)=>(
          <motion.div key={a.id}
            className="rounded-2xl p-5 flex items-center gap-4 flex-wrap"
            style={{background:'rgba(15,18,28,0.8)',border:'1px solid rgba(255,255,255,0.05)'}}
            initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
            <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-2xl flex-shrink-0">🐾</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white">{a.service} — {a.pet_name}</div>
              <div className="text-white/30 text-xs mt-0.5">{a.vet} · {a.date} · {a.time} · {a.room}</div>
            </div>
            <StatusBadge status={a.status}/>
            {tab==='upcoming'&&(
              <div className="flex gap-2">
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={()=>toast('Reschedule form...')}>Reschedule</button>
                <button className="btn-danger text-xs py-1.5 px-3" onClick={()=>toast.error('Appointment cancelled')}>Cancel</button>
              </div>
            )}
            {tab==='completed'&&(
              <div className="flex items-center gap-3">
                <div className="text-[#C9A84C] font-display">฿{a.fee?.toLocaleString()}</div>
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={()=>toast.success('Downloading report...')}><FileText size={11}/> Report</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </DashLayout>
  )
}

// ── BILLING ───────────────────────────────────────────────────────
export function OwnerBilling() {
  const paid = DEMO_INVOICES.filter(i=>i.status==='paid')
  const totalSpent = paid.reduce((s,i)=>s+i.amount,0)

  return (
    <DashLayout title="Billing & Payments">
      <SectionHeader title="Invoices & Payments"
        action={<button className="btn-ghost text-sm py-2.5" onClick={()=>toast('Exporting...')}><Download size={14}/> Export</button>} />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon="💰" value={`฿${(totalSpent/1000).toFixed(0)}K`} label="Total Spent 2026" color="green" />
        <StatCard icon="⏳" value={`฿${DEMO_INVOICES.filter(i=>i.status==='pending').reduce((s,i)=>s+i.amount,0).toLocaleString()}`} label="Outstanding" color="amber" />
        <StatCard icon="🧾" value={DEMO_INVOICES.length} label="Total Invoices" color="blue" />
      </div>
      <div className="rounded-2xl overflow-hidden" style={{border:'1px solid rgba(255,255,255,0.05)'}}>
        <table className="w-full text-sm border-collapse">
          <thead style={{background:'rgba(255,255,255,0.02)'}}>
            <tr>{['Invoice #','Date','Service','Pet','Amount','Status',''].map(h=>(
              <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-white/20 border-b border-white/[0.04]">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {DEMO_INVOICES.map((inv,i)=>(
              <motion.tr key={inv.id} className="border-b border-white/[0.03] hover:bg-[rgba(201,168,76,0.03)] transition-colors"
                initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}}>
                <td className="px-5 py-4 text-[#7eb5ff] text-xs font-mono font-medium">{inv.id}</td>
                <td className="px-5 py-4 text-white/25 text-xs">{inv.date}</td>
                <td className="px-5 py-4 text-white font-medium">{inv.service}</td>
                <td className="px-5 py-4 text-white/50">{inv.pet}</td>
                <td className="px-5 py-4 text-[#C9A84C] font-display text-base">฿{inv.amount.toLocaleString()}</td>
                <td className="px-5 py-4"><StatusBadge status={inv.status}/></td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="btn-ghost text-xs py-1.5 px-3" onClick={()=>toast('Downloading PDF...')}><Download size={11}/></button>
                    {inv.status==='pending'&&(
                      <button className="btn-primary text-xs py-1.5 px-3" onClick={()=>toast.success('Payment processed!')}>Pay ฿{inv.amount.toLocaleString()}</button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  )
}

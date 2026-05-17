import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Download, Edit2, FileText, Shield, ChevronRight, AlertCircle } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { StatCard, Modal, Badge, StatusBadge, TableWrap, ProgressBar, SectionHeader, Card } from '../components/shared/UI'
import { DEMO_PETS, DEMO_APPOINTMENTS, DEMO_RECORDS, DEMO_VACCINES, DEMO_INVOICES } from '../lib/demoData'
import { useApp } from '../lib/AppContext'
import toast from 'react-hot-toast'
import clsx from 'clsx'

// ── Shared dashboard shell ────────────────────────────────────────
function DashLayout({ title, children }) {
  const { user } = useApp()
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-[64px] border-b border-white/[0.05] flex items-center justify-between px-6 flex-shrink-0"
          style={{ background:'rgba(8,11,18,0.9)', backdropFilter:'blur(20px)' }}>
          <div>
            <h1 className="text-white font-semibold text-sm leading-none">{title}</h1>
            <p className="text-white/20 text-[11px] mt-0.5">Pet Owner Dashboard</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 border border-white/[0.06] bg-white/[0.02] text-xs text-white/25">
              <span>🔍</span>
              <input className="bg-transparent outline-none w-28 placeholder:text-white/15 text-white/70" placeholder="Search..." />
            </div>
            <button className="w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-sm hover:border-white/10 transition-all relative"
              onClick={() => toast('3 notifications')}>
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center text-xs font-bold text-blue flex-shrink-0">
              {user?.avatar || 'JP'}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6"
          style={{ background:'radial-gradient(ellipse at top,rgba(77,166,255,0.02) 0%,transparent 50%),#080b12' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

// ── OWNER DASHBOARD ───────────────────────────────────────────────
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

      {/* Overdue alert */}
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

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🐾" value={myPets.length} label="Registered Pets" color="blue" delay={0} />
        <StatCard icon="📅" value={upcoming.length} label="Upcoming Appts" color="green" delay={0.07} />
        <StatCard icon="💉" value={overdue.length + dueSoon.length} label="Vaccine Alerts" color="amber" delay={0.14} />
        <StatCard icon="📋" value="8" label="Total Visits" color="purple" delay={0.21} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* My Pets */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">My Pets</h3>
            <Link to="/dashboard/owner/pets" className="text-xs text-green/70 hover:text-green flex items-center gap-1 transition-colors">View all <ChevronRight size={12}/></Link>
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
                    <div className="flex-1"><ProgressBar value={p.health} color={p.health>85?'bg-green':'bg-amber'} /></div>
                    <span className={clsx('text-xs font-semibold',p.health>85?'text-green':'text-amber')}>{p.health}%</span>
                  </div>
                </div>
                <StatusBadge status={p.health>85?'active':'upcoming'} />
              </motion.div>
            ))}
            <Link to="/dashboard/owner/pets"
              className="flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm text-white/25 hover:text-green hover:border-green/20 transition-all duration-200"
              style={{ border:'1px dashed rgba(255,255,255,0.08)' }}>
              <Plus size={14}/> Add New Pet
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Upcoming appointments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Upcoming Appointments</h3>
              <Link to="/dashboard/owner/appointments" className="text-xs text-green/70 hover:text-green flex items-center gap-1 transition-colors">View all <ChevronRight size={12}/></Link>
            </div>
            <div className="space-y-2.5">
              {upcoming.map((a, i) => (
                <motion.div key={a.id}
                  className="rounded-2xl p-4 flex items-center gap-4"
                  style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08+0.4 }}>
                  <div className="w-10 h-10 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center text-lg flex-shrink-0">🩺</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm">{a.service} — {a.pet_name}</div>
                    <div className="text-white/30 text-xs mt-0.5">{a.vet} · {a.date} · {a.time} · {a.room}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vaccine alerts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Vaccination Alerts</h3>
              <Link to="/dashboard/owner/vaccines" className="text-xs text-green/70 hover:text-green flex items-center gap-1 transition-colors">View all <ChevronRight size={12}/></Link>
            </div>
            <div className="space-y-2">
              {[...overdue, ...dueSoon].slice(0,3).map((v, i) => (
                <motion.div key={v.id}
                  className="rounded-xl p-3.5 flex items-center gap-3"
                  style={{ background:`rgba(${v.status==='overdue'?'255,77,109':'255,184,77'},0.06)`, border:`1px solid rgba(${v.status==='overdue'?'255,77,109':'255,184,77'},0.15)` }}
                  initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.06+0.5 }}>
                  <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0', v.status==='overdue'?'bg-red/10':'bg-amber/10')}>💉</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">Buddy — {v.name}</div>
                    <div className={clsx('text-xs', v.status==='overdue'?'text-red/60':'text-amber/60')}>Due: {v.next}</div>
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

// ── PET PROFILES ──────────────────────────────────────────────────
export function OwnerPets() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const myPets = DEMO_PETS.slice(0, 2)

  return (
    <DashLayout title="Pet Profiles">
      <SectionHeader title="My Pets" subtitle="Manage your registered pets"
        action={<button className="btn-primary text-sm py-2.5" onClick={()=>{setSelected(null);setModalOpen(true)}}><Plus size={14}/> Add Pet</button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {myPets.map((p, i) => (
          <motion.div key={p.id}
            className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300"
            style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
            whileHover={{ y:-6, boxShadow:'0 20px 60px rgba(0,0,0,0.4)', borderColor:'rgba(255,255,255,0.12)' }}>
            <div className="h-40 flex items-center justify-center text-7xl relative overflow-hidden"
              style={{ background:`linear-gradient(135deg, rgba(${p.color==='green'?'0,229,160':p.color==='amber'?'255,184,77':'77,166,255'},0.08), rgba(0,0,0,0))` }}>
              <span className="group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
              <div className="absolute top-3 right-3"><StatusBadge status={p.health>85?'active':'upcoming'} /></div>
            </div>
            <div className="p-5">
              <div className="font-display text-lg text-white mb-0.5">{p.pet_name}</div>
              <div className="text-white/30 text-xs mb-4">{p.breed} · {p.gender} · {p.weight} kg</div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="rounded-lg p-2.5 text-center" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/20 mb-0.5">Weight</div>
                  <div className="text-white font-semibold">{p.weight} kg</div>
                </div>
                <div className="rounded-lg p-2.5 text-center" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/20 mb-0.5">Next Vaccine</div>
                  <div className="text-white font-semibold text-[11px]">{p.next_vaccine}</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5"><span className="text-white/30">Health Score</span><span className={clsx('font-semibold',p.health>85?'text-green':'text-amber')}>{p.health}%</span></div>
                <ProgressBar value={p.health} color={p.health>85?'bg-green':'bg-amber'} />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-xl py-2.5 text-xs font-medium text-white/40 hover:text-white transition-all"
                  style={{border:'1px solid rgba(255,255,255,0.07)'}}
                  onClick={()=>{setSelected(p);setModalOpen(true)}}>
                  <Edit2 size={11} className="inline mr-1.5"/>Edit
                </button>
                <button className="rounded-xl px-3 py-2.5 text-xs transition-all" style={{background:'rgba(0,229,160,0.08)',border:'1px solid rgba(0,229,160,0.15)',color:'#00e5a0'}}
                  onClick={()=>toast.success(`${p.pet_name}'s vaccine certificate downloaded!`)}>
                  <Download size={11}/>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add new card */}
        <motion.button
          className="rounded-2xl flex flex-col items-center justify-center min-h-[320px] transition-all duration-300 group"
          style={{ border:'1.5px dashed rgba(255,255,255,0.08)' }}
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          whileHover={{ borderColor:'rgba(0,229,160,0.3)', background:'rgba(0,229,160,0.03)' }}
          onClick={()=>{setSelected(null);setModalOpen(true)}}>
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">➕</div>
          <div className="text-white/25 text-sm group-hover:text-green transition-colors">Add New Pet</div>
        </motion.button>
      </div>

      {/* Pet Modal */}
      <Modal open={modalOpen} onClose={()=>setModalOpen(false)} title={selected?`Edit ${selected.pet_name}`:'🐾 Add New Pet'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[['Pet Name *','pet_name','text','e.g. Buddy'],['Species *','species','text','Dog, Cat, Rabbit...'],['Breed','breed','text','e.g. Golden Retriever'],['Gender','gender','text','Male / Female'],['Date of Birth','birth_date','date',''],['Weight (kg)','weight','number','e.g. 5.2']].map(([l,k,t,p])=>(
            <div key={k}>
              <label className="text-xs text-white/40 mb-1.5 block font-medium">{l}</label>
              <input className="form-input" type={t} placeholder={p} defaultValue={selected?.[k]||''} />
            </div>
          ))}
        </div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block font-medium">Known Allergies</label>
          <input className="form-input" placeholder="e.g. Chicken protein, Penicillin — or 'None known'" defaultValue={selected?.allergies||''} /></div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block font-medium">Medical Notes</label>
          <textarea className="form-textarea" placeholder="Pre-existing conditions, ongoing medications..." defaultValue={selected?.notes||''} /></div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block font-medium">Photo URL (optional)</label>
          <input className="form-input" placeholder="https://..." /></div>
        <div className="flex gap-3 justify-end mt-6">
          <button className="btn-ghost" onClick={()=>setModalOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={()=>{toast.success(selected?'Pet updated!':'Pet added successfully!');setModalOpen(false)}}>
            {selected?'Save Changes':'Add Pet 🐾'}
          </button>
        </div>
      </Modal>
    </DashLayout>
  )
}

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
            style={petTab===i?{background:'rgba(0,229,160,0.1)',border:'1px solid rgba(0,229,160,0.25)'}:{border:'1px solid rgba(255,255,255,0.06)'}}>
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
                  <div className="text-green text-xs mt-0.5">👨‍⚕️ {r.vet}</div>
                </div>
                <div className="text-green font-display text-xl">฿{r.fee.toLocaleString()}</div>
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
        action={<button className="btn-ghost text-sm py-2.5" onClick={()=>toast.success('Reminders enabled! You will receive SMS/email alerts.')}>🔔 Enable Reminders</button>} />

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl p-4 text-center" style={{background:'rgba(0,229,160,0.06)',border:'1px solid rgba(0,229,160,0.15)'}}>
          <div className="font-display text-2xl text-green mb-0.5">{DEMO_VACCINES.filter(v=>v.status==='ok').length}</div>
          <div className="text-green/60 text-xs">Up to Date</div>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{background:'rgba(255,184,77,0.06)',border:'1px solid rgba(255,184,77,0.15)'}}>
          <div className="font-display text-2xl text-amber mb-0.5">{DEMO_VACCINES.filter(v=>v.status==='upcoming').length}</div>
          <div className="text-amber/60 text-xs">Due Soon</div>
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
                    v.status==='overdue'?'bg-red/10':v.status==='upcoming'?'bg-amber/10':'bg-green/10')}>💉</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm truncate">{v.name}</div>
                    <div className="text-white/25 text-xs">Given: {v.given} · Next: {v.next}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={v.status} />
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-green hover:bg-green/10 transition-all"
                      style={{border:'1px solid rgba(255,255,255,0.06)'}}
                      onClick={()=>openCert(v)} title="View Certificate">
                      <Shield size={13}/>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cert Modal */}
      <Modal open={certOpen} onClose={()=>setCertOpen(false)} title="📜 Vaccination Certificate">
        <div className="rounded-2xl p-6 text-center" style={{background:'rgba(0,229,160,0.05)',border:'2px solid rgba(0,229,160,0.2)'}}>
          <div className="text-4xl mb-3">🏅</div>
          <div className="font-display text-xl text-white mb-1">Vaccination Certificate</div>
          <div className="text-white/25 text-xs mb-5">PawCare Clinic · Bangkok · License #VH-2024-0091</div>
          <div className="rounded-xl p-4 text-left" style={{background:'rgba(255,255,255,0.03)'}}>
            <div className="grid grid-cols-2 gap-y-2.5 text-sm">
              {[['Pet Name','Buddy'],['Breed','Golden Retriever'],['Microchip','392-100-XXXXX'],['Owner','John Park'],['Vaccine',selectedVac?.name||'DHPP + Rabies'],['Administered',selectedVac?.given||'Jul 5, 2025'],['Valid Until',selectedVac?.next||'Jul 5, 2026'],['Batch No',selectedVac?.batch||'BN-2025-4421'],['Vet','Dr. Somchai Panya, DVM'],['Cert ID','CERT-2025-00789']].map(([k,v])=>(
                <><span key={`k-${k}`} className="text-white/25">{k}:</span><span key={`v-${k}`} className="text-white font-medium">{v}</span></>
              ))}
            </div>
          </div>
          <div className="text-green text-xs mt-4">✅ Digitally verified · Valid certificate</div>
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
            style={tab===v?{background:'rgba(0,229,160,0.1)',border:'1px solid rgba(0,229,160,0.25)'}:{border:'1px solid rgba(255,255,255,0.06)'}}>
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
            <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center text-2xl flex-shrink-0">🐾</div>
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
                <div className="text-green font-display">฿{a.fee?.toLocaleString()}</div>
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
        action={<button className="btn-ghost text-sm py-2.5" onClick={()=>toast('Exporting all invoices...')}><Download size={14}/> Export</button>} />
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
              <motion.tr key={inv.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.05}}>
                <td className="px-5 py-4 text-blue text-xs font-mono font-medium">{inv.id}</td>
                <td className="px-5 py-4 text-white/25 text-xs">{inv.date}</td>
                <td className="px-5 py-4 text-white font-medium">{inv.service}</td>
                <td className="px-5 py-4 text-white/50">{inv.pet}</td>
                <td className="px-5 py-4 text-green font-display text-base">฿{inv.amount.toLocaleString()}</td>
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

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Download, Edit2, Trash2, FileText, Shield } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { StatCard, Modal, Badge, StatusBadge, TableWrap, ProgressBar, SectionHeader, Card, EmptyState, Avatar } from '../components/shared/UI'
import { DEMO_PETS, DEMO_APPOINTMENTS, DEMO_RECORDS, DEMO_VACCINES, DEMO_INVOICES } from '../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

function DashLayout({ title, children }) {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-[60px] bg-bg-2 border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="font-semibold text-white text-sm">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-white/30">
              <span>🔍</span><input className="bg-transparent outline-none w-28 placeholder:text-white/20" placeholder="Search..." />
            </div>
            <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-sm relative hover:border-white/15 transition-all">
              🔔<span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red rounded-full" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

// ── OWNER DASHBOARD ───────────────────────────────────────────────
export function OwnerDashboard() {
  const myPets = DEMO_PETS.slice(0, 2)
  const upcoming = DEMO_APPOINTMENTS.filter(a => a.status === 'confirmed').slice(0, 1)
  const dueVaccines = DEMO_VACCINES.filter(v => v.status !== 'ok')

  return (
    <DashLayout title="Owner Dashboard">
      <SectionHeader
        title="Good morning, John 👋"
        subtitle="Here's what's happening with your pets today."
        action={<Link to="/booking" className="btn-primary text-sm py-2.5"><Plus size={14} /> Book Appointment</Link>}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🐾" value="2" label="Registered Pets" color="green" delay={0} />
        <StatCard icon="📅" value="1" label="Upcoming Appts" color="blue" delay={0.1} />
        <StatCard icon="💉" value="2" label="Due Vaccines" color="amber" delay={0.2} />
        <StatCard icon="📋" value="8" label="Total Visits" color="purple" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">My Pets</h3>
            <Link to="/dashboard/owner/pets" className="text-green text-xs hover:underline">View all →</Link>
          </div>
          <div className="space-y-3">
            {myPets.map((p, i) => (
              <motion.div key={p.id} className="glass rounded-2xl p-4 flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.4 }}
                whileHover={{ x: 4 }}>
                <div className={`w-12 h-12 rounded-full bg-${p.color}/10 border border-${p.color}/20 flex items-center justify-center text-2xl flex-shrink-0`}>{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{p.pet_name}</div>
                  <div className="text-white/30 text-xs">{p.breed} · {p.gender}</div>
                  <div className="mt-2"><ProgressBar value={p.health} color={p.health > 85 ? 'bg-green' : 'bg-amber'} /></div>
                </div>
                <StatusBadge status={p.health > 85 ? 'active' : 'upcoming'} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming appt */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Upcoming Appointment</h3>
              <Link to="/dashboard/owner/appointments" className="text-green text-xs hover:underline">View all →</Link>
            </div>
            {upcoming.map(a => (
              <Card key={a.id} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center text-xl flex-shrink-0">🩺</div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{a.service} — {a.pet_name}</div>
                  <div className="text-white/40 text-xs mt-0.5">{a.vet} · {a.date} · {a.time} · {a.room}</div>
                </div>
                <StatusBadge status={a.status} />
              </Card>
            ))}
          </div>

          {/* Due vaccines */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Due Vaccinations</h3>
              <Link to="/dashboard/owner/vaccines" className="text-green text-xs hover:underline">View all →</Link>
            </div>
            <div className="space-y-2">
              {dueVaccines.map(v => (
                <div key={v.id} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${v.status === 'overdue' ? 'bg-red/10' : 'bg-amber/10'}`}>💉</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Buddy — {v.name}</div>
                    <div className="text-xs text-white/30">Due: {v.next}</div>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
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
        action={<button className="btn-primary text-sm py-2.5" onClick={() => { setSelected(null); setModalOpen(true) }}><Plus size={14} /> Add Pet</button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {myPets.map((p, i) => (
          <motion.div key={p.id} className="glass rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={() => { setSelected(p); setModalOpen(true) }}>
            <div className={`h-36 bg-${p.color}/10 flex items-center justify-center text-6xl relative overflow-hidden`}>
              <span className="group-hover:scale-110 transition-transform duration-500">{p.emoji}</span>
              <div className="absolute top-3 right-3"><StatusBadge status={p.health > 85 ? 'active' : 'upcoming'} /></div>
            </div>
            <div className="p-4">
              <div className="font-display text-lg text-white mb-0.5">{p.pet_name}</div>
              <div className="text-white/40 text-xs mb-3">{p.breed} · {p.gender} · {p.weight} kg</div>
              <div className="flex items-center gap-2 text-xs text-white/30 mb-3">
                <span>💉 Next: {p.next_vaccine}</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-white/30">Health</span><span className="text-green font-semibold">{p.health}%</span></div>
                <ProgressBar value={p.health} color={p.health > 85 ? 'bg-green' : 'bg-amber'} />
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 glass rounded-xl py-2 text-xs text-white/50 hover:text-green hover:border-green/30 transition-all" onClick={e => { e.stopPropagation(); setSelected(p); setModalOpen(true) }}>
                  <Edit2 size={12} className="inline mr-1" /> Edit
                </button>
                <button className="glass rounded-xl px-3 py-2 text-xs text-red/60 hover:text-red hover:border-red/30 transition-all" onClick={e => { e.stopPropagation(); toast.success(`${p.pet_name}'s vaccine certificate downloaded!`) }}>
                  <Download size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add new card */}
        <motion.button className="glass rounded-2xl flex flex-col items-center justify-center min-h-[260px] border-dashed hover:border-green/30 hover:bg-green/3 transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onClick={() => { setSelected(null); setModalOpen(true) }}>
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">➕</div>
          <div className="text-white/30 text-sm group-hover:text-green transition-colors">Add New Pet</div>
        </motion.button>
      </div>

      {/* Pet Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={selected ? `Edit ${selected.pet_name}` : '🐾 Add New Pet'} size="lg">
        <div className="grid grid-cols-2 gap-4">
          {[['Pet Name *','pet_name','text','e.g. Buddy'],['Species *','species','text','Dog, Cat, etc.'],['Breed','breed','text','e.g. Golden Retriever'],['Gender','gender','text','Male / Female'],['Date of Birth','birth_date','date',''],['Weight (kg)','weight','number','e.g. 5.2']].map(([l,k,t,p]) => (
            <div key={k}><label className="text-xs text-white/40 mb-1.5 block">{l}</label>
              <input className="form-input" type={t} placeholder={p} defaultValue={selected?.[k] || ''} />
            </div>
          ))}
        </div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block">Known Allergies</label><input className="form-input" placeholder="e.g. Chicken protein, penicillin (or none)" defaultValue={selected?.allergies || ''} /></div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block">Medical Notes</label><textarea className="form-textarea" placeholder="Pre-existing conditions, medications..." defaultValue={selected?.notes || ''} /></div>
        <div className="mt-4"><label className="text-xs text-white/40 mb-1.5 block">Photo URL</label><input className="form-input" placeholder="https://..." /></div>
        <div className="flex gap-3 justify-end mt-6">
          <button className="btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={() => { toast.success(selected ? 'Pet updated!' : 'Pet added!'); setModalOpen(false) }}>
            {selected ? 'Save Changes' : 'Add Pet 🐾'}
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
      <SectionHeader title="Medical Records" subtitle="Complete health history for your pets" />
      <div className="flex gap-2 mb-6">
        {['🐕 Buddy', '🐈 Luna'].map((p, i) => (
          <button key={i} onClick={() => setPetTab(i)}
            className={clsx('px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', petTab === i ? 'bg-green/10 text-green border border-green/20' : 'glass text-white/40 hover:text-white')}>
            {p}
          </button>
        ))}
      </div>
      <div className="timeline">
        {DEMO_RECORDS.map((r, i) => (
          <motion.div key={r.id} className="timeline-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="timeline-dot" />
            <Card className="ml-2">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <div className="text-xs text-white/30 mb-1">📅 {r.date}</div>
                  <div className="font-semibold text-white">{r.diagnosis}</div>
                  <div className="text-green text-xs mt-0.5">👨‍⚕️ {r.vet}</div>
                </div>
                <div className="text-green font-display text-lg">฿{r.fee.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-white/40">
                <div><span className="text-white/20 block mb-0.5">Treatment</span>{r.treatment}</div>
                <div><span className="text-white/20 block mb-0.5">Prescription</span>{r.prescription}</div>
              </div>
              {r.notes && <div className="mt-3 text-xs text-white/30 bg-white/[0.03] rounded-xl p-3">{r.notes}</div>}
              <div className="flex gap-2 mt-4">
                <button className="btn-ghost text-xs py-1.5 px-4"><FileText size={12} className="inline mr-1" /> View Full</button>
                <button className="btn-ghost text-xs py-1.5 px-4" onClick={() => toast.success('Downloading report...')}><Download size={12} className="inline mr-1" /> Download</button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashLayout>
  )
}

// ── VACCINATIONS ──────────────────────────────────────────────────
export function OwnerVaccines() {
  const [certOpen, setCertOpen] = useState(false)
  return (
    <DashLayout title="Vaccinations">
      <SectionHeader title="Vaccination Tracker" subtitle="Track and manage vaccination schedules"
        action={<button className="btn-ghost text-sm py-2.5" onClick={() => toast.success('Reminders set!')}> 🔔 Set Reminders</button>} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[{ pet: '🐕 Buddy', vaccines: DEMO_VACCINES }, { pet: '🐈 Luna', vaccines: DEMO_VACCINES.slice(0, 3) }].map(({ pet, vaccines }) => (
          <div key={pet}>
            <h3 className="font-semibold text-white mb-4">{pet}</h3>
            <div className="space-y-2">
              {vaccines.map((v, i) => (
                <motion.div key={v.id} className="glass rounded-xl p-3.5 flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  whileHover={{ x: 3 }}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${v.status === 'overdue' ? 'bg-red/10' : v.status === 'upcoming' ? 'bg-amber/10' : 'bg-green/10'}`}>💉</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{v.name}</div>
                    <div className="text-white/30 text-xs">Given: {v.given} · Next: {v.next}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={v.status} />
                    <button className="w-7 h-7 glass rounded-lg flex items-center justify-center text-xs hover:border-green/30 hover:text-green transition-all" onClick={() => setCertOpen(true)} title="Certificate">
                      <Shield size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vaccine Certificate Modal */}
      <Modal open={certOpen} onClose={() => setCertOpen(false)} title="📜 Vaccine Certificate">
        <div className="border-2 border-green/30 rounded-2xl p-6 text-center bg-green/5">
          <div className="text-4xl mb-3">🏅</div>
          <div className="font-display text-xl text-white mb-1">Vaccination Certificate</div>
          <div className="text-white/30 text-xs mb-5">PawCare Clinic · Bangkok · License #VH-2024-0091</div>
          <div className="glass rounded-xl p-4 text-left grid grid-cols-2 gap-y-2 text-sm mb-5">
            {[['Pet Name','Buddy'],['Species','Dog / Golden Retriever'],['Microchip','392-100-XXXXX'],['Owner','John Park'],['Vaccine','DHPP + Rabies'],['Administered','5 Jul 2025'],['Valid Until','5 Jul 2026'],['Batch No','BN-2025-4421'],['Vet','Dr. Somchai Panya, DVM'],['Cert ID','CERT-2025-00789']].map(([k,v]) => (
              <>
                <span key={`k-${k}`} className="text-white/30">{k}:</span>
                <span key={`v-${k}`} className="text-white font-medium">{v}</span>
              </>
            ))}
          </div>
          <div className="text-green text-xs">✅ Digitally verified — Valid certificate</div>
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <button className="btn-ghost" onClick={() => setCertOpen(false)}>Close</button>
          <button className="btn-primary" onClick={() => toast.success('Downloading PDF...')}><Download size={14} /> Download PDF</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

// ── APPOINTMENTS ──────────────────────────────────────────────────
export function OwnerAppointments() {
  const [tab, setTab] = useState('upcoming')
  const upcoming = DEMO_APPOINTMENTS.filter(a => ['confirmed', 'pending'].includes(a.status))
  const completed = DEMO_APPOINTMENTS.filter(a => a.status === 'completed')

  return (
    <DashLayout title="My Appointments">
      <SectionHeader title="My Appointments" subtitle="Track and manage all your bookings"
        action={<Link to="/booking" className="btn-primary text-sm py-2.5"><Plus size={14} /> Book New</Link>} />
      <div className="flex gap-2 mb-6">
        {[['upcoming', `Upcoming (${upcoming.length})`], ['completed', `Completed (${completed.length})`]].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)}
            className={clsx('px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', tab === v ? 'bg-green/10 text-green border border-green/20' : 'glass text-white/40 hover:text-white')}>
            {l}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {(tab === 'upcoming' ? upcoming : completed).map((a, i) => (
          <motion.div key={a.id} className="glass rounded-2xl p-5 flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center text-2xl flex-shrink-0">🐾</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white">{a.service} — {a.pet_name}</div>
              <div className="text-white/40 text-xs mt-0.5">{a.vet} · {a.date} · {a.time} · {a.room}</div>
            </div>
            <StatusBadge status={a.status} />
            {tab === 'upcoming' && (
              <div className="flex gap-2">
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast('Reschedule form...')}>Reschedule</button>
                <button className="btn-danger text-xs py-1.5" onClick={() => toast.error('Appointment cancelled')}>Cancel</button>
              </div>
            )}
            {tab === 'completed' && (
              <div className="flex gap-2">
                <div className="text-green font-display text-sm">฿{a.fee}</div>
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast.success('Downloading report...')}><FileText size={12} /> Report</button>
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
  const totalSpent = DEMO_INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  return (
    <DashLayout title="Billing & Payments">
      <SectionHeader title="Invoices & Payments"
        action={<button className="btn-ghost text-sm py-2.5" onClick={() => toast('Exporting...')}><Download size={14} /> Export All</button>} />
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon="💰" value={`฿${(totalSpent / 1000).toFixed(0)}K`} label="Total Spent (2026)" color="green" />
        <StatCard icon="⏳" value="฿0" label="Outstanding" color="amber" />
        <StatCard icon="🧾" value={DEMO_INVOICES.length} label="Total Invoices" color="blue" />
      </div>
      <TableWrap>
        <thead><tr><th>Invoice #</th><th>Date</th><th>Service</th><th>Pet</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {DEMO_INVOICES.map((inv, i) => (
            <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <td><span className="text-blue text-xs font-mono">{inv.id}</span></td>
              <td><span className="text-white/30 text-xs">{inv.date}</span></td>
              <td className="text-white font-medium">{inv.service}</td>
              <td>{inv.pet}</td>
              <td><span className="text-green font-display">฿{inv.amount.toLocaleString()}</span></td>
              <td><StatusBadge status={inv.status} /></td>
              <td>
                <div className="flex gap-2">
                  <button className="btn-ghost text-xs py-1 px-3" onClick={() => toast('Downloading PDF...')}><Download size={11} /> PDF</button>
                  {inv.status === 'pending' && (
                    <button className="btn-primary text-xs py-1 px-3" onClick={() => toast.success('Payment processed!')}>Pay Now</button>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
    </DashLayout>
  )
}

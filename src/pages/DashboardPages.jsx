import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Download, Printer, CheckCircle, Clock, Users, Activity } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { StatCard, Modal, StatusBadge, TableWrap, ProgressBar, SectionHeader, Card } from '../components/shared/UI'
import { DEMO_PETS, DEMO_APPOINTMENTS, DEMO_RECORDS, DEMO_VACCINES, DEMO_INVOICES, DEMO_SERVICES, DEMO_BLOG, DEMO_QUEUE } from '../lib/demoData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
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
            <button className="w-8 h-8 glass rounded-full flex items-center justify-center text-sm relative">
              🔔<span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red rounded-full" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// VET DASHBOARD
// ══════════════════════════════════════════════════════════════════
export function VetDashboard() {
  const [recordOpen, setRecordOpen] = useState(false)
  const [rxOpen, setRxOpen] = useState(false)
  const [labOpen, setLabOpen] = useState(false)
  const [rxLines, setRxLines] = useState([{ drug: 'Cerenia (Maropitant) 24mg', dose: '1 tab', freq: 'SID', dur: '3 days' }])

  const schedule = [
    { time: '09:00', pet: 'Max', owner: 'Peter Park', service: 'Vaccination', status: 'done' },
    { time: '09:30', pet: 'Coco', owner: 'Amy Liu', service: 'Checkup', status: 'done' },
    { time: '10:00', pet: 'Buddy', owner: 'John Park', service: 'General Checkup', status: 'current' },
    { time: '10:30', pet: 'Luna', owner: 'Sara Chen', service: 'Skin Issue', status: 'waiting' },
    { time: '11:00', pet: 'Mochi', owner: 'Nami Tanaka', service: 'Vaccination', status: 'waiting' },
    { time: '14:00', pet: 'Rio', owner: 'Mark Johnson', service: 'Wing Exam', status: 'waiting' },
    { time: '14:30', pet: 'Bella', owner: 'Lisa Wong', service: 'Dental Consult', status: 'waiting' },
    { time: '15:00', pet: 'Charlie', owner: 'Tim Brown', service: 'Checkup', status: 'waiting' },
  ]

  const labResults = [
    { param: 'WBC', val: '8.2', ref: '6.0–17.0', unit: 'K/μL', ok: true },
    { param: 'RBC', val: '6.4', ref: '5.5–8.5', unit: 'M/μL', ok: true },
    { param: 'Hemoglobin', val: '14.2', ref: '12.0–18.0', unit: 'g/dL', ok: true },
    { param: 'Hematocrit', val: '42', ref: '37–55', unit: '%', ok: true },
    { param: 'Platelets', val: '285', ref: '200–500', unit: 'K/μL', ok: true },
    { param: 'Neutrophils', val: '74', ref: '60–77', unit: '%', ok: true },
    { param: 'Lymphocytes', val: '18', ref: '12–30', unit: '%', ok: true },
    { param: 'Eosinophils', val: '7', ref: '2–10', unit: '%', ok: true },
  ]

  return (
    <DashLayout title="Veterinarian Dashboard">
      <SectionHeader title="Dr. Somchai's Dashboard" subtitle="Thursday, 10 May 2026"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => setRecordOpen(true)}><Plus size={14} /> Add Record</button>} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📅" value="8" label="Today's Appointments" color="blue" delay={0} />
        <StatCard icon="✅" value="2" label="Completed" color="green" delay={0.1} />
        <StatCard icon="⏳" value="6" label="Remaining" color="amber" delay={0.2} />
        <StatCard icon="🐾" value="142" label="Total Patients" color="purple" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-white mb-4">Today's Schedule</h3>
          <div className="space-y-2">
            {schedule.map((a, i) => (
              <motion.div key={i}
                className={clsx('glass rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200', a.status === 'current' && 'border-green/30 bg-green/5')}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                whileHover={{ x: 3 }}>
                <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                  a.status === 'done' ? 'bg-white/10 text-white/30' : a.status === 'current' ? 'bg-green text-bg' : 'bg-white/5 text-white/30')}>
                  {a.status === 'done' ? '✓' : a.status === 'current' ? '▶' : ''}
                </div>
                <div className="text-xs text-white/30 w-12 flex-shrink-0">{a.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{a.pet} — {a.service}</div>
                  <div className="text-xs text-white/30">👤 {a.owner}</div>
                </div>
                <StatusBadge status={a.status === 'done' ? 'completed' : a.status === 'current' ? 'in-progress' : 'waiting'} />
                {a.status === 'current' && (
                  <button className="btn-primary text-xs py-1.5 px-3" onClick={() => setRecordOpen(true)}>Open →</button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Patient */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Current Patient</h3>
          <Card className="border-green/20 bg-green/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-green/10 border-2 border-green/20 flex items-center justify-center text-3xl">🐕</div>
              <div>
                <div className="font-bold text-white">Buddy</div>
                <div className="text-xs text-white/40">Golden Retriever · 3yr · 28kg</div>
                <span className="text-xs text-green">● In Room 3</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-white/40 mb-4">
              <div>👤 John Park · 081-234-5678</div>
              <div>🩺 General Checkup</div>
              <div>⚠️ No known allergies</div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button className="btn-ghost text-xs py-2 justify-center" onClick={() => setRecordOpen(true)}>📋 View History</button>
              <button className="btn-primary text-xs py-2 justify-center" onClick={() => setRecordOpen(true)}>+ Add Diagnosis</button>
              <button className="glass rounded-xl py-2 text-xs text-white/50 hover:text-white transition-all" onClick={() => setRxOpen(true)}>💊 Prescribe</button>
              <button className="glass rounded-xl py-2 text-xs text-white/50 hover:text-white transition-all" onClick={() => setLabOpen(true)}>🔬 Lab Results</button>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Medical Record Modal */}
      <Modal open={recordOpen} onClose={() => setRecordOpen(false)} title="📋 Add Medical Record" size="lg">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="text-xs text-white/40 mb-1.5 block">Patient Pet *</label>
            <select className="form-select">{DEMO_PETS.map(p => <option key={p.id}>{p.pet_name} ({p.owner_name})</option>)}</select>
          </div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Visit Date</label><input className="form-input" type="date" defaultValue="2026-05-10" /></div>
        </div>
        <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Chief Complaint *</label><textarea className="form-textarea" style={{ minHeight: 60 }} placeholder="e.g. 3-day history of vomiting, lethargy..." /></div>
        <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Diagnosis *</label><input className="form-input" placeholder="e.g. Acute Gastroenteritis" /></div>
        <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Treatment Plan</label><textarea className="form-textarea" style={{ minHeight: 60 }} placeholder="Describe treatment procedures..." /></div>
        <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Prescription</label><textarea className="form-textarea" style={{ minHeight: 70 }} placeholder={"Drug · Dose · Frequency · Duration\ne.g. Metronidazole 250mg · 1 tab · BID · 5 days"} /></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="text-xs text-white/40 mb-1.5 block">Follow-up Date</label><input className="form-input" type="date" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Visit Fee (฿)</label><input className="form-input" type="number" placeholder="850" /></div>
        </div>
        <div className="mb-2"><label className="text-xs text-white/40 mb-1.5 block">Vet Notes (Internal)</label><textarea className="form-textarea" style={{ minHeight: 60 }} placeholder="Private notes..." /></div>
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setRecordOpen(false)}>Cancel</button>
          <button className="glass rounded-xl px-5 py-2.5 text-sm text-white/60 hover:text-white" onClick={() => { toast('Saved as draft'); setRecordOpen(false) }}>Save Draft</button>
          <button className="btn-primary" onClick={() => { toast.success('Record saved!'); setRecordOpen(false) }}>Save Record ✅</button>
        </div>
      </Modal>

      {/* Prescription Modal */}
      <Modal open={rxOpen} onClose={() => setRxOpen(false)} title="💊 Prescription Pad" size="lg">
        <div className="glass rounded-xl p-4 mb-4 flex justify-between text-xs">
          <div><div className="font-bold text-white text-base font-display">🐾 PawCare Clinic</div><div className="text-white/30">Dr. Somchai Panya, DVM</div></div>
          <div className="text-right text-white/30"><div>Rx #: RX-2026-0442</div><div>10 May 2026</div></div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div><label className="text-xs text-white/40 mb-1.5 block">Patient</label><input className="form-input" defaultValue="Buddy · Golden Retriever · 28kg" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Owner</label><input className="form-input" defaultValue="John Park · 081-234-5678" /></div>
        </div>
        <div className="text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">Medications</div>
        <div className="space-y-2 mb-3">
          {rxLines.map((rx, i) => (
            <div key={i} className="grid gap-2 items-center" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr auto' }}>
              <input className="form-input text-xs py-2" placeholder="Drug name" value={rx.drug} onChange={e => { const n = [...rxLines]; n[i].drug = e.target.value; setRxLines(n) }} />
              <input className="form-input text-xs py-2" placeholder="Dose" value={rx.dose} onChange={e => { const n = [...rxLines]; n[i].dose = e.target.value; setRxLines(n) }} />
              <select className="form-select text-xs py-2" value={rx.freq} onChange={e => { const n = [...rxLines]; n[i].freq = e.target.value; setRxLines(n) }}>
                {['SID','BID','TID','QID','PRN'].map(f => <option key={f}>{f}</option>)}
              </select>
              <input className="form-input text-xs py-2" placeholder="Duration" value={rx.dur} onChange={e => { const n = [...rxLines]; n[i].dur = e.target.value; setRxLines(n) }} />
              <button onClick={() => rxLines.length > 1 && setRxLines(rxLines.filter((_, j) => j !== i))} className="w-7 h-7 bg-red/10 text-red rounded-lg flex items-center justify-center text-xs hover:bg-red hover:text-white transition-all">✕</button>
            </div>
          ))}
        </div>
        <button className="btn-ghost text-xs py-2 mb-4" onClick={() => setRxLines([...rxLines, { drug: '', dose: '', freq: 'BID', dur: '' }])}>+ Add Medication</button>
        <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Special Instructions</label><textarea className="form-textarea" style={{ minHeight: 60 }} placeholder="Give with food. Return if symptoms persist..." /></div>
        <div className="flex gap-3 justify-end mt-4">
          <button className="btn-ghost" onClick={() => setRxOpen(false)}>Cancel</button>
          <button className="glass rounded-xl px-5 py-2.5 text-sm text-white/50 hover:text-white" onClick={() => toast('Printing...')}><Printer size={14} className="inline mr-1" />Print</button>
          <button className="btn-primary" onClick={() => { toast.success('Prescription sent to owner!'); setRxOpen(false) }}>Save & Send ✅</button>
        </div>
      </Modal>

      {/* Lab Results Modal */}
      <Modal open={labOpen} onClose={() => setLabOpen(false)} title="🔬 Lab Results — CBC" size="lg">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div><label className="text-xs text-white/40 mb-1.5 block">Patient</label><select className="form-select">{DEMO_PETS.map(p => <option key={p.id}>{p.pet_name}</option>)}</select></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Test Type</label><select className="form-select"><option>CBC</option><option>Chemistry Panel</option><option>Urinalysis</option><option>X-Ray</option><option>Ultrasound</option></select></div>
        </div>
        <div className="glass rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-white/5 text-xs font-semibold text-white/40 uppercase tracking-wider">CBC Results — Buddy · 10 May 2026</div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-white/5"><th className="text-left px-4 py-2 text-white/20">Parameter</th><th className="text-right px-4 py-2 text-white/20">Result</th><th className="text-right px-4 py-2 text-white/20">Reference</th><th className="text-right px-4 py-2 text-white/20">Status</th></tr></thead>
            <tbody>
              {labResults.map(r => (
                <tr key={r.param} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-2.5 text-white">{r.param}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-white">{r.val}</td>
                  <td className="px-4 py-2.5 text-right text-white/30">{r.ref} {r.unit}</td>
                  <td className="px-4 py-2.5 text-right"><StatusBadge status={r.ok ? 'active' : 'overdue'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 bg-green/5 border-t border-green/10 text-xs text-green">✅ All CBC parameters within normal reference ranges.</div>
        </div>
        <div className="mb-2"><label className="text-xs text-white/40 mb-1.5 block">Interpretation & Notes</label><textarea className="form-textarea" defaultValue="CBC within normal limits. No evidence of anemia, infection, or thrombocytopenia. Supports overall good health status." /></div>
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setLabOpen(false)}>Close</button>
          <button className="glass rounded-xl px-5 py-2.5 text-sm text-white/50" onClick={() => toast('Downloading...')}><Download size={14} className="inline mr-1" />PDF</button>
          <button className="btn-primary" onClick={() => { toast.success('Results sent to owner!'); setLabOpen(false) }}>Send to Owner</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

export function VetSchedule() {
  return (
    <DashLayout title="My Schedule">
      <SectionHeader title="My Schedule" subtitle="Week of 10 May 2026" />
      <div className="grid grid-cols-5 gap-3 mb-6">
        {['Mon 6','Tue 7','Wed 8','Thu 9','Fri 10'].map((d, i) => (
          <div key={d} className={clsx('glass rounded-xl p-3 text-center', i === 4 && 'border-green/30 bg-green/5')}>
            <div className={clsx('text-xs font-semibold mb-1', i === 4 ? 'text-green' : 'text-white/40')}>{d}</div>
            <div className="text-[10px] text-white/25">{i === 4 ? '8 appts' : '5–6 appts'}</div>
          </div>
        ))}
      </div>
      <h3 className="font-semibold text-white mb-4">Thursday 10 May — Today</h3>
      <div className="space-y-2">
        {[
          { time: '09:00–09:30', pet: 'Max', svc: 'Vaccination', room: 'Room 2', status: 'done' },
          { time: '09:30–10:00', pet: 'Coco', svc: 'Checkup', room: 'Room 2', status: 'done' },
          { time: '10:00–10:45', pet: 'Buddy', svc: 'Checkup + Blood Test', room: 'Room 3', status: 'current' },
          { time: '10:30–11:00', pet: 'Luna', svc: 'Skin Consultation', room: 'Room 3', status: 'waiting' },
          { time: '11:00–11:30', pet: 'Mochi', svc: 'Vaccination', room: 'Room 2', status: 'waiting' },
          { time: '14:00–14:30', pet: 'Rio', svc: 'Wing Examination', room: 'Room 3', status: 'waiting' },
          { time: '14:30–15:00', pet: 'Bella', svc: 'Dental Consult', room: 'Room 3', status: 'waiting' },
          { time: '15:00–15:30', pet: 'Charlie', svc: 'General Checkup', room: 'Room 2', status: 'waiting' },
        ].map((a, i) => (
          <motion.div key={i} className={clsx('glass rounded-xl p-3.5 flex items-center gap-3', a.status === 'current' && 'border-green/30 bg-green/5')}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="text-xs text-white/25 w-28 flex-shrink-0">{a.time}</div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">{a.pet} — {a.svc}</div>
              <div className="text-xs text-white/30">{a.room}</div>
            </div>
            <StatusBadge status={a.status === 'done' ? 'completed' : a.status === 'current' ? 'in-progress' : 'waiting'} />
          </motion.div>
        ))}
      </div>
    </DashLayout>
  )
}

export function VetPatients() {
  return (
    <DashLayout title="Patients">
      <SectionHeader title="My Patients" subtitle="142 total patients" />
      <TableWrap>
        <thead><tr><th>Pet</th><th>Species</th><th>Owner</th><th>Last Visit</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {DEMO_PETS.map((p, i) => (
            <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <td><div className="flex items-center gap-2"><span className="text-xl">{p.emoji}</span><span className="text-white font-medium">{p.pet_name}</span></div></td>
              <td>{p.species}</td>
              <td>{p.owner_name}</td>
              <td className="text-white/30 text-xs">10 May 2026</td>
              <td><StatusBadge status={p.health > 85 ? 'active' : 'upcoming'} /></td>
              <td><button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast('Loading record...')}>View →</button></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
    </DashLayout>
  )
}

// ══════════════════════════════════════════════════════════════════
// RECEPTIONIST DASHBOARD
// ══════════════════════════════════════════════════════════════════
export function ReceptionDashboard() {
  const [walkinOpen, setWalkinOpen] = useState(false)
  const [invoiceOpen, setInvoiceOpen] = useState(false)

  return (
    <DashLayout title="Reception Dashboard">
      <SectionHeader title="Reception Dashboard" subtitle={`Thursday, 10 May 2026 · ${new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`}
        action={<button className="btn-primary text-sm py-2.5" onClick={() => setWalkinOpen(true)}><Plus size={14} /> Walk-in</button>} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🚦" value="5" label="In Queue" color="amber" delay={0} />
        <StatCard icon="📅" value="16" label="Today's Bookings" color="blue" delay={0.1} />
        <StatCard icon="✅" value="4" label="Checked In" color="green" delay={0.2} />
        <StatCard icon="🚶" value="3" label="Walk-ins Today" color="red" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Queue */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Live Queue</h3>
            <span className="text-xs text-white/30 animate-pulse">● Live</span>
          </div>
          <div className="space-y-2">
            {DEMO_QUEUE.map((q, i) => (
              <motion.div key={q.n} className={clsx('glass rounded-xl p-3.5 flex items-center gap-3', q.n === 1 && 'border-green/30 bg-green/5')}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <div className={clsx('w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                  q.priority === 'urgent' ? 'bg-red text-white' : q.n === 1 ? 'bg-green text-bg' : 'bg-white/5 text-white/30')}>
                  {q.n}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{q.pet}</div>
                  <div className="text-xs text-white/30">👤 {q.owner} · {q.vet}</div>
                </div>
                <div className="text-right">
                  <div className={clsx('text-xs font-medium', q.n === 1 ? 'text-green' : 'text-white/30')}>{q.status}</div>
                  <div className="text-[10px] text-white/20">Wait: {q.wait}</div>
                </div>
                {q.status === 'waiting' && (
                  <button className="btn-primary text-xs py-1.5 px-3" onClick={() => toast.success(`${q.pet} checked in!`)}>Check In</button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Today's appointments + Vet availability */}
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-white mb-3">Vet Availability</h3>
            <div className="space-y-2">
              {[
                { name: 'Dr. Somchai', status: 'In Room 3', next: '10:45', color: 'amber' },
                { name: 'Dr. Nattaya', status: 'In Surgery', next: '14:00', color: 'red' },
                { name: 'Dr. James', status: 'Available', next: 'Now', color: 'green' },
                { name: 'Dr. Priya', status: 'Available', next: 'Now', color: 'green' },
              ].map(v => (
                <div key={v.name} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${v.color} flex-shrink-0`} style={{ boxShadow: `0 0 8px var(--tw-shadow-color)` }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{v.name}</div>
                    <div className="text-xs text-white/30">{v.status}</div>
                  </div>
                  <div className={`text-xs font-medium text-${v.color}`}>Next free: {v.next}</div>
                  <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast.success('Patient assigned!')}>Assign</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Check-in</h3>
            <Card>
              <div className="mb-3"><label className="text-xs text-white/40 mb-1.5 block">Find Appointment</label><input className="form-input" placeholder="Pet name or owner phone..." /></div>
              <button className="btn-primary w-full justify-center py-3" onClick={() => toast.success('Patient checked in! Queue updated.')}>✅ Check In Patient</button>
            </Card>
          </div>
        </div>
      </div>

      {/* Walk-in Modal */}
      <Modal open={walkinOpen} onClose={() => setWalkinOpen(false)} title="🚶 Register Walk-in">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><label className="text-xs text-white/40 mb-1.5 block">Owner Name *</label><input className="form-input" placeholder="Full name" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Phone *</label><input className="form-input" placeholder="08X-XXX-XXXX" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Pet Name *</label><input className="form-input" placeholder="Pet's name" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Species</label>
            <select className="form-select"><option>Dog</option><option>Cat</option><option>Rabbit</option><option>Bird</option><option>Other</option></select>
          </div>
        </div>
        <div className="mb-3"><label className="text-xs text-white/40 mb-1.5 block">Reason for Visit *</label><textarea className="form-textarea" style={{ minHeight: 70 }} placeholder="Chief complaint..." /></div>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div><label className="text-xs text-white/40 mb-1.5 block">Assign Vet</label>
            <select className="form-select"><option>Dr. James (Available)</option><option>Dr. Priya (Available)</option><option>Dr. Somchai (Busy)</option></select>
          </div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Priority</label>
            <select className="form-select"><option>Normal</option><option>Urgent</option><option>Emergency</option></select>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setWalkinOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={() => { toast.success('Walk-in added to queue!'); setWalkinOpen(false) }}>Add to Queue →</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

export function ReceptionQueue() {
  return (
    <DashLayout title="Queue Management">
      <SectionHeader title="Live Queue" subtitle="Real-time patient queue management"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Open walk-in form...')}><Plus size={14} /> Add Patient</button>} />
      <div className="space-y-2">
        {DEMO_QUEUE.map((q, i) => (
          <motion.div key={q.n} className={clsx('glass rounded-xl p-4 flex items-center gap-4', q.n === 1 && 'border-green/30 bg-green/5')}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0',
              q.priority === 'urgent' ? 'bg-red text-white' : q.n === 1 ? 'bg-green text-bg' : 'bg-white/5 text-white/30')}>
              {q.n}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{q.pet}</div>
              <div className="text-xs text-white/30">👤 {q.owner} · {q.vet} {q.room !== '—' && `· ${q.room}`}</div>
            </div>
            {q.priority === 'urgent' && <span className="badge badge-red">Urgent</span>}
            <div className="text-xs text-white/30">Wait: {q.wait}</div>
            <StatusBadge status={q.status === 'in-room' ? 'in-progress' : 'waiting'} />
            <div className="flex gap-2">
              {q.status === 'waiting' && <button className="btn-primary text-xs py-1.5 px-3" onClick={() => toast.success(`${q.pet} checked in!`)}>Check In</button>}
              <button className="btn-danger text-xs py-1.5 px-3" onClick={() => toast('Removing from queue...')}>Remove</button>
            </div>
          </motion.div>
        ))}
      </div>
    </DashLayout>
  )
}

export function ReceptionInvoices() {
  return (
    <DashLayout title="Invoices">
      <SectionHeader title="Invoices" subtitle="Create and manage patient invoices"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Creating new invoice...')}><Plus size={14} /> New Invoice</button>} />
      {/* Sample invoice */}
      <div className="glass rounded-3xl overflow-hidden mb-6">
        <div className="bg-green p-6 flex justify-between items-start">
          <div><div className="font-display text-2xl text-bg">🐾 PawCare Clinic</div><div className="text-bg/60 text-sm mt-0.5">123 Sukhumvit Road, Bangkok</div></div>
          <div className="text-right text-bg/80"><div className="font-bold text-xl">INVOICE</div><div className="text-sm">#INV-2026-008</div><div className="text-sm">10 May 2026</div></div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div><div className="text-xs text-white/25 uppercase tracking-wider mb-1">Bill To</div><div className="font-semibold text-white">John Park</div><div className="text-white/40 text-sm">Buddy (Golden Retriever)<br />Tel: 081-234-5678</div></div>
            <div><div className="text-xs text-white/25 uppercase tracking-wider mb-1">Attending Vet</div><div className="font-semibold text-white">Dr. Somchai Panya</div><div className="text-white/40 text-sm">Internal Medicine · Room 3</div></div>
          </div>
          <table className="w-full text-sm mb-6">
            <thead><tr className="border-b border-white/5"><th className="text-left py-2 text-white/25 text-xs">Service</th><th className="text-right py-2 text-white/25 text-xs">Qty</th><th className="text-right py-2 text-white/25 text-xs">Price</th><th className="text-right py-2 text-white/25 text-xs">Total</th></tr></thead>
            <tbody>
              {[['General Physical Exam', 1, 500], ['CBC Blood Panel', 1, 800]].map(([s, q, p]) => (
                <tr key={s} className="border-b border-white/5"><td className="py-2.5 text-white">{s}</td><td className="py-2.5 text-right text-white/40">{q}</td><td className="py-2.5 text-right text-white/40">฿{p}</td><td className="py-2.5 text-right font-medium text-white">฿{p * q}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mb-6">
            <div className="glass rounded-xl p-4 min-w-[200px]">
              {[['Subtotal','฿1,300'],['VAT (7%)','฿91']].map(([k,v]) => <div key={k} className="flex justify-between text-sm mb-1.5"><span className="text-white/30">{k}</span><span className="text-white">{v}</span></div>)}
              <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold"><span className="text-white">Total</span><span className="text-green font-display text-lg">฿1,391</span></div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn-primary" onClick={() => toast.success('Payment recorded!')}>✅ Mark as Paid</button>
            <button className="btn-ghost" onClick={() => toast('Sending email...')}>📧 Send to Client</button>
            <button className="btn-ghost" onClick={() => toast('Generating PDF...')}><Download size={14} /> Download PDF</button>
          </div>
        </div>
      </div>
    </DashLayout>
  )
}

// ══════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — LUXURY PREMIUM REDESIGN
// ══════════════════════════════════════════════════════════════════
const revenueData = [
  { month: 'Nov', revenue: 185, appointments: 98 },
  { month: 'Dec', revenue: 210, appointments: 112 },
  { month: 'Jan', revenue: 198, appointments: 104 },
  { month: 'Feb', revenue: 234, appointments: 128 },
  { month: 'Mar', revenue: 248, appointments: 136 },
  { month: 'Apr', revenue: 262, appointments: 144 },
  { month: 'May', revenue: 284, appointments: 156 },
]
const serviceData = [
  { name: 'Checkup', value: 38, fill: '#00e5a0' },
  { name: 'Vaccination', value: 24, fill: '#4da6ff' },
  { name: 'Surgery', value: 15, fill: '#ff4d6d' },
  { name: 'Grooming', value: 13, fill: '#ffb84d' },
  { name: 'Dental', value: 10, fill: '#b48aff' },
]

function AdminLayout({ title, subtitle, children, action }) {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Premium topbar */}
        <header className="h-[64px] border-b border-white/[0.06] flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: 'rgba(10,13,20,0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <h1 className="text-white font-semibold text-sm leading-none">{title}</h1>
            {subtitle && <p className="text-white/25 text-xs mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/25 border border-white/[0.06] bg-white/[0.02]">
              <span>🔍</span>
              <input className="bg-transparent outline-none w-32 placeholder:text-white/15 text-white/70" placeholder="Search anything..." />
              <span className="text-white/10 text-[10px] border border-white/10 rounded px-1 py-0.5">⌘K</span>
            </div>
            <button className="w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-sm hover:border-white/10 hover:bg-white/5 transition-all relative"
              onClick={() => toast('3 new notifications')}>
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
            </button>
            <button className="w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-sm hover:border-white/10 transition-all">
              📤
            </button>
            {action && <div>{action}</div>}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto" style={{ background: 'radial-gradient(ellipse at top, rgba(0,229,160,0.02) 0%, transparent 50%), #080b12' }}>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

// Premium stat card with glow
function PremiumStat({ icon, value, label, change, changeUp, color, delay = 0, glow }) {
  const colors = {
    green:  { bg: 'rgba(0,229,160,0.08)',  border: 'rgba(0,229,160,0.15)',  text: '#00e5a0',  shadow: '0 0 30px rgba(0,229,160,0.08)' },
    amber:  { bg: 'rgba(255,184,77,0.08)', border: 'rgba(255,184,77,0.15)', text: '#ffb84d',  shadow: '0 0 30px rgba(255,184,77,0.08)' },
    blue:   { bg: 'rgba(77,166,255,0.08)', border: 'rgba(77,166,255,0.15)', text: '#4da6ff',  shadow: '0 0 30px rgba(77,166,255,0.08)' },
    red:    { bg: 'rgba(255,77,109,0.08)', border: 'rgba(255,77,109,0.15)', text: '#ff4d6d',  shadow: '0 0 30px rgba(255,77,109,0.08)' },
    purple: { bg: 'rgba(180,138,255,0.08)',border: 'rgba(180,138,255,0.15)',text: '#b48aff',  shadow: '0 0 30px rgba(180,138,255,0.08)' },
    teal:   { bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.15)', text: '#2dd4bf',  shadow: '0 0 30px rgba(45,212,191,0.08)' },
  }
  const c = colors[color] || colors.green
  return (
    <motion.div
      className="relative rounded-2xl p-5 overflow-hidden cursor-default group"
      style={{ background: 'rgba(15,18,28,0.8)', border: `1px solid ${c.border}`, boxShadow: glow ? c.shadow : 'none' }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -3, boxShadow: c.shadow.replace('0.08','0.18') }}>
      {/* Ambient glow bg */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.text}, transparent)`, filter: 'blur(20px)', transform: 'translate(30%,-30%)' }} />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          {icon}
        </div>
        <div className="font-display text-3xl text-white leading-none mb-1.5">{value}</div>
        <div className="text-white/35 text-xs font-medium mb-2">{label}</div>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${changeUp ? 'text-green' : 'text-red'}`}>
            <span>{changeUp ? '↑' : '↓'}</span>
            <span>{change}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function AdminDashboard() {
  const [period, setPeriod] = useState('month')

  return (
    <AdminLayout title="Analytics Dashboard" subtitle="May 2026 · Real-time overview">
      {/* Period selector */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl text-white">Good morning, Admin 👑</h2>
          <p className="text-white/30 text-sm mt-0.5">Here's what's happening at PawCare today.</p>
        </div>
        <div className="flex items-center gap-2">
          {['week','month','year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={clsx('px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 capitalize',
                period === p ? 'bg-green text-bg' : 'glass text-white/40 hover:text-white')}>
              {p}
            </button>
          ))}
          <button className="btn-primary text-xs py-2 px-4 ml-1" onClick={() => toast('Generating report...')}>
            📊 Export
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <PremiumStat icon="💰" value="฿284K" label="Revenue" color="green" change="12% vs last month" changeUp glow delay={0} />
        <PremiumStat icon="📅" value="312"   label="Appointments" color="blue"   change="8% growth" changeUp glow delay={0.05} />
        <PremiumStat icon="🐾" value="1,847" label="Pets Registered" color="purple" change="24 new" changeUp delay={0.1} />
        <PremiumStat icon="👥" value="1,203" label="Active Clients" color="amber"  change="16 new" changeUp delay={0.15} />
        <PremiumStat icon="💉" value="89"    label="Vaccines" color="teal"   change="3% vs last" changeUp={false} delay={0.2} />
        <PremiumStat icon="⭐" value="4.8"   label="Avg Rating" color="amber"  change="+0.1 pts" changeUp delay={0.25} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: 'rgba(15,18,28,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Revenue Overview</h3>
              <p className="text-white/25 text-xs mt-0.5">Monthly revenue in ฿ thousands</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-white/40"><span className="w-2.5 h-0.5 bg-green rounded-full inline-block"/>Revenue</span>
              <span className="flex items-center gap-1.5 text-white/40"><span className="w-2.5 h-0.5 bg-blue rounded-full inline-block"/>Appointments</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00e5a0" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00e5a0" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="apptG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4da6ff" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4da6ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill:'rgba(255,255,255,0.2)', fontSize:11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill:'rgba(255,255,255,0.2)', fontSize:11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background:'#0f121c', border:'1px solid rgba(255,255,255,0.08)', borderRadius:12, color:'#fff', fontSize:12 }}
                formatter={(v,n)=>[n==='revenue'?`฿${v}K`:v, n==='revenue'?'Revenue':'Appts']} />
              <Area type="monotone" dataKey="revenue"      stroke="#00e5a0" strokeWidth={2} fill="url(#revG)" dot={false} />
              <Area type="monotone" dataKey="appointments" stroke="#4da6ff" strokeWidth={2} fill="url(#apptG)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Mix Donut */}
        <div className="rounded-2xl p-5"
          style={{ background: 'rgba(15,18,28,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 className="font-semibold text-white mb-1">Service Mix</h3>
          <p className="text-white/25 text-xs mb-4">By appointment type</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={serviceData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={4} dataKey="value" strokeWidth={0}>
                {serviceData.map((e, i) => <Cell key={i} fill={e.fill} opacity={0.9} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#0f121c', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'#fff', fontSize:11 }} formatter={v=>[`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {serviceData.map(s => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.fill }} />
                <span className="text-white/40 text-xs flex-1">{s.name}</span>
                <span className="text-xs font-semibold" style={{ color: s.fill }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent activity */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Appointments</h3>
            <Link to="/dashboard/admin/appointments" className="text-green text-xs hover:underline">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['Time','Pet','Service','Vet','Status','Fee'].map(h => (
                    <th key={h} className="text-left py-2.5 px-2 text-white/20 font-semibold uppercase tracking-wider text-[10px] first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_APPOINTMENTS.slice(0,5).map((a,i) => (
                  <motion.tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: i*0.05 }}>
                    <td className="py-3 pl-0 pr-2 text-white/30">{a.time}</td>
                    <td className="py-3 px-2 text-white font-medium">{a.pet_name}</td>
                    <td className="py-3 px-2 text-white/50">{a.service}</td>
                    <td className="py-3 px-2 text-white/30">{a.vet.replace('Dr. ','')}</td>
                    <td className="py-3 px-2"><StatusBadge status={a.status} /></td>
                    <td className="py-3 px-2 text-green font-display text-sm">฿{a.fee}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top vets leaderboard */}
        <div className="rounded-2xl p-5"
          style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}>
          <h3 className="font-semibold text-white mb-4">Top Vets — May</h3>
          <div className="space-y-3">
            {[
              { name:'Dr. Somchai',  spec:'Internal Med', appts:142, rev:'฿89K', r:'4.9', emoji:'👨‍⚕️', c:'#00e5a0', rank:1 },
              { name:'Dr. Nattaya',  spec:'Surgery',       appts:98,  rev:'฿124K',r:'4.8', emoji:'👩‍⚕️', c:'#4da6ff', rank:2 },
              { name:'Dr. James',    spec:'Exotic',        appts:76,  rev:'฿45K', r:'4.9', emoji:'👨‍⚕️', c:'#b48aff', rank:3 },
              { name:'Dr. Priya',    spec:'Dermatology',   appts:63,  rev:'฿38K', r:'4.7', emoji:'👩‍⚕️', c:'#ffb84d', rank:4 },
            ].map((v,i) => (
              <motion.div key={v.name} className="flex items-center gap-3 group"
                initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}>
                <div className="w-5 text-center text-xs font-bold"
                  style={{ color: v.rank<=3 ? ['#ffd700','#c0c0c0','#cd7f32'][v.rank-1] : 'rgba(255,255,255,0.2)' }}>
                  {v.rank <= 3 ? ['🥇','🥈','🥉'][v.rank-1] : v.rank}
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${v.c}15`, border: `1px solid ${v.c}30` }}>
                  {v.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-semibold truncate">{v.name}</div>
                  <div className="text-white/25 text-[10px]">{v.appts} appts · {v.rev}</div>
                </div>
                <div className="text-amber text-xs font-semibold">★{v.r}</div>
              </motion.div>
            ))}
          </div>

          {/* Mini bar chart */}
          <div className="mt-5 pt-4 border-t border-white/[0.04]">
            <div className="text-white/20 text-[10px] uppercase tracking-wider mb-3">Appointment Volume</div>
            <div className="space-y-2">
              {[{ name:'Dr. Somchai',v:142,c:'#00e5a0'},{name:'Dr. Nattaya',v:98,c:'#4da6ff'},{name:'Dr. James',v:76,c:'#b48aff'},{name:'Dr. Priya',v:63,c:'#ffb84d'}].map(b => (
                <div key={b.name} className="flex items-center gap-2">
                  <div className="text-white/25 text-[10px] w-20 truncate">{b.name.replace('Dr. ','')}</div>
                  <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{ background: b.c }}
                      initial={{ width:0 }} animate={{ width:`${(b.v/142)*100}%` }}
                      transition={{ delay: 0.5, duration:1, ease:'easeOut' }} />
                  </div>
                  <div className="text-white/30 text-[10px] w-6 text-right">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export function AdminUsers() {
  const [addOpen, setAddOpen] = useState(false)
  const users = [
    { name: 'John Park', email: 'john@email.com', role: 'owner', phone: '081-xxx', joined: 'Jan 2025', color: 'blue' },
    { name: 'Sara Chen', email: 'sara@email.com', role: 'owner', phone: '082-xxx', joined: 'Mar 2025', color: 'blue' },
    { name: 'Dr. Somchai Panya', email: 'somchai@pawcare.co.th', role: 'vet', phone: '02-xxx', joined: '2010', color: 'green' },
    { name: 'Dr. Nattaya Siri', email: 'nattaya@pawcare.co.th', role: 'vet', phone: '02-xxx', joined: '2012', color: 'green' },
    { name: 'Nipa Ruang', email: 'nipa@pawcare.co.th', role: 'receptionist', phone: '02-xxx', joined: '2020', color: 'amber' },
    { name: 'Admin User', email: 'admin@pawcare.co.th', role: 'admin', phone: '02-xxx', joined: '2010', color: 'red' },
  ]
  return (
    <DashLayout title="User Management">
      <SectionHeader title="User Management" subtitle={`${users.length} total users`}
        action={<button className="btn-primary text-sm py-2.5" onClick={() => setAddOpen(true)}><Plus size={14} /> Add User</button>} />
      <TableWrap>
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Phone</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {users.map((u, i) => (
            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <td><div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-${u.color}/10 text-${u.color} flex items-center justify-center text-xs font-bold`}>{u.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                <span className="text-white font-medium">{u.name}</span>
              </div></td>
              <td className="text-xs">{u.email}</td>
              <td><span className={`badge badge-${u.role === 'admin' ? 'red' : u.role === 'vet' ? 'green' : u.role === 'receptionist' ? 'amber' : 'blue'} capitalize`}>{u.role}</span></td>
              <td className="text-xs">{u.phone}</td>
              <td className="text-xs text-white/30">{u.joined}</td>
              <td><StatusBadge status="active" /></td>
              <td><div className="flex gap-2">
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast('Edit user...')}>Edit</button>
                <button className="btn-danger text-xs py-1.5" onClick={() => toast.error('User disabled')}>Disable</button>
              </div></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="➕ Add New User">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><label className="text-xs text-white/40 mb-1.5 block">Full Name *</label><input className="form-input" placeholder="Full name" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Email *</label><input className="form-input" type="email" placeholder="email@example.com" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Phone</label><input className="form-input" placeholder="08X-XXX-XXXX" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Role *</label>
            <select className="form-select"><option value="owner">Pet Owner</option><option value="vet">Veterinarian</option><option value="receptionist">Receptionist</option><option value="admin">Admin</option></select>
          </div>
        </div>
        <div className="mb-2"><label className="text-xs text-white/40 mb-1.5 block">Temporary Password *</label><input className="form-input" type="password" placeholder="Min 8 characters" /></div>
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setAddOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={() => { toast.success('User created & invite sent!'); setAddOpen(false) }}>Create User</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

export function AdminPets() {
  const [addOpen, setAddOpen] = useState(false)
  return (
    <DashLayout title="All Pets">
      <SectionHeader title="All Pets" subtitle={`${DEMO_PETS.length} registered pets`}
        action={<button className="btn-primary text-sm py-2.5" onClick={() => setAddOpen(true)}><Plus size={14} /> Add Pet</button>} />
      <TableWrap>
        <thead><tr><th>Pet</th><th>Species</th><th>Breed</th><th>Owner</th><th>Weight</th><th>Health</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {DEMO_PETS.map((p, i) => (
            <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <td><div className="flex items-center gap-2"><span className="text-xl">{p.emoji}</span><span className="text-white font-medium">{p.pet_name}</span></div></td>
              <td>{p.species}</td>
              <td className="text-xs text-white/40">{p.breed}</td>
              <td className="text-xs">{p.owner_name}</td>
              <td className="text-xs">{p.weight} kg</td>
              <td><div className="flex items-center gap-2"><ProgressBar value={p.health} color={p.health > 85 ? 'bg-green' : 'bg-amber'} /><span className="text-xs text-white/40 w-8">{p.health}%</span></div></td>
              <td><StatusBadge status={p.health > 85 ? 'active' : 'upcoming'} /></td>
              <td><div className="flex gap-2">
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => setAddOpen(true)}>Edit</button>
                <button className="btn-danger text-xs py-1.5" onClick={() => toast.error('Pet removed')}>✕</button>
              </div></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="🐾 Edit Pet" size="lg">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[['Pet Name *','text','Buddy'],['Species *','text','Dog'],['Breed','text','Golden Retriever'],['Gender','text','Male'],['Date of Birth','date',''],['Weight (kg)','number','28']].map(([l,t,p]) => (
            <div key={l}><label className="text-xs text-white/40 mb-1.5 block">{l}</label><input className="form-input" type={t} placeholder={p} /></div>
          ))}
        </div>
        <div className="mb-3"><label className="text-xs text-white/40 mb-1.5 block">Allergies</label><input className="form-input" placeholder="None known" /></div>
        <div className="mb-2"><label className="text-xs text-white/40 mb-1.5 block">Notes</label><textarea className="form-textarea" /></div>
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setAddOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={() => { toast.success('Pet saved!'); setAddOpen(false) }}>Save Changes</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

export function AdminServices() {
  return (
    <DashLayout title="Services Management">
      <SectionHeader title="Services" subtitle="Manage clinic service offerings and pricing"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Add service form...')}><Plus size={14} /> Add Service</button>} />
      <TableWrap>
        <thead><tr><th>Service</th><th>Category</th><th>Price (฿)</th><th>Duration</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {DEMO_SERVICES.map((s, i) => (
            <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
              <td><div className="flex items-center gap-2"><span>{s.icon}</span><span className="text-white font-medium">{s.name}</span></div></td>
              <td><span className="capitalize text-xs text-white/40">{s.category}</span></td>
              <td><span className="text-green font-display text-sm">฿{s.price.toLocaleString()}</span></td>
              <td className="text-xs text-white/40">{s.duration}</td>
              <td><StatusBadge status="active" /></td>
              <td><button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast('Editing service...')}>Edit</button></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
    </DashLayout>
  )
}

export function AdminSettings() {
  return (
    <DashLayout title="System Settings">
      <SectionHeader title="System Settings" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-white mb-5">Clinic Information</h3>
          <div className="space-y-4">
            {[['Clinic Name','PawCare Clinic'],['Address','123 Sukhumvit Road, Bangkok'],['Phone','02-xxx-xxxx'],['Emergency Line','02-xxx-9999'],['Email','info@pawcare.co.th']].map(([l,v]) => (
              <div key={l}><label className="text-xs text-white/40 mb-1.5 block">{l}</label><input className="form-input" defaultValue={v} /></div>
            ))}
            <button className="btn-primary" onClick={() => toast.success('Settings saved!')}>Save Changes</button>
          </div>
        </Card>
        <div className="space-y-5">
          <Card>
            <h3 className="font-semibold text-white mb-4">Supabase Database</h3>
            <div className="space-y-3 mb-4">
              <div><label className="text-xs text-white/40 mb-1.5 block">Project URL</label><input className="form-input" placeholder="https://xxxx.supabase.co" /></div>
              <div><label className="text-xs text-white/40 mb-1.5 block">Anon Public Key</label><input className="form-input" placeholder="eyJ..." /></div>
            </div>
            <button className="btn-primary" onClick={() => toast.success('Connected to Supabase!')}>⚡ Connect Database</button>
          </Card>
          <Card>
            <h3 className="font-semibold text-white mb-4">Notification Settings</h3>
            <div className="space-y-3">
              {['Email reminders for vaccinations','SMS appointment confirmations','Admin alerts for new bookings','Daily revenue reports','Weekly analytics digest'].map(s => (
                <label key={s} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-9 h-5 bg-green/30 rounded-full relative">
                    <div className="w-3.5 h-3.5 bg-green rounded-full absolute top-0.5 right-0.5" />
                  </div>
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{s}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashLayout>
  )
}

export function AdminBlog() {
  return (
    <DashLayout title="Blog Management">
      <SectionHeader title="Blog Posts" subtitle="Manage pet care articles and SEO content"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Opening editor...')}><Plus size={14} /> New Post</button>} />
      <TableWrap>
        <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Published</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {DEMO_BLOG.map((b, i) => (
            <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}>
              <td><div className="flex items-center gap-2"><span>{b.emoji}</span><span className="text-white font-medium text-sm">{b.title}</span></div></td>
              <td><span className="badge badge-green text-xs">{b.category}</span></td>
              <td className="text-xs text-white/40">{b.author}</td>
              <td className="text-xs text-white/30">{b.date}</td>
              <td><StatusBadge status={b.published ? 'active' : 'pending'} /></td>
              <td><div className="flex gap-2">
                <button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast('Edit post...')}>Edit</button>
                <button className={clsx('text-xs py-1.5 px-3 rounded-full border transition-all', b.published ? 'glass text-white/40 hover:text-white hover:border-white/15' : 'btn-primary')} onClick={() => toast.success(b.published ? 'Post unpublished' : 'Post published!')}>{b.published ? 'Unpublish' : 'Publish'}</button>
              </div></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
    </DashLayout>
  )
}

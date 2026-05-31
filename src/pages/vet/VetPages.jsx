import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download, Printer } from 'lucide-react'
import { DashLayout } from '../_shared/DashLayout'
import { StatCard, Modal, StatusBadge, TableWrap, SectionHeader, Card } from '../../components/shared/UI'
import { DEMO_PETS, DEMO_APPOINTMENTS } from '../../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

// ── VET DASHBOARD ─────────────────────────────────────────────────
export function VetDashboard() {
  const [recordOpen, setRecordOpen] = useState(false)
  const [rxOpen, setRxOpen] = useState(false)
  const [labOpen, setLabOpen] = useState(false)
  const [rxLines, setRxLines] = useState([{ drug: 'Cerenia (Maropitant) 24mg', dose: '1 tab', freq: 'SID', dur: '3 days' }])

  const schedule = [
    { time: '09:00', pet: 'Max', owner: 'Aung Myat', service: 'Vaccination', status: 'done' },
    { time: '09:30', pet: 'Coco', owner: 'Su Su', service: 'Checkup', status: 'done' },
    { time: '10:00', pet: 'Buddy', owner: 'Kyaw Zin', service: 'General Checkup', status: 'current' },
    { time: '10:30', pet: 'Luna', owner: 'Nwe Ni', service: 'Skin Issue', status: 'waiting' },
    { time: '11:00', pet: 'Mochi', owner: 'Thin Zar', service: 'Vaccination', status: 'waiting' },
    { time: '14:00', pet: 'Rio', owner: 'Zaw Lin', service: 'Wing Exam', status: 'waiting' },
    { time: '14:30', pet: 'Bella', owner: 'Phyu Phyu', service: 'Dental Consult', status: 'waiting' },
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
      <SectionHeader title="Dr. Htet Aung's Dashboard" subtitle="Thursday, 10 May 2026"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => setRecordOpen(true)}><Plus size={14} /> Add Record</button>} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📅" value="8" label="Today's Appointments" color="blue" delay={0} />
        <StatCard icon="✅" value="2" label="Completed" color="green" delay={0.1} />
        <StatCard icon="⏳" value="6" label="Remaining" color="amber" delay={0.2} />
        <StatCard icon="🐾" value="142" label="Total Patients" color="purple" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-white mb-4">Today's Schedule</h3>
          <div className="space-y-2">
            {schedule.map((a, i) => (
              <motion.div key={i}
                className={clsx('glass rounded-xl p-3.5 flex items-center gap-3 transition-all duration-200', a.status === 'current' && 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]')}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                whileHover={{ x: 3 }}>
                <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0',
                  a.status === 'done' ? 'bg-white/10 text-white/30' : a.status === 'current' ? 'bg-[#C9A84C] text-[#0B1628]' : 'bg-white/5 text-white/30')}>
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

        <div className="space-y-4">
          <h3 className="font-semibold text-white">Current Patient</h3>
          <Card className="border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.06)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-[rgba(201,168,76,0.1)] border-2 border-[rgba(201,168,76,0.2)] flex items-center justify-center text-3xl">🐕</div>
              <div>
                <div className="font-bold text-white">Buddy</div>
                <div className="text-xs text-white/40">Golden Retriever · 3yr · 28kg</div>
                <span className="text-xs text-[#C9A84C]">● In Room 3</span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-white/40 mb-4">
              <div>👤 Kyaw Zin · 081-234-5678</div>
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
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setRecordOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={() => { toast.success('Record saved!'); setRecordOpen(false) }}>Save Record ✅</button>
        </div>
      </Modal>

      {/* Prescription Modal */}
      <Modal open={rxOpen} onClose={() => setRxOpen(false)} title="💊 Prescription Pad" size="lg">
        <div className="glass rounded-xl p-4 mb-4 flex justify-between text-xs">
          <div><div className="font-bold text-white text-base font-display">🐾 Mingalar Pet Clinic</div><div className="text-white/30">Dr. Htet Aung Kyaw, DVM</div></div>
          <div className="text-right text-white/30"><div>Rx #: RX-2026-0442</div><div>10 May 2026</div></div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div><label className="text-xs text-white/40 mb-1.5 block">Patient</label><input className="form-input" defaultValue="Buddy · Golden Retriever · 28kg" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Owner</label><input className="form-input" defaultValue="Kyaw Zin · 081-234-5678" /></div>
        </div>
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
        <div className="flex gap-3 justify-end mt-4">
          <button className="btn-ghost" onClick={() => setRxOpen(false)}>Cancel</button>
          <button className="glass rounded-xl px-5 py-2.5 text-sm text-white/50 hover:text-white" onClick={() => toast('Printing...')}><Printer size={14} className="inline mr-1" />Print</button>
          <button className="btn-primary" onClick={() => { toast.success('Prescription sent to owner!'); setRxOpen(false) }}>Save & Send ✅</button>
        </div>
      </Modal>

      {/* Lab Results Modal */}
      <Modal open={labOpen} onClose={() => setLabOpen(false)} title="🔬 Lab Results — CBC" size="lg">
        <div className="glass rounded-xl overflow-hidden mb-4">
          <div className="px-4 py-2.5 border-b border-white/5 text-xs font-semibold text-white/40 uppercase tracking-wider">CBC Results — Buddy · 10 May 2026</div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-white/5"><th className="text-left px-4 py-2 text-white/20">Parameter</th><th className="text-right px-4 py-2 text-white/20">Result</th><th className="text-right px-4 py-2 text-white/20">Reference</th><th className="text-right px-4 py-2 text-white/20">Status</th></tr></thead>
            <tbody>
              {labResults.map(r => (
                <tr key={r.param} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2.5 text-white">{r.param}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-white">{r.val}</td>
                  <td className="px-4 py-2.5 text-right text-white/30">{r.ref} {r.unit}</td>
                  <td className="px-4 py-2.5 text-right"><StatusBadge status={r.ok ? 'active' : 'overdue'} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 bg-[rgba(201,168,76,0.06)] border-t border-[#C9A84C]/10 text-xs text-[#C9A84C]">✅ All CBC parameters within normal reference ranges.</div>
        </div>
        <div className="flex gap-3 justify-end mt-5">
          <button className="btn-ghost" onClick={() => setLabOpen(false)}>Close</button>
          <button className="glass rounded-xl px-5 py-2.5 text-sm text-white/50" onClick={() => toast('Downloading...')}><Download size={14} className="inline mr-1" />PDF</button>
          <button className="btn-primary" onClick={() => { toast.success('Results sent to owner!'); setLabOpen(false) }}>Send to Owner</button>
        </div>
      </Modal>
    </DashLayout>
  )
}

// ── VET SCHEDULE ──────────────────────────────────────────────────
export function VetSchedule() {
  return (
    <DashLayout title="My Schedule">
      <SectionHeader title="My Schedule" subtitle="Week of 10 May 2026" />
      <div className="grid grid-cols-5 gap-3 mb-6">
        {['Mon 6','Tue 7','Wed 8','Thu 9','Fri 10'].map((d, i) => (
          <div key={d} className={clsx('glass rounded-xl p-3 text-center', i === 4 && 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]')}>
            <div className={clsx('text-xs font-semibold mb-1', i === 4 ? 'text-[#C9A84C]' : 'text-white/40')}>{d}</div>
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
          <motion.div key={i} className={clsx('glass rounded-xl p-3.5 flex items-center gap-3', a.status === 'current' && 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]')}
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

// ── VET PATIENTS ──────────────────────────────────────────────────
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

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Download } from 'lucide-react'
import { DashLayout } from '../_shared/DashLayout'
import { StatCard, Modal, StatusBadge, SectionHeader, Card } from '../../components/shared/UI'
import { DEMO_QUEUE } from '../../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

// ── RECEPTION DASHBOARD ───────────────────────────────────────────
export function ReceptionDashboard() {
  const [walkinOpen, setWalkinOpen] = useState(false)

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
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Live Queue</h3>
            <span className="text-xs text-white/30 animate-pulse">● Live</span>
          </div>
          <div className="space-y-2">
            {DEMO_QUEUE.map((q, i) => (
              <motion.div key={q.n} className={clsx('glass rounded-xl p-3.5 flex items-center gap-3', q.n === 1 && 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]')}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <div className={clsx('w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                  q.priority === 'urgent' ? 'bg-red text-white' : q.n === 1 ? 'bg-[#C9A84C] text-[#0B1628]' : 'bg-white/5 text-white/30')}>
                  {q.n}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{q.pet}</div>
                  <div className="text-xs text-white/30">👤 {q.owner} · {q.vet}</div>
                </div>
                <div className="text-right">
                  <div className={clsx('text-xs font-medium', q.n === 1 ? 'text-[#C9A84C]' : 'text-white/30')}>{q.status}</div>
                  <div className="text-[10px] text-white/20">Wait: {q.wait}</div>
                </div>
                {q.status === 'waiting' && (
                  <button className="btn-primary text-xs py-1.5 px-3" onClick={() => toast.success(`${q.pet} checked in!`)}>Check In</button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-white mb-3">Vet Availability</h3>
            <div className="space-y-2">
              {[
                { name: 'Dr. Htet Aung', status: 'In Room 3', next: '10:45', color: 'amber' },
                { name: 'Dr. Khin May', status: 'In Surgery', next: '14:00', color: 'red' },
                { name: 'Dr. Kyaw Thu', status: 'Available', next: 'Now', color: 'green' },
                { name: 'Dr. Aye Myat', status: 'Available', next: 'Now', color: 'green' },
              ].map(v => (
                <div key={v.name} className="glass rounded-xl p-3 flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${v.color} flex-shrink-0`} />
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
            <select className="form-select"><option>Dr. Kyaw Thu (Available)</option><option>Dr. Aye Myat (Available)</option><option>Dr. Htet Aung (Busy)</option></select>
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

// ── RECEPTION QUEUE ───────────────────────────────────────────────
export function ReceptionQueue() {
  return (
    <DashLayout title="Queue Management">
      <SectionHeader title="Live Queue" subtitle="Real-time patient queue management"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Open walk-in form...')}><Plus size={14} /> Add Patient</button>} />
      <div className="space-y-2">
        {DEMO_QUEUE.map((q, i) => (
          <motion.div key={q.n} className={clsx('glass rounded-xl p-4 flex items-center gap-4', q.n === 1 && 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.06)]')}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0',
              q.priority === 'urgent' ? 'bg-red text-white' : q.n === 1 ? 'bg-[#C9A84C] text-[#0B1628]' : 'bg-white/5 text-white/30')}>
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

// ── RECEPTION INVOICES ────────────────────────────────────────────
export function ReceptionInvoices() {
  return (
    <DashLayout title="Invoices">
      <SectionHeader title="Invoices" subtitle="Create and manage patient invoices"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Creating new invoice...')}><Plus size={14} /> New Invoice</button>} />
      <div className="glass rounded-3xl overflow-hidden mb-6">
        <div className="p-6 flex justify-between items-start" style={{background:'linear-gradient(135deg,#0d1a2e,#0a1628)',borderBottom:'1px solid rgba(201,168,76,0.15)'}}>
          <div><div className="font-display text-2xl text-[#0B1628]">🐾 Mingalar Pet Clinic</div><div className="text-[#0B1628]/60 text-sm mt-0.5">123 Pyay Road Road, Yangon</div></div>
          <div className="text-right text-[#0B1628]/80"><div className="font-bold text-xl">INVOICE</div><div className="text-sm">#INV-2026-008</div><div className="text-sm">10 May 2026</div></div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div><div className="text-xs text-white/25 uppercase tracking-wider mb-1">Bill To</div><div className="font-semibold text-white">Kyaw Zin</div><div className="text-white/40 text-sm">Buddy (Golden Retriever)<br />Tel: 081-234-5678</div></div>
            <div><div className="text-xs text-white/25 uppercase tracking-wider mb-1">Attending Vet</div><div className="font-semibold text-white">Dr. Htet Aung Kyaw</div><div className="text-white/40 text-sm">Internal Medicine · Room 3</div></div>
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
              <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold"><span className="text-white">Total</span><span className="text-[#C9A84C] font-display text-lg">฿1,391</span></div>
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

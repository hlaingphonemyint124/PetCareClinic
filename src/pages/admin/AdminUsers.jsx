import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { AdminLayout } from './AdminLayout'
import { Modal, StatusBadge, TableWrap, ProgressBar, SectionHeader } from '../../components/shared/UI'
import { DEMO_PETS } from '../../lib/demoData'
import toast from 'react-hot-toast'

// ── ADMIN USERS ───────────────────────────────────────────────────
export function AdminUsers() {
  const [addOpen, setAddOpen] = useState(false)
  const users = [
    { name: 'Kyaw Zin',          email: 'john@email.com',           role: 'owner',        phone: '081-xxx', joined: 'Jan 2025', color: 'blue' },
    { name: 'Nwe Ni',          email: 'sara@email.com',           role: 'owner',        phone: '082-xxx', joined: 'Mar 2025', color: 'blue' },
    { name: 'Dr. Htet Aung Kyaw',  email: 'somchai@mingalarpetclinic.com',    role: 'vet',          phone: '02-xxx',  joined: '2010',     color: 'green' },
    { name: 'Dr. Khin May Soe',   email: 'nattaya@mingalarpetclinic.com',    role: 'vet',          phone: '02-xxx',  joined: '2012',     color: 'green' },
    { name: 'Ma Ei Phyu',         email: 'nipa@mingalarpetclinic.com',       role: 'receptionist', phone: '02-xxx',  joined: '2020',     color: 'amber' },
    { name: 'Admin User',         email: 'admin@mingalarpetclinic.com',      role: 'admin',        phone: '02-xxx',  joined: '2010',     color: 'red' },
  ]

  return (
    <AdminLayout title="User Management" subtitle={`${users.length} total users`}>
      <SectionHeader title="User Management" subtitle={`${users.length} total users`}
        action={<button className="btn-primary text-sm py-2.5" onClick={() => setAddOpen(true)}><Plus size={14} /> Add User</button>} />
      <TableWrap>
        <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Phone</th><th>Joined</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {users.map((u, i) => (
            <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <td><div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-${u.color}/10 text-${u.color} flex items-center justify-center text-xs font-bold`}>
                  {u.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
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
    </AdminLayout>
  )
}

// ── ADMIN PETS ────────────────────────────────────────────────────
export function AdminPets() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <AdminLayout title="All Pets" subtitle={`${DEMO_PETS.length} registered pets`}>
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
              <td><div className="flex items-center gap-2"><ProgressBar value={p.health} color={p.health > 85 ? 'gold' : 'amber'} /><span className="text-xs text-white/40 w-8">{p.health}%</span></div></td>
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
    </AdminLayout>
  )
}

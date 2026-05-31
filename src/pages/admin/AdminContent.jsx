import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { AdminLayout } from './AdminLayout'
import { StatusBadge, TableWrap, SectionHeader, Card } from '../../components/shared/UI'
import { DEMO_SERVICES, DEMO_BLOG } from '../../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

// ── ADMIN SERVICES ────────────────────────────────────────────────
export function AdminServices() {
  return (
    <AdminLayout title="Services Management" subtitle="Manage clinic service offerings and pricing">
      <SectionHeader title="Services" subtitle="Manage clinic service offerings and pricing"
        action={<button className="btn-primary text-sm py-2.5" onClick={() => toast('Add service form...')}><Plus size={14} /> Add Service</button>} />
      <TableWrap>
        <thead><tr><th>Service</th><th>Category</th><th>Price (฿)</th><th>Duration</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {DEMO_SERVICES.map((s, i) => (
            <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
              <td><div className="flex items-center gap-2"><span>{s.icon}</span><span className="text-white font-medium">{s.name}</span></div></td>
              <td><span className="capitalize text-xs text-white/40">{s.category}</span></td>
              <td><span className="text-[#C9A84C] font-display text-sm">฿{s.price.toLocaleString()}</span></td>
              <td className="text-xs text-white/40">{s.duration}</td>
              <td><StatusBadge status="active" /></td>
              <td><button className="btn-ghost text-xs py-1.5 px-3" onClick={() => toast('Editing service...')}>Edit</button></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
    </AdminLayout>
  )
}

// ── ADMIN SETTINGS ────────────────────────────────────────────────
export function AdminSettings() {
  return (
    <AdminLayout title="System Settings">
      <SectionHeader title="System Settings" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-white mb-5">Clinic Information</h3>
          <div className="space-y-4">
            {[['Clinic Name','Mingalar Pet Clinic'],['Address','No. 45, Pyay Road, Kamayut Township, Yangon'],['Phone','09-111-22222'],['Emergency Line','09-111-99999'],['Email','info@mingalarpetclinic.com']].map(([l,v]) => (
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
                  <div className="w-9 h-5 bg-[rgba(201,168,76,0.3)] rounded-full relative">
                    <div className="w-3.5 h-3.5 rounded-full absolute top-0.5 right-0.5" style={{background:'#C9A84C'}} />
                  </div>
                  <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{s}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

// ── ADMIN BLOG ────────────────────────────────────────────────────
export function AdminBlog() {
  return (
    <AdminLayout title="Blog Management" subtitle="Manage pet care articles and SEO content">
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
                <button className={clsx('text-xs py-1.5 px-3 rounded-full border transition-all', b.published ? 'glass text-white/40 hover:text-white hover:border-white/15' : 'btn-primary')}
                  onClick={() => toast.success(b.published ? 'Post unpublished' : 'Post published!')}>
                  {b.published ? 'Unpublish' : 'Publish'}
                </button>
              </div></td>
            </motion.tr>
          ))}
        </tbody>
      </TableWrap>
    </AdminLayout>
  )
}

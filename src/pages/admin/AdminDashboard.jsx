import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AdminLayout, PremiumStat } from './AdminLayout'
import { StatusBadge } from '../../components/shared/UI'
import { DEMO_APPOINTMENTS } from '../../lib/demoData'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import toast from 'react-hot-toast'
import clsx from 'clsx'

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
  { name: 'Checkup', value: 38, fill: '#C9A84C' },
  { name: 'Vaccination', value: 24, fill: '#7eb5ff' },
  { name: 'Surgery', value: 15, fill: '#ff4d6d' },
  { name: 'Grooming', value: 13, fill: '#e8c870' },
  { name: 'Dental', value: 10, fill: '#b48aff' },
]

export function AdminDashboard() {
  const [period, setPeriod] = useState('month')

  return (
    <AdminLayout title="Analytics Dashboard" subtitle="May 2026 · Real-time overview">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl text-white">Good morning, Admin 👑</h2>
          <p className="text-white/30 text-sm mt-0.5">Here's what's happening at Mingalar today.</p>
        </div>
        <div className="flex items-center gap-2">
          {['week','month','year'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={clsx('px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 capitalize',
                period === p ? 'bg-[#C9A84C] text-[#0B1628]' : 'glass text-white/40 hover:text-white')}>
              {p}
            </button>
          ))}
          <button className="btn-primary text-xs py-2 px-4 ml-1" onClick={() => toast('Generating report...')}>📊 Export</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <PremiumStat icon="💰" value="฿284K" label="Revenue"        color="green"  change="12% vs last month" changeUp glow delay={0} />
        <PremiumStat icon="📅" value="312"   label="Appointments"   color="blue"   change="8% growth"        changeUp glow delay={0.05} />
        <PremiumStat icon="🐾" value="1,847" label="Pets Registered" color="purple" change="24 new"          changeUp delay={0.1} />
        <PremiumStat icon="👥" value="1,203" label="Active Clients"  color="amber"  change="16 new"          changeUp delay={0.15} />
        <PremiumStat icon="💉" value="89"    label="Vaccines"        color="teal"   change="3% vs last"      changeUp={false} delay={0.2} />
        <PremiumStat icon="⭐" value="4.8"   label="Avg Rating"      color="amber"  change="+0.1 pts"        changeUp delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: 'rgba(15,18,28,0.8)', border: '1px solid rgba(201,168,76,0.08)' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-white">Revenue Overview</h3>
              <p className="text-white/25 text-xs mt-0.5">Monthly revenue in ฿ thousands</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-white/40"><span className="w-2.5 h-0.5 rounded-full inline-block" style={{background:'#C9A84C'}}/>Revenue</span>
              <span className="flex items-center gap-1.5 text-white/40"><span className="w-2.5 h-0.5 rounded-full inline-block" style={{background:'#7eb5ff'}}/>Appointments</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#C9A84C" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
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
              <Area type="monotone" dataKey="revenue"      stroke="#C9A84C" strokeWidth={2} fill="url(#revG)"  dot={false} />
              <Area type="monotone" dataKey="appointments" stroke="#4da6ff" strokeWidth={2} fill="url(#apptG)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: 'rgba(15,18,28,0.8)', border: '1px solid rgba(201,168,76,0.08)' }}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl p-5" style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Recent Appointments</h3>
            <Link to="/dashboard/admin/appointments" className="text-[#C9A84C] text-xs hover:underline">View all →</Link>
          </div>
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
                <motion.tr key={i} className="border-b border-white/[0.03] hover:bg-[rgba(201,168,76,0.03)] transition-colors"
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: i*0.05 }}>
                  <td className="py-3 pl-0 pr-2 text-white/30">{a.time}</td>
                  <td className="py-3 px-2 text-white font-medium">{a.pet_name}</td>
                  <td className="py-3 px-2 text-white/50">{a.service}</td>
                  <td className="py-3 px-2 text-white/30">{a.vet.replace('Dr. ','')}</td>
                  <td className="py-3 px-2"><StatusBadge status={a.status} /></td>
                  <td className="py-3 px-2 text-[#C9A84C] font-display text-sm">฿{a.fee}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl p-5" style={{ background:'rgba(15,18,28,0.8)', border:'1px solid rgba(255,255,255,0.05)' }}>
          <h3 className="font-semibold text-white mb-4">Top Vets — May</h3>
          <div className="space-y-3">
            {[
              { name:'Dr. Htet Aung', spec:'Internal Med', appts:142, rev:'฿89K',  r:'4.9', emoji:'👨‍⚕️', c:'#C9A84C', rank:1 },
              { name:'Dr. Khin May', spec:'Surgery',      appts:98,  rev:'฿124K', r:'4.8', emoji:'👩‍⚕️', c:'#7eb5ff', rank:2 },
              { name:'Dr. Kyaw Thu',   spec:'Exotic',       appts:76,  rev:'฿45K',  r:'4.9', emoji:'👨‍⚕️', c:'#b48aff', rank:3 },
              { name:'Dr. Aye Myat',   spec:'Dermatology',  appts:63,  rev:'฿38K',  r:'4.7', emoji:'👩‍⚕️', c:'#e8c870', rank:4 },
            ].map((v,i) => (
              <motion.div key={v.name} className="flex items-center gap-3"
                initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}>
                <div className="w-5 text-center text-xs font-bold"
                  style={{ color: v.rank<=3 ? ['#ffd700','#c0c0c0','#cd7f32'][v.rank-1] : 'rgba(255,255,255,0.2)' }}>
                  {v.rank <= 3 ? ['🥇','🥈','🥉'][v.rank-1] : v.rank}
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${v.c}15`, border: `1px solid ${v.c}30` }}>{v.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-semibold truncate">{v.name}</div>
                  <div className="text-white/25 text-[10px]">{v.appts} appts · {v.rev}</div>
                </div>
                <div className="text-[#e8c870] text-xs font-semibold">★{v.r}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/[0.04]">
            <div className="text-white/20 text-[10px] uppercase tracking-wider mb-3">Appointment Volume</div>
            <div className="space-y-2">
              {[{name:'Dr. Htet Aung',v:142,c:'#C9A84C'},{name:'Dr. Khin May',v:98,c:'#7eb5ff'},{name:'Dr. Kyaw Thu',v:76,c:'#b48aff'},{name:'Dr. Aye Myat',v:63,c:'#e8c870'}].map(b => (
                <div key={b.name} className="flex items-center gap-2">
                  <div className="text-white/25 text-[10px] w-20 truncate">{b.name.replace('Dr. ','')}</div>
                  <div className="flex-1 h-1.5 bg-[rgba(201,168,76,0.05)] rounded-full overflow-hidden">
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

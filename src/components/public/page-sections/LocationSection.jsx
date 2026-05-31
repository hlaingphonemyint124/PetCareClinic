import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import clsx from 'clsx'
import { useReveal, SectionHeader, COLOR_MAP } from './shared'

const HOURS = [
  { day: 'Monday – Friday', time: '8:00 AM – 8:00 PM', open: true },
  { day: 'Saturday',        time: '8:00 AM – 6:00 PM', open: true },
  { day: 'Sunday',          time: '9:00 AM – 5:00 PM', open: true },
  { day: 'Emergency Line',  time: '24 / 7',             open: true, emergency: true },
]

const CONTACT_ITEMS = [
  { icon: <MapPin size={16} />, label: 'Address', value: 'No. 45, Pyay Road, Kamayut Township, Yangon 11041', color: 'gold' },
  { icon: <Phone size={16} />, label: 'Phone',   value: '09-111-22222 · Emergency: 09-111-99999',              color: 'blue' },
  { icon: <Mail  size={16} />, label: 'Email',   value: 'info@mingalarpetclinic.com',                                  color: 'purple' },
]

export function LocationSection() {
  const [ref, inView] = useReveal()

  return (
    <section className="py-28 px-6 bg-bg-2 relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader eyebrow="Come visit us" title="Find Us in" highlight="Yangon" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Info column */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="space-y-3 mb-8">
              {CONTACT_ITEMS.map(item => {
                const c = COLOR_MAP[item.color] || COLOR_MAP.green
                return (
                  <div key={item.label} className="glass rounded-xl px-5 py-4 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>{item.icon}</div>
                    <div>
                      <div className="text-white/30 text-[10px] font-semibold uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-white/75 text-sm">{item.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#C9A84C]" />
                  <span className="text-white text-sm font-semibold">Clinic Hours</span>
                </div>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {HOURS.map(h => (
                  <div key={h.day} className="flex items-center justify-between px-6 py-3.5">
                    <span className="text-white/50 text-sm">{h.day}</span>
                    <span className={clsx('text-sm font-medium', h.emergency ? 'text-red-400' : 'text-[#C9A84C]')}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <div className="glass rounded-2xl overflow-hidden h-[400px] relative flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(20,26,45,0.9), rgba(8,11,18,0.9))' }}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/10" />
                <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/5" />
                <div className="absolute left-0 right-0 top-1/3 h-px bg-white/5" />
                <div className="absolute left-0 right-0 top-2/3 h-px bg-white/5" />
              </div>
              <div className="relative z-10 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <div className="w-14 h-14 bg-[#C9A84C] rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-green-glow">🐾</div>
                </motion.div>
                <div className="glass-strong rounded-xl px-4 py-3 inline-block">
                  <div className="text-white font-semibold text-sm">Mingalar Clinic</div>
                  <div className="text-white/40 text-xs">Pyay Road, Kamayut, Yangon</div>
                </div>
                <div className="mt-4">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="btn-ghost text-xs py-2 px-5">Open in Google Maps →</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

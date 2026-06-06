import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useReveal, SectionHeader, COLOR_MAP } from './shared'

const HOURS = [
  { day:'Monday – Friday', time:'8:00 AM – 8:00 PM', open:true },
  { day:'Saturday',        time:'8:00 AM – 6:00 PM', open:true },
  { day:'Sunday',          time:'9:00 AM – 5:00 PM', open:true },
  { day:'Emergency Line',  time:'24 / 7',             open:true, emergency:true },
]
const CONTACT_ITEMS = [
  { icon:<MapPin size={16}/>, label:'Address', value:'No. 45, Pyay Road, Kamayut Township, Yangon 11041', color:'green' },
  { icon:<Phone size={16}/>,  label:'Phone',   value:'09-111-22222 · Emergency: 09-111-99999',            color:'blue' },
  { icon:<Mail  size={16}/>,  label:'Email',   value:'info@mingalarpetclinic.com',                        color:'purple' },
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
                  <div key={item.label} className="rounded-xl px-5 py-4 flex items-start gap-4 location-info-card glass"
                    style={{ border: '1px solid var(--border-subtle)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>{item.icon}</div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-faint)' }}>{item.label}</div>
                      <div className="text-sm" style={{ color: 'var(--text-primary)' }}>{item.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl overflow-hidden glass location-info-card" style={{ border: '1px solid var(--border-subtle)' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: 'var(--gold)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Clinic Hours</span>
                </div>
              </div>
              <div>
                {HOURS.map((h, i) => (
                  <div key={h.day} className="flex items-center justify-between px-6 py-3.5"
                    style={{ borderBottom: i < HOURS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{h.day}</span>
                    <span className="text-sm font-medium" style={{ color: h.emergency ? '#ef4444' : 'var(--gold)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <div className="rounded-2xl overflow-hidden h-[400px] relative flex items-center justify-center glass location-map-frame"
              style={{ border: '1px solid var(--border-gold)' }}>
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(var(--border-gold) 1px, transparent 1px), linear-gradient(90deg, var(--border-gold) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 right-0 top-1/2 h-px" style={{ background: 'var(--border-subtle)' }} />
                <div className="absolute top-0 bottom-0 left-1/3 w-px" style={{ background: 'var(--border-subtle)' }} />
                <div className="absolute top-0 bottom-0 left-2/3 w-px" style={{ background: 'var(--border-subtle)' }} />
                <div className="absolute left-0 right-0 top-1/3 h-px" style={{ background: 'var(--border-subtle)' }} />
                <div className="absolute left-0 right-0 top-2/3 h-px" style={{ background: 'var(--border-subtle)' }} />
              </div>
              <div className="relative z-10 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                    style={{ background: 'var(--gold)', boxShadow: 'var(--shadow-gold)' }}>🐾</div>
                </motion.div>
                <div className="rounded-xl px-4 py-3 inline-block glass"
                  style={{ border: '1px solid var(--border-gold)' }}>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Mingalar Clinic</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Pyay Road, Kamayut, Yangon</div>
                </div>
                <div className="mt-4">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-2 px-5">
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection

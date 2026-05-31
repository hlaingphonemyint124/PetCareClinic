import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DEMO_VETS } from '../../../lib/demoData'
import { useReveal, SectionHeader, COLOR_MAP } from './shared'

export function VetsSection() {
  const [ref, inView] = useReveal()

  return (
    <section className="py-28 px-6 bg-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader eyebrow="Your pet's health team" title="Meet Our" highlight="Veterinarians"
            subtitle="Specialists who bring expertise, empathy, and a genuine love for animals." />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEMO_VETS.map((v, i) => {
            const c = COLOR_MAP[v.color] || COLOR_MAP.green
            return (
              <motion.div key={v.id}
                className="glass rounded-2xl p-6 text-center group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${c.ring} 0%, transparent 65%)` }} />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold border-2 transition-all duration-300 group-hover:scale-105"
                    style={{ background: c.bg, borderColor: c.border, color: c.text }}>
                    {v.name.split(' ').slice(1).map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">{v.name}</h3>
                  <div className="text-xs font-medium mb-1" style={{ color: c.text }}>{v.spec}</div>
                  <div className="text-white/25 text-xs mb-3">{v.exp} experience</div>

                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} className="w-3 h-3" viewBox="0 0 12 12" fill={si < Math.floor(v.rating) ? '#e8c870' : 'rgba(255,255,255,0.1)'}>
                        <path d="M6 1l1.3 2.7L10.5 4l-2.2 2.1.5 3L6 7.8 3.2 9.1l.5-3L1.5 4l3.2-.3z"/>
                      </svg>
                    ))}
                    <span className="text-white/35 text-[10px] ml-1">{v.rating} ({v.reviews})</span>
                  </div>

                  <div className="text-[10px] text-white/25 mb-4 bg-white/[0.03] rounded-lg py-2 px-3">
                    📆 {v.days}
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center mb-5">
                    {v.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>{t}</span>
                    ))}
                  </div>

                  <Link to="/booking" className="btn-primary text-xs py-2.5 w-full justify-center">
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

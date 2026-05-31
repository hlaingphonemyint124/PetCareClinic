import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { DEMO_SERVICES } from '../../../lib/demoData'
import clsx from 'clsx'
import { useReveal, SectionHeader } from './shared'

const SERVICE_INCLUDES = {
  1:  ['Full nose-to-tail physical', 'Digital health report', 'Personalized wellness plan'],
  2:  ['Core vaccines (DHPP/FVRCP)', 'Digital certificate', 'Reminder scheduling'],
  3:  ['CBC + chemistry panel', 'Same-day results', 'Vet interpretation'],
  4:  ['Full-body radiograph', 'Digital images included', 'Specialist review'],
  5:  ['Abdominal + cardiac', 'Real-time imaging', 'Report same day'],
  6:  ['Full scaling + polish', 'Pre-anesthetic bloodwork', 'Post-care instructions'],
  7:  ['Bath, blow-dry, trim', 'Nail clipping', 'Ear cleaning'],
  8:  ['Bath, blow-dry, full groom', 'Nail + ear care', 'De-shedding treatment'],
  9:  ['Private kennel stay', 'Twice-daily walks', 'Owner update photos'],
  10: ['Priority triage', '24/7 on-call vets', 'Intensive care support'],
  11: ['Pre-op blood panel', 'Full anesthesia monitoring', 'Pain management + follow-up'],
}

export function ServicesSection() {
  const [ref, inView] = useReveal()
  const [expanded, setExpanded] = useState(null)
  const featured = DEMO_SERVICES.slice(0, 6)

  return (
    <section className="py-28 px-6 bg-bg-2 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader eyebrow="Trusted care since 2010" title="Complete Pet" highlight="Healthcare"
            subtitle="Comprehensive veterinary services with transparent pricing and genuine compassion." />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s, i) => (
            <motion.div key={s.id}
              className="glass rounded-2xl overflow-hidden group cursor-pointer relative"
              style={{ border: expanded === s.id ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 20%, rgba(201,168,76,0.05), transparent 55%)' }} />
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/15 flex items-center justify-center text-2xl
                    group-hover:scale-110 group-hover:border-[#C9A84C]/30 transition-all duration-300">{s.icon}</div>
                  <ChevronDown size={15} className={clsx('text-white/20 mt-1 transition-all duration-300',
                    expanded === s.id ? 'rotate-180 text-[#C9A84C]' : 'group-hover:text-white/50')} />
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#C9A84C] transition-colors duration-200">{s.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[#C9A84C] text-lg font-bold">฿{s.price.toLocaleString()}</span>
                  <span className="text-white/25 text-xs bg-white/5 px-2.5 py-1 rounded-full">{s.duration}</span>
                </div>
              </div>
              <motion.div
                initial={false}
                animate={{ height: expanded === s.id ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden">
                <div className="border-t border-white/[0.06] px-6 py-4 bg-white/[0.02]">
                  <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-3">What's included</div>
                  <ul className="space-y-2">
                    {(SERVICE_INCLUDES[s.id] || []).map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/55">
                        <span className="w-1 h-1 rounded-full bg-[#C9A84C] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/booking" className="mt-4 flex items-center gap-1.5 text-[#C9A84C] text-xs font-semibold hover:gap-2.5 transition-all duration-200">
                    Book this service <ChevronRight size={13} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-ghost px-10 py-3">View All 11 Services →</Link>
        </div>
      </div>
    </section>
  )
}

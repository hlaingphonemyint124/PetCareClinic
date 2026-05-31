import { motion } from 'framer-motion'
import { useReveal, SectionHeader, COLOR_MAP } from './shared'

const FACILITIES = [
  { icon: '🔬', title: 'In-House Laboratory',  desc: "Same-day CBC, chemistry, urinalysis results. No waiting days for answers about your pet's health.", color: 'green' },
  { icon: '📡', title: 'Digital X-Ray Suite',  desc: 'High-resolution digital radiography for bones, lungs, and abdominal organs — results in minutes.', color: 'blue' },
  { icon: '🖥️', title: 'Ultrasound Imaging',   desc: 'Real-time cardiac and abdominal imaging with board-certified interpretation on-site.', color: 'purple' },
  { icon: '⚕️', title: 'Sterile Surgery Suite', desc: 'HEPA-filtered operating theatre with full anaesthesia monitoring and recovery ward.', color: 'amber' },
]

export function FacilitiesSection() {
  const [ref, inView] = useReveal()

  return (
    <section className="py-28 px-6 bg-bg relative overflow-hidden" ref={ref}>
      <div className="absolute left-0 right-0 top-1/2 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader eyebrow="State-of-the-art facility" title="Built for the" highlight="Best Care"
            subtitle="Advanced equipment and a purpose-built clinic designed around your pet's comfort and safety." />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FACILITIES.map((f, i) => {
            const c = COLOR_MAP[f.color] || COLOR_MAP.green
            return (
              <motion.div key={f.title}
                className="glass rounded-2xl p-6 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${c.ring}, transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5
                    group-hover:scale-110 transition-transform duration-300"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>{f.icon}</div>
                  <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div className="mt-14 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
          {[
            ['🏆', 'Best Vet Clinic', 'Myanmar 2024'],
            ['🎖',  'ISO 9001:2015',  'Certified'],
            ['🌟', 'AAHA Accredited', 'Hospital'],
            ['💚', 'Green Clinic',    'Eco-Friendly'],
          ].map(([icon, label, sub]) => (
            <div key={label} className="flex items-center gap-3 glass rounded-xl px-5 py-3">
              <span className="text-xl">{icon}</span>
              <div>
                <div className="text-white text-xs font-semibold">{label}</div>
                <div className="text-white/30 text-[10px]">{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

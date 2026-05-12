import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { DEMO_VETS, DEMO_SERVICES, DEMO_BLOG } from '../../lib/demoData'
import clsx from 'clsx'

function useReveal() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return [ref, inView]
}

// ── Services Section ──────────────────────────────────────────────
export function ServicesSection() {
  const [ref, inView] = useReveal()
  const featured = DEMO_SERVICES.slice(0, 6)

  return (
    <section className="py-28 px-6 bg-bg-2 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">What We Do</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            Complete Pet <span className="gradient-text italic">Healthcare</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto">Comprehensive veterinary care from routine wellness to specialized treatments.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s, i) => (
            <motion.div key={s.id}
              className="glass rounded-2xl p-6 group cursor-pointer relative overflow-hidden vet-card-3d"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,229,160,0.06), transparent 60%)' }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{s.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-green text-lg">฿{s.price.toLocaleString()}</span>
                  <span className="text-white/25 text-xs">{s.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="btn-ghost px-8 py-3">View All Services →</Link>
        </div>
      </div>
    </section>
  )
}

// ── Vets Section ──────────────────────────────────────────────────
export function VetsSection() {
  const [ref, inView] = useReveal()
  const colorMap = { green: 'bg-green/10 text-green border-green/20', amber: 'bg-amber/10 text-amber border-amber/20', blue: 'bg-blue/10 text-blue border-blue/20', purple: 'bg-purple/10 text-purple border-purple/20' }

  return (
    <section className="py-28 px-6 bg-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Our Team</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white mb-4">
            Meet Our <span className="gradient-text italic">Veterinarians</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEMO_VETS.map((v, i) => (
            <motion.div key={v.id}
              className="glass rounded-2xl p-6 text-center group vet-card-3d"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className={clsx('w-20 h-20 rounded-full mx-auto mb-4 text-4xl flex items-center justify-center border-2', colorMap[v.color])}>
                {v.emoji}
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{v.name}</h3>
              <div className={clsx('text-xs font-medium mb-2', `text-${v.color}`)}>{v.spec}</div>
              <div className="text-white/30 text-xs mb-3">{v.exp} experience</div>
              <div className="text-amber text-xs mb-4">{'★'.repeat(Math.floor(v.rating))} {v.rating} ({v.reviews})</div>
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {v.tags.map(t => <span key={t} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <Link to="/booking" className="btn-primary text-xs py-2 w-full justify-center">Book Now</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Sarah Johnson', pet: 'Labrador owner', rating: 5, text: '"PawCare saved my dog\'s life after he ate something toxic. The emergency team was incredible — fast, professional, caring."', initials: 'SJ', color: 'blue' },
  { name: 'Tom Chen', pet: 'Persian cat owner', rating: 5, text: '"The online system is so convenient. I can see my cat\'s full medical history, vaccination records and download certificates instantly."', initials: 'TC', color: 'purple' },
  { name: 'Ananya Malik', pet: 'Rabbit owner', rating: 5, text: '"Dr. Somchai diagnosed my rabbit\'s condition when three other vets couldn\'t. The diagnostic equipment here is state-of-the-art."', initials: 'AM', color: 'teal' },
]

export function TestimonialsSection() {
  const [ref, inView] = useReveal()
  const colorMap = { blue: 'bg-blue/10 text-blue', purple: 'bg-purple/10 text-purple', teal: 'bg-teal/10 text-teal' }

  return (
    <section className="py-28 px-6 bg-bg-2 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,229,160,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Happy Clients</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white">What Pet Owners <span className="gradient-text italic">Say</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.name}
              className="glass rounded-2xl p-7 flex flex-col"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-amber text-sm mb-4">{'★'.repeat(t.rating)}</div>
              <p className="text-white/60 text-sm leading-relaxed flex-1 italic mb-5">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className={clsx('w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0', colorMap[t.color])}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/30 text-xs">{t.pet}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Blog Preview ──────────────────────────────────────────────────
export function BlogSection() {
  const [ref, inView] = useReveal()
  const posts = DEMO_BLOG.filter(b => b.published).slice(0, 3)

  return (
    <section className="py-28 px-6 bg-bg" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Knowledge</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white">Pet Health <span className="gradient-text italic">Tips</span></h2>
          </motion.div>
          <Link to="/blog" className="btn-ghost py-2.5">View All Articles →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((b, i) => (
            <motion.div key={b.id}
              className="glass rounded-2xl overflow-hidden group cursor-pointer vet-card-3d"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="h-44 bg-bg-3 flex items-center justify-center text-6xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.08), transparent)' }} />
                <span className="group-hover:scale-110 transition-transform duration-500">{b.emoji}</span>
              </div>
              <div className="p-5">
                <div className="text-green text-[10px] font-bold tracking-wider uppercase mb-2">{b.category}</div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-green transition-colors duration-200">{b.title}</h3>
                <div className="flex items-center gap-2 text-[11px] text-white/25 mt-3">
                  <span>{b.author}</span><span>·</span><span>{b.date}</span><span>·</span><span>{b.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA Banner ────────────────────────────────────────────────────
export function CTASection() {
  const [ref, inView] = useReveal()
  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}
      style={{ background: 'linear-gradient(135deg, #00e5a010 0%, #4da6ff08 50%, #b48aff10 100%)' }}>
      <div className="absolute inset-0 border-y border-white/5 pointer-events-none" />
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.06), transparent 70%)', filter: 'blur(40px)' }} />
      <motion.div className="max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <div className="text-6xl mb-6 animate-float">🐾</div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white mb-5">
          Ready to Get <span className="gradient-text italic">Started?</span>
        </h2>
        <p className="text-white/50 mb-8 text-lg">Book an appointment in under 2 minutes. Your pet deserves the best care.</p>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <Link to="/booking" className="btn-primary text-base px-10 py-4">
            Book Appointment <span>→</span>
          </Link>
          <Link to="/contact" className="btn-ghost text-base px-8 py-4">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-bg-2 border-t border-white/5 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-green rounded-lg flex items-center justify-center shadow-green-glow">🐾</div>
              <span className="font-display text-lg text-white">PawCare Clinic</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-4">Modern veterinary care for your beloved companions. Serving Bangkok since 2010.</p>
            <div className="flex gap-3 text-xl">{'📘📸💬🎥'.split('').map((c,i) => <span key={i} className="cursor-pointer hover:scale-110 transition-transform">{c}</span>)}</div>
          </div>
          {[
            { title: 'Services', links: ['General Checkup','Vaccination','Surgery','Dental Care','Grooming','Emergency'] },
            { title: 'Clinic', links: ['About Us','Our Team','Pet Blog','Careers','Privacy Policy'] },
            { title: 'Contact', links: ['📞 02-xxx-xxxx','🚑 Emergency: 24/7','📧 info@pawcare.co.th','📍 123 Sukhumvit, Bangkok','🕐 Mon–Sat 8am–8pm'] },
          ].map(col => (
            <div key={col.title}>
              <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><Link to="/" className="text-white/40 text-sm hover:text-green transition-colors duration-200">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex justify-between items-center text-xs text-white/20 flex-wrap gap-2">
          <span>© 2026 PawCare Clinic. All rights reserved.</span>
          <span>Powered by React + Supabase 🐾</span>
        </div>
      </div>
    </footer>
  )
}

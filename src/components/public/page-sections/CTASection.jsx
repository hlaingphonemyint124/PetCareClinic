import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useReveal } from './shared'

export function CTASection() {
  const [ref, inView] = useReveal()
  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={ref}
      style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(77,166,255,0.04) 50%, rgba(180,138,255,0.06) 100%)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)', filter: 'blur(60px)' }} />
      <motion.div className="max-w-2xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <motion.div className="text-6xl mb-6"
          animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>🐾</motion.div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
          style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
          <span className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>Slots available today</span>
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] mb-5" style={{ color: 'var(--text-primary)' }}>
          Ready to Give Your Pet <span className="gradient-text italic">the Best?</span>
        </h2>
        <p className="mb-10 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Book an appointment in under 2 minutes. Join 3,200+ Yangon families who trust Mingalar.
        </p>
        <div className="flex items-center gap-4 justify-center flex-wrap">
          <Link to="/booking" className="btn-primary text-base px-12 py-4">
            Book Appointment <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn-ghost text-base px-8 py-4">Contact Us</Link>
        </div>
      </motion.div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Clock, Star, Zap } from 'lucide-react'

// Particle field component
function ParticleField() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i, size: Math.random() * 4 + 2,
    x: Math.random() * 100, delay: Math.random() * 8,
    duration: Math.random() * 6 + 8,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div key={p.id} className="particle absolute"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, bottom: '-20px', animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
        />
      ))}
    </div>
  )
}

// 3D floating card
function FloatingCard({ className, children, delay = 0 }) {
  return (
    <motion.div
      className={`absolute glass rounded-2xl p-4 shadow-card-3d border border-white/[0.08] ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: 'spring' }}
    >
      {children}
    </motion.div>
  )
}

// Rotating orbit ring
function OrbitRing({ size, duration, color, reverse }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ width: size, height: size, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div className="w-full h-full rounded-full border border-dashed opacity-20 flex items-center justify-center relative"
        style={{ borderColor: color, animation: `${reverse ? 'orbit-reverse' : 'orbit-forward'} ${duration}s linear infinite` }}
      />
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 400], [0, -80])
  const y2 = useTransform(scrollY, [0, 400], [0, -40])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      const { clientX, clientY, currentTarget } = e
      if (!currentTarget) return
      const rect = document.body.getBoundingClientRect()
      setMousePos({ x: (clientX / rect.width - 0.5) * 20, y: (clientY / rect.height - 0.5) * 20 })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-bg pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none" />
      <div className="absolute inset-0 scan-lines pointer-events-none opacity-30" />

      {/* Ambient orbs */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none">
        <div className="hero-orb w-[700px] h-[700px] top-[-200px] right-[-200px]"
          style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', animation: 'float 12s ease-in-out infinite' }} />
        <div className="hero-orb w-[500px] h-[500px] bottom-[-100px] left-[-100px]"
          style={{ background: 'radial-gradient(circle, rgba(77,166,255,0.06) 0%, transparent 70%)', animation: 'float 15s ease-in-out 2s infinite reverse' }} />
        <div className="hero-orb w-[300px] h-[300px] top-[30%] left-[35%]"
          style={{ background: 'radial-gradient(circle, rgba(180,138,255,0.05) 0%, transparent 70%)', animation: 'float 10s ease-in-out 1s infinite' }} />
      </motion.div>

      {/* Particles */}
      <ParticleField />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <motion.div style={{ y: y2, opacity }}>
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-1.5 mb-6"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
              </span>
              <span className="text-green text-xs font-semibold tracking-wider uppercase">Bangkok's Premier Pet Clinic</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-[clamp(3rem,6vw,5rem)] leading-[1.02] mb-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            >
              <span className="text-white">Expert Care</span><br />
              <span className="text-white">for Your </span>
              <span className="gradient-text italic">Beloved</span><br />
              <span className="text-white">Companions</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/50 text-lg leading-relaxed mb-8 max-w-[500px]"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              Modern veterinary medicine with genuine compassion. From routine wellness to complex surgeries — every paw, whisker, and feather matters.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex items-center gap-4 mb-10 flex-wrap"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              <Link to="/booking" className="btn-primary text-base px-8 py-4 group">
                <span>Book Appointment</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-ghost text-base px-8 py-4">
                Our Services
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-5 flex-wrap"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            >
              {[
                { icon: <Shield size={13} />, label: 'ISO Certified' },
                { icon: <Star size={13} />, label: 'Best Clinic 2024' },
                { icon: <Clock size={13} />, label: '24/7 Emergency' },
                { icon: <Zap size={13} />, label: 'In-House Lab' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-1.5 text-white/40 text-xs">
                  <span className="text-green">{b.icon}</span>
                  {b.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Floating Cards Scene */}
          <motion.div
            className="hidden lg:block relative h-[550px]"
            style={{ transform: `perspective(1200px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.2}deg)` }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          >
            {/* Main pet card */}
            <FloatingCard className="float-card-1 w-[290px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={0.3}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green/10 border-2 border-green/20 flex items-center justify-center text-2xl">🐕</div>
                <div>
                  <div className="font-semibold text-white">Buddy</div>
                  <div className="text-xs text-white/40">Golden Retriever · Male</div>
                </div>
                <span className="ml-auto text-xs bg-green/10 text-green border border-green/20 px-2 py-0.5 rounded-full">Healthy</span>
              </div>
              <div className="h-px bg-white/5 mb-3" />
              {[['Age', '3 years'], ['Weight', '28 kg'], ['Last Visit', 'Jan 2026'], ['Next Vaccine', 'Jul 2026']].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs mb-2">
                  <span className="text-white/30">{k}</span>
                  <span className="text-white/70 font-medium">{v}</span>
                </div>
              ))}
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/30">Health Score</span>
                  <span className="text-green font-semibold">92%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-green rounded-full" initial={{ width: 0 }} animate={{ width: '92%' }} transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }} />
                </div>
              </div>
            </FloatingCard>

            {/* Appointment mini card */}
            <FloatingCard className="float-card-2 w-[210px] top-[8%] left-[5%]" delay={0.5}>
              <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-2">📅 Next Appointment</div>
              <div className="font-semibold text-sm text-white mb-0.5">Max · Vaccination</div>
              <div className="text-xs text-white/40 mb-2">Tomorrow · 10:00 AM</div>
              <span className="text-xs bg-green/10 text-green border border-green/20 px-2 py-0.5 rounded-full">✓ Confirmed</span>
            </FloatingCard>

            {/* Vitals mini card */}
            <FloatingCard className="float-card-3 w-[195px] bottom-[10%] right-[3%]" delay={0.6}>
              <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-3">💊 Medications</div>
              {[{ label: 'Flea prevention', status: 'Due', color: 'amber' }, { label: 'Heartworm pill', status: 'Done', color: 'green' }].map(m => (
                <div key={m.label} className="flex items-center gap-2 mb-2 text-xs">
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-${m.color}/10 text-${m.color}`}>
                    {m.status === 'Due' ? '⚡' : '✓'} {m.status}
                  </span>
                  <span className="text-white/50">{m.label}</span>
                </div>
              ))}
            </FloatingCard>

            {/* Stats mini */}
            <FloatingCard className="float-card-1 w-[170px] bottom-[28%] left-[3%]" delay={0.7}>
              <div className="text-[10px] text-white/30 mb-2 uppercase tracking-wider">📊 This Month</div>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: '12', l: 'Visits' }, { v: '98%', l: 'Healthy' }].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="font-display text-lg text-green leading-none">{s.v}</div>
                    <div className="text-[10px] text-white/30 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </FloatingCard>

            {/* Glowing orb behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', filter: 'blur(30px)' }} />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 border-t border-white/5 pt-10"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { val: '3,200+', label: 'Pets Treated Yearly', color: 'text-green' },
            { val: '12', label: 'Expert Veterinarians', color: 'text-amber' },
            { val: '24/7', label: 'Emergency Care', color: 'text-blue' },
            { val: '98%', label: 'Client Satisfaction', color: 'text-purple' },
          ].map((s, i) => (
            <motion.div key={s.label} className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.1 }}>
              <div className={`font-display text-3xl md:text-4xl ${s.color} mb-1`}>{s.val}</div>
              <div className="text-white/30 text-xs">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

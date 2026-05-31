import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight, Shield, Clock, Star, Activity, ChevronRight, Heart, Phone } from 'lucide-react'
import { LOGO_URI } from '../../lib/logoData'
/* ─── Pet Selector Data ──────────────────────────────────────────── */
const PET_TYPES = [
  {
    id: 'dogs', emoji: '🐕', label: 'Dogs',
    accent: '#C9A84C', bg: 'rgba(201,168,76,0.09)', border: 'rgba(201,168,76,0.22)',
    vet: 'Dr. Htet Aung', spec: 'Internal Medicine', initials: 'HA', stat: '1,400+ cases',
    tagline: 'Specialist in canine wellness & diagnostics',
  },
  {
    id: 'cats', emoji: '🐈', label: 'Cats',
    accent: '#7eb5ff', bg: 'rgba(126,181,255,0.08)', border: 'rgba(126,181,255,0.18)',
    vet: 'Dr. Khin May', spec: 'Surgery & Oncology', initials: 'KM', stat: '900+ surgeries',
    tagline: 'Expert in feline surgery & oncology care',
  },
  {
    id: 'rabbits', emoji: '🐇', label: 'Rabbits',
    accent: '#e8c870', bg: 'rgba(232,200,112,0.08)', border: 'rgba(232,200,112,0.18)',
    vet: 'Dr. Kyaw Thu', spec: 'Exotic Animals', initials: 'KT', stat: '500+ exotic cases',
    tagline: 'Dedicated exotic & small animal specialist',
  },
  {
    id: 'birds', emoji: '🦜', label: 'Birds',
    accent: '#c4a0ff', bg: 'rgba(196,160,255,0.08)', border: 'rgba(196,160,255,0.18)',
    vet: 'Dr. Aye Myat', spec: 'Avian & Dermatology', initials: 'AM', stat: '300+ avian cases',
    tagline: 'Specialist in avian health & skin conditions',
  },
]

/* ─── SVG Paw Icon (crisp at all DPRs) ─────────────────────────── */
function PawIcon({ size = 24, color = 'currentColor', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style} aria-hidden="true">
      <ellipse cx="5" cy="8" rx="2" ry="2.8" />
      <ellipse cx="9.5" cy="5.5" rx="2" ry="2.5" />
      <ellipse cx="14.5" cy="5.5" rx="2" ry="2.5" />
      <ellipse cx="19" cy="8" rx="2" ry="2.8" />
      <path d="M12 10c-3.5 0-6.5 2-7 5.5-.3 2.2.5 4.5 2.5 5.2 1.2.4 2.5-.1 3.5-.8.5-.3.7-.4 1-.4s.5.1 1 .4c1 .7 2.3 1.2 3.5.8 2-.7 2.8-3 2.5-5.2-.5-3.5-3.5-5.5-7-5.5z" />
    </svg>
  )
}

/* ─── Animated SVG Paw Background ───────────────────────────────── */
function PawBackground() {
  const paws = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 5 + (i * 9.3) % 92,
    y: 5 + (i * 13.7) % 88,
    size: 18 + (i % 4) * 9,
    delay: i * 1.1,
    duration: 9 + (i % 5) * 2.2,
    rotate: (i * 37) % 360,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {paws.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            opacity: 0.025,
            transform: `rotate(${p.rotate}deg)`,
            animation: `pawFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        >
          <PawIcon size={p.size} color="white" />
        </div>
      ))}
      <style>{`
        @keyframes pawFloat {
          from { transform: rotate(var(--r, 0deg)) translateY(0px); }
          to   { transform: rotate(var(--r, 0deg)) translateY(-14px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .absolute[style*="pawFloat"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── Animated Counter (fires on IntersectionObserver) ──────────── */
function Counter({ end, suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0)
  const ref = useRef()
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          const startTime = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ─── Review Ticker ─────────────────────────────────────────────── */
const REVIEWS = [
  { pet: 'Max the Shiba', owner: 'Khin Myo T.', text: 'Dr. Htet Aung was amazing. Max recovered so fast!', stars: 5 },
  { pet: 'Luna the Persian', owner: 'Wai Wai S.', text: 'Best cat clinic in Yangon. Truly caring staff.', stars: 5 },
  { pet: 'Coco the Rabbit', owner: 'James H.', text: 'Exotic specialist Dr. Kyaw Thu put us at ease.', stars: 5 },
  { pet: 'Rio the Macaw', owner: 'Pratchaya K.', text: 'Finally a vet that truly understands birds.', stars: 5 },
]

function ReviewTicker() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % REVIEWS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const r = REVIEWS[index]

  return (
    <div
      className="glass rounded-2xl px-5 py-3.5 flex items-center gap-4 min-h-[64px]"
      role="status"
      aria-live="polite"
      aria-label="Client review"
    >
      <div className="flex-shrink-0 flex gap-0.5" aria-label={`${r.stars} stars`}>
        {Array.from({ length: r.stars }).map((_, i) => (
          <Star key={i} size={11} className="text-amber fill-amber" style={{ color: '#e8c870', fill: '#e8c870' }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={index}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="flex-1 min-w-0"
        >
          <p className="text-white/70 text-xs leading-snug truncate">"{r.text}"</p>
          <p className="text-white/30 text-[10px] mt-0.5">{r.owner} · {r.pet}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex-shrink-0 flex gap-1" aria-hidden="true">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i === index ? '#C9A84C' : 'rgba(255,255,255,0.2)' }}
            aria-label={`Review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── 3-D Tilt Card ─────────────────────────────────────────────── */
function TiltCard({ children, className, style }) {
  const ref = useRef()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const spring = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  const onMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateX.set(-dy * 6)
    rotateY.set(dx * 6)
  }, [])

  const onLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Vet Card ──────────────────────────────────────────────────── */
function VetCard({ pet }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pet.id}
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -8 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl px-5 py-4 flex items-center gap-4"
      >
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: pet.bg, border: `1.5px solid ${pet.border}`, color: pet.accent }}
          aria-hidden="true"
        >
          {pet.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-semibold leading-none mb-1">{pet.vet}</div>
          <div className="text-xs leading-none mb-1.5" style={{ color: pet.accent }}>{pet.spec}</div>
          <div className="text-white/30 text-[11px] truncate">{pet.tagline}</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs font-semibold" style={{ color: pet.accent }}>{pet.stat}</div>
          <div className="text-white/25 text-[10px] mt-0.5">experience</div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Mobile Floating CTA ───────────────────────────────────────── */
function MobileFloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="lg:hidden fixed bottom-5 left-4 right-4 z-50"
        >
          <div className="glass rounded-2xl p-3 flex items-center gap-3 shadow-2xl"
            style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
            <div className="flex-1">
              <div className="text-white text-xs font-semibold">Next slot: Today · 2:30 PM</div>
              <div className="text-white/40 text-[10px]">Dr. Htet Aung · Available now</div>
            </div>
            <Link
              to="/booking"
              className="btn-primary text-sm px-5 py-2.5 flex items-center gap-1.5 flex-shrink-0"
              aria-label="Book appointment"
            >
              Book Now <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Main Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const [activePet, setActivePet] = useState(PET_TYPES[0])
  const containerRef = useRef()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -70])
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0])

  const pet = activePet

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#080f1c] pt-20"
        aria-labelledby="hero-heading"
      >
        {/* Grid texture */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" aria-hidden="true" />

        {/* Ambient orbs */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute w-[900px] h-[900px] -top-48 -right-48 rounded-full"
            style={{ background: `radial-gradient(circle, ${pet.bg.replace('0.08', '0.07')} 0%, transparent 60%)`, filter: 'blur(50px)', transition: 'background 0.6s ease' }}
          />
          <div
            className="absolute w-[700px] h-[700px] bottom-0 -left-32 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(180,138,255,0.04) 0%, transparent 60%)', filter: 'blur(40px)' }}
          />
        </motion.div>

        <PawBackground />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* ── LEFT ─────────────────────────────────────── */}
            <motion.div style={{ opacity: heroOpacity }}>

              {/* Live badge */}
              <motion.div
                className="inline-flex items-center gap-2 glass-green rounded-full px-4 py-2 mb-7"
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
              >
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{background:'#C9A84C'}} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{background:'#C9A84C'}} />
                </span>
                <span className="text-[#C9A84C] text-xs font-semibold tracking-wider uppercase">Yangon's Premier Pet Clinic</span>
              </motion.div>

              {/* Headline — word-by-word stagger */}
              <motion.h1
                id="hero-heading"
                className="font-display leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(2.6rem,5.2vw,4.6rem)' }}
              >
                {['Your Pet', 'Deserves'].map((word, i) => (
                  <motion.span
                    key={word}
                    className="block text-white"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.1, duration: 0.6 }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="block gradient-text italic"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.6 }}
                >
                  Exceptional
                </motion.span>
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.6 }}
                >
                  Care & Love
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-white/55 text-lg leading-relaxed mb-8 max-w-[460px]"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.55 }}
              >
                Trusted by 3,200+ Yangon families. From routine wellness to complex surgeries — every paw, whisker, and feather matters deeply to us.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex items-center gap-4 mb-8 flex-wrap"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56 }}
              >
                <Link
                  to="/booking"
                  className="btn-primary text-base px-9 py-4 group relative overflow-hidden"
                  aria-label="Book an appointment"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book Appointment
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  {/* Heartbeat glow on hover */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.25) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                </Link>
                <a
                  href="tel:+66-2-xxx-xxxx"
                  className="btn-ghost text-base px-7 py-4 flex items-center gap-2"
                  aria-label="Call us"
                >
                  <Phone size={15} className="text-[#C9A84C]" />
                  Call Us Now
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex items-center gap-5 flex-wrap mb-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
              >
                {[
                  { icon: <Shield size={12} />, label: 'ISO Certified' },
                  { icon: <Star size={12} />, label: 'Best Clinic 2024' },
                  { icon: <Clock size={12} />, label: '24/7 Emergency' },
                  { icon: <Activity size={12} />, label: 'In-House Lab' },
                ].map(b => (
                  <div key={b.label} className="flex items-center gap-1.5 text-white/35 text-xs">
                    <span className="text-[#C9A84C]">{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </motion.div>

              {/* Review ticker */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <ReviewTicker />
              </motion.div>
            </motion.div>

            {/* ── RIGHT ────────────────────────────────────── */}
            <motion.div
              className="hidden lg:flex flex-col gap-4"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.65 }}
            >

              {/* Main tilt card */}
              <TiltCard
                className="glass rounded-3xl p-7 overflow-hidden relative"
                style={{ background: 'rgba(18,24,42,0.75)' }}
              >
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{ background: `radial-gradient(ellipse at 75% 15%, ${pet.bg} 0%, transparent 60%)` }}
                  aria-hidden="true"
                />

                {/* Clinic header */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <img src={LOGO_URI} alt="Mingalar Pet Clinic" className="w-10 h-10 object-contain" style={{filter:"drop-shadow(0 0 6px rgba(201,168,76,0.4))"}} />
                    <div>
                      <div className="font-display text-white text-base leading-none mb-0.5">Mingalar Pet Clinic</div>
                      <div className="text-white/30 text-[11px]">Pyay Road · Est. 2010</div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#C9A84C'}} aria-hidden="true" />
                    <span className="text-[#C9A84C] text-[10px] font-semibold">Open Now</span>
                  </div>
                </div>

                {/* Pet type selector */}
                <div className="grid grid-cols-4 gap-2.5 mb-6 relative z-10" role="group" aria-label="Select pet type">
                  {PET_TYPES.map((p, i) => {
                    const active = p.id === activePet.id
                    return (
                      <motion.button
                        key={p.id}
                        onClick={() => setActivePet(p)}
                        className="rounded-2xl p-3 text-center cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green"
                        style={{
                          background: active ? p.bg : 'rgba(255,255,255,0.03)',
                          border: `1.5px solid ${active ? p.border : 'rgba(255,255,255,0.06)'}`,
                          boxShadow: active ? `0 0 20px ${p.bg}` : 'none',
                        }}
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        aria-pressed={active}
                        aria-label={`Show ${p.label} specialist`}
                      >
                        <div className="text-2xl mb-1" aria-hidden="true">{p.emoji}</div>
                        <div
                          className="text-[10px] font-medium transition-colors duration-300"
                          style={{ color: active ? p.accent : 'rgba(255,255,255,0.35)' }}
                        >
                          {p.label}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Dynamic stats */}
                <div className="grid grid-cols-3 gap-2.5 relative z-10">
                  {[
                    { val: '3,200+', label: 'Pets / year', color: '#C9A84C' },
                    { val: '12', label: 'Expert vets', color: '#e8c870' },
                    { val: '98%', label: 'Satisfaction', color: '#b48aff' },
                  ].map(s => (
                    <div key={s.label} className="glass rounded-xl p-3 text-center">
                      <div className="font-display text-xl font-bold mb-0.5" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-white/30 text-[10px]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </TiltCard>

              {/* Dynamic vet card */}
              <VetCard pet={pet} />

              {/* Currently treating live counter */}
              <motion.div
                className="glass rounded-2xl px-5 py-3.5 flex items-center gap-3"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
              >
                <Heart size={16} className="text-[#C9A84C] animate-pulse flex-shrink-0" aria-hidden="true" />
                <div className="flex-1">
                  <span className="text-white/50 text-xs">Treating </span>
                  <span className="text-[#C9A84C] text-xs font-bold">7 pets</span>
                  <span className="text-white/50 text-xs"> in clinic right now</span>
                </div>
                <Link
                  to="/booking"
                  className="text-[#C9A84C] text-xs font-semibold hover:text-white transition-colors flex items-center gap-1 flex-shrink-0"
                  aria-label="Book an appointment"
                >
                  Book <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Next appointment slot */}
              <motion.div
                className="glass rounded-2xl px-5 py-4 flex items-center gap-4"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}
                  aria-hidden="true"
                >
                  📅
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-semibold">Next available slot</div>
                  <div className="text-white/35 text-[11px] mt-0.5">
                    Today · 2:30 PM with {pet.vet}
                  </div>
                </div>
                <Link
                  to="/booking"
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 flex-shrink-0"
                  aria-label={`Book appointment with ${pet.vet}`}
                >
                  Book <ChevronRight size={12} aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Mobile pet strip (hidden on desktop, shown on tablet) */}
              <div className="hidden md:flex lg:hidden overflow-x-auto gap-3 pb-1 -mx-1 px-1 snap-x" role="group" aria-label="Pet types">
                {PET_TYPES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePet(p)}
                    className="flex-shrink-0 rounded-2xl p-3 text-center snap-start transition-all duration-300"
                    style={{
                      width: 72, background: p.id === activePet.id ? p.bg : 'rgba(255,255,255,0.04)',
                      border: `1.5px solid ${p.id === activePet.id ? p.border : 'rgba(255,255,255,0.07)'}`,
                    }}
                    aria-pressed={p.id === activePet.id}
                    aria-label={p.label}
                  >
                    <div className="text-xl mb-1" aria-hidden="true">{p.emoji}</div>
                    <div className="text-[10px]" style={{ color: p.id === activePet.id ? p.accent : 'rgba(255,255,255,0.3)' }}>{p.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Stats Bar ───────────────────────────────────── */}
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 border-t border-[rgba(201,168,76,0.1)] pt-10"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { end: 3200, suffix: '+', label: 'Pets Treated Yearly', color: '#C9A84C' },
              { end: 12, suffix: '', label: 'Expert Veterinarians', color: '#e8c870' },
              { end: 15, suffix: ' yrs', label: 'Years of Experience', color: '#7eb5ff' },
              { end: 98, suffix: '%', label: 'Client Satisfaction', color: '#b48aff' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <div className="font-display text-3xl md:text-4xl mb-1 tabular-nums" style={{ color: s.color }}>
                  <Counter end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-white/30 text-xs">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <MobileFloatingCTA />
    </>
  )
}
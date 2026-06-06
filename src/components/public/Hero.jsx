import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Shield, Clock, Star, Activity,
  ChevronRight, Heart, Phone, ChevronDown,
} from 'lucide-react'
import { LOGO_URI } from '../../lib/logoData'

// ─────────────────────────────────────────────────────────────
//  BACKGROUND SLIDES
// ─────────────────────────────────────────────────────────────
const BG_SLIDES = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1800&fit=crop',
  'https://images.unsplash.com/photo-1548767797-d8c844163c4a?q=80&w=1800&fit=crop',
  'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1800&fit=crop',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1800&fit=crop',
]
const BG_MS = 5500

// ─────────────────────────────────────────────────────────────
//  PET TYPES
// ─────────────────────────────────────────────────────────────
const PETS = [
  { id:'dogs',    emoji:'🐕', label:'Dogs',    accent:'#C9A84C', bg:'rgba(201,168,76,0.1)',   border:'rgba(201,168,76,0.25)',   vet:'Dr. Htet Aung',  spec:'Internal Medicine',   initials:'HA', stat:'1,400+ cases',     tagline:'Specialist in canine wellness & diagnostics' },
  { id:'cats',    emoji:'🐈', label:'Cats',    accent:'#7eb5ff', bg:'rgba(126,181,255,0.09)', border:'rgba(126,181,255,0.2)',   vet:'Dr. Khin May',   spec:'Surgery & Oncology',  initials:'KM', stat:'900+ surgeries',   tagline:'Expert in feline surgery & oncology care' },
  { id:'rabbits', emoji:'🐇', label:'Rabbits', accent:'#e8c870', bg:'rgba(232,200,112,0.09)', border:'rgba(232,200,112,0.22)', vet:'Dr. Kyaw Thu',   spec:'Exotic Animals',      initials:'KT', stat:'500+ exotic cases', tagline:'Dedicated exotic & small animal specialist' },
  { id:'birds',   emoji:'🦜', label:'Birds',   accent:'#c4a0ff', bg:'rgba(196,160,255,0.09)', border:'rgba(196,160,255,0.22)', vet:'Dr. Aye Myat',   spec:'Avian & Dermatology', initials:'AM', stat:'300+ avian cases',  tagline:'Specialist in avian health & skin conditions' },
]

// ─────────────────────────────────────────────────────────────
//  REVIEWS
// ─────────────────────────────────────────────────────────────
const REVIEWS = [
  { pet:'Max the Shiba',    owner:'Khin Myo T.',  text:'Dr. Htet Aung was amazing. Max recovered so fast!' },
  { pet:'Luna the Persian', owner:'Wai Wai S.',   text:'Best cat clinic in Yangon. Truly caring staff.' },
  { pet:'Coco the Rabbit',  owner:'James H.',     text:'Exotic specialist Dr. Kyaw Thu put us at ease.' },
  { pet:'Rio the Macaw',    owner:'Pratchaya K.', text:'Finally a vet that truly understands birds.' },
]

// ─────────────────────────────────────────────────────────────
//  BACKGROUND SLIDESHOW
// ─────────────────────────────────────────────────────────────
function HeroBg({ current, onDotClick }) {
  const t = useRef(null)

  const next = useCallback(() => {
    clearTimeout(t.current)
    t.current = setTimeout(() => onDotClick((current + 1) % BG_SLIDES.length), BG_MS)
  }, [current, onDotClick])

  useEffect(() => { next(); return () => clearTimeout(t.current) }, [current, next])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {BG_SLIDES.map((url, i) => (
        <div
          key={url}
          className="absolute inset-0 transition-opacity duration-[1200ms]"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <motion.img
            src={url} alt=""
            className="absolute inset-0 w-full h-full object-cover"
            animate={i === current ? { scale: 1.07 } : { scale: 1.0 }}
            transition={{ duration: BG_MS / 1000, ease: 'linear' }}
            draggable={false}
          />
        </div>
      ))}

      {/* Multi-layer overlay for readability */}
      {/* Bottom-up dark band */}
      <div className="absolute inset-0"
        className="hero-overlay-bottom" style={{ background: 'linear-gradient(to top, rgba(5,10,20,1) 0%, rgba(5,10,20,0.82) 18%, rgba(5,10,20,0.4) 45%, rgba(5,10,20,0.2) 100%)' }}
      />
      {/* Top-down navbar band */}
      <div className="absolute inset-0"
        className="hero-overlay-top" style={{ background: 'linear-gradient(to bottom, rgba(5,10,20,0.85) 0%, rgba(5,10,20,0.3) 18%, transparent 40%)' }}
      />
      {/* Left vignette — keeps text readable at all times */}
      <div className="absolute inset-0"
        className="hero-overlay-side" style={{ background: 'linear-gradient(to right, rgba(5,10,20,0.85) 0%, rgba(5,10,20,0.5) 40%, rgba(5,10,20,0.15) 70%, transparent 100%)' }}
      />

    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  SCROLL DOWN INDICATOR + SLIDE DOTS
//  Always visible — no scroll-based hiding (was causing it to
//  disappear on load when browser restores scroll position)
// ─────────────────────────────────────────────────────────────
function ScrollDown({ slideCount, currentSlide, onDotClick }) {
  const scrollTo = () => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
    >
      {/* Scroll label + bouncing chevrons */}
      <button
        type="button"
        onClick={scrollTo}
        className="flex flex-col items-center gap-1 group"
        aria-label="Scroll down"
      >
        <span
          className="text-[9px] uppercase tracking-[0.22em] font-semibold"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          Scroll
        </span>
        <div className="flex flex-col items-center" style={{ gap: -4 }}>
          {[0, 1].map(i => (
            <motion.div
              key={i}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown
                size={15}
                style={{
                  color: i === 0 ? 'rgba(201,168,76,0.75)' : 'rgba(201,168,76,0.35)',
                  marginTop: i === 0 ? 0 : -6,
                  display: 'block',
                }}
              />
            </motion.div>
          ))}
        </div>
      </button>

      {/* Slide dots — sit directly below the chevrons */}
      <div className="flex items-center gap-1.5 mt-1">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentSlide ? 18 : 6,
              height: 6,
              background: i === currentSlide ? '#C9A84C' : 'rgba(255,255,255,0.25)',
              boxShadow: i === currentSlide ? '0 0 8px rgba(201,168,76,0.7)' : 'none',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
//  REVIEW TICKER
// ─────────────────────────────────────────────────────────────
function ReviewTicker() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % REVIEWS.length), 4000)
    return () => clearInterval(id)
  }, [])
  const r = REVIEWS[idx]
  return (
    <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{ minHeight: 56, border: '1px solid rgba(201,168,76,0.12)' }}
      role="status" aria-live="polite"
    >
      {/* Stars */}
      <div className="flex gap-0.5 flex-shrink-0">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={10} style={{ color: '#e8c870', fill: '#e8c870' }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx}
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.28 }}
          className="flex-1 min-w-0"
        >
          <p className="text-xs leading-snug truncate" style={{ color: 'rgba(232,228,217,0.7)' }}>
            "{r.text}"
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: 'rgba(232,228,217,0.3)' }}>
            {r.owner} · {r.pet}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-1 flex-shrink-0">
        {REVIEWS.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: 5, height: 5, background: i === idx ? '#C9A84C' : 'rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  3D TILT CARD
// ─────────────────────────────────────────────────────────────
function TiltCard({ children, className, style }) {
  const ref = useRef()
  const sp  = { stiffness: 280, damping: 28 }
  const rX  = useSpring(0, sp)
  const rY  = useSpring(0, sp)

  const onMove  = useCallback((e) => {
    const r = ref.current.getBoundingClientRect()
    rX.set(-((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * 7)
    rY.set( ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * 7)
  }, [])
  const onLeave = useCallback(() => { rX.set(0); rY.set(0) }, [])

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
//  VET CARD
// ─────────────────────────────────────────────────────────────
function VetCard({ pet }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pet.id}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.28 }}
        className="glass rounded-2xl px-4 py-4 flex items-center gap-3"
        style={{ border: `1px solid ${pet.border}` }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: pet.bg, border: `1.5px solid ${pet.border}`, color: pet.accent }}>
          {pet.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-none mb-0.5 hero-card-text">{pet.vet}</p>
          <p className="text-xs leading-none mb-1" style={{ color: pet.accent }}>{pet.spec}</p>
          <p className="text-[10px] truncate" style={{ color: 'rgba(232,228,217,0.3)' }}>{pet.tagline}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-semibold" style={{ color: pet.accent }}>{pet.stat}</p>
          <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>experience</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─────────────────────────────────────────────────────────────
//  MOBILE FLOATING CTA
// ─────────────────────────────────────────────────────────────
function MobileCTA() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 100)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="lg:hidden fixed bottom-4 left-3 right-3 z-50"
        >
          <div className="glass rounded-2xl p-3 flex items-center gap-3 shadow-2xl"
            style={{ border: '1px solid rgba(201,168,76,0.22)' }}>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold hero-card-text">Next slot: Today · 2:30 PM</p>
              <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Dr. Htet Aung · Available now</p>
            </div>
            <Link to="/booking"
              className="btn-primary text-sm px-4 py-2.5 flex items-center gap-1.5 flex-shrink-0"
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

// ─────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────
export default function Hero() {
  const [pet, setPet] = useState(PETS[0])
  const [bgSlide, setBgSlide] = useState(0)

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col overflow-hidden bg-[#05080f]"
        aria-labelledby="hero-heading"
      >
        {/* ── Full-screen photo slideshow ── */}
        <HeroBg current={bgSlide} onDotClick={setBgSlide} />

        {/* ── Main content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-center"
          style={{ paddingTop: 'calc(4rem + 56px)', paddingBottom: '5rem' }}
        >
          <div className="max-w-7xl mx-auto w-full px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 items-center">

              {/* ══════════════════════════════
                  LEFT — always visible
              ══════════════════════════════ */}
              <div className="flex flex-col">

                {/* Live badge */}
                <motion.div
                  className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2 mb-6"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: '#C9A84C' }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#C9A84C' }} />
                  </span>
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: '#C9A84C' }}>
                    Yangon's Premier Pet Clinic
                  </span>
                </motion.div>

                {/* Headline */}
                <h1 id="hero-heading"
                  className="font-display leading-[1.03] mb-5"
                  style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
                >
                  {[
                    { text: 'Your Pet',  delay: 0.06 },
                    { text: 'Deserves', delay: 0.14 },
                  ].map(({ text, delay }) => (
                    <motion.span key={text} className="block hero-heading-text"
                      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.55 }}>
                      {text}
                    </motion.span>
                  ))}
                  <motion.span className="block gradient-text italic"
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.55 }}>
                    Exceptional
                  </motion.span>
                  <motion.span className="block hero-heading-text"
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.30, duration: 0.55 }}>
                    Care & Love
                  </motion.span>
                </h1>

                {/* Description */}
                <motion.p
                  className="text-base md:text-lg leading-relaxed mb-7"
                  style={{ color: 'rgba(232,228,217,0.62)', maxWidth: 460 }}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.5 }}
                >
                  Trusted by 3,200+ Yangon families. From routine wellness to complex surgeries — every paw, whisker, and feather matters deeply to us.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  className="flex items-center gap-3 mb-6 flex-wrap"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 }}
                >
                  <Link to="/booking"
                    className="btn-primary text-sm md:text-base px-7 py-3.5 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Book Appointment
                      <ArrowRight size={15}
                        className="group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </Link>
                  <a href="tel:+95123456789"
                    className="btn-ghost text-sm md:text-base px-6 py-3.5 flex items-center gap-2"
                  >
                    <Phone size={14} style={{ color: '#C9A84C' }} />
                    Call Us Now
                  </a>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-6"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.52 }}
                >
                  {[
                    { icon: <Shield size={11} />,   label: 'ISO Certified' },
                    { icon: <Star size={11} />,     label: 'Best Clinic 2024' },
                    { icon: <Clock size={11} />,    label: '24/7 Emergency' },
                    { icon: <Activity size={11} />, label: 'In-House Lab' },
                  ].map(b => (
                    <div key={b.label} className="flex items-center gap-1.5 text-xs"
                      style={{ color: 'rgba(232,228,217,0.38)' }}>
                      <span style={{ color: '#C9A84C' }}>{b.icon}</span>
                      {b.label}
                    </div>
                  ))}
                </motion.div>

                {/* Review ticker */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.60 }}
                >
                  <ReviewTicker />
                </motion.div>
              </div>

              {/* ══════════════════════════════
                  RIGHT — desktop only
              ══════════════════════════════ */}
              <motion.div
                className="hidden lg:flex flex-col gap-2.5"
                initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* Main tilt card */}
                <TiltCard
                  className="glass rounded-3xl p-5 overflow-hidden relative"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
                >
                  {/* Ambient tinted bg */}
                  <div className="absolute inset-0 pointer-events-none transition-all duration-700 rounded-3xl"
                    style={{ background: `radial-gradient(ellipse at 80% 0%, ${pet.bg} 0%, transparent 65%)` }}
                  />

                  {/* Clinic header */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <img src={LOGO_URI} alt="Mingalar Pet Clinic"
                        className="w-9 h-9 object-contain flex-shrink-0"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(201,168,76,0.45))' }}
                      />
                      <div>
                        <p className="font-display text-sm leading-none mb-0.5 hero-card-text">
                          Mingalar Pet Clinic
                        </p>
                        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                          Pyay Road · Est. 2010
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 flex-shrink-0"
                      style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.22)' }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
                      <span className="text-[10px] font-semibold" style={{ color: '#C9A84C' }}>Open Now</span>
                    </div>
                  </div>

                  {/* Pet selector */}
                  <div className="grid grid-cols-4 gap-2 mb-4 relative z-10">
                    {PETS.map((p, i) => {
                      const active = p.id === pet.id
                      return (
                        <motion.button key={p.id} type="button"
                          onClick={() => setPet(p)}
                          className="rounded-xl p-2.5 text-center transition-all duration-300"
                          style={{
                            background: active ? p.bg : 'rgba(255,255,255,0.03)',
                            border: `1.5px solid ${active ? p.border : 'rgba(255,255,255,0.06)'}`,
                            boxShadow: active ? `0 0 16px ${p.bg}` : 'none',
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.36 + i * 0.06 }}
                          aria-pressed={active}
                          aria-label={`${p.label} specialist`}
                        >
                          <div className="text-xl mb-1">{p.emoji}</div>
                          <div className="text-[10px] font-medium transition-colors duration-300"
                            style={{ color: active ? p.accent : 'rgba(255,255,255,0.32)' }}>
                            {p.label}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Stat pills */}
                  <div className="grid grid-cols-3 gap-2 relative z-10">
                    {[
                      { val: '3,200+', label: 'Pets / year',  color: '#C9A84C' },
                      { val: '12',     label: 'Expert vets',  color: '#e8c870' },
                      { val: '98%',    label: 'Satisfaction', color: '#b48aff' },
                    ].map(s => (
                      <div key={s.label} className="glass rounded-xl p-2.5 text-center"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="font-display text-lg font-bold mb-0.5" style={{ color: s.color }}>{s.val}</p>
                        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </TiltCard>

                {/* Dynamic vet card */}
                <VetCard pet={pet} />

                {/* Live count */}
                <motion.div className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
                  style={{ border: '1px solid rgba(201,168,76,0.1)' }}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.78 }}
                >
                  <Heart size={14} className="animate-pulse flex-shrink-0" style={{ color: '#C9A84C' }} />
                  <p className="flex-1 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Treating{' '}
                    <span className="font-bold" style={{ color: '#C9A84C' }}>7 pets</span>
                    {' '}in clinic right now
                  </p>
                  <Link to="/booking"
                    className="text-xs font-semibold flex items-center gap-1 flex-shrink-0 transition-colors"
                    style={{ color: '#C9A84C' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#C9A84C' }}
                  >
                    Book <ArrowRight size={11} />
                  </Link>
                </motion.div>

                {/* Next slot */}
                <motion.div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3"
                  style={{ border: '1px solid rgba(201,168,76,0.1)' }}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.86 }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)' }}>
                    📅
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold hero-card-text">Next available slot</p>
                    <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.33)' }}>
                      Today · 2:30 PM with {pet.vet}
                    </p>
                  </div>
                  <Link to="/booking"
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 flex-shrink-0">
                    Book <ChevronRight size={11} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* ── Scroll down indicator + slide dots ── */}
        <ScrollDown
          slideCount={BG_SLIDES.length}
          currentSlide={bgSlide}
          onDotClick={setBgSlide}
        />
      </section>

      {/* Mobile sticky CTA */}
      <MobileCTA />
    </>
  )
}

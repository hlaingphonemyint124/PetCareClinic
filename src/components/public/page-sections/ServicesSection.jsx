import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { DEMO_SERVICES } from '../../../lib/demoData'
import { useReveal, SectionHeader } from './shared'

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────
const SERVICE_INCLUDES = {
  1:  ['Full nose-to-tail physical', 'Digital health report', 'Personalized wellness plan'],
  2:  ['Core vaccines (DHPP/FVRCP)', 'Digital certificate', 'Reminder scheduling'],
  3:  ['CBC + chemistry panel', 'Same-day results', 'Vet interpretation'],
  4:  ['Full-body radiograph', 'Digital images included', 'Specialist review'],
  5:  ['Abdominal + cardiac scan', 'Real-time imaging', 'Report same day'],
  6:  ['Full scaling + polish', 'Pre-anesthetic bloodwork', 'Post-care instructions'],
  7:  ['Bath, blow-dry & trim', 'Nail clipping', 'Ear cleaning'],
  8:  ['Bath, blow-dry, full groom', 'Nail + ear care', 'De-shedding treatment'],
  9:  ['Private kennel stay', 'Twice-daily walks', 'Owner update photos'],
  10: ['Priority triage', '24/7 on-call vets', 'Intensive care support'],
  11: ['Pre-op blood panel', 'Full anesthesia monitoring', 'Pain management + follow-up'],
}

const SERVICE_IMAGES = {
  1:  'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1200',
  2:  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200',
  3:  'https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=1200',
  4:  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1200',
  5:  'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1200',
  6:  'https://images.unsplash.com/photo-1606818616326-93f9671c5eff?q=80&w=1200',
  7:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1200',
  8:  'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1200',
  9:  'https://images.unsplash.com/photo-1548767797-d8c844163c4a?q=80&w=1200',
  10: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200',
  11: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200',
}

// ─────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────
const AUTO_PLAY_MS  = 3500
const CHIP_H        = 60          // px per chip row

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// ─────────────────────────────────────────────────────────────
//  CARD — individual service card in the stack
// ─────────────────────────────────────────────────────────────
function ServiceCard({ svc, status, currentIndex, totalCount }) {
  const isActive = status === 'active'
  const isPrev   = status === 'prev'
  const isNext   = status === 'next'

  // Parallax tilt on hover (desktop only)
  const cardRef   = useRef(null)
  const rotateX   = useMotionValue(0)
  const rotateY   = useMotionValue(0)
  const brightness = useMotionValue(1)

  const handleMouseMove = (e) => {
    if (!isActive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    rotateX.set(-y * 10)
    rotateY.set( x * 10)
    brightness.set(1 + Math.abs(x) * 0.05)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    brightness.set(1)
  }

  const includes = SERVICE_INCLUDES[svc.id] || []

  return (
    <motion.div
      ref={cardRef}
      initial={false}
      animate={{
        x:       isActive ? 0 : isPrev ? '-38%' : isNext ? '38%' : 0,
        scale:   isActive ? 1 : (isPrev || isNext) ? 0.86 : 0.72,
        opacity: isActive ? 1 : (isPrev || isNext) ? 0.3  : 0,
        rotate:  isPrev ? -5 : isNext ? 5 : 0,
        zIndex:  isActive ? 20 : (isPrev || isNext) ? 10 : 0,
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        pointerEvents: isActive ? 'auto' : 'none',
        transformStyle: 'preserve-3d',
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 rounded-[2rem] overflow-hidden origin-center cursor-default"
      style={{
        border: '1.5px solid rgba(201,168,76,0.18)',
        background: '#07111e',
      }}
    >
      {/* ── Photo ── */}
      <motion.img
        src={SERVICE_IMAGES[svc.id]}
        alt={svc.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: isActive
            ? 'grayscale(0) brightness(0.82)'
            : 'grayscale(1) brightness(0.45) blur(3px)',
          transition: 'filter 0.6s ease',
        }}
      />

      {/* ── Full overlay gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(5,10,20,0.98) 0%, rgba(5,10,20,0.55) 45%, rgba(5,10,20,0.1) 100%)',
        }}
      />

      {/* ── Corner gold glow ── */}
      <div
        className="absolute top-0 left-0 w-40 h-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 0% 0%, rgba(201,168,76,0.18), transparent 70%)',
        }}
      />

      {/* ── TOP: live badge ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-6 left-6 flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: '#C9A84C',
                boxShadow: '0 0 10px rgba(201,168,76,0.9)',
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.25em]"
              style={{ color: 'rgba(232,228,217,0.65)', fontFamily: 'monospace' }}
            >
              Available Now
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TOP-RIGHT: counter ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-6 right-6 flex flex-col items-end"
          >
            <span
              className="font-display text-3xl font-bold leading-none"
              style={{ color: 'rgba(201,168,76,0.25)' }}
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              / {String(totalCount).padStart(2, '0')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM OVERLAY ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.38 }}
            className="absolute inset-x-0 bottom-0 p-6"
          >
            {/* Category pill */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.15em] mb-3"
              style={{
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C',
              }}
            >
              {svc.icon} &nbsp;{svc.category}
            </div>

            {/* Name */}
            <h3
              className="font-display text-white text-2xl md:text-3xl leading-tight mb-1.5"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
            >
              {svc.name}
            </h3>

            {/* Desc */}
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{ color: 'rgba(232,228,217,0.5)' }}
            >
              {svc.desc}
            </p>

            {/* ── What's Included (inside card) ── */}
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: 'rgba(11,22,40,0.75)',
                border: '1px solid rgba(201,168,76,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <p
                className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2.5"
                style={{ color: 'rgba(201,168,76,0.5)' }}
              >
                What's Included
              </p>
              <ul className="space-y-1.5">
                {includes.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: '#C9A84C' }}
                    />
                    <span
                      className="text-[11px] leading-snug"
                      style={{ color: 'rgba(232,228,217,0.6)' }}
                    >
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Price row + Book CTA */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-display text-2xl font-bold gradient-text">
                  ฿{svc.price.toLocaleString()}
                </span>
                <span
                  className="text-[11px] ml-2 px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(232,228,217,0.35)',
                  }}
                >
                  {svc.duration}
                </span>
              </div>

              <Link
                to="/booking"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 group"
                style={{
                  background: 'linear-gradient(135deg, #C9A84C, #e8c870)',
                  color: '#0B1628',
                  boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
                }}
              >
                Book Now
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
//  LEFT PANEL — vertical scrolling chips (desktop)
// ─────────────────────────────────────────────────────────────
function DesktopChipList({ services, currentIndex, onChipClick, onPause, onResume }) {
  return (
    <div
      className="hidden lg:flex w-[38%] flex-shrink-0 relative overflow-hidden"
      style={{
        background: 'rgba(8,16,32,0.97)',
        borderRight: '1px solid rgba(201,168,76,0.08)',
      }}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
    >
      {/* Top + bottom fades */}
      <div
        className="absolute inset-x-0 top-0 h-24 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(8,16,32,1) 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,16,32,1) 0%, transparent 100%)' }}
      />

      {/* Gold vertical accent line */}
      <div
        className="absolute left-8 top-1/3 bottom-1/3 w-px z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)',
        }}
      />

      {/* Left stat panel */}
      <div className="absolute bottom-8 left-8 right-8 z-20 pointer-events-none">
        <div
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(11,22,40,0.8)',
            border: '1px solid rgba(201,168,76,0.1)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { val: '11', label: 'Services' },
              { val: '4.9', label: 'Avg Rating' },
              { val: '2010', label: 'Est.' },
            ].map(({ val, label }) => (
              <div key={label}>
                <p
                  className="font-display text-lg font-bold leading-none mb-0.5 gradient-text"
                >
                  {val}
                </p>
                <p
                  className="text-[9px] uppercase tracking-widest"
                  style={{ color: 'rgba(232,228,217,0.3)' }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chips — absolutely positioned, spring animated */}
      <div className="relative w-full h-full flex items-center pl-14 pr-6">
        {services.map((svc, index) => {
          const isActive  = index === currentIndex
          const distance  = index - currentIndex
          const wrapped   = wrap(-(services.length / 2), services.length / 2, distance)
          const absW      = Math.abs(wrapped)

          return (
            <motion.div
              key={svc.id}
              className="absolute left-14 right-6"
              style={{ height: CHIP_H }}
              animate={{
                y:       wrapped * CHIP_H,
                opacity: Math.max(0, 1 - absW * 0.22),
              }}
              transition={{ type: 'spring', stiffness: 85, damping: 20 }}
            >
              <button
                onClick={() => onChipClick(index)}
                className="w-full flex items-center gap-3 py-3 px-5 rounded-full text-left transition-all duration-500 group"
                style={{
                  border: isActive
                    ? '1px solid rgba(201,168,76,0.65)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'rgba(201,168,76,0.1)'
                    : 'transparent',
                  color: isActive ? '#C9A84C' : 'rgba(232,228,217,0.4)',
                  boxShadow: isActive
                    ? '0 0 24px rgba(201,168,76,0.1), inset 0 0 20px rgba(201,168,76,0.04)'
                    : 'none',
                }}
              >
                <span className="text-base leading-none flex-shrink-0">{svc.icon}</span>
                <span
                  className="text-xs font-medium tracking-wide uppercase flex-1 truncate"
                  style={{ letterSpacing: '0.07em' }}
                >
                  {svc.name}
                </span>
                {isActive && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: 'rgba(201,168,76,0.18)',
                      color: '#e8c870',
                    }}
                  >
                    ฿{svc.price.toLocaleString()}
                  </span>
                )}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  MOBILE CHIP LIST — vertical rows (mirrors desktop left panel)
// ─────────────────────────────────────────────────────────────
function MobileChipRow({ services, currentIndex, onChipClick, onPause, onResume }) {
  const activeRef = useRef(null)

  // Scroll active item into view smoothly
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [currentIndex])

  return (
    <div
      className="flex lg:hidden flex-col w-full relative"
      style={{
        background: 'rgba(8,16,32,0.97)',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}
      onTouchStart={onPause}
      onTouchEnd={onResume}
    >
      {/* Top + bottom fades */}
      <div
        className="absolute inset-x-0 top-0 h-10 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(8,16,32,1), transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-10 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,16,32,1), transparent)' }}
      />

      {/* Scrollable list — max height so it doesn't take full screen */}
      <div
        className="overflow-y-auto py-3 px-4"
        style={{ maxHeight: 220, scrollbarWidth: 'none' }}
      >
        {services.map((svc, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={svc.id}
              ref={isActive ? activeRef : null}
              className="py-1"
            >
              <button
                onClick={() => onChipClick(index)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all duration-300"
                style={{
                  border: isActive
                    ? '1px solid rgba(201,168,76,0.65)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: isActive
                    ? 'rgba(201,168,76,0.1)'
                    : 'transparent',
                  color: isActive ? '#C9A84C' : 'rgba(232,228,217,0.4)',
                  boxShadow: isActive
                    ? '0 0 20px rgba(201,168,76,0.08)'
                    : 'none',
                }}
              >
                <span className="text-base leading-none flex-shrink-0">{svc.icon}</span>
                <span
                  className="text-xs font-medium uppercase flex-1 truncate"
                  style={{ letterSpacing: '0.07em' }}
                >
                  {svc.name}
                </span>
                {isActive && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: 'rgba(201,168,76,0.18)',
                      color: '#e8c870',
                    }}
                  >
                    ฿{svc.price.toLocaleString()}
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
//  MAIN SECTION
// ─────────────────────────────────────────────────────────────
export function ServicesSection() {
  const [ref, inView] = useReveal()
  const [step, setStep]         = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const SERVICES     = DEMO_SERVICES
  const count        = SERVICES.length
  const currentIndex = ((step % count) + count) % count

  const nextStep     = useCallback(() => setStep(p => p + 1), [])

  const handleChipClick = useCallback((index) => {
    const diff = (index - currentIndex + count) % count
    if (diff > 0) setStep(s => s + diff)
  }, [currentIndex, count])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setStep(p => p + 1)
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setStep(p => p - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Touch/swipe on the card area
  const touchStartX = useRef(null)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) setStep(p => p + (delta > 0 ? 1 : -1))
    touchStartX.current = null
  }

  // Autoplay
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(nextStep, AUTO_PLAY_MS)
    return () => clearInterval(id)
  }, [nextStep, isPaused])

  const getCardStatus = (index) => {
    let d = index - currentIndex
    if (d >  count / 2) d -= count
    if (d < -count / 2) d += count
    if (d === 0)  return 'active'
    if (d === -1) return 'prev'
    if (d === 1)  return 'next'
    return 'hidden'
  }

  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-bg-2 relative overflow-hidden"
      ref={ref}
    >
      {/* Subtle dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(201,168,76,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(201,168,76,0.04), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Trusted care since 2010"
            title="Complete Pet"
            highlight="Healthcare"
            subtitle="Comprehensive veterinary services with transparent pricing and genuine compassion."
          />
        </motion.div>

        {/* ── Main container ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border flex flex-col lg:flex-row"
          style={{
            borderColor: 'rgba(201,168,76,0.12)',
            background: 'rgba(7,12,22,0.85)',
            minHeight: 580,
          }}
        >

          {/* Mobile chip list (top, vertical) */}
          <MobileChipRow
            services={SERVICES}
            currentIndex={currentIndex}
            onChipClick={handleChipClick}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />

          {/* Desktop chip list (left) */}
          <DesktopChipList
            services={SERVICES}
            currentIndex={currentIndex}
            onChipClick={handleChipClick}
            onPause={() => setIsPaused(true)}
            onResume={() => setIsPaused(false)}
          />

          {/* ── RIGHT / BOTTOM: card stage ── */}
          <div
            className="flex-1 relative flex items-center justify-center overflow-hidden"
            style={{
              minHeight: 480,
              padding: '2rem 1.5rem',
              background: 'rgba(5,9,18,0.5)',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Card stage — fixed aspect ratio container */}
            <div
              className="relative w-full"
              style={{ maxWidth: 360, aspectRatio: '9/14' }}
            >
              {SERVICES.map((svc, index) => (
                <ServiceCard
                  key={svc.id}
                  svc={svc}
                  status={getCardStatus(index)}
                  currentIndex={currentIndex}
                  totalCount={count}
                />
              ))}
            </div>

            {/* Progress dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleChipClick(i)}
                  aria-label={`Go to service ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:  i === currentIndex ? 22 : 6,
                    height: 6,
                    background: i === currentIndex
                      ? '#C9A84C'
                      : 'rgba(255,255,255,0.15)',
                    boxShadow: i === currentIndex
                      ? '0 0 8px rgba(201,168,76,0.6)'
                      : 'none',
                  }}
                />
              ))}
            </div>

            {/* Keyboard hint (desktop only) */}
            <div
              className="absolute top-5 right-5 hidden lg:flex items-center gap-1.5 pointer-events-none"
            >
              {['↑', '↓'].map(k => (
                <kbd
                  key={k}
                  className="text-[10px] px-1.5 py-0.5 rounded"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.25)',
                    fontFamily: 'monospace',
                  }}
                >
                  {k}
                </kbd>
              ))}
              <span
                className="text-[10px]"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                navigate
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/services" className="btn-ghost px-8 py-3 w-full sm:w-auto text-center justify-center">
            View All {DEMO_SERVICES.length} Services →
          </Link>
          <Link to="/booking" className="btn-primary px-8 py-3 w-full sm:w-auto text-center justify-center">
            Book Appointment
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
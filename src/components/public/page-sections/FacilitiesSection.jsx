import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal, SectionHeader, COLOR_MAP } from './shared'

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────
const FACILITIES = [
  {
    id: 'lab',
    icon: '🔬',
    title: 'In-House Laboratory',
    desc: "Same-day CBC, chemistry, and urinalysis results. No waiting days for answers about your pet's health.",
    detail: 'Our in-house lab processes results within 30–60 minutes, enabling same-visit diagnosis and treatment. Equipment includes full haematology, biochemistry, and urinalysis analysers calibrated daily.',
    color: 'green',
    stat: '< 60 min',
    statLabel: 'Result turnaround',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?q=80&w=1200&fit=crop',
  },
  {
    id: 'xray',
    icon: '📡',
    title: 'Digital X-Ray Suite',
    desc: 'High-resolution digital radiography for bones, lungs, and abdominal organs — results in minutes.',
    detail: 'Our DR system delivers crystal-clear images with 70% less radiation than traditional film. Digital storage means instant sharing with specialists anywhere in the world.',
    color: 'blue',
    stat: '< 3 min',
    statLabel: 'Image delivery',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1200&fit=crop',
  },
  {
    id: 'ultrasound',
    icon: '🖥️',
    title: 'Ultrasound Imaging',
    desc: 'Real-time cardiac and abdominal imaging with board-certified interpretation on-site.',
    detail: 'A high-end ultrasound platform offering abdominal, cardiac (echocardiography), and musculoskeletal imaging. All scans are interpreted live by our on-site specialists.',
    color: 'purple',
    stat: 'Real-time',
    statLabel: 'Live imaging',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1200&fit=crop',
  },
  {
    id: 'surgery',
    icon: '⚕️',
    title: 'Sterile Surgery Suite',
    desc: 'HEPA-filtered operating theatre with full anaesthesia monitoring and recovery ward.',
    detail: 'ISO-standard positive-pressure operating room with laminar airflow. Every procedure includes multi-parameter anaesthesia monitoring, warm-air patient warming, and a dedicated post-op recovery suite.',
    color: 'amber',
    stat: 'ISO-standard',
    statLabel: 'Operating room',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&fit=crop',
  },
]

const AWARDS = [
  { icon: '🏆', label: 'Best Vet Clinic',  sub: 'Myanmar 2024' },
  { icon: '🎖',  label: 'ISO 9001:2015',   sub: 'Certified'    },
  { icon: '🌟', label: 'AAHA Accredited',  sub: 'Hospital'     },
  { icon: '💚', label: 'Green Clinic',     sub: 'Eco-Friendly' },
]

const SLIDE_MS = 5000

// ─────────────────────────────────────────────────────────────
//  FACILITIES SECTION
//  Single component — no context, no rAF, minimal state updates
//  The ONLY state is `activeIdx` (integer). It changes once
//  every 5 s via setTimeout (not setInterval, no double-fire).
//  The progress bar is a pure CSS animation — zero JS per frame.
// ─────────────────────────────────────────────────────────────
export function FacilitiesSection() {
  const [ref, inView]       = useReveal()
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)

  // ── Schedule next slide ──────────────────────────────────
  // Uses setTimeout (single-fire) so there's never a double
  // state update from setInterval + stale closures.
  const scheduleNext = useCallback((fromIdx) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActiveIdx(prev => (prev + 1) % FACILITIES.length)
    }, SLIDE_MS)
  }, [])

  // Restart timer whenever activeIdx changes
  useEffect(() => {
    scheduleNext(activeIdx)
    return () => clearTimeout(timerRef.current)
  }, [activeIdx, scheduleNext])

  const goTo = useCallback((i) => {
    if (i === activeIdx) return
    clearTimeout(timerRef.current)
    setActiveIdx(i)
    // scheduleNext fires via the useEffect above
  }, [activeIdx])

  const facility = FACILITIES[activeIdx]
  const c = COLOR_MAP[facility.color]

  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Single CSS keyframe for progress bar — injected once, no JS per frame */}
      <style>{`
        @keyframes fac-bar { from { width:0% } to { width:100% } }
        .fac-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px;
          width: 0%;
          animation: fac-bar var(--fac-dur, 5000ms) linear forwards;
        }
      `}</style>

      <section
        className="py-20 md:py-28 px-4 md:px-6 bg-bg relative overflow-hidden"
        ref={ref}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(rgba(201,168,76,0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px', opacity: 0.55,
        }} />
        {/* Gold glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 65% 45% at 50% 55%, rgba(201,168,76,0.05), transparent)',
        }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="State-of-the-art facility"
              title="Built for the"
              highlight="Best Care"
              subtitle="Advanced equipment and a purpose-built clinic designed around your pet's comfort and safety."
            />
          </motion.div>

          {/* ── Main slider card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[2rem] overflow-hidden"
            style={{ border: '1px solid rgba(201,168,76,0.14)' }}
          >

            {/* ── IMAGE STAGE ── */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: 'clamp(240px, 42vw, 500px)' }}
            >
              {/* All images stacked — CSS opacity transition, no layout shift */}
              {FACILITIES.map((f, i) => {
                const isActive = i === activeIdx
                const fc = COLOR_MAP[f.color]
                return (
                  <div
                    key={f.id}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                    aria-hidden={!isActive}
                  >
                    {/* Photo */}
                    <img
                      src={f.image}
                      alt={f.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: 'brightness(0.52)' }}
                      draggable={false}
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: 'linear-gradient(to top, rgba(5,10,20,0.97) 0%, rgba(5,10,20,0.46) 48%, transparent 100%)',
                    }} />
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: 'linear-gradient(to right, rgba(5,10,20,0.48) 0%, transparent 60%)',
                    }} />

                    {/* Gold corner accent */}
                    <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none" style={{
                      background: 'radial-gradient(circle at 0% 0%, rgba(201,168,76,0.15), transparent 65%)',
                    }} />

                    {/* Stat badge — top right */}
                    <div
                      className="absolute top-4 right-4 md:top-6 md:right-6 rounded-2xl px-3 py-2.5 md:px-4 md:py-3 text-right"
                      style={{
                        background: 'rgba(7,12,22,0.82)',
                        border: `1px solid ${fc.border}`,
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    >
                      <p className="font-display text-lg md:text-2xl font-bold leading-none" style={{ color: fc.text }}>
                        {f.stat}
                      </p>
                      <p className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(232,228,217,0.4)' }}>
                        {f.statLabel}
                      </p>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 inset-x-0 p-4 md:p-8">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] mb-2"
                        style={{ background: fc.bg, border: `1px solid ${fc.border}`, color: fc.text }}
                      >
                        <span>{f.icon}</span>{f.title}
                      </div>
                      <p
                        className="text-sm md:text-[15px] leading-relaxed max-w-xl"
                        style={{ color: 'rgba(232,228,217,0.65)' }}
                      >
                        {f.detail}
                      </p>
                    </div>
                  </div>
                )
              })}

              {/* Shimmer — only on active change, pure CSS */}
              <AnimatePresence>
                <motion.div
                  key={`shimmer-${activeIdx}`}
                  initial={{ x: '-110%' }}
                  animate={{ x: '320%' }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute inset-y-0 w-1/3 pointer-events-none z-20"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)',
                    transform: 'skewX(-12deg)',
                  }}
                />
              </AnimatePresence>
            </div>

            {/* ── BUTTON STRIP ── */}
            <div
              className="grid grid-cols-2 md:grid-cols-4"
              style={{
                background: 'rgba(6,11,22,0.98)',
                borderTop: '1px solid rgba(201,168,76,0.1)',
              }}
            >
              {FACILITIES.map((f, i) => {
                const isActive = i === activeIdx
                const fc = COLOR_MAP[f.color]
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={[
                      'relative text-left transition-colors duration-300 group p-4 md:p-6',
                      i < 2 ? 'border-b md:border-b-0' : '',
                      i % 2 === 0 ? 'border-r' : 'md:border-r',
                      'last:border-r-0',
                    ].join(' ')}
                    style={{
                      borderColor: 'rgba(255,255,255,0.05)',
                      opacity: isActive ? 1 : 0.52,
                      background: isActive ? 'rgba(201,168,76,0.03)' : 'transparent',
                    }}
                  >
                    {/* Active top bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                      style={{
                        background: fc.text,
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    {/* CSS progress bar — key forces restart on active change */}
                    {isActive && (
                      <div
                        key={`bar-${activeIdx}-${i}`}
                        className="fac-bar"
                        style={{
                          '--fac-dur': `${SLIDE_MS}ms`,
                          background: fc.text,
                        }}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-lg mb-2.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: fc.bg, border: `1px solid ${fc.border}` }}
                    >
                      {f.icon}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xs md:text-sm font-semibold mb-1 leading-tight"
                      style={{ color: isActive ? '#fff' : 'rgba(232,228,217,0.75)' }}
                    >
                      {f.title}
                    </h3>

                    {/* Desc */}
                    <p
                      className="text-[11px] md:text-xs leading-relaxed line-clamp-2"
                      style={{ color: 'rgba(232,228,217,0.35)' }}
                    >
                      {f.desc}
                    </p>
                  </button>
                )
              })}
            </div>

          </motion.div>

          {/* ── Awards strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {AWARDS.map(({ icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3 cursor-default transition-all duration-300"
                style={{ border: '1px solid rgba(201,168,76,0.08)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.08)' }}
              >
                <span className="text-xl md:text-2xl flex-shrink-0">{icon}</span>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{label}</p>
                  <p className="text-[10px] truncate" style={{ color: 'rgba(232,228,217,0.3)' }}>{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}

export default FacilitiesSection

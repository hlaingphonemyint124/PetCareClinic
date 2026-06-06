import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Calendar, GraduationCap, Award } from 'lucide-react'
import { DEMO_VETS } from '../../../lib/demoData'
import { useReveal, SectionHeader, COLOR_MAP } from './shared'

const VET_IMAGES = {
  1: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&fit=crop',
  2: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&fit=crop',
  3: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=800&fit=crop',
  4: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&fit=crop',
}

function StarRating({ rating, color }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12}
          fill={i < Math.floor(rating) ? color : 'transparent'}
          stroke={i < Math.floor(rating) ? color : 'var(--border-subtle)'} />
      ))}
    </div>
  )
}

function getCardTransform(index, activeIndex, total, containerW) {
  const gap = Math.min(Math.max(containerW * 0.14, 60), 110)
  const stickUp = gap * 0.75
  let d = index - activeIndex
  if (d >  total / 2) d -= total
  if (d < -total / 2) d += total
  const isActive = d === 0
  const isLeft   = d === -1
  const isRight  = d === 1
  if (isActive) return { zIndex: 3, opacity: 1, pointerEvents: 'auto', transform: 'translateX(0px) translateY(0px) scale(1) rotateY(0deg)', transition: 'all 0.75s cubic-bezier(.4,2,.3,1)' }
  if (isLeft)   return { zIndex: 2, opacity: 1, pointerEvents: 'auto', transform: `translateX(-${gap}px) translateY(-${stickUp}px) scale(0.84) rotateY(14deg)`, transition: 'all 0.75s cubic-bezier(.4,2,.3,1)' }
  if (isRight)  return { zIndex: 2, opacity: 1, pointerEvents: 'auto', transform: `translateX(${gap}px) translateY(-${stickUp}px) scale(0.84) rotateY(-14deg)`, transition: 'all 0.75s cubic-bezier(.4,2,.3,1)' }
  return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.75s cubic-bezier(.4,2,.3,1)' }
}

export function VetsSection() {
  const [ref, inView]       = useReveal()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [containerW, setContainerW] = useState(600)

  const stageRef    = useRef(null)
  const intervalRef = useRef(null)
  const touchStartX = useRef(null)

  const vets  = DEMO_VETS
  const count = vets.length
  const vet   = vets[active]
  const c     = COLOR_MAP[vet.color] || COLOR_MAP.green

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth))
    ro.observe(el)
    setContainerW(el.offsetWidth)
    return () => ro.disconnect()
  }, [])

  const goNext = useCallback(() => setActive(p => (p + 1) % count), [count])
  const goPrev = useCallback(() => setActive(p => (p - 1 + count) % count), [count])

  useEffect(() => {
    if (paused) { clearTimeout(intervalRef.current); return }
    intervalRef.current = setTimeout(goNext, 4500)
    return () => clearTimeout(intervalRef.current)
  }, [active, paused, goNext])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  { goPrev(); clearInterval(intervalRef.current) }
      if (e.key === 'ArrowRight') { goNext(); clearInterval(intervalRef.current) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const onTouchStart = (e) => { touchStartX.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd   = (e) => {
    if (!touchStartX.current) return
    const dx = touchStartX.current.x - e.changedTouches[0].clientX
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartX.current.y)
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy * 1.5) { dx > 0 ? goNext() : goPrev(); clearInterval(intervalRef.current) }
    touchStartX.current = null
  }

  const handleArrow = (dir) => { clearInterval(intervalRef.current); dir === 'next' ? goNext() : goPrev() }

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-bg-1 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,168,76,0.05), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(201,168,76,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader eyebrow="Your pet's health team" title="Meet Our" highlight="Veterinarians" subtitle="Specialists who bring expertise, empathy, and a genuine love for animals." />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

          {/* LEFT: 3D Fan card stage */}
          <div className="w-full lg:w-[52%] flex-shrink-0" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div ref={stageRef} className="relative mx-auto" style={{ width: '100%', maxWidth: 420, height: 460, perspective: '1200px' }}>
              {vets.map((v, i) => {
                const cardStyle = getCardTransform(i, active, count, containerW)
                const cc = COLOR_MAP[v.color] || COLOR_MAP.green
                return (
                  <div key={v.id} onClick={() => { setActive(i); clearInterval(intervalRef.current) }}
                    className="absolute inset-0 rounded-[2rem] overflow-hidden cursor-pointer select-none vet-photo-card"
                    style={{ ...cardStyle, border: '1.5px solid var(--border-gold)', background: 'var(--card-inner-bg)' }}>
                    <img src={VET_IMAGES[v.id]} alt={v.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      style={{ filter: i === active ? 'brightness(0.8) grayscale(0)' : 'brightness(0.45) grayscale(0.6)', transition: 'filter 0.6s ease' }} />
                    {/* Theme-aware gradient overlay */}
                    <div className="absolute inset-0 vet-gradient-overlay"
                      style={{ background: 'linear-gradient(to top, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.4) 50%, transparent 100%)' }} />

                    {i === active && (
                      <div className="absolute top-5 left-5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cc.text, boxShadow: `0 0 8px ${cc.text}` }} />
                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono" style={{ color: 'rgba(232,228,217,0.7)' }}>Available</span>
                      </div>
                    )}
                    {i === active && (
                      <div className="absolute top-5 right-5">
                        <span className="font-display text-3xl font-bold" style={{ color: 'rgba(201,168,76,0.2)' }}>{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    )}
                    {i === active && (
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-2"
                          style={{ background: cc.bg, border: `1px solid ${cc.border}`, color: cc.text }}>{v.spec}</div>
                        <h3 className="font-display text-xl font-semibold leading-tight mb-1 photo-card-title"
                          style={{ color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>{v.name}</h3>
                        <div className="flex items-center gap-2">
                          <StarRating rating={v.rating} color={cc.text} />
                          <span className="text-[11px] photo-card-meta" style={{ color: 'rgba(232,228,217,0.4)' }}>{v.rating} · {v.reviews} reviews</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center gap-2 mt-5">
              {vets.map((_, i) => (
                <button key={i} onClick={() => { setActive(i); clearInterval(intervalRef.current) }}
                  aria-label={`View vet ${i + 1}`} className="rounded-full transition-all duration-300"
                  style={{ width: i === active ? 24 : 7, height: 7, background: i === active ? '#C9A84C' : 'var(--border-subtle)', boxShadow: i === active ? '0 0 8px rgba(201,168,76,0.6)' : 'none' }} />
              ))}
            </div>
          </div>

          {/* RIGHT: animated vet info */}
          <div className="w-full lg:flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.38, ease: 'easeOut' }} className="flex flex-col gap-6">

                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                    style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                    <Award size={10} />{vet.spec}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>{vet.name}</h2>
                  <div className="flex items-center flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <StarRating rating={vet.rating} color={c.text} />
                      <span className="text-sm font-semibold" style={{ color: c.text }}>{vet.rating}</span>
                      <span className="text-sm" style={{ color: 'var(--text-faint)' }}>({vet.reviews} reviews)</span>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      {vet.exp} experience
                    </span>
                  </div>
                </div>

                <div className="gold-divider" />

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <GraduationCap size={15} style={{ color: c.text }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--info-label-color)' }}>Education</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{vet.edu}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <Calendar size={15} style={{ color: c.text }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--info-label-color)' }}>Available Days</p>
                    <div className="flex gap-2 flex-wrap">
                      {vet.days.split(' ').map(day => (
                        <span key={day} className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>{day}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--info-label-color)' }}>Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {vet.tags.map((tag, ti) => (
                      <motion.span key={tag} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: ti * 0.06 }}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{ background: 'var(--bg-hover)', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}>
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <Link to="/booking" className="btn-primary px-7 py-3">Book with {vet.name.split(' ')[1]}</Link>
                  <div className="flex items-center gap-2 ml-auto">
                    <button onClick={() => handleArrow('prev')} aria-label="Previous vet"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 nav-arrow-btn"
                      style={{ background: 'var(--arrow-btn-bg)', border: '1px solid var(--arrow-btn-border)', color: 'var(--arrow-btn-color)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.text }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--arrow-btn-bg)'; e.currentTarget.style.borderColor = 'var(--arrow-btn-border)'; e.currentTarget.style.color = 'var(--arrow-btn-color)' }}>
                      <ChevronLeft size={17} />
                    </button>
                    <button onClick={() => { clearInterval(intervalRef.current); goNext() }} aria-label="Next vet"
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 nav-arrow-btn"
                      style={{ background: 'var(--arrow-btn-bg)', border: '1px solid var(--arrow-btn-border)', color: 'var(--arrow-btn-color)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.text }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--arrow-btn-bg)'; e.currentTarget.style.borderColor = 'var(--arrow-btn-border)'; e.currentTarget.style.color = 'var(--arrow-btn-color)' }}>
                      <ChevronRight size={17} />
                    </button>
                    <span className="text-xs font-mono ml-1" style={{ color: 'var(--text-faint)' }}>
                      {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VetsSection

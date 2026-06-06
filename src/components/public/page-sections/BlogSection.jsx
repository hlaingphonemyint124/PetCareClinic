import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, Clock, User } from 'lucide-react'
import { DEMO_BLOG } from '../../../lib/demoData'
import { useReveal } from './shared'

const POST_IMAGES = {
  1: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=1400&fit=crop',
  2: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1400&fit=crop',
  3: 'https://images.unsplash.com/photo-1606818616326-93f9671c5eff?q=80&w=1400&fit=crop',
  4: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?q=80&w=1400&fit=crop',
  5: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1400&fit=crop',
  6: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1400&fit=crop',
}

function wrap(min, max, v) {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

function BlogSlider({ posts }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const count    = posts.length
  const activeIdx = wrap(0, count, active)
  const post     = posts[activeIdx]

  const touchRef = useRef(null)
  const onTouchStart = (e) => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd   = (e) => {
    if (!touchRef.current) return
    const dx = touchRef.current.x - e.changedTouches[0].clientX
    const dy = Math.abs(e.changedTouches[0].clientY - touchRef.current.y)
    if (Math.abs(dx) > 44 && Math.abs(dx) > dy * 1.5) { dx > 0 ? setActive(p => p + 1) : setActive(p => p - 1) }
    touchRef.current = null
  }

  const goPrev = () => setActive(p => p - 1)
  const goNext = () => setActive(p => p + 1)

  return (
    <div className="relative overflow-hidden rounded-[2rem] cursor-pointer group blog-slider-frame"
      style={{ height: 'clamp(380px, 55vw, 580px)', border: '1px solid var(--border-gold)' }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      onClick={() => navigate(`/blog/${post.id}`)}>

      {/* All images stacked */}
      {posts.map((p, i) => (
        <div key={p.id} className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === activeIdx ? 1 : 0 }} aria-hidden={i !== activeIdx}>
          <motion.img src={POST_IMAGES[p.id]} alt={p.title}
            className="absolute inset-0 w-full h-full object-cover blog-img-overlay"
            style={{ filter: 'brightness(0.62)' }}
            animate={i === activeIdx ? { scale: 1.04 } : { scale: 1 }}
            transition={{ duration: 6, ease: 'linear' }} draggable={false} />
          <div className="absolute inset-0 pointer-events-none blog-gradient-overlay"
            style={{ background: 'linear-gradient(to top, rgba(5,10,20,0.97) 0%, rgba(5,10,20,0.35) 50%, transparent 100%)' }} />
          <div className="absolute inset-0 pointer-events-none blog-gradient-overlay-side"
            style={{ background: 'linear-gradient(to right, rgba(5,10,20,0.5) 0%, transparent 55%)' }} />
        </div>
      ))}

      {/* Gold corner glow */}
      <div className="absolute top-0 left-0 w-80 h-80 pointer-events-none z-10"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(201,168,76,0.14), transparent 65%)' }} />

      {/* Shimmer */}
      <AnimatePresence>
        <motion.div key={`shimmer-${activeIdx}`}
          initial={{ x: '-110%' }} animate={{ x: '320%' }} transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-y-0 w-1/3 pointer-events-none z-20"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.055), transparent)', transform: 'skewX(-12deg)' }} />
      </AnimatePresence>

      {/* Bottom content overlay */}
      <div className="absolute inset-x-0 bottom-0 z-30 px-6 md:px-10 pb-6 md:pb-10">
        <AnimatePresence mode="wait">
          <motion.div key={post.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.38, ease: 'easeOut' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
              style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
              {post.category}
              <span style={{ color: 'rgba(201,168,76,0.4)' }}>·</span>
              <Clock size={9} />
              {post.readTime}
            </div>
            <h3 className="font-display text-2xl md:text-4xl font-semibold leading-tight mb-2 max-w-2xl group-hover:text-[#e8c870] transition-colors duration-300"
              style={{ color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>{post.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                <User size={11} />{post.author}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{post.date}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #e8c870)', color: '#0B1628', boxShadow: '0 4px 20px rgba(201,168,76,0.35)' }}>
                Read Article <ArrowUpRight size={14} />
              </span>
              <div className="flex items-center gap-1 rounded-full p-1"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', backdropFilter: 'blur(16px)' }}
                onClick={e => e.stopPropagation()}>
                <button type="button" onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="rounded-full p-2 transition-all duration-200" style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  aria-label="Previous"><ChevronLeft size={15} /></button>
                <span className="min-w-[32px] text-center text-[11px] font-mono" style={{ color: 'var(--text-faint)' }}>
                  {activeIdx + 1} / {count}
                </span>
                <button type="button" onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="rounded-full p-2 transition-all duration-200" style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)' }}
                  aria-label="Next"><ChevronRight size={15} /></button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right dot indicators */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30"
        onClick={e => e.stopPropagation()}>
        {posts.map((_, i) => (
          <button key={i} type="button" onClick={(e) => { e.stopPropagation(); setActive(i) }}
            aria-label={`Go to post ${i + 1}`} className="rounded-full transition-all duration-300"
            style={{ width: 6, height: i === activeIdx ? 22 : 6, background: i === activeIdx ? '#C9A84C' : 'rgba(255,255,255,0.2)', boxShadow: i === activeIdx ? '0 0 8px rgba(201,168,76,0.7)' : 'none' }} />
        ))}
      </div>

      {/* Hover overlay hint */}
      <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{ background: 'rgba(201,168,76,0.03)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2rem' }} />
    </div>
  )
}

export function BlogSection() {
  const [ref, inView] = useReveal()
  const posts = DEMO_BLOG.filter(b => b.published)

  return (
    <section className="py-20 md:py-28 px-4 md:px-6 bg-bg-2 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(rgba(201,168,76,0.08) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 60%, rgba(201,168,76,0.04), transparent)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
              <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--gold)' }}>Pet health insights</span>
              <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
            </div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)]" style={{ color: 'var(--text-primary)' }}>
              Latest Pet Care <span className="gradient-text italic">Tips</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link to="/blog" className="btn-ghost py-2.5 text-sm">All Articles →</Link>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
          <BlogSlider posts={posts} />
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection

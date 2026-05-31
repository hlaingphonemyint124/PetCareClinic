import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DEMO_BLOG } from '../../../lib/demoData'
import { useReveal } from './shared'

export function BlogSection() {
  const [ref, inView] = useReveal()
  const posts = DEMO_BLOG.filter(b => b.published).slice(0, 3)

  return (
    <section className="py-28 px-6 bg-bg-2" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.14em] uppercase">Pet health insights</span>
              <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
            </div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white">
              Latest Pet Care <span className="gradient-text italic">Tips</span>
            </h2>
          </motion.div>
          <Link to="/blog" className="btn-ghost py-2.5 text-sm">All Articles →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((b, i) => (
            <motion.div key={b.id}
              className="glass rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}>
              <div className="h-44 bg-gradient-to-br from-bg-3 to-bg relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07), transparent)' }} />
                <span className="text-6xl group-hover:scale-110 transition-transform duration-500 relative z-10">{b.emoji}</span>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[#C9A84C] text-[10px] font-bold tracking-wider uppercase bg-bg/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#C9A84C]/20">
                    {b.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-[#C9A84C] transition-colors duration-200">{b.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-white/25">
                    <span>{b.author}</span><span>·</span><span>{b.date}</span>
                  </div>
                  <span className="text-[11px] text-white/25 bg-white/[0.04] px-2 py-0.5 rounded-full">{b.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

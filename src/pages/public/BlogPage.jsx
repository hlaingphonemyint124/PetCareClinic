import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import { Footer } from '../../components/public/page-sections'
import { DEMO_BLOG } from '../../lib/demoData'
import clsx from 'clsx'

export function BlogPage() {
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(DEMO_BLOG.map(b => b.category))]
  const filtered = cat === 'All' ? DEMO_BLOG : DEMO_BLOG.filter(b => b.category === cat)

  return (
    <div className="min-h-screen bg-bg-1">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }}>
            <div className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color:'var(--gold)' }}>Knowledge Base</div>
            <h1 className="font-display text-5xl mb-4" style={{ color:'var(--text-primary)' }}>
              Pet Care <span className="gradient-text italic">Blog</span>
            </h1>
          </motion.div>

          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {cats.map(c => (
              <button key={c} type="button" onClick={() => setCat(c)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: cat===c ? 'var(--gold)' : 'var(--tab-inactive-bg)',
                  color: cat===c ? '#0B1628' : 'var(--tab-inactive-color)',
                  border: `1px solid ${cat===c ? 'var(--gold)' : 'var(--tab-inactive-border)'}`,
                }}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b, i) => (
              <Link key={b.id} to={`/blog/${b.id}`}>
                <motion.div
                  className="rounded-2xl overflow-hidden group cursor-pointer vet-card-3d liquid-glass"
                  initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.07 }}
                  style={{ border:'1px solid var(--border-subtle)' }}>
                  <div className="h-44 flex items-center justify-center text-6xl relative overflow-hidden"
                    style={{ background:'var(--bg-2)' }}>
                    <span className="group-hover:scale-110 transition-transform duration-500">{b.emoji}</span>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color:'var(--gold)' }}>{b.category}</div>
                    <h3 className="font-semibold text-sm leading-snug mb-3 transition-colors group-hover:text-[var(--gold)]"
                      style={{ color:'var(--text-primary)' }}>{b.title}</h3>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color:'var(--text-faint)' }}>
                      <span>{b.author}</span><span>·</span><span>{b.date}</span><span>·</span><span>{b.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

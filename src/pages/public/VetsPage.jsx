import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import { DEMO_VETS } from '../../lib/demoData'

export function VetsPage() {
  const COLORS = ['#C9A84C','#7eb5ff','#e8c870','#c4a0ff']
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-1)' }}>
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }}>
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color:'var(--gold)' }}>Our Specialists</div>
            <h1 className="font-display text-5xl mb-4" style={{ color:'var(--text-primary)' }}>
              Meet Our <span className="gradient-text">Doctors</span>
            </h1>
            <p className="text-sm max-w-xl mx-auto" style={{ color:'var(--text-muted)' }}>
              Board-certified veterinary specialists committed to providing the highest standard of care in Myanmar.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {DEMO_VETS.map((v,i) => {
              const color = COLORS[i % COLORS.length]
              return (
                <motion.div key={v.id} initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }}
                  className="vet-card-3d p-7 rounded-3xl liquid-glass"
                  style={{ border:`1px solid ${color}30` }}>
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-base font-bold flex-shrink-0"
                      style={{ background:`${color}18`, border:`1px solid ${color}35`, color, fontSize:'11px', letterSpacing:'0.05em' }}>
                      {v.name.split(' ').slice(1,3).map(n=>n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl mb-1" style={{ color:'var(--text-primary)' }}>{v.name}</h3>
                      <div className="text-sm font-medium mb-2" style={{ color }}>{v.spec}</div>
                      <div className="flex items-center gap-4 text-xs" style={{ color:'var(--text-muted)' }}>
                        <span>⭐ {v.rating} ({v.reviews} reviews)</span>
                        <span>·</span>
                        <span>{v.exp} experience</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mb-4 leading-relaxed" style={{ color:'var(--text-muted)' }}>{v.tagline}</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {v.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background:`${color}12`, color:`${color}cc` }}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4" style={{ borderTop:`1px solid ${color}20` }}>
                    <div className="text-xs" style={{ color:'var(--text-muted)' }}>{v.days}</div>
                    <Link to="/booking" className="text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
                      style={{ background:`${color}18`, color, border:`1px solid ${color}30` }}>
                      Book Appointment →
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div className="mt-14 p-8 rounded-3xl liquid-glass" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ border:'1px solid var(--border-gold)' }}>
            <h3 className="font-display text-2xl text-center mb-8" style={{ color:'var(--text-primary)' }}>Academic Credentials</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEMO_VETS.map((v) => (
                <div key={v.id} className="text-center p-4 rounded-xl"
                  style={{ background:'var(--card-overlay-bg)', border:'1px solid var(--border-gold)' }}>
                  <div className="text-xs font-semibold mb-1" style={{ color:'var(--text-primary)' }}>{v.name.replace('Dr. ','')}</div>
                  <div className="text-xs" style={{ color:'var(--text-muted)' }}>{v.edu}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

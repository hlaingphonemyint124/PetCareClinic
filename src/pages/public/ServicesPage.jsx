import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import { DEMO_SERVICES } from '../../lib/demoData'

const CATS = ['all','consultation','vaccination','diagnostics','dental','grooming','boarding','surgery','emergency']

export function ServicesPage() {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? DEMO_SERVICES : DEMO_SERVICES.filter(s => s.category === cat)

  const fmt = (n) => n >= 1000 ? `${(n/1000).toFixed(0)}K` : n

  return (
    <div className="min-h-screen" style={{background:'#07101e'}}>
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{color:'#C9A84C'}}>What We Offer</div>
            <h1 className="font-display text-5xl text-white mb-4">Our <span style={{color:'#C9A84C'}}>Services</span></h1>
            <p className="text-sm max-w-xl mx-auto" style={{color:'rgba(232,228,217,0.45)'}}>
              From routine checkups to advanced surgery — comprehensive veterinary care in Yangon.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200"
                style={{
                  background: cat===c ? '#C9A84C' : 'rgba(11,22,40,0.6)',
                  color: cat===c ? '#0B1628' : 'rgba(232,228,217,0.5)',
                  border: `1px solid ${cat===c ? '#C9A84C' : 'rgba(201,168,76,0.15)'}`,
                }}>
                {c}
              </button>
            ))}
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s,i) => (
              <motion.div key={s.id}
                initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                className="p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300"
                style={{background:'rgba(11,22,40,0.7)',border:'1px solid rgba(201,168,76,0.12)'}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{s.icon}</div>
                  <div className="text-right">
                    <div className="font-display text-lg font-semibold" style={{color:'#C9A84C'}}>{fmt(s.price)} MMK</div>
                    <div className="text-xs" style={{color:'rgba(232,228,217,0.35)'}}>{s.duration}</div>
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-1">{s.name}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{color:'rgba(232,228,217,0.45)'}}>{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full capitalize font-medium"
                    style={{background:'rgba(201,168,76,0.1)',color:'rgba(201,168,76,0.8)'}}>
                    {s.category}
                  </span>
                  <Link to="/booking" className="text-xs font-semibold transition-colors hover:underline"
                    style={{color:'#C9A84C'}}>Book →</Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Emergency CTA */}
          <motion.div className="mt-16 p-8 rounded-3xl text-center" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
            style={{background:'linear-gradient(135deg,rgba(201,168,76,0.12) 0%,rgba(77,130,201,0.08) 100%)',border:'1px solid rgba(201,168,76,0.2)'}}>
            <div className="text-3xl mb-3">🚑</div>
            <h3 className="font-display text-2xl text-white mb-2">24/7 Emergency Care</h3>
            <p className="text-sm mb-6" style={{color:'rgba(232,228,217,0.5)'}}>Pet emergencies don't wait. Call us anytime.</p>
            <a href="tel:+959111-99999" className="btn-primary text-sm py-3 px-8">Call Emergency Line: 09-111-99999</a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

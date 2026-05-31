import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import { LOGO_URI } from '../../lib/logoData'

const VETS = [
  { name: 'Dr. Htet Aung Kyaw', spec: 'Internal Medicine & Cardiology', exp: '15 yrs', edu: 'University of Veterinary Science, Yangon', initials: 'HA', color: '#C9A84C' },
  { name: 'Dr. Khin May Soe', spec: 'Surgery & Oncology', exp: '12 yrs', edu: 'University of Veterinary Science, Yangon, DVM + PhD', initials: 'KM', color: '#7eb5ff' },
  { name: 'Dr. Kyaw Thu Zin', spec: 'Exotic & Avian Animals', exp: '8 yrs', edu: 'Yezin Agricultural University, DVM', initials: 'KT', color: '#e8c870' },
  { name: 'Dr. Aye Myat Noe', spec: 'Dermatology & Nutrition', exp: '10 yrs', edu: 'University of Veterinary Science, Nay Pyi Taw', initials: 'AM', color: '#c4a0ff' },
]

const MILESTONES = [
  { year: '2010', event: 'Clinic founded on Pyay Road, Kamayut Township' },
  { year: '2013', event: 'Expanded to full surgical suite & in-house laboratory' },
  { year: '2017', event: 'Added exotic animal & avian specialist services' },
  { year: '2020', event: 'Launched 24/7 emergency care wing' },
  { year: '2023', event: 'Digital health records & patient portal launched' },
  { year: '2026', event: 'Serving 3,200+ patients across Greater Yangon' },
]

export function AboutPage() {
  return (
    <div className="min-h-screen" style={{background:'#07101e'}}>
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero */}
          <motion.div className="text-center mb-20" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{color:'#C9A84C'}}>Our Story</div>
            <h1 className="font-display text-5xl md:text-6xl text-white mb-6">
              Compassionate Care<br/><span style={{color:'#C9A84C'}}>Since 2010</span>
            </h1>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{color:'rgba(232,228,217,0.5)'}}>
              Founded in Yangon's Kamayut Township, Mingalar Pet Clinic has grown from a small neighbourhood practice to one of Myanmar's most trusted veterinary centres — all while keeping the same family spirit.
            </p>
          </motion.div>

          {/* Logo + mission */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
            <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <div className="flex items-center justify-center p-10 rounded-3xl" style={{background:'rgba(11,22,40,0.7)',border:'1px solid rgba(201,168,76,0.15)'}}>
                <img src={LOGO_URI} alt="Mingalar Pet Clinic" className="w-64 h-64 object-contain" style={{filter:"drop-shadow(0 0 30px rgba(201,168,76,0.5))"}} />
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
              <h2 className="font-display text-3xl text-white mb-5">Our Mission</h2>
              <p className="leading-relaxed mb-5" style={{color:'rgba(232,228,217,0.55)'}}>
                We believe every animal deserves gold-standard medical care delivered with warmth and dignity. Our team combines the latest veterinary science with genuine compassion — treating every patient as if they were our own.
              </p>
              <p className="leading-relaxed mb-8" style={{color:'rgba(232,228,217,0.55)'}}>
                From routine wellness checks to complex surgeries, we bring the same level of excellence and care to every visit, building lifelong relationships with Yangon's pet families.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[['3,200+','Patients'],['15+','Years'],['4','Specialists']].map(([n,l])=>(
                  <div key={l} className="text-center p-4 rounded-xl" style={{background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.15)'}}>
                    <div className="font-display text-2xl font-semibold mb-1" style={{color:'#C9A84C'}}>{n}</div>
                    <div className="text-xs" style={{color:'rgba(232,228,217,0.4)'}}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="mb-24">
            <h2 className="font-display text-3xl text-white text-center mb-12">Our Journey</h2>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute left-6 top-0 bottom-0 w-px" style={{background:'linear-gradient(180deg,transparent,rgba(201,168,76,0.4),transparent)'}} />
              {MILESTONES.map((m,i)=>(
                <motion.div key={m.year} className="flex gap-5 mb-7 pl-14 relative"
                  initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1}}>
                  <div className="absolute left-4 top-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{background:'#C9A84C',boxShadow:'0 0 10px rgba(201,168,76,0.5)'}}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-1" style={{color:'#C9A84C'}}>{m.year}</div>
                    <div className="text-sm" style={{color:'rgba(232,228,217,0.65)'}}>{m.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="font-display text-3xl text-white text-center mb-2">Our Veterinary Team</h2>
            <p className="text-center text-sm mb-12" style={{color:'rgba(232,228,217,0.4)'}}>Board-certified specialists dedicated to excellence</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VETS.map((v,i)=>(
                <motion.div key={v.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  className="p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
                  style={{background:'rgba(11,22,40,0.7)',border:`1px solid ${v.color}22`}}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4"
                    style={{background:`${v.color}18`,border:`2px solid ${v.color}35`,color:v.color}}>{v.initials}</div>
                  <div className="font-semibold text-white text-sm mb-1">{v.name}</div>
                  <div className="text-xs mb-2" style={{color:v.color}}>{v.spec}</div>
                  <div className="text-xs" style={{color:'rgba(232,228,217,0.35)'}}>{v.exp} experience</div>
                  <div className="text-xs mt-1" style={{color:'rgba(232,228,217,0.25)'}}>{v.edu}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 rounded-3xl" style={{background:'rgba(11,22,40,0.7)',border:'1px solid rgba(201,168,76,0.15)'}}>
            <h3 className="font-display text-3xl text-white mb-4">Ready to meet the team?</h3>
            <p className="mb-8" style={{color:'rgba(232,228,217,0.45)'}}>Schedule a wellness visit and experience the Mingalar difference.</p>
            <Link to="/booking" className="btn-primary py-3.5 px-8 text-base">Book an Appointment →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

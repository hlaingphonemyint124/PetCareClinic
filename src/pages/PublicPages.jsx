import { useState } from 'react'
import { Link, useNavigate, Navigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../lib/AppContext'
import Navbar from '../components/layout/Navbar'
import Hero from '../components/public/Hero'
import { ServicesSection, VetsSection, TestimonialsSection, BlogSection, CTASection, Footer } from '../components/public/Sections'
import { DEMO_SERVICES, DEMO_VETS, DEMO_BLOG } from '../lib/demoData'
import toast from 'react-hot-toast'
import clsx from 'clsx'

// ── HOME PAGE ─────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <Hero />
      <ServicesSection />
      <VetsSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </div>
  )
}

// ── ABOUT PAGE ────────────────────────────────────────────────────
export function AboutPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Our Story</div>
            <h1 className="font-display text-5xl text-white mb-4">15 Years of <span className="gradient-text italic">Passionate</span> Care</h1>
            <p className="text-white/40 max-w-lg mx-auto">Founded in 2010, PawCare grew from a small clinic to Bangkok's most trusted multi-specialty pet hospital.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="font-display text-3xl text-white mb-5">Our <span className="gradient-text italic">Mission</span></h2>
              <p className="text-white/50 leading-relaxed mb-4">We believe every animal deserves the highest standard of care. Our mission is to combine cutting-edge veterinary medicine with genuine compassion.</p>
              <p className="text-white/50 leading-relaxed mb-8">From the moment you walk through our doors, you'll experience a team that truly loves animals.</p>
              <div className="grid grid-cols-2 gap-4">
                {[['12','Expert Vets','text-green'],['3,200+','Patients/year','text-amber'],['98%','Satisfaction','text-blue'],['24/7','Emergency','text-purple']].map(([v,l,c])=>(
                  <div key={l} className="glass rounded-xl p-4 text-center">
                    <div className={`font-display text-2xl ${c} mb-1`}>{v}</div>
                    <div className="text-white/30 text-xs">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['🐕','bg-green/10'],['🐈','bg-amber/10'],['🐇','bg-blue/10'],['🦜','bg-purple/10']].map(([e,c],i)=>(
                <motion.div key={i} className={`${c} rounded-2xl h-48 flex items-center justify-center text-6xl`}
                  initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:i*0.1+0.3}} whileHover={{scale:1.05}}>{e}</motion.div>
              ))}
            </div>
          </div>
          <h2 className="font-display text-3xl text-white text-center mb-8">Awards & <span className="gradient-text italic">Accreditations</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['🏆','Best Vet Clinic','Thailand Vet Awards 2024'],['🎖','ISO 9001:2015','Quality Management'],['🌟','AAHA Accredited','Animal Hospital Assoc.'],['💚','Green Clinic','Eco-Friendly 2023']].map(([i,t,s])=>(
              <motion.div key={t} className="glass rounded-2xl p-5 text-center" whileHover={{y:-4}}>
                <div className="text-4xl mb-3">{i}</div>
                <div className="font-semibold text-white text-sm mb-1">{t}</div>
                <div className="text-white/30 text-xs">{s}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ── SERVICES PAGE ─────────────────────────────────────────────────
export function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">What We Offer</div>
            <h1 className="font-display text-5xl text-white mb-4">Our <span className="gradient-text italic">Services</span></h1>
            <p className="text-white/40 max-w-md mx-auto">Comprehensive veterinary care with transparent pricing.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEMO_SERVICES.map((s,i)=>(
              <motion.div key={s.id} className="glass rounded-2xl p-6 group vet-card-3d"
                initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}} whileHover={{y:-6}}>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-white mb-2">{s.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-green text-xl">฿{s.price.toLocaleString()}</span>
                  <span className="text-white/25 text-xs bg-white/5 px-2.5 py-1 rounded-full">{s.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ── VETS PAGE ─────────────────────────────────────────────────────
export function VetsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Our Experts</div>
            <h1 className="font-display text-5xl text-white mb-4">Meet Our <span className="gradient-text italic">Veterinarians</span></h1>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_VETS.map((v,i)=>(
              <motion.div key={v.id} className="glass rounded-2xl p-6 vet-card-3d"
                initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}>
                <div className="flex gap-4 items-start mb-4">
                  <div className={`w-20 h-20 rounded-full bg-${v.color}/10 border-2 border-${v.color}/20 flex items-center justify-center text-4xl flex-shrink-0`}>{v.emoji}</div>
                  <div>
                    <h3 className="font-bold text-white">{v.name}</h3>
                    <div className={`text-${v.color} text-sm font-medium mb-1`}>{v.spec}</div>
                    <div className="text-amber text-xs">{'★'.repeat(Math.floor(v.rating))} {v.rating} ({v.reviews} reviews)</div>
                  </div>
                </div>
                <div className="h-px bg-white/5 mb-4" />
                <div className="grid grid-cols-2 gap-y-2 text-xs text-white/40 mb-4">
                  <div>🎓 {v.edu}</div><div>📅 {v.exp} experience</div>
                  <div>📆 {v.days}</div><div>⭐ {v.rating}/5.0</div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {v.tags.map(t=><span key={t} className="text-xs bg-white/5 text-white/40 px-2.5 py-0.5 rounded-full">{t}</span>)}
                </div>
                <Link to="/booking" className="btn-primary w-full justify-center text-sm py-2.5">Book Appointment</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ── BLOG PAGE ─────────────────────────────────────────────────────
export function BlogPage() {
  const [cat,setCat] = useState('All')
  const cats = ['All',...new Set(DEMO_BLOG.map(b=>b.category))]
  const filtered = cat==='All' ? DEMO_BLOG : DEMO_BLOG.filter(b=>b.category===cat)
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-10" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Knowledge Base</div>
            <h1 className="font-display text-5xl text-white mb-4">Pet Care <span className="gradient-text italic">Blog</span></h1>
          </motion.div>
          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {cats.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={clsx('px-4 py-2 rounded-full text-sm font-medium transition-all',cat===c?'bg-green text-bg':'glass text-white/50 hover:text-white')}>{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b,i)=>(
              <motion.div key={b.id} className="glass rounded-2xl overflow-hidden group cursor-pointer vet-card-3d"
                initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
                <div className="h-44 bg-bg-3 flex items-center justify-center text-6xl relative overflow-hidden">
                  <span className="group-hover:scale-110 transition-transform duration-500">{b.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="text-green text-[10px] font-bold tracking-wider uppercase mb-2">{b.category}</div>
                  <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-green transition-colors">{b.title}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-white/25">
                    <span>{b.author}</span><span>·</span><span>{b.date}</span><span>·</span><span>{b.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ── CONTACT PAGE ──────────────────────────────────────────────────
export function ContactPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Get In Touch</div>
            <h1 className="font-display text-5xl text-white mb-4">Contact <span className="gradient-text italic">Us</span></h1>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl text-white mb-6">Send a Message</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs text-white/40 mb-1.5 block">Your Name</label><input className="form-input" placeholder="John Smith"/></div>
                <div><label className="text-xs text-white/40 mb-1.5 block">Email</label><input className="form-input" type="email" placeholder="john@email.com"/></div>
              </div>
              <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Subject</label>
                <select className="form-select"><option>General Inquiry</option><option>Appointment</option><option>Medical Records</option><option>Billing</option></select>
              </div>
              <div className="mb-6"><label className="text-xs text-white/40 mb-1.5 block">Message</label><textarea className="form-textarea" rows={5} placeholder="How can we help?"/></div>
              <button className="btn-primary w-full justify-center py-3.5" onClick={()=>toast.success("Message sent! We'll reply within 24 hours.")}>Send Message →</button>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white mb-6">Visit Us</h2>
              <div className="glass rounded-2xl h-52 flex items-center justify-center text-6xl mb-5">🗺️</div>
              <div className="grid gap-3">
                {[['📍','Address','123 Sukhumvit Road, Watthana\nBangkok 10110, Thailand'],['📞','Phone','General: 02-111-2222\nEmergency (24/7): 02-111-9999'],['🕐','Hours','Mon–Fri: 8:00–20:00 · Sat–Sun: 9:00–18:00']].map(([icon,t,d])=>(
                  <div key={t} className="glass rounded-xl p-4 flex gap-3">
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div><div className="font-semibold text-white text-sm mb-0.5">{t}</div><div className="text-white/40 text-xs whitespace-pre-line">{d}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// ── BOOKING PAGE (requires login) ─────────────────────────────────
const STEPS = ['Your Pet','Service','Doctor','Date & Time','Confirm']

export function BookingPage() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState({
    petName: '', species: '', breed: '', weight: '', complaint: '',
    service: '', doctor: '', date: '', time: ''
  })

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <motion.div className="glass rounded-3xl p-10 max-w-md w-full text-center"
          initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}>
          <div className="text-6xl mb-5 animate-bounce">🔒</div>
          <h2 className="font-display text-2xl text-white mb-3">Sign In Required</h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            You need an account to book an appointment.<br/>Sign in or create a free account to continue.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={()=>navigate(-1)} className="btn-ghost py-3 px-6">← Go Back</button>
            <Link to="/login?next=/booking" className="btn-primary py-3 px-6">Sign In to Book →</Link>
          </div>
          <div className="mt-5 pt-5 border-t border-white/[0.06]">
            <p className="text-white/25 text-xs">Don't have an account? <Link to="/register" className="text-green hover:underline">Create one free</Link></p>
          </div>
        </motion.div>
      </div>
    )
  }

  const next = () => setStep(s => Math.min(s+1, 6))
  const back = () => setStep(s => Math.max(s-1, 1))
  const confirm = () => {
    const ref = 'PC-' + Date.now().toString(36).toUpperCase().slice(-6)
    toast.success(`Booking confirmed! Ref: ${ref}`)
    setStep(6)
  }

  const timeSlots = ['09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30']
  const unavailable = [0, 3, 6]

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-10" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Book Online</div>
            <h1 className="font-display text-4xl text-white mb-2">Book an <span className="gradient-text italic">Appointment</span></h1>
            <p className="text-white/30 text-sm">Booking as <span className="text-green font-medium">{user.name}</span></p>
          </motion.div>

          {/* Step indicators */}
          {step < 6 && (
            <div className="flex items-center mb-10 px-4">
              {STEPS.map((s,i)=>(
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={clsx('step-num',i+1===step&&'active',i+1<step&&'done')}>{i+1<step?'✓':i+1}</div>
                    <div className={clsx('text-[10px] mt-1 hidden md:block',i+1===step?'text-white':'text-white/25')}>{s}</div>
                  </div>
                  {i<STEPS.length-1&&<div className={clsx('step-connector mx-2 mb-4',i+1<step&&'done')}/>}
                </div>
              ))}
            </div>
          )}

          <motion.div key={step} className="glass rounded-3xl p-8"
            initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{duration:0.3}}>

            {step===1&&(
              <div>
                <h3 className="font-display text-xl text-white mb-6">Your Pet's Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[["Pet Name *",'petName','text','e.g. Buddy'],['Species *','species','text','Dog, Cat, etc.'],['Breed','breed','text','e.g. Golden Retriever'],['Weight (kg)','weight','number','e.g. 5.2']].map(([l,k,t,p])=>(
                    <div key={k}><label className="text-xs text-white/40 mb-1.5 block">{l}</label>
                      <input className="form-input" type={t} placeholder={p} value={booking[k]} onChange={e=>setBooking({...booking,[k]:e.target.value})}/>
                    </div>
                  ))}
                </div>
                <div className="mb-6"><label className="text-xs text-white/40 mb-1.5 block">Reason for Visit / Symptoms</label>
                  <textarea className="form-textarea" placeholder="Describe symptoms or reason for visit..." value={booking.complaint} onChange={e=>setBooking({...booking,complaint:e.target.value})}/>
                </div>
                <div className="flex justify-end"><button className="btn-primary" onClick={next}>Next: Select Service →</button></div>
              </div>
            )}

            {step===2&&(
              <div>
                <h3 className="font-display text-xl text-white mb-6">Select Service</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {DEMO_SERVICES.slice(0,9).map(s=>(
                    <button key={s.id} onClick={()=>setBooking({...booking,service:s.name})}
                      className={clsx('glass rounded-xl p-4 text-center transition-all duration-200 group',booking.service===s.name?'border-green/50 bg-green/5':'hover:border-white/20')}>
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
                      <div className="text-xs font-medium text-white mb-1">{s.name}</div>
                      <div className="text-green text-xs font-display">฿{s.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button className="btn-ghost" onClick={back}>← Back</button>
                  <button className="btn-primary" onClick={next} disabled={!booking.service}>Next: Choose Doctor →</button>
                </div>
              </div>
            )}

            {step===3&&(
              <div>
                <h3 className="font-display text-xl text-white mb-6">Choose Your Doctor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[...DEMO_VETS,{id:99,name:'Any Available',spec:'First available doctor',emoji:'🎲',color:'gray',days:'Best availability'}].map(v=>(
                    <button key={v.id} onClick={()=>setBooking({...booking,doctor:v.name})}
                      className={clsx('glass rounded-xl p-4 text-left flex items-center gap-3 transition-all duration-200',booking.doctor===v.name?'border-green/50 bg-green/5':'hover:border-white/15')}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-${v.color}/10 border border-${v.color}/20`}>{v.emoji}</div>
                      <div>
                        <div className="font-semibold text-white text-sm">{v.name}</div>
                        <div className={`text-${v.color} text-xs`}>{v.spec}</div>
                        <div className="text-white/25 text-xs mt-0.5">{v.days}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button className="btn-ghost" onClick={back}>← Back</button>
                  <button className="btn-primary" onClick={next} disabled={!booking.doctor}>Next: Date & Time →</button>
                </div>
              </div>
            )}

            {step===4&&(
              <div>
                <h3 className="font-display text-xl text-white mb-6">Choose Date & Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-xs text-white/40 mb-3 block">Select Date</label>
                    <input className="form-input" type="date" value={booking.date} min={new Date().toISOString().split('T')[0]} onChange={e=>setBooking({...booking,date:e.target.value})}/>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-3">Available Time Slots</div>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t,i)=>(
                        <button key={t} disabled={unavailable.includes(i)} onClick={()=>setBooking({...booking,time:t})}
                          className={clsx('rounded-xl py-2 text-xs font-medium transition-all',
                            unavailable.includes(i)?'opacity-25 cursor-not-allowed line-through text-white/30':
                            booking.time===t?'bg-green/10 border border-green/30 text-green':'glass hover:border-white/20 text-white/60')}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="btn-ghost" onClick={back}>← Back</button>
                  <button className="btn-primary" onClick={next} disabled={!booking.date || !booking.time}>Next: Confirm →</button>
                </div>
              </div>
            )}

            {step===5&&(
              <div>
                <h3 className="font-display text-xl text-white mb-6">Booking Summary</h3>
                <div className="glass rounded-2xl p-5 mb-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[['Booked by',user.name],['Pet',booking.petName||'—'],['Service',booking.service||'—'],['Doctor',booking.doctor||'—'],['Date',booking.date||'—'],['Time',booking.time||'—']].map(([k,v])=>(
                      <div key={k}><div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">{k}</div><div className="text-white font-semibold text-sm">{v}</div></div>
                    ))}
                  </div>
                </div>
                <div className="glass-green rounded-xl p-4 mb-6 text-sm text-green/80 space-y-1.5">
                  <div>✅ Confirmation sent to {user.email}</div>
                  <div>⏰ Please arrive 10 minutes before your appointment</div>
                  <div>📋 Bring previous medical records if available</div>
                  <div>❌ Cancellations must be made at least 24h in advance</div>
                </div>
                <div className="flex justify-between">
                  <button className="btn-ghost" onClick={back}>← Back</button>
                  <button className="btn-primary px-10 py-4 text-base" onClick={confirm}>🎉 Confirm Booking</button>
                </div>
              </div>
            )}

            {step===6&&(
              <div className="text-center py-8">
                <motion.div className="text-7xl mb-5" initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',damping:10}}>🎉</motion.div>
                <h2 className="font-display text-3xl text-green mb-3">Booking Confirmed!</h2>
                <p className="text-white/50 mb-2">A confirmation has been sent to <span className="text-white font-medium">{user.email}</span></p>
                <p className="text-white/30 text-sm mb-8">Our team will call you to confirm within 30 minutes.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button className="btn-ghost" onClick={()=>navigate('/')}>← Back to Home</button>
                  <button className="btn-primary" onClick={()=>navigate('/dashboard/owner')}>View My Appointments →</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// LOGIN PAGE — CLEAN, NO DEMO BUTTONS
// ══════════════════════════════════════════════════════════════════
export function LoginPage() {
  const { login, user } = useApp()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  // Once user is set (after login or on revisit), redirect to homepage
  // unless a specific ?next= destination was requested (e.g. /booking)
  if (user) {
    const next = searchParams.get('next')
    return <Navigate to={next || '/'} replace />
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setError('')
    setLoading(true)
    const result = await login(email.trim(), password)
    setLoading(false)
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`)
      // No navigate() here — setting user in AppContext triggers re-render,
      // which hits the if(user) guard above and redirects correctly.
    } else {
      setError(result.error || 'Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(150deg, #070a12 0%, #0c1620 60%, #091810 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,229,160,0.06) 0%, transparent 60%)' }} />

        {/* Logo */}
        <motion.div className="flex items-center gap-3 relative z-10"
          initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
          <div className="w-10 h-10 bg-green rounded-xl flex items-center justify-center text-xl shadow-green-glow">🐾</div>
          <span className="font-display text-xl text-white">PawCare Clinic</span>
        </motion.div>

        {/* Hero text */}
        <motion.div className="relative z-10" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.25}}>
          <div className="text-green text-[11px] font-bold tracking-[0.22em] uppercase mb-5">Bangkok's Premier Pet Clinic</div>
          <h1 className="font-display text-[3.2rem] leading-[1.08] text-white mb-6">
            Modern care<br/>for every<br/><span className="gradient-text italic">beloved pet.</span>
          </h1>
          <p className="text-white/35 text-[0.95rem] leading-relaxed max-w-xs">
            Manage appointments, medical records, vaccinations and more — all in one secure platform.
          </p>

          {/* Floating info card */}
          <motion.div className="mt-10 rounded-2xl p-5 max-w-xs"
            style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', animation:'float 6s ease-in-out infinite' }}
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-green/10 border border-green/20 flex items-center justify-center text-2xl">🐕</div>
              <div>
                <div className="text-white font-semibold text-sm">Buddy</div>
                <div className="text-white/30 text-xs">Golden Retriever · Active</div>
              </div>
              <span className="ml-auto text-[10px] bg-green/10 text-green border border-green/20 px-2 py-1 rounded-full font-semibold">Healthy</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[['Next Appt','May 15'],['Vaccines','Up to date'],['Weight','28 kg']].map(([k,v])=>(
                <div key={k} className="text-center rounded-xl py-2 px-1" style={{background:'rgba(255,255,255,0.03)'}}>
                  <div className="text-white/25 text-[9px] mb-0.5">{k}</div>
                  <div className="text-white text-xs font-medium">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div className="relative z-10 flex gap-10" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
          {[['3,200+','Pets treated'],['12','Expert vets'],['98%','Satisfaction']].map(([v,l])=>(
            <div key={l}>
              <div className="font-display text-2xl text-green leading-none">{v}</div>
              <div className="text-white/25 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right login form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative"
        style={{ background: '#080b12' }}>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.08] pointer-events-none" />

        <motion.div className="w-full max-w-[380px] relative z-10"
          initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:0.5}}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center text-lg shadow-green-glow">🐾</div>
            <span className="font-display text-lg text-white">PawCare</span>
          </div>

          {/* Back to website */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 group">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-0.5 transition-transform duration-200"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back to website
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-display text-[2.2rem] text-white leading-none mb-2">Sign In</h1>
            <p className="text-white/35 text-sm">Enter your credentials to access your account</p>
          </div>

          {/* Error alert */}
          <AnimatePresence>
            {error && (
              <motion.div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-5 text-sm"
                style={{ background:'rgba(255,77,109,0.1)', border:'1px solid rgba(255,77,109,0.25)', color:'#ff4d6d' }}
                initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
                <span>⚠</span>
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Email Address</label>
              <input
                className="form-input text-sm"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e=>{setEmail(e.target.value);setError('')}}
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs text-green/70 hover:text-green transition-colors" onClick={()=>toast('Password reset link sent!')}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  className="form-input text-sm pr-12"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e=>{setPassword(e.target.value);setError('')}}
                  autoComplete="current-password"
                />
                <button type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors text-xs px-1"
                  onClick={()=>setShowPass(!showPass)}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input type="checkbox" id="keep" className="rounded w-3.5 h-3.5 accent-green" />
              <label htmlFor="keep" className="text-xs text-white/35 cursor-pointer select-none">Keep me signed in for 30 days</label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-[0.95rem] font-semibold mt-2"
              style={{ boxShadow: '0 0 30px rgba(0,229,160,0.2)' }}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}>
              {loading
                ? <><div className="w-4 h-4 border-2 border-bg/20 border-t-bg rounded-full animate-spin"/><span>Signing in...</span></>
                : <><span>Sign In</span><span>→</span></>
              }
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{background:'rgba(255,255,255,0.06)'}} />
            <span className="text-white/15 text-xs">or</span>
            <div className="flex-1 h-px" style={{background:'rgba(255,255,255,0.06)'}} />
          </div>

          <p className="text-center text-sm text-white/30">
            Don't have an account?{' '}
            <Link to="/register" className="text-green hover:text-green/80 font-semibold transition-colors">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
// REGISTER PAGE — CLEAN
// ══════════════════════════════════════════════════════════════════
export function RegisterPage() {
  const { register, user } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', password:'', confirm:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)

  // Auto-redirect to homepage once user is set after registration
  if (user) return <Navigate to="/" replace />

  const set = (k) => (e) => { setForm(f=>({...f,[k]:e.target.value})); setError('') }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!form.firstName || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    setLoading(true)
    const result = await register(`${form.firstName} ${form.lastName}`.trim(), form.email, form.password, form.phone)
    setLoading(false)
    if (result.success) {
      if (result.message) {
        // Email verification required — send to login
        toast.success(result.message)
        navigate('/login')
      } else {
        // Auto-logged in — let if(user) guard above handle the redirect
        toast.success(`Welcome, ${form.firstName}!`)
      }
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left branding */}
      <div className="hidden lg:flex flex-col justify-between w-[46%] relative overflow-hidden p-12"
        style={{ background:'linear-gradient(150deg,#070a12 0%,#0c1620 60%,#091810 100%)' }}>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{background:'radial-gradient(ellipse at 30% 50%,rgba(0,229,160,0.06) 0%,transparent 60%)'}} />
        <motion.div className="flex items-center gap-3 relative z-10" initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}>
          <div className="w-10 h-10 bg-green rounded-xl flex items-center justify-center text-xl shadow-green-glow">🐾</div>
          <span className="font-display text-xl text-white">PawCare Clinic</span>
        </motion.div>
        <motion.div className="relative z-10" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
          <div className="text-green text-[11px] font-bold tracking-[0.22em] uppercase mb-5">Join PawCare Today</div>
          <h1 className="font-display text-[3.2rem] leading-[1.08] text-white mb-6">
            Your pet's<br/>health journey<br/><span className="gradient-text italic">starts here.</span>
          </h1>
          <p className="text-white/35 text-[0.95rem] leading-relaxed max-w-xs">
            Create a free account to book appointments, track vaccinations, view medical records and more.
          </p>
          <div className="mt-8 space-y-3">
            {[['🗓️','Book appointments online, anytime'],['💉','Track vaccinations & get reminders'],['📋','Access complete medical history'],['💳','Manage invoices & payments']].map(([icon,text])=>(
              <div key={text} className="flex items-center gap-3 text-sm text-white/40">
                <span className="text-lg flex-shrink-0">{icon}</span>{text}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative z-10 flex gap-10" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
          {[['Free','Account forever'],['2 min','To register'],['Instant','Dashboard access']].map(([v,l])=>(
            <div key={l}>
              <div className="font-display text-2xl text-green leading-none">{v}</div>
              <div className="text-white/25 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative" style={{background:'#080b12'}}>
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.08] pointer-events-none" />
        <motion.div className="w-full max-w-[400px] relative z-10"
          initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{duration:0.5}}>

          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 bg-green rounded-xl flex items-center justify-center text-lg shadow-green-glow">🐾</div>
            <span className="font-display text-lg text-white">PawCare</span>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-[2.2rem] text-white leading-none mb-2">Create Account</h1>
            <p className="text-white/35 text-sm">Free forever · Takes 2 minutes</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-5 text-sm"
                style={{background:'rgba(255,77,109,0.1)',border:'1px solid rgba(255,77,109,0.25)',color:'#ff4d6d'}}
                initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}>
                <span>⚠</span><span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">First Name <span className="text-red">*</span></label>
                <input className="form-input" placeholder="John" value={form.firstName} onChange={set('firstName')} autoFocus/>
              </div>
              <div>
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Last Name</label>
                <input className="form-input" placeholder="Smith" value={form.lastName} onChange={set('lastName')}/>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Email Address <span className="text-red">*</span></label>
              <input className="form-input" type="email" placeholder="john@email.com" value={form.email} onChange={set('email')} autoComplete="email"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Phone Number</label>
              <input className="form-input" placeholder="08X-XXX-XXXX" value={form.phone} onChange={set('phone')}/>
            </div>
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Password <span className="text-red">*</span></label>
              <div className="relative">
                <input className="form-input pr-12" type={showPass?'text':'password'} placeholder="Min 8 characters" value={form.password} onChange={set('password')} autoComplete="new-password"/>
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors text-xs px-1" onClick={()=>setShowPass(!showPass)}>
                  {showPass?'🙈':'👁️'}
                </button>
              </div>
              {form.password && (
                <div className="flex items-center gap-2 mt-1.5">
                  <div className={clsx('h-1 flex-1 rounded-full transition-all',form.password.length<6?'bg-red/50':form.password.length<10?'bg-amber/50':'bg-green/50')} />
                  <span className={clsx('text-[10px]',form.password.length<6?'text-red/60':form.password.length<10?'text-amber/60':'text-green/60')}>
                    {form.password.length<6?'Weak':form.password.length<10?'Fair':'Strong'}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Confirm Password <span className="text-red">*</span></label>
              <input className={clsx('form-input',form.confirm&&form.confirm!==form.password?'border-red/40':'')} type="password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} autoComplete="new-password"/>
              {form.confirm && form.confirm!==form.password && (
                <p className="text-red/60 text-[11px] mt-1">Passwords do not match</p>
              )}
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <input type="checkbox" id="tos" required className="rounded mt-0.5 w-3.5 h-3.5 accent-green"/>
              <label htmlFor="tos" className="text-xs text-white/35 cursor-pointer leading-relaxed">
                I agree to the <span className="text-green hover:underline cursor-pointer">Terms of Service</span> and <span className="text-green hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
            <motion.button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-[0.95rem] font-semibold"
              style={{boxShadow:'0 0 30px rgba(0,229,160,0.2)'}}
              whileHover={{scale:loading?1:1.01}} whileTap={{scale:loading?1:0.99}}>
              {loading
                ? <><div className="w-4 h-4 border-2 border-bg/20 border-t-bg rounded-full animate-spin"/><span>Creating account...</span></>
                : <><span>Create Account</span><span>→</span></>
              }
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{background:'rgba(255,255,255,0.06)'}}/>
            <span className="text-white/15 text-xs">or</span>
            <div className="flex-1 h-px" style={{background:'rgba(255,255,255,0.06)'}}/>
          </div>
          <p className="text-center text-sm text-white/30">
            Already have an account?{' '}
            <Link to="/login" className="text-green hover:text-green/80 font-semibold transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// Keep portal page for internal navigation
export function PortalSelectPage() {
  // portal page disabled
  const navigate = useNavigate()
  return <Navigate to="/login" replace />
}
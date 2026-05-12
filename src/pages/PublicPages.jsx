import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Our Story</div>
            <h1 className="font-display text-5xl text-white mb-4">15 Years of <span className="gradient-text italic">Passionate</span> Care</h1>
            <p className="text-white/40 max-w-lg mx-auto">Founded in 2010, PawCare grew from a small clinic to Bangkok's most trusted multi-specialty pet hospital.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="font-display text-3xl text-white mb-5">Our <span className="gradient-text italic">Mission</span></h2>
              <p className="text-white/50 leading-relaxed mb-4">We believe every animal deserves the highest standard of care. Our mission is to combine cutting-edge veterinary medicine with genuine compassion to provide exceptional outcomes for every patient.</p>
              <p className="text-white/50 leading-relaxed mb-8">From the moment you walk through our doors, you'll experience a team that truly loves animals and treats your pets as their own.</p>
              <div className="grid grid-cols-2 gap-4">
                {[['12', 'Expert Vets', 'text-green'], ['3,200+', 'Patients/year', 'text-amber'], ['98%', 'Satisfaction', 'text-blue'], ['24/7', 'Emergency', 'text-purple']].map(([v, l, c]) => (
                  <div key={l} className="glass rounded-xl p-4 text-center">
                    <div className={`font-display text-2xl ${c} mb-1`}>{v}</div>
                    <div className="text-white/30 text-xs">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['🐕','bg-green/10'],['🐈','bg-amber/10'],['🐇','bg-blue/10'],['🦜','bg-purple/10']].map(([e,c],i) => (
                <motion.div key={i} className={`${c} rounded-2xl h-48 flex items-center justify-center text-6xl`}
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}>
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
          <h2 className="font-display text-3xl text-white text-center mb-8">Awards & <span className="gradient-text italic">Accreditations</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['🏆','Best Vet Clinic','Thailand Vet Awards 2024'],['🎖','ISO 9001:2015','Quality Management'],['🌟','AAHA Accredited','Animal Hospital Assoc.'],['💚','Green Clinic','Eco-Friendly 2023']].map(([i,t,s]) => (
              <motion.div key={t} className="glass rounded-2xl p-5 text-center" whileHover={{ y: -4 }}>
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
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">What We Offer</div>
            <h1 className="font-display text-5xl text-white mb-4">Our <span className="gradient-text italic">Services</span></h1>
            <p className="text-white/40 max-w-md mx-auto">Comprehensive veterinary care with transparent pricing.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEMO_SERVICES.map((s, i) => (
              <motion.div key={s.id} className="glass rounded-2xl p-6 group vet-card-3d"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}>
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
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Our Experts</div>
            <h1 className="font-display text-5xl text-white mb-4">Meet Our <span className="gradient-text italic">Veterinarians</span></h1>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_VETS.map((v, i) => (
              <motion.div key={v.id} className="glass rounded-2xl p-6 vet-card-3d"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
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
                  {v.tags.map(t => <span key={t} className="text-xs bg-white/5 text-white/40 px-2.5 py-0.5 rounded-full">{t}</span>)}
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
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(DEMO_BLOG.map(b => b.category))]
  const filtered = cat === 'All' ? DEMO_BLOG : DEMO_BLOG.filter(b => b.category === cat)

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Knowledge Base</div>
            <h1 className="font-display text-5xl text-white mb-4">Pet Care <span className="gradient-text italic">Blog</span></h1>
          </motion.div>
          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} className={clsx('px-4 py-2 rounded-full text-sm font-medium transition-all duration-200', cat === c ? 'bg-green text-bg' : 'glass text-white/50 hover:text-white')}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((b, i) => (
              <motion.div key={b.id} className="glass rounded-2xl overflow-hidden group cursor-pointer vet-card-3d"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="h-44 bg-bg-3 flex items-center justify-center text-6xl relative overflow-hidden">
                  <span className="group-hover:scale-110 transition-transform duration-500">{b.emoji}</span>
                  {!b.published && <span className="absolute top-3 right-3 text-xs bg-amber/10 text-amber border border-amber/20 px-2 py-0.5 rounded-full">Draft</span>}
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
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Get In Touch</div>
            <h1 className="font-display text-5xl text-white mb-4">Contact <span className="gradient-text italic">Us</span></h1>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-2xl text-white mb-6">Send a Message</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs text-white/40 mb-1.5 block">Your Name</label><input className="form-input" placeholder="John Smith" /></div>
                <div><label className="text-xs text-white/40 mb-1.5 block">Email</label><input className="form-input" type="email" placeholder="john@email.com" /></div>
              </div>
              <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Subject</label>
                <select className="form-select"><option>General Inquiry</option><option>Appointment Question</option><option>Medical Records</option><option>Billing</option></select>
              </div>
              <div className="mb-6"><label className="text-xs text-white/40 mb-1.5 block">Message</label><textarea className="form-textarea" rows={5} placeholder="How can we help?" /></div>
              <button className="btn-primary w-full justify-center py-3.5" onClick={() => toast.success('Message sent! We\'ll reply within 24 hours.')}>
                Send Message →
              </button>
            </div>
            <div>
              <h2 className="font-display text-2xl text-white mb-6">Visit Us</h2>
              <div className="glass rounded-2xl h-52 flex items-center justify-center text-6xl mb-5">🗺️</div>
              <div className="grid grid-cols-1 gap-3">
                {[['📍','Address','123 Sukhumvit Road, Watthana\nBangkok 10110, Thailand'],['📞','Phone','General: 02-xxx-xxxx\nEmergency (24/7): 02-xxx-9999'],['🕐','Hours','Mon–Fri: 8:00–20:00 · Sat–Sun: 9:00–18:00\nEmergency: Always open']].map(([icon,t,d]) => (
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

// ── BOOKING PAGE ──────────────────────────────────────────────────
const STEPS = ['Your Pet', 'Service', 'Doctor', 'Date & Time', 'Confirm']

export function BookingPage() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState({ owner: '', phone: '', email: '', petName: '', species: '', breed: '', complaint: '', service: '', doctor: '', date: '', time: '' })
  const navigate = useNavigate()

  const next = () => setStep(s => Math.min(s + 1, 6))
  const back = () => setStep(s => Math.max(s - 1, 1))

  const confirm = () => {
    const ref = 'PC-' + Math.random().toString(36).substr(2, 8).toUpperCase()
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
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-green text-xs font-bold tracking-[0.15em] uppercase mb-3">Book Online</div>
            <h1 className="font-display text-4xl text-white mb-2">Book an <span className="gradient-text italic">Appointment</span></h1>
          </motion.div>

          {/* Step indicator */}
          {step < 6 && (
            <div className="flex items-center mb-10 px-4">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center">
                    <div className={clsx('step-num', i + 1 === step && 'active', i + 1 < step && 'done')}>
                      {i + 1 < step ? '✓' : i + 1}
                    </div>
                    <div className={clsx('text-[10px] mt-1 hidden md:block', i + 1 === step ? 'text-white' : 'text-white/25')}>{s}</div>
                  </div>
                  {i < STEPS.length - 1 && <div className={clsx('step-connector mx-2 mb-4', i + 1 < step && 'done')} />}
                </div>
              ))}
            </div>
          )}

          {/* Step content */}
          <motion.div key={step} className="glass rounded-3xl p-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            {step === 1 && (
              <div>
                <h3 className="font-display text-xl text-white mb-6">Your Pet's Information</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[['Your Name *','owner','text','Full name'],['Phone / Line *','phone','tel','08X-XXX-XXXX'],['Email','email','email','your@email.com'],['Pet Name *','petName','text',"Your pet's name"]].map(([l,k,t,p]) => (
                    <div key={k}><label className="text-xs text-white/40 mb-1.5 block">{l}</label><input className="form-input" type={t} placeholder={p} value={booking[k]} onChange={e => setBooking({...booking,[k]:e.target.value})} /></div>
                  ))}
                  <div><label className="text-xs text-white/40 mb-1.5 block">Species *</label>
                    <select className="form-select" value={booking.species} onChange={e => setBooking({...booking,species:e.target.value})}>
                      <option value="">Select</option>
                      {['Dog','Cat','Rabbit','Bird','Other'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label className="text-xs text-white/40 mb-1.5 block">Breed</label><input className="form-input" placeholder="e.g. Golden Retriever" value={booking.breed} onChange={e => setBooking({...booking,breed:e.target.value})} /></div>
                </div>
                <div className="mb-6"><label className="text-xs text-white/40 mb-1.5 block">Reason for Visit</label><textarea className="form-textarea" placeholder="Describe symptoms or reason..." value={booking.complaint} onChange={e => setBooking({...booking,complaint:e.target.value})} /></div>
                <div className="flex justify-end"><button className="btn-primary" onClick={next}>Next: Select Service →</button></div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="font-display text-xl text-white mb-6">Select Service</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {DEMO_SERVICES.slice(0, 9).map(s => (
                    <button key={s.id} onClick={() => setBooking({...booking,service:s.name})}
                      className={clsx('glass rounded-xl p-4 text-center transition-all duration-200 group', booking.service === s.name ? 'border-green/50 bg-green/5' : 'hover:border-white/15')}>
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{s.icon}</div>
                      <div className="text-xs font-medium text-white mb-1">{s.name}</div>
                      <div className="text-green text-xs font-display">฿{s.price.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between"><button className="btn-ghost" onClick={back}>← Back</button><button className="btn-primary" onClick={next}>Next: Choose Doctor →</button></div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-display text-xl text-white mb-6">Choose Your Doctor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[...DEMO_VETS, { id: 99, name: 'Any Available', spec: 'First available doctor', emoji: '🎲', color: 'gray', days: 'Best availability' }].map(v => (
                    <button key={v.id} onClick={() => setBooking({...booking,doctor:v.name})}
                      className={clsx('glass rounded-xl p-4 text-left transition-all duration-200 flex items-center gap-3', booking.doctor === v.name ? 'border-green/50 bg-green/5' : 'hover:border-white/15')}>
                      <div className={`w-12 h-12 rounded-full bg-${v.color}/10 border border-${v.color}/20 flex items-center justify-center text-2xl flex-shrink-0`}>{v.emoji}</div>
                      <div>
                        <div className="font-semibold text-white text-sm">{v.name}</div>
                        <div className={`text-${v.color} text-xs`}>{v.spec}</div>
                        <div className="text-white/25 text-xs mt-0.5">{v.days}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between"><button className="btn-ghost" onClick={back}>← Back</button><button className="btn-primary" onClick={next}>Next: Date & Time →</button></div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="font-display text-xl text-white mb-6">Choose Date & Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div><label className="text-xs text-white/40 mb-3 block">Select Date</label><input className="form-input" type="date" value={booking.date} onChange={e => setBooking({...booking,date:e.target.value})} min={new Date().toISOString().split('T')[0]} /></div>
                  <div>
                    <div className="text-xs text-white/40 mb-3">Available Time Slots</div>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t, i) => (
                        <button key={t} disabled={unavailable.includes(i)}
                          onClick={() => setBooking({...booking,time:t})}
                          className={clsx('rounded-xl py-2 text-xs font-medium transition-all duration-200', unavailable.includes(i) ? 'opacity-25 cursor-not-allowed bg-white/[0.03] text-white/30 line-through' : booking.time === t ? 'bg-green/10 border border-green/30 text-green' : 'glass hover:border-white/20 text-white/60')}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between"><button className="btn-ghost" onClick={back}>← Back</button><button className="btn-primary" onClick={next}>Next: Confirm →</button></div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h3 className="font-display text-xl text-white mb-6">Booking Summary</h3>
                <div className="glass rounded-2xl p-5 mb-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[['Owner', booking.owner || '—'], ['Pet', booking.petName || '—'], ['Service', booking.service || '—'], ['Doctor', booking.doctor || '—'], ['Date', booking.date || '—'], ['Time', booking.time || '—']].map(([k, v]) => (
                      <div key={k}><div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">{k}</div><div className="text-white font-semibold text-sm">{v}</div></div>
                    ))}
                  </div>
                </div>
                <div className="glass-green rounded-xl p-4 mb-6 text-sm text-green/80 space-y-1.5">
                  <div>✅ Confirmation sent via SMS & email within 30 min</div>
                  <div>⏰ Please arrive 10 minutes early</div>
                  <div>📋 Bring previous medical records if available</div>
                  <div>❌ Cancellations require 24h notice</div>
                </div>
                <div className="flex justify-between"><button className="btn-ghost" onClick={back}>← Back</button><button className="btn-primary px-10 py-4 text-base" onClick={confirm}>🎉 Confirm Booking</button></div>
              </div>
            )}

            {step === 6 && (
              <div className="text-center py-8">
                <motion.div className="text-7xl mb-5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }}>🎉</motion.div>
                <h2 className="font-display text-3xl text-green mb-3">Booking Confirmed!</h2>
                <p className="text-white/50 mb-2">We've sent a confirmation to your email and phone.</p>
                <p className="text-white/30 text-sm mb-8">Our team will call you within 30 minutes to confirm.</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button className="btn-ghost" onClick={() => navigate('/')}>← Back to Home</button>
                  <Link to="/login" className="btn-primary">Create Account to Track →</Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── LOGIN PAGE ────────────────────────────────────────────────────
export function LoginPage() {
  const { loginDemo, setUser } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const handleDemo = (role) => {
    loginDemo(role)
    const paths = { owner: '/dashboard/owner', vet: '/dashboard/vet', receptionist: '/dashboard/reception', admin: '/dashboard/admin' }
    toast.success(`Logged in as ${role}`)
    navigate(paths[role])
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 blob pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.3), transparent)' }} />
      <motion.div className="glass-strong rounded-3xl p-8 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-green rounded-2xl flex items-center justify-center text-3xl shadow-green-glow animate-pulse-glow">🐾</div>
        </div>
        <h1 className="font-display text-2xl text-white text-center mb-1">Welcome Back</h1>
        <p className="text-white/40 text-sm text-center mb-6">Sign in to your PawCare account</p>

        {/* Demo logins */}
        <div className="glass-green rounded-xl p-4 mb-6">
          <div className="text-green text-xs font-bold mb-3">🎭 Demo — Click to Login</div>
          <div className="grid grid-cols-2 gap-2">
            {['owner','vet','receptionist','admin'].map(r => (
              <button key={r} onClick={() => handleDemo(r)}
                className="glass rounded-xl py-2.5 text-xs font-medium text-white/60 hover:text-white hover:border-green/30 hover:bg-green/5 transition-all duration-200 capitalize">
                {r === 'receptionist' ? 'Reception' : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4"><label className="text-xs text-white/40 mb-1.5 block">Email</label><input className="form-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="mb-2"><label className="text-xs text-white/40 mb-1.5 block">Password</label><input className="form-input" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} /></div>
        <div className="flex justify-between items-center mb-6 text-xs">
          <label className="flex items-center gap-1.5 text-white/40 cursor-pointer"><input type="checkbox" className="rounded" /> Remember me</label>
          <span className="text-green cursor-pointer hover:underline">Forgot password?</span>
        </div>
        <button className="btn-primary w-full justify-center py-3.5 mb-4" onClick={() => handleDemo('owner')}>Sign In</button>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 h-px bg-white/5" /><span className="text-white/20 text-xs">or</span><div className="flex-1 h-px bg-white/5" /></div>
        <button className="btn-ghost w-full justify-center py-3" onClick={() => toast('Google OAuth — connect Supabase Auth')}>🔵 Continue with Google</button>
        <p className="text-center text-xs text-white/30 mt-5">Don't have an account? <Link to="/register" className="text-green hover:underline">Sign up free</Link></p>
      </motion.div>
    </div>
  )
}

// ── REGISTER PAGE ─────────────────────────────────────────────────
export function RegisterPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div className="glass-strong rounded-3xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-green rounded-2xl flex items-center justify-center text-3xl shadow-green-glow">🐾</div>
        </div>
        <h1 className="font-display text-2xl text-white text-center mb-1">Create Account</h1>
        <p className="text-white/40 text-sm text-center mb-6">Join PawCare to manage your pet's health</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div><label className="text-xs text-white/40 mb-1.5 block">First Name</label><input className="form-input" placeholder="John" /></div>
          <div><label className="text-xs text-white/40 mb-1.5 block">Last Name</label><input className="form-input" placeholder="Smith" /></div>
        </div>
        <div className="mb-3"><label className="text-xs text-white/40 mb-1.5 block">Email</label><input className="form-input" type="email" placeholder="john@email.com" /></div>
        <div className="mb-3"><label className="text-xs text-white/40 mb-1.5 block">Phone</label><input className="form-input" placeholder="08X-XXX-XXXX" /></div>
        <div className="mb-3"><label className="text-xs text-white/40 mb-1.5 block">Password</label><input className="form-input" type="password" placeholder="Min 8 characters" /></div>
        <div className="mb-6"><label className="text-xs text-white/40 mb-1.5 block">Confirm Password</label><input className="form-input" type="password" placeholder="Repeat password" /></div>
        <label className="flex items-start gap-2 mb-5 text-xs text-white/40 cursor-pointer">
          <input type="checkbox" className="mt-0.5 rounded" />
          <span>I agree to the <span className="text-green">Terms of Service</span> and <span className="text-green">Privacy Policy</span></span>
        </label>
        <button className="btn-primary w-full justify-center py-3.5 mb-3" onClick={() => { toast.success('Account created! Please verify your email.'); navigate('/login') }}>Create Account</button>
        <p className="text-center text-xs text-white/30">Have an account? <Link to="/login" className="text-green hover:underline">Sign in</Link></p>
      </motion.div>
    </div>
  )
}

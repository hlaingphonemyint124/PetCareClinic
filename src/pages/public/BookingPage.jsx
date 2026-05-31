import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import { DEMO_VETS, DEMO_SERVICES } from '../../lib/demoData'
import { useApp } from '../../lib/AppContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const STEPS = ['Select Vet', 'Choose Service', 'Pick Date & Time', 'Confirm']
const TIMES = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00']
const TODAY = new Date()
const DATES = Array.from({length:14}, (_,i) => {
  const d = new Date(TODAY); d.setDate(d.getDate()+i+1)
  return d
})

export function BookingPage() {
  const [step, setStep] = useState(0)
  const [vet, setVet] = useState(null)
  const [service, setService] = useState(null)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [pet, setPet] = useState('')
  const [note, setNote] = useState('')
  const { user } = useApp()
  const navigate = useNavigate()

  const fmt = (n) => n ? `${(n/1000).toFixed(0)}K MMK` : ''
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  const canNext = [!!vet, !!service, !!(date && time), true][step]

  const confirm = () => {
    toast.success('Appointment booked! We\'ll confirm via phone within 30 minutes.', {duration: 4000})
    setTimeout(() => navigate(user ? '/dashboard/owner/appointments' : '/'), 1500)
  }

  return (
    <div className="min-h-screen" style={{background:'#07101e'}}>
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-10" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{color:'#C9A84C'}}>Online Booking</div>
            <h1 className="font-display text-4xl text-white mb-2">Book an Appointment</h1>
            <p className="text-sm" style={{color:'rgba(232,228,217,0.4)'}}>Select a doctor, service, and preferred time</p>
          </motion.div>

          {/* Steps */}
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((s,i) => (
              <>
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`step-num ${i < step ? 'done' : i === step ? 'active' : ''}`}>{i < step ? '✓' : i+1}</div>
                  <span className="hidden sm:block text-xs font-medium" style={{color: i===step ? '#C9A84C' : i<step ? 'rgba(201,168,76,0.5)' : 'rgba(232,228,217,0.2)'}}>
                    {s}
                  </span>
                </div>
                {i < STEPS.length-1 && <div className={`step-connector ${i < step ? 'done' : ''}`} key={`c${i}`} />}
              </>
            ))}
          </div>

          {/* Step panels */}
          <motion.div className="rounded-3xl p-8" style={{background:'rgba(11,22,40,0.8)',border:'1px solid rgba(201,168,76,0.15)'}}
            key={step} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}>

            {/* Step 0: Choose vet */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-2xl text-white mb-6">Choose a Veterinarian</h2>
                <div className="grid gap-3">
                  {DEMO_VETS.map(v => (
                    <button key={v.id} onClick={() => setVet(v)}
                      className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: vet?.id===v.id ? 'rgba(201,168,76,0.1)' : 'rgba(11,22,40,0.5)',
                        border: `1px solid ${vet?.id===v.id ? '#C9A84C' : 'rgba(201,168,76,0.1)'}`,
                      }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                        style={{background:'rgba(201,168,76,0.12)',color:'#C9A84C',fontSize:'11px'}}>{v.initials || v.name.split(' ').slice(1,3).map(n=>n[0]).join('')}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-sm">{v.name}</div>
                        <div className="text-xs mt-0.5" style={{color:'rgba(201,168,76,0.7)'}}>{v.spec}</div>
                        <div className="text-xs mt-0.5" style={{color:'rgba(232,228,217,0.35)'}}>{v.days}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs font-semibold" style={{color:'#C9A84C'}}>⭐ {v.rating}</div>
                        <div className="text-xs mt-0.5" style={{color:'rgba(232,228,217,0.3)'}}>{v.reviews} reviews</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Choose service */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl text-white mb-6">Select Service</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {DEMO_SERVICES.filter(s=>['consultation','vaccination','diagnostics','dental','grooming'].includes(s.category)).map(s => (
                    <button key={s.id} onClick={() => setService(s)}
                      className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200"
                      style={{
                        background: service?.id===s.id ? 'rgba(201,168,76,0.1)' : 'rgba(11,22,40,0.5)',
                        border: `1px solid ${service?.id===s.id ? '#C9A84C' : 'rgba(201,168,76,0.1)'}`,
                      }}>
                      <span className="text-2xl">{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-white text-sm">{s.name}</div>
                        <div className="text-xs mt-0.5" style={{color:'rgba(232,228,217,0.4)'}}>{s.duration}</div>
                      </div>
                      <div className="text-sm font-semibold flex-shrink-0" style={{color:'#C9A84C'}}>{(s.price/1000).toFixed(0)}K</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Pick date/time */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl text-white mb-6">Pick Date & Time</h2>
                <div className="grid grid-cols-7 gap-1.5 mb-6">
                  {DATES.map(d => (
                    <button key={d.toISOString()} onClick={() => setDate(d)}
                      className="p-2 rounded-xl text-center transition-all duration-200 text-xs"
                      style={{
                        background: date?.toDateString()===d.toDateString() ? '#C9A84C' : 'rgba(11,22,40,0.6)',
                        color: date?.toDateString()===d.toDateString() ? '#0B1628' : 'rgba(232,228,217,0.55)',
                        border: `1px solid ${date?.toDateString()===d.toDateString() ? '#C9A84C' : 'rgba(201,168,76,0.1)'}`,
                      }}>
                      <div className="font-bold text-[10px]">{dayNames[d.getDay()]}</div>
                      <div className="font-semibold text-sm">{d.getDate()}</div>
                      <div className="text-[9px] opacity-60">{monthNames[d.getMonth()]}</div>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES.map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      className="py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                      style={{
                        background: time===t ? '#C9A84C' : 'rgba(11,22,40,0.6)',
                        color: time===t ? '#0B1628' : 'rgba(232,228,217,0.55)',
                        border: `1px solid ${time===t ? '#C9A84C' : 'rgba(201,168,76,0.1)'}`,
                      }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div>
                <h2 className="font-display text-2xl text-white mb-6">Confirm Appointment</h2>
                <div className="space-y-3 mb-6">
                  {[
                    ['🩺','Veterinarian', vet?.name],
                    ['💊','Service', service?.name],
                    ['📅','Date', date?.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})],
                    ['🕐','Time', time],
                    ['💰','Fee', fmt(service?.price)],
                  ].map(([icon,label,val]) => val && (
                    <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.12)'}}>
                      <span>{icon}</span>
                      <span className="text-sm flex-1" style={{color:'rgba(232,228,217,0.45)'}}>{label}</span>
                      <span className="text-sm font-semibold text-white">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="text-xs font-semibold mb-1.5 block" style={{color:'rgba(232,228,217,0.5)'}}>Pet Name</label>
                  <input className="form-input" placeholder="Your pet's name" value={pet} onChange={e=>setPet(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{color:'rgba(232,228,217,0.5)'}}>Notes (optional)</label>
                  <textarea className="form-textarea" rows={3} placeholder="Any symptoms or concerns…" value={note} onChange={e=>setNote(e.target.value)} />
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-3 mt-5">
            {step > 0 && (
              <button onClick={() => setStep(s=>s-1)} className="btn-ghost px-6 py-3">← Back</button>
            )}
            <div className="flex-1" />
            {step < 3 ? (
              <button onClick={() => setStep(s=>s+1)} disabled={!canNext}
                className="btn-primary px-8 py-3" style={{opacity:canNext?1:0.4}}>
                Continue →
              </button>
            ) : (
              <button onClick={confirm} className="btn-primary px-8 py-3">Confirm Booking ✓</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import toast from 'react-hot-toast'

export function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-1)' }}>
      <Navbar />
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }}>
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color:'var(--gold)' }}>Get In Touch</div>
            <h1 className="font-display text-5xl mb-4" style={{ color:'var(--text-primary)' }}>
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-sm" style={{ color:'var(--text-muted)' }}>We'd love to hear from you. Reach out anytime.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.1 }}>
              <h2 className="font-display text-2xl mb-6" style={{ color:'var(--text-primary)' }}>Send a Message</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color:'var(--text-muted)' }}>Your Name</label>
                  <input className="form-input" placeholder="Ko Kyaw Zin" />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color:'var(--text-muted)' }}>Email</label>
                  <input className="form-input" type="email" placeholder="you@email.com" />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold mb-1.5 block" style={{ color:'var(--text-muted)' }}>Subject</label>
                <select className="form-select">
                  <option>General Inquiry</option>
                  <option>Appointment</option>
                  <option>Medical Records</option>
                  <option>Billing</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold mb-1.5 block" style={{ color:'var(--text-muted)' }}>Message</label>
                <textarea className="form-textarea" rows={5} placeholder="How can we help?" />
              </div>
              <button type="button" className="btn-primary w-full justify-center py-3.5"
                onClick={() => toast.success("Message sent! We'll reply within 24 hours.")}>
                Send Message →
              </button>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} transition={{ delay:0.2 }}>
              <h2 className="font-display text-2xl mb-6" style={{ color:'var(--text-primary)' }}>Visit Us</h2>
              <div className="rounded-2xl h-52 flex items-center justify-center mb-6 overflow-hidden relative liquid-glass"
                style={{ border:'1px solid var(--border-gold)' }}>
                <div className="text-center">
                  <div className="text-5xl mb-2">🗺️</div>
                  <div className="text-xs font-semibold" style={{ color:'var(--gold)' }}>No. 45, Pyay Road, Kamayut</div>
                  <div className="text-xs mt-1" style={{ color:'var(--text-muted)' }}>Yangon, Myanmar</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ['📍','Address','No. 45, Pyay Road, Kamayut Township\nYangon, Myanmar'],
                  ['📞','Phone','General: 09-111-22222\nEmergency (24/7): 09-111-99999'],
                  ['✉️','Email','info@mingalarpetclinic.com'],
                  ['🕐','Hours','Mon–Fri: 8:00–20:00 · Sat–Sun: 9:00–18:00'],
                ].map(([icon, title, detail]) => (
                  <div key={title} className="flex gap-4 p-4 rounded-xl liquid-glass"
                    style={{ border:'1px solid var(--border-subtle)' }}>
                    <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <div className="font-semibold text-sm mb-1" style={{ color:'var(--text-primary)' }}>{title}</div>
                      <div className="text-xs whitespace-pre-line leading-relaxed" style={{ color:'var(--text-muted)' }}>{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Emergency banner */}
          <motion.div className="mt-14 p-6 rounded-2xl text-center" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ background:'var(--card-overlay-bg)', border:'1px solid var(--border-gold)' }}>
            <span className="text-2xl mr-3">🚑</span>
            <span className="font-display text-lg" style={{ color:'var(--text-primary)' }}>Pet Emergency? </span>
            <a href="tel:+95911199999" className="font-bold hover:underline" style={{ color:'var(--gold)' }}>
              Call 09-111-99999 now — we're here 24/7
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

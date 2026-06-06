import { Link } from 'react-router-dom'
import { LOGO_URI } from '../../../lib/logoData'
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ background: 'var(--bg-1)', borderTop: '1px solid var(--border-gold)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={LOGO_URI} alt="Mingalar Pet Clinic" className="w-12 h-12 object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.35))' }} />
              <div>
                <div className="font-display text-base leading-none" style={{ color: 'var(--text-primary)' }}>Mingalar</div>
                <div className="text-[10px]" style={{ color: 'var(--text-faint)' }}>Veterinary Clinic</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
              Modern veterinary medicine with genuine compassion. Serving Yangon families since 2010.
            </p>
            <div className="flex gap-2">
              {[['FB','#1877F2'],['IG','#E4405F'],['LINE','#06C755'],['YT','#FF0000']].map(([label, color]) => (
                <div key={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold cursor-pointer hover:scale-110 transition-transform duration-200"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color }}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--text-faint)' }}>Services</div>
            <ul className="space-y-3">
              {['General Consultation','Vaccination','Surgery','Dental Care','Grooming','Emergency'].map(l => (
                <li key={l}>
                  <Link to="/services"
                    className="text-sm flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--gold)' }} />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--text-faint)' }}>Clinic</div>
            <ul className="space-y-3">
              {[['About Us','/about'],['Our Team','/vets'],['Pet Blog','/blog'],['Book Appointment','/booking'],['Contact','/contact']].map(([l,to]) => (
                <li key={l}>
                  <Link to={to}
                    className="text-sm flex items-center gap-1.5 group transition-colors duration-200"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--gold)' }} />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase mb-5" style={{ color: 'var(--text-faint)' }}>Contact</div>
            <ul className="space-y-3.5">
              {[
                { icon: <Phone size={12} />,  text: '02-XXX-XXXX' },
                { icon: '🚑',                  text: 'Emergency: 24/7' },
                { icon: <Mail size={12} />,    text: 'info@mingalarpetclinic.com' },
                { icon: <MapPin size={12} />,  text: 'No. 45, Pyay Road, Kamayut, Yangon' },
                { icon: <Clock size={12} />,   text: 'Mon–Fri 8am–8pm' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span className="w-4 flex-shrink-0 flex items-center" style={{ color: 'var(--gold)' }}>{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--text-faint)' }}>
          <span>© 2026 Mingalar Pet Clinic. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/" className="transition-colors hover:text-[#C9A84C]">Privacy Policy</Link>
            <Link to="/" className="transition-colors hover:text-[#C9A84C]">Terms of Service</Link>
            <span>Made with 🐾 in Yangon</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

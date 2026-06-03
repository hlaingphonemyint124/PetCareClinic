import { Link } from 'react-router-dom'
import { LOGO_URI } from '../../../lib/logoData'
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-bg-1 border-t border-[rgba(201,168,76,0.08)] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={LOGO_URI} alt="Mingalar Pet Clinic" className="w-12 h-12 object-contain" style={{filter:"drop-shadow(0 0 8px rgba(201,168,76,0.35))"}} />
              <div>
                <div className="font-display text-white text-base leading-none">Mingalar</div>
                <div className="text-white/25 text-[10px]">Veterinary Clinic</div>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5">
              Modern veterinary medicine with genuine compassion. Serving Yangon families since 2010.
            </p>
            <div className="flex gap-2">
              {[['FB', '#1877F2'], ['IG', '#E4405F'], ['LINE', '#06C755'], ['YT', '#FF0000']].map(([label, color]) => (
                <div key={label} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-[10px] font-bold cursor-pointer hover:scale-110 transition-transform duration-200"
                  style={{ color }}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-5">Services</div>
            <ul className="space-y-3">
              {['General Consultation', 'Vaccination', 'Surgery', 'Dental Care', 'Grooming', 'Emergency'].map(l => (
                <li key={l}>
                  <Link to="/services" className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-1.5 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A84C]" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-5">Clinic</div>
            <ul className="space-y-3">
              {[['About Us', '/about'], ['Our Team', '/vets'], ['Pet Blog', '/blog'], ['Book Appointment', '/booking'], ['Contact', '/contact']].map(([l, to]) => (
                <li key={l}>
                  <Link to={to} className="text-white/40 text-sm hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-1.5 group">
                    <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A84C]" />
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/20 mb-5">Contact</div>
            <ul className="space-y-3.5">
              {[
                { icon: <Phone size={12} />,  text: '02-XXX-XXXX' },
                { icon: '🚑',                 text: 'Emergency: 24/7' },
                { icon: <Mail size={12} />,   text: 'info@mingalarpetclinic.com' },
                { icon: <MapPin size={12} />, text: 'No. 45, Pyay Road, Kamayut, Yangon' },
                { icon: <Clock size={12} />,  text: 'Mon–Fri 8am–8pm' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-white/40 text-sm">
                  <span className="text-[#C9A84C] w-4 flex-shrink-0 flex items-center">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(201,168,76,0.08)] pt-7 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/20">
          <span>© 2026 Mingalar Pet Clinic. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-white/40 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white/40 transition-colors">Terms of Service</Link>
            <span>Made with 🐾 in Yangon</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

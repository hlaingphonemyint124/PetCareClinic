import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Phone, CalendarDays, MessageCircle, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useReveal, SectionHeader } from './shared'

// ─────────────────────────────────────────────────────────────
//  DATA  — categories + rich answers
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'visits',       label: 'Visits',       icon: '🏥' },
  { id: 'vaccinations', label: 'Vaccinations',  icon: '💉' },
  { id: 'records',      label: 'Records',       icon: '📋' },
  { id: 'surgery',      label: 'Surgery',       icon: '⚕️' },
]

const FAQS = [
  {
    cat: 'visits',
    q: 'Do you accept walk-in patients?',
    a: "Yes — we welcome walk-ins during clinic hours (Mon–Sat 8 AM–8 PM). For emergencies we're available 24/7. Booking online ensures you get your preferred vet and time slot.",
    bullets: [
      'Walk-ins welcome Mon–Sat, 8 AM–8 PM',
      '24/7 emergency line always open',
      'Online booking secures your preferred vet',
    ],
    link: { label: 'Book a slot', to: '/booking' },
  },
  {
    cat: 'visits',
    q: 'What should I bring to the first visit?',
    a: "Any previous vaccination records or medical history (even a photo on your phone is fine), your pet's current food and medications, and if possible a fresh stool sample for new patients.",
    bullets: [
      'Previous vaccination records or photos',
      'Current food & medications list',
      'Fresh stool sample for new patients (optional)',
    ],
  },
  {
    cat: 'vaccinations',
    q: 'What vaccinations does my puppy need?',
    a: "Puppies need a core series starting at 8 weeks. Our vets will create a personalised schedule at your first visit based on your dog's lifestyle and risk factors.",
    bullets: [
      'DHPP at 8, 12, and 16 weeks',
      'Rabies at 16 weeks (required by law)',
      'Leptospirosis & Bordetella — lifestyle dependent',
    ],
    link: { label: 'View vaccination guide', to: '/blog/2' },
  },
  {
    cat: 'vaccinations',
    q: 'How often does my adult pet need boosters?',
    a: 'After the initial series, most core vaccines are boosted annually or every three years depending on the vaccine type and your pet\'s health status. We send reminders via your owner portal.',
    bullets: [
      'Annual boosters for Rabies & Leptospirosis',
      'DHPP/FVRCP every 1–3 years based on titre tests',
      'Automatic reminders via owner portal',
    ],
  },
  {
    cat: 'records',
    q: "How do I access my pet's medical records?",
    a: 'All records, vaccination certificates, and lab results are available instantly through your Mingalar owner portal. Download PDFs, share with other vets, and set up vaccination reminders.',
    bullets: [
      'Instant access via owner portal',
      'Download PDF certificates anytime',
      'Share directly with other veterinary clinics',
    ],
    link: { label: 'Go to portal', to: '/login' },
  },
  {
    cat: 'records',
    q: 'Can I share records with another clinic?',
    a: 'Yes. From your owner portal you can generate a shareable link or download a standardised PDF that any veterinary clinic can open. Records include full history, vaccines, and lab results.',
    bullets: [
      'Generate a shareable link in one click',
      'Standardised PDF format accepted worldwide',
      'Includes full history, labs, and imaging reports',
    ],
  },
  {
    cat: 'surgery',
    q: 'Is anaesthesia safe for my pet?',
    a: 'Modern veterinary anaesthesia is very safe. We perform pre-anaesthetic bloodwork, use dedicated monitoring equipment throughout, and have a trained anaesthesia team for every procedure.',
    bullets: [
      'Pre-op bloodwork for every patient',
      'Continuous multi-parameter monitoring',
      'Dedicated anaesthesia nurse throughout',
    ],
  },
  {
    cat: 'surgery',
    q: 'How long is the recovery after surgery?',
    a: 'Recovery varies by procedure. Most soft-tissue surgeries require 10–14 days of rest with suture checks at days 3 and 10. Orthopaedic procedures may need 6–8 weeks of controlled exercise.',
    bullets: [
      'Soft-tissue: 10–14 days, two check-ups included',
      'Orthopaedic: 6–8 weeks, physiotherapy referral available',
      'Post-op care instructions sent to your portal',
    ],
  },
]

// ─────────────────────────────────────────────────────────────
//  ACCORDION ITEM
// ─────────────────────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="relative overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: isOpen
          ? 'rgba(201,168,76,0.04)'
          : 'rgba(255,255,255,0.02)',
        border: isOpen
          ? '1px solid rgba(201,168,76,0.28)'
          : '1px solid rgba(255,255,255,0.06)',
        boxShadow: isOpen ? '0 0 28px rgba(201,168,76,0.06)' : 'none',
      }}
    >
      {/* Gold left bar — animates in when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full origin-top"
            style={{ background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.3))' }}
          />
        )}
      </AnimatePresence>

      {/* Question row */}
      <button
        type="button"
        className="w-full flex items-center gap-4 px-5 py-5 text-left group"
        onClick={onToggle}
      >
        {/* Index number */}
        <span
          className="font-mono text-[11px] font-semibold flex-shrink-0 transition-colors duration-200 w-6 text-right"
          style={{ color: isOpen ? '#C9A84C' : 'rgba(255,255,255,0.18)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <h3
          className="flex-1 font-medium text-sm md:text-[15px] leading-snug transition-colors duration-200"
          style={{ color: isOpen ? '#fff' : 'rgba(232,228,217,0.8)' }}
        >
          {faq.q}
        </h3>

        {/* +/− icon */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.05)',
            border: isOpen ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="minus"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Minus size={12} style={{ color: '#C9A84C' }} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Plus size={12} style={{ color: 'rgba(232,228,217,0.4)' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Answer */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pl-[52px]">
          {/* Main answer text */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'rgba(232,228,217,0.55)' }}
          >
            {faq.a}
          </p>

          {/* Rich bullet list */}
          {faq.bullets && (
            <ul className="space-y-2 mb-4">
              {faq.bullets.map((b, bi) => (
                <motion.li
                  key={bi}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -8 }}
                  transition={{ delay: 0.12 + bi * 0.06 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2
                    size={13}
                    style={{ color: '#C9A84C', flexShrink: 0 }}
                  />
                  <span
                    className="text-xs leading-snug"
                    style={{ color: 'rgba(232,228,217,0.6)' }}
                  >
                    {b}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Optional learn-more link */}
          {faq.link && (
            <Link
              to={faq.link.to}
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/link"
              style={{ color: '#C9A84C' }}
            >
              {faq.link.label}
              <ChevronRight
                size={12}
                className="transition-transform duration-200 group-hover/link:translate-x-0.5"
              />
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────
//  MAIN SECTION
// ─────────────────────────────────────────────────────────────
export function FAQSection() {
  const [ref, inView]       = useReveal()
  const [activeTab, setTab] = useState('visits')
  const [open, setOpen]     = useState(null)

  const filtered = FAQS.filter(f => f.cat === activeTab)

  const handleTab = (id) => {
    setTab(id)
    setOpen(null)   // close any open item on tab switch
  }

  return (
    <section
      className="py-20 md:py-28 px-4 md:px-6 bg-bg relative overflow-hidden"
      ref={ref}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,168,76,0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 50% 55%, rgba(201,168,76,0.04), transparent)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Common questions"
            title="Frequently"
            highlight="Asked"
            subtitle="Everything you need to know before your first visit."
          />
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {CATEGORIES.map(cat => {
            const isActive = cat.id === activeTab
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleTab(cat.id)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300"
                style={{
                  background: isActive ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? '1px solid rgba(201,168,76,0.45)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: isActive ? '#C9A84C' : 'rgba(232,228,217,0.45)',
                  boxShadow: isActive ? '0 0 16px rgba(201,168,76,0.1)' : 'none',
                }}
              >
                <span>{cat.icon}</span>
                <span style={{ letterSpacing: '0.04em' }}>{cat.label}</span>

                {/* Active underline pill */}
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ border: '1px solid rgba(201,168,76,0.45)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* ── FAQ accordion ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-2.5"
          >
            {filtered.map((faq, i) => (
              <FAQItem
                key={`${activeTab}-${i}`}
                faq={faq}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Still have questions CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.14)',
          }}
        >
          <div className="text-center md:text-left">
            <h3
              className="font-display text-white text-lg font-semibold mb-1"
            >
              Still have questions?
            </h3>
            <p
              className="text-sm"
              style={{ color: 'rgba(232,228,217,0.45)' }}
            >
              Our team is available Mon–Sat 8 AM–8 PM, or 24/7 for emergencies.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 flex-wrap justify-center">
            {/* Call */}
            <a
              href="tel:+95123456789"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(232,228,217,0.7)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = '#C9A84C' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(232,228,217,0.7)' }}
            >
              <Phone size={13} />
              Call Us
            </a>

            {/* Chat / Contact */}
            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(232,228,217,0.7)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = '#C9A84C' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(232,228,217,0.7)' }}
            >
              <MessageCircle size={13} />
              Message Us
            </Link>

            {/* Book */}
            <Link
              to="/booking"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #C9A84C, #e8c870)',
                color: '#0B1628',
                boxShadow: '0 4px 16px rgba(201,168,76,0.28)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              <CalendarDays size={13} />
              Book Appointment
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default FAQSection
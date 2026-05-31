import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { useReveal, SectionHeader } from './shared'

const FAQS = [
  { q: 'Do you accept walk-in patients?',
    a: "Yes — we welcome walk-ins during clinic hours (Mon–Sat 8 AM–8 PM). For emergencies, we're available 24/7. Booking online ensures you get your preferred vet and time slot." },
  { q: 'What vaccinations does my puppy need?',
    a: "Puppies need a core series: DHPP at 8, 12, and 16 weeks, then Rabies at 16 weeks. We also recommend Leptospirosis and Bordetella based on your dog's lifestyle. Our vets will create a personalised schedule at your first visit." },
  { q: "How do I access my pet's medical records?",
    a: "All records, vaccination certificates, and lab results are available instantly through your Mingalar owner portal. You can download PDFs, share with other vets, and set up vaccination reminders." },
  { q: 'Is anesthesia safe for my pet?',
    a: 'Modern veterinary anaesthesia is very safe. We perform pre-anaesthetic bloodwork, use dedicated monitoring equipment throughout, and have a trained anaesthesia team for all procedures.' },
  { q: 'What should I bring to the first visit?',
    a: "Any previous vaccination records or medical history (even a photo on your phone is fine), your pet's current food/medications, and if possible, a fresh stool sample for new patients." },
]

export function FAQSection() {
  const [ref, inView] = useReveal()
  const [open, setOpen] = useState(null)

  return (
    <section className="py-28 px-6 bg-bg relative" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader eyebrow="Common questions" title="Frequently" highlight="Asked"
            subtitle="Everything you need to know before your first visit." />
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div key={i}
              className="glass rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: open === i ? '1px solid rgba(201,168,76,0.25)' : '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between px-6 py-5">
                <h3 className={clsx('font-medium text-sm transition-colors duration-200', open === i ? 'text-[#C9A84C]' : 'text-white')}>{faq.q}</h3>
                <ChevronDown size={16} className={clsx('flex-shrink-0 ml-4 transition-all duration-300',
                  open === i ? 'rotate-180 text-[#C9A84C]' : 'text-white/25')} />
              </div>
              <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                <p className="text-white/50 text-sm leading-relaxed px-6 pb-5">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// TestimonialsSection.jsx
import { motion } from 'framer-motion'
import { useReveal, SectionHeader } from './shared'

const TESTIMONIALS = [
  { name: 'Sarah Johnson', handle: '@sarah_j', pet: 'Labrador owner · 3 yrs', body: "Mingalar saved my dog's life after he ate something toxic. Fast, professional, genuinely caring.", initials: 'SJ', color: '#1d3a5c', textColor: '#7ab3e8', emoji: '🐕' },
  { name: 'Tom Chen', handle: '@tomchen', pet: 'Persian cat · 2 yrs', body: "The portal is brilliant — full medical history, vaccination certs, midnight booking. Modern and convenient.", initials: 'TC', color: '#2d1a4a', textColor: '#a87de8', emoji: '🐈' },
  { name: 'Ananya Malik', handle: '@ananya', pet: 'Rabbit owner · 1 yr', body: "Dr. Htet Aung diagnosed my rabbit's condition when three other vets couldn't. State-of-the-art diagnostics.", initials: 'AM', color: '#1a3d2a', textColor: '#6ec98a', emoji: '🐇' },
  { name: 'Kyaw Zin', handle: '@kyawzin', pet: 'Shih Tzu · 4 yrs', body: "The 24/7 emergency line gave me peace of mind. Picked up immediately and walked me through everything.", initials: 'KZ', color: '#3d2010', textColor: '#e8a070', emoji: '🐶' },
  { name: 'Mya Thin', handle: '@myathin', pet: 'Cockatiel · 2 yrs', body: "I was nervous about my bird's first visit, but the avian specialist put us both at ease instantly.", initials: 'MT', color: '#1a2d3d', textColor: '#70b8e8', emoji: '🦜' },
  { name: 'Zaw Lin', handle: '@zawlin', pet: 'Golden Ret. · 5 yrs', body: "Regular wellness check-ups have kept Coco in perfect shape. The vet truly understands large breeds.", initials: 'ZL', color: '#3d3010', textColor: '#e8cc70', emoji: '🐕‍🦺' },
  { name: 'Su Su', handle: '@su_su_mm', pet: 'Siamese cat · 3 yrs', body: "Transparent pricing and no hidden fees. A refreshing change from other clinics.", initials: 'SS', color: '#3d1a28', textColor: '#e870a0', emoji: '🐈‍⬛' },
  { name: 'Min Aung', handle: '@min_a', pet: 'Husky · 2 yrs', body: "The follow-up calls after surgery really showed they care. Exceptional aftercare beyond just treatment.", initials: 'MA', color: '#102030', textColor: '#50a0d8', emoji: '🐺' },
  { name: 'Nwe Nwe', handle: '@nwenwe', pet: 'Pomeranian · 1 yr', body: "App reminders for vaccines keep me organised. The digital experience is years ahead.", initials: 'NN', color: '#301025', textColor: '#d870c0', emoji: '🐩' },
  { name: 'Htun Htun', handle: '@htun2', pet: 'Corgi · 3 yrs', body: "My corgi was anxious on the first visit but now trots in happily. Real patience from the whole team.", initials: 'HH', color: '#1a300a', textColor: '#80c050', emoji: '🐕' },
  { name: 'Aye Myint', handle: '@ayemyint', pet: 'Tabby cat · 6 yrs', body: "Six years and never a bad visit. Consistent quality and the team genuinely remembers my cat.", initials: 'AM', color: '#2a1a0a', textColor: '#d89050', emoji: '🐱' },
  { name: 'Thant Zin', handle: '@thantzin', pet: 'Dalmatian · 2 yrs', body: "The orthopaedic specialist helped my Dalmatian recover fully from hip surgery. Incredible expertise.", initials: 'TZ', color: '#0a1a3a', textColor: '#6090e0', emoji: '🐶' },
]

function StarRating({ size = 'sm' }) {
  const cls = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={cls} viewBox="0 0 12 12" fill="#c9a84c">
          <path d="M6 1l1.3 2.7L10.5 4l-2.2 2.1.5 3L6 7.8 3.2 9.1l.5-3L1.5 4l3.2-.3z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ name, handle, pet, body, initials, color, textColor, emoji }) {
  return (
    <div className="glass rounded-xl p-3.5 flex-shrink-0 hover:bg-white/[0.07] transition-colors duration-200 cursor-default">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
          style={{ background: color, color: textColor, border: `1.5px solid ${textColor}30` }}
        >
          {initials}
        </div>
        <div>
          <p className="text-[12px] font-medium leading-tight" style={{ color: '#f0ebe0' }}>
            {name} <span className="text-[11px] opacity-50">{emoji}</span>
          </p>
          <p className="text-[10px] mt-0.5" style={{ color: 'rgba(240,235,224,0.3)' }}>
            {handle} · {pet}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <StarRating size="sm" />
      </div>
      <p className="text-[11.5px] leading-relaxed" style={{ color: 'rgba(240,235,224,0.55)' }}>
        {body}
      </p>
    </div>
  )
}

function MarqueeColumn({ direction }) {
  const animationName = direction === 'down' ? 'scrollDown' : 'scrollUp'
  const duration = direction === 'down' ? '36s' : '40s'

  return (
    <div className="flex flex-col gap-3.5 flex-shrink-0 overflow-hidden" style={{ width: '190px' }}>
      <div
        className="flex flex-col gap-3.5"
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const [ref, inView] = useReveal()

  return (
    <section className="py-28 px-6 bg-bg-2 relative overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.035) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center gap-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Loved by Yangon families"
            title="What Pet Owners"
            highlight="Say"
          />

          <motion.div
            className="flex items-center justify-center gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
          >
            <StarRating size="md" />
            <span className="font-display text-white text-lg font-bold">4.9</span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              from 380+ Google reviews
            </span>
          </motion.div>
        </motion.div>

        {/* ── 3D Marquee Stage ── */}
        <motion.div
          className="w-full relative overflow-hidden rounded-2xl"
          style={{
            height: '420px',
            border: '0.5px solid rgba(255,255,255,0.07)',
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Stage ambient */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '500px',
              height: '250px',
              background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
            }}
          />

          {/* Perspective + 3D transform */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '600px' }}
          >
            <div
              className="flex gap-3.5"
              style={{
                transform:
                  'translateX(-60px) translateY(10px) translateZ(-80px) rotateX(18deg) rotateY(-8deg) rotateZ(18deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              <MarqueeColumn direction="down" />
              <MarqueeColumn direction="up" />
              <MarqueeColumn direction="down" />
              <MarqueeColumn direction="up" />
            </div>
          </div>

          {/* Edge gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10" style={{ height: '28%', background: 'linear-gradient(to bottom, var(--bg-2, #0a1120), transparent)' }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10" style={{ height: '28%', background: 'linear-gradient(to top, var(--bg-2, #0a1120), transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10" style={{ width: '18%', background: 'linear-gradient(to right, var(--bg-2, #0a1120), transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10" style={{ width: '18%', background: 'linear-gradient(to left, var(--bg-2, #0a1120), transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}
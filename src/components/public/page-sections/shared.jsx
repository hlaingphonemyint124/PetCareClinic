import { useRef } from 'react'
import { useInView } from 'framer-motion'
import clsx from 'clsx'

// ── Reveal hook ───────────────────────────────────────────────────
export function useReveal(margin = '-60px') {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin })
  return [ref, inView]
}

// ── Section header ────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, highlight, subtitle, center = true }) {
  return (
    <div className={clsx('mb-14', center && 'text-center')}>
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
        <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.14em] uppercase">{eyebrow}</span>
        <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
      </div>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white mb-4">
        {title} {highlight && <span className="gradient-text italic">{highlight}</span>}
      </h2>
      {subtitle && <p className="text-white/40 max-w-md mx-auto leading-relaxed">{subtitle}</p>}
    </div>
  )
}

// ── Wave divider ──────────────────────────────────────────────────
export function WaveDivider({ flip = false, color = '#0a0d16' }) {
  return (
    <div className={clsx('w-full overflow-hidden leading-none', flip && 'rotate-180')} style={{ height: 60 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  )
}

// ── Colour palette (shared across Vets, Testimonials, Facilities) ─
export const COLOR_MAP = {
  green:  { bg: 'rgba(201,168,76,0.1)',   border: 'rgba(201,168,76,0.2)',   text: '#C9A84C', ring: 'rgba(201,168,76,0.25)' },
  amber:  { bg: 'rgba(255,184,77,0.1)',  border: 'rgba(255,184,77,0.2)',  text: '#e8c870', ring: 'rgba(255,184,77,0.25)' },
  blue:   { bg: 'rgba(77,166,255,0.1)',  border: 'rgba(77,166,255,0.2)',  text: '#4da6ff', ring: 'rgba(77,166,255,0.25)' },
  purple: { bg: 'rgba(180,138,255,0.1)', border: 'rgba(180,138,255,0.2)', text: '#b48aff', ring: 'rgba(180,138,255,0.25)' },
}

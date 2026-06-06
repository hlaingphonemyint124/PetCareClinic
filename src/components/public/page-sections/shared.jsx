import { useRef } from 'react'
import { useInView } from 'framer-motion'
import clsx from 'clsx'

export function useReveal(margin = '-60px') {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin })
  return [ref, inView]
}

// ── Section Header — uses CSS variables so it works in both themes ─
export function SectionHeader({ eyebrow, title, highlight, subtitle, center = true }) {
  return (
    <div className={clsx('mb-14', center && 'text-center')}>
      <div className="inline-flex items-center gap-2 mb-4">
        <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
        <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--gold)' }}>
          {eyebrow}
        </span>
        <div className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
      </div>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] mb-4" style={{ color: 'var(--text-primary)' }}>
        {title} {highlight && <span className="gradient-text italic">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function WaveDivider({ flip = false }) {
  return (
    <div className={clsx('w-full overflow-hidden leading-none', flip && 'rotate-180')} style={{ height: 60 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="var(--bg-1)" />
      </svg>
    </div>
  )
}

export const COLOR_MAP = {
  green:  { bg: 'rgba(201,168,76,0.1)',   border: 'rgba(201,168,76,0.2)',   text: '#C9A84C', ring: 'rgba(201,168,76,0.25)' },
  amber:  { bg: 'rgba(255,184,77,0.1)',   border: 'rgba(255,184,77,0.2)',   text: '#e8c870', ring: 'rgba(255,184,77,0.25)' },
  blue:   { bg: 'rgba(77,166,255,0.1)',   border: 'rgba(77,166,255,0.2)',   text: '#4da6ff', ring: 'rgba(77,166,255,0.25)' },
  purple: { bg: 'rgba(180,138,255,0.1)',  border: 'rgba(180,138,255,0.2)',  text: '#b48aff', ring: 'rgba(180,138,255,0.25)' },
}

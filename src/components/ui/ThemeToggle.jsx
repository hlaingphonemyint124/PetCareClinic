import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../lib/ThemeContext'

export function ThemeToggle({ className = '' }) {
  const { theme, toggle, isDark } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex items-center flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] ${className}`}
      style={{
        width: 52,
        height: 28,
        background: isDark
          ? 'rgba(11,22,40,0.9)'
          : 'rgba(255,248,235,0.95)',
        border: isDark
          ? '1px solid rgba(201,168,76,0.3)'
          : '1px solid rgba(184,148,62,0.4)',
        boxShadow: isDark
          ? '0 0 12px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.04)'
          : '0 0 12px rgba(184,148,62,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
        padding: 3,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Background track icons */}
      <Moon
        size={10}
        className="absolute"
        style={{
          left: 7,
          color: isDark ? 'rgba(201,168,76,0.6)' : 'rgba(150,130,80,0.2)',
          transition: 'color 0.3s ease',
        }}
      />
      <Sun
        size={10}
        className="absolute"
        style={{
          right: 7,
          color: isDark ? 'rgba(150,130,80,0.2)' : 'rgba(184,148,62,0.7)',
          transition: 'color 0.3s ease',
        }}
      />

      {/* Sliding thumb */}
      <motion.div
        className="relative z-10 rounded-full flex items-center justify-center flex-shrink-0"
        animate={{
          x: isDark ? 0 : 24,
          background: isDark
            ? 'linear-gradient(135deg, #C9A84C 0%, #e8c870 100%)'
            : 'linear-gradient(135deg, #f0c040 0%, #C9A84C 100%)',
        }}
        transition={{ type: 'spring', stiffness: 550, damping: 32, mass: 0.8 }}
        style={{
          width: 22,
          height: 22,
          boxShadow: isDark
            ? '0 2px 8px rgba(201,168,76,0.55), 0 0 0 1px rgba(201,168,76,0.2)'
            : '0 2px 8px rgba(184,148,62,0.4), 0 0 0 1px rgba(184,148,62,0.15)',
        }}
      >
        {/* Icon swap with rotate animation */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -45, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1 }}
            exit={{   rotate: 45,  opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-center"
          >
            {isDark
              ? <Moon size={11} style={{ color: '#0B1628' }} />
              : <Sun  size={11} style={{ color: '#0B1628' }} />
            }
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}

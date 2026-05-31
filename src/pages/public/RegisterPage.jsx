import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../../lib/AppContext'
import toast from 'react-hot-toast'
import { LOGO_URI } from '../../lib/logoData'

export function RegisterPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' })
  const [loading, setLoading] = useState(false)
  const { register } = useApp()
  const navigate = useNavigate()

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { toast.error('Passwords do not match.'); return }
    if (form.password.length < 8) { toast.error('Password must be at least 8 characters.'); return }
    setLoading(true)
    const result = await register(form.name, form.email, form.password, form.phone)
    setLoading(false)
    if (result.success) {
      toast.success('Account created! Welcome to Mingalar.')
      navigate('/dashboard/owner')
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{background:'#07101e'}}>
      <motion.div className="w-full max-w-md" initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 mb-8 group">
          <img src={LOGO_URI} alt="Mingalar" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" style={{filter:"drop-shadow(0 0 8px rgba(201,168,76,0.3))"}} />
          <div>
            <div className="font-display text-xl" style={{color:'#C9A84C'}}>Mingalar</div>
            <div className="text-[10px] tracking-widest" style={{color:'rgba(201,168,76,0.4)'}}>PET CLINIC</div>
          </div>
        </Link>

        <h1 className="font-display text-3xl text-white mb-2">Create Account</h1>
        <p className="text-sm mb-8" style={{color:'rgba(232,228,217,0.4)'}}>Join Yangon's premier pet care community</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Full Name</label>
            <input className="form-input" placeholder="Ko Kyaw Zin" value={form.name} onChange={set('name')} required />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Email</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Phone (Myanmar)</label>
            <input className="form-input" placeholder="09-xxx-xxxxxx" value={form.phone} onChange={set('phone')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Password</label>
              <input className="form-input" type="password" placeholder="min. 8 chars" value={form.password} onChange={set('password')} required />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 tracking-wide" style={{color:'rgba(232,228,217,0.5)'}}>Confirm</label>
              <input className="form-input" type="password" placeholder="repeat" value={form.confirm} onChange={set('confirm')} required />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{color:'rgba(232,228,217,0.35)'}}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{color:'#C9A84C'}}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}

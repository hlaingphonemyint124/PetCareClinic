import Sidebar from '../../components/layout/Sidebar'
import { useApp } from '../../lib/AppContext'
import toast from 'react-hot-toast'

export function DashLayout({ title, children }) {
  const { user } = useApp()
  return (
    <div className="flex h-screen overflow-hidden" style={{background:'var(--bg-1)'}}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-[64px] flex items-center justify-between px-6 flex-shrink-0"
          style={{ background:'rgba(6,11,20,0.9)', backdropFilter:'blur(24px)', borderBottom:'1px solid rgba(201,168,76,0.1)' }}>
          <div>
            <h1 className="text-white font-semibold text-sm leading-none">{title}</h1>
            <p className="text-[11px] mt-0.5" style={{color:'rgba(232,228,217,0.25)'}}>Pet Owner Dashboard</p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
              style={{border:'1px solid rgba(201,168,76,0.12)',background:'rgba(201,168,76,0.04)',color:'rgba(232,228,217,0.3)'}}>
              <span>🔍</span>
              <input className="bg-transparent outline-none w-28 placeholder:text-white/20 text-white/70" placeholder="Search..." />
            </div>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all relative"
              style={{border:'1px solid rgba(201,168,76,0.12)',background:'rgba(201,168,76,0.04)'}}
              onClick={() => toast('3 notifications')}>
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#C9A84C'}} />
            </button>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.25)',color:'#C9A84C'}}>
              {user?.avatar || user?.name?.[0] || 'KZ'}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6"
          style={{ background:'radial-gradient(ellipse at top,rgba(201,168,76,0.025) 0%,transparent 50%),var(--bg-1)' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

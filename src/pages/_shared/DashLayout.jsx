import Sidebar from '../../components/layout/Sidebar'
import toast from 'react-hot-toast'

/**
 * DashLayout — generic shell used by Vet and Reception dashboards.
 * Owner and Admin have their own layout variants.
 */
export function DashLayout({ title, children }) {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header
          className="h-[60px] border-b border-white/[0.05] flex items-center justify-between px-6 flex-shrink-0"
          style={{ background:'var(--glass-strong-bg)', backdropFilter: 'blur(20px)' }}>
          <h1 className="font-semibold text-white text-sm">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 text-xs text-white/30 border border-white/[0.05]">
              <span>🔍</span>
              <input
                className="bg-transparent outline-none w-28 placeholder:text-white/20 text-white/70"
                placeholder="Search..." />
            </div>
            <button
              className="w-8 h-8 glass rounded-full flex items-center justify-center text-sm relative hover:border-white/15 transition-all"
              onClick={() => toast('No new notifications')}>
              🔔
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red rounded-full animate-pulse" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

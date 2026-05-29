import { useState } from 'react'
import Menu from './Menu'
import { useTema } from '../contexts/ThemeContext'
import { Menu as MenuIcon, X, Sun, Moon } from 'lucide-react'

export default function Layout({ children }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const { tema, alternarTema } = useTema()

  return (
    <div className="flex h-screen bg-dk-bg">
      <aside
        className={`fixed lg:relative z-30 h-screen w-60 bg-dk-surface border-r border-dk-border transform transition-transform duration-300 flex-shrink-0 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Menu onNavegou={() => setMenuAberto(false)} />
      </aside>

      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden z-20"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <main className="flex-1 overflow-auto min-w-0">
        <header className="lg:hidden bg-dk-surface border-b border-dk-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mioli" className="h-8 w-auto object-contain" />
            <span className="text-dk-text font-semibold text-sm">Mioli</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={alternarTema}
              className="p-2 hover:bg-dk-hover rounded-lg transition-colors text-dk-muted"
            >
              {tema === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="p-2 hover:bg-dk-hover rounded-lg transition-colors"
            >
              {menuAberto ? (
                <X size={22} className="text-dk-muted" />
              ) : (
                <MenuIcon size={22} className="text-dk-muted" />
              )}
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../services/authService'
import { useTema } from '../contexts/ThemeContext'
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  LogOut,
  History,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react'
import { useState } from 'react'

export default function Menu({ onNavegou }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { tema, alternarTema } = useTema()
  const [estoqueAberto, setEstoqueAberto] = useState(
    location.pathname.startsWith('/estoque')
  )
  const [vendasAberto, setVendasAberto] = useState(
    location.pathname.startsWith('/vendas')
  )

  const handleNavegar = (path) => {
    navigate(path)
    onNavegou?.()
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const itemClass = (active) =>
    `w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
      active
        ? 'bg-brand-600/20 text-brand-400 font-medium'
        : 'text-dk-muted hover:bg-dk-hover hover:text-dk-text'
    }`

  return (
    <nav className="h-full flex flex-col bg-dk-surface overflow-y-auto">
      {/* Logo */}
      <div className="p-5 border-b border-dk-border">
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="Mioli"
            className="h-9 w-9 object-contain rounded-lg flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-dk-text text-sm font-semibold leading-tight truncate">
              Mioli Acessórios
            </p>
            <p className="text-dk-muted text-xs">e Presentes</p>
          </div>
        </div>
      </div>

      {/* Itens de navegação */}
      <div className="flex-1 p-3 space-y-0.5">
        <button
          onClick={() => handleNavegar('/dashboard')}
          className={itemClass(isActive('/dashboard'))}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => handleNavegar('/produtos')}
          className={itemClass(isActive('/produtos'))}
        >
          <Package size={18} />
          <span>Produtos</span>
        </button>

        {/* Estoque */}
        <div>
          <button
            onClick={() => setEstoqueAberto(!estoqueAberto)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              location.pathname.startsWith('/estoque')
                ? 'bg-brand-600/20 text-brand-400 font-medium'
                : 'text-dk-muted hover:bg-dk-hover hover:text-dk-text'
            }`}
          >
            <div className="flex items-center space-x-3">
              <PackagePlus size={18} />
              <span>Estoque</span>
            </div>
            {estoqueAberto ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {estoqueAberto && (
            <div className="ml-8 mt-0.5 space-y-0.5">
              <button
                onClick={() => handleNavegar('/estoque')}
                className={itemClass(isActive('/estoque'))}
              >
                <PackagePlus size={15} />
                <span>Entrada</span>
              </button>
              <button
                onClick={() => handleNavegar('/estoque/historico')}
                className={itemClass(isActive('/estoque/historico'))}
              >
                <History size={15} />
                <span>Histórico</span>
              </button>
            </div>
          )}
        </div>

        {/* Vendas */}
        <div>
          <button
            onClick={() => setVendasAberto(!vendasAberto)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
              location.pathname.startsWith('/vendas')
                ? 'bg-brand-600/20 text-brand-400 font-medium'
                : 'text-dk-muted hover:bg-dk-hover hover:text-dk-text'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ShoppingCart size={18} />
              <span>Vendas</span>
            </div>
            {vendasAberto ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {vendasAberto && (
            <div className="ml-8 mt-0.5 space-y-0.5">
              <button
                onClick={() => handleNavegar('/vendas')}
                className={itemClass(isActive('/vendas'))}
              >
                <ShoppingCart size={15} />
                <span>Registrar</span>
              </button>
              <button
                onClick={() => handleNavegar('/vendas/historico')}
                className={itemClass(isActive('/vendas/historico'))}
              >
                <History size={15} />
                <span>Histórico</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tema + Logout */}
      <div className="p-3 border-t border-dk-border space-y-1">
        <button
          onClick={alternarTema}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-dk-muted hover:bg-dk-hover hover:text-dk-text transition-colors"
        >
          {tema === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{tema === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-dk-muted hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  )
}

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ListaProdutos from './pages/Produtos/ListaProdutos'
import EntradaEstoque from './pages/Estoque/EntradaEstoque'
import HistoricoEntradas from './pages/Estoque/HistoricoEntradas'
import RegistroVenda from './pages/Vendas/RegistroVenda'
import HistoricoVendas from './pages/Vendas/HistoricoVendas'

function AppRoutes() {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-screen bg-dk-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <p className="page-subtitle">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      {!usuario ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/produtos" element={<ListaProdutos />} />
            <Route path="/estoque" element={<EntradaEstoque />} />
            <Route path="/estoque/historico" element={<HistoricoEntradas />} />
            <Route path="/vendas" element={<RegistroVenda />} />
            <Route path="/vendas/historico" element={<HistoricoVendas />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      )}
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App

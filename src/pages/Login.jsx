import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { signIn } from '../services/authService'
import { useTema } from '../contexts/ThemeContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { tema, alternarTema } = useTema()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    if (!email || !senha) {
      setErro('Email e senha são obrigatórios')
      setCarregando(false)
      return
    }

    const { erro: erroLogin } = await signIn(email, senha)

    if (erroLogin) {
      setErro('Email ou senha inválidos. Tente novamente.')
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-dk-bg flex items-center justify-center p-4">
      {/* Toggle de tema */}
      <button
        onClick={alternarTema}
        className="fixed top-4 right-4 p-2.5 rounded-xl bg-dk-card border border-dk-border text-dk-muted hover:text-dk-text hover:bg-dk-hover transition-colors"
        title={tema === 'dark' ? 'Modo claro' : 'Modo escuro'}
      >
        {tema === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Mioli Acessórios e Presentes"
            className="h-24 w-auto mx-auto mb-5 object-contain"
          />
          <h1 className="text-xl font-semibold text-dk-text">
            Mioli Acessórios e Presentes
          </h1>
          <p className="page-subtitle">Controle de Estoque</p>
        </div>

        <div className="card !p-7">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-base"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
              />
            </div>

            <div>
              <label className="label">Senha</label>
              <input
                type="password"
                className="input-base"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
              />
            </div>

            {erro && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="btn-primary w-full mt-2"
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, AlertTriangle, ShoppingCart, TrendingUp, RefreshCw, ArrowRight } from 'lucide-react'
import { listarProdutos, obterEstoqueBaixo } from '../services/produtosService'
import { obterUltimasVendas, obterResumoDia } from '../services/vendasService'
import { formatarMoeda, formatarDataHora } from '../utils/formatadores'

export default function Dashboard() {
  const navigate = useNavigate()
  const [totalProdutos, setTotalProdutos] = useState(0)
  const [produtosBaixo, setProdutosBaixo] = useState([])
  const [ultimasVendas, setUltimasVendas] = useState([])
  const [resumoDia, setResumoDia] = useState({ totalItens: 0, valorTotal: 0, quantidadeTransacoes: 0 })
  const [valorEstoque, setValorEstoque] = useState(0)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => { carregar() }, [])

  const carregar = async () => {
    setCarregando(true)

    const [
      { dados: produtos },
      { dados: baixo },
      { dados: vendas },
      { dados: resumo },
    ] = await Promise.all([
      listarProdutos(),
      obterEstoqueBaixo(),
      obterUltimasVendas(3),
      obterResumoDia(),
    ])

    setTotalProdutos(produtos?.length || 0)
    if (produtos) {
      setValorEstoque(produtos.reduce((acc, p) => acc + p.quantidade * p.preco_venda, 0))
    }
    setProdutosBaixo(baixo || [])
    setUltimasVendas(vendas || [])
    if (resumo) setResumoDia(resumo)

    setCarregando(false)
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-500 mx-auto mb-3"></div>
          <p className="page-subtitle">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Mioli Acessórios e Presentes</p>
        </div>
        <button onClick={carregar} className="btn-secondary flex items-center space-x-2">
          <RefreshCw size={15} />
          <span>Atualizar</span>
        </button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="page-subtitle !mt-0 uppercase tracking-wide text-xs font-medium">Produtos</p>
            <div className="w-8 h-8 bg-brand-600/15 rounded-lg flex items-center justify-center">
              <Package size={15} className="text-brand-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dk-text">{totalProdutos}</p>
        </div>

        <div className="card-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="page-subtitle !mt-0 uppercase tracking-wide text-xs font-medium">Valor Estoque</p>
            <div className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center">
              <TrendingUp size={15} className="text-emerald-500" />
            </div>
          </div>
          <p className="text-xl font-bold text-dk-text">{formatarMoeda(valorEstoque)}</p>
        </div>

        <div className="card-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="page-subtitle !mt-0 uppercase tracking-wide text-xs font-medium">Vendas Hoje</p>
            <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center">
              <ShoppingCart size={15} className="text-blue-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-dk-text">{resumoDia.totalItens}</p>
          <p className="page-subtitle !mt-1">{resumoDia.quantidadeTransacoes} transações</p>
        </div>

        <div className="card-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="page-subtitle !mt-0 uppercase tracking-wide text-xs font-medium">Faturamento Hoje</p>
            <div className="w-8 h-8 bg-violet-500/15 rounded-lg flex items-center justify-center">
              <TrendingUp size={15} className="text-violet-500" />
            </div>
          </div>
          <p className="text-xl font-bold text-dk-text">{formatarMoeda(resumoDia.valorTotal)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estoque baixo */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle size={17} className="text-amber-500" />
            <h2 className="text-dk-text font-semibold text-sm">
              Estoque Baixo ({produtosBaixo.length})
            </h2>
          </div>

          {produtosBaixo.length === 0 ? (
            <p className="page-subtitle">Tudo certo — nenhum produto com estoque crítico.</p>
          ) : (
            <div className="space-y-2">
              {produtosBaixo.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-dk-border last:border-0">
                  <p className="text-dk-text text-sm font-medium truncate flex-1 pr-4">{p.nome}</p>
                  <span className="badge-red flex-shrink-0">
                    <AlertTriangle size={11} />
                    <span>{p.quantidade} un.</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Últimas vendas */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-dk-text font-semibold text-sm">Últimas Vendas</h2>
            <button
              onClick={() => navigate('/vendas/historico')}
              className="flex items-center space-x-1 text-brand-400 hover:text-brand-300 text-xs font-medium transition-colors"
            >
              <span>Ver mais</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {ultimasVendas.length === 0 ? (
            <p className="page-subtitle">Nenhuma venda registrada ainda.</p>
          ) : (
            <div className="space-y-2">
              {ultimasVendas.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-2 border-b border-dk-border last:border-0">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-dk-text text-sm font-medium truncate">{v.produtos?.nome}</p>
                    <p className="page-subtitle !mt-0">{formatarDataHora(v.data)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-brand-400 text-sm font-semibold">
                      {formatarMoeda(v.quantidade * (v.produtos?.preco_venda || 0))}
                    </p>
                    <p className="page-subtitle !mt-0">{v.quantidade}x</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

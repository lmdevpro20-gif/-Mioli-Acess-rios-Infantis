import { useState, useEffect } from 'react'
import { Calendar, TrendingUp } from 'lucide-react'
import { listarVendas, obterResumoDia } from '../../services/vendasService'
import { formatarData, formatarHora, formatarMoeda } from '../../utils/formatadores'

export default function HistoricoVendas() {
  const [vendas, setVendas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [resumoDia, setResumoDia] = useState({ totalItens: 0, valorTotal: 0, quantidadeTransacoes: 0 })
  const [filtros, setFiltros] = useState({ dataInicial: '', dataFinal: '' })

  useEffect(() => {
    carregarVendas()
    carregarResumoDia()
  }, [filtros.dataInicial, filtros.dataFinal])

  const carregarVendas = async () => {
    setCarregando(true)
    setErro('')
    const { dados, erro: e } = await listarVendas(filtros)
    if (e) {
      setErro(e)
      setVendas([])
    } else {
      setVendas(dados || [])
    }
    setCarregando(false)
  }

  const carregarResumoDia = async () => {
    const { dados } = await obterResumoDia()
    if (dados) setResumoDia(dados)
  }

  const totalFiltrado = vendas.reduce((acc, v) => acc + v.quantidade * (v.produtos?.preco_venda || 0), 0)

  if (carregando && vendas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="page-title">Histórico de Vendas</h1>
        <p className="page-subtitle">{vendas.length} venda{vendas.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Resumo do dia */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="card-sm">
          <p className="text-dk-muted text-xs mb-1">Itens hoje</p>
          <p className="text-2xl font-bold text-dk-text">{resumoDia.totalItens}</p>
          <p className="text-dk-muted text-xs">{resumoDia.quantidadeTransacoes} transações</p>
        </div>
        <div className="card-sm">
          <p className="text-dk-muted text-xs mb-1">Faturamento hoje</p>
          <p className="text-xl font-bold text-dk-text">{formatarMoeda(resumoDia.valorTotal)}</p>
        </div>
        <div className="card-sm col-span-2 sm:col-span-1">
          <p className="text-dk-muted text-xs mb-1">Total filtrado</p>
          <p className="text-xl font-bold text-brand-400">{formatarMoeda(totalFiltrado)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="label">Data inicial</label>
            <input
              type="date"
              className="input-base"
              value={filtros.dataInicial}
              onChange={(e) => setFiltros({ ...filtros, dataInicial: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Data final</label>
            <input
              type="date"
              className="input-base"
              value={filtros.dataFinal}
              onChange={(e) => setFiltros({ ...filtros, dataFinal: e.target.value })}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFiltros({ dataInicial: '', dataFinal: '' })}
              className="btn-secondary w-full"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {erro && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {erro}
        </div>
      )}

      {/* Tabela */}
      <div className="card">
        {vendas.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={40} className="mx-auto mb-3 text-dk-muted/40" />
            <p className="text-dk-muted text-sm">Nenhuma venda encontrada</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dk-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dk-muted uppercase tracking-wide">Data e Hora</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dk-muted uppercase tracking-wide">Produto</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-dk-muted uppercase tracking-wide">Qtd.</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-dk-muted uppercase tracking-wide">Total</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((venda) => {
                  const total = venda.quantidade * (venda.produtos?.preco_venda || 0)
                  return (
                    <tr
                      key={venda.id}
                      className="border-b border-dk-border/50 hover:bg-dk-hover/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-dk-text font-medium">{formatarData(venda.data)}</p>
                        <p className="text-dk-muted text-xs">{formatarHora(venda.data)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-dk-text font-medium">{venda.produtos?.nome}</p>
                      </td>
                      <td className="px-4 py-3 text-center text-dk-text font-semibold">
                        {venda.quantidade}x
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-brand-400 font-bold">{formatarMoeda(total)}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t border-dk-border bg-dk-card2/50">
                  <td colSpan="3" className="px-4 py-3 text-right text-dk-muted text-sm font-medium">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-brand-400 font-bold">{formatarMoeda(totalFiltrado)}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

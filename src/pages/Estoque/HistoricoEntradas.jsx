import { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { listarEntradas } from '../../services/entradasService'
import { formatarData, formatarHora } from '../../utils/formatadores'

export default function HistoricoEntradas() {
  const [entradas, setEntradas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [filtros, setFiltros] = useState({ dataInicial: '', dataFinal: '' })

  useEffect(() => { carregarEntradas() }, [filtros.dataInicial, filtros.dataFinal])

  const carregarEntradas = async () => {
    setCarregando(true)
    setErro('')
    const { dados, erro: e } = await listarEntradas(filtros)
    if (e) {
      setErro(e)
      setEntradas([])
    } else {
      setEntradas(dados || [])
    }
    setCarregando(false)
  }

  if (carregando && entradas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="page-title">Histórico de Entradas</h1>
        <p className="page-subtitle">{entradas.length} registro{entradas.length !== 1 ? 's' : ''}</p>
      </div>

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

      <div className="card">
        {entradas.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={40} className="mx-auto mb-3 text-dk-muted/40" />
            <p className="text-dk-muted text-sm">Nenhuma entrada encontrada</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dk-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dk-muted uppercase tracking-wide">Data e Hora</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-dk-muted uppercase tracking-wide">Produto</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-dk-muted uppercase tracking-wide">Qtd. Adicionada</th>
                </tr>
              </thead>
              <tbody>
                {entradas.map((entrada) => (
                  <tr
                    key={entrada.id}
                    className="border-b border-dk-border/50 hover:bg-dk-hover/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-dk-text font-medium">{formatarData(entrada.data)}</p>
                      <p className="text-dk-muted text-xs">{formatarHora(entrada.data)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-dk-text font-medium">{entrada.produtos?.nome}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-emerald-400 font-bold">+{entrada.quantidade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

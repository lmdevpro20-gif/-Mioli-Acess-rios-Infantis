import { Trash2, Pencil, AlertTriangle } from 'lucide-react'
import { formatarMoeda } from '../utils/formatadores'

export default function TabelaProdutos({ produtos, onEdit, onDelete, carregando = false, showAcoes = true }) {
  if (carregando) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    )
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center py-14">
        <p className="text-dk-muted text-sm">Nenhum produto encontrado</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dk-border">
            <th className="px-4 py-3 text-left text-xs font-semibold text-dk-muted uppercase tracking-wide">Produto</th>
            <th className="px-4 py-3 text-center text-xs font-semibold text-dk-muted uppercase tracking-wide">Estoque</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-dk-muted uppercase tracking-wide">Preço</th>
            {showAcoes && (
              <th className="px-4 py-3 text-center text-xs font-semibold text-dk-muted uppercase tracking-wide">Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr
              key={produto.id}
              className="border-b border-dk-border/50 hover:bg-dk-hover/50 transition-colors"
            >
              <td className="px-4 py-3">
                <p className="font-medium text-dk-text">{produto.nome}</p>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className={`font-semibold ${produto.quantidade < 5 ? 'text-red-400' : 'text-dk-text'}`}>
                    {produto.quantidade}
                  </span>
                  {produto.quantidade < 5 && (
                    <AlertTriangle size={13} className="text-amber-400" />
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-right font-medium text-dk-text">
                {formatarMoeda(produto.preco_venda)}
              </td>
              {showAcoes && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center space-x-1">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(produto)}
                        className="p-1.5 text-dk-muted hover:text-brand-400 hover:bg-brand-600/10 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(produto.id)}
                        className="p-1.5 text-dk-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

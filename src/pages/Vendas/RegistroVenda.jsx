import { useState, useEffect } from 'react'
import { ShoppingCart, AlertCircle } from 'lucide-react'
import { listarProdutos } from '../../services/produtosService'
import { registrarVenda } from '../../services/vendasService'
import { formatarMoeda } from '../../utils/formatadores'

export default function RegistroVenda() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const [formData, setFormData] = useState({ produto_id: '', quantidade: '' })

  useEffect(() => { carregarProdutos() }, [])

  const carregarProdutos = async () => {
    const { dados } = await listarProdutos()
    setProdutos(dados || [])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setCarregando(true)

    if (!formData.produto_id || !formData.quantidade) {
      setErro('Selecione um produto e informe a quantidade')
      setCarregando(false)
      return
    }

    const quantidade = parseInt(formData.quantidade)
    if (quantidade <= 0) {
      setErro('Quantidade deve ser maior que zero')
      setCarregando(false)
      return
    }

    const produto = produtos.find((p) => p.id === formData.produto_id)
    if (quantidade > produto.quantidade) {
      setErro(`Estoque insuficiente — disponível: ${produto.quantidade} unidades`)
      setCarregando(false)
      return
    }

    const { erro: erroRegistrar } = await registrarVenda(formData)

    if (erroRegistrar) {
      setErro(erroRegistrar)
    } else {
      setSucesso('Venda registrada! Estoque atualizado.')
      setFormData({ produto_id: '', quantidade: '' })
      setTimeout(() => setSucesso(''), 4000)
      carregarProdutos()
    }

    setCarregando(false)
  }

  const produtoSelecionado = produtos.find((p) => p.id === formData.produto_id)
  const quantidade = parseInt(formData.quantidade) || 0
  const valorTotal = quantidade * (produtoSelecionado?.preco_venda || 0)

  return (
    <div className="max-w-md mx-auto space-y-5">
      <div>
        <h1 className="page-title">Registrar Venda</h1>
        <p className="page-subtitle">O estoque é atualizado automaticamente</p>
      </div>

      <div className="card space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Produto *</label>
            <select
              name="produto_id"
              value={formData.produto_id}
              onChange={handleChange}
              disabled={carregando}
              className="input-base"
            >
              <option value="">Selecione...</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id} disabled={p.quantidade === 0}>
                  {p.nome} — {p.quantidade} em estoque
                </option>
              ))}
            </select>
          </div>

          {produtoSelecionado && (
            <div className="bg-dk-card2 border border-dk-border2 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-dk-text text-sm font-medium">{produtoSelecionado.nome}</p>
                <p className="text-brand-400 text-sm font-semibold">
                  {formatarMoeda(produtoSelecionado.preco_venda)}
                </p>
              </div>
              <p className={`text-xs mt-1 ${produtoSelecionado.quantidade < 5 ? 'text-amber-400' : 'text-dk-muted'}`}>
                {produtoSelecionado.quantidade} unidades em estoque
              </p>
            </div>
          )}

          <div>
            <label className="label">Quantidade *</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              disabled={carregando}
              className="input-base"
              placeholder="1"
              min="1"
              max={produtoSelecionado?.quantidade || undefined}
            />
          </div>

          {produtoSelecionado && quantidade > 0 && (
            <div className="flex items-center justify-between bg-brand-600/10 border border-brand-600/20 rounded-lg px-4 py-3">
              <span className="text-dk-muted text-sm">{quantidade}x {formatarMoeda(produtoSelecionado.preco_venda)}</span>
              <span className="text-brand-400 text-lg font-bold">{formatarMoeda(valorTotal)}</span>
            </div>
          )}

          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg flex items-center space-x-2 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{erro}</span>
            </div>
          )}
          {sucesso && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm">
              ✓ {sucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando || !formData.produto_id || !formData.quantidade}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={16} />
            <span>{carregando ? 'Registrando...' : 'Confirmar Venda'}</span>
          </button>
        </form>
      </div>
    </div>
  )
}

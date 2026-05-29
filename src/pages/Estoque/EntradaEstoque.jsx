import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, History, AlertTriangle } from 'lucide-react'
import { listarProdutos } from '../../services/produtosService'
import { registrarEntrada } from '../../services/entradasService'
import { formatarMoeda } from '../../utils/formatadores'

export default function EntradaEstoque() {
  const navigate = useNavigate()
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

    if (parseInt(formData.quantidade) <= 0) {
      setErro('Quantidade deve ser maior que zero')
      setCarregando(false)
      return
    }

    const { erro: erroRegistrar } = await registrarEntrada(formData)

    if (erroRegistrar) {
      setErro(erroRegistrar)
    } else {
      setSucesso('Entrada registrada! Estoque atualizado.')
      setFormData({ produto_id: '', quantidade: '' })
      setTimeout(() => setSucesso(''), 4000)
      carregarProdutos()
    }

    setCarregando(false)
  }

  const produtoSelecionado = produtos.find((p) => p.id === formData.produto_id)

  return (
    <div className="max-w-md mx-auto space-y-5">
      <div>
        <h1 className="page-title">Entrada de Estoque</h1>
        <p className="page-subtitle">Adicione produtos ao estoque</p>
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
                <option key={p.id} value={p.id}>
                  {p.nome} — {p.quantidade} em estoque
                </option>
              ))}
            </select>
          </div>

          {produtoSelecionado && (
            <div className="bg-dk-card2 border border-dk-border2 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-dk-text text-sm font-medium">{produtoSelecionado.nome}</p>
                <p className="text-dk-muted text-sm">{formatarMoeda(produtoSelecionado.preco_venda)}</p>
              </div>
              <div className="flex items-center space-x-1.5 mt-1">
                {produtoSelecionado.quantidade < 5 && (
                  <AlertTriangle size={12} className="text-amber-400" />
                )}
                <p className={`text-xs ${produtoSelecionado.quantidade < 5 ? 'text-amber-400' : 'text-dk-muted'}`}>
                  {produtoSelecionado.quantidade} unidades em estoque
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="label">Quantidade a adicionar *</label>
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              disabled={carregando}
              className="input-base"
              placeholder="Ex: 10"
              min="1"
            />
          </div>

          {erro && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {erro}
            </div>
          )}
          {sucesso && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm">
              ✓ {sucesso}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando || !formData.produto_id}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Plus size={16} />
            <span>{carregando ? 'Registrando...' : 'Registrar Entrada'}</span>
          </button>
        </form>
      </div>

      <button
        onClick={() => navigate('/estoque/historico')}
        className="flex items-center space-x-2 text-dk-muted hover:text-dk-text text-sm transition-colors mx-auto"
      >
        <History size={15} />
        <span>Ver Histórico de Entradas</span>
      </button>
    </div>
  )
}

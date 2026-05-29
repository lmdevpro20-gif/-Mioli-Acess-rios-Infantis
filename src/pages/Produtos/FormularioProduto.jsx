import { useState, useEffect } from 'react'
import { criarProduto, atualizarProduto } from '../../services/produtosService'

export default function FormularioProduto({ produto, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({ nome: '', preco_venda: '', quantidade: '' })
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || '',
        preco_venda: produto.preco_venda || '',
        quantidade: produto.quantidade ?? '',
      })
    }
  }, [produto])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    if (!formData.nome.trim()) {
      setErro('Informe o nome do produto')
      setCarregando(false)
      return
    }
    if (!formData.preco_venda || parseFloat(formData.preco_venda) <= 0) {
      setErro('Informe um preço válido')
      setCarregando(false)
      return
    }
    if (formData.quantidade === '' || parseInt(formData.quantidade) < 0) {
      setErro('Informe a quantidade em estoque')
      setCarregando(false)
      return
    }

    try {
      if (produto?.id) {
        const { erro: e } = await atualizarProduto(produto.id, formData)
        if (e) throw new Error(e)
      } else {
        const { erro: e } = await criarProduto(formData)
        if (e) throw new Error(e)
      }
      onSalvar()
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label">Nome do produto *</label>
        <input
          type="text"
          name="nome"
          className="input-base"
          placeholder="Ex: Pulseira Dourada"
          value={formData.nome}
          onChange={handleChange}
          disabled={carregando}
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Preço de venda *</label>
          <input
            type="number"
            name="preco_venda"
            className="input-base"
            placeholder="0,00"
            step="0.01"
            min="0.01"
            value={formData.preco_venda}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>
        <div>
          <label className="label">Quantidade em estoque *</label>
          <input
            type="number"
            name="quantidade"
            className="input-base"
            placeholder="0"
            min="0"
            value={formData.quantidade}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>
      </div>

      {erro && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {erro}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={carregando} className="btn-primary flex-1">
          {carregando ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancelar} disabled={carregando} className="btn-secondary flex-1">
          Cancelar
        </button>
      </div>
    </form>
  )
}

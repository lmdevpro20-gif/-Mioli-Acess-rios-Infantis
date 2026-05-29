import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { obterProduto } from '../../services/produtosService'
import { formatarMoeda } from '../../utils/formatadores'
import AlertaEstoqueBaixo from '../../components/AlertaEstoqueBaixo'

export default function DetalhesProduto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregarProduto()
  }, [id])

  const carregarProduto = async () => {
    const { dados, erro: erroCarregar } = await obterProduto(id)

    if (erroCarregar) {
      setErro(erroCarregar)
    } else {
      setProduto(dados)
    }

    setCarregando(false)
  }

  if (carregando) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-infantil-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (erro || !produto) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/produtos')}
          className="flex items-center space-x-2 text-infantil-600 hover:underline"
        >
          <ArrowLeft size={20} />
          <span>Voltar para Produtos</span>
        </button>

        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {erro || 'Produto não encontrado'}
        </div>
      </div>
    )
  }

  const margemLucro =
    ((produto.preco_venda - produto.preco_custo) / produto.preco_venda) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <button
        onClick={() => navigate('/produtos')}
        className="flex items-center space-x-2 text-infantil-600 hover:underline mb-4"
      >
        <ArrowLeft size={20} />
        <span>Voltar para Produtos</span>
      </button>

      {/* Card Principal */}
      <div className="card">
        <div className="space-y-6">
          {/* Título e Status */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {produto.nome}
              </h1>
              <p className="text-gray-600">{produto.categoria}</p>
            </div>
            <AlertaEstoqueBaixo quantidade={produto.quantidade} showBadge={true} />
          </div>

          {/* Informações do Produto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Quantidade */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Quantidade em Estoque</p>
              <p className="text-2xl font-bold text-gray-800">
                {produto.quantidade}
              </p>
            </div>

            {/* Preço de Custo */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Preço de Custo</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatarMoeda(produto.preco_custo)}
              </p>
            </div>

            {/* Preço de Venda */}
            <div className="bg-azul-pastel-50 p-4 rounded-lg border border-azul-pastel-200">
              <p className="text-xs text-gray-600 mb-1">Preço de Venda</p>
              <p className="text-2xl font-bold text-azul-pastel-600">
                {formatarMoeda(produto.preco_venda)}
              </p>
            </div>

            {/* Margem de Lucro */}
            <div className="bg-verde-pastel-50 p-4 rounded-lg border border-verde-pastel-200">
              <p className="text-xs text-gray-600 mb-1">Margem de Lucro</p>
              <p className="text-2xl font-bold text-verde-pastel-600">
                {margemLucro.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Atributos */}
          <div className="grid grid-cols-2 gap-4">
            {produto.tamanho && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Tamanho</p>
                <p className="font-semibold text-gray-800">{produto.tamanho}</p>
              </div>
            )}

            {produto.cor && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Cor</p>
                <p className="font-semibold text-gray-800">{produto.cor}</p>
              </div>
            )}
          </div>

          {/* Valor Total do Estoque */}
          <div className="bg-infantil-50 border border-infantil-200 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Valor Total em Estoque</p>
            <p className="text-3xl font-bold text-infantil-600">
              {formatarMoeda(produto.quantidade * produto.preco_venda)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

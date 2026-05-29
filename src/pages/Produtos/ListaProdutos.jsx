import { useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import TabelaProdutos from '../../components/TabelaProdutos'
import Modal from '../../components/Modal'
import FormularioProduto from './FormularioProduto'
import { listarProdutos, deletarProduto } from '../../services/produtosService'

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoEditando, setProdutoEditando] = useState(null)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
  const [busca, setBusca] = useState('')

  useEffect(() => { carregarProdutos() }, [busca])

  const carregarProdutos = async () => {
    setCarregando(true)
    const { dados } = await listarProdutos({ busca })
    setProdutos(dados || [])
    setCarregando(false)
  }

  const mostrarMensagem = (tipo, texto) => {
    setMensagem({ tipo, texto })
    setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3000)
  }

  const handleEditar = (produto) => {
    setProdutoEditando(produto)
    setModalAberto(true)
  }

  const handleDeletar = async (id) => {
    if (!window.confirm('Excluir este produto?')) return
    const { erro } = await deletarProduto(id)
    if (erro) {
      mostrarMensagem('erro', erro)
    } else {
      mostrarMensagem('ok', 'Produto excluído.')
      carregarProdutos()
    }
  }

  const fecharModal = () => {
    setModalAberto(false)
    setProdutoEditando(null)
  }

  const salvarProduto = () => {
    mostrarMensagem('ok', 'Produto salvo com sucesso!')
    fecharModal()
    carregarProdutos()
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Produtos</h1>
          <p className="page-subtitle">{produtos.length} cadastrado{produtos.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => { setProdutoEditando(null); setModalAberto(true) }}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Novo</span>
        </button>
      </div>

      {mensagem.texto && (
        <div className={`px-4 py-3 rounded-lg text-sm border ${
          mensagem.tipo === 'ok'
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {mensagem.texto}
        </div>
      )}

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dk-muted" />
        <input
          type="text"
          placeholder="Buscar produto..."
          className="input-base pl-9"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="card">
        <TabelaProdutos
          produtos={produtos}
          carregando={carregando}
          onEdit={handleEditar}
          onDelete={handleDeletar}
        />
      </div>

      <Modal
        isOpen={modalAberto}
        title={produtoEditando ? 'Editar Produto' : 'Novo Produto'}
        onClose={fecharModal}
        tamanho="md"
      >
        <FormularioProduto
          produto={produtoEditando}
          onSalvar={salvarProduto}
          onCancelar={fecharModal}
        />
      </Modal>
    </div>
  )
}

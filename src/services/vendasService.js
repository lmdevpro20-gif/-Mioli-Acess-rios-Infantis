import { supabase } from './supabaseClient'
import { inicioDiaSP, fimDiaSP, hojeEmSP } from '../utils/formatadores'

export const registrarVenda = async (venda) => {
  try {
    const { dados: produto, erro: erroFetch } = await obterQuantidadeDisponivel(venda.produto_id)

    if (erroFetch || !produto) throw new Error('Produto não encontrado')
    if (produto.quantidade < parseInt(venda.quantidade)) throw new Error('Quantidade insuficiente em estoque')

    const { data: dataVenda, error: erroVenda } = await supabase
      .from('vendas')
      .insert([{
        produto_id: venda.produto_id,
        quantidade: parseInt(venda.quantidade),
        data: new Date().toISOString(),
      }])
      .select()

    if (erroVenda) throw erroVenda

    const { error: erroAtualizacao } = await supabase.rpc('reduzir_estoque', {
      p_produto_id: venda.produto_id,
      p_quantidade: parseInt(venda.quantidade),
    })

    if (erroAtualizacao) throw erroAtualizacao

    return { dados: dataVenda[0], erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const listarVendas = async (filtros = {}) => {
  try {
    let query = supabase
      .from('vendas')
      .select(`
        id,
        produto_id,
        quantidade,
        data,
        produtos (
          id,
          nome,
          preco_venda
        )
      `)
      .order('data', { ascending: false })

    if (filtros.produto_id) {
      query = query.eq('produto_id', filtros.produto_id)
    }
    if (filtros.dataInicial) {
      query = query.gte('data', inicioDiaSP(filtros.dataInicial))
    }
    if (filtros.dataFinal) {
      query = query.lt('data', fimDiaSP(filtros.dataFinal))
    }

    const { data, error } = await query
    if (error) throw error

    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: [], erro: erro.message }
  }
}

export const obterUltimasVendas = async (limite = 3) => {
  try {
    const { data, error } = await supabase
      .from('vendas')
      .select(`
        id,
        produto_id,
        quantidade,
        data,
        produtos (
          id,
          nome,
          preco_venda
        )
      `)
      .order('data', { ascending: false })
      .limit(limite)

    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: [], erro: erro.message }
  }
}

export const obterResumoDia = async () => {
  try {
    const hoje = hojeEmSP()
    const inicio = inicioDiaSP(hoje)
    const fim = fimDiaSP(hoje)

    const { data: vendas, error } = await supabase
      .from('vendas')
      .select(`quantidade, produtos (preco_venda)`)
      .gte('data', inicio)
      .lt('data', fim)

    if (error) throw error

    const totalItens = vendas.reduce((acc, v) => acc + v.quantidade, 0)
    const valorTotal = vendas.reduce((acc, v) => acc + v.quantidade * (v.produtos?.preco_venda || 0), 0)

    return {
      dados: { totalItens, valorTotal, quantidadeTransacoes: vendas.length },
      erro: null,
    }
  } catch (erro) {
    return {
      dados: { totalItens: 0, valorTotal: 0, quantidadeTransacoes: 0 },
      erro: erro.message,
    }
  }
}

const obterQuantidadeDisponivel = async (produtoId) => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('quantidade')
      .eq('id', produtoId)
      .single()

    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const obterVenda = async (id) => {
  try {
    const { data, error } = await supabase
      .from('vendas')
      .select(`*, produtos (id, nome, preco_venda)`)
      .eq('id', id)
      .single()

    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

import { supabase } from './supabaseClient'

export const listarProdutos = async (filtros = {}) => {
  try {
    let query = supabase.from('produtos').select('*').order('nome', { ascending: true })

    if (filtros.busca) {
      query = query.ilike('nome', `%${filtros.busca}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const obterProduto = async (id) => {
  try {
    const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single()
    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const criarProduto = async (produto) => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .insert([{
        nome: produto.nome,
        quantidade: parseInt(produto.quantidade),
        preco_venda: parseFloat(produto.preco_venda),
      }])
      .select()
    if (error) throw error
    return { dados: data[0], erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const atualizarProduto = async (id, produto) => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .update({
        nome: produto.nome,
        quantidade: parseInt(produto.quantidade),
        preco_venda: parseFloat(produto.preco_venda),
      })
      .eq('id', id)
      .select()
    if (error) throw error
    return { dados: data[0], erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const deletarProduto = async (id) => {
  try {
    const { error } = await supabase.from('produtos').delete().eq('id', id)
    if (error) throw error
    return { erro: null }
  } catch (erro) {
    return { erro: erro.message }
  }
}

export const obterEstoqueBaixo = async () => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .lt('quantidade', 5)
      .order('quantidade', { ascending: true })
    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: [], erro: erro.message }
  }
}

import { supabase } from './supabaseClient'
import { inicioDiaSP, fimDiaSP } from '../utils/formatadores'

export const registrarEntrada = async (entrada) => {
  try {
    const { data: dataEntrada, error: erroEntrada } = await supabase
      .from('entradas')
      .insert([{
        produto_id: entrada.produto_id,
        quantidade: parseInt(entrada.quantidade),
        data: new Date().toISOString(),
      }])
      .select()

    if (erroEntrada) throw erroEntrada

    const { error: erroAtualizacao } = await supabase.rpc('aumentar_estoque', {
      p_produto_id: entrada.produto_id,
      p_quantidade: parseInt(entrada.quantidade),
    })

    if (erroAtualizacao) throw erroAtualizacao

    return { dados: dataEntrada[0], erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

export const listarEntradas = async (filtros = {}) => {
  try {
    let query = supabase
      .from('entradas')
      .select(`
        id,
        produto_id,
        quantidade,
        data,
        produtos (
          id,
          nome
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

export const obterEntrada = async (id) => {
  try {
    const { data, error } = await supabase
      .from('entradas')
      .select(`*, produtos (id, nome)`)
      .eq('id', id)
      .single()

    if (error) throw error
    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

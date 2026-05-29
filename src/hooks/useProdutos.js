import { useState, useEffect } from 'react'
import { listarProdutos, obterEstoqueBaixo } from '../services/produtosService'

export const useProdutos = (filtros = {}) => {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const carregarProdutos = async () => {
    setCarregando(true)
    setErro(null)

    const { dados, erro: erroCarregar } = await listarProdutos(filtros)

    if (erroCarregar) {
      setErro(erroCarregar)
      setProdutos([])
    } else {
      setProdutos(dados || [])
    }

    setCarregando(false)
  }

  useEffect(() => {
    carregarProdutos()
  }, [filtros])

  return { produtos, carregando, erro, recarregar: carregarProdutos }
}

export const useEstoqueBaixo = () => {
  const [produtosBaixo, setProdutosBaixo] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const carregarEstoqueBaixo = async () => {
      const { dados, erro: erroCarregar } = await obterEstoqueBaixo()

      if (erroCarregar) {
        setErro(erroCarregar)
        setProdutosBaixo([])
      } else {
        setProdutosBaixo(dados || [])
      }

      setCarregando(false)
    }

    carregarEstoqueBaixo()
  }, [])

  return { produtosBaixo, carregando, erro }
}

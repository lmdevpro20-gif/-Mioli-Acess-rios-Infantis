import { useState, useEffect } from 'react'
import { onAuthStateChange, getCurrentUser } from '../services/authService'

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    // Obter usuário atual ao montar
    const verificarUsuario = async () => {
      const { usuario: user } = await getCurrentUser()
      setUsuario(user)
      setCarregando(false)
    }

    verificarUsuario()

    // Ouvir mudanças de autenticação
    const { data: { subscription } } = onAuthStateChange((user) => {
      setUsuario(user)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return { usuario, carregando }
}

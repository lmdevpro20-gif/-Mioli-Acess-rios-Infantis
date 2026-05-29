import { supabase } from './supabaseClient'

// Login com email e senha
export const signIn = async (email, senha) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error) throw error

    return { dados: data, erro: null }
  } catch (erro) {
    return { dados: null, erro: erro.message }
  }
}

// Logout
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return { erro: null }
  } catch (erro) {
    return { erro: erro.message }
  }
}

// Obter usuário atual
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) throw error

    return { usuario: user, erro: null }
  } catch (erro) {
    return { usuario: null, erro: erro.message }
  }
}

// Ouvir mudanças de autenticação
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((evento, sessao) => {
    callback(sessao?.user || null)
  })
}

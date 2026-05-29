// Brazil removed DST in 2019 — Sao Paulo is always UTC-3
const SP_OFFSET_MS = -3 * 60 * 60 * 1000

// Applies UTC-3 offset to a date, returns a Date whose UTC fields represent SP local time.
// Supabase returns TIMESTAMP (no TZ) columns without 'Z', so JS would parse as local time —
// appending 'Z' forces correct UTC interpretation before applying the SP offset.
const toSP = (data) => {
  let str = typeof data === 'string' ? data : new Date(data).toISOString()
  if (!/Z$|[+-]\d{2}:\d{2}$/.test(str)) str += 'Z'
  return new Date(new Date(str).getTime() + SP_OFFSET_MS)
}

const pad = (n) => String(n).padStart(2, '0')

export const formatarDataHora = (data) => {
  const d = toSP(data)
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
}

export const formatarData = (data) => {
  const d = toSP(data)
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`
}

export const formatarHora = (data) => {
  const d = toSP(data)
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
}

export const formatarMoeda = (valor) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

export const formatarNumero = (numero) =>
  new Intl.NumberFormat('pt-BR').format(numero)

export const truncarTexto = (texto, limite = 30) =>
  texto.length > limite ? texto.substring(0, limite) + '...' : texto

// Início do dia em SP (meia-noite SP = 03:00 UTC)
export const inicioDiaSP = (dataStr) =>
  new Date(dataStr + 'T03:00:00.000Z').toISOString()

// Início do dia seguinte em SP (exclusive)
export const fimDiaSP = (dataStr) => {
  const d = new Date(dataStr + 'T03:00:00.000Z')
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString()
}

// Data de hoje no fuso SP no formato "YYYY-MM-DD"
export const hojeEmSP = () => {
  const d = toSP(new Date())
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
}

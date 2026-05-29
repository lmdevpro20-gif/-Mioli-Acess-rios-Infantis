import { AlertTriangle } from 'lucide-react'

export default function AlertaEstoqueBaixo({ quantidade, showBadge = true }) {
  if (!showBadge || quantidade >= 5) return null

  return (
    <span className="badge-red">
      <AlertTriangle size={11} />
      <span>Baixo</span>
    </span>
  )
}

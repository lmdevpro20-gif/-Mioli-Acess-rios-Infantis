import { X } from 'lucide-react'

export default function Modal({ isOpen, title, children, onClose, tamanho = 'md' }) {
  if (!isOpen) return null

  const tamanhoClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className={`bg-dk-card border border-dk-border rounded-xl shadow-2xl w-full ${tamanhoClasses[tamanho]}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-dk-border">
          <h2 className="text-dk-text font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-dk-hover rounded-lg transition-colors text-dk-muted hover:text-dk-text"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

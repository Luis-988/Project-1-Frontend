import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import SystemWindow from './SystemWindow'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: ReactNode
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) {
        openerRef.current = document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null
        dialog.showModal()
        cancelButtonRef.current?.focus()
      }

      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    if (dialog.open) dialog.close()
    openerRef.current?.focus()
    openerRef.current = null
  }, [open])

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onCancel()
  }

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog m-auto max-h-[90vh] w-[min(92vw,28rem)] bg-transparent p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      onCancel={(event) => {
        event.preventDefault()
        onCancel()
      }}
      onClick={handleBackdropClick}
    >
      <SystemWindow title="[ALERTA DEL SISTEMA]" className="p-6">
        <h2 id="confirm-dialog-title" className="sr-only">{title}</h2>
        <div id="confirm-dialog-message" className="font-rajdhani text-lg text-fg">
          <span className="mr-3 text-3xl text-accent" aria-hidden="true">⚠</span>
          {message}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            className="border border-line px-4 py-2 font-rajdhani font-semibold uppercase tracking-wider text-muted transition hover:border-fg hover:text-fg"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`border px-4 py-2 font-rajdhani font-semibold uppercase tracking-wider shadow-glow transition ${danger ? 'border-red-500 bg-red-600 text-white hover:bg-red-700' : 'border-btn bg-btn text-on-btn hover:bg-accent'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </SystemWindow>
    </dialog>
  )
}

export default ConfirmDialog

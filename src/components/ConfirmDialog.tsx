import { useEffect, useRef, type MouseEvent } from 'react'
import SystemWindow from './SystemWindow'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
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
      className="confirm-dialog w-[min(calc(100%-2rem),28rem)] bg-transparent p-0 text-fg"
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
        <p id="confirm-dialog-message" className="font-rajdhani text-lg text-fg">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="border border-line px-4 py-2 font-rajdhani font-semibold uppercase tracking-wider text-muted transition hover:border-fg hover:text-fg"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="border border-btn bg-btn px-4 py-2 font-rajdhani font-semibold uppercase tracking-wider text-on-btn shadow-glow transition hover:bg-accent"
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

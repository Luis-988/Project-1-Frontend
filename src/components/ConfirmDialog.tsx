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
      className="confirm-dialog w-[min(calc(100%-2rem),28rem)] bg-transparent p-0 text-system-text"
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
        <p id="confirm-dialog-message" className="font-rajdhani text-lg text-system-text">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="border border-system-muted/60 px-4 py-2 font-rajdhani font-semibold uppercase tracking-wider text-system-muted transition hover:border-system-text hover:text-system-text"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="border border-system-neon bg-system-neon px-4 py-2 font-rajdhani font-semibold uppercase tracking-wider text-system-ink shadow-neon transition hover:bg-system-ice"
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

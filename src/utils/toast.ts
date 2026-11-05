import { toast } from 'sonner'

const toastOptions = {
  duration: 3000,
  style: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-line)',
    color: 'var(--text-fg)',
    fontFamily: 'Rajdhani, sans-serif',
  },
}

export function notifySuccess(message: string): void {
  toast.success(message, toastOptions)
}

export function notifyError(message: string): void {
  toast.error(message, toastOptions)
}

export function notifyInfo(message: string): void {
  toast.info(message, toastOptions)
}

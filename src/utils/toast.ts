import { toast } from 'sonner'

const toastOptions = {
  duration: 3000,
  style: {
    background: '#0b1020',
    border: '1px solid #2f80ff',
    color: '#e8f1ff',
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

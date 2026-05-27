import { toast as sonnerToast } from 'sonner'

export const toast = {
  success: (message: string): void => {
    sonnerToast.success(message)
  },
  error: (message: string): void => {
    sonnerToast.error(message)
  },
  info: (message: string): void => {
    sonnerToast.info(message)
  },
  warning: (message: string): void => {
    sonnerToast.warning(message)
  },
}

import { clsx, type ClassValue } from 'clsx'

/**
 * Concat class names. Re-exporta clsx con tipo. Si en el futuro
 * sumamos tailwind-merge, cambiamos solo acá.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

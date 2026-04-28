import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils'

/**
 * TextField — input con label + ícono opcional + mensaje de error.
 *
 * Coincide con el patrón Figma `Login/BrandPanel` 247:6611:
 *   - h=46.773 (~47px), border-radius=9.127 (~9px)
 *   - bg surface-input, border border-default
 *   - label arriba 11px regular leading 20 (Body/S)
 *   - icon 18px, text-text-lines, separación pl-12 con icon
 *
 * Props mínimas para evitar ambigüedad. Si una surface necesita
 * un layout custom (ej. registro con grid 2col), envuélvanlo en su
 * propio container y reusen TextField sólo para el campo en sí.
 */

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  required?: boolean
  /** Asterisco azul claro tipo Figma A.3 (199:392) si required */
  requiredColor?: string
  leftIcon?: ReactNode
  rightAdornment?: ReactNode
  error?: string
  /** Tamaño del input. md=47px (default, auth surfaces), sm=36px (registro denso) */
  size?: 'sm' | 'md'
}

const sizeStyles = {
  sm: 'h-9 rounded-[12px] text-[12px]',
  md: 'h-[47px] rounded-[9px] text-[14px]',
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      required,
      requiredColor = 'var(--color-brand-blue-light)',
      leftIcon,
      rightAdornment,
      error,
      size = 'md',
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`

    return (
      <div className="flex flex-col gap-[7px]">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-normal leading-[20px] text-[color:var(--color-text-primary)]"
          >
            {label}
            {required && (
              <span aria-hidden className="ml-0.5" style={{ color: requiredColor }}>
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-text-lines)]"
            >
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-full bg-[color:var(--color-surface-input)] outline-none transition-[box-shadow,border-color]',
              'border border-[color:var(--color-border-default)]',
              'focus:border-[color:var(--color-border-focus)] focus:shadow-[var(--shadow-focus)]',
              'placeholder:text-[color:var(--color-text-muted)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              sizeStyles[size],
              leftIcon ? 'pl-12' : 'pl-4',
              rightAdornment ? 'pr-12' : 'pr-4',
              error && 'border-[color:var(--color-semantic-error)]',
              className,
            )}
            {...rest}
          />
          {rightAdornment && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--color-text-lines)]">
              {rightAdornment}
            </span>
          )}
        </div>
        {error && (
          <p
            id={errorId}
            className="text-[11px] leading-[16px] text-[color:var(--color-semantic-error)]"
          >
            {error}
          </p>
        )}
      </div>
    )
  },
)
TextField.displayName = 'TextField'

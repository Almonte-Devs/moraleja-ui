import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../utils'

/**
 * Button — botón canónico del DS Moraleja.
 *
 * Lee colors/radius/spacing desde CSS vars de @moraleja/tokens. NO hardcodear
 * hex/px en componentes consumidores: si necesitás un estilo distinto,
 * extender este componente con un nuevo variant aquí.
 *
 * Tamaños:
 *   - sm: h=32, px=12, text=12
 *   - md: h=40, px=16, text=13 (Login/BrandPanel 247:6681)
 *   - lg: h=48, px=20, text=14
 *
 * Variantes:
 *   - primary: bg brand-blue, texto on-dark
 *   - secondary: surface-card con borde, texto primary
 *   - ghost: transparente, texto primary
 *
 * Pill: borderRadius "button-md" (25px) — equivale al pill estándar de auth.
 */

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Si true, usa `border-radius: var(--radius-button-md)` (25px). Default false → radius-md (12px). */
  pill?: boolean
  /** Si true, ocupa todo el ancho disponible. */
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[color:var(--color-brand-blue)] text-[color:var(--color-text-on-dark)] hover:brightness-110',
  secondary:
    'bg-[color:var(--color-surface-card)] text-[color:var(--color-text-primary)] border border-[color:var(--color-border-default)] hover:bg-[color:var(--color-surface-sunken)]',
  ghost:
    'bg-transparent text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface-sunken)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[12px] leading-[16px]',
  md: 'h-10 px-4 text-[13px] leading-[20px] tracking-[0.1px]',
  lg: 'h-12 px-5 text-[14px] leading-[20px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      pill = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-[filter,background-color] duration-150',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]',
          variantStyles[variant],
          sizeStyles[size],
          pill ? 'rounded-[var(--radius-button-md)]' : 'rounded-[var(--radius-md)]',
          fullWidth && 'w-full',
          className,
        )}
        {...rest}
      >
        {loading ? (
          <span
            aria-hidden
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current/40 border-t-current"
          />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    )
  },
)
Button.displayName = 'Button'

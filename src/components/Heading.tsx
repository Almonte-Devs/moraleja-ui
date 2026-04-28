import { type ElementType, type ReactNode } from 'react'
import { cn } from '../utils'

/**
 * Heading — títulos canónicos espejo de los Text Styles Figma.
 *
 * Estilos:
 *   - hero: 45/56 SemiBold (Heading/Hero title) → "¡Bienvenida a Mira!", "¿Olvidaste tu clave?"
 *   - display-l: 24/32 Bold (Display/L) → "Recuperar contraseña", "Registro para profesores"
 *   - display-xl: 32/40 Bold (Display/XL) → quote Drucker
 *   - onboarding: 110px SemiBold leading 1.05 (Onboarding/Onboarding tittle) → "¡Hola Paula!", "Así de simple."
 *   - h1: 20/28 SemiBold (Heading/H1) → texto fuerte de tarjeta onboarding
 *   - h2: 18/26 SemiBold (Heading/H2) → cards Así de simple
 *   - h3: 16/24 SemiBold (Heading/H3) → subtítulo / quote attribution
 *
 * Los tokens (sizes, leading, weights) viven en @moraleja/tokens. Cuando
 * la diseñadora cambie un Text Style en Figma → push → mergeás → actualiza.
 */

type HeadingVariant = 'hero' | 'display-l' | 'display-xl' | 'onboarding' | 'h1' | 'h2' | 'h3'

export interface HeadingProps {
  variant: HeadingVariant
  as?: ElementType
  className?: string
  /** Punto lima al final tipo "Recuperar contraseña[.]" en Figma. */
  limeDot?: boolean
  children: ReactNode
}

const variantStyles: Record<HeadingVariant, string> = {
  hero: 'text-[45px] font-semibold leading-[56px] tracking-[0]',
  'display-l': 'text-[24px] font-bold leading-[32px] tracking-[0]',
  'display-xl': 'text-[32px] font-bold leading-[40px] tracking-[0]',
  onboarding: 'text-[110px] font-semibold leading-[1.05] tracking-[0]',
  h1: 'text-[20px] font-semibold leading-[28px] tracking-[-1px]',
  h2: 'text-[18px] font-semibold leading-[26px]',
  h3: 'text-[16px] font-semibold leading-[24px]',
}

const defaultTag: Record<HeadingVariant, ElementType> = {
  hero: 'h1',
  'display-l': 'h1',
  'display-xl': 'h1',
  onboarding: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
}

export function Heading({
  variant,
  as,
  className,
  limeDot = false,
  children,
}: HeadingProps) {
  const Tag = as ?? defaultTag[variant]
  return (
    <Tag
      className={cn(
        'text-[color:var(--color-text-primary)]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
      {limeDot && <span className="text-[color:var(--color-brand-lime)]">.</span>}
    </Tag>
  )
}

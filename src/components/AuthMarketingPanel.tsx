import { type ReactNode } from 'react'
import { Heading } from './Heading'
import { cn } from '../utils'

/**
 * AuthMarketingPanel — panel derecho 50% de las surfaces auth (login,
 * registro, recuperar). Espejo del Figma 98:27 / 199:459 / 127:2387.
 *
 * Composición:
 *   - Background: surface-marketing por default (#F5F5F7 con foto opcional al opacity).
 *   - Foto opcional con opacity ajustable (registro=32, recuperar=12).
 *   - Logo opcional arriba.
 *   - Hero title con punto lima.
 *   - Body opcional debajo.
 *   - Children opcional (avatar pill, features, etc.) al final.
 */

export interface AuthMarketingPanelProps {
  title: ReactNode
  body?: ReactNode
  /** Path absoluto al asset (ej. /figma-assets/photo-registro-laptop.png). */
  imageSrc?: string
  /** 0..1 — opacity de la foto. Default 0.32 (registro). */
  imageOpacity?: number
  /** Logo arriba del title (ej. la M gradient grande). */
  logo?: ReactNode
  /** Punto lima al final del title. Default true. */
  limeDot?: boolean
  /** Children adicionales debajo del body (avatar pill, features, etc). */
  children?: ReactNode
  className?: string
}

export function AuthMarketingPanel({
  title,
  body,
  imageSrc,
  imageOpacity = 0.32,
  logo,
  limeDot = true,
  children,
  className,
}: AuthMarketingPanelProps) {
  return (
    <aside
      className={cn(
        'relative hidden min-h-screen flex-1 items-center justify-center overflow-hidden bg-[color:var(--color-surface-marketing)] lg:flex',
        className,
      )}
    >
      {imageSrc && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imageSrc}')`, opacity: imageOpacity }}
        />
      )}
      <div className="relative flex w-full max-w-[555px] flex-col items-start gap-9 px-16">
        {logo}
        <Heading variant="hero" limeDot={limeDot}>
          {title}
        </Heading>
        {body && (
          <p className="text-[16px] font-medium leading-[24px] text-[color:var(--color-text-primary)]">
            {body}
          </p>
        )}
        {children}
      </div>
    </aside>
  )
}

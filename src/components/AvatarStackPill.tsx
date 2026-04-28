import { type ReactNode } from 'react'
import { cn } from '../utils'

/**
 * AvatarStackPill — pill blanca translúcida con avatares apilados +
 * métrica social. Reusa Figma 127:1893 / 163:5422 (Login + B.4 onboarding).
 *
 * Default style: backdrop-blur, gradient blanco translúcido top → bottom 0,
 * border 2px white, radius 22.
 */

export interface AvatarStackPillProps {
  /** URLs de avatares (idealmente 4). */
  avatars: string[]
  /** Métrica grande arriba (ej. "10k+", "25k+"). */
  metric: string
  /** Subtítulo debajo (ej. "Más de 5.000 personas...", "Usuario Activos"). */
  caption: string
  /** Tamaño visual: md (default, login slide genérico) o sm (B.4 onboarding). */
  size?: 'sm' | 'md'
  className?: string
  children?: ReactNode
}

const sizeStyles = {
  sm: 'rounded-[22px] px-6 py-2',
  md: 'rounded-[22px] px-[22px] py-2',
}

export function AvatarStackPill({
  avatars,
  metric,
  caption,
  size = 'md',
  className,
}: AvatarStackPillProps) {
  return (
    <div
      className={cn(
        'relative flex w-full items-center gap-4 border-[2px] border-white shadow-[0_5px_10px_rgba(0,0,0,0.05)] backdrop-blur-md',
        sizeStyles[size],
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 100%)',
      }}
    >
      <div className="flex shrink-0 items-center pr-2">
        {avatars.slice(0, 4).map((src, i) => (
          <div
            key={src}
            className="relative -mr-2 h-10 w-10 overflow-hidden rounded-full border-2 border-white"
            style={{ zIndex: 4 - i }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-col">
        <p className="text-[20px] font-medium leading-[28px] tracking-[-0.2px] text-[color:var(--color-text-primary)]">
          {metric}
        </p>
        <p className="text-[12px] font-normal leading-[16px] text-[color:var(--color-text-lines)]">
          {caption}
        </p>
      </div>
    </div>
  )
}

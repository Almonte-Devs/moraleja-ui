/**
 * @moraleja/ui — componentes React del DS Moraleja.
 *
 * Lee tokens desde @moraleja/tokens (CSS vars). Los proyectos consumidores
 * deben importar `@moraleja/tokens/css` en su entry CSS para que las vars
 * estén disponibles cuando estos componentes renderizan.
 */
export { Button, type ButtonProps } from './components/Button'
export { TextField, type TextFieldProps } from './components/TextField'
export { Heading, type HeadingProps } from './components/Heading'
export {
  AuthMarketingPanel,
  type AuthMarketingPanelProps,
} from './components/AuthMarketingPanel'
export { AvatarStackPill, type AvatarStackPillProps } from './components/AvatarStackPill'
export { cn } from './utils'

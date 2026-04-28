# @moraleja/ui

Componentes React del DS Moraleja. Leen tokens desde `@moraleja/tokens` (CSS vars). Distribuidos como package npm a los proyectos del ecosistema (mira, ayuda, ecommerce, etc.).

## Componentes incluidos

| Componente | Uso típico |
|---|---|
| `<Button>` | Variants primary/secondary/ghost · sizes sm/md/lg · pill opcional · loading state |
| `<TextField>` | Input con label, leftIcon, rightAdornment, error · sizes sm/md |
| `<Heading>` | Títulos canónicos: hero (45/56), display-l (24/32), display-xl (32/40), onboarding (110), h1/h2/h3 |
| `<AuthMarketingPanel>` | Panel derecho 50% de surfaces auth con foto opcional + hero title + body |
| `<AvatarStackPill>` | Pill blanca translúcida con avatar stack + métrica social |
| `cn` | Helper `clsx` para concat condicional de classNames |

## Instalación

```bash
npm install @moraleja/ui @moraleja/tokens
```

En el `globals.css` del proyecto:

```css
@import '@moraleja/tokens/css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

En el `tailwind.config.js`:

```js
import moralejaTokens from '@moraleja/tokens/tailwind'

export default {
  presets: [moralejaTokens],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@moraleja/ui/dist/**/*.js',
  ],
}
```

## Uso

```tsx
import { Button, TextField, Heading, AuthMarketingPanel } from '@moraleja/ui'
import { Mail } from 'lucide-react'

<TextField
  label="Correo electrónico"
  required
  leftIcon={<Mail className="h-[18px] w-[18px]" strokeWidth={1.6} />}
  placeholder="tu@email.com"
/>

<Button variant="primary" size="md" pill fullWidth>
  Iniciar sesión
</Button>

<Heading variant="hero" limeDot>
  ¿Olvidaste tu clave?
</Heading>

<AuthMarketingPanel
  title="Recursos exclusivos para docentes"
  body="Accede a material de apoyo y herramientas pedagógicas validadas."
  imageSrc="/figma-assets/photo-registro-laptop.png"
  imageOpacity={0.32}
/>
```

## Build local

```bash
npm install
npm run build       # → dist/index.js + index.d.ts
npm run dev         # watch
```

## Reglas

1. **No hardcodear hex/px.** Cada componente lee tokens de `@moraleja/tokens` (CSS vars `var(--color-…)`, `var(--radius-…)`).
2. **No agregar lógica de negocio** acá. Componentes presentacionales puros. Lógica vive en cada proyecto consumer.
3. **Cuando la diseñadora cambia un Text Style** o un componente master en Figma, lo replicamos acá si el cambio afecta la API del componente. Si solo es token, ya propaga vía `@moraleja/tokens`.

## Roadmap

- [ ] Field generic (label + helpText + error envoltorio para `<select>`, `<textarea>`)
- [ ] Combobox (búsqueda colegios, etc.)
- [ ] Card / Stat / EmptyState
- [ ] Code Connect mappings (Figma ↔ estos componentes)
- [ ] Convertir a shadcn registry custom cuando haya 3+ proyectos consumers

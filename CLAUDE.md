# moraleja-ui — Instrucciones locales del repo

Registry de componentes React del DS Moraleja. Lee tokens desde `@moraleja/tokens`.

## Reglas duras

1. **No hardcodear hex/px** en componentes. Siempre `var(--color-…)`, `var(--radius-…)`, `var(--spacing-…)`. Si necesitás un valor que no existe, primero agregalo a `@moraleja/tokens`.
2. **No agregar dependencias pesadas.** El bundle debe quedar small. Hoy: `clsx`, `lucide-react` (peer). Si pensás sumar `tailwind-merge`, `radix-ui`, etc., justifícalo en PR.
3. **Lógica de negocio NO va acá.** Solo presentacional + accesibilidad básica. Form state, fetch, validación → en el proyecto consumer.
4. **TypeScript estricto.** Sin `any`. Props tipadas con interfaces explícitas.
5. **forwardRef obligatorio** en componentes que envuelven `<button>`, `<input>` para que consumers puedan pasar refs.
6. **No agregar dark mode** todavía. Cuando llegue, vendrá del lado de `@moraleja/tokens` con themes.

## Cómo agregar un componente

1. Archivo nuevo en `src/components/<Name>.tsx`.
2. Export named: `export const Name = forwardRef(...)` o `export function Name(...)`.
3. JSDoc arriba con: descripción + Figma node de referencia + tokens usados.
4. Tipos exportados (`<Name>Props`).
5. Sumar al `src/index.ts`.
6. `npm run build` y verificar `dist/index.d.ts`.

## Convenciones de naming

- Componentes: PascalCase (`Button`, `TextField`).
- Props: camelCase (`leftIcon`, `fullWidth`, `limeDot`).
- Variants/sizes: kebab-case en string union si tienen guión (`'display-l'`, `'display-xl'`).
- Variables CSS: las del package `@moraleja/tokens` ya son `--color-brand-blue` etc. Consumir tal cual.

## Build

`tsup src/index.ts --format esm --dts --external react,react-dom,next`

- Output: `dist/index.js` + `dist/index.d.ts`.
- React/ReactDOM/Next son peer deps — no se bundlean.
- Tailwind classes quedan en el JS como strings; el consumer corre Tailwind sobre `node_modules/@moraleja/ui/dist/**/*.js` para que los compile (ver README sección `tailwind.config.js`).

## Repo location

`https://github.com/Almonte-Devs/moraleja-ui` (privado).

## Ecosistema

Parte 2 del DS profesional Moraleja. Parte 1 es `@moraleja/tokens` (Style Dictionary + Tokens Studio sync). Parte 3 (TBD) es Code Connect mappings Figma↔estos componentes.

Ver `~/Developer/moraleja.mira/CLAUDE.md` para roadmap completo.

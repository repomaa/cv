# Agent Instructions

This is a SvelteKit CV website with TypeScript, Tailwind CSS v4, and Sveltia CMS.

## Build Commands

```bash
# Development
npm run dev              # Start dev server (Vite)
devbox run dev           # Using devbox (NixOS with Chrome)

# Production
npm run build            # Build static site + generate PDF
npm run preview          # Preview production build

# Quality
npm run check            # Type check with svelte-check
npm run format           # Format all files with Prettier
```

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - all strict compiler options active
- Always use explicit types for function parameters and return types
- Import types with `.js` extension: `import type { Foo } from './types.js'`
- Use interface for object shapes, type for unions/complex types
- Export types from `src/lib/types.ts`

### Svelte 5 (Runes)

- Use `$props()` for component props with explicit interface
- Example:
  ```svelte
  <script lang="ts">
    import type { Profile } from '$lib/types.js';
    interface Props {
      profile: Profile;
    }
    let { profile }: Props = $props();
  </script>
  ```
- Components in `src/lib/components/` use PascalCase
- Pages in `src/routes/` use SvelteKit conventions (`+page.svelte`)

### Imports

- Order: types first, then node modules, then $lib aliases, then relative
- Use single quotes
- Use `$lib/` alias for imports from `src/lib/`
- Always include `.js` extension on TypeScript imports

### Formatting (Prettier)

- Semi-colons: required
- Single quotes
- Tab width: 2 spaces
- Trailing commas: es5 style
- Print width: 100
- Svelte files: `options-scripts-markup-styles` order

### Tailwind CSS v4

- Use `@theme` block for custom colors/fonts in `app.css`
- Colors use `light-dark()` CSS function for dark mode
- Custom properties in theme: `--font-mono`, `--color-bg`, etc.
- Utility classes use Tailwind v4 syntax (no arbitrary values when possible)

### Naming Conventions

- Components: PascalCase (`Header.svelte`)
- Utilities: camelCase (`loadProfile()`)
- Types/Interfaces: PascalCase (`Profile`, `CVData`)
- Constants: UPPER_SNAKE_CASE for module-level
- Files: kebab-case for non-component files

### Error Handling

- Use try/catch with specific error messages
- Log warnings for recoverable errors: `console.warn()`
- Return fallback values for content loading failures
- In server loads, always return data even if partial

### Content Loading

- YAML files in `/content/` directory
- Use `loadYamlFile<T>()` pattern from `src/lib/content/loader.ts`
- Provide default/fallback values for missing content
- Async data fetching in `+page.server.ts` with `prerender = true`

### Accessibility

- Semantic HTML elements (header, main, section, etc.)
- Use `prefers-reduced-motion` for animations
- Focus visible with 2px outline
- Color contrast compliant (WCAG AA)
- Skip links for keyboard navigation

### Styling Patterns

- Terminal aesthetic with JetBrains Mono font
- Dark mode via `light-dark()` CSS function
- Cyan accent color for interactive elements
- Zinc-based neutral colors
- Print styles: `.no-print` class hides elements in PDF

## Project Structure

```
src/
  lib/
    components/     # Svelte components (PascalCase)
    content/         # Content loading utilities
    types.ts         # TypeScript type definitions
    github.ts         # GitHub API integration
  routes/
    +page.svelte     # Main CV page
    +page.server.ts  # Server-side data loading
    pdf/             # Print-optimized PDF version
  app.css            # Global styles with @theme
content/             # YAML content files
static/              # Static assets (admin/, fonts)
build/               # Output directory (static + cv.pdf)
```

## Testing

This project has no test framework configured. To add tests, consider:

- Vitest for unit tests
- Playwright for E2E tests

## Environment Notes

- **Node.js 20+** required
- Chrome/Chromium needed for PDF generation via Puppeteer
- Use `devbox shell` on NixOS for Chrome support
- PDF generation gracefully skips if Chrome unavailable (CI)
- Static site deployable to any host (outputs to `/build/`)

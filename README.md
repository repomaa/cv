# CV Website

A SvelteKit CV with Sveltia CMS, Tailwind CSS, and automatic PDF generation.

## Features

- Static site generation (adapter-static)
- Git-based CMS (Sveltia CMS)
- GitHub project fetching
- Automatic PDF generation (Puppeteer)
- Terminal aesthetic with dark mode
- WCAG compliant accessibility

## Quick Start

```bash
npm install
npm run dev      # Development server
npm run build    # Build static site + PDF
```

## Content

Edit YAML files in `/content/`:

```yaml
# content/profile.yml
name: Your Name
title: Your Title
email: your@email.com
github: username
```

Or use the CMS at `/admin/`.

## NixOS / Devbox

For Chrome/PDF support on NixOS:

```bash
devbox shell
npm run build
```

## Deployment

Upload `/build/` to any static host (GitHub Pages, Netlify, Vercel, etc.).

## Development

```bash
npm run dev      # Dev server
npm run check    # Type check
npm run format   # Format code
npm run build    # Production build
```

## License

MIT

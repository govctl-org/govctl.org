# govctl.org Agent Guide

## Project Goal

Official website for **govctl-org** — bringing determinism to AI coding.

### Mission

AI coding is powerful but undisciplined. govctl-org builds tools that enforce structure, traceability, and phase discipline on AI-assisted development workflows.

### Products

| Product        | Description                                           | Status      |
| -------------- | ----------------------------------------------------- | ----------- |
| **govctl**     | Opinionated governance CLI for RFC-driven development | Live        |
| **skillc**     | Agent skill compiler                                  | Coming soon |
| **jjgov**      | jj-based multi-agent collaboration workflow           | Coming soon |
| **everevolve** | Project rules generated from commit history           | Coming soon |

### Visual Identity

- **Aesthetic**: Kubernetes/Docker professionalism + AI/Agent technical feel
- **Primary color**: Indigo (#6366F1)
- **Mode**: Dark-first
- **Motif**: Phase discipline (`spec → impl → test → stable`)

---

## Tech Stack

- **Package manager**: Bun (`bun install`, `bun run`)
- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Deployment**: Static site

### Commands

```bash
bun install          # Install dependencies
bun run dev          # Start dev server
bun run build        # Build for production
bun run preview      # Preview production build
```

---

## Project Structure

```
src/
├── components/      # Reusable Astro components
├── layouts/         # Page layouts
├── pages/           # Routes (/, /products/*, etc.)
└── styles/          # Global CSS / Tailwind config
public/              # Static assets (logos, images)
```

---

## Design Tokens

```css
/* Colors */
--color-primary: #6366f1; /* Indigo-500 */
--color-accent: #818cf8; /* Indigo-400 */
--color-bg: #0f0f14; /* Dark background */
--color-surface: #1a1a24; /* Cards, code blocks */
--color-border: #2a2a3a; /* Subtle borders */
--color-text: #e4e4e7; /* Primary text */
--color-text-muted: #a1a1aa; /* Secondary text */

/* Phase colors */
--color-spec: #6366f1; /* Indigo */
--color-impl: #f59e0b; /* Amber */
--color-test: #3b82f6; /* Blue */
--color-stable: #22c55e; /* Green */
```

---

## Content Guidelines

- All content in English
- Technical, direct tone (no marketing fluff)
- CLI-first presentation (terminal showcases)
- Phase discipline as recurring visual motif

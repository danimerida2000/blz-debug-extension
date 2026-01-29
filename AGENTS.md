# Blz Debug Extension - AI Agent Configuration

> System configuration for AI coding agents working on this project.

## 🏗️ Project Overview

**Type:** Chrome/Firefox Browser Extension
**Stack:** Vue 3, TypeScript, Webpack, Manifest V3
**Purpose:** Debug overlay for Blazed Path applications

## 📁 Architecture

```
src/
├── background/         # Service worker (message handling)
├── content-scripts/    # Injected into pages (debug overlay)
│   └── debug/          # Modular TypeScript structure
├── popup/              # Vue 3 popup UI
└── manifest.json       # Extension manifest
```

## ⚙️ Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript 5.8 (strict mode) |
| Framework | Vue 3.5 (Composition API) |
| Build | Webpack 5 + ts-loader |
| Linting | ESLint 9 (flat config) + Prettier |
| Testing | Vitest + happy-dom |
| Extension | Manifest V3, webextension-polyfill |

## 📜 Rules

### Code Style

- **No `any`** - Use proper types or `unknown`
- **Composition API only** - No Options API in Vue components
- **`<script setup lang="ts">`** - For all Vue components
- **Named exports** - Prefer over default exports

### File Naming

- **TypeScript:** `kebab-case.ts`
- **Vue Components:** `PascalCase.vue`
- **Constants:** SCREAMING_SNAKE_CASE

### Imports

- Use path aliases: `@/`, `@/popup/`, `@/content-scripts/`
- Type imports: `import type { X } from '...'`

### Content Scripts

- Check `isBlzAvailable()` before using `Blz` global
- Use constants from `constants.ts` for styles
- DOM IDs prefixed with `blz-`

## 🧪 Testing

```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run type-check  # TypeScript validation
npm run lint        # ESLint check
```

## 🔨 Common Tasks

### Add a new utility

1. Create in `src/content-scripts/debug/utils/`
2. Export from module
3. Add tests in `__tests__/`

### Modify popup UI

1. Edit `src/popup/App.vue`
2. Components in `src/popup/components/`
3. Run `npm run watch` to test

### Update permissions

1. Edit `src/manifest.json`
2. Explain changes in commit message

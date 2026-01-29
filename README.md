# Blz Debug Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-green)](https://vuejs.org/)

A Chrome/Firefox extension for debugging [Blazed Path](https://blazedpath.com) applications. Provides an interactive overlay to inspect component context data in real-time.

## ✨ Features

- 🔍 **Visual Component Inspection** - Hover over components to see their context
- 🎨 **Syntax Highlighted JSON** - Easy-to-read context data display
- 🖱️ **Draggable Panel** - Move the context panel anywhere on screen
- 🎯 **Component Highlighting** - Visual borders around Blz components
- ⌨️ **Keyboard Shortcuts** - Press `Escape` to close debug mode

## 📦 Installation

### From Source

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/blz-debug-extension.git
   cd blz-debug-extension
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Build the extension**

   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

### For Firefox

- Navigate to `about:debugging#/runtime/this-firefox`
- Click "Load Temporary Add-on"
- Select `dist/manifest.json`

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Commands

| Command | Description |
|---------|-------------|
| `npm run watch` | Development mode with auto-rebuild |
| `npm run build` | Production build |
| `npm run build-zip` | Package for distribution |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | TypeScript type checking |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Tests in watch mode |

### Project Structure

```
src/
├── background/           # Service worker
│   └── index.ts
├── content-scripts/      # Injected scripts
│   └── debug/
│       ├── index.ts      # Entry point
│       ├── types.ts      # Type definitions
│       ├── constants.ts  # Style constants
│       ├── blz-context-monitor.ts  # Main orchestrator
│       ├── dom/          # DOM components
│       │   ├── monitor-button.ts
│       │   ├── context-panel.ts
│       │   └── component-label.ts
│       └── utils/        # Utilities
│           ├── syntax-highlight.ts
│           ├── component-finder.ts
│           └── drag-handler.ts
├── popup/                # Extension popup
│   ├── App.vue
│   ├── components/
│   │   └── SwitchButton.vue
│   ├── index.ts
│   └── index.html
├── icons/
│   └── logo.svg
└── manifest.json
```

## 🔧 Configuration

### ESLint & Prettier

The project uses ESLint v9 flat config with TypeScript and Vue support. Run `npm run lint` to check and `npm run lint:fix` to auto-fix issues.

### TypeScript

Strict mode enabled with path aliases:

- `@/*` → `src/*`
- `@/popup/*` → `src/popup/*`
- `@/content-scripts/*` → `src/content-scripts/*`

## 📖 Usage

1. Navigate to a page with a Blazed Path application
2. Click the extension icon to see the popup
3. Toggle the switch to enable debug mode (or click the floating shield button)
4. Hover over page elements to inspect their component context
5. Drag the context panel to reposition it
6. Press `Escape` to exit debug mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Danilo Mérida** - [GitHub](https://github.com/danimerida2000)

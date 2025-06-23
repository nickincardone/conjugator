# PorOPara - Spanish Language Learning Quiz App

A React-based web application for practicing Spanish language concepts, with a focus on verb conjugations, definitions, and the usage of "por" vs "para". The app provides an interactive quiz experience with multiple question types and customizable settings.

## Features

- Multiple question types:
  - Verb conjugations (Multiple Choice & Written)
  - Word definitions (Multiple Choice & Written)
  - Por vs Para usage
- Customizable quiz settings:
  - Number of questions (5-50, in increments of 5)
  - Verb tenses selection
  - Optional vosotros form inclusion
  - Irregular verbs only option
- Responsive design for both desktop and mobile
- Progress tracking
- Detailed explanations for incorrect answers
- Results summary with performance metrics

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/poropara.git
cd poropara
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development Scripts

- **Development server**: `npm run dev` - Start the Vite development server with hot module replacement
- **Build for production**: `npm run build` - Create optimized production build
- **Preview production build**: `npm run preview` - Preview the production build locally
- **Run tests**: `npm run test` - Run tests with Vitest
- **Run tests with UI**: `npm run test:ui` - Run tests with Vitest's UI interface
- **Lint code**: `npm run lint` - Check code for linting errors
- **Format code**: `npm run format` - Format code with Prettier
- **Watch and format**: `npm run watch` - Watch for changes and auto-format code

## Project Structure

```
src/
├── components/        # Reusable UI components
│   └── ui/           # Base UI components
├── data/             # Static data and configurations
├── features/         # Feature-specific components
│   ├── dialogs/     # Dialog components
│   ├── home/        # Home page
│   ├── options/     # Quiz options page
│   ├── quiz/        # Quiz components
│   └── results/     # Results page
├── structures/       # Core data structures and classes
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── styles/          # Global styles and SCSS files
```

## Import Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of relative paths
import { VerbType } from '../../types/types'
import verbs from '../../data/conjugationVerbs'

// Use clean aliases
import { VerbType } from 'types/types'
import verbs from 'data/conjugationVerbs'
```

Available aliases:
- `data/*` → `src/data/*`
- `types/*` → `src/types/*`
- `components/*` → `src/components/*`
- `utils/*` → `src/utils/*`
- `features/*` → `src/features/*`
- `structures/*` → `src/structures/*`

## Technologies Used

- **React 18** - UI library with modern hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Vitest** - Fast unit testing framework
- **Material-UI (MUI)** - React component library
- **React Router** - Client-side routing
- **SCSS** - CSS preprocessor
- **ESLint & Prettier** - Code linting and formatting

## Build System

This project uses Vite for fast development and optimized production builds:

- **Hot Module Replacement (HMR)** - Instant updates during development
- **Fast builds** - Significantly faster than traditional webpack builds
- **Tree shaking** - Dead code elimination for smaller bundles
- **Modern JavaScript** - Native ES modules support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Migration Notes

This project has been migrated from Create React App to Vite for improved performance:
- Development server startup is now nearly instantaneous
- Hot module replacement is faster and more reliable
- Production builds are significantly faster
- Bundle sizes are optimized with better tree-shaking

## License

This project is licensed under the MIT License - see the LICENSE file for details.
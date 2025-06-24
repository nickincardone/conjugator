# Poropara - Spanish Learning App Monorepo

A modern Spanish learning application built with React that helps you practice verb conjugations, definitions, and grammar concepts like "por vs para".

## Monorepo Structure

This project has been restructured as a monorepo to support multiple applications:

```
poropara/
├── apps/
│   ├── web/          # React web application
│   └── mobile/       # React Native mobile app (coming soon)
├── packages/
│   └── shared/       # Shared code between apps
│       ├── components/  # Reusable UI components
│       ├── data/       # Spanish verb data, rules, etc.
│       ├── structures/ # Core classes (Quiz, Settings)
│       ├── types/      # TypeScript type definitions
│       ├── utils/      # Utility functions
│       └── theme.ts    # Material-UI theme
└── package.json      # Root monorepo configuration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd poropara
```

2. Install dependencies for all packages:
```bash
npm install
```

### Development

#### Web Application
To run the web application in development mode:
```bash
npm run dev:web
# or simply
npm run dev
```

The app will be available at `http://localhost:5173`

#### Building
To build the web application:
```bash
npm run build:web
```

#### Testing
To run tests for the web application:
```bash
npm run test:web
```

#### Linting
To lint the web application:
```bash
npm run lint:web
```

#### Formatting
To format all code in the monorepo:
```bash
npm run format
```

## Features

- **Verb Conjugation Practice**: Test your knowledge of Spanish verb conjugations across different tenses
- **Definition Quizzes**: Learn Spanish verb meanings through multiple choice and written exercises
- **Por vs Para**: Master this tricky Spanish grammar concept with fill-in-the-blank exercises
- **Custom Quiz Options**: Choose specific verb types, question types, and quiz length
- **Progress Tracking**: Review incorrect answers and explanations
- **Responsive Design**: Works on both desktop and mobile devices

## Architecture

### Shared Package (`@poropara/shared`)
Contains all the business logic, data, and utilities that can be shared between web and mobile applications:

- **Types**: TypeScript definitions for Questions, Verbs, etc.
- **Data**: Comprehensive Spanish verb conjugation database
- **Utils**: Helper functions for string manipulation, etc.
- **Structures**: Core classes like Quiz and Settings management

### Web App (`@poropara/web`)
React web application that consumes the shared package and provides:
- Web-specific routing and navigation
- Material-UI based responsive design
- Web-optimized user interactions

### Future Mobile App (`@poropara/mobile`)
Planned React Native application that will share the same core logic and data from the shared package.

## Contributing

1. Make sure to install dependencies: `npm install`
2. Follow the existing code style and run `npm run format` before committing
3. Add tests for new features
4. Update this README if you make structural changes

## License

[Your License Here]
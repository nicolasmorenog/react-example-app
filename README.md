# React Example App

A React + Vite example application showcasing various React patterns and integrations including shopping lists, Google Maps, to-do lists with API integration, and state management examples.

## Features

- **Shopping List** - Manage shopping items with add/remove functionality
- **Google Maps Integration** - Interactive map with location markers using Google Maps API
- **To-Do List with API** - Task management with Supabase backend integration
- **Canvas Games** - Dino Game (Chrome dino clone) and Geometry Dash platformer
- **State Management Examples** - Counter, Unicafe feedback, and anecdote voting demos
- **Context API Demo** - Global state management using React Context

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Vite |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |

## Dependencies

| Package | Description |
|---------|-------------|
| [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) | React components for integrating Google Maps JavaScript API. |
| [@supabase/supabase-js](https://www.npmjs.com/package/@supabase/supabase-js) | JavaScript client for Supabase (PostgreSQL database and authentication). |
| [@tabler/icons-react](https://www.npmjs.com/package/@tabler/icons-react) | React component library for Tabler Icons (modern, customizable SVG icons). |
| [@vis.gl/react-google-maps](https://www.npmjs.com/package/@vis.gl/react-google-maps) | Alternative React library for Google Maps integration with vis.gl ecosystem. |
| [dotenv](https://www.npmjs.com/package/dotenv) | Loads environment variables from `.env` file into `process.env`. |
| [react](https://www.npmjs.com/package/react) | Core React library for building user interfaces with components. |
| [react-dom](https://www.npmjs.com/package/react-dom) | React package for DOM-specific methods to render components in the browser. |
| [react-router-dom](https://www.npmjs.com/package/react-router-dom) | Declarative routing library for React single-page applications. |
| [sonner](https://www.npmjs.com/package/sonner) | Opinionated toast notification component for React applications. |

## DevDependencies

| Package | Description |
|---------|-------------|
| [@eslint/js](https://www.npmjs.com/package/@eslint/js) | ESLint's JavaScript configuration and utilities. |
| [@types/react](https://www.npmjs.com/package/@types/react) | TypeScript type definitions for React. |
| [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | TypeScript type definitions for React DOM. |
| [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) | Official Vite plugin for React with Fast Refresh support. |
| [eslint](https://www.npmjs.com/package/eslint) | Pluggable JavaScript linter for identifying code issues. |
| [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) | Disables ESLint rules that conflict with Prettier formatting. |
| [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) | Runs Prettier as an ESLint rule for consistent formatting. |
| [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) | ESLint rules for enforcing React Hooks best practices. |
| [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh) | ESLint plugin for React Fast Refresh validation. |
| [globals](https://www.npmjs.com/package/globals) | Global identifiers for JavaScript environments (Node.js, browser, etc.). |
| [prettier](https://www.npmjs.com/package/prettier) | Opinionated code formatter for consistent style. |
| [vite](https://www.npmjs.com/package/vite) | Next-generation frontend build tool with fast HMR. |

## Tech Stack

- **Framework:** React 19 + Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Plain CSS files
- **Backend:** Supabase
- **Maps:** Google Maps API
- **Linting:** ESLint + Prettier

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your API keys
4. Start development server: `npm run dev`

## License

MIT

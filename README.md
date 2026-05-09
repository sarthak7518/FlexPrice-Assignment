# Flexprice Frontend

A React + TypeScript dashboard for the Flexprice billing platform. This repository includes the web client for usage metering, pricing configuration, credit management, invoicing, and customer portal flows.

## Key Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Storybook
- Vitest
- Zustand
- TanStack Query
- Radix UI
- Supabase authentication
- Sentry monitoring

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 after startup.

## Scripts

- `npm run dev` - Start the Vite development server on port 3000
- `npm run build` - TypeScript project build and Vite production build
- `npm run preview` - Preview production build locally
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build Storybook static files
- `npm run format` - Format source files with Prettier
- `npm test` - Run Vitest in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run Vitest UI

## Project Structure

- `src/` — Application source
  - `api/` — API client and service modules
  - `components/` — Reusable UI components
  - `config/` — Feature and runtime configuration
  - `constants/` — Shared constants
  - `context/` — React context providers
  - `core/` — Core business logic utilities
  - `hooks/` — Custom hooks
  - `layouts/` — Route layouts and wrappers
  - `lib/` — Library utilities and wrappers
  - `models/` — TypeScript models and interfaces
  - `pages/` — Route-level page components
  - `store/` — Zustand stores
  - `tests/` — Shared test setup and helpers
  - `types/` — Shared type definitions
  - `utils/` — Generic utilities

## Environment

Copy `.env.example` to `.env` and fill in values for the client. Environment variables are prefixed with `VITE_` for client-side exposure.

## Git Ignore

This repository ignores build artifacts, generated output, local environment files, and editor/tool metadata.

## Contribution Notes

- Use Tailwind utility classes for styling.
- Prefer explicit TypeScript types over `any`.
- Use Zod schemas for runtime validation where available.
- Keep API interactions in `src/api/` and use TanStack Query for server state.
- Co-locate tests with their source file or use `src/tests/` for shared test utilities.

## Notes

There were no additional README files detected in the workspace. This file is the only project readme and now contains the primary developer guide for the frontend repository.

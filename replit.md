# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Portfolio (`artifacts/portfolio`) — Preview Path: `/`
Futuristic 3D portfolio website for Achyuth Parisha (CS student & AI developer).

**Tech:** React + Vite, Framer Motion, Three.js (@react-three/fiber + @react-three/drei), Tailwind CSS v4

**Sections:**
- Hero: Full-screen 3D animated background (Three.js particles + AI orb), neon gradient text, CTA buttons
- About: Animated skill chips, stats grid, scroll-triggered reveals
- Projects: 3D tilt cards for Jennifer AI, Sahayak AI, Secure Payment System
- Contact: Futuristic glowing form + social links

**Design:** Dark theme, neon blue/purple, glassmorphism, Orbitron font

**Key dependencies added:**
- `@react-three/fiber`, `@react-three/drei`, `three`, `@types/three`
- `react-intersection-observer`

### API Server (`artifacts/api-server`) — Preview Path: `/api`
Shared Express 5 backend for the workspace.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/portfolio run dev` — run portfolio locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

# AgriTech Platform

Multi-channel agriculture platform under active rebuild, with the legacy Django app kept in-repo as a reference implementation.

## Current Workspace Snapshot

Status legend:
- Production-ready: stable and feature-complete for current scope.
- In progress: scaffolded and under active implementation.
- Legacy reference: older implementation used for feature/flow inspiration.

| Path | Role | Status |
| :--- | :--- | :--- |
| `backend/` | Node.js/TypeScript API | In progress |
| `frontend-web/` | React + Vite web client | In progress |
| `frontend-mobile/` | Expo React Native mobile app | In progress |
| `database/` | SQL schema, seeds, migrations | In progress |
| `docs/` | Product and technical docs | Active |
| `___django___/` | Legacy Django monolith | Legacy reference |

## Quick Start (Current Folders)

Install dependencies per project root:

```bash
npm install
cd backend && npm install
cd ../frontend-web && npm install
cd ../frontend-mobile && npm install
```

Run services individually:

```bash
# Backend (from backend/)
npx ts-node src/index.ts

# Web (from frontend-web/)
npm run dev

# Mobile (from frontend-mobile/)
npm run start
```

Notes:
- The root npm scripts still use older folder names (`web` and `mobile`), so they are not the source of truth right now.
- Default local ports are `3000` for backend (if unchanged) and `5173` for Vite web.

## Architecture Direction

- Target architecture: split frontend web, frontend mobile, backend API, and shared database.
- Legacy Django app is used for:
	- user onboarding and auth flow ideas,
	- dashboard IA and feature grouping,
	- crop and weather domain model references.

See `docs/LEGACY_COMPARISON_AND_BORROW_PLAN.md` for a detailed mapping.

## Documentation Index

- Product and implementation docs: `docs/`
- Backend setup and scope: `backend/readme.md`
- Web setup and scope: `frontend-web/README.md`
- Mobile setup and scope: `frontend-mobile/README.md`
- Legacy reference app: `___django___/`

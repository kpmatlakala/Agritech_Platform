# AgriTech Web App

React + Vite frontend for the AgriTech platform.

## Current State

The web app is currently a starter scaffold and is being reshaped into the platform dashboard experience.

Implemented today:
- Vite + React + TypeScript setup.
- Basic starter UI in `src/App.tsx`.

Planned next:
- dashboard shell and navigation,
- crop and weather views,
- account-aware data views,
- map and analytics widgets.

## Tech Stack

- React 19
- TypeScript
- Vite
- Axios
- Leaflet + React-Leaflet

## Setup

From `frontend-web/`:

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Folder Overview

```text
frontend-web/
	public/
	src/
		App.tsx
		main.tsx
		App.css
		index.css
```

## Legacy-Inspired Direction

UI and flow inspiration is being taken from the Django templates and dashboard grouping in `___django___/templates/` and `___django___/accounts/`.

See `docs/LEGACY_COMPARISON_AND_BORROW_PLAN.md` for migration notes.
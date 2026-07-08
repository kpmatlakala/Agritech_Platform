# AgriTech Mobile App

Expo + React Native mobile client for the AgriTech platform.

## Current State

Implemented today:
- Expo Router app structure with route groups.
- Entry route redirects to `(auth)/welcome`.
- Auth screens present under `app/(auth)/`.

Planned next:
- connect auth screens to backend,
- add farmer dashboard and data views,
- add crop/weather-focused mobile workflows.

## Tech Stack

- Expo SDK 56
- React Native
- React 19
- Expo Router
- TypeScript
- NativeWind
- Zustand

## Setup

From `frontend-mobile/`:

```bash
npm install
npm run start
```

Then use Expo shortcuts:
- press `a` for Android,
- press `i` for iOS,
- press `w` for web.

## Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Folder Overview

```text
frontend-mobile/
  app/
    _layout.tsx
    index.tsx
    (auth)/
    (root)/
    (tabs)/
  components/
  constants/
  assets/
```

## Legacy-Inspired Direction

The mobile information architecture will borrow from existing legacy flows in `___django___` (signup/signin/dashboard, crop monitoring, weather dashboard) while adapting to mobile-first UX.

See `docs/LEGACY_COMPARISON_AND_BORROW_PLAN.md` for details.

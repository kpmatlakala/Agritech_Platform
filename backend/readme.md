# AgriTech Backend

Node.js + Express TypeScript API for the AgriTech platform (currently in scaffold stage).

## Current State

Implemented today:
- Express app bootstrap with CORS and JSON middleware.
- Health endpoint at `GET /health`.

Planned next (informed by legacy Django flows):
- auth and user profile endpoints,
- crop monitoring endpoints,
- weather aggregation endpoints,
- farmer-focused reporting/export APIs.

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL client (`pg`)
- `dotenv`, `cors`, `jsonwebtoken`, `bcryptjs`

## Setup

From `backend/`:

```bash
npm install
npx ts-node src/index.ts
```

Optional hot-reload dev loop:

```bash
npx nodemon --watch src --exec ts-node src/index.ts
```

## API Surface (Current)

| Method | Endpoint | Purpose |
| :----- | :------- | :------ |
| `GET` | `/health` | Health check |

Example response:

```json
{
  "status": "ok",
  "timestamp": "2026-06-29T12:34:56.789Z"
}
```

## Environment Variables

Current minimum:

```env
PORT=3000
```

As feature modules are added, this file will include DB and external integration keys.

## Project Structure

```text
backend/
  package.json
  tsconfig.json
  src/
    index.ts
```

## Legacy Reference Inputs

See `docs/LEGACY_COMPARISON_AND_BORROW_PLAN.md` for details about what is being adapted from the Django app under `___django___/`.

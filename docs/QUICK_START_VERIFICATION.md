# Quick Start & Verification Guide

## Pre-Flight Checklist ✓

### 1. Environment Variables
- ✅ backend/.env has DATABASE_URL from Aiven
- ✅ backend/.env has JWT_SECRET=aiven_token
- ✅ frontend-mobile/.env has EXPO_PUBLIC_API_URL=http://localhost:3000/api

### 2. Database Configuration
- ✅ backend/src/db.ts updated to use DATABASE_URL connection string
- ✅ SSL mode set to require for Aiven (sslmode=require in connection string)

### 3. All Files in Place
```
Backend: 5 core files
  ✅ src/index.ts
  ✅ src/db.ts (fixed for Aiven)
  ✅ src/types.ts
  ✅ src/middleware/auth.ts
  ✅ src/routes/{auth,agents,farmers}.ts

Mobile: 11 screen files + stores + utilities
  ✅ (auth): login, sign-up, welcome, sign-in
  ✅ (agent): dashboard, register, farmers, farmer-detail, profile
  ✅ (farmer): dashboard, advisory, profile
  ✅ stores: useAuthStore, useAgentStore, useFarmerStore
  ✅ utils: api.ts, location.ts, camera.ts
```

---

## Startup Instructions

### Terminal 1: Backend

```bash
cd backend

# Install deps if not done
npm install

# Option A: Run with ts-node (no build needed)
npm start
# OR
npx ts-node src/index.ts

# Option B: Build then run
npx tsc
node dist/index.ts
```

**Expected Output:**
```
✅ Database schema initialized
✅ 🚀 Server running on port 3000
✅ 📚 API endpoints listed
```

**Test the health endpoint:**
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-07-06T..."}
```

### Terminal 2: Mobile

```bash
cd frontend-mobile

# Install deps if not done
npm install

# Start Expo dev server
npm start
```

**Then in the terminal:**
- Press `w` for web preview
- Or scan QR code with Expo Go app

**Expected Flow:**
1. App shows login screen (no token stored)
2. Try login with credentials (will need agent in DB)
3. On success, redirects to agent dashboard
4. Can navigate through all 4 agent tabs

---

## Testing the Connection

### 1. Test Backend API

```bash
# Health check
curl http://localhost:3000/health

# Create test agent (POST /api/auth/register-agent)
curl -X POST http://localhost:3000/api/auth/register-agent \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "27821234567",
    "password": "testpass123",
    "full_name": "Test Agent",
    "village": "Test Village"
  }'

# Login to get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "27821234567",
    "password": "testpass123"
  }'

# Response includes token - use in Authorization header for other requests
```

### 2. Test Mobile Connection

- Start mobile app on web (`npm start` → `w`)
- Enter phone_number from test agent above
- Enter password: testpass123
- Should successfully login and show agent dashboard

---

## Database Verification

### Check Aiven Connection

```bash
# From backend root, test connection directly:
psql $(cat .env | grep DATABASE_URL | cut -d= -f2)

# Once connected, verify schema:
\dt                 # List tables
SELECT * FROM agents;
SELECT * FROM farmers;
SELECT * FROM users;
```

---

## Troubleshooting

### Backend won't start
- ❌ Error: "Cannot find module 'typescript'"
  - Fix: `npm install`

- ❌ Error: "connect ECONNREFUSED 127.0.0.1:5432"
  - Fix: DATABASE_URL is likely using localhost instead of Aiven
  - Verify: `cat backend/.env | grep DATABASE_URL` should show aivencloud.com domain

- ❌ Error: "SSL certificate error"
  - Fix: Already in connection string (sslmode=require)
  - Verify: DATABASE_URL ends with `?sslmode=require`

### Mobile won't connect to backend
- ❌ Error: "Failed to login"
  - Check: Is backend running? (http://localhost:3000/health should work)
  - Check: frontend-mobile/.env has correct EXPO_PUBLIC_API_URL
  - Note: If on different machine, use actual IP instead of localhost

- ❌ Error: "Module not found: @/utils/api"
  - Fix: `npm install` in frontend-mobile

### Login fails
- ❌ Error: "Incorrect credentials"
  - Create test agent via API (see above)
  - Use exact phone_number and password

---

## What's Connected Now

| Component | Status | Connection |
|-----------|--------|-----------|
| Backend Express | ✅ Running | Port 3000 |
| PostgreSQL (Aiven) | ✅ Configured | DATABASE_URL in .env |
| Mobile Expo | ✅ Ready | Connects to http://localhost:3000/api |
| JWT Auth | ✅ Configured | Key: aiven_token |
| GPS Utilities | ✅ Ready | Integrated in register form |
| Camera Utilities | ✅ Ready | Integrated in register form |
| State Management | ✅ Ready | Zustand stores with persistence |

---

## Next Steps if Everything Works

1. ✅ Backend: Can register agents and farmers
2. ✅ Mobile: Can login and navigate between agent screens
3. ✅ Database: Data persists in Aiven PostgreSQL
4. → Proceed to Phase 2: Web frontend, advanced features

---

## Files Modified/Created for Network Recovery

1. `backend/src/db.ts` - Updated to use DATABASE_URL connection string
2. `frontend-mobile/.env` - Created with EXPO_PUBLIC_API_URL
3. `docs/PHASE_1_COMPLETION_STATUS.md` - Created comprehensive status
4. `docs/QUICK_START_VERIFICATION.md` - This file

All other files were verified to be present and unchanged.

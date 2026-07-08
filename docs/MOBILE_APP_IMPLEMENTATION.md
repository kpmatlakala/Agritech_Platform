# **Mobile App Implementation Plan**
## Agent + Farmer Dual-Role Architecture

**Date:** July 2026  
**Stack:** Node.js + Express (Backend) | React Native/Expo (Mobile) | PostgreSQL (Database)  
**Status:** Ready for Implementation

---

## **1. Overview**

The Agritech Platform mobile app supports two user roles:
- **Agent (CBA)**: Registers farmers, manages farmer data, views dashboard with all their farmers
- **Farmer**: Views own profile, receives advisory, limited read-only access

This document outlines the implementation strategy for both roles with clear phase breakdown.

---

## **2. Backend API Specification**

### **2.1 Authentication Endpoints**

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me                    # Returns current user role & profile
POST /api/auth/verify-phone         # SMS OTP verification
```

**User Roles in Database:**
- `agent` — Can register farmers, manage their data
- `farmer` — Can view own profile, advisory

### **2.2 Agent Endpoints**

```
GET /api/agents/me                  # Get agent profile
GET /api/agents/:agentId/farmers    # List all farmers registered by agent
POST /api/farmers                   # Register new farmer (agent only)
GET /api/farmers/:farmerId          # Get farmer details (if agent owns them)
PUT /api/farmers/:farmerId          # Edit farmer (agent only)
DELETE /api/farmers/:farmerId       # Delete farmer (agent only)
```

### **2.3 Farmer Endpoints**

```
GET /api/farmers/me                 # Get own farmer profile
PUT /api/farmers/me                 # Update own profile
GET /api/farmers/me/advisory        # Get AI advisory recommendations
GET /api/farmers/me/orders          # Get pending orders (marketplace)
```

### **2.4 Database Schema**

```sql
-- Agents (CBAs)
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id TEXT UNIQUE NOT NULL,           -- AG-001
    phone_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT,
    village TEXT,
    district TEXT,
    province TEXT DEFAULT 'Limpopo',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Farmers
CREATE TABLE farmers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farmer_id TEXT UNIQUE NOT NULL,          -- AFAP-0001
    phone_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    id_number TEXT NOT NULL,
    village TEXT NOT NULL,
    district TEXT,
    province TEXT DEFAULT 'Limpopo',
    crop_types TEXT[] DEFAULT '{}',
    farm_size_ha DECIMAL(10,2),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    gps_accuracy DECIMAL(5,2),
    photo_url TEXT,
    registered_at TIMESTAMP DEFAULT NOW(),
    registered_via TEXT DEFAULT 'ussd',     -- 'ussd', 'web', 'agent'
    status TEXT DEFAULT 'active',            -- 'active', 'pending', 'inactive'
    created_by TEXT NOT NULL,                -- Agent ID
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Auth Users (join table)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL,                      -- 'agent' or 'farmer'
    role_id UUID,                            -- References agents.id or farmers.id
    pin TEXT,                                 -- Optional PIN for USSD
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## **3. Mobile App Architecture**

### **3.1 Folder Structure**

```
frontend-mobile/
├── app/
│   ├── (auth)/
│   │   ├── welcome.tsx              # First screen - choose role
│   │   ├── login.tsx                # Login screen
│   │   ├── otp-verify.tsx           # SMS OTP verification
│   │   └── register.tsx             # Registration (if needed)
│   ├── (agent)/
│   │   ├── _layout.tsx              # Agent tab layout
│   │   ├── dashboard.tsx            # Agent dashboard
│   │   ├── register-farmer.tsx      # Farmer registration form
│   │   ├── my-farmers.tsx           # List all farmers
│   │   ├── farmer-detail.tsx        # View/edit farmer
│   │   └── profile.tsx              # Agent profile
│   ├── (farmer)/
│   │   ├── _layout.tsx              # Farmer tab layout
│   │   ├── dashboard.tsx            # Farmer dashboard
│   │   ├── profile.tsx              # Own profile (view/edit)
│   │   ├── advisory.tsx             # AI recommendations
│   │   └── orders.tsx               # Marketplace orders
│   └── _layout.tsx                  # Root layout with auth check
├── components/
│   ├── AgentDashboard.tsx
│   ├── FarmerDashboard.tsx
│   ├── RegisterFarmerForm.tsx
│   ├── FarmerList.tsx
│   ├── FarmerCard.tsx
│   ├── LocationPicker.tsx           # GPS capture
│   ├── CameraCapture.tsx            # Photo capture
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── ...
├── store/
│   ├── useAuthStore.ts              # Auth state (Zustand)
│   ├── useFarmerStore.ts            # Farmer data state
│   ├── useAgentStore.ts             # Agent & farmers list state
│   └── useLocationStore.ts          # GPS state
├── utils/
│   ├── api.ts                       # API client with interceptors
│   ├── storage.ts                   # AsyncStorage helpers
│   ├── validation.ts                # Form validation
│   ├── gps.ts                       # Location services
│   └── camera.ts                    # Photo capture
├── types/
│   ├── index.ts                     # TypeScript interfaces
│   └── api.ts                       # API response types
└── constants/
    ├── Colors.ts
    ├── theme.ts
    └── API_BASE_URL.ts
```

### **3.2 State Management with Zustand**

**Auth Store** (`store/useAuthStore.ts`):
```typescript
export interface AuthState {
  user: User | null;
  role: 'agent' | 'farmer' | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}
```

**Agent Store** (`store/useAgentStore.ts`):
```typescript
export interface AgentState {
  farmers: Farmer[];
  stats: { total: number; active: number; pending: number };
  loading: boolean;
  fetchFarmers: () => Promise<void>;
  registerFarmer: (data: FarmerRegistration) => Promise<Farmer>;
  editFarmer: (id: string, data: Partial<Farmer>) => Promise<void>;
  deleteFarmer: (id: string) => Promise<void>;
}
```

**Farmer Store** (`store/useFarmerStore.ts`):
```typescript
export interface FarmerState {
  profile: Farmer | null;
  advisory: Advisory[] | null;
  orders: Order[] | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Farmer>) => Promise<void>;
  fetchAdvisory: () => Promise<void>;
}
```

---

## **4. Implementation Phases**

### **Phase 1: Authentication & Core Setup (Week 1-2)**

**Backend:**
- [ ] Set up Express routes for `/api/auth/*`
- [ ] Implement JWT token generation
- [ ] Create user registration & login endpoints
- [ ] Add role detection logic

**Mobile:**
- [ ] Create auth routing structure
- [ ] Implement login screen UI
- [ ] Create Zustand auth store
- [ ] Add API client with JWT interceptors
- [ ] Implement role-based route protection

**Deliverable:** User can log in with phone number, receive JWT token, and be routed to correct dashboard based on role.

---

### **Phase 2: Agent Features (Week 3-5)**

**Backend:**
- [ ] Create `/api/farmers` endpoints for CRUD
- [ ] Implement GPS data storage
- [ ] Add farmer search/filter queries
- [ ] Create farmer statistics endpoint
- [ ] Add permission checks (agent can only see own farmers)

**Mobile:**
- [ ] Build Agent Dashboard screen
- [ ] Create Register Farmer form with:
  - [ ] GPS capture (expo-location)
  - [ ] Photo capture (expo-camera)
  - [ ] Form validation
- [ ] Build My Farmers list with search/filter
- [ ] Build Farmer Detail view with edit/delete
- [ ] Implement agent store (Zustand)

**Deliverable:** Agent can register a farmer (with GPS + photo), see their farmer list, and manage farmer details.

---

### **Phase 3: Farmer Features (Week 6-7)**

**Backend:**
- [ ] Create `/api/farmers/me/*` endpoints
- [ ] Implement advisory recommendation logic (basic)
- [ ] Add marketplace orders endpoint

**Mobile:**
- [ ] Build Farmer Dashboard
- [ ] Build Farmer Profile (read-only, with edit own)
- [ ] Build Advisory screen
- [ ] Build Orders screen (marketplace integration)
- [ ] Implement farmer store (Zustand)

**Deliverable:** Farmer can view their profile, see advisory, and browse marketplace.

---

### **Phase 4: Offline & Sync (Week 8)**

**Mobile:**
- [ ] Implement AsyncStorage for offline data
- [ ] Create sync mechanism (detect online/offline)
- [ ] Queue farmer registration for sync when online
- [ ] Add sync indicator UI

**Deliverable:** App works offline, syncs when connection returns.

---

### **Phase 5: Testing & Refinement (Week 9-10)**

- [ ] Integration tests for API endpoints
- [ ] E2E tests for mobile screens
- [ ] Bug fixes & UX improvements
- [ ] Performance optimization

---

## **5. Component Checklist**

### **Auth Screens**
- [ ] Welcome screen (choose role)
- [ ] Login screen
- [ ] OTP verification screen

### **Agent Screens**
- [ ] Dashboard (stats, recent registrations)
- [ ] Register Farmer form (with GPS + photo)
- [ ] My Farmers list (searchable)
- [ ] Farmer Detail (view/edit/delete)
- [ ] Agent Profile

### **Farmer Screens**
- [ ] Dashboard (stats for own farm)
- [ ] My Profile (view/edit)
- [ ] Advisory (AI recommendations)
- [ ] Orders (marketplace)

### **Shared Components**
- [ ] LocationPicker (GPS capture)
- [ ] CameraCapture (photo)
- [ ] FormInput, Button, Card
- [ ] Loading, Error states

---

## **6. API Endpoint Quick Reference**

| Endpoint | Method | Role | Purpose |
|----------|--------|------|---------|
| `/api/auth/login` | POST | Any | Login with phone |
| `/api/auth/me` | GET | Any | Get current user |
| `/api/farmers` | POST | Agent | Register farmer |
| `/api/agents/:id/farmers` | GET | Agent | List agent's farmers |
| `/api/farmers/:id` | GET | Agent | View farmer detail |
| `/api/farmers/:id` | PUT | Agent | Edit farmer |
| `/api/farmers/:id` | DELETE | Agent | Delete farmer |
| `/api/farmers/me` | GET | Farmer | Get own profile |
| `/api/farmers/me` | PUT | Farmer | Update own profile |
| `/api/farmers/me/advisory` | GET | Farmer | Get advisory |

---

## **7. Security & Privacy**

- [ ] All endpoints require JWT authentication
- [ ] Agents can only access farmers they created
- [ ] Farmers can only access their own data
- [ ] Phone numbers are encrypted at rest
- [ ] GPS data is stored securely
- [ ] Implement rate limiting on auth endpoints

---

## **8. Success Criteria**

✅ Agent can register a farmer with GPS + photo  
✅ Agent sees only their own farmers in list  
✅ Farmer can log in and see their profile  
✅ Role-based UI rendering (correct screens per role)  
✅ App works offline and syncs online  
✅ All data is encrypted and role-protected  

---

## **Next Steps**

1. **Review & approve** this implementation plan
2. **Start Phase 1**: Set up Express auth endpoints
3. **Set up database**: Create PostgreSQL schema
4. **Build mobile auth**: Login screens + Zustand store
5. **Iterate through phases** with weekly demos


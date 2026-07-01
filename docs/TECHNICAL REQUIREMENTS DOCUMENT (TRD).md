# **TECHNICAL REQUIREMENTS DOCUMENT (TRD)**

## **Digital Agritech Platform – Limpopo, South Africa**

Project: AFAP Digital Agritech Platform & Value Chain Integration  
Client: African Fertilizer and Agribusiness Partnership (AFAP)  
Document Version: 1.0  
Date: \[Insert Date\]  
Status: Draft for Review

## **1\. Document Purpose**

This Technical Requirements Document (TRD) defines the system architecture, technology stack, data models, integration specifications, security framework, and non-functional requirements for the AFAP Digital Agritech Platform. It serves as the technical blueprint for development, guiding the implementation team and providing AFAP with transparency into the proposed solution.

## **2\. System Architecture Overview**

### **2.1 High-Level Architecture Diagram**

text

![](./TECHNICAL%20REQUIREMENTS%20DOCUMENT%20(TRD)_images/image-001.png)

### **2.2 Architecture Principles**

| Principle | Description |
| --- | --- |
| API-First | Every feature is exposed via a documented REST API, enabling third-party integration and future extension |
| --- | --- |
| Modular Design | Each of the 7 ToR scope areas is built as an independent service/ module, testable and deployable separately |
| --- | --- |
| Offline-First | Mobile app functions offline; data syncs when connectivity is restored |
| --- | --- |
| Lowest-Connectivity First | USSD and SMS are treated as first-class channels, not afterthoughts |
| --- | --- |
| Data Ownership by Design | AFAP retains full access, export, and deletion rights over all programme data (ToR §11) |
| --- | --- |
| Security Embedded | Encryption, RBAC, and audit logging are built in from day one |
| --- | --- |

## **3\. Technology Stack**

### **3.1 Complete Stack Table**

| Layer | Technology | Justification |
| --- | --- | --- |
| Frontend - Web (Admin) | Vite + React + TypeScript | Fast builds, lightweight, no SSR complexity needed for internal dashboard |
| --- | --- | --- |
| Frontend - Mobile (Farmers/Agents) | React Native + TypeScript | Offline-first, native GPS/camera, runs on low-end Android devices; one codebase for Android + iOS |
| --- | --- | --- |
| Backend API | Node.js + Express/Fastify + TypeScript | JavaScript full-stack consistency; excellent for REST APIs; large ecosystem |
| --- | --- | --- |
| API Style | RESTful (OpenAPI 3.0 spec) | Easier for third-party integrations (banks, telecoms, off-takers) |
| --- | --- | --- |
| Database | PostgreSQL (via Supabase) | Robust relational model; PostGIS for GPS data; Supabase handles auth, RLS, real-time |
| --- | --- | --- |
| Database Functions | PostgreSQL PL/pgSQL (via Supabase RPC) | Complex transactional logic (credit scoring, aggregation) runs close to data |
| --- | --- | --- |
| Edge Functions | Supabase Edge Functions (Deno) | For external API calls (payment, SMS) and webhook handling |
| --- | --- | --- |
| Real-Time | Supabase Realtime / WebSockets | Live dashboards, instant notifications |
| --- | --- | --- |
| Authentication | Supabase Auth (JWT) | Built-in; supports email, SMS, OTP, role-based access |
| --- | --- | --- |
| Object Storage | Supabase Storage (S3-compatible) | Farmer photos, soil tests, contracts, delivery receipts |
| --- | --- | --- |
| SMS/USSD Gateway | Africa's Talking / Clickatell / Vodacom API | Proven in African markets; simple REST integration |
| --- | --- | --- |
| Hosting | Cloud (AWS / Azure / Google) or Vercel + Supabase Cloud | Scalable, region-appropriate data residency |
| --- | --- | --- |
| CI/CD | GitHub Actions / GitLab CI | Automated testing and deployment |
| --- | --- | --- |
| Monitoring | Sentry / LogRocket / Prometheus | Error tracking and performance monitoring |
| --- | --- | --- |

## **4\. Detailed Module Specifications**

### **4.1 Platform Deployment & Customisation (ToR 4.1)**

| Requirement | Technical Specification |
| --- | --- |
| User Profiles | Role-based profiles: Farmer, CBA, Agrodeaaler, Input Supplier, Buyer, Financial Institution, AFAP Admin. Each role has tailored interface and permissions. |
| --- | --- |
| Access Channels | Web portal (admin dashboard); Android app (farmers, CBAs, agrodealers); USSD menu (feature phones); SMS (alerts, 2-way prompts) |
| --- | --- |
| API Gateway | Central REST gateway handling auth, rate-limiting, and routing to all backend services. Documented with Swagger/OpenAPI. |
| --- | --- |
| Third-Party Integration | API endpoints exposed for financial institutions, telecom aggregators, off-takers, and government systems |
| --- | --- |

### **4.2 Farmer Registration & Digital Identity (ToR 4.2)**

| Requirement | Technical Specification |
| --- | --- |
| Onboarding Flow | Self-service (web/app) and CBA-assisted (offline-capable). Data syncs to backend when connectivity is restored. |
| --- | --- |
| Digital Farmer ID | Unique UUID generated per farmer; linked to all subsequent activity (orders, credit, deliveries). |
| --- | --- |
| GPS Farm Mapping | Mobile app uses native GPS; Polygon/Point geometry stored in PostGIS. |
| --- | --- |
| Media Uploads | Soil test results, pest/disease photos, production records stored in Supabase Storage; metadata linked to farmer record. |
| --- | --- |
| Contract Management | Digital contracts stored as JSON; compliance tracking via status flags and timestamps. |
| --- | --- |

### 

### **4.3 Input Supply Chain & AI Advisory (ToR 4.3)**

| Requirement | Technical Specification |
| --- | --- |
| Digital Catalogue | Product catalogue with prices, stock levels, supplier details; searchable/filterable. |
| --- | --- |
| Demand Aggregation | Group orders from farmers in a locality; aggregated order sent to agrodealer. |
| --- | --- |
| Stock Management | Real-time stock levels; low-stock alerts. |
| --- | --- |
| Order Tracking | Status: Submitted → Confirmed → Fulfilled → Delivered → Received. Updates via SMS. |
| --- | --- |
| AI Advisory Engine | Phase 1: Rules-based (crop calendar, input dosing, weather alerts). Phase 2: ML model trained on programme data. |
| --- | --- |
| Recommendation Delivery | SMS push (feature phones), in-app push (smartphones), USSD menu. |
| --- | --- |
| Demo Plot Management | Track plot location, crop type, inputs used, yield data. |
| --- | --- |

### **4.4 Commodity Aggregation & Market Access (ToR 4.4)**

| Requirement | Technical Specification |
| --- | --- |
| Electronic Receipts | Auto-generated PDF receipt; stored in object storage; linked to farmer ID and delivery record. |
| --- | --- |
| Inventory Dashboard | Real-time visibility of aggregated volumes by location, crop, quality grade. |
| --- | --- |
| Digital Contracting | Contract lifecycle: Draft → Sent → Signed → Fulfilled. Electronic signatures supported. |
| --- | --- |
| Payment Processing | Integrated with mobile money and/or bank transfers; status tracking. |
| --- | --- |
| Market Linkage | Buyers can post purchase requests; farmers/aggregators can list available produce. Matching algorithm based on crop, volume, location, quality. |
| --- | --- |

### **4.5 Financial Services Integration (ToR 4.5)**

| Requirement | Technical Specification |
| --- | --- |
| Credit Workflow | Application → Scoring → Approval → Disbursement → Repayment Tracking. |
| --- | --- |
| Alternative Credit Scoring | ML model using platform data: production history, delivery consistency, repayment behaviour. Inputs: farm size, yield, crop type, order history. |
| --- | --- |
| Insurance Integration | API connection to insurance providers; farmer enrolment; claim tracking. |
| --- | --- |
| E-Vouchers | QR-code or alphanumeric vouchers for input subsidies; redemption tracking. |
| --- | --- |
| Financial Institution APIs | REST integration with partner banks/fintechs; authentication via API keys or OAuth. |
| --- | --- |

### **4.6 Monitoring, Evaluation & Traceability (ToR 4.6)**

| Requirement | Technical Specification |
| --- | --- |
| Real-Time Dashboards | Grafana/Metabase embedded; configurable by user role. Metrics: registrations, orders, deliveries, credit, sales. |
| --- | --- |
| Traceability Chain | Query from input delivery → farmer → production cycle → aggregation → final sale. Immutable audit trail. |
| --- | --- |
| Automated Reports | Scheduled PDF/Excel generation; email delivery to AFAP programme managers and donors. |
| --- | --- |
| Export | All data exportable via CSV, JSON, and API (per ToR §11). |
| --- | --- |

### **4.7 Capacity Building & Ecosystem Facilitation (ToR 4.7)**

| Requirement | Technical Specification |
| --- | --- |
| Training Portal | Video modules, downloadable guides, FAQ within platform. Versioned alongside software updates. |
| --- | --- |
| In-App Guidance | Tooltips, onboarding flows, contextual help. |
| --- | --- |
| Train-the-Trainer | CBAs trained to train farmers; usage analytics to identify high-performing CBAs. |
| --- | --- |
| Ongoing Support | Ticketing system; SLA (response/resolution times); scheduled maintenance and upgrades. |
| --- | --- |

## **5\. Data Model (Database Schema)**

### **5.1 Core Tables**

text

users

\- id: UUID (PK)

\- phone: VARCHAR(15) UNIQUE

\- email: VARCHAR(255) UNIQUE

\- role: ENUM('farmer', 'cba', 'agrodealer', 'buyer', 'financial\_institution', 'afap\_admin')

\- name: VARCHAR(255)

\- location: GEOGRAPHY(POINT) (PostGIS)

\- created\_at: TIMESTAMP

\- updated\_at: TIMESTAMP

farmers

\- id: UUID (PK, references users.id)

\- digital\_id: VARCHAR(50) UNIQUE

\- farm\_size: DECIMAL(10,2) (hectares)

\- primary\_crop: VARCHAR(100)

\- language\_preference: VARCHAR(10)

cbas

\- id: UUID (PK, references users.id)

\- agent\_code: VARCHAR(50) UNIQUE

\- assigned\_region: VARCHAR(255)

\- farmer\_count: INTEGER (denormalized)

agrodealers

\- id: UUID (PK, references users.id)

\- business\_name: VARCHAR(255)

\- registration\_number: VARCHAR(100)

\- stock\_management\_enabled: BOOLEAN

products

\- id: UUID (PK)

\- name: VARCHAR(255)

\- category: VARCHAR(100) (fertilizer, seed, pesticide, etc.)

\- unit: VARCHAR(20) (kg, L, bag, etc.)

\- price: DECIMAL(10,2)

\- supplier\_id: UUID (references agrodealers.id)

\- stock\_quantity: DECIMAL(10,2)

\- low\_stock\_threshold: DECIMAL(10,2)

orders

\- id: UUID (PK)

\- farmer\_id: UUID (references farmers.id)

\- agrodealer\_id: UUID (references agrodealers.id)

\- product\_id: UUID (references products.id)

\- quantity: DECIMAL(10,2)

\- total\_amount: DECIMAL(10,2)

\- status: ENUM('pending', 'confirmed', 'fulfilled', 'delivered', 'received', 'cancelled')

\- order\_date: TIMESTAMP

\- delivery\_date: TIMESTAMP

\- payment\_status: ENUM('pending', 'paid', 'failed')

deliveries

\- id: UUID (PK)

\- order\_id: UUID (references orders.id)

\- farmer\_id: UUID (references farmers.id)

\- quantity\_delivered: DECIMAL(10,2)

\- delivery\_date: TIMESTAMP

\- gps\_location: GEOGRAPHY(POINT)

\- receipt\_url: VARCHAR(512) (Supabase Storage path)

\- quality\_grade: VARCHAR(50)

credit\_applications

\- id: UUID (PK)

\- farmer\_id: UUID (references farmers.id)

\- amount\_requested: DECIMAL(10,2)

\- purpose: VARCHAR(255)

\- status: ENUM('pending', 'approved', 'rejected', 'disbursed', 'repaid')

\- credit\_score: INTEGER (0-100)

\- approval\_date: TIMESTAMP

\- disbursement\_date: TIMESTAMP

\- repayment\_due\_date: TIMESTAMP

\- repayment\_status: ENUM('on\_time', 'late', 'defaulted')

market\_listings

\- id: UUID (PK)

\- farmer\_id: UUID (references farmers.id)

\- crop\_type: VARCHAR(100)

\- quantity: DECIMAL(10,2)

\- quality\_grade: VARCHAR(50)

\- listing\_date: TIMESTAMP

\- status: ENUM('active', 'matched', 'expired', 'cancelled')

traceability\_records

\- id: UUID (PK)

\- input\_batch\_id: VARCHAR(100)

\- farmer\_id: UUID (references farmers.id)

\- product\_id: UUID (references products.id)

\- quantity\_applied: DECIMAL(10,2)

\- application\_date: TIMESTAMP

\- harvest\_id: UUID (references deliveries.id)

\- sale\_id: UUID (references market\_listings.id)

\- audit\_trail: JSONB (immutable history of all status changes)

audit\_logs

\- id: UUID (PK)

\- user\_id: UUID (references users.id)

\- action: VARCHAR(255)

\- resource\_type: VARCHAR(50)

\- resource\_id: UUID

\- changes: JSONB

\- ip\_address: VARCHAR(45)

\- timestamp: TIMESTAMP

### **5.2 Key Relationships (ERD Summary)**

text

users ────┬────────── farmers

├────────── cbas

├────────── agrodealers

└────────── financial\_institutions

agrodealers ──── products

products ──── orders

farmers ──── orders

orders ──── deliveries

farmers ──── credit\_applications

farmers ──── market\_listings

deliveries ──── traceability\_records

market\_listings ──── traceability\_records

users ──── audit\_logs

### **5.3 PostGIS Spatial Data**

The database uses PostGIS (PostgreSQL spatial extension) for:

| Use Case | Data Type | Example |
| --- | --- | --- |
| Farm boundaries | POLYGON | Geolocated field shape |
| --- | --- | --- |
| Farm centroid | POINT | GPS single coordinate |
| --- | --- | --- |
| Delivery location | POINT | Where produce was collected |
| --- | --- | --- |
| Agro-dealer location | POINT | Shop coordinates |
| --- | --- | --- |
| Region/zone | MULTIPOLYGON | Limpopo district boundaries |
| --- | --- | --- |

Example Query: Find all farmers within 10km of an agrodealer

sql

SELECT f.\*

FROM farmers f

JOIN agrodealers a ON a.id = ?

WHERE ST\_DWithin(f.location::geography, a.location::geography, 10000);

## **6\. USSD & SMS Integration Specification**

### **6.1 USSD Flow Architecture**

text

┌────────────┐ ┌─────────────────┐ ┌─────────────────┐

│ Farmer │ │ USSD Gateway │ │ Our Backend │

│ Dial │────▶│ (Africa's │────▶│ REST Endpoint │

│ \*123# │ │ Talking) │ │ /ussd/callback │

└────────────┘ └─────────────────┘ └─────────────────┘

▲ │ │

│ │ │

│ ▼ ▼

│ ┌─────────────────┐ ┌─────────────────┐

│ │ USSD Gateway │ │ Our Backend │

│ │ (Response) │◀───│ (JSON Menu │

└──────────────│ │ │ Response) │

└─────────────────┘ └─────────────────┘

### **6.2 SMS Flow Architecture**

text

┌────────────┐ ┌─────────────────┐ ┌─────────────────┐

│ Farmer │ │ SMS Gateway │ │ Our Backend │

│ Receives │◀────│ (Africa's │◀────│ POST /sms/send │

│ SMS │ │ Talking) │ │ │

└────────────┘ └─────────────────┘ └─────────────────┘

### **6.3 USSD Session Management**

| Requirement | Implementation |
| --- | --- |
| Session State | Managed server-side; state stored in Redis or Supabase ussd\_sessions table |
| --- | --- |
| Menu Structure | Hierarchical menus defined in JSON; each node maps to a code block |
| --- | --- |
| Input Handling | Validate user input (numeric choices, text responses) |
| --- | --- |
| Timeout | Session expires after 120s of inactivity |
| --- | --- |
| Language | Supports English + local languages based on user preference |
| --- | --- |

USSD Menu Example (Simplified):

text

1\. Register Farmer

2\. Check Credit Balance

3\. Order Inputs

4\. Sell Produce

5\. Receive Advisory

6\. Talk to Agent

0\. Exit

### **6.4 SMS Templates**

| Purpose | Template |
| --- | --- |
| Registration Confirmation | "Your AFAP Farmer ID is \[ID\]. Welcome! Dial \*123# to access services." |
| --- | --- |
| Order Confirmation | "Your order #\[order\_id\] of \[product\] has been confirmed. Delivery expected \[date\]." |
| --- | --- |
| Delivery Notification | "Your order #\[order\_id\] has been delivered. Collect at \[agrodealer\]." |
| --- | --- |
| Credit Approval | "Congratulations! Your credit application #\[credit\_id\] of \[amount\] has been approved." |
| --- | --- |
| Advisory Tip | "🌱 Climate-smart tip: Plant \[crop\] this week for best yields. More at \*123#." |
| --- | --- |
| Payment Reminder | "📅 Payment due on \[date\]. Amount: \[amount\]. Reply PAY to pay." |
| --- | --- |

## **7\. Security & Data Protection**

### **7.1 Compliance Requirements (ToR §11)**

| Requirement | Implementation |
| --- | --- |
| Data Ownership | AFAP retains full ownership; data export API + dashboard for manual export |
| --- | --- |
| Data Protection | POPIA (South Africa) compliance; GDPR principles applied |
| --- | --- |
| Encryption (In Transit) | TLS 1.3 for all endpoints |
| --- | --- |
| Encryption (At Rest) | PostgreSQL encryption; Supabase Storage encryption |
| --- | --- |
| Access Control | Row-Level Security (RLS) in PostgreSQL; role-based permissions |
| --- | --- |
| Audit Logging | Immutable audit logs (see schema above) |
| --- | --- |
| Backup | Automated daily backups; disaster recovery plan |
| --- | --- |
| Data Deletion | Right to erasure implemented via API/dashboard |
| --- | --- |

### **7.2 Authentication & Authorisation**

| Requirement | Implementation |
| --- | --- |
| Authentication | Supabase Auth (JWT); supports email/password, SMS OTP, magic links |
| --- | --- |
| Session Management | JWT with 7-day expiry; refresh token rotation |
| --- | --- |
| Role-Based Access Control | Defined permissions per role; enforced at API gateway and database RLS |
| --- | --- |
| API Key Management | For third-party (banks, telecoms): API keys with scoped permissions and rate limits |
| --- | --- |

### **7.3 Row-Level Security (RLS) Examples**

Farmer Table RLS:

sql

*\-- Farmer can read/write only their own record*

CREATE POLICY "Farmers can access own record" ON farmers

FOR ALL USING (auth.uid() = id);

*\-- CBA can read all farmers in their region*

CREATE POLICY "CBA can read assigned farmers" ON farmers

FOR SELECT USING (

EXISTS (

SELECT 1 FROM cbas

WHERE cbas.id = auth.uid()

AND cbas.assigned\_region = farmers.location::text

)

);

*\-- AFAP Admin can read all*

CREATE POLICY "AFAP Admin full access" ON farmers

FOR ALL USING (

EXISTS (

SELECT 1 FROM users

WHERE users.id = auth.uid()

AND users.role = 'afap\_admin'

)

);

## **8\. Non-Functional Requirements**

### **8.1 Performance**

| Metric | Target |
| --- | --- |
| API Response Time | < 500ms for 95th percentile |
| --- | --- |
| Mobile App Load Time | < 3 seconds (first load), < 1 second (subsequent) |
| --- | --- |
| USSD Response Time | < 2 seconds per interaction |
| --- | --- |
| Concurrent Users | Support 1,000+ concurrent sessions |
| --- | --- |
| Data Sync | Offline data syncs within 5 seconds of connectivity restoration |
| --- | --- |

### **8.2 Scalability**

| Requirement | Approach |
| --- | --- |
| Horizontal Scaling | Stateless Node.js API; can scale horizontally via load balancer |
| --- | --- |
| Database Scaling | PostgreSQL read replicas; connection pooling |
| --- | --- |
| Cloud Hosting | Auto-scaling based on load |
| --- | --- |

### **8.3 Availability**

| Metric | Target |
| --- | --- |
| Platform Uptime | 99.5% (excluding scheduled maintenance) |
| --- | --- |
| Scheduled Maintenance | < 4 hours/month; notified 7 days in advance |
| --- | --- |
| Disaster Recovery | RTO: 4 hours; RPO: 24 hours |
| --- | --- |

### **8.4 Usability**

| Requirement | Implementation |
| --- | --- |
| Offline-First | Mobile app fully functional offline; data syncs automatically when online |
| --- | --- |
| Low-Connectivity | Images compressed; text-only fallback |
| --- | --- |
| Accessibility | Font sizing options; high contrast mode; voice input (future phase) |
| --- | --- |
| Language | UI strings externalised; support for English, isiZulu, Sepedi, Xitsonga |
| --- | --- |

### **8.5 Maintainability**

| Requirement | Implementation |
| --- | --- |
| Code Quality | TypeScript throughout; ESLint + Prettier enforced |
| --- | --- |
| Testing | Unit tests (Jest), Integration tests (Supertest), E2E (Playwright/Cypress) |
| --- | --- |
| CI/CD | Automated linting, testing, build, and deployment on PR/merge |
| --- | --- |
| Documentation | API docs (Swagger), README, Developer onboarding guide |
| --- | --- |
| Monitoring | Error tracking (Sentry), Performance monitoring (Prometheus), Uptime monitoring |
| --- | --- |

## **9\. Integration Specifications**

### **9.1 SMS/USSD Gateway (Africa's Talking / Equivalent)**

| Requirement | Specification |
| --- | --- |
| SMS Sending | POST /sms/send → Gateway API → Farmer receives SMS |
| --- | --- |
| SMS Receiving | Gateway POST to our /sms/incoming endpoint → Process reply |
| --- | --- |
| USSD Callback | Gateway POST to our /ussd/callback → Return JSON menu response |
| --- | --- |
| Authentication | API Key + IP whitelisting |
| --- | --- |

### 

### **9.2 Financial Institution APIs**

| Requirement | Specification |
| --- | --- |
| Credit Check | POST /farmer/credit-check → FI API → Return credit score |
| --- | --- |
| Loan Disbursement | POST /loan/disburse → FI API → Trigger transfer |
| --- | --- |
| Repayment Tracking | FI API POST to our /payment/callback → Update repayment status |
| --- | --- |
| Authentication | OAuth2 (client credentials) or API Key |
| --- | --- |

### **9.3 Off-taker / Buyer APIs**

| Requirement | Specification |
| --- | --- |
| Inventory Query | GET /inventory?crop=maize&location=Limpopo → Return available stock |
| --- | --- |
| Purchase Order | POST /purchase-order → Create contract; trigger delivery |
| --- | --- |
| Payment Confirmation | POST /payment/confirm → Update market\_listings status |
| --- | --- |

### **9.4 Government / Donor MEAL Systems**

| Requirement | Specification |
| --- | --- |
| Data Export | Scheduled CSV/JSON export delivered via SFTP/Email/API |
| --- | --- |
| API Access | Read-only API access for authorised government/donor users |
| --- | --- |
| Reporting | Custom report templates generated on demand |
| --- | --- |

## **10\. Development Phases & Milestones**

| Phase | Timeline | Technical Milestone |
| --- | --- | --- |
| Phase 1: Mobilisation | Months 1–3 | Environment setup; CI/CD pipeline; Core database schema; Basic auth; Farmer registration API; USSD/SMS gateway integration |
| --- | --- | --- |
| Phase 2: Pilot | Months 4–9 | Mobile app (Registration + Input ordering); Rules-based advisory; Admin dashboard (basic); Pilot deployment; User feedback iteration |
| --- | --- | --- |
| Phase 3: Scale-Up | Months 10–18 | Full modules (Aggregation, Financial, Traceability); ML model training; Third-party integrations (FIs, off-takers); Full user training |
| --- | --- | --- |
| Phase 4: Optimisation | Months 19–24 | Performance tuning; ML model refinement; Feature enhancements; Mid-term security audit |
| --- | --- | --- |
| Phase 5: Maintenance & Support | Months 25–36 | SLA-based support; Scheduled upgrades; Ongoing training; Transition planning |
| --- | --- | --- |

## 

## **11\. Technical Risks & Mitigations**

| Risk | Impact | Likelihood | Mitigation |
| --- | --- | --- | --- |
| Poor network coverage in Limpopo | High | High | Offline-first mobile app; USSD/SMS fallback for feature phones |
| --- | --- | --- | --- |
| Low farmer adoption | High | High | Train-the-trainer model; USSD/SMS for low-literacy users; Incentive programs |
| --- | --- | --- | --- |
| Third-party API integration delays | Medium | Medium | Early engagement with FIs/telecoms; Parallel development; Mock APIs for testing |
| --- | --- | --- | --- |
| Data security breach | High | Low | Encryption; RLS; Audit logging; Regular security audits; POPIA compliance |
| --- | --- | --- | --- |
| Platform performance degradation | Medium | Medium | Load testing; Horizontal scaling; Monitoring alerting |
| --- | --- | --- | --- |
| Hardware constraints (team machines) | Medium | Medium | React Native + VS Code (low resource); Lightweight emulators; Physical device testing |
| --- | --- | --- | --- |

## 

## **12\. Next Steps**

| Action | Owner | Deadline |
| --- | --- | --- |
| Director review | GT Thosago | \[Date\] |
| --- | --- | --- |
| Teammate review & sign-off | Kabelo / Khothatso | \[Date\] |
| --- | --- | --- |
| Update PRD based on TRD alignment | Kabelo | \[Date\] |
| --- | --- | --- |
| Proceed to Implementation Plan | Team | \[Date\] |
| --- | --- | --- |

## **13\. Appendix**

### **A. Supabase RPC Function Examples**

Credit Score Calculation Function:

sql

create or replace function calculate\_credit\_score(farmer\_id int)

returns integer as $$

declare

order\_count int;

delivery\_count int;

repayment\_count int;

score integer;

begin

select count(\*) into order\_count from orders where farmer\_id = $1 and status = 'delivered';

select count(\*) into delivery\_count from deliveries where farmer\_id = $1;

select count(\*) into repayment\_count from credit\_applications where farmer\_id = $1 and status = 'repaid';

*\-- Simple scoring logic (refined during optimisation phase)*

score := (order\_count \* 2) + (delivery\_count \* 3) + (repayment\_count \* 5);

return least(score, 100);

end;

$$ language plpgsql;

Call from frontend:

javascript

const { data, error } = await supabase

.rpc('calculate\_credit\_score', { farmer\_id: 123 })

### **B. Offline Sync Strategy (React Native)**

| Data Type | Sync Strategy |
| --- | --- |
| Farmer Profile | Priority sync; syncs immediately on connectivity |
| --- | --- |
| Orders | Queued; syncs in batches |
| --- | --- |
| Photos/Documents | Background upload; compressed before upload |
| --- | --- |
| Advisory Data | Pre-cached on app install; updated daily when connected |
| --- | --- |
| USSD Session Data | Not stored offline (USSD is session-based) |
| --- | --- |

Document Version History:

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | \[Date\] | Kabelo | Initial draft |
| --- | --- | --- | --- |
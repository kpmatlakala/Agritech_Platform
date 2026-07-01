# **BACKEND API DESIGN & ARCHITECTURE PLAN**

## **Digital Agritech Platform – Limpopo, South Africa**

Project: AFAP Digital Agritech Platform & Value Chain Integration  
Client: African Fertilizer and Agribusiness Partnership (AFAP)  
Document Version: 1.0  
Date: \[Insert Date\]  
Status: Draft for Review

## **1\. Executive Summary**

This document defines the backend architecture, API design principles, and complete API endpoint specifications for the AFAP Digital Agritech Platform. It covers:

-   Backend Service Architecture: How services are structured and communicate
-   API Design Principles: RESTful patterns, versioning, error handling
-   Complete API Reference: All endpoints grouped by functional module
-   Authentication & Authorization: JWT flows, API keys, role-based access
-   Internal Service Communication: How services talk to each other
-   API Management: Rate limiting, monitoring, documentation

The API design follows RESTful principles with OpenAPI 3.0 specifications, making it easy for third-party partners (financial institutions, telecoms, off-takers) to integrate.

## **2\. Backend Architecture Overview**

### **2.1 High-Level Architecture**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ PRESENTATION LAYER │

├───────────────┬───────────────┬───────────────┬───────────────────────────┤

│ Web Portal │ Mobile App │ USSD │ SMS │

│ (Admin) │ (Farmers/ │ (Feature │ (Alerts, │

│ Vite+React │ Agents) │ Phones) │ Confirmations) │

└───────┬───────┴───────┬───────┴───────┬───────┴───────────┬───────────────┘

│ │ │ │

└───────────────┴───────────────┴───────────────────┘

│

┌───────────────────────────────────▼───────────────────────────────────────┐

│ API GATEWAY LAYER │

│ │

│ ┌───────────────────────────────────────────────────────────────────┐ │

│ │ Express/Fastify Application Server │ │

│ │ │ │

│ │ • Authentication (JWT, API Keys) │ │

│ │ • Rate Limiting │ │

│ │ • Request Validation │ │

│ │ • Logging & Monitoring │ │

│ │ • Error Handling │ │

│ │ • CORS │ │

│ └───────────────────────────────────────────────────────────────────┘ │

└───────────────────────────────────┬───────────────────────────────────────┘

│

┌───────────────────────────────────▼───────────────────────────────────────┐

│ SERVICE LAYER │

│ │

│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│

│ │ Auth │ │ Farmer │ │ Input │ │ Financial ││

│ │ Service │ │ Service │ │ Service │ │ Service ││

│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘│

│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│

│ │ Market │ │ Advisory │ │ Trace- │ │ M&E / Reporting ││

│ │ Service │ │ Service │ │ ability │ │ Service ││

│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘│

└───────────────────────────────────┬───────────────────────────────────────┘

│

┌───────────────────────────────────▼───────────────────────────────────────┐

│ INTEGRATION LAYER │

│ │

│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│

│ │ USSD/SMS │ │ Financial │ │ Off-taker │ │ Payment Gateway ││

│ │ Gateway │ │ Institution│ │ APIs │ │ APIs ││

│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘│

└───────────────────────────────────┬───────────────────────────────────────┘

│

┌───────────────────────────────────▼───────────────────────────────────────┐

│ DATA LAYER │

│ │

│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│

│ │ PostgreSQL │ │ Supabase │ │ Object │ │ Cache (Redis) ││

│ │ (Supabase) │ │ Realtime │ │ Storage │ │ (Sessions, etc.) ││

│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘│

└─────────────────────────────────────────────────────────────────────────────┘

### **2.2 Service Descriptions**

| Service | Responsibility | Primary Operations |
| --- | --- | --- |
| Auth Service | User authentication & authorisation | Login, registration, OTP, role management |
| --- | --- | --- |
| Farmer Service | Farmer registration & profile management | Create, read, update farmer profiles; digital IDs |
| --- | --- | --- |
| Input Service | Input catalogue & ordering | Product management; order creation; fulfilment |
| --- | --- | --- |
| Financial Service | Credit & financial operations | Credit scoring; applications; disbursements |
| --- | --- | --- |
| Market Service | Commodity listing & matching | Listing produce; buyer matching; contracts |
| --- | --- | --- |
| Advisory Service | AI-driven recommendations | Rules-based/ML advice; alerts; crop calendar |
| --- | --- | --- |
| Traceability Service | End-to-end tracking | Input → Production → Harvest → Sale |
| --- | --- | --- |
| M&E Service | Monitoring & reporting | Dashboards; reports; data exports |
| --- | --- | --- |

### **2.3 Technology Stack (Backend)**

| Layer | Technology | Purpose |
| --- | --- | --- |
| API Framework | Node.js + Express / Fastify | REST API server |
| --- | --- | --- |
| Language | TypeScript | Type safety, maintainability |
| --- | --- | --- |
| Database | PostgreSQL (Supabase) | Primary data store |
| --- | --- | --- |
| Spatial Data | PostGIS | GPS farm mapping |
| --- | --- | --- |
| Authentication | Supabase Auth | JWT, OTP, role-based access |
| --- | --- | --- |
| Real-Time | Supabase Realtime | Live dashboards, notifications |
| --- | --- | --- |
| Object Storage | Supabase Storage | Farmer photos, documents |
| --- | --- | --- |
| Cache | Redis / Supabase | Session storage, rate limiting |
| --- | --- | --- |
| Background Jobs | Bull / Agenda | Queues, scheduled tasks |
| --- | --- | --- |

## 

## 

## **3\. API Design Principles**

### **3.1 RESTful Standards**

| Principle | Implementation |
| --- | --- |
| Resource-Based URLs | /api/v1/farmers, /api/v1/orders, /api/v1/credit |
| --- | --- |
| HTTP Methods | GET (read), POST (create), PUT/PATCH (update), DELETE (remove) |
| --- | --- |
| Status Codes | 2xx (success), 4xx (client error), 5xx (server error) |
| --- | --- |
| JSON Payloads | All requests and responses in JSON |
| --- | --- |
| Pagination | ?page=1&limit=20 for list endpoints |
| --- | --- |
| Filtering | ?status=pending&region=Limpopo |
| --- | --- |
| Sorting | ?sort=created\_at&order=desc |
| --- | --- |

### **3.2 API Versioning**

| Strategy | Implementation |
| --- | --- |
| URL Versioning | /api/v1/..., /api/v2/... |
| --- | --- |
| Backward Compatibility | Support at least 2 versions |
| --- | --- |
| Deprecation Policy | 6 months notice before removing version |
| --- | --- |

### **3.3 Common Response Format**

Success Response:

json

{

"success": true,

"data": { ... },

"message": "Operation successful",

"timestamp": "2026-06-29T10:30:00Z"

}

Error Response:

json

{

"success": false,

"error": {

"code": "VALIDATION\_ERROR",

"message": "Invalid field: phone number",

"details": {

"field": "phone",

"reason": "Must be a valid South African phone number"

}

},

"timestamp": "2026-06-29T10:30:00Z"

}

### **3.4 HTTP Status Codes**

| Code | Description | Use Case |
| --- | --- | --- |
| 200 | OK | Successful GET, PUT, DELETE |
| --- | --- | --- |
| 201 | Created | Successful POST (new resource) |
| --- | --- | --- |
| 204 | No Content | Successful DELETE (no body) |
| --- | --- | --- |
| 400 | Bad Request | Invalid input / validation error |
| --- | --- | --- |
| 401 | Unauthorised | Missing/invalid authentication |
| --- | --- | --- |
| 403 | Forbidden | Authenticated but not authorised |
| --- | --- | --- |
| 404 | Not Found | Resource not found |
| --- | --- | --- |
| 409 | Conflict | Duplicate / resource already exists |
| --- | --- | --- |
| 422 | Unprocessable Entity | Business logic error |
| --- | --- | --- |
| 429 | Too Many Requests | Rate limit exceeded |
| --- | --- | --- |
| 500 | Internal Server Error | Unexpected server error |
| --- | --- | --- |
| 503 | Service Unavailable | Maintenance / down |
| --- | --- | --- |

## **4\. API Endpoint Reference**

### **4.1 Authentication API (/api/v1/auth)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /auth/register | POST | Register new user | No |
| --- | --- | --- | --- |
| /auth/login | POST | Login with phone/email + password | No |
| --- | --- | --- | --- |
| /auth/login/otp | POST | Request OTP for login | No |
| --- | --- | --- | --- |
| /auth/verify-otp | POST | Verify OTP and get token | No |
| --- | --- | --- | --- |
| /auth/refresh | POST | Refresh JWT token | Yes |
| --- | --- | --- | --- |
| /auth/logout | POST | Logout user | Yes |
| --- | --- | --- | --- |
| /auth/forgot-password | POST | Request password reset | No |
| --- | --- | --- | --- |
| /auth/reset-password | POST | Reset password with token | No |
| --- | --- | --- | --- |
| /auth/me | GET | Get current user profile | Yes |
| --- | --- | --- | --- |
| /auth/users | GET | List users (admin only) | Yes (Admin) |
| --- | --- | --- | --- |
| /auth/users/{id} | GET | Get user by ID | Yes (Admin) |
| --- | --- | --- | --- |
| /auth/users/{id}/role | PUT | Update user role | Yes (Admin) |
| --- | --- | --- | --- |

Register Request:

json

POST /api/v1/auth/register

{

"phone": "+27831234567",

"name": "Thabo Molefe",

"role": "farmer", *// farmer, cba, agrodealer, afap\_admin*

"password": "SecurePass123",

"village": "Mamelodi",

"language": "Sepedi"

}

Register Response:

json

{

"success": true,

"data": {

"user": {

"id": "uuid",

"phone": "+27831234567",

"name": "Thabo Molefe",

"role": "farmer",

"status": "pending" *// pending, active, suspended*

},

"message": "OTP sent to your phone. Please verify."

}

}

Login Request:

json

POST /api/v1/auth/login

{

"phone": "+27831234567",

"password": "SecurePass123"

}

Login Response:

json

{

"success": true,

"data": {

"access\_token": "jwt\_token\_here",

"refresh\_token": "refresh\_token\_here",

"expires\_in": 604800,

"user": {

"id": "uuid",

"name": "Thabo Molefe",

"role": "farmer"

}

}

}

### **4.2 Farmer API (/api/v1/farmers)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /farmers | POST | Register a new farmer | CBA, Admin |
| --- | --- | --- | --- |
| /farmers | GET | List farmers (filterable) | Admin, CBA, FI |
| --- | --- | --- | --- |
| /farmers/{id} | GET | Get farmer profile | Yes |
| --- | --- | --- | --- |
| /farmers/{id} | PUT | Update farmer profile | Farmer (self), CBA, Admin |
| --- | --- | --- | --- |
| /farmers/{id} | DELETE | Delete farmer (admin only) | Admin |
| --- | --- | --- | --- |
| /farmers/{id}/gps | PUT | Update farm GPS location | Farmer, CBA |
| --- | --- | --- | --- |
| /farmers/{id}/documents | POST | Upload farmer documents | Farmer, CBA |
| --- | --- | --- | --- |
| /farmers/{id}/documents | GET | Get farmer documents | Farmer, CBA, Admin |
| --- | --- | --- | --- |
| /farmers/{id}/orders | GET | Get farmer's order history | Farmer, CBA, Admin |
| --- | --- | --- | --- |
| /farmers/{id}/credit | GET | Get farmer's credit status | Farmer, CBA, Admin |
| --- | --- | --- | --- |
| /farmers/{id}/scores | GET | Get farmer's credit score | FI, Admin |
| --- | --- | --- | --- |
| /farmers/export | GET | Export farmers (admin only) | Admin |
| --- | --- | --- | --- |
| /farmers/bulk | POST | Bulk register farmers (CBA) | CBA |
| --- | --- | --- | --- |

Register Farmer Request:

json

POST /api/v1/farmers

{

"phone": "+27831234567",

"name": "Thabo Molefe",

"village": "Mamelodi",

"district": "Tshwane",

"farm\_size": 2.5,

"primary\_crop": "maize",

"gps\_location": {

"latitude": -25.7461,

"longitude": 28.1881

},

"language": "Sepedi",

"cba\_id": "uuid\_of\_cba"

}

Register Farmer Response:

json

{

"success": true,

"data": {

"farmer": {

"id": "uuid",

"digital\_id": "AFAP-MAM-00123",

"name": "Thabo Molefe",

"phone": "+27831234567",

"village": "Mamelodi",

"farm\_size": 2.5,

"primary\_crop": "maize",

"status": "active",

"created\_at": "2026-06-29T10:30:00Z"

},

"qr\_code": "data:image/png;base64,..."

}

}

List Farmers Request:

text

GET /api/v1/farmers?page=1&limit=20&status=active&district=Tshwane&primary\_crop=maize

List Farmers Response:

json

{

"success": true,

"data": {

"farmers": \[

{

"id": "uuid",

"digital\_id": "AFAP-MAM-00123",

"name": "Thabo Molefe",

"village": "Mamelodi",

"primary\_crop": "maize",

"orders\_count": 5,

"credit\_score": 72

}

\],

"pagination": {

"page": 1,

"limit": 20,

"total": 150,

"pages": 8

}

}

}

### **4.3 Input & Order API (/api/v1/inputs / /api/v1/orders)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| Products |  |  |  |
| --- | --- | --- | --- |
| /products | GET | List input products | All |
| --- | --- | --- | --- |
| /products/{id} | GET | Get product details | All |
| --- | --- | --- | --- |
| /products | POST | Add new product | Agrodealer, Admin |
| --- | --- | --- | --- |
| /products/{id} | PUT | Update product | Agrodealer, Admin |
| --- | --- | --- | --- |
| /products/{id} | DELETE | Delete product | Agrodealer, Admin |
| --- | --- | --- | --- |
| /products/categories | GET | Get product categories | All |
| --- | --- | --- | --- |
| Orders |  |  |  |
| --- | --- | --- | --- |
| /orders | POST | Create order | Farmer, CBA |
| --- | --- | --- | --- |
| /orders | GET | List orders (filterable) | All (filtered by role) |
| --- | --- | --- | --- |
| /orders/{id} | GET | Get order details | All (if authorised) |
| --- | --- | --- | --- |
| /orders/{id} | PUT | Update order | Farmer, CBA, Agrodealer |
| --- | --- | --- | --- |
| /orders/{id}/status | PUT | Update order status | Agrodealer, Admin |
| --- | --- | --- | --- |
| /orders/{id}/cancel | POST | Cancel order | Farmer, CBA |
| --- | --- | --- | --- |
| /orders/{id}/deliver | POST | Confirm delivery | Agrodealer, CBA |
| --- | --- | --- | --- |
| /orders/aggregate | GET | Get demand aggregation | Agrodealer, Admin |
| --- | --- | --- | --- |
| /orders/bulk | POST | Bulk create orders | CBA |
| --- | --- | --- | --- |

Create Order Request:

json

POST /api/v1/orders

{

"farmer\_id": "uuid",

"items": \[

{

"product\_id": "uuid",

"quantity": 2,

"unit": "bags"

}

\],

"delivery\_location": {

"latitude": -25.7461,

"longitude": 28.1881

},

"delivery\_date": "2026-07-15",

"payment\_method": "credit" *// credit, cash, mobile\_money*

}

Create Order Response:

json

{

"success": true,

"data": {

"order": {

"id": "uuid",

"order\_number": "ORD-20260629-00123",

"farmer\_id": "uuid",

"items": \[...\],

"total\_amount": 1250.00,

"status": "pending", *// pending, confirmed, fulfilled, delivered, received, cancelled*

"created\_at": "2026-06-29T10:30:00Z"

},

"sms\_sent": true

}

}

Update Order Status Request:

json

PUT /api/v1/orders/{id}/status

{

"status": "confirmed", *// pending, confirmed, fulfilled, delivered, received, cancelled*

"note": "Order confirmed by agrodealer"

}

### **4.4 Financial / Credit API (/api/v1/credit)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /credit/apply | POST | Apply for credit | Farmer, CBA |
| --- | --- | --- | --- |
| /credit/applications | GET | List credit applications | FI, Admin, CBA |
| --- | --- | --- | --- |
| /credit/applications/{id} | GET | Get application details | FI, Admin, Farmer |
| --- | --- | --- | --- |
| /credit/applications/{id}/status | PUT | Update application status | FI, Admin |
| --- | --- | --- | --- |
| /credit/applications/{id}/score | GET | Get credit score | FI, Admin |
| --- | --- | --- | --- |
| /credit/loans | GET | List farmer loans | Farmer, CBA, FI, Admin |
| --- | --- | --- | --- |
| /credit/loans/{id} | GET | Get loan details | Farmer, FI, Admin |
| --- | --- | --- | --- |
| /credit/loans/{id}/repay | POST | Process repayment | Farmer, FI |
| --- | --- | --- | --- |
| /credit/loans/{id}/status | PUT | Update loan status | FI, Admin |
| --- | --- | --- | --- |
| /credit/score | GET | Get current credit score | Farmer |
| --- | --- | --- | --- |
| /credit/score/calculate | POST | Calculate credit score | FI, Admin |
| --- | --- | --- | --- |

Apply for Credit Request:

json

POST /api/v1/credit/apply

{

"farmer\_id": "uuid",

"amount": 5000.00,

"purpose": "fertilizer",

"repayment\_period": 6, *// months*

"crop\_type": "maize",

"farm\_size": 2.5,

"expected\_yield": 10, *// tons*

"supporting\_documents": \[

"storage://path/to/document1",

"storage://path/to/document2"

\]

}

Apply for Credit Response:

json

{

"success": true,

"data": {

"application": {

"id": "uuid",

"farmer\_id": "uuid",

"amount": 5000.00,

"purpose": "fertilizer",

"status": "pending", *// pending, under\_review, approved, rejected, disbursed, repaid*

"credit\_score": 72,

"created\_at": "2026-06-29T10:30:00Z"

},

"estimated\_approval": "2026-07-01T10:30:00Z"

}

}

Update Application Status Request:

json

PUT /api/v1/credit/applications/{id}/status

{

"status": "approved",

"note": "Credit approved - farmer qualifies",

"approved\_amount": 5000.00,

"interest\_rate": 12.5,

"repayment\_schedule": \[

{ "date": "2026-07-01", "amount": 500.00 }

\]

}

### **4.5 Market API (/api/v1/market)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /market/listings | POST | Create produce listing | Farmer, CBA |
| --- | --- | --- | --- |
| /market/listings | GET | List all listings | All |
| --- | --- | --- | --- |
| /market/listings/{id} | GET | Get listing details | All |
| --- | --- | --- | --- |
| /market/listings/{id} | PUT | Update listing | Farmer, CBA |
| --- | --- | --- | --- |
| /market/listings/{id} | DELETE | Delete listing | Farmer, CBA |
| --- | --- | --- | --- |
| /market/listings/{id}/match | POST | Match with buyer | Buyer, Admin |
| --- | --- | --- | --- |
| /market/offers | POST | Create purchase offer | Buyer |
| --- | --- | --- | --- |
| /market/offers | GET | List offers | Buyer, Farmer, Admin |
| --- | --- | --- | --- |
| /market/offers/{id} | GET | Get offer details | All |
| --- | --- | --- | --- |
| /market/offers/{id}/accept | POST | Accept offer | Farmer, CBA |
| --- | --- | --- | --- |
| /market/offers/{id}/decline | POST | Decline offer | Farmer, CBA |
| --- | --- | --- | --- |
| /market/contracts | GET | List contracts | All |
| --- | --- | --- | --- |
| /market/contracts/{id} | GET | Get contract details | All |
| --- | --- | --- | --- |
| /market/contracts/{id}/status | PUT | Update contract status | Buyer, Farmer, Admin |
| --- | --- | --- | --- |

Create Listing Request:

json

POST /api/v1/market/listings

{

"farmer\_id": "uuid",

"crop\_type": "maize",

"quantity": 10.0, *// tons*

"unit": "tons",

"quality\_grade": "A",

"expected\_price\_per\_unit": 4500.00,

"harvest\_date": "2026-07-01",

"collection\_location": {

"latitude": -25.7461,

"longitude": 28.1881

},

"delivery\_available": true

}

Create Listing Response:

json

{

"success": true,

"data": {

"listing": {

"id": "uuid",

"listing\_number": "LST-20260629-00123",

"farmer\_id": "uuid",

"crop\_type": "maize",

"quantity": 10.0,

"status": "active", *// active, matched, expired, cancelled*

"created\_at": "2026-06-29T10:30:00Z"

}

}

}

Create Offer Request:

json

POST /api/v1/market/offers

{

"listing\_id": "uuid",

"buyer\_id": "uuid",

"quantity": 5.0, *// tons*

"price\_per\_unit": 4300.00,

"delivery\_date": "2026-07-15",

"delivery\_location": {

"latitude": -25.7461,

"longitude": 28.1881

}

}

### **4.6 Advisory API (/api/v1/advisory)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /advisory/tips | GET | Get advisory tips | All |
| --- | --- | --- | --- |
| /advisory/tips/{id} | GET | Get tip details | All |
| --- | --- | --- | --- |
| /advisory/tips/weather | GET | Get weather advisory | All |
| --- | --- | --- | --- |
| /advisory/tips/pests | GET | Get pest/disease alerts | All |
| --- | --- | --- | --- |
| /advisory/crop-calendar | GET | Get crop calendar | All |
| --- | --- | --- | --- |
| /advisory/personalised | POST | Get personalised advice | Farmer |
| --- | --- | --- | --- |
| /advisory/alerts | POST | Send alert to farmers | CBA, Admin |
| --- | --- | --- | --- |
| /advisory/alerts | GET | List alerts | All |
| --- | --- | --- | --- |
| /advisory/demo-plots | POST | Create demo plot record | CBA, Admin |
| --- | --- | --- | --- |
| /advisory/demo-plots | GET | List demo plots | All |
| --- | --- | --- | --- |
| /advisory/demo-plots/{id} | GET | Get demo plot details | All |
| --- | --- | --- | --- |

Get Personalised Advice Request:

json

POST /api/v1/advisory/personalised

{

"farmer\_id": "uuid",

"crop\_type": "maize",

"farm\_location": {

"latitude": -25.7461,

"longitude": 28.1881

},

"current\_stage": "planting"

}

Get Personalised Advice Response:

json

{

"success": true,

"data": {

"advice": {

"recommendations": \[

{

"category": "planting",

"title": "Plant maize now",

"description": "Optimal planting window for your location is 1-15 July",

"source": "climatic\_data"

}

\],

"alerts": \[

{

"type": "weather",

"message": "Heavy rain expected next week. Delay planting until after rain.",

"severity": "high"

}

\]

}

}

}

### **4.7 Traceability API (/api/v1/traceability)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /traceability/input/{batch\_id} | GET | Track input batch | Admin, FI, Buyer |
| --- | --- | --- | --- |
| /traceability/farmer/{farmer\_id} | GET | Track farmer activity | Farmer, CBA, Admin |
| --- | --- | --- | --- |
| /traceability/order/{order\_id} | GET | Track order | Farmer, Agrodealer, Admin |
| --- | --- | --- | --- |
| /traceability/listing/{listing\_id} | GET | Track listing | Farmer, Buyer, Admin |
| --- | --- | --- | --- |
| /traceability/contract/{contract\_id} | GET | Track contract | Buyer, Farmer, Admin |
| --- | --- | --- | --- |
| /traceability/audit | GET | Get audit logs | Admin |
| --- | --- | --- | --- |

Traceability Response:

json

{

"success": true,

"data": {

"chain": \[

{

"stage": "input",

"date": "2026-06-01",

"description": "Fertiliser delivered to agrodealer",

"data": { "batch": "F-2026-001", "supplier": "AgroFeed SA" }

},

{

"stage": "farmer",

"date": "2026-06-15",

"description": "Farmer applied fertiliser to 2.5 ha",

"data": { "farmer": "Thabo Molefe", "area": 2.5 }

},

{

"stage": "harvest",

"date": "2026-07-15",

"description": "Farmer harvested 10 tons maize",

"data": { "yield": 10, "quality": "A" }

},

{

"stage": "sale",

"date": "2026-07-20",

"description": "Sold to ABC Buyers",

"data": { "buyer": "ABC Buyers", "amount": 45000 }

}

\]

}

}

### **4.8 M&E / Reporting API (/api/v1/reports)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /reports/dashboard | GET | Get dashboard metrics | Admin, Manager |
| --- | --- | --- | --- |
| /reports/farmers | GET | Get farmer statistics | Admin, Manager |
| --- | --- | --- | --- |
| /reports/orders | GET | Get order statistics | Admin, Manager |
| --- | --- | --- | --- |
| /reports/credit | GET | Get credit portfolio | Admin, FI, Manager |
| --- | --- | --- | --- |
| /reports/market | GET | Get market statistics | Admin, Manager |
| --- | --- | --- | --- |
| /reports/export | GET | Export report (CSV/PDF/Excel) | Admin |
| --- | --- | --- | --- |
| /reports/scheduled | POST | Schedule periodic report | Admin |
| --- | --- | --- | --- |

Dashboard Metrics Response:

json

{

"success": true,

"data": {

"metrics": {

"total\_farmers": 15234,

"active\_farmers\_last\_month": 10982,

"total\_orders": 8723,

"total\_credit\_approved": 1250000.00,

"total\_sales\_volume": 4532, *// tons*

"platform\_uptime": 99.8

},

"trends": {

"registrations\_last\_30\_days": 423,

"order\_volume\_last\_30\_days": 245,

"credit\_applications\_last\_30\_days": 89

},

"charts": {

"registrations\_over\_time": \[...\],

"orders\_by\_region": \[...\],

"credit\_by\_crop": \[...\]

}

}

}

Export Report Request:

text

GET /api/v1/reports/export?type=farmers&format=csv&date\_from=2026-01-01&date\_to=2026-06-30

Export Report Response:

json

{

"success": true,

"data": {

"download\_url": "https://storage.afap-platform.com/reports/farmers-2026-06-29.csv",

"expires\_at": "2026-06-30T10:30:00Z"

}

}

### **4.9 Admin / System API (/api/v1/admin)**

| Endpoint | Method | Description | Auth Required |
| --- | --- | --- | --- |
| /admin/users | GET | List all users | Admin |
| --- | --- | --- | --- |
| /admin/users/{id}/status | PUT | Update user status | Admin |
| --- | --- | --- | --- |
| /admin/users/{id}/role | PUT | Update user role | Admin |
| --- | --- | --- | --- |
| /admin/settings | GET | Get system settings | Admin |
| --- | --- | --- | --- |
| /admin/settings | PUT | Update system settings | Admin |
| --- | --- | --- | --- |
| /admin/audit | GET | Get audit logs | Admin |
| --- | --- | --- | --- |
| /admin/health | GET | System health check | Admin |
| --- | --- | --- | --- |
| /admin/backup | POST | Trigger system backup | Admin |
| --- | --- | --- | --- |
| /admin/monitoring | GET | System performance metrics | Admin |
| --- | --- | --- | --- |

## **5\. Authentication & Authorisation**

### **5.1 Authentication Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ AUTHENTICATION FLOW │

│ │

│ Step 1: User registers (phone + password) │

│ OR User requests OTP via phone │

│ │

│ Step 2: System sends OTP via SMS (if OTP flow) │

│ OR User enters password (if password flow) │

│ │

│ Step 3: User submits OTP or password │

│ │

│ Step 4: System validates credentials │

│ │

│ Step 5: System returns JWT access\_token + refresh\_token │

│ │

│ Step 6: User includes access\_token in Authorization header │

│ \`Authorization: Bearer <token>\` │

│ │

│ Step 7: System validates token on every request │

│ - Check signature │

│ - Check expiry │

│ - Check user role/perms │

│ - Apply RLS policies (database) │

└─────────────────────────────────────────────────────────────────────────────┘

### **5.2 JWT Structure**

json

{

"header": {

"alg": "HS256",

"typ": "JWT"

},

"payload": {

"sub": "user\_uuid",

"phone": "+27831234567",

"role": "farmer",

"iat": 1719658800,

"exp": 1720263600,

"iss": "afap-platform"

}

}

### **5.3 Role-Based Access Control (RBAC)**

| Role | Permissions |
| --- | --- |
| farmer | Read/write own profile, orders, credit, listings |
| --- | --- |
| cba | Create/read/write farmers in cluster, orders, listings |
| --- | --- |
| agrodealer | Read/write inventory, orders, deliveries |
| --- | --- |
| financial\_institution | Read credit applications, update status |
| --- | --- |
| buyer | Read listings, create/update offers, contracts |
| --- | --- |
| afap\_admin | Full access (read-only data, manage users, reports) |
| --- | --- |
| afap\_super\_admin | Full access (including system settings, user management) |
| --- | --- |

### **5.4 API Key Authentication (Third-Party Integrations)**

| Strategy | Implementation |
| --- | --- |
| API Key Generation | Admin creates API key for each partner |
| --- | --- |
| Key Format | afap\_live\_xxxxxxxxxxxxxxxxxxxx |
| --- | --- |
| Key Usage | Include in X-API-Key header |
| --- | --- |
| Key Scopes | Scoped to specific endpoints (e.g., /credit/\*, /market/\*) |
| --- | --- |
| Rate Limits | Based on partner tier (e.g., 1,000 req/min, 10,000 req/hour) |
| --- | --- |

## **6\. Internal Service Communication**

### **6.1 Service-to-Service Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ SERVICE COMMUNICATION FLOW │

│ │

│ 1. API Gateway receives request from client │

│ │

│ 2. Gateway validates authentication (JWT/API Key) │

│ │

│ 3. Gateway routes request to appropriate service │

│ │

│ 4. Service processes request: │

│ - Reads/writes data to database │

│ - Calls integration services (FIs, telecoms) │

│ - Calls other internal services (e.g., Advisory calls Farmer) │

│ │

│ 5. Service returns response to Gateway │

│ │

│ 6. Gateway formats response and returns to client │

└─────────────────────────────────────────────────────────────────────────────┘

### **6.2 Internal Service Dependencies**

| Service | Depends On | Integration |
| --- | --- | --- |
| Farmer Service | Auth Service | Validates user role/perms |
| --- | --- | --- |
| Order Service | Farmer Service, Product Service | Farmer validation, product stock |
| --- | --- | --- |
| Credit Service | Farmer Service | Farmer profile; credit score |
| --- | --- | --- |
| Market Service | Farmer Service | Farmer listings |
| --- | --- | --- |
| Advisory Service | Farmer Service | Farmer crop/location |
| --- | --- | --- |
| Traceability Service | All services | Correlates data across services |
| --- | --- | --- |
| M&E Service | All services | Aggregates metrics |
| --- | --- | --- |

## **7\. Error Handling**

### **7.1 Error Codes**

| Code | Description | HTTP Status |
| --- | --- | --- |
| AUTH-001 | Invalid credentials | 401 |
| --- | --- | --- |
| AUTH-002 | Token expired | 401 |
| --- | --- | --- |
| AUTH-003 | Insufficient permissions | 403 |
| --- | --- | --- |
| VALIDATION-001 | Missing required field | 400 |
| --- | --- | --- |
| VALIDATION-002 | Invalid data format | 400 |
| --- | --- | --- |
| RESOURCE-001 | Resource not found | 404 |
| --- | --- | --- |
| RESOURCE-002 | Resource already exists | 409 |
| --- | --- | --- |
| BUSINESS-001 | Insufficient credit score | 422 |
| --- | --- | --- |
| BUSINESS-002 | Insufficient stock | 422 |
| --- | --- | --- |
| BUSINESS-003 | Listing already matched | 422 |
| --- | --- | --- |
| INTEGRATION-001 | Third-party API error | 503 |
| --- | --- | --- |
| RATE-LIMIT-001 | Rate limit exceeded | 429 |
| --- | --- | --- |
| SYSTEM-001 | Internal server error | 500 |
| --- | --- | --- |

### **7.2 Error Response Examples**

Validation Error:

json

{

"success": false,

"error": {

"code": "VALIDATION-001",

"message": "Validation failed",

"details": \[

{

"field": "phone",

"message": "Phone number is required"

},

{

"field": "phone",

"message": "Must be a valid South African number"

}

\]

},

"timestamp": "2026-06-29T10:30:00Z",

"request\_id": "req-12345"

}

Resource Not Found:

json

{

"success": false,

"error": {

"code": "RESOURCE-001",

"message": "Farmer not found",

"details": {

"resource": "farmer",

"id": "uuid-not-found"

}

},

"timestamp": "2026-06-29T10:30:00Z",

"request\_id": "req-12345"

}

Rate Limit Exceeded:

json

{

"success": false,

"error": {

"code": "RATE-LIMIT-001",

"message": "Rate limit exceeded",

"details": {

"limit": 1000,

"window": "hour",

"retry\_after": 45 *// seconds*

}

},

"timestamp": "2026-06-29T10:30:00Z",

"request\_id": "req-12345"

}

## **8\. Rate Limiting & Performance**

### **8.1 Rate Limits by Tier**

| Tier | Requests / Minute | Requests / Hour | Requests / Day |
| --- | --- | --- | --- |
| Farmer (USSD) | 30 | 200 | 1,000 |
| --- | --- | --- | --- |
| Farmer (Mobile) | 60 | 500 | 5,000 |
| --- | --- | --- | --- |
| CBA | 120 | 1,000 | 10,000 |
| --- | --- | --- | --- |
| Agrodealer | 120 | 1,000 | 10,000 |
| --- | --- | --- | --- |
| FI / Buyer (API) | 300 | 5,000 | 50,000 |
| --- | --- | --- | --- |
| AFAP Admin | 300 | 5,000 | 50,000 |
| --- | --- | --- | --- |
| Internal (service-to-service) | Unlimited | Unlimited | Unlimited |
| --- | --- | --- | --- |

### **8.2 Performance Targets**

| Metric | Target |
| --- | --- |
| API Response Time (p95) | < 500ms |
| --- | --- |
| API Response Time (p99) | < 1s |
| --- | --- |
| Database Query Time | < 100ms |
| --- | --- |
| USSD Response Time | < 2s |
| --- | --- |
| SMS Delivery Time | < 5s |
| --- | --- |
| Concurrent Users | 1,000+ |
| --- | --- |
| API Uptime | 99.5% |
| --- | --- |

## **9\. API Documentation & Developer Experience**

### **9.1 Documentation Approach**

| Format | Purpose | Location |
| --- | --- | --- |
| OpenAPI 3.0 | Machine-readable API spec | /api/docs/swagger.json |
| --- | --- | --- |
| Swagger UI | Interactive API explorer | /api/docs/swagger |
| --- | --- | --- |
| Postman Collection | Testing and collaboration | /api/docs/postman.json |
| --- | --- | --- |
| API Reference | Human-readable docs | /api/docs/reference |
| --- | --- | --- |

### **9.2 API Versioning**

| Version | Status | Support Until |
| --- | --- | --- |
| v1 | Current | January 2028 |
| --- | --- | --- |
| v2 | Planned | Q1 2027 |
| --- | --- | --- |

### **9.3 Developer Onboarding**

| Step | Activity |
| --- | --- |
| 1 | Request API access (AFAP admin) |
| --- | --- |
| 2 | Receive API key + documentation |
| --- | --- |
| 3 | Test in sandbox environment (/api/sandbox) |
| --- | --- |
| 4 | Integrate and test |
| --- | --- |
| 5 | Deploy to production |
| --- | --- |

## **10\. Monitoring & Alerting**

### **10.1 Metrics to Monitor**

| Category | Metrics |
| --- | --- |
| API Performance | Response time, error rate, request volume |
| --- | --- |
| Third-Party Integrations | Uptime, error rate, latency |
| --- | --- |
| Database | Query time, connection count, lock waits |
| --- | --- |
| Infrastructure | CPU, memory, disk, network |
| --- | --- |
| Business | Registrations, orders, credit applications |
| --- | --- |

### **10.2 Alerting Thresholds**

| Condition | Severity | Action |
| --- | --- | --- |
| API error rate > 1% | Critical | Page on-call engineer |
| --- | --- | --- |
| API response time > 1s (p95) | High | Investigate and optimise |
| --- | --- | --- |
| Third-party API failure | High | Alert and initiate fallback |
| --- | --- | --- |
| Database connection pool > 80% | Medium | Scale up connections |
| --- | --- | --- |
| Disk space < 20% | Medium | Clean up or expand |
| --- | --- | --- |

## **11\. API Security Checklist**

| Security Control | Implemented? |
| --- | --- |
| TLS 1.3 encryption | ✅ |
| --- | --- |
| JWT validation on every request | ✅ |
| --- | --- |
| Role-based access control | ✅ |
| --- | --- |
| Row-Level Security (RLS) | ✅ |
| --- | --- |
| Input validation | ✅ |
| --- | --- |
| SQL injection prevention (parameterised queries) | ✅ |
| --- | --- |
| XSS protection | ✅ |
| --- | --- |
| CORS configured | ✅ |
| --- | --- |
| Rate limiting | ✅ |
| --- | --- |
| Audit logging | ✅ |
| --- | --- |
| API key rotation | ✅ |
| --- | --- |
| Sensitive data masking (logs) | ✅ |
| --- | --- |

## **12\. Migration & Data Sync Strategy**

### **12.1 Data Migration (Initial)**

| Phase | Activity | Timeline |
| --- | --- | --- |
| 1 | Validate existing data (AFAP spreadsheets, systems) | Month 1 |
| --- | --- | --- |
| 2 | Clean and normalise data | Month 1-2 |
| --- | --- | --- |
| 3 | Map to new database schema | Month 2 |
| --- | --- | --- |
| 4 | Run migration (testing environment) | Month 2 |
| --- | --- | --- |
| 5 | Validate data integrity | Month 2-3 |
| --- | --- | --- |
| 6 | Run migration (production) | Month 3 |
| --- | --- | --- |

### **12.2 Data Sync (Ongoing)**

| Strategy | Implementation |
| --- | --- |
| Real-time sync | Between mobile app and backend when online |
| --- | --- |
| Batch sync | For bulk data (e.g., farmer registrations via CBA) |
| --- | --- |
| Conflict resolution | Last write wins (timestamp-based) |
| --- | --- |
| Backup | Daily full backup; continuous WAL |
| --- | --- |

## **13\. Appendix: Complete API Endpoint Index**

| Module | Endpoints | Auth Required |
| --- | --- | --- |
| Auth | 11 | Mixed |
| --- | --- | --- |
| Farmer | 11 | Mixed |
| --- | --- | --- |
| Input/Order | 15 | Mixed |
| --- | --- | --- |
| Financial/Credit | 10 | Mixed |
| --- | --- | --- |
| Market | 13 | Mixed |
| --- | --- | --- |
| Advisory | 9 | Mixed |
| --- | --- | --- |
| Traceability | 6 | Mixed |
| --- | --- | --- |
| M&E/Reports | 6 | Admin |
| --- | --- | --- |
| Admin/System | 8 | Admin |
| --- | --- | --- |
| TOTAL | 89 endpoints |  |
| --- | --- | --- |

## **14\. Document Version History**

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | \[Date\] | Kabelo | Initial draft |
| --- | --- | --- | --- |
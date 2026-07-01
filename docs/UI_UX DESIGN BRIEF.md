# **UI/UX DESIGN BRIEF**

## **Digital Agritech Platform – Limpopo, South Africa**

Project: AFAP Digital Agritech Platform & Value Chain Integration  
Client: African Fertilizer and Agribusiness Partnership (AFAP)  
Document Version: 1.0  
Date: \[Insert Date\]  
Status: Draft for Review

## **1\. Executive Summary**

This UI/UX Design Brief defines the user experience strategy, design principles, interface specifications, and visual identity for the AFAP Digital Agritech Platform. The design approach prioritises accessibility, simplicity, and cultural relevance to ensure adoption by smallholder farmers with varying literacy levels, while maintaining professional functionality for administrators and ecosystem partners.

The platform spans four access channels—Web Portal, Mobile App (React Native), USSD, and SMS—each tailored to its specific user context while maintaining a consistent brand identity and experience.

## **2\. Design Principles**

| Principle | Description | Rationale |
| --- | --- | --- |
| 1\. Lowest-Connectivity First | Design for 2G/3G networks and feature phones first; enhanced experiences for smartphones | Majority of farmers in Limpopo have feature phones; platform must work for everyone |
| --- | --- | --- |
| 2\. Simplicity Over Features | Every screen has one primary action; remove cognitive friction | Users have varying literacy levels; clarity drives adoption |
| --- | --- | --- |
| 3\. Visual Communication | Use icons, colours, and images to supplement text | Low literacy users need visual cues |
| --- | --- | --- |
| 4\. Offline-First | Mobile app works without connectivity; syncs when available | Network coverage is unreliable in rural areas |
| --- | --- | --- |
| 5\. Cultural Relevance | Use locally relevant imagery, colours, and examples | Builds trust and familiarity |
| --- | --- | --- |
| 6\. Progressive Disclosure | Show only what's needed at each step; hide complexity | Reduces overwhelm for new users |
| --- | --- | --- |
| 7\. Consistent Branding | Unified visual language across all channels | Builds recognition and trust |
| --- | --- | --- |
| 8\. Accessibility | Large touch targets, high contrast, readable fonts | Accommodates older users and low-vision users |
| --- | --- | --- |

## **3\. Target Users & Design Priorities**

| User Type | Primary Device | Design Priority |
| --- | --- | --- |
| Farmer | Feature phone (USSD/SMS) or basic Android | Simplicity, visual cues, voice/sound support, local language |
| --- | --- | --- |
| CBA (Community- Based Agent) | Android smartphone | Efficiency, offline capability, bulk actions |
| --- | --- | --- |
| Agrodealer | Android smartphone or Web (laptop/desktop) | Inventory management, order processing, reporting |
| --- | --- | --- |
| Financial Institution | Web (desktop) | Data clarity, reporting, integration visibility |
| --- | --- | --- |
| Off-taker / Buyer | Web (desktop) | Inventory views, contracting, analytics |
| --- | --- | --- |
| AFAP Programme Staff | Web (desktop/laptop) | Dashboards, reporting, user management, export |
| --- | --- | --- |

## **4\. Information Architecture**

### **4.1 High-Level Site Map**

text

AFAP Digital Agritech Platform

│

├── Public / Landing

│ ├── About AFAP

│ ├── Programme Overview

│ └── Contact / Support

│

├── Farmer Portal (USSD/SMS/Mobile)

│ ├── Registration

│ ├── My Profile

│ ├── Inputs

│ │ ├── View Catalogue

│ │ ├── Place Order

│ │ └── Order History

│ ├── Advisory

│ │ ├── Crop Calendar

│ │ ├── Climate Tips

│ │ └── Pest/Disease Alerts

│ ├── Finance

│ │ ├── Credit Application

│ │ ├── My Loans

│ │ └── Repayment

│ ├── Market

│ │ ├── List Produce

│ │ ├── View Buyers

│ │ └── My Sales

│ └── Help / Support

│

├── CBA Portal (Mobile + Web)

│ ├── Dashboard

│ ├── Farmer Management

│ │ ├── Register Farmer

│ │ ├── View Farmers

│ │ └── Bulk Upload

│ ├── Order Management

│ │ ├── Aggregate Orders

│ │ └── Track Deliveries

│ ├── Advisory

│ │ ├── Send Alerts

│ │ └── Demo Plot Tracking

│ └── Reports

│

├── Agrodealer Portal (Mobile + Web)

│ ├── Dashboard

│ ├── Inventory

│ │ ├── Manage Products

│ │ ├── Stock Levels

│ │ └── Low Stock Alerts

│ ├── Orders

│ │ ├── View Orders

│ │ ├── Fulfil Orders

│ │ └── Delivery Tracking

│ ├── Payments

│ │ ├── Invoices

│ │ └── Payment History

│ └── Reports

│

├── Financial Institution Portal (Web)

│ ├── Dashboard

│ ├── Credit Applications

│ │ ├── View Applications

│ │ ├── Approve/Reject

│ │ └── Disburse

│ ├── Loan Portfolio

│ │ ├── Active Loans

│ │ └── Repayment Status

│ └── Reports

│

├── Off-taker / Buyer Portal (Web)

│ ├── Dashboard

│ ├── Inventory View

│ │ ├── Available Produce

│ │ └── Filter by Crop/Region

│ ├── Purchase Orders

│ │ ├── Create Order

│ │ └── Order History

│ └── Contracts

│

└── AFAP Admin Portal (Web)

├── Dashboard

├── User Management

│ ├── Farmer List

│ ├── CBA List

│ ├── Agrodealer List

│ └── Permission Management

├── Programme Monitoring

│ ├── Real-Time Dashboard

│ ├── Custom Reports

│ └── Data Export

├── Partner Management

│ ├── FIs

│ ├── Off-takers

│ └── Telecoms

└── System Settings

├── Languages

├── Crop Calendar

└── Advisory Content

## 

## **5\. Design System**

### **5.1 Colour Palette**

Primary Colours (AFAP Brand Alignment)

| Colour | Hex Code | Usage |
| --- | --- | --- |
| AFAP Green | #1A7A3A | Primary brand colour; buttons; headers; key actions |
| --- | --- | --- |
| AFAP Green Light | #4CAF50 | Secondary buttons; success states; positive feedback |
| --- | --- | --- |
| AFAP Dark Green | #0D4F2A | Footer; dark headers; emphasis |
| --- | --- | --- |
| AFAP Gold | #F5A623 | Accent; highlights; calls to action |
| --- | --- | --- |
| AFAP Blue | #2C6B8F | Trust elements; information; links |
| --- | --- | --- |

Supporting Colours

| Colour | Hex Code | Usage |
| --- | --- | --- |
| White | #FFFFFF | Backgrounds; cards; text on dark |
| --- | --- | --- |
| Off-White | #F8FAF9 | Section backgrounds; subtle separation |
| --- | --- | --- |
| Dark Grey | #333333 | Primary body text |
| --- | --- | --- |
| Medium Grey | #666666 | Secondary text; labels; icons |
| --- | --- | --- |
| Light Grey | #E5E7EB | Dividers; borders; disabled states |
| --- | --- | --- |
| Red | #D32F2F | Errors; warnings; critical alerts |
| --- | --- | --- |
| Amber | #FFB300 | Warnings; pending states |
| --- | --- | --- |
| Green | #43A047 | Success; completed states |
| --- | --- | --- |

### **5.2 Typography**

Web & Mobile App

| Element | Font Family | Size | Weight | Line Height |
| --- | --- | --- | --- | --- |
| Headline 1 | Inter / System | 32px | Bold (700) | 1.2 |
| --- | --- | --- | --- | --- |
| Headline 2 | Inter / System | 24px | Bold (700) | 1.3 |
| --- | --- | --- | --- | --- |
| Headline 3 | Inter / System | 20px | Semibold (600) | 1.4 |
| --- | --- | --- | --- | --- |
| Headline 4 | Inter / System | 18px | Semibold (600) | 1.4 |
| --- | --- | --- | --- | --- |
| Body Large | Inter / System | 16px | Regular (400) | 1.6 |
| --- | --- | --- | --- | --- |
| Body | Inter / System | 14px | Regular (400) | 1.6 |
| --- | --- | --- | --- | --- |
| Body Small | Inter / System | 12px | Regular (400) | 1.5 |
| --- | --- | --- | --- | --- |
| Label / Button | Inter / System | 14px | Medium (500) | 1.2 |
| --- | --- | --- | --- | --- |
| Caption | Inter / System | 11px | Regular (400) | 1.4 |
| --- | --- | --- | --- | --- |

USSD & SMS

-   Plain text only
-   Max 160 characters per SMS
-   USSD menu: 5-8 options per screen
-   Use numbers (1-9, 0 for back) for navigation

### **5.3 Spacing & Layout**

| Measurement | Value |
| --- | --- |
| Base Unit | 8px |
| --- | --- |
| Micro Spacing | 4px (1x) |
| --- | --- |
| Small Spacing | 8px (2x) |
| --- | --- |
| Medium Spacing | 16px (4x) |
| --- | --- |
| Large Spacing | 24px (6x) |
| --- | --- |
| X-Large Spacing | 32px (8x) |
| --- | --- |
| Max Content Width | 1200px (web) |
| --- | --- |
| Mobile Breakpoint | 768px |
| --- | --- |
| Touch Target (Mobile) | Min 44x44px |
| --- | --- |
| Touch Target (Web) | Min 36x36px |
| --- | --- |

### **5.4 Iconography**

-   Icon Library: FontAwesome or custom SVG icons
-   Style: Rounded, filled, simple shapes
-   Size: 16px, 20px, 24px, 32px
-   Colour: Consistent with colour palette
-   Key Icons Required:
    -   Farmer, CBA, Agrodealer, Admin (user roles)
    -   Inputs, Orders, Delivery (supply chain)
    -   Credit, Insurance, Payment (financial)
    -   Market, Buyer, Contract (market access)
    -   Advisory, Climate, Crop (advisory)
    -   Dashboard, Report, Export (M&E)
    -   Register, Profile, Settings (account)

## **6\. Web Portal (Admin & Partners)**

### **6.1 Web Design Principles**

| Principle | Implementation |
| --- | --- |
| Responsive | Works on desktop, tablet, and mobile browsers |
| --- | --- |
| Dashboard-First | Key metrics visible on login; drill-down available |
| --- | --- |
| Efficient Data Entry | Bulk uploads, templates, auto-complete |
| --- | --- |
| Clear Navigation | Sidebar with icons; breadcrumbs |
| --- | --- |
| Export Ready | PDF, CSV, Excel exports available on all data views |
| --- | --- |

### **6.2 Key Screens (Web)**

#### Screen 1: Login Page

| Element | Description |
| --- | --- |
| Purpose | Authenticate users with email + password or SMS OTP |
| --- | --- |
| Components | Logo, Email field, Password field, Login button, "Forgot password?" link, "Login with SMS OTP" option |
| --- | --- |
| Design Notes | Clean, centred; brand colours; minimal distraction |
| --- | --- |

#### Screen 2: Admin Dashboard

| Element | Description |
| --- | --- |
| Purpose | Provide real-time programme overview at a glance |
| --- | --- |
| Components | Sidebar navigation; top bar (user + notifications); KPI cards (Farmers, Orders, Credit, Sales); Charts (registrations over time, orders by region); Recent activity feed; Quick action buttons |
| --- | --- |
| Design Notes | KPI cards show % change; charts interactive (hover/click for details) |
| --- | --- |

#### Screen 3: Farmer Management (Admin)

| Element | Description |
| --- | --- |
| Purpose | View, search, filter, and manage all farmers |
| --- | --- |
| Components | Search bar; Filter dropdowns (region, crop, registration date); Table with columns (Digital ID, Name, Location, Crop, Orders, Credit Score, Actions); Pagination; Export button; Bulk actions (send SMS, assign CBA) |
| --- | --- |
| Design Notes | Click row to view farmer detail; mobile-responsive table collapses on small screens |
| --- | --- |

#### Screen 4: Farmer Detail (Admin)

| Element | Description |
| --- | --- |
| Purpose | View complete farmer profile and activity |
| --- | --- |
| Components | Profile photo (if available); Digital ID; Basic info (name, location, farm size, crop); Tabs: Overview, Orders, Credit, Deliveries, Traceability; Action buttons (Send SMS, View on Map, Edit) |
| --- | --- |
| Design Notes | Map shows farm location (PostGIS); timeline of activity |
| --- | --- |

#### Screen 5: M&E Dashboard

| Element | Description |
| --- | --- |
| Purpose | Monitor programme performance against KPIs |
| --- | --- |
| Components | Date range selector; KPI cards; Charts (bar, line, pie); Table of metrics; Export report button; Custom report builder |
| --- | --- |
| Design Notes | Can be filtered by region, crop, timeframe; auto-generates donor reports |
| --- | --- |

#### Screen 6: User Management (Admin)

| Element | Description |
| --- | --- |
| Purpose | Manage all platform users and roles |
| --- | --- |
| Components | User list (name, role, status, actions); Add user button; Role filters; Bulk actions; Permission matrix |
| --- | --- |
| Design Notes | Row-Level Security visible to admin; can audit user activity |
| --- | --- |

#### Screen 7: Partner Management (Admin)

| Element | Description |
| --- | --- |
| Purpose | Onboard and manage ecosystem partners |
| --- | --- |
| Components | Partner list (type: FI, Off-taker, Telecom, Agrodealer); API key generation; Integration status; Add partner button |
| --- | --- |
| Design Notes | API keys shown only on generation; status indicators (active, pending, error) |
| --- | --- |

#### Screen 8: Agrodealer Dashboard

| Element | Description |
| --- | --- |
| Purpose | Manage inventory and orders |
| --- | --- |
| Components | Sidebar navigation; Top bar; KPI cards (Stock value, Pending orders, Revenue); Inventory table (product, stock, price, low stock alert); Order list; Quick actions (Add product, Process orders) |
| --- | --- |
| Design Notes | Low-stock alerts prominently displayed; bulk order processing |
| --- | --- |

#### Screen 9: Financial Institution Dashboard

| Element | Description |
| --- | --- |
| Purpose | Manage credit applications and portfolio |
| --- | --- |
| Components | KPI cards (Applications pending, Active loans, Repayment rate); Application queue; Loan portfolio table; Credit scoring insights; Reports |
| --- | --- |
| Design Notes | Credit applications show farmer profile link; scoring summary visible |
| --- | --- |

## **7\. Mobile App (React Native - Farmers, CBAs, Agrodealers)**

### **7.1 Mobile Design Principles**

| Principle | Implementation |
| --- | --- |
| Offline-First | All critical actions work offline; sync icon visible; sync progress shown |
| --- | --- |
| Thumb-Friendly | Primary actions at bottom of screen; navigation accessible one-handed |
| --- | --- |
| Visual First | Use icons, photos, and illustrations to supplement text |
| --- | --- |
| Local Language Ready | Language switch at login; content in English + local languages |
| --- | --- |
| Lightweight | Small app size (<30MB); images compressed; limited animations |
| --- | --- |
| Low Data Mode | Load low-res images first; option to load high-res |
| --- | --- |

### **7.2 Key Screens (Mobile App)**

#### Screen 1: Onboarding (First Launch)

| Element | Description |
| --- | --- |
| Purpose | Introduce the app and guide language/role selection |
| --- | --- |
| Components | App logo; Welcome message; "Continue" button; Language selector (drop-down); User role selector (Farmer / CBA / Agrodealer) |
| --- | --- |
| Design Notes | 3-4 onboarding screens (swipe) explaining key features; skip option for returning users |
| --- | --- |

#### Screen 2: Registration / Login

| Element | Description |
| --- | --- |
| Purpose | Authenticate user (phone number + OTP) or register new user |
| --- | --- |
| Components | Phone number input; "Send OTP" button; OTP input (4-6 digits); "Verify" button; "Register" link (for new users) |
| --- | --- |
| Design Notes | OTP auto-read where possible; large touch targets; clear instructions |
| --- | --- |

#### Screen 3: Farmer Home Dashboard

| Element | Description |
| --- | --- |
| Purpose | One-stop view of key actions and updates |
| --- | --- |
| Components | Top bar (greeting, notifications); Quick action buttons (Order Inputs, Check Credit, Sell Produce, Get Advisory); Updates feed (alerts, tips, delivery notifications); Bottom navigation bar (Home, Orders, Market, Profile) |
| --- | --- |
| Design Notes | Quick actions are 4 large grid buttons with icons; updates feed scrollable |
| --- | --- |

#### Screen 4: Order Inputs

| Element | Description |
| --- | --- |
| Purpose | Browse input catalogue and place order |
| --- | --- |
| Components | Search bar; Category filters (Fertiliser, Seed, Pesticide, etc.); Product cards (image, name, price, quantity, unit); "Add to Order" button; Cart summary (bottom sheet); "Place Order" button |
| --- | --- |
| Design Notes | Cart accessible via bottom sheet; offline orders queued; delivery date estimate shown |
| --- | --- |

#### Screen 5: Credit Application

| Element | Description |
| --- | --- |
| Purpose | Apply for agricultural credit |
| --- | --- |
| Components | Purpose dropdown; Amount input; Farm details (crop, area, expected yield); Upload supporting documents (optional); "Submit Application" button; Status tracking (pending, approved, disbursed, repaid) |
| --- | --- |
| Design Notes | Simple form with clear labels; progress indicator; auto-calculates credit score (visible to user) |
| --- | --- |

#### Screen 6: Sell Produce / Market

| Element | Description |
| --- | --- |
| Purpose | List produce for sale and view market opportunities |
| --- | --- |
| Components | "List Produce" button; Existing listings (status: active, matched, expired); Buyer requests (filtered by crop/location); "Match" button; Contract status |
| --- | --- |
| Design Notes | Listing creates electronic receipt; contract generated after match |
| --- | --- |

#### Screen 7: Advisory / Tips

| Element | Description |
| --- | --- |
| Purpose | Receive climate-smart agriculture recommendations |
| --- | --- |
| Components | "Get Advice" button (based on crop and location); Today's tips feed; Crop calendar; Pest/disease alerts; Weather forecast; Search tips |
| --- | --- |
| Design Notes | Recommendations personalised based on farmer's crop and location; offline cache of last week's tips |
| --- | --- |

#### Screen 8: CBA Dashboard

| Element | Description |
| --- | --- |
| Purpose | Manage assigned farmers and assist with platform activities |
| --- | --- |
| Components | KPI cards (Farmers assigned, Pending registrations, Active orders, Alerts); Farmer list; Quick actions (Register Farmer, Bulk Upload, Send Alert); Bottom navigation (Home, Farmers, Orders, Reports, Profile) |
| --- | --- |
| Design Notes | Bulk upload for multiple farmers in offline areas; farmer list grouped by village |
| --- | --- |

#### Screen 9: CBA Register Farmer

| Element | Description |
| --- | --- |
| Purpose | Onboard new farmers via mobile app |
| --- | --- |
| Components | Farmer details (name, phone, location, farm size, crop); GPS capture button (auto-populates location); Photo capture (soil, pest, ID); "Register" button; Offline indicator (saves locally if offline) |
| --- | --- |
| Design Notes | GPS lock with visual feedback; photo compression before upload; form fields validated |
| --- | --- |

#### Screen 10: Agrodealer Dashboard

| Element | Description |
| --- | --- |
| Purpose | Manage inventory and process orders |
| --- | --- |
| Components | KPI cards (Stock value, Pending orders, Revenue, Low stock items); Inventory list; Orders queue; "Add Product" button; "Process Orders" button; Bottom navigation (Home, Inventory, Orders, Reports, Profile) |
| --- | --- |
| Design Notes | Low-stock items highlighted in red; bulk order processing with scan/confirm workflow |
| --- | --- |

## **8\. USSD Interface (Feature Phones)**

### **8.1 USSD Design Principles**

| Principle | Implementation |
| --- | --- |
| Simple Menu | Max 8 options per screen; numbered choices (1-9, 0 for back) |
| --- | --- |
| Clear Language | Short, plain text; avoid jargon |
| --- | --- |
| Minimal Input | Limit free-text entry; use numbered choices where possible |
| --- | --- |
| Session Management | Save user progress; resume if session drops |
| --- | --- |
| Language Support | English + local languages (isiZulu, Sepedi, Xitsonga) |
| --- | --- |

### **8.2 USSD Menu Flow**

Main Menu:

text

Welcome to AFAP Farmer Services

1\. Register

2\. My Profile

3\. Order Inputs

4\. Credit Services

5\. Sell Produce

6\. Advisory Tips

7\. Talk to Agent

0\. Exit

Register Flow:

text

Enter your full name:

\> \[User inputs name\]

Enter your phone number:

\> \[User inputs phone\]

Enter your village/town:

\> \[User inputs location\]

What is your main crop?

1\. Maize

2\. Sorghum

3\. Groundnuts

4\. Vegetables

5\. Other

Order Inputs Flow:

text

Select product category:

1\. Fertiliser

2\. Seed

3\. Pesticide

4\. Herbicide

Select product:

1\. Urea (50kg) - R350

2\. NPK (50kg) - R420

3\. Compost (25kg) - R180

Enter quantity (bags):

\> \[User inputs number\]

Confirm order:

1\. Confirm

2\. Cancel

Advisory Flow:

text

Select tip type:

1\. Crop Calendar

2\. Weather Alert

3\. Pest Control

4\. Climate-Smart Practices

\[Display relevant tip\]

Reply 1 for more tips

Reply 0 for main menu

### **8.3 USSD Session Management**

| Element | Implementation |
| --- | --- |
| Session Timeout | 120 seconds inactivity |
| --- | --- |
| State Persistence | Store session data (phone, progress) in server-side cache (Redis) |
| --- | --- |
| Disconnection Handling | Auto-save progress; resume on next call |
| --- | --- |
| Language Preference | Prompt user at first visit; save preference |
| --- | --- |

## **9\. SMS Interface**

### **9.1 SMS Design Principles**

| Principle | Implementation |
| --- | --- |
| Short & Actionable | Max 160 characters per SMS |
| --- | --- |
| Clear Call to Action | Tell user what to do next (reply, dial USSD, visit) |
| --- | --- |
| Personalised | Use farmer name where available |
| --- | --- |
| Timely | Send at appropriate times (not early morning or late night) |
| --- | --- |
| Opt-Out Option | Reply STOP to unsubscribe |
| --- | --- |

### **9.2 SMS Templates**

| Use Case | Template (Example) |
| --- | --- |
| Welcome / Registration Confirmation | "Sawubona \[name\]! Welcome to AFAP. Your ID is \[ID\]. Dial \*123# for services. Reply HELP for help." |
| --- | --- |
| Order Confirmation | "Your order #\[order\_id\] for \[product\] x\[quantity\] is confirmed. Delivery expected \[date\]. Dial \*123# to track." |
| --- | --- |
| Delivery Notification | "Your order #\[order\_id\] is ready for collection at \[agrodealer\] in \[village\]. Bring your ID." |
| --- | --- |
| Credit Approval | "Congratulations! Your loan of R\[amount\] is approved. Funds will be disbursed within 48hrs. Dial \*123# for details." |
| --- | --- |
| Payment Reminder | "Reminder: Your loan repayment of R\[amount\] is due on \[date\]. Dial \*123# to pay." |
| --- | --- |
| Advisory Tip | "🌱 Climate-smart tip: Plant maize now for best yields. Apply fertiliser after first rains. More tips at \*123#." |
| --- | --- |
| Market Alert | "Buyer alert: \[buyer\] is buying \[crop\] at R\[price\]/kg in \[area\]. Sell now! Dial \*123# to list your produce." |
| --- | --- |
| Pest Alert | "⚠️ Pest alert: Armyworm detected in \[area\]. Check your fields. Report sightings via \*123#." |
| --- | --- |
| Weather Alert | "☔ Heavy rain expected in \[area\] this week. Delay planting/fertilising until weather clears. Check \*123#." |
| --- | --- |

## **10\. Accessibility & Inclusion**

### **10.1 Accessibility Features**

| Feature | Implementation |
| --- | --- |
| Font Sizing | User-selectable font size (small, medium, large) in web and mobile |
| --- | --- |
| High Contrast Mode | Toggle for high contrast colours (yellow/black) |
| --- | --- |
| Text-to-Speech | Mobile app reads text aloud (optional) |
| --- | --- |
| Voice Input | Mobile app supports voice input for USSD/simple commands (future phase) |
| --- | --- |
| Touch Targets | Minimum 44x44px on mobile, 36x36px on web |
| --- | --- |
| Alt Text | All images have descriptive alt text |
| --- | --- |
| Keyboard Navigation | Full keyboard support for web (Tab, Enter, Escape) |
| --- | --- |
| Screen Reader Support | ARIA labels for web; accessibility labels for mobile |
| --- | --- |

### **10.2 Literacy Support**

| Feature | Implementation |
| --- | --- |
| Visual Icons | Icons alongside text labels on all buttons and menus |
| --- | --- |
| Photo/Video Demonstrations | Training content includes images and videos |
| --- | --- |
| Audio Guides | Audio recordings of key instructions (mobile app) |
| --- | --- |
| Local Languages | Full content available in isiZulu, Sepedi, Xitsonga |
| --- | --- |
| Simple Language | Grade 4-6 reading level; avoid technical jargon |
| --- | --- |
| Step-by-Step Wizards | All complex processes broken into simple numbered steps |
| --- | --- |

### **10.3 Localisation**

| Language | Support Level |
| --- | --- |
| English | Full (all channels) |
| --- | --- |
| isiZulu | Full (all channels) |
| --- | --- |
| Sepedi | Full (all channels) |
| --- | --- |
| Xitsonga | Full (all channels) |
| --- | --- |

Language Implementation:

-   Web: Language switcher in top bar; persists in session/localStorage
-   Mobile: Language selected on onboarding; persists; accessible via settings
-   USSD: Language prompt on first use; persists via session
-   SMS: Language inferred from user preferences or send in multiple languages

## 

## **11\. Prototyping & Testing Plan**

### **11.1 Prototyping Approach**

| Phase | Method | Output |
| --- | --- | --- |
| Low-Fidelity | Paper sketches, black-and-white wireframes | Basic layout and flow validation |
| --- | --- | --- |
| Mid-Fidelity | Digital wireframes (Figma) | Interactive prototype for user testing |
| --- | --- | --- |
| High-Fidelity | Full visual design in Figma | Final UI with colours, typography, icons |
| --- | --- | --- |
| Interactive Prototype | Figma with micro-interactions | User acceptance testing; stakeholder sign-off |
| --- | --- | --- |

### **11.2 User Testing Plan**

| Test Phase | Participants | Method | Focus Areas |
| --- | --- | --- | --- |
| Round 1 | 5-8 farmers, 2-3 CBAs | In-person, moderated, think-aloud | Onboarding, registration, USSD menu clarity |
| --- | --- | --- | --- |
| Round 2 | 5 farmers, 5 CBAs, 3 agrodealers | Remote/field, moderated | Ordering, credit application, selling produce |
| --- | --- | --- | --- |
| Round 3 | AFAP staff, partners | Web demo, moderated | Dashboard usability, reporting, data export |
| --- | --- | --- | --- |

### **11.3 Success Criteria for UX**

| Metric | Target |
| --- | --- |
| Task Completion Rate | ≥ 85% for core tasks (registration, ordering, advisory) |
| --- | --- |
| Time on Task | Registration < 3 minutes; ordering < 2 minutes |
| --- | --- |
| User Satisfaction | ≥ 80% satisfaction score (SUS) |
| --- | --- |
| Support Calls | < 10% of users require support call for first transaction |
| --- | --- |
| Repeat Usage | ≥ 70% of registered farmers use platform at least once/month |
| --- | --- |

## **12\. Handover to Development**

### **12.1 Deliverables to Development Team**

| Deliverable | Format | Owner |
| --- | --- | --- |
| Figma design files (all screens) | Figma link | UI/UX Designer |
| --- | --- | --- |
| Design system (colours, typography, components) | Figma + Storybook | UI/UX Designer |
| --- | --- | --- |
| Icon library | SVG/PNG files | UI/UX Designer |
| --- | --- | --- |
| User flows (text + diagrams) | PDF / Miro | UI/UX Designer |
| --- | --- | --- |
| Accessibility checklist | Spreadsheet | UI/UX Designer |
| --- | --- | --- |
| Localisation strings | JSON files | UI/UX Designer + Translator |
| --- | --- | --- |

### **12.2 Design-Dev Collaboration**

| Activity | Frequency | Attendees |
| --- | --- | --- |
| Design Review | Bi-weekly | Designer + Dev Leads |
| --- | --- | --- |
| Component Handover | Per sprint | Designer + Frontend/Mobile Engineers |
| --- | --- | --- |
| Bug/UX Triage | Weekly | Designer + QA + Product Owner |
| --- | --- | --- |
| User Feedback Review | Monthly | Designer + Product Owner + Training Lead |
| --- | --- | --- |

## **13\. Appendix**

### **A. Example User Journey Visual (Text Description)**

Farmer Journey: First-Time User

text

1\. Receives SMS: "Welcome! Dial \*123# to register for AFAP services."

↓

2\. Dials \*123# on feature phone.

↓

3\. USSD Menu: "1. Register" → User selects 1.

↓

4\. USSD: "Enter your full name:" → User types name.

↓

5\. USSD: "Enter your village:" → User types village.

↓

6\. USSD: "Select crop: 1.Maize 2.Sorghum..." → User selects 1.

↓

7\. USSD: "Registration complete! Your ID is ABC123."

↓

8\. Receives SMS: "Welcome to AFAP! Your ID is ABC123. Dial \*123# for services."

↓

9\. Dials \*123# again → Main menu now shows personalized options.

↓

10\. Selects "3. Order Inputs" → Browse → Place order.

↓

11\. Receives SMS: "Order confirmed! Collection at \[agrodealer\] in 3 days."

### **B. Design Tools**

| Tool | Use |
| --- | --- |
| Figma | UI/UX design, prototyping, collaboration |
| --- | --- |
| Miro | User journey mapping, brainstorming, wireframing |
| --- | --- |
| Adobe Color | Colour palette generation |
| --- | --- |
| Google Fonts | Web font hosting (Inter) |
| --- | --- |
| FontAwesome | Icon library |
| --- | --- |
| Storybook | Component library documentation |
| --- | --- |

## **14\. Document Version History**

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | \[Date\] | Kabelo | Initial draft |
| --- | --- | --- | --- |
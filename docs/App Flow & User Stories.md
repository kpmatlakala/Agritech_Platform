# **APP FLOW / USER JOURNEY MAPS**

## **Digital Agritech Platform – Limpopo, South Africa**

Project: AFAP Digital Agritech Platform & Value Chain Integration  
Client: African Fertilizer and Agribusiness Partnership (AFAP)  
Document Version: 1.0  
Date: \[Insert Date\]  
Status: Draft for Review

## **1\. Executive Summary**

This document defines the end-to-end user journeys and application flows for all user types across the AFAP Digital Agritech Platform. Each journey maps the user's path from entry to completion, across multiple channels (Web, Mobile App, USSD, SMS), including decision points, error states, and offline scenarios.

The journeys are structured to:

-   Validate that all ToR requirements are addressed
-   Guide UI/UX design and development
-   Identify critical touchpoints for user adoption and training
-   Surface integration points with ecosystem partners

## **2\. Journey Map Legend**

| Symbol | Meaning |
| --- | --- |
| ➡️ | User action / step |
| --- | --- |
| 🔀 | Decision point (branch) |
| --- | --- |
| 🔄 | Loop / repeat step |
| --- | --- |
| ⚠️ | Error / exception handling |
| --- | --- |
| 📱 | Mobile app channel |
| --- | --- |
| 💻 | Web portal channel |
| --- | --- |
| 📞 | USSD channel |
| --- | --- |
| ✉️ | SMS channel |
| --- | --- |
| ☁️ | Sync required (online) |
| --- | --- |
| 📶 | Offline-capable step |
| --- | --- |
| 🔌 | Third-party integration point |
| --- | --- |

## **3\. Journey 1: Farmer Onboarding & Registration**

### **3.1 Overview**

| User Type | Farmer (new user) |
| --- | --- |
| Channel | USSD (primary), Mobile App, SMS (support) |
| --- | --- |
| ToR Reference | 4.2 Farmer Registration, Digital Identity & Profiling |
| --- | --- |
| Success Criteria | Farmer receives unique Digital ID and can access platform services |
| --- | --- |
| Average Duration | 3-5 minutes (USSD), 2-3 minutes (Mobile App) |
| --- | --- |

### **3.2 Detailed Journey Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ FARMER ONBOARDING & REGISTRATION │

│ │

│ START: Farmer hears about AFAP (word of mouth, CBA, radio, SMS) │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ CHANNEL SELECTION │ │

│ │ │ │

│ │ Farmer dials \*123# OR Farmer downloads mobile app │ │

│ │ (Feature phone) (Smartphone) │ │

│ └───────────────┬──────────────────────┬─────────────────────────────┘ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────────────┐ │

│ │ USSD Welcome │ │ App Onboarding │ │

│ │ Menu Prompt │ │ - Language selection │ │

│ │ │ │ - Role selection │ │

│ └───────┬────────┘ └────────────┬───────────┘ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────────────┐ │

│ │ 1. Register │ │ "Create Account" │ │

│ │ (User selects │ │ button tapped │ │

│ │ option 1) │ └────────────┬───────────┘ │

│ └───────┬────────┘ │ │

│ │ ▼ │

│ └──────────────┬─────────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Enter Farmer Details │ │

│ │ │ │

│ │ USSD: │ Mobile: │

│ │ - Full name │ - Full name │

│ │ - Phone number │ - Phone number │

│ │ - Village/town │ - Village/town │

│ │ - Main crop │ - Main crop │

│ │ - Farm size │ - Farm size │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ GPS Farm Mapping │ │

│ │ │ │

│ │ USSD: │ Mobile: │

│ │ - Village name │ - GPS capture (auto) │

│ │ (geocode to │ - Farm boundary │

│ │ approximate area) │ (polygon) │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Upload Documentation │ │

│ │ (Mobile only) │ │

│ │ │ │

│ │ - Soil test photo │ │

│ │ - ID document photo │ │

│ │ - Pest/disease photos │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Generate Digital ID │ │

│ │ │ │

│ │ System creates: │ │

│ │ - UUID │ │

│ │ - QR code (mobile) │ │

│ │ - Short ID (USSD) │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Confirm & Save │ │

│ │ │ │

│ │ 🔀 Is farmer already │ │

│ │ registered? │ │

│ └───────┬─────────────────┘ │

│ │ │

│ ┌────────┴────────┐ │

│ │ │ │

│ ▼ ▼ │

│ ┌──────────────────┐ ┌──────────────────┐ │

│ │ ⚠️ Duplicate │ │ ✅ Success │ │

│ │ Found │ │ │ │

│ │ │ │ Save to │ │

│ │ Prompt: "This │ │ database │ │

│ │ phone already │ │ ☁️ Supabase │ │

│ │ registered. │ │ │ │

│ │ Login instead?" │ │ Trigger: │ │

│ └───────┬───────────┘ │ - Welcome SMS │ │

│ │ │ - CBA │ │

│ │ │ notification │ │

│ ▼ └────────┬─────────┘ │

│ ┌──────────────────┐ │ │

│ │ Redirect to │ ▼ │

│ │ Login flow │ ┌──────────────────┐ │

│ └──────────────────┘ │ SUCCESS: │ │

│ │ Farmer Onboarded│ │

│ │ Digital ID │ │

│ │ Assigned │ │

│ └────────┬─────────┘ │

│ │ │

│ ▼ │

│ ┌──────────────────┐ │

│ │ Send Welcome │ │

│ │ SMS │ │

│ │ ✉️ │ │

│ └──────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

### **3.3 USSD Registration Flow (Detailed Steps)**

| Step | USSD Screen | User Input | Validation |
| --- | --- | --- | --- |
| 1 | "Welcome to AFAP. 1. Register 2. Login 0. Exit" | Selects 1 | \- |
| --- | --- | --- | --- |
| 2 | "Enter your full name:" | Types name | Not empty; min 2 chars |
| --- | --- | --- | --- |
| 3 | "Enter your village/town:" | Types village | Geocode lookup (approximate) |
| --- | --- | --- | --- |
| 4 | "Select main crop: 1. Maize 2. Sorghum 3. Groundnuts 4. Vegetables 5. Other" | Selects number | Valid option |
| --- | --- | --- | --- |
| 5 | "Enter farm size (hectares):" | Types number | Positive number |
| --- | --- | --- | --- |
| 6 | "Registration complete! Your ID is \[ABC123\]. Dial \*123# for services." | \- | \- |
| --- | --- | --- | --- |

### **3.4 Mobile App Registration Flow (Detailed Screens)**

| Screen | Elements | User Action | Notes |
| --- | --- | --- | --- |
| Onboarding | App logo, "Continue" button, Language selector, Role selector | Swipe through, select language, select "Farmer" | 3-4 screens |
| --- | --- | --- | --- |
| Create Account | Phone number input, "Send OTP" button | Enter phone number | OTP sent via SMS |
| --- | --- | --- | --- |
| Verify OTP | 4-6 digit input fields, "Verify" button | Enter OTP | Auto-read OTP if available |
| --- | --- | --- | --- |
| Farmer Details | Name, Village, Crop dropdown, Farm size, "Next" | Fill in fields | All fields required |
| --- | --- | --- | --- |
| GPS Capture | "Capture Location" button, Map preview, "Retry" | Tap button | GPS lock; shows coordinates |
| --- | --- | --- | --- |
| Upload Photos | Camera button, Gallery button, "Skip" | Take or upload photos | Optional but encouraged |
| --- | --- | --- | --- |
| Confirmation | Summary of details, "Submit" button | Review and tap "Submit" | Editable before submit |
| --- | --- | --- | --- |
| Success | Digital ID displayed, "Continue" button | \- | Welcome SMS sent |
| --- | --- | --- | --- |

## **4\. Journey 2: Input Ordering (Farmer → Agrodealer)**

### **4.1 Overview**

| User Type | Farmer |
| --- | --- |
| Channel | USSD (primary), Mobile App, SMS |
| --- | --- |
| ToR Reference | 4.3 Input Supply Chain Digitisation & AI Advisory |
| --- | --- |
| Success Criteria | Farmer successfully orders inputs; order is fulfilled by agrodealer |
| --- | --- |
| Average Duration | 2-3 minutes (USSD), 1-2 minutes (Mobile App) |
| --- | --- |

### **4.2 Detailed Journey Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ INPUT ORDERING FLOW │

│ │

│ START: Farmer needs inputs (fertiliser, seed, pesticide) │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ CHANNEL SELECTION │ │

│ │ │ │

│ │ Farmer dials \*123# OR Farmer opens mobile app │ │

│ │ (Feature phone) (Smartphone) │ │

│ └────────────────┬──────────────────────┬─────────────────────────────┘ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────────────┐ │

│ │ USSD Main │ │ App Home Dashboard │ │

│ │ Menu │ │ Tap "Order Inputs" │ │

│ │ Select: │ └────────────┬───────────┘ │

│ │ 3. Order │ │ │

│ │ Inputs │ │ │

│ └───────┬────────┘ │ │

│ │ ▼ │

│ └──────────────┬─────────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ View Product Catalogue │ │

│ │ │ │

│ │ USSD: │ Mobile: │

│ │ - Category list │ - Category grid │

│ │ - Product list │ - Product cards │

│ │ - Price + stock │ - Price + stock │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Select Product │ │

│ │ & Enter Quantity │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Add to Cart │ │

│ │ │ │

│ │ 🔀 Continue shopping? │ │

│ └────────────┬───────────┘ │

│ │ │

│ ┌────────┴────────┐ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────┐ │

│ │ Yes (loop) │ │ No │ │

│ │ Add more │ │ Proceed to │ │

│ │ products │ │ Checkout │ │

│ └────────────────┘ └───────┬────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Review Order │ │

│ │ │ │

│ │ - Product list │ │

│ │ - Quantities │ │

│ │ - Total amount │ │

│ │ - Delivery location │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Confirm Order │ │

│ │ │ │

│ │ 🔀 Does farmer have │ │

│ │ sufficient credit? │ │

│ └────────────┬───────────┘ │

│ │ │

│ ┌────────┴────────┐ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────┐ │

│ │ ⚠️ Credit │ │ ✅ Order │ │

│ │ Insufficient │ │ Confirmed │ │

│ │ │ │ │ │

│ │ Prompt to: │ │ ☁️ Save to │ │

│ │ 1. Apply for │ │ database │ │

│ │ credit │ │ │ │

│ │ 2. Reduce │ │ Trigger: │ │

│ │ quantity │ │ - SMS to │ │

│ │ 3. Cancel │ │ farmer │ │

│ └───────┬─────────┘ │ - Notification│ │

│ │ │ to agrodealer│ │

│ │ │ - CBA activity │ │

│ ▼ │ log │ │

│ ┌────────────────┐ └────────┬────────┘ │

│ │ User chooses │ │ │

│ │ option │ ▼ │

│ └────────────────┘ ┌──────────────────┐ │

│ │ SUCCESS: │ │

│ │ Order Placed │ │

│ │ Order ID: │ │

│ │ \[ORD-12345\] │ │

│ └──────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

### **4.3 Order Fulfillment (Agrodealer Side)**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ ORDER FULFILLMENT FLOW │

│ │

│ START: Agrodealer receives order notification │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ Agrodealer logs in (Web or Mobile) │ │

│ │ │ │

│ │ 📱 Mobile: Dashboard → Orders → Pending │ │

│ │ 💻 Web: Orders Queue (real-time) │ │

│ └─────────────────────────┬───────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ View Pending Order │ │

│ │ │ │

│ │ - Customer name │ │

│ │ - Product list │ │

│ │ - Quantity │ │

│ │ - Delivery location │ │

│ │ - Contact phone │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ 🔀 Check Stock │ │

│ │ │ │

│ │ Is stock sufficient? │ │

│ └────────────┬───────────┘ │

│ │ │

│ ┌────────┴────────┐ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────┐ │

│ │ ⚠️ Stock │ │ ✅ Stock │ │

│ │ Insufficient │ │ Sufficient │ │

│ │ │ │ │ │

│ │ 1. Partial │ │ Confirm order │ │

│ │ fulfil │ │ 🔌 Update │ │

│ │ 2. Backorder │ │ inventory │ │

│ │ 3. Decline │ │ │ │

│ └───────┬─────────┘ │ ☁️ Save │ │

│ │ │ status change │ │

│ │ └────────┬────────┘ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────┐ │

│ │ User selects │ │ Prepare for │ │

│ │ action │ │ Delivery │ │

│ └────────────────┘ │ │ │

│ │ - Schedule │ │

│ │ collection │ │

│ │ - Assign CBA │ │

│ │ - Generate │ │

│ │ invoice │ │

│ └────────┬────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────┐ │

│ │ Send SMS to │ │

│ │ Farmer │ │

│ │ ✉️ │ │

│ │ │ │

│ │ "Order ready │ │

│ │ for collection │ │

│ │ at \[location\]" │ │

│ └────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

## **5\. Journey 3: Credit Application & Approval**

### **5.1 Overview**

| User Type | Farmer |
| --- | --- |
| Channel | USSD, Mobile App, Web (assisted by CBA) |
| --- | --- |
| ToR Reference | 4.5 Financial Services Integration |
| --- | --- |
| Success Criteria | Farmer receives credit approval and disbursement |
| --- | --- |
| Average Duration | 5-10 minutes (application), 24-48 hours (approval) |
| --- | --- |

### **5.2 Detailed Journey Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ CREDIT APPLICATION FLOW │

│ │

│ START: Farmer needs credit for inputs │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ CHANNEL SELECTION │ │

│ │ │ │

│ │ Farmer dials \*123# OR Farmer opens mobile app │ │

│ │ Select: 4. Credit Services Tap "Apply for Credit" │ │

│ └────────────────┬──────────────────────┬─────────────────────────────┘ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────────────┐ │

│ │ USSD Menu │ │ Credit Dashboard │ │

│ │ 1. Apply │ │ - Current loans │ │

│ │ 2. My Loans │ │ - Application │ │

│ │ 3. Repay │ │ history │ │

│ └───────┬────────┘ │ - Apply now button │ │

│ │ └────────────┬───────────┘ │

│ └──────────────┬─────────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Start Application │ │

│ │ │ │

│ │ 📱 Mobile: Form │ │

│ │ 📞 USSD: Step-by-step │ │

│ │ questions │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Enter Application │ │

│ │ Details │ │

│ │ │ │

│ │ - Amount requested │ │

│ │ - Purpose (inputs, │ │

│ │ equipment, etc.) │ │

│ │ - Repayment period │ │

│ │ - Crop details │ │

│ │ (type, area, │ │

│ │ expected yield) │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ 🔌 Credit Scoring │ │

│ │ │ │

│ │ System calculates: │ │

│ │ - Alternative score │ │

│ │ (production │ │

│ │ history, │ │

│ │ repayment │ │

│ │ behaviour, │ │

│ │ delivery │ │

│ │ consistency) │ │

│ │ - Risk assessment │ │

│ │ │ │

│ │ 🟢 Score: \[X/100\] │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ 🔀 Score Threshold │ │

│ │ │ │

│ │ Is score ≥ minimum? │ │

│ └────────────┬───────────┘ │

│ │ │

│ ┌────────┴────────┐ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────┐ │

│ │ ⚠️ Score Too │ │ ✅ Score │ │

│ │ Low │ │ Sufficient │ │

│ │ │ │ │ │

│ │ Recommendations│ │ Submit to FI │ │

│ │ to improve: │ │ 🔌 Third- │ │

│ │ - Build │ │ party API │ │

│ │ transaction │ └────────┬────────┘ │

│ │ history │ │ │

│ │ - Repay small │ ▼ │

│ │ loans │ ┌────────────────┐ │

│ │ - Update farm │ │ FI Review │ │

│ │ profile │ │ (24-48 hrs) │ │

│ └───────┬─────────┘ └────────┬────────┘ │

│ │ ┌────────┴────────┐ │

│ │ │ │ │

│ ▼ ▼ ▼ │

│ ┌────────────────┐ ┌─────────────┐ ┌─────────────────┐ │

│ │ User chooses │ │ Approved │ │ Rejected │ │

│ │ to improve │ │ │ │ │ │

│ │ or cancel │ │ ☁️ Save │ │ ❌ Notify │ │

│ └────────────────┘ │ approval │ │ farmer │ │

│ │ │ │ with reason │ │

│ │ 🔌 Trigger │ └─────────────────┘ │

│ │ - SMS to │ │

│ │ farmer │ │

│ │ - FI │ │

│ │ disburs- │ │

│ │ ement │ │

│ │ - CBA │ │

│ │ notifica-│ │

│ │ tion │ │

│ └──────┬──────┘ │

│ │ │

│ ▼ │

│ ┌──────────────────┐ │

│ │ Disbursement │ │

│ │ 🔌 Payment API │ │

│ │ │ │

│ │ Funds sent to │ │

│ │ farmer's mobile │ │

│ │ wallet/bank │ │

│ └────────┬─────────┘ │

│ │ │

│ ▼ │

│ ┌──────────────────┐ │

│ │ Success SMS │ │

│ │ ✉️ │ │

│ │ │ │

│ │ "Congratulations│ │

│ │ on your loan │ │

│ │ approval!" │ │

│ └──────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

### **5.3 Credit Repayment Journey**

| Step | Action | Channel |
| --- | --- | --- |
| 1 | Farmer receives repayment reminder SMS | ✉️ SMS |
| --- | --- | --- |
| 2 | Farmer dials \*123# → Select "Repay" | 📞 USSD |
| --- | --- | --- |
| 3 | View outstanding balance | 📞 USSD / 📱 Mobile |
| --- | --- | --- |
| 4 | Select repayment amount | 📞 USSD / 📱 Mobile |
| --- | --- | --- |
| 5 | Confirm payment via mobile money | 🔌 Payment API |
| --- | --- | --- |
| 6 | Receive payment confirmation SMS | ✉️ SMS |
| --- | --- | --- |
| 7 | CBA/AFAP receives repayment update | 💻 Web |
| --- | --- | --- |

## **6\. Journey 4: Commodity Aggregation & Market Access**

### **6.1 Overview**

| User Type | Farmer → CBA → Buyer (Off-taker) |
| --- | --- |
| Channel | Mobile App, USSD, Web |
| --- | --- |
| ToR Reference | 4.4 Commodity Aggregation & Market Access |
| --- | --- |
| Success Criteria | Farmer sells produce; buyer receives quality produce; payment processed |
| --- | --- |
| Average Duration | 30 minutes - 2 days (depending on matching) |
| --- | --- |

### **6.2 Detailed Journey Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ COMMODITY AGGREGATION & MARKET ACCESS FLOW │

│ │

│ START: Farmer has produce to sell │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ FARMER LISTING PRODUCE │ │

│ │ │ │

│ │ 📱 Mobile: Home → "Sell Produce" │ │

│ │ 📞 USSD: Main Menu → 5. Sell Produce │ │

│ └─────────────────────────┬───────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Enter Listing Details │ │

│ │ │ │

│ │ - Crop type │ │

│ │ - Quantity (kg) │ │

│ │ - Quality grade │ │

│ │ - Expected price │ │

│ │ - Harvest date │ │

│ │ - Collection location │ │

│ │ (GPS) │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Create Listing │ │

│ │ │ │

│ │ ☁️ Save to database │ │

│ │ │ │

│ │ 🔌 Notify buyers │ │

│ │ (matching algorithm) │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Buyer Reviews │ │

│ │ Available Inventory │ │

│ │ │ │

│ │ 💻 Web Dashboard │ │

│ │ - View by crop/region │ │

│ │ - Sort by quantity │ │

│ │ / quality/price │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Buyer Places Order │ │

│ │ │ │

│ │ - Select listing │ │

│ │ - Enter desired │ │

│ │ quantity │ │

│ │ - Propose price │ │

│ │ - Delivery location │ │

│ │ & timeline │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Farmer Reviews Offer │ │

│ │ │ │

│ │ 📱 Mobile: Notification│ │

│ │ 📞 USSD: Alert │ │

│ │ ✉️ SMS: "You have an │ │

│ │ offer!" │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ 🔀 Accept Offer? │ │

│ └────────────┬───────────┘ │

│ │ │

│ ┌────────┴────────┐ │

│ │ │ │

│ ▼ ▼ │

│ ┌────────────────┐ ┌────────────────┐ │

│ │ ❌ Decline │ │ ✅ Accept │ │

│ │ │ │ │ │

│ │ Notify buyer │ │ Digital │ │

│ │ Listing │ │ Contract │ │

│ │ remains active │ │ Generated │ │

│ └────────────────┘ └────────┬────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────┐ │

│ │ Delivery │ │

│ │ Arrangement │ │

│ │ │ │

│ │ - CBA │ │

│ │ coordinates │ │

│ │ - Agrodealer │ │

│ │ collects │ │

│ │ - Farmer │ │

│ │ delivers to │ │

│ │ aggregation │ │

│ │ point │ │

│ └────────┬────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────┐ │

│ │ Delivery │ │

│ │ Confirmation │ │

│ │ │ │

│ │ 📱 CBA scans │ │

│ │ QR code │ │

│ │ │ │

│ │ Electronic │ │

│ │ Receipt │ │

│ │ Generated │ │

│ └────────┬────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────┐ │

│ │ Payment │ │

│ │ Processing │ │

│ │ │ │

│ │ 🔌 Payment API │ │

│ │ │ │

│ │ - Buyer pays │ │

│ │ into │ │

│ │ escrow │ │

│ │ - Released to │ │

│ │ farmer on │ │

│ │ delivery │ │

│ │ confirmation│ │

│ └────────┬────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────┐ │

│ │ Success SMS │ │

│ │ ✉️ │ │

│ │ │ │

│ │ "Sale │ │

│ │ completed! │ │

│ │ Payment of │ │

│ │ R\[amount\] │ │

│ │ received." │ │

│ └────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

## **7\. Journey 5: AFAP Staff Monitoring & Reporting**

### **7.1 Overview**

| User Type | AFAP Programme Staff |
| --- | --- |
| Channel | Web Portal (primary) |
| --- | --- |
| ToR Reference | 4.6 Monitoring, Evaluation & Traceability |
| --- | --- |
| Success Criteria | Staff can view real-time programme data and generate reports |
| --- | --- |
| Average Duration | 5-15 minutes per session |
| --- | --- |

### **7.2 Detailed Journey Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ AFAP STAFF MONITORING & REPORTING FLOW │

│ │

│ START: AFAP staff logs into web portal │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ 💻 Login │ │

│ │ │ │

│ │ - Email + Password │ │

│ │ - 2FA (optional) │ │

│ │ - Role: AFAP Admin / Programme Manager / M&E Officer │ │

│ └─────────────────────────┬───────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Dashboard │ │

│ │ │ │

│ │ - KPI cards: │ │

│ │ • Total farmers │ │

│ │ • Active farmers │ │

│ │ • Orders this month │ │

│ │ • Credit approved │ │

│ │ • Sales volume │ │

│ │ - Charts: │ │

│ │ • Registrations │ │

│ │ over time │ │

│ │ • Orders by region │ │

│ │ • Credit by crop │ │

│ │ - Recent activity │ │

│ │ feed │ │

│ └────────────┬───────────┘ │

│ │ │

│ ▼ │

│ ┌────────────────────────┐ │

│ │ Choose Action │ │

│ │ │ │

│ │ 1. View Farmer List │ │

│ │ 2. View Orders │ │

│ │ 3. View Credit │ │

│ │ Portfolio │ │

│ │ 4. Generate Report │ │

│ │ 5. View Traceability │ │

│ │ 6. Manage Users │ │

│ └──────┬─────────────────┘ │

│ │ │

│ ▼ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ REPORT GENERATION FLOW │ │

│ │ │ │

│ │ 1. Select report type: │ │

│ │ - Programme summary │ │

│ │ - Farmer registration │ │

│ │ - Input distribution │ │

│ │ - Credit portfolio │ │

│ │ - Market sales │ │

│ │ - Donor report (custom) │ │

│ │ │ │

│ │ 2. Select filters: │ │

│ │ - Date range │ │

│ │ - Region │ │

│ │ - Crop type │ │

│ │ - CBA assigned │ │

│ │ - Agrodealer │ │

│ │ │ │

│ │ 3. Preview data: │ │

│ │ - Table view │ │

│ │ - Chart preview │ │

│ │ - Summary statistics │ │

│ │ │ │

│ │ 4. Export: │ │

│ │ - PDF (with branding) │ │

│ │ - Excel/CSV (raw data) │ │

│ │ - Email to recipient │ │

│ │ │ │

│ │ 5. Schedule (optional): │ │

│ │ - Daily, weekly, monthly │ │

│ │ - Auto-email to stakeholders │ │

│ └─────────────────────────────────────────────────────────────────────┘ │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ TRACEABILITY FLOW │ │

│ │ │ │

│ │ 1. Enter input batch ID or farmer ID │ │

│ │ │ │

│ │ 2. View chain: │ │

│ │ Input → Agrodealer → Farmer → Production → Harvest → Sale │ │

│ │ │ │

│ │ 3. Visual timeline with statuses │ │

│ │ │ │

│ │ 4. Export traceability report │ │

│ │ (PDF with QR code for verification) │ │

│ └─────────────────────────────────────────────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

## **8\. Journey 6: User Adoption & Training (CBA-Led)**

### **8.1 Overview**

| User Type | CBA → Farmer (train-the-trainer model) |
| --- | --- |
| Channel | In-person, Mobile App, USSD, SMS |
| --- | --- |
| ToR Reference | 4.7 Capacity Building & Ecosystem Facilitation |
| --- | --- |
| Success Criteria | Farmer confidently uses platform independently |
| --- | --- |
| Average Duration | 30-60 minutes (training session) |
| --- | --- |

### **8.2 Detailed Journey Flow**

text

┌─────────────────────────────────────────────────────────────────────────────┐

│ USER ADOPTION & TRAINING FLOW │

│ │

│ START: New farmer registered; training scheduled │

│ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ STEP 1: CBA Preparation │ │

│ │ │ │

│ │ - CBA receives farmer assignment │ │

│ │ - CBA reviews farmer profile (crop, location, literacy) │ │

│ │ - CBA downloads training materials (mobile app) │ │

│ │ - CBA schedules in-person session │ │

│ └─────────────────────────┬───────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ STEP 2: In-Person Training Session │ │

│ │ │ │

│ │ CBA walks farmer through: │ │

│ │ │ │

│ │ 1. USSD basics (dial \*123#) │ │

│ │ - Farmer practices dialing and navigating menu │ │

│ │ │ │

│ │ 2. Registration (if not already done) │ │

│ │ - CBA assists with first registration │ │

│ │ │ │

│ │ 3. How to order inputs │ │

│ │ - Farmer places first order with CBA guidance │ │

│ │ │ │

│ │ 4. How to check advisory │ │

│ │ - Farmer receives first crop tip │ │

│ │ │ │

│ │ 5. How to apply for credit │ │

│ │ - CBA explains process and eligibility │ │

│ │ │ │

│ │ 6. How to sell produce │ │

│ │ - CBA explains listing and matching │ │

│ └─────────────────────────┬───────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ STEP 3: Practice & Reinforcement │ │

│ │ │ │

│ │ - Farmer practices independently with CBA observing │ │

│ │ - CBA corrects mistakes │ │

│ │ - CBA sends follow-up SMS reminders │ │

│ │ ✉️ "Remember: Dial \*123# to check your credit balance." │ │

│ │ │ │

│ │ - Farmer receives "cheat sheet" (pictorial guide) │ │

│ │ (📱 Mobile app has built-in tutorials) │ │

│ └─────────────────────────┬───────────────────────────────────────────┘ │

│ │ │

│ ▼ │

│ ┌─────────────────────────────────────────────────────────────────────┐ │

│ │ STEP 4: Follow-Up & Support │ │

│ │ │ │

│ │ 1. CBA monitors farmer activity in dashboard │ │

│ │ - If inactive > 7 days: CBA sends SMS check-in │ │

│ │ - If order issues: CBA follows up │ │

│ │ - If payment overdue: CBA reminds farmer │ │

│ │ │ │

│ │ 2. CBA schedules refresher training: │ │

│ │ - Monthly group sessions │ │

│ │ - Quarterly advanced training │ │

│ │ │ │

│ │ 3. Farmer becomes "champion" │ │

│ │ - Advanced farmers train other farmers │ │

│ │ - Incentives for champions (bonus inputs, recognition) │ │

│ └─────────────────────────────────────────────────────────────────────┘ │

└─────────────────────────────────────────────────────────────────────────────┘

## **9\. Channel Matrix Summary**

| User Type | USSD | SMS | Mobile App | Web Portal |
| --- | --- | --- | --- | --- |
| Farmer | ✅ Primary | ✅ Alert | ✅ Smartphone | ❌ |
| --- | --- | --- | --- | --- |
| CBA | ❌ | ✅ Alert | ✅ Primary | ✅ Optional |
| --- | --- | --- | --- | --- |
| Agrodealer | ❌ | ✅ Alert | ✅ Primary | ✅ Optional |
| --- | --- | --- | --- | --- |
| Financial Institution | ❌ | ❌ | ❌ | ✅ Primary |
| --- | --- | --- | --- | --- |
| Off-taker / Buyer | ❌ | ❌ | ❌ | ✅ Primary |
| --- | --- | --- | --- | --- |
| AFAP Staff | ❌ | ❌ | ❌ | ✅ Primary |
| --- | --- | --- | --- | --- |

## **10\. Offline & Edge Case Scenarios**

### **10.1 Offline Scenarios (Mobile App)**

| Scenario | Behaviour | Recovery |
| --- | --- | --- |
| No network during registration | Save farmer data locally; show "offline" indicator | Auto-sync when network restored; notify user |
| --- | --- | --- |
| No network during order | Queue order locally; show "pending sync" | Auto-submit when network restored; notify agrodealer |
| --- | --- | --- |
| No network during GPS capture | Use last known location; allow manual entry | Re-sync GPS when network restored |
| --- | --- | --- |
| No network for advisory | Show cached advisory content; indicate stale | Auto-refresh when network restored |
| --- | --- | --- |

### **10.2 Edge Case Scenarios**

| Scenario | Handling |
| --- | --- |
| Farmer enters wrong USSD input | "Invalid selection. Please choose a number from the list." |
| --- | --- |
| USSD session times out | Auto-save progress; resume on next dial |
| --- | --- |
| Phone number already registered | "This number is already registered. Please login or contact your CBA." |
| --- | --- |
| Agrodealer out of stock | "Product out of stock. Please select alternative or check back later." |
| --- | --- |
| Credit application rejected | "Your application was declined. Reason: \[reason\]. You can reapply in 30 days." |
| --- | --- |
| Farmer forgot digital ID | "Enter your phone number to retrieve your ID." |
| --- | --- |
| Duplicate listing | "You already have an active listing for this crop. Edit or cancel before creating a new one." |
| --- | --- |

## **11\. Future Enhancements (Phase 4+)**

| Enhancement | Description | Channel |
| --- | --- | --- |
| Voice-based USSD | Voice recognition for low-literacy users | 📞 USSD |
| --- | --- | --- |
| AI Chatbot | 24/7 automated support for farmers | 📱 Mobile |
| --- | --- | --- |
| IoT Sensor Integration | Soil sensors, weather stations | 🔌 Integration |
| --- | --- | --- |
| Blockchain Traceability | Immutable supply chain records | 💻 Web |
| --- | --- | --- |
| Gamification | Points, badges, leaderboards for farmers | 📱 Mobile |
| --- | --- | --- |
| Peer-to-Peer Lending | Farmer-to-farmer credit | 📱 Mobile |
| --- | --- | --- |

## **12\. Appendix: Journey Map Visuals**

### **A. Farmer Onboarding Journey (Simplified Visual)**

text

Farmer hears about AFAP

│

▼

Dial \*123# or download app

│

▼

Enter registration details

│

▼

GPS farm location captured

│

▼

Digital ID generated

│

▼

Welcome SMS received

│

▼

Farmer can access all services

### **B. Input Ordering Journey (Simplified Visual)**

text

Farmer needs inputs

│

▼

Browse catalogue

│

▼

Add to cart

│

▼

Review order

│

▼

Confirm order

│

▼

SMS confirmation

│

▼

Agrodealer fulfills

│

▼

Farmer collects

## **13\. Document Version History**

| Version | Date | Author | Changes |
| --- | --- | --- | --- |
| 1.0 | \[Date\] | Kabelo | Initial draft |
| --- | --- | --- | --- |
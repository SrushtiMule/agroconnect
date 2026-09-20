# 🌾 AgroConnect — Modern Farmer-to-Buyer Digital Marketplace

**AgroConnect** is an enterprise-grade digital agriculture marketplace connecting Indian farmers directly with retail consumers, restaurants, grocery chains, food processors, and wholesale trade. By bypassing commission agents and traditional APMC bottlenecks, AgroConnect empowers farmers with up to 35% higher price realization and provides buyers with 100% fresh, traceable, lab-tested agricultural produce with RBI-compliant Escrow buyer protection.

---

## 🚀 Key Features

### 1. 🍃 Premium Agriculture Visual Identity
- **Palette**: Forest Emerald (`#1B4D3E`), Leaf Green (`#16A34A`), Harvest Gold (`#D97706`), Warm Cream (`#FBF9F4`), Slate Dark Accents.
- **Design Highlights**: Glassmorphic sticky navigation, live APMC ticker, responsive 1440px desktop layout, mobile bottom navigation, micro-interactions, smooth hover lifts, and celebration confetti.

### 2. 🏪 Deep-Faceted Farm Marketplace
- **Search & Filters**: Instant multi-keyword search, category picker (10+ sectors), state/district filtering, price range slider, 100% Organic toggle, quality grade selector (Grade A+, A, B), and verified farmer filter.
- **Produce Detail View**: Multi-image thumbnail gallery, tiered wholesale bulk pricing calculator (e.g. 50kg+, 200kg+, 1000kg+ discounts), MOQ quantity adjuster `[-] 10 KG [+]`, lab testing & soil specifications, farmer provenance card, and verified buyer reviews.

### 3. 🗺️ Interactive Maps & Visual Live Order Tracking
- **OpenStreetMap & Leaflet Farm Map**: Interactive geospatial map displaying verified farm hubs across Maharashtra, Punjab, Karnataka, Gujarat, Madhya Pradesh, Andhra Pradesh, and Uttar Pradesh.
- **5-Stage Visual Order Stepper**: Live tracking from `Order Placed` ➔ `Farmer Confirmed` ➔ `Harvest Packed` ➔ `Out for Delivery` ➔ `Delivered & Escrow Released` with live temperature van route visualization.

### 4. 📈 Real-Time Agriculture Intelligence
- **Daily APMC Mandi Price Hub**: Real-time commodity rates across major Indian mandis (Lasalgaon, Khanna, Solapur, Indore, Guntur, Rajkot) with min/max/modal prices, trend arrows ($\uparrow \downarrow$), and interactive Recharts price trend line graphs.
- **Agri-Weather & Micro-Climate Advisory**: Hyper-local district weather conditions (temperature, humidity, rainfall probability, wind speed, soil moisture) and AI crop spray advisories.
- **Agri Knowledge & Govt Schemes**: Comprehensive guides on PM-KISAN DBT, PM Fasal Bima Yojana (PMFBY), Soil Health Card, and Zero Budget Natural Farming (ZBNF).

### 5. 💬 Real-Time Farmer-Buyer Chat & Negotiation
- Direct messaging between buyers and growers with embedded produce cards, quick response suggestion chips, and interactive **Make an Offer / Bulk Rate Bargaining** modal.

### 6. 🧑‍🌾 Dedicated Portals
- **Farmer Dashboard**: Sales metrics, monthly revenue Recharts graphs, crop share breakdown, inventory management with quick price adjustment, 4-step crop listing wizard with image dropzone, and IMPS escrow payout withdrawals.
- **Multi-Step Farmer Registration (KYC)**: 4-step onboarding wizard (01 Personal ➔ 02 Farm Info ➔ 03 7/12 Land Record & Bank IFSC ➔ 04 Agriculture Profile).
- **Admin Command Desk**: Platform GMV analytics, farmer KYC document inspection modal with one-click Approve / Reject, product moderation desk, and dispute resolution.
- **1-Click Demo Role Switcher**: Top banner allows instant 1-click role switching between:
  - **Rajesh Patil** (Progressive Farmer - Nashik)
  - **Priya Sharma** (Retail Consumer - Pune)
  - **Vikram Mehta** (Wholesale Grain & Spice Trader - Mumbai APMC)
  - **Operations Desk** (Admin Console)

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, Framer Motion, Recharts, OpenStreetMap + Leaflet, Canvas Confetti.
- **Backend**: Node.js, Express.js, TypeScript, CORS, RESTful API.
- **Database**: Full production MySQL 8.0+ Schema (`server/database/schema.sql` with 18 relational tables, foreign keys, indexes, triggers) + in-memory seed engine for immediate zero-setup execution.

---

## 📂 Project Structure

```
agroconnect/
├── client/                     # Vite + React + TypeScript Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, DemoRoleBanner, Badge, RatingStars
│   │   │   ├── marketplace/    # ProductCard, FilterPanel, PriceTicker
│   │   │   ├── maps/           # FarmMapLeaflet, DeliveryTrackerMap
│   │   │   ├── weather/        # WeatherWidget
│   │   │   └── mandi/          # MandiPriceWidget
│   │   ├── context/            # AuthContext, AgriDataContext, CartContext, WishlistContext
│   │   ├── data/               # Indian agriculture dataset (Farmers, Crops, APMC prices)
│   │   ├── pages/              # Home, Marketplace, ProductDetail, Categories, Farmers,
│   │   │                       # FarmerRegistration, Cart, Checkout, OrderTracking, Orders,
│   │   │                       # Messages, MarketPrices, WeatherAdvisory, AgriKnowledge,
│   │   │                       # About, Contact, Notifications, Profile, Login, Register,
│   │   │                       # farmer/ (Dashboard, Products, AddProduct, Orders, Payments),
│   │   │                       # admin/ (Dashboard, Verification, Complaints)
│   │   ├── types/              # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tailwind.config.js
│   └── package.json
├── server/                     # Node.js + Express Backend
│   ├── database/
│   │   ├── schema.sql          # 18-Table Production MySQL Schema
│   │   └── seed.sql            # Realistic Indian Agriculture SQL Inserts
│   ├── src/
│   │   ├── data/               # Seed data records
│   │   └── index.ts            # REST API Server
│   └── package.json
└── README.md
```

---

## ⚡ How to Run

### 1. Client Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

### 2. Backend Server (Express REST API)
```bash
cd server
npm install
npm run dev
```
API runs on **http://localhost:5000/api**.

### 3. MySQL Database (Optional for production MySQL deployment)
Run `schema.sql` and `seed.sql` located inside `server/database/` into your MySQL 8.0 instance:
```bash
mysql -u root -p < server/database/schema.sql
mysql -u root -p < server/database/seed.sql
```

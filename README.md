# AgriTech Platform

A modular, multi-channel platform for agricultural value chain digitisation.

---

## 📁 Project Structure

| Folder      | Purpose                           | Tech Stack                             |
| :---------- | :-------------------------------- | :------------------------------------- |
| `backend/`  | API Server + USSD/SMS Integration | Node.js + Express + PostgreSQL (Aiven) |
| `web/`      | Admin Dashboard                   | React + Vite + TypeScript              |
| `mobile/`   | Farmer Mobile App                 | Expo + React Native                    |
| `database/` | PostgreSQL Schema + Migrations    | PostgreSQL (Aiven)                     |
| `docs/`     | Project Documentation             | Markdown                               |

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/kpmatlakala/agritech-platform.git
cd agritech-platform
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Configure Environment Variables

Copy the example environment files:

```bash
cp backend/.env.example backend/.env
cp web/.env.example web/.env
cp mobile/.env.example mobile/.env
```

Configure each file with the appropriate values.

| File           | Description                                                   |
| :------------- | :------------------------------------------------------------ |
| `backend/.env` | Database connection, JWT secret, Africa's Talking credentials |
| `web/.env`     | API URL, map tile configuration                               |
| `mobile/.env`  | API URL                                                       |

---

### 4. Start the Development Environment

Run all services:

```bash
npm run dev:all
```

Or start each service individually:

```bash
npm run dev:backend
```

Starts the backend API (default: `http://localhost:3000`)

```bash
npm run dev:web
```

Starts the web dashboard (default: `http://localhost:5173`)

```bash
npm run dev:mobile
```

Starts the Expo development server.

After Expo starts:

* Press **a** for Android
* Press **i** for iOS
* Press **w** for Web

---

## 🔧 Environment Variables

| File           | Purpose                                       |
| :------------- | :-------------------------------------------- |
| `backend/.env` | Database, JWT, Africa's Talking configuration |
| `web/.env`     | API URL and map configuration                 |
| `mobile/.env`  | API URL                                       |

---

## 🛠️ Technology Stack

| Layer         | Technology                       |
| :------------ | :------------------------------- |
| Backend       | Node.js + Express (TypeScript)   |
| Database      | PostgreSQL (Aiven)               |
| USSD/SMS      | Africa's Talking                 |
| Web Dashboard | React + Vite (TypeScript)        |
| Mobile App    | Expo + React Native (TypeScript) |
| Maps          | Leaflet + OpenStreetMap          |

---

## 👥 Team

| Member           | Responsibility                            |
| :--------------- | :---------------------------------------- |
| ** Name**    | Backend Development & System Architecture |
| ** Name** | Web Dashboard & Mobile Development        |

---b


## 📦 Useful Commands

```bash
# Clone the repository
git clone https://github.com/yourusername/agritech-platform.git
cd agritech-platform

# Install all dependencies
npm run install:all

# Configure environment variables
cp backend/.env.example backend/.env
cp web/.env.example web/.env
cp mobile/.env.example mobile/.env

# Start all services
npm run dev:all

# Start services individually
npm run dev:backend
npm run dev:web
npm run dev:mobile
```

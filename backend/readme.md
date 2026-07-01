# AgriTech Backend

Node.js + Express API server for the AgriTech Platform.

---

## 🚀 Tech Stack

* Node.js
* Express.js (TypeScript)
* PostgreSQL (Aiven)
* Africa's Talking (USSD/SMS)
* CORS
* dotenv

---

## 📦 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file and provide the required credentials.

### 3. Start the Development Server

```bash
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint               | Purpose                       |
| :----- | :--------------------- | :---------------------------- |
| `POST` | `/api/farmer/register` | Register a new farmer         |
| `GET`  | `/api/farmer/:id`      | Retrieve farmer details       |
| `GET`  | `/api/farmers`         | List all farmers              |
| `GET`  | `/api/farmers/export`  | Export farmer data as CSV     |
| `POST` | `/ussd/callback`       | Africa's Talking USSD webhook |

---

## ⚙️ Environment Variables

See `.env.example` for the complete list of required environment variables.

Typical variables include:

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=
AFRICASTALKING_USERNAME=
AFRICASTALKING_API_KEY=
```

---

## 📜 Package Scripts

```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── models/
│   └── index.ts
├── .env.example
├── package.json
└── tsconfig.json
```

---

## 🩺 Health Check Endpoint

```http
GET /health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "2026-06-29T12:34:56.789Z"
}
```

---

## 📝 Example `src/index.ts`

```typescript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
```

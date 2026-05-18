# 📊 Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack, clean architecture, and end-to-end TypeScript.

---

## 🔗 Production Deployments

- **Frontend:** [https://smart-leads-dashboard-eta.vercel.app/](https://smart-leads-dashboard-eta.vercel.app/)
- **Backend API:** [https://smart-leads-dashboard-api.onrender.com](https://smart-leads-dashboard-upx5.onrender.com)
- > ⚠️ Hosted on Render's free tier — the server may take **50–60 seconds** to spin up on the first request if inactive.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, TailwindCSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB + Mongoose ODM
- **DevOps:** Docker, Docker Compose

---

## 🚀 Features

### 🔐 1. Authentication System
Secure JWT-based user authentication.
- **User Registration:** Provision new user accounts securely.
- **User Login:** Validate credentials and return JWT access tokens.
- **Protected Routes:** Restrict dashboard access to authenticated users only.
- **Password Hashing:** Passwords are hashed with `bcrypt` before storage.
- **Auth Middleware:** Parses and verifies JWT on protected endpoints.

### 📋 2. Leads Management (CRUD)
Full lead lifecycle management interface.
- **Actions:** Create, Update, Delete, List, and View individual leads.
- **Lead Fields:**
  - **Name**
  - **Email**
  - **Status:** `New`, `Contacted`, `Qualified`, `Lost`
  - **Source:** `Website`, `Instagram`, `Referral`
  - **Created At**

### 🔍 3. Advanced Filtering & Search
- Filter by **Status** and **Source** simultaneously.
- Text search across **Name** and **Email** fields.
- Sort by **Latest** or **Oldest**.

### 🔢 4. Server-Side Pagination
- 10 records per page using database `skip` / `limit`.
- API response includes total count, current page, and total pages.

### 🛡️ 5. Role-Based Access Control (RBAC)
- **Admin:** Full access including lead deletion.
- **Sales:** Read/write access only — no delete.

### ⚙️ 6. Utilities
- **Debounced Search:** Prevents API spam on every keystroke.
- **CSV Export:** Download the active lead list as a spreadsheet.
- **Dark Mode:** Adaptive theme toggle across all components.

---

## 📂 Project Structure

```text
InternProj/
├── backend/
│   ├── src/
│   │   ├── config/           # DB connection
│   │   ├── controllers/      # Route handlers
│   │   ├── middleware/       # JWT auth & role guards
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API route definitions
│   │   └── server.ts         # App entry point
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/       # UI components
│   │   ├── context/          # Auth context
│   │   └── main.tsx          # App entry point
│   ├── .dockerignore
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

---

## 🔑 Environment Variables

### `/backend/.env`

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/SmartLeadsDB?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### `/frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
```

---

## 🐳 Docker Setup

> Requires Docker Desktop to be running.

**1. Navigate to the project root:**

```bash
cd InternProj
```

**2. Build and start all containers:**

```bash
docker compose up --build
```

**3. Access the running services:**

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000/health |

---

## 🛠️ Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📑 API Reference

Base URL: `http://localhost:5000`

### 🔐 Auth — `/api/auth`

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and get JWT |
| `PUT` | `/api/auth/profile` | 🔒 JWT | Update user profile |
| `POST` | `/api/auth/google` | Public | OAuth via Google |
| `POST` | `/api/auth/github` | Public | OAuth via GitHub |

### 📋 Leads — `/api/leads`

> All routes require JWT authentication.

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| `GET` | `/api/leads` | 🔒 JWT | List leads (paginated) |
| `POST` | `/api/leads` | 🔒 JWT | Create a new lead |
| `GET` | `/api/leads/:id` | 🔒 JWT | Get lead by ID |
| `PUT` | `/api/leads/:id` | 🔒 JWT | Update lead by ID |
| `DELETE` | `/api/leads/:id` | 🔒 Admin | Delete lead by ID |

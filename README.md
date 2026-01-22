# MERN RBAC Project Manager

A full-stack Project Management Dashboard with strict Role-Based Access Control (RBAC), built with **React**, **Node.js**, **Express**, **MongoDB**, and **TypeScript**.

## 🚀 Features

*   **Role-Based Access Control (RBAC):**
    *   **Admin:** Full access (manage users, create/edit/delete projects).
    *   **Staff:** Restricted access (view projects, create projects, view-only mode for critical actions).
*   **Authentication & Security:**
    *   JWT-based Auth with **Access Tokens (15m)** and **HTTP-Only Refresh Tokens (7d)**.
    *   Secure "Invite-only" registration flow.
    *   Frontend Route Guards & UI conditional rendering.
    *   Backend Middleware protection.
*   **Data Management:**
    *   **Soft Delete:** Projects are never permanently deleted, just marked as inactive.
    *   **Audit Logging:** Tracks critical actions (Project Creation, User Role Updates, etc.).
*   **Modern UI/UX:**
    *   Built with **Tailwind CSS** and **Shadcn UI** concepts (Zinc/Glass aesthetic).
    *   Responsive Sidebar & Dashboard with Stat Widgets.
    *   Centralized Error Boundary for graceful crash handling.

## 🛠️ Tech Stack

*   **Frontend:** React (Vite), TypeScript, Tailwind CSS, TanStack Query, React Router DOM, Axios.
*   **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Zod (Validation), Helmet (Security).

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB Instance (Local or Atlas)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd mern-rbac-project-manager
```

### 2. Install Dependencies
We use a monorepo structure. You can install all dependencies from the root:
```bash
npm run install:all
```

### 3. Environment Configuration
You need to set up environment variables for both Backend and Frontend.

**Backend:**
```bash
cd backend
cp .env.example .env
```
*   Update `MONGO_URI` in `backend/.env` with your connection string.
*   Ensure `FRONTEND_URL` is set to `http://localhost:5173`.

**Frontend:**
```bash
cd ../frontend
cp .env.example .env
```
*   Ensure `VITE_API_URL` is set to `http://localhost:3000`.

### 4. Seeding Data (Initial Admin)
Return to the root directory and run the seed script to create the **Super Admin** (`admin@example.com` / `password123`) and sample data:

```bash
cd ..
npm run seed
```

### 5. Run the Application
Start both Backend and Frontend concurrently with one command:
```bash
npm run dev
```

*   **Backend API:** `http://localhost:3000`
*   **Frontend UI:** `http://localhost:5173`

## 🏗️ Architecture

### Monorepo Structure
*   `frontend/`: SPA built with React. Feature-based folder structure (`features/`, `components/`, `pages/`).
*   `backend/`: REST API. Layered architecture:
    *   **Controllers:** Handle HTTP Req/Res.
    *   **Services:** Business Logic (e.g., Soft Delete logic, User filtering).
    *   **Models:** Database Schema & Middleware (e.g., `pre('find')` hooks).

### RBAC Implementation
1.  **Backend:** `verifyToken` middleware validates identity. `verifyAdmin` middleware checks `user.role === 'ADMIN'`.
2.  **Frontend:** `RoleGuard` component protects routes. `isAdmin` checks control UI element visibility.

### Authentication Flow
1.  **Login:** Returns short-lived `accessToken` (JSON) and long-lived `refreshToken` (HTTP-Only Cookie).
2.  **Token Expiry:** Axios Interceptor detects `401 TokenExpired`.
3.  **Refresh:** Interceptor calls `/auth/refresh-token`. Backend validates cookie -> issues new `accessToken`. Frontend retries original request transparently.

## ⚖️ Trade-offs & Assumptions

*   **Soft Delete:** We assume deleted data might need to be recovered or audited, so we implemented soft deletes (`isDeleted: true`). The `find` query middleware filters these out by default.
*   **Invite Flow:** We assumed a closed system where users cannot simply "Sign Up". They must be invited by an Admin. The `RegisterPage` validates a token before allowing account creation.
*   **Dashboard Stats:** The dashboard shows "Total Users" and "Active Projects". We assume "Active Projects" means non-deleted projects, regardless of their status (ACTIVE/ARCHIVED).
*   **Testing:** Refresh Token expiry is set to **15m** (production-like) but was tested with **30s** during dev to ensure the interceptor works.

## 🛡️ Environment Variables

See `.env.example` in both folders for details.

**Backend (`backend/.env`):**
```ini
PORT=3000
MONGO_URI=...
JWT_SECRET=...
REFRESH_TOKEN_SECRET=...
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend (`frontend/.env`):**
```ini
VITE_API_URL=http://localhost:3000
```

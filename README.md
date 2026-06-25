# SASS

A full-stack SaaS application built with modern web technologies.

The project follows a monorepo architecture and contains both frontend and backend applications.

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT Authentication
- bcrypt

---

# Project Structure

```bash
sass/
├── frontend/     # Next.js application
├── backend/      # Express API server
└── README.md
```

---

# Authentication Architecture

The authentication system follows a secure Access Token + Refresh Token strategy.

## Access Token

- JWT based
- Short-lived
- Stored in memory on the client
- Sent in the Authorization header

```http
Authorization: Bearer <access_token>
```

Purpose:

- authenticate API requests
- minimize exposure in case of XSS attacks

---

## Refresh Token

- JWT based
- Long-lived
- Stored as HttpOnly Cookie
- Cannot be accessed by JavaScript

Cookie settings:

```ts
{
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
}
```

Purpose:

- issue new access tokens
- maintain user sessions securely

---

# Authentication Flow

## Sign Up / Sign In

1. User submits credentials.
2. Backend validates credentials.
3. Backend generates:

   - Access Token
   - Refresh Token

4. Refresh Token is stored in HttpOnly Cookie.
5. Access Token is returned in response.
6. Frontend stores Access Token in memory.

---

## Protected API Request

1. Frontend attaches Access Token.

```http
Authorization: Bearer <access_token>
```

2. Backend validates token.
3. Request proceeds if token is valid.

---

## Access Token Expiration

When an access token expires:

1. API returns `401 Unauthorized`.
2. Axios interceptor catches the error.
3. Frontend calls:

```http
POST /auth/refresh
```

4. Backend validates Refresh Token.
5. New Access Token is issued.
6. Original request is retried automatically.

---

# Refresh Token Rotation

Every successful refresh operation:

1. Current refresh token is revoked.
2. New refresh token is generated.
3. New refresh token is persisted.
4. Cookie is replaced.

Benefits:

- prevents token replay attacks
- improves session security

---

# Axios Interceptor Features

The frontend Axios instance automatically:

- attaches access tokens
- handles expired tokens
- refreshes tokens transparently
- queues concurrent requests during refresh
- retries failed requests
- redirects users to sign-in if refresh fails

---

# Running Locally

## Backend

```bash
cd backend
pnpm install
pnpm dev
```

Runs on:

```bash
http://localhost:4000
```

---

## Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Runs on:

```bash
http://localhost:3000
```

---

# Environment Variables

## Backend

```env
PORT=4000

DATABASE_URL=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

# Features

- User Registration
- User Login
- JWT Authentication
- Access Token Authentication
- Refresh Token Rotation
- Automatic Token Refresh
- Protected Routes
- Secure Cookie Authentication
- Form Validation
- Type-safe API Layer

---

# Roadmap

- [x] Authentication
- [ ] Role Based Access Control
- [ ] Email Verification
- [ ] Password Reset
- [ ] User Profile Management
- [ ] File Uploads
- [ ] Real-time Features
- [ ] Dashboard

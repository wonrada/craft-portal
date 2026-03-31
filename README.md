# CraftPortal

> A real-time project tracking SaaS built for design firms — so clients never have to chase their designer again.

CraftPortal gives design studios a white-label client portal where customers can log in and see exactly where their project stands, browse mood boards, and approve design concepts — all without sending a single LINE message or making a phone call.

**For designers:** fewer interruptions, happier clients, and a professional delivery experience.
**For clients:** full visibility into their project at any time, from any device.

---

## Features

- Real-time project stage tracking
- Mood board viewer
- Design concept selection & approval workflow
- Client-facing portal with role-based access
- Multi-project support per client

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend framework | Laravel 13 |
| Backend language | PHP 8.3+ |
| Frontend framework | Vue 3 |
| Frontend language | TypeScript 5 |
| Build tool | Vite 8 |
| CSS framework | Tailwind CSS 4 |
| State management | Pinia |
| Client-side routing | Vue Router 4 |
| HTTP client | Axios |
| Package manager (FE) | Bun |
| Package manager (BE) | Composer |
| Database | MySQL 8.0 |
| Reverse proxy | nginx |
| Containerisation | Docker / Docker Compose |

---

## Project Structure

```
craft-portal/
├── backend/          # Laravel 13 API (PHP-FPM)
├── frontend/         # Vue 3 + TypeScript SPA
├── nginx/            # nginx reverse-proxy config
├── docker/           # Shared Docker utilities
├── docker-compose.yml
├── .env.example      # Root env template (docker-compose variables)
└── README.md
```

---

## Prerequisites

| Tool | Minimum version |
|---|---|
| Docker | 24+ |
| Docker Compose | v2 (bundled with Docker Desktop) |

> No local PHP, Node, or Bun installation is required — everything runs inside containers.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url> craft-portal
cd craft-portal
```

### 2. Set up environment files

**Root** (docker-compose variables):
```bash
cp .env.example .env
```

**Backend** (Laravel):
```bash
cp backend/.env.example backend/.env
```

**Frontend** (Vite):
```bash
cp frontend/.env.example frontend/.env
```

> The default values work out of the box for local development. Change passwords before deploying to any shared environment.

### 3. Build and start all services

```bash
docker compose up --build
```

Docker Compose will:
1. Start MySQL and wait until it passes the health check
2. Build and start the Laravel PHP-FPM backend (runs migrations automatically)
3. Build and start the Vue / Vite dev server
4. Start nginx as the reverse proxy

### 4. Open the app

| URL | Description |
|---|---|
| `http://localhost` | Vue frontend |
| `http://localhost/api/...` | Laravel REST API |
| `http://localhost/sanctum/...` | Laravel Sanctum (CSRF / auth) |
| `localhost:3306` | MySQL (connect with a GUI client) |

---

## Environment Variables

### Root `.env` — docker-compose

| Variable | Default | Description |
|---|---|---|
| `NGINX_PORT` | `80` | Host port for the nginx reverse proxy |
| `DB_DATABASE` | `craft_portal` | MySQL database name |
| `DB_ROOT_PASSWORD` | `secret` | MySQL root password |
| `DB_USERNAME` | `craft` | MySQL application user |
| `DB_PASSWORD` | `secret` | MySQL application password |
| `DB_EXPOSE_PORT` | `3306` | Host port exposed for direct MySQL access |

### `backend/.env` — Laravel

Key variables to configure (mirrors the root `.env` DB values):

| Variable | Description |
|---|---|
| `APP_NAME` | Application name |
| `APP_KEY` | Laravel encryption key (auto-generated on first run) |
| `APP_URL` | Base URL (keep `http://localhost` for local dev) |
| `DB_HOST` | MySQL service name — must be `db` inside Docker |
| `DB_DATABASE` | Must match root `DB_DATABASE` |
| `DB_USERNAME` | Must match root `DB_USERNAME` |
| `DB_PASSWORD` | Must match root `DB_PASSWORD` |

### `frontend/.env` — Vite

| Variable | Default | Description |
|---|---|
| `VITE_API_URL` | `http://localhost/api` | Backend API base URL used by Axios |
| `VITE_APP_NAME` | `CraftPortal` | App name displayed in the UI |

---

## Development Workflow

### Watch logs for a specific service

```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f nginx
docker compose logs -f db
```

### Run Laravel Artisan commands

```bash
docker compose exec backend php artisan <command>

# Examples
docker compose exec backend php artisan migrate
docker compose exec backend php artisan make:model Project -mcr
docker compose exec backend php artisan tinker
```

### Install a new PHP package

```bash
docker compose exec backend composer require <package>
```

### Install a new frontend package

```bash
docker compose exec frontend bun add <package>
```

### Rebuild a single service after Dockerfile changes

```bash
docker compose up --build backend
docker compose up --build frontend
```

### Stop all services

```bash
docker compose down
```

### Stop and remove all data (including the MySQL volume)

```bash
docker compose down -v
```

---

## Production Build

The frontend `Dockerfile` includes a production stage that compiles the Vue app to static files served by nginx.

```bash
docker build \
  --target production \
  -t craft-portal-frontend:latest \
  ./frontend
```

A `docker-compose.prod.yml` override (not included) would swap the Vite dev server for this production image and set `APP_ENV=production` in the backend.

---

## Architecture Overview

```
Browser
  │
  ▼
nginx :80  (reverse proxy)
  │
  ├─── /api/*        ──►  backend (PHP-FPM :9000)  ──►  MySQL :3306
  ├─── /sanctum/*    ──►  backend (PHP-FPM :9000)
  └─── /*            ──►  frontend (Vite dev :5173)
```

All services run on the internal `craft-network` Docker bridge network. Only nginx and MySQL expose ports to the host.

---

## License

Private — all rights reserved.

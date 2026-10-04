# CRM Demo

A full-stack CRM application by **[Fabian Bachmayer](https://bachi.dev)** (fabian@bachi.dev) — Spring Boot backend + Angular frontend + PostgreSQL, designed to showcase modern web development practices with a focus on clean architecture and robust deployment.

**Live demo:** https://bachi.dev/crm-demo/ · **API:** https://crm-demo-spring.onrender.com · **Swagger:** https://crm-demo-spring.onrender.com/swagger-ui.html

> Demo runs on free-tier infra: the API sleeps after ~15 min idle, so the first request can take ~30–60 s to wake it. Data persists on Neon (no more 30-day DB resets).

## Technologies

**Backend:**

*   Spring Boot 3.5.4
*   Java 21
*   Gradle
*   Spring Data JPA
*   Hibernate
*   PostgreSQL (Neon in prod, Docker Compose locally)
*   Spring Actuator (`/actuator/health` — Render health check)
*   Swagger API Documentation
*   Docker

**Frontend:**

*   Angular 20
*   TypeScript
*   Tailwind CSS
*   npm

## Hosting

*   **Frontend:** Angular static build, deployed on GitHub Pages, served via https://bachi.dev/crm-demo/.
*   **Backend:** Spring Boot Docker image on [Render](https://render.com/) (Free tier).
*   **Database:** PostgreSQL on [Neon](https://neon.com/) (Free tier — no expiry, unlike Render's 30-day free DBs).

```
Pages (Angular) ──HTTPS──▶ Render (Spring Docker, $PORT) ──pooled URL──▶ Neon Postgres
Local: ng serve :4200 ─▶ Spring :8080 (profile=local) ─▶ Compose Postgres :5433
```

## Run locally (2 commands)

```powershell
# 1. Database (needs .env — see below; defaults work out of the box)
Copy-Item .env.example .env
docker compose up -d

# 2a. Backend (profile=local: create-drop + demo seed data)
./gradlew bootRun

# 2b. Frontend (in another terminal)
npm install
npm start   # http://localhost:4200, talks to http://localhost:8080
```

Backend: http://localhost:8080 (Swagger at `/swagger-ui.html`, health at `/actuator/health`).

## Environment variables

| Var | Local default | Production (Render dashboard) | Notes |
|---|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5433/crm-demo` | `jdbc:postgresql://<host>/<db>?sslmode=require` (host-only — see Neon note below) | Pooled host for the app |
| `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD` | `postgres` / from `.env` | Neon role user + password (Render env, never git) | Keep user/pass as separate vars |
| `NEON_DIRECT_URL` (optional, for schema bootstrap) | — | `jdbc:postgresql://<direct-host>/<db>?sslmode=require` + same user/pass vars | Direct (non-pooler) host; DDL hates poolers |
| `SPRING_DATASOURCE_POOL_SIZE` | `3` | `3` | Neon Free has ~97 usable connections |
| `SPRING_PROFILES_ACTIVE` | `local` (via `bootRun`) | `prod` (or unset) | `local` enables DDL `create-drop` + demo seeder |
| `APP_CORS_ALLOWED_ORIGINS` | `http://localhost:4200` default list | `https://bachi.dev,https://bachidev.github.io` | Comma-separated |
| `PORT` | `8080` | Injected by Render | Dockerfile honors `$PORT` |

Profiles: default `application.yml` is **prod-safe** (`ddl-auto: update`, seeder off). `application-local.yml` (gitignored, profile `local`) switches to `create-drop` + seeds demo data. The demo seeder **never runs in prod** (`@Profile("local")`).

### Neon connection strings → JDBC (read this before pasting into Render)

Neon console/CLI gives `postgres://user:pass@host/db?sslmode=require` URIs. The postgres **JDBC driver rejects `user:pass@` in the URL authority** — a naive `postgres://` → `jdbc:postgresql://` swap fails at boot. Instead, split it:

- `SPRING_DATASOURCE_URL` = `jdbc:postgresql://<host>/<db>?sslmode=require` (host-only, no credentials)
- `SPRING_DATASOURCE_USERNAME` = `<user>`, `SPRING_DATASOURCE_PASSWORD` = `<password>` (separate vars)
- Use the **pooled** host (`…-pooler.…neon.tech`) for the running app; the **direct** host only for one-off schema bootstrap/migrations (verified 2026-10-04: schema self-creates via `ddl-auto: update`, full CRUD round-trip green).
- The `neon link` CLI writes quoted `DATABASE_URL`/`DATABASE_URL_UNPOOLED` into local `.env` (gitignored) — handy for local prod-profile tests, never commit it.

## Render checklist (manual, after each infra change)

- Service: Docker, repo `BachiDev/crm-demo`, branch `master`, health check path `/actuator/health`.
- Env: `SPRING_PROFILES_ACTIVE=prod`, `SPRING_DATASOURCE_URL` = pooled host-only JDBC URL, `SPRING_DATASOURCE_USERNAME`/`SPRING_DATASOURCE_PASSWORD` = Neon role creds (see Neon note above — don't paste the `postgres://` URI verbatim), `APP_CORS_ALLOWED_ORIGINS=https://bachi.dev,https://bachidev.github.io`.
- Confirm public URL is still `https://crm-demo-spring.onrender.com` — the frontend `environment.ts` `apiPath` must match (rebuild + redeploy Pages if it changes).

## API notes

- `GET /api/users` etc. never return `passwordHash` (write-only: accepted on create, omitted on read; blank on update = keep existing).
- Deleting an entity referenced by others returns `409` with a label (FK-safe deletes via `ReferencedWarning`).
- Full plan (styling, optimizations, tests, roadmap): [`PLAN.md`](./PLAN.md).

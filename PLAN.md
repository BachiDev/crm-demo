# CRM Demo Overhaul Plan — Next Level Portfolio Project

> Owner: **Fabian Bachmayer** — fabian@bachi.dev — https://bachi.dev
> Repo: `BachiDev/crm-demo` (branch `master`) — Live frontend: https://bachi.dev/crm-demo/ (via GitHub Pages) · API: https://crm-demo-spring.onrender.com
> Goal: take the Bootify-generated CRM from "functional CRUD template" to a polished, credible full-stack portfolio piece that proves senior-level Spring Boot + Angular + Postgres + DevOps skills and never goes down due to free-tier DB deletion.

Stack today: Spring Boot 3.5.4 + Java 21 + Gradle + Spring Data JPA/Hibernate + PostgreSQL + springdoc-openapi + Docker (Render) | Angular 20 + TypeScript + Tailwind CSS v4 + flatpickr (GitHub Pages, `base-href=/crm-demo/`).

Context: this plan mirrors the style/structure of `bachidev-github-io/PLAN.md` (design system, proof-over-claims, calm+fast, server-first where applicable, maintainable). Frontend stays on GitHub Pages. DB moves Render Postgres → **Neon Free tier** (no expiry, survives Render's ~30-day free-DB deletion). Backend decision below.

---

## 1. Current-state audit (what's good / what's holding it back)

### What's already working — keep it

- Full vertical slice works: 9 entities (User, Account, Contact, Opportunity, Activity, ActivityRelation, Memo, Campaign, Product) with list/add/edit/delete on both tiers.
- Deployment model is sound: Angular static → GitHub Pages, Spring Docker image → Render, Postgres → managed. `environment.ts` / `environment.development.ts` split is correct.
- Backend is clean Bootify scaffold: `Resource` → `Service` → `Repository` + `DTO` per entity, Bean Validation (`@Valid`), `ReferencedWarning`/`ReferencedException` for FK-safe deletes, `error-handling-spring-boot-starter`, Swagger at `/swagger-ui.html`.
- Frontend handles Render cold starts honestly: `home.component` "Server is waking up" state + tooltip. Good product thinking for free-tier hosting.
- Tailwind v4 (`@import 'tailwindcss'`) + `NgOptimizedImage` in header. Angular 20 standalone components, `TitleStrategy`, `$localize`/i18n scaffolding.

### Visual design issues (biggest lever for portfolio impact)

1. **Generic Bootify look:** gray-50 header, blue-600 buttons, gray-500 edit/delete, `odd:bg-gray-100` tables, `border-black` thead. Looks like every generated admin, not like *your* brand. Zero connection to bachi.dev (violet/fuchsia on zinc-950, Inter + Geist Mono, `Card`/`Button` v2, kicker → H2 → lede rhythm).
2. **No design system:** colors ad-hoc per template (`blue-600`, `gray-500`, `green-200`/`red-200` alert boxes in `app.component.html`). No tokens, no shared `Button`/`Card`/`Badge`/`Table`/`EmptyState`/`Skeleton` primitives — every list component re-implements header + "Create new" + table markup (~9× duplication).
3. **Tables are desktop-only liabilities:** `overflow-x-auto` + raw UUID columns (`userId` full UUID), `passwordHash` displayed in plain text (!!), no truncation, no pagination, no sorting, no search. `passwordHash` column is both a security smell and a visual disaster.
4. **Home is a link farm:** "Services:" + two Render links + 9 nav-cards. No dashboard value (counts, recent activity, pipeline summary), no demo story ("what to click first in 60 seconds"), no architecture diagram/link to repo + Swagger.
5. **Header/nav is weak:** `bg-gray-50`, hamburger with raw divs (no `aria-expanded` toggle wiring — `ariaExpanded` toggled via `HostListener` but button `aria-expanded="false"` never updates correctly, no Escape close, no focus styles), entities dropdown is hover-fragile, no active-route highlight, no backend-status dot, no GitHub/repo link in nav (only FAB on home).
6. **Forms are unstyled template defaults:** `input-row`/`input-errors` exist but no consistent card layout, no loading/disabled states, no dirty-guard, date handling via flatpickr with default theme clashing.
7. **No dark mode, no responsive polish:** light-only gray; mobile tables unreadable; no `prefers-reduced-motion` consideration; `logo.png` unoptimized; favicon is default.

### Code health / tech debt

8. **Zero backend tests:** `src/test/` does not exist. `build.gradle` declares `spring-boot-starter-test` but nothing uses it. `Dockerfile` builds with `-x test` (bakes in the gap).
9. **Thin frontend tests:** only `app.component.spec.ts`, `home.component.spec.ts`, `floating-action-button.spec.ts` (default "should create" stubs). 9 entities × 3 components each = ~27 untested components + 9 services + error-handler + utils untested.
10. **`application.yml` is demo-only dangerous:** `jpa.hibernate.ddl-auto: create-drop` + `CrmDataLoader` seeds on every empty DB. On Neon (persistent!) this wipes schema on restart and re-seeds fake `hashed_password_123` users. Must move to `validate` + Flyway/Liquibase before pointing at Neon.
11. **Hardcoded secrets in `docker-compose.yml`:** `POSTGRES_PASSWORD=P4ssword!` committed. `application.yml` defaults mirror it. No `.env` / `.env.example`.
12. **`WebConfig` CORS is stale:** allows `http://localhost:4200` + `https://bachidev.github.io` only. Missing `https://bachi.dev` (future custom-domain embed), missing explicit `allowedHeaders`, `maxAge`. `allowCredentials(true)` with wildcard-adjacent setup needs review once frontend calls Neon-backed API cross-origin.
13. **Dockerfile is slow + brittle:** `gradle:8.5-jdk21` full image, `COPY src` before dependency resolution (no layer caching), German comments, no `HEALTHCHECK`, runs as root, `EXPOSE 8080` but Render expects `$PORT`, no JVM flags (`-XX:MaxRAMPercentage`, `-Dserver.port=$PORT`), no `.dockerignore` coverage for `node_modules/dist/build/.angular`.
14. **No CI/CD:** no `.github/workflows/*`. Deploys are manual (`angular-cli-ghpages:deploy`, Render auto-deploy from `master`). No `typecheck/lint/test/build` gates, no preview, no Dependabot.
15. **Frontend deps/++, config drift:** `HttpClientModule` + `BrowserAnimationsModule` via `importProvidersFrom` (deprecated pattern — use `provideHttpClient`/`provideAnimations`), `zone.js` still used (Angular 20 zoneless available), `flatpickr` CSS imported globally, `angular.json` budgets (`1MB warn / 2MB error`) too lax for a portfolio perf story, `safelist.txt` purpose undocumented.
16. **A11y/SEO gaps:** single `title: CRM Demo`, no meta description/OG tags, tables missing `scope`/captions consistency, icon-buttons without labels, `role=alert` present (good) but no `aria-live` toast system, no skip-link, no focus-visible rings.

### Data/hosting risks (why this plan exists)

17. **Render free Postgres deletes after ~30 days of inactivity/expiry** (user-confirmed pain). Every demo reset kills credibility ("live demo is empty/broken").
18. **Render free web service sleeps after 15 min idle** (~50s cold start) + April-2026 free bandwidth cut to **5 GB/mo** (was 100 GB). Tolerable for a demo, but must be designed around (wake-up UX, health ping, small image).
19. **Neon Free is *not* a drop-in connection string swap:** pooled (`-pooler`) vs direct hosts, `sslmode=require`, `channel_binding=require` on newer drivers, serverless scale-to-zero (5 min idle, ~300ms resume), 0.5 GB storage + 100 CU-hours/mo/project caps, max 104 connections (97 usable) → Hikari `maximum-pool-size: 10` is wrong; need ~2–5 + PgBouncer pooler URL.

---

## 2. Vision & principles

**Positioning (one line):** *CRM Demo — a production-shaped Spring Boot + Angular + Postgres CRM by Fabian Bachmayer: typed APIs, validated forms, tested, observable, and live 24/7 on free-tier infra.*

**Design principles (borrowed from bachi.dev PLAN.md §2):**

1. **One brand, two surfaces:** bachi.dev dark violet identity for the *marketing shell* (home/dashboard, header, footer, empty states); light, dense, accessible *app surface* for tables/forms (admin tools stay light — dark tables photograph badly and hurt readability).
2. **Proof over claims:** every skill claimed on bachi.dev `/work/crm-demo` links to a file/endpoint/test/CI run here (e.g. "Flyway migrations" → `db/migration/`, "83% coverage" → Codecov badge).
3. **Calm + fast:** cold-start-aware UX, skeletons not spinners, `OnPush` + lazy routes, Lighthouse 90+ on Pages, p95 API < 300 ms warm.
4. **Twelve-factor config:** env-var everything, `local`/`prod` profiles, no secrets in git, Neon branch-per-environment.
5. **Maintainable:** shared UI primitives, generated-API-client discipline (or explicit hand-written services with tests), linted/formatted/tested, one PR per phase.

**Success metrics (define done):**

- Demo never loses data: Neon Free, Flyway-managed schema, seed only on `local` profile.
- Lighthouse (Pages, mobile): Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- Backend: `build` green with tests, JaCoCo line coverage ≥ 70% (services/resources), zero `create-drop` in prod, `/actuator/health` + Swagger live.
- Frontend: `npm run lint+test+build` green, ≥ 60% line coverage on services/utils + critical component specs, Playwright smoke (home → list → create → edit → delete) passing in CI.
- Docs: README shows architecture diagram, local run (2 commands), env table, demo script, API link, badges.

---

## 3. Hosting decision (researched 2026-10-04)

### 3.1 Database → Neon Free tier (decided, per your request)

Neon Free (verified): **$0, no card, no expiry**, 0.5 GB storage/project, 100 CU-hours/mo/project (~400 h at 0.25 CU), autoscale to 2 CU, scale-to-zero after 5 min, 5 GB egress/mo, 10 branches, 6 h point-in-time restore. Data is **never deleted** on limit-hit — compute suspends until next cycle or upgrade.

Why Neon over Render/Supabase for this use case:

- Render free Postgres is the thing being killed by the 30-day policy — must leave.
- Supabase Free pauses after inactivity and caps at 2 projects; Neon gives 100 projects + branches (ideal: `main` prod branch + `dev` branch).
- Neon PgBouncer pooler (`*-pooler.*.neon.tech`) solves the serverless-connection problem; direct host reserved for migrations.

Action: one Neon project `crm-demo`, two branches (`main` prod, `dev`), pooled URL for the app, direct URL for Flyway migrate. See §6.1.

### 3.2 Backend → STAY on Render Free for now (recommended), with a priced exit

| Option (Oct 2026) | Free without card? | Sleeps? | Verdict for *this* portfolio demo |
|---|---|---|---|
| **Render Web Service Free** (Docker, 512 MB / 0.1 CPU, 750 h/mo, 5 GB bw/mo) | Yes | Yes, 15 min idle (~30–60 s wake) | **RECOMMENDED v1.** Dockerfile already works, auto-deploy from GitHub, no card, CORS+Pages already wired, wake-up UX already in UI. Cheapest path to "never loses data" (DB was the killer, not the app). |
| Railway Free ($5 trial credit then ~$1/mo recurring credit) | Yes, tiny | No hard sleep but credit exhausts fast on Java (512 MB Spring ≈ $5–8/mo burn) | Rejected v1 — Spring idle burn eats the $1 credit in days; surprise suspension worse than predictable sleep. |
| Fly.io (no free tier since Oct 2024; trial = 2 machine-hours or 7 days) | No (card) | No | Rejected — needs card, Java RAM costs real money immediately. |
| Koyeb (card + $29 pre-auth hold since Feb 2026, defaults to $29/mo Pro) | No | Scale-to-zero on paid | Rejected — card wall + hold is wrong for a $0 portfolio demo. |
| Google Cloud Run / Azure Container Apps free allowance | Card required | Scale-to-zero (good) | **Best paid/future path** — Cloud Run `min-instances: 0`, 2 GB free egress, pay-per-request; ~$2–5/mo at demo traffic with card. Do this only when you add a card. |

**Decision:**

- **Phase 0–2: keep `crm-demo-spring.onrender.com` on Render Free + Neon.** Fixes the actual outage cause (DB deletion) while changing the least infra. Document the sleep honestly in UI (already partially done — polish it).
- **Phase 3 (stretch, only with card): migrate backend to Cloud Run** (Dockerfile already compatible; add `$PORT` handling now so the move is trivial). Expected cost at demo traffic: $0–5/mo; cold start 2–5 s (better than Render's 30–60 s Java wake).
- **Never:** put the backend on GitHub Pages (static only) or co-locate Postgres on Render again.

Render Free survival checklist (do in Phase 0): set Render **Health Check Path** `/actuator/health`, **Docker Command** honoring `$PORT`, **auto-deploy on `master` only**, env vars (not `render.yaml` secrets) for Neon URLs, UptimeRobot/Kuma **cron ping every 10 min is OPTIONAL** — note it burns the 750 h budget if combined withScale-to-zero DB; prefer honest wake-up UX over ping abuse (pinging also keeps Neon compute warm and burns CU-hours — don't do both).

### 3.3 Frontend → keep GitHub Pages (decided)

No change: `angular-cli-ghpages` + `base-href=/crm-demo/` works. Harden it: pin Node 22 in workflow, `npm ci`,555 build budget enforcement, 404 SPA fallback (`404.html` ← `index.html` copy, required for deep links like `/crm-demo/users` on Pages).

---

## 4. Design system (make it look like *yours*)

### 4.1 Tokens (Tailwind v4 `@theme` in `styles.css`)

- **App surfaces:** light theme stays: `bg-white` cards, `zinc-100` page bg, `zinc-900` text, borders `zinc-200`. Accent **violet-600** primary buttons (replaces `blue-600`), `violet-100` selected nav, focus rings `violet-500`.
- **Marketing shell (home/dashboard hero):** dark `zinc-950` band with violet→fuchsia gradient CTA, mono kickers (`font-mono uppercase text-violet-400`) — mirrors bachi.dev so screenshots feel like one portfolio.
- **Typography:** Inter (body) + Geist Mono/JetBrains Mono (kickers, UUIDs, stats). Keep `$localize` i18n attributes intact.
- **Shape:** `rounded-xl` cards, `rounded-lg` inputs, `rounded-full` pills; single table style: sticky header, `text-sm`, row hover `violet-50`, `tabular-nums` for amounts/dates.
- **States:** success `emerald`, info `sky`, warn `amber`, danger `rose` — replace `green-200/blue-200/red-200` alert boxes with a shared `Toast`/alert component.

### 4.2 Shared primitives to build (kill 9× duplication)

- `PageHeader` (title + count badge + primary CTA + breadcrumbs) — replaces per-list flex header.
- `DataTable` (sticky head, empty state slot, loading skeleton slot, responsive card fallback on mobile) + `Pagination` + `SearchInput`.
- `EntityFormCard` (uniform add/edit layout, submit `loading/disabled`, `aria-describedby` errors, dirty-guard `canDeactivate`).
- `StatusPill` (stage/status mapping: negotiation→amber, won→emerald, planned→sky…), `Avatar` (initials), `CurrencyPipe`/`DatePipe` wrappers.
- `BackendStatus` (waking/running/error dot + retry, reused home + header) — extract from `home.component` logic.
- `ConfirmDialog` (`<dialog>`, Escape, focus return) — replaces `confirmDelete()` native `confirm()`.
- `EmptyState` (icon + line + CTA) per entity; `ErrorState` with retry.
- Dark `HeroBand` for home only.

### 4.3 Section-by-section plan

- **Header:** sticky, active-route highlight (`routerLinkActive`), entities menu with keyboard support + Escape, backend-status dot, right side: Swagger (external icon) + GitHub repo icon. Fix `aria-expanded` wiring; add skip-link in `index.html`.
- **Home → Dashboard:** hero band (headline + "60-second demo script" CTA + API/Swagger buttons + status), stat cards (row counts per entity via lightweight `/api/*/count` or parallel `GET` with `take(1)` — add `HEAD`/count endpoints in Phase 1 if list payloads get heavy), entity grid rebuilt on `Card` (icon tile, description, "Open →"), architecture strip (Angular → Spring → Neon diagram + tech pills), footer line (Fabian Bachmayer · bachi.dev · source on GitHub).
- **Lists:** hide `passwordHash` + raw UUIDs (show `username/email`, copy-UUID icon on demand), truncate long text, add client-side search + sort + pagination (10/25/50) in v1; server-side `Pageable` in v2 if tables grow. Row actions: icon buttons with labels, danger styling only on delete.
- **Add/Edit:** one-column card max-w-2xl, floating-label OR top-aligned (top-aligned safer for a11y — pick one globally), inline `input-errors` + summary alert, success toast + redirect to list, 409/400 mapping from `error-handling-starter` JSON (`http-status-in-json-response: true` — write a shared `ApiError` parser).
- **FAB:** keep only on home (repo link), remove from entity pages; never overlap content on mobile.
- **Icons:** keep `public/*.svg` entity icons (they're decent); add missing states (search, plus, pencil, trash, x, check, arrow) via `lucide-angular` — don't mix two icon styles in one row.

---

## 5. Optimizations

### 5.1 Backend

1. **Config profiles:** `application.yml` (prod-safe defaults: `ddl-auto: validate`, `open-in-view: false`) + `application-local.yml` (gitignored, `create-drop` + `CrmDataLoader`) — gate seeder with `@Profile("local")`. Never seed prod.
2. **Flyway (new dep):** `db/migration/V1__init.sql` generated from current entities; `V2__seed_demo.sql` (small, honest demo set, idempotent). `ddl-auto: validate` everywhere except local.
3. **Neon connection:** pooled URL for runtime (`jdbc:postgresql://<host>-pooler.*.neon.tech/<db>?sslmode=require`), `hikari.maximum-pool-size: 3`, `minimum-idle: 0`, `connection-timeout: 10000`, `max-lifetime: 280000`; direct URL only for `flyway` user. Document both in README env table. Test cold-resume (kill idle 6 min → first query ~300–800 ms acceptable).
4. **API hardening:** `Pageable` on all `GET` collections (keep unpaged `GET` as deprecated alias for frontend v1 compat, remove in v2); `POST` returns `201 + Location`; `PUT` returns `200`; add `GET /api/{entity}/count`; constrain `WebConfig` origins to `https://bachidev.github.io`, `https://bachi.dev`, `http://localhost:4200` (+ env-overrideable list), `maxAge(3600)`.
5. **Validation/error parity:** audit every `DTO` (email formats, `@NotNull` FKs, enum-like `status/stage` with `@Pattern`); map `ReferencedException` → `409` with entity label (frontend shows "Cannot delete — used by N X" instead of raw JSON).
6. **Observability:** `spring-boot-starter-actuator` (`health`, `info`, `metrics`), Render health check `/actuator/health/liveness`, `management.endpoint.health.show-details: never`, Micrometer + `info.build` from Gradle; structured logging (logback JSON pattern optional), no `System.out` (replace `CrmDataLoader` prints with logger).
7. **Perf:** `spring.jpa.open-in-view: false`, fetch-join/N+1 audit on `Opportunity/ActivityRelation` (entity graphs), Jackson: `WRITE_DATES_AS_TIMESTAMPS: false` + JavaTime module (check `JacksonConfig`), GZIP via Render/CDN (document), ETag on `GET` lists optional v2.
8. **Security (demo-appropriate):** hide `passwordHash` from `UserDTO` responses (write-only `@JsonProperty(WRITE_ONLY)` or separate `UserCreateDTO`); security headers filter (`X-Content-Type-Options`, `Referrer-Policy`); Swagger UI enabled (portfolio needs it) but set `springdoc.api-docs.enabled` per profile; no auth in v1 — document explicitly ("open demo API, abuse-shaped requests rate-limited by Render/Neon caps; auth via Spring Security + JWT is the documented v2").
9. **Docker:** rewrite for layer cache (`COPY build.gradle settings.gradle` → `downloadDependencies` → `COPY src`), JRE-only runtime (`eclipse-temurin:21-jre`), non-root `appuser`, `HEALTHCHECK CMD wget -qO- http://localhost:$PORT/actuator/health`, `ENTRYPOINT` honoring `$PORT` (`-Dserver.port=${PORT:-8080}`), JVM `-XX:MaxRAMPercentage=75.0 -XX:+UseSerialGC` (fits 512 MB Render free), `.dockerignore` covering `node_modules/dist/build/.angular/.git`.

### 5.2 Frontend

1. **Routing perf:** lazy-load all 9 entity routes (`loadComponent`), `OnPush` on list/table/primitive components, `trackBy` everywhere (already `track user.userId` — extend), `provideHttpClient(withFetch(), withInterceptors([apiBase, errorToast]))`.
2. **API layer:** one `ApiClient` (base URL from `environment.apiPath`, timeout 15 s, warm-retry once on cold-start 502/503 with backoff + status UI), per-entity services delegate to it; remove `environment.apiPath` string-concat drift. Add `withCredentials: false` explicitly (no cookies cross-origin).
3. **State/UX:** list caches (`shareReplay(1)` per session, invalidate on CUD), skeletons for tables, optimistic delete with undo toast (5 s), debounced search (300 ms), pagination in URL query params (shareable demo links).
4. **Bundle:** enforce budgets (`initial ≤ 500 kB warn / 800 kB error` — current 1 MB/2 MB hides bloat), `source-map: false` prod, `flatpickr` → native `input[type=date]` + lightweight wrapper or lazy-load flatpickr per form (kills global CSS), `logo.png` → `.webp` + `priority`, fonts: system stack (no webfont download for an admin tool).
5. **PWA/SEO (light):** `index.html` meta description + OG tags (absolute `og-cover` on bachi.dev), `theme-color`, `404.html` SPA fallback, `robots.txt` allowing crawl (it's a demo — indexable is good).
6. **A11y:** skip-link, `:focus-visible` violet rings, table `<caption>`, sort buttons `aria-sort`, dialogs `role=dialog aria-modal`, toasts `aria-live=polite`, UUID truncation keeps full value in `title`/`aria-label`, keyboard-only CRUD walkthrough passes.

---

## 6. Infrastructure & environments

### 6.1 Target topology

```
GitHub Pages (Angular static, /crm-demo/) ──HTTPS──▶ Render Free (Spring Docker, $PORT)
                                                          │  SPRING_DATASOURCE_URL=<Neon pooled URL>?sslmode=require
                                                          ▼
                                              Neon Free (Postgres, branch: main)
Local: ng serve (:4200) ─▶ Spring :8080 (profile=local) ─▶ docker-compose Postgres :5433
CI: GitHub Actions ─▶ build+test backend (Testcontainers pg) + build+test frontend ─▶ deploy Pages
```

### 6.2 Env contract (single source of truth)

| Var | Local | Render prod | Notes |
|---|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5433/crm-demo` | `jdbc:postgresql://<proj>-pooler.<region>.neon.tech/<db>?sslmode=require&channel_binding=require` | Pooled in prod |
| `SPRING_DATASOURCE_USERNAME/PASSWORD` | `postgres / P4ssword!` (gitignored `.env`) | Neon role user/pass (Render env, never git) | Rotate after Render-DB era |
| `FLYWAY_URL/USER/PASSWORD` (or reuse above with direct host) | same as local | direct (non-pooler) host | Migrations hate poolers |
| `SPRING_PROFILES_ACTIVE` | `local` | `prod` (or unset → default prod-safe) | Gates seeder + DDL |
| `APP_CORS_ALLOWED_ORIGINS` | `http://localhost:4200` | `https://bachidev.github.io,https://bachi.dev` | Parsed in `WebConfig` |
| `SPRINGDOC_SWAGGER_UI_ENABLED` | `true` | `true` (portfolio) | Documented choice |

`docker-compose.yml`: bump `postgres:17.5`, load password from `${POSTGRES_PASSWORD:?}` + `.env.example`, keep `5433:5432` (avoids clash with dev's other PG on 5432), add `db-admin` profile note (pgAdmin optional, not committed).

### 6.3 Render settings to set (manual checklist, Phase 0)

- Service: Docker, repo `BachiDev/crm-demo`, branch `master`, Dockerfile path `./Dockerfile`, Health Check `/actuator/health`.
- Env: `SPRING_PROFILES_ACTIVE=prod`, Neon pooled URL/user/pass, `APP_CORS_ALLOWED_ORIGINS`, `JAVA_OPTS=-XX:MaxRAMPercentage=75.0`.
- Networking: confirm public URL stays `https://crm-demo-spring.onrender.com`; update `environment.ts` `apiPath` if it ever changes — frontend rebuild + Pages redeploy required (document!).

---

## 7. Test plan (biggest credibility win — currently ~0%)

### 7.1 Backend (new `src/test/`, JUnit 5 + MockMvc + Testcontainers)

- **Slice tests per entity (9×):** `*ResourceTest` (`@WebMvcTest` + mocked service: 200/201/204/400/404/409 paths), `*ServiceTest` (Mockito repo: get-throws-`NotFoundException`, create/update mapping, `getReferencedWarning` both branches, delete).
- **Validation tests:** `DTO` constraint violations via `Validator` (bad email, null FK, over-length) — proves Bean Validation story.
- **Integration (1–2, Testcontainers `postgres:17`):** Flyway `V1` migrates clean on empty DB; `CrmDataLoader(local)` seeds idempotently (count>0 → no-op); one end-to-end `POST /api/accounts → GET /api/accounts/{id}` against container. Marked `@Tag("integration")`, run in CI only (not on every `test` locally — Gradle task split).
- **Infra tests:** `WebConfig` CORS allows Pages origin / blocks evil origin; `ActuatorHealthTest` (`/actuator/health` UP); Jackson date-format test.
- **Gates:** JaCoCo `test` + `jacocoTestCoverageVerification` (line ≥ 0.70 on `dev.bachi.crm_demo.**`, exclude `CrmDemoApplication`, entities' getters/setters via Lombok config), `check` runs before Docker build (remove `-x test` from Dockerfile once green — keep `-x integrationTest` on Render builds for speed).

### 7.2 Frontend (Jasmine/Karma now, Playwright for e2e)

- **Keep Karma** (don't churn to Vitest mid-overhaul — Angular 20 Karma still supported via `application` builder `test` target). Add `npm run test:ci` (`--watch=false --browsers=ChromeHeadless --code-coverage`, thresholds in `karma.conf.js`: statements ≥ 60% global, 80% on `common/*` + `*.service.ts`).
- **Unit specs to write:** 9× `*.service.spec` (HttpTestingController: URL, method, body, error path), `api.interceptor.spec` (cold-start retry once then surface), `confirm-dialog.spec`, `pagination/search-utils.spec`, `backend-status.spec` (waking→running transitions), `input-errors.spec`.
- **Component specs (shallow):** one representative list (e.g. `user-list`: empty/loading/rows/delete-confirm wiring), one add + one edit (valid submit calls service + navigates; invalid blocks + shows errors). Others covered by e2e.
- **E2E (new, Playwright):** `e2e/smoke.spec.ts` against `local` stack: home loads + status becomes running; users: create → appears in list → edit → delete with confirm; deep-link `/crm-demo/users` reload works (Pages 404 fallback). Run in CI with Postgres service container + Spring `local` profile; nightly against prod (read-only: list + Swagger reachable).
- **Manual QA checklist** (PR template): keyboard-only CRUD, 320px mobile tables → cards, cold-start wake path (throttle backend down, verify copy), UUID/copy button, toast lifetimes.

### 7.3 Quality gates (CI, all blocking)

```
PR: backend ./gradlew check (tests + JaCoCo) · frontend npm ci + lint + test:ci + build (budgets enforced)
master: + deploy Pages (gh-pages) · Render auto-deploy backend · e2e smoke vs prod (non-mutating)
Nightly/weekly: dependency audit (npm audit + Gradle versions), Lighthouse CI on Pages URL, Neon storage/CU-hours dashboard eyeball
```

---

## 8. Phased roadmap (solo-friendly, each phase shippable; merge to `master` → deploys)

### Phase 0 — Stop the bleeding: Neon + prod-safe backend (0.5–1 day, no visual change)

- [ ] Neon project `crm-demo` (branches `main` + `dev`); Render env → pooled URL; verify Swagger + one CRUD round-trip on prod data.
- [ ] `application.yml` split (`prod-safe` default + `local` profile), `CrmDataLoader` → `@Profile("local")`, logger over `System.out`.
- [ ] Add `spring-boot-starter-actuator`; `WebConfig` origins via `APP_CORS_ALLOWED_ORIGINS` (+ bachi.dev); `UserDTO.passwordHash` write-only.
- [ ] Dockerfile rewrite (layer cache, non-root, `$PORT`, JVM flags, `HEALTHCHECK`); `docker-compose.yml` → `${POSTGRES_PASSWORD}` + `.env.example`; remove `-x test` escape hatch (keep `-x integrationTest` for image builds).
- [ ] `.github/workflows/ci.yml` skeleton (backend `check`, frontend `lint+test:ci+build`); README env table + Render settings checklist (§6.3).

### Phase 1 — Design system + tables/forms coherence (1–2 days, ~70% of perceived level-up)

- [ ] Tailwind `@theme` tokens + Inter/mono; `PageHeader/DataTable/Pagination/SearchInput/EntityFormCard/StatusPill/ConfirmDialog/EmptyState/Toast/BackendStatus/HeroBand` primitives.
- [ ] Migrate header + home (dashboard: stats, demo script, architecture strip) + 2 pilot entities (Users, Accounts) end-to-end; delete `passwordHash` + UUID columns properly.
- [ ] `ApiClient` + error parser + cold-start retry; `provideHttpClient` migration; lazy routes; `OnPush` on new components.
- [ ] Backend: Flyway `V1__init.sql` + `V2__seed_demo.sql`, `ddl-auto: validate`, `Pageable` + `/count` endpoints (keep unpaged alias), `ReferencedException` → labeled 409s.

### Phase 2 — Rollout + perf + a11y/SEO hardening (1–2 days)

- [ ] Migrate remaining 7 entities to primitives; client search/sort/pagination + query-param URLs; mobile card fallback; optimistic delete + undo.
- [ ] Lists skeletons, form dirty-guard, `404.html` fallback, OG/meta tags, `logo.webp`, skip-link + focus rings + `aria-sort`/dialog/toast-live passes.
- [ ] Budgets tightened (500 kB/800 kB), flatpickr lazy-or-native, `source-map: false`; Lighthouse ≥ 90/95/95/90 verified on Pages URL.
- [ ] Swagger description polish per resource (`@Tag`/`@Operation` one-liners — cheap, high portfolio value).

### Phase 3 — Tests + CI green + docs (1–2 days, the seniority proof)

- [ ] Backend `*ResourceTest/*ServiceTest`/validation/Testcontainers integration + JaCoCo 70% gate; frontend service + component specs + coverage thresholds; Playwright smoke in CI.
- [ ] PR template (Lighthouse/a11y/cold-start checklist), Dependabot (npm + Gradle), Codecov or CI-summary badge.
- [ ] README rewrite: architecture diagram (mermaid), 2-command local run, env table, demo script, API/Swagger links, test/coverage how-to, hosting map (Pages/Render/Neon), honest limits note (sleep + Neon caps), roadmap to auth (Spring Security + JWT v2).
- [ ] bachi.dev `/work` entry refresh: new screenshots (dashboard + table + form), outcome line ("survives free-tier DB expiry via Neon; Flyway-managed; tested"), stack pills sync.

### Phase 4 — Stretch (only if it earns its keep)

- [ ] Server-side paging/sort/filter (`Pageable` default, remove unpaged alias) once demo data > ~200 rows/entity.
- [ ] Auth v2 spike (Spring Security + JWT, `User.passwordHash` → BCrypt, login page, role-gated deletes) — separate branch, big scope; don't start before Phases 0–3 ship.
- [ ] Backend → Cloud Run migration (needs card; Dockerfile already ready; compare cold starts + cost after 2 weeks).
- [ ] Dashboard charts (opportunities by stage, activities by status — CSS-only bars first, no chart lib until needed).

**Estimated total:** 4–7 focused days solo. Phase 0 alone fixes the outage class; Phase 1 delivers the visual level-up; Phase 3 delivers the hiring signal.

---

## 9. Risks & decisions

| # | Decision | Recommendation | Status |
|---|---|---|---|
| 1 | DB: Render → Neon? | **Yes — Neon Free** (no expiry, pooled + direct hosts, scale-to-zero fits demo) | Decided (your call) |
| 2 | Backend: stay Render vs move? | **Stay on Render Free for v1** (no card, Docker works, sleep is design-around-able); Cloud Run only when you add a card | Proposed — confirm |
| 3 | `ddl-auto` + seeder in prod? | **Flyway + `validate`**, seeder `@Profile("local")` only — never seed Neon `main` destructively | Required before Neon cutover |
| 4 | Expose `passwordHash`? | **No** — write-only immediately (one-line Jackson/Lombok change, big trust win) | Required Phase 0 |
| 5 | Auth now? | **No** — document as v2; open demo API is honest + shippable | Proposed |
| 6 | Ping Render to avoid sleep? | **No ping abuse** — burns Render hours + Neon CU-hours; ship wake-up UX instead | Proposed |
| 7 | Dark tables? | **No** — dark hero shell, light app surface (readability + screenshots) | Proposed |

---

## 10. Acceptance criteria (ship gate per phase)

- [ ] Prod data survives 30+ days untouched (Neon `main` branch, Flyway history table present, no `create-drop` in prod config).
- [ ] One accent (violet-600), two fonts, one table + one form pattern across all 9 entities (visual review mobile + desktop).
- [ ] Home tells a 60-second demo story; backend-status + Swagger + repo links work from cold start.
- [ ] No `passwordHash` in any `GET` response or table; UUIDs truncated with copy affordance.
- [ ] `main` green: backend `check` + JaCoCo gate, frontend `lint+test:ci+build` (budgets), Playwright smoke, Pages deploy, Render health UP.
- [ ] Lighthouse ≥ 90/95/95/90 on Pages URL; keyboard-only CRUD passes; no CLS on tables (skeleton reserves height).
- [ ] README lets a stranger run locally in 2 commands and understand Pages/Render/Neon map + limits.

---

## 11. Immediate next actions (if you say "go")

1. Phase 0 infra PR (Neon env + profiles + actuator + CORS + Dockerfile + CI skeleton) — then cut prod over to Neon and verify.
2. Phase 1 design-system PR (tokens + 10 primitives + header/home + Users/Accounts pilot).
3. Copy deck for dashboard/demo-script/architecture strip in `src/main/webapp/app/home/` for your review before table rollout.
4. Phases 2 + 3, then bachi.dev `/work` screenshot refresh.

_Suggested commit flow: one PR per phase above; each deployable via `master` independently. Say the word and I start with Phase 0._

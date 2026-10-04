import { defineConfig, devices } from '@playwright/test';


const backendPort = 8080;
const frontendPort = 4200;

/**
 * Full-stack smoke tests. Both tiers boot from this repo:
 * - Spring Boot (profile=local, Flyway-migrated demo data) via Gradle,
 * - Angular dev server (talks to localhost:8080 via environment.development).
 * Local Postgres comes from docker-compose (started automatically by
 * spring-boot-docker-compose; needs POSTGRES_PASSWORD, see .env.example).
 * Servers are reused when already running. Tests share one demo database and
 * therefore run serially with unique names per run.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  expect: {
    timeout: 15000
  },
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  outputDir: 'test-results',
  use: {
    baseURL: `http://localhost:${frontendPort}`,
    trace: 'retain-on-failure'
  },
  webServer: [
    {
      command: process.platform === 'win32' ? 'gradlew.bat bootRun --no-daemon' : './gradlew bootRun --no-daemon',
      url: `http://localhost:${backendPort}/actuator/health`,
      timeout: 360000,
      reuseExistingServer: true,
      env: {
        SPRING_PROFILES_ACTIVE: 'local'
      }
    },
    {
      command: `npx ng serve --port ${frontendPort}`,
      url: `http://localhost:${frontendPort}/`,
      timeout: 240000,
      reuseExistingServer: true
    }
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});

import { test, expect, Page } from '@playwright/test';


/**
 * Fill that survives Angular form-control binding: on a cold dev server the
 * first fill can land before `formControlName` attaches and get overwritten
 * with the pristine model value. Refilling until the value sticks removes
 * the race deterministically.
 */
async function fillStable(page: Page, label: RegExp, value: string) {
  const field = page.getByLabel(label);
  await expect(async () => {
    await field.fill(value);
    await page.waitForTimeout(300);
    expect(await field.inputValue()).toBe(value);
  }).toPass({ timeout: 15000 });
}

test('home shows hero, stats and a running backend', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('section').filter({ has: page.getByRole('heading', { name: 'CRM Demo' }) });
  // Generous timeout: CI always boots a cold frontend.
  await expect(hero).toBeVisible({ timeout: 120000 });
  await expect(hero.getByText('Running', { exact: true })).toBeVisible({ timeout: 120000 });
  await expect(page.getByText('How it runs')).toBeVisible();
  await expect(page.getByText('How the data fits together')).toBeVisible();
  // Stat tiles load once the counts arrive.
  await expect(page.getByText('Users', { exact: true }).first()).toBeVisible();
});

test('users full CRUD round-trip with search and confirm dialog', async ({ page }) => {
  const stamp = Date.now().toString(36);
  const username = `pw-${stamp}`;
  const email = `${username}@example.com`;

  await page.goto('/users');
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();

  // Create.
  await page.getByRole('link', { name: /create new user/i }).click();
  await fillStable(page, /username/i, username);
  await fillStable(page, /email/i, email);
  await fillStable(page, /password hash/i, 'secret123');
  await fillStable(page, /first name/i, 'Play');
  await fillStable(page, /last name/i, 'Wright');
  await page.getByRole('button', { name: /add user/i }).click();
  await expect(page.getByText(username, { exact: true })).toBeVisible();

  // Search filters server-side.
  await page.getByRole('searchbox').fill(username);
  await expect(page.getByText(email, { exact: true })).toBeVisible();
  await page.getByRole('searchbox').fill('zzz-no-such-user');
  await expect(page.getByText(username, { exact: true })).toHaveCount(0);
  await page.getByRole('searchbox').fill(username);
  await expect(page.getByText(username, { exact: true })).toBeVisible();

  // Edit.
  await page.getByRole('row', { name: new RegExp(username) }).getByRole('link', { name: /edit/i }).click();
  await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();
  await fillStable(page, /first name/i, 'Edited');
  await page.getByRole('button', { name: /edit user/i }).click();
  await expect(page.getByText('Edited')).toBeVisible();

  // Delete via the confirm dialog (cancel path first).
  await page.getByRole('row', { name: new RegExp(username) }).getByRole('button', { name: /^delete$/i }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: /cancel/i }).click();
  await expect(page.getByText(username, { exact: true })).toBeVisible();

  await page.getByRole('row', { name: new RegExp(username) }).getByRole('button', { name: /^delete$/i }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: /^delete$/i }).click();
  await expect(page.getByText(username, { exact: true })).toHaveCount(0);
});

test('blocked delete explains itself', async ({ page }) => {
  // jdoe owns seeded records, so deleting must fail with a reason.
  await page.goto('/users');
  await expect(page.getByText('jdoe').first()).toBeVisible();
  await page.getByRole('row', { name: /jdoe/ }).first().getByRole('button', { name: /^delete$/i }).click();
  await page.getByRole('dialog').getByRole('button', { name: /^delete$/i }).click();
  await expect(page.getByText(/still referenced by/i)).toBeVisible();
});

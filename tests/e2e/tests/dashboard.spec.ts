import { test, expect } from '@playwright/test';

test.describe('Home Banking Dashboard', () => {
  test('should load dashboard with accounts and transactions', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page.locator('h1')).toContainText('Home Banking');

    // Check accounts section exists
    await expect(page.getByText('Your Accounts')).toBeVisible();

    // Wait for accounts to load and verify we have 3 accounts
    await page.waitForSelector('[class*="AccountCard"]', { timeout: 10000 });
    const accountCards = page.locator('[class*="AccountCard"]');
    await expect(accountCards).toHaveCount(3);

    // Verify account details are visible
    await expect(page.getByText('John Smith')).toBeVisible();
    await expect(page.getByText('ACC-1001')).toBeVisible();

    // Check transactions section exists
    await expect(page.getByText('Recent Transactions')).toBeVisible();
    await expect(page.getByText('Transaction History')).toBeVisible();

    // Verify transactions table loads
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Verify table headers
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Description' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Category' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Amount' })).toBeVisible();

    // Verify we have transactions
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThan(0);
  });
});

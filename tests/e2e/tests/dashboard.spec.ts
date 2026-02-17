import { test, expect } from '@playwright/test';

test.describe('Home Banking Dashboard', () => {
  test('should load dashboard with accounts and transactions', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page.locator('h1')).toContainText('Home Banking');

    // Check accounts section exists - use more specific selector
    await expect(page.getByRole('heading', { name: 'Your Accounts' })).toBeVisible();

    // Wait for accounts to load and verify we have 3 accounts
    await page.waitForSelector('[data-testid="account-card"]', { timeout: 10000 });
    const accountCards = page.getByTestId('account-card');
    await expect(accountCards).toHaveCount(3);

    // Verify account details are visible - use more specific selectors
    await expect(page.getByRole('heading', { name: 'John Smith' })).toBeVisible();
    await expect(page.getByText('ACC-1001').first()).toBeVisible();

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

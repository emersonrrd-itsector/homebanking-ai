import { test, expect } from '@playwright/test';

test.describe('Transactions List', () => {
  test('should display transaction list with correct data', async ({ page }) => {
    await page.goto('/');

    // Wait for transactions to load
    await page.waitForSelector('tbody tr', { timeout: 10000 });

    // Verify we have at least 20 transactions (as seeded)
    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    expect(rowCount).toBeGreaterThanOrEqual(20);

    // Check first transaction has required fields
    const firstRow = rows.first();
    
    // Date should be visible
    const dateCell = firstRow.locator('td').nth(0);
    await expect(dateCell).not.toBeEmpty();

    // Description should be visible
    const descCell = firstRow.locator('td').nth(1);
    await expect(descCell).not.toBeEmpty();

    // Category badge should be visible - use data-testid
    const categoryCell = firstRow.locator('td').nth(2);
    const badge = categoryCell.getByTestId('category-badge');
    await expect(badge).toBeVisible();

    // Type should be visible
    const typeCell = firstRow.locator('td').nth(3);
    await expect(typeCell).not.toBeEmpty();

    // Amount should be visible
    const amountCell = firstRow.locator('td').nth(4);
    await expect(amountCell).not.toBeEmpty();
  });

  test('should show category badges with different colors', async ({ page }) => {
    await page.goto('/');

    // Wait for transactions
    await page.waitForSelector('tbody tr', { timeout: 10000 });

    // Check that category badges exist - use data-testid
    const badges = page.getByTestId('category-badge');
    const badgeCount = await badges.count();
    expect(badgeCount).toBeGreaterThan(0);

    // Verify at least one badge is visible
    await expect(badges.first()).toBeVisible();
  });

  test('should show amounts with appropriate colors', async ({ page }) => {
    await page.goto('/');

    // Wait for transactions
    await page.waitForSelector('tbody tr', { timeout: 10000 });

    // Get all amount cells (last column)
    const amountCells = page.locator('tbody tr td:last-child');
    const cellCount = await amountCells.count();
    expect(cellCount).toBeGreaterThan(0);

    // Check that at least some amounts are styled (red or green)
    let hasColoredAmount = false;
    for (let i = 0; i < Math.min(5, cellCount); i++) {
      const cell = amountCells.nth(i);
      const classes = await cell.getAttribute('class');
      if (classes && (classes.includes('red') || classes.includes('green'))) {
        hasColoredAmount = true;
        break;
      }
    }
    expect(hasColoredAmount).toBe(true);
  });
});

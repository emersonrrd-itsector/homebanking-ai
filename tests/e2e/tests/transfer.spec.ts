import { test, expect } from '@playwright/test';

test.describe('Transfer Flow', () => {
  test('should complete a successful transfer', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });

    // Find the transfer form section
    await expect(page.getByText('Make a Transfer')).toBeVisible();
    await expect(page.getByText('New Transfer')).toBeVisible();

    // Fill in the transfer form
    const fromAccountSelect = page.locator('select#fromAccount');
    await fromAccountSelect.selectOption({ index: 1 }); // Select first account

    const toAccountSelect = page.locator('select#toAccount');
    await toAccountSelect.selectOption({ index: 2 }); // Select second account

    const amountInput = page.locator('input#amount');
    await amountInput.fill('50.00');

    const descriptionInput = page.locator('input#description');
    await descriptionInput.fill('E2E Test Transfer');

    // Submit the form
    const submitButton = page.getByRole('button', { name: /transfer funds/i });
    await submitButton.click();

    // Wait for success message
    await expect(page.getByText(/transfer completed successfully/i)).toBeVisible({ timeout: 10000 });

    // Verify the transaction appears in the list
    await expect(page.getByText('E2E Test Transfer')).toBeVisible();
  });

  test('should show validation error for same account transfer', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });

    // Fill in form with same account for from and to
    const fromAccountSelect = page.locator('select#fromAccount');
    await fromAccountSelect.selectOption({ index: 1 });

    const toAccountSelect = page.locator('select#toAccount');
    await toAccountSelect.selectOption({ index: 1 }); // Same as from

    const amountInput = page.locator('input#amount');
    await amountInput.fill('10.00');

    const descriptionInput = page.locator('input#description');
    await descriptionInput.fill('Same account test');

    // Submit the form
    const submitButton = page.getByRole('button', { name: /transfer funds/i });
    await submitButton.click();

    // Should show error
    await expect(page.getByText(/cannot transfer to the same account/i)).toBeVisible();
  });

  test('should show validation error for empty fields', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });

    // Try to submit without filling fields
    const submitButton = page.getByRole('button', { name: /transfer funds/i });
    await submitButton.click();

    // Should show error
    await expect(page.getByText(/all fields are required/i)).toBeVisible();
  });

  test('should show validation error for invalid amount', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForSelector('h1', { timeout: 10000 });

    // Fill in form with invalid amount
    const fromAccountSelect = page.locator('select#fromAccount');
    await fromAccountSelect.selectOption({ index: 1 });

    const toAccountSelect = page.locator('select#toAccount');
    await toAccountSelect.selectOption({ index: 2 });

    const amountInput = page.locator('input#amount');
    await amountInput.fill('-10.00'); // Negative amount

    const descriptionInput = page.locator('input#description');
    await descriptionInput.fill('Invalid amount test');

    // Submit the form
    const submitButton = page.getByRole('button', { name: /transfer funds/i });
    await submitButton.click();

    // Should show error (either from validation or API)
    const errorText = page.locator('text=/valid|greater than 0/i');
    await expect(errorText).toBeVisible();
  });
});

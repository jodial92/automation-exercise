import { expect, test } from '@playwright/test';

test('navigate to about us page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.html');
    
    // Click the About Us link.
    await page.click('text=About Us');
    
    // Expects the URL to contain about.htm.
    await expect(page).toHaveURL(/.*about.htm/);
    }
);

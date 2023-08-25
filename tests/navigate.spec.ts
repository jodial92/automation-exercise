import { expect, test } from '@playwright/test';

test('navigate to about us page', async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.html');
    
    // Click the About Us link.
    await page.click('text=About Us');
    
    // Expects the URL to contain about.htm.
    await expect(page).toHaveURL(/.*about.htm/);
    }
);
/*
test('POST example', async ({ page }) => {
    const url = 'https://parabank.parasoft.com/parabank/register.htm';
    const postData = 'customer.firstName=John&customer.lastName=Smith&customer.address.street=Liberty+Street&customer.address.city=New+York&customer.address.state=New+York&customer.address.zipCode=10001&customer.phoneNumber=&customer.ssn=555501236&customer.username=johnsmith56&customer.password=test1234&repeatedPassword=test1234';

    await page.route(url, (route) => {
        route.continue({ method: 'POST', postData });
    });

    await page.goto(url);
    await expect(page).toHaveURL(/.*about.htm/);
});*/

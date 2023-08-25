import { expect, request, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    
});

test.describe('E2E', () => {

    test('Account closure', async ({ page }) => {
        
    });

    test('Account profile update', async ({ page }) => {
        
    });
});

test.describe('API', () => {

    test('User registration', async ({ page }) => {
        
        const url = 'https://parabank.parasoft.com/parabank/register.htm';
        const userData = 'customer.firstName=John&customer.lastName=Smith&customer.address.street=Freedom+Street&customer.address.city=New+York&customer.address.state=New+York&customer.address.zipCode=10001&customer.phoneNumber=4105096995&customer.ssn=555501240&customer.username=randomUser1566&customer.password=test1234&repeatedPassword=test1234';

    });

    test('Account balance', async ({ page }) => {
        
    });

    test('Transaction History', async ({ page }) => {
        
    });
});
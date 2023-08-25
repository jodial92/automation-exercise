import { expect, request, test } from '@playwright/test';
import HomePage from '../src/pages/HomePage';
import UpdateContactInfoPage from '../src/pages/UpdateContactInfoPage';
import { AccountServices } from '../src/utils/AccountServicesEnum';

/* Users on the page get deleted automatically after some time.
 * In order to run the test suite successfully, some data must be manually 
 * updated before; run the user registration test and get the data from it.
 * Look for the new user in the console log as "YOUR NEW USER IS: "
 * The account must be manually obtained and updated from the previous user.
 * This can be improved but I ran out of time.
*/
const username = 'randomUser50763';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    if (testInfo.title !== 'User registration') {
        const homePage = new HomePage(page);
        await homePage.enterUsername(username);
        await homePage.enterPassword('test1234');
        await homePage.clickLoginButton();
    }
});

test.describe('E2E', () => {

    test('Account closure', async ({ page }) => {
        //As of 25-Aug-2023, there's no way to close an account
    });

    test('Account profile update', async ({ page }) => {
        const homePage = new HomePage(page);
        const updateContactInfoPage = new UpdateContactInfoPage(page);
        
        await homePage.clickPageLink(AccountServices.UPDATE_CONTACT);
        await expect(page).toHaveURL(/.*updateprofile.htm/);
        await updateContactInfoPage.enterFirstName('John');
        await updateContactInfoPage.enterLastName('Smithh');
        await updateContactInfoPage.clickUpdateProfileButton();
        await updateContactInfoPage.validateProfileUpdatedMessage();
        //I couldn't figure out where this changes reflect so this is it fot the test
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
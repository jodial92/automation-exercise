import { expect, request, test } from '@playwright/test';
import AccountDetailsPage from '../src/pages/AccountDetailsPage';
import AccountsOverviewPage from '../src/pages/AccountsOverviewPage';
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
const accountNumber = '23334'

test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.title !== 'User registration') {
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
        const homePage = new HomePage(page);
        await homePage.enterUsername(username);
        await homePage.enterPassword('test1234');
        await homePage.clickLoginButton();
    }
});

test.describe('E2E', () => {

    test('Account closure', async ({ page }) => {
        //As of 25-Aug-2023, there's no way to close a user account
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
        //Changes aren't reflected anywhere so the test ends here
    });
});

test.describe('API', () => {

    test('User registration', async ({ page }) => {
        const url = 'https://parabank.parasoft.com/parabank/register.htm';
        
        const formData = new URLSearchParams();
        formData.append('customer.firstName','John');
        formData.append('customer.lastName','Smith');
        formData.append('customer.address.street','Freedom');
        formData.append('customer.address.city','New York');
        formData.append('customer.address.state','New York');
        formData.append('customer.address.zipCode','10001');
        formData.append('customer.phoneNumber','4041234321');
        formData.append('customer.ssn','555501239');
        formData.append('customer.username','johnsmith0143');
        formData.append('customer.password','test1234');
        formData.append('repeated.password','test1234');
        
        const response = await page.request.post(url, {
            ignoreHTTPSErrors: true,
            headers: {
                'authority': 'parabank.parasoft.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en-US,en;q=0.9,es;q=0.8',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                //'cookie': 'JSESSIONID=7D35194C0007BF00A7B66BBEB547E91D',
                'origin': 'https://parabank.parasoft.com',
                'referer': 'https://parabank.parasoft.com/parabank/register.htm',
                'sec-ch-ua-mobile': '?0',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1'
            },
            data: formData.toString()
        })
        
        //I couldn't figure out how to get a successful POST response without a cookie
        console.log((await response.body()).toString());
        expect(response.status()).toBe(200);
    });

    test('Account balance', async ({ page }) => {
        const homePage = new HomePage(page);
        const accountsOverviewPage = new AccountsOverviewPage(page);
        const accountDetailsPage = new AccountDetailsPage(page);
        
        await homePage.clickPageLink(AccountServices.ACCT_OVERVIEW);
        await expect(page).toHaveURL(/.*overview.htm/);
        await accountsOverviewPage.clickOnAccount(accountNumber);
        await expect(page).toHaveURL(/.*activity.htm/);

        const url = `http://parabank.parasoft.com/parabank/services/bank/accounts/${accountNumber}`;

        const response = await page.request.get(url, {
            ignoreHTTPSErrors: true,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        expect(response.status()).toBe(200);
        
        const responseBody = (await response.body()).toString();
        await accountDetailsPage.validateApiBalance(responseBody);
    });

    test('Transaction History', async ({ page }) => {
        const homePage = new HomePage(page);
        const accountsOverviewPage = new AccountsOverviewPage(page);
        const accountDetailsPage = new AccountDetailsPage(page);
        
        await homePage.clickPageLink(AccountServices.ACCT_OVERVIEW);
        await expect(page).toHaveURL(/.*overview.htm/);
        await accountsOverviewPage.clickOnAccount(accountNumber);
        await expect(page).toHaveURL(/.*activity.htm/);

        const url = `http://parabank.parasoft.com/parabank/services/bank/accounts/${accountNumber}/transactions`;

        const response = await page.request.get(url, {
            ignoreHTTPSErrors: true,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        expect(response.status()).toBe(200);
        
        const responseBody = (await response.body()).toString();
        await accountDetailsPage.validateApiTransactionHistory(responseBody);
    });
});
import { expect, test } from '@playwright/test';
import AccountsOverviewPage from '../src/pages/AccountsOverviewPage';
import HomePage from '../src/pages/HomePage';
import TransferFundsPage from '../src/pages/TransferFundsPage';
import { AccountServices } from '../src/utils/AccountServicesEnum';
import { ActivityPeriod, TransactionType } from '../src/utils/AccountActivityEnum';
import AccountDetailsPage from '../src/pages/AccountDetailsPage';
import BillPayPage from '../src/pages/BillPayPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await homePage.enterUsername('johnsmith55');
    await homePage.enterPassword('test1234');
    await homePage.clickLoginButton();
});

test.describe('Test Cases - User Registration', () => {
    
    test('User registration', async ({ page }) => {

    });
});

test.describe('Test Cases - Registered User', () => {

    test('Account login', async ({ page }) => {
        const homePage = new HomePage(page);

        await expect(page).toHaveURL(/.*overview.htm/);
        await homePage.validateWelcomeMessage("John Smith");
    });

    test('Transfer funds', async ({ page }) => {
        const homePage = new HomePage(page);
        const transferFundsPage = new TransferFundsPage(page);

        await homePage.clickPageLink(AccountServices.TRANS_FUNDS);
        await expect(page).toHaveURL(/.*transfer.htm/);
        await transferFundsPage.enterAmount("50");
        await transferFundsPage.selectDestinationAccount('20004');
        await transferFundsPage.clickTransferButton();
        await transferFundsPage.validateTransferCompleteMessage();
    });

    test('Account statement', async ({ page }) => {
        const homePage = new HomePage(page);
        const accountsOverviewPage = new AccountsOverviewPage(page);
        const accountDetailsPage = new AccountDetailsPage(page);

        await homePage.clickPageLink(AccountServices.ACCT_OVERVIEW);
        await expect(page).toHaveURL(/.*overview.htm/);
        await accountsOverviewPage.clickOnAccount("15564");
        await expect(page).toHaveURL(/.*activity.htm/);
        await accountDetailsPage.selectActivityPeriod(ActivityPeriod.AUG);
        await accountDetailsPage.selectTransactionType(TransactionType.CREDIT);
        await accountDetailsPage.clickGoButton();
        await accountDetailsPage.validateStatementTablePresence();
    });

    test('Bill payment', async ({ page }) => {
        const homePage = new HomePage(page);
        const billPayPage = new BillPayPage(page);

        await homePage.clickPageLink(AccountServices.BILL_PAY);
        await expect(page).toHaveURL(/.*billpay.htm/);
        await billPayPage.enterBillPaymentInfo(
            "John Doe",
            "Free Street",
            "Baltimore",
            "Maryland",
            "21201",
            "4105096995",
            "21003",
            "50");
        await billPayPage.clickSendPaymentButton();
        await billPayPage.validateBillPaymentCompleteMessage();
    });

    test('Loan application', async ({ page }) => {

    });
});
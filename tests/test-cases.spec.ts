import { expect, test } from '@playwright/test';
import AccountsOverviewPage from '../src/pages/AccountsOverviewPage';
import HomePage from '../src/pages/HomePage';
import TransferFundsPage from '../src/pages/TransferFundsPage';
import { Login } from '../src/utils/SignUpEnum';
import { randomUser } from '../src/utils/UserGenerator';
import { AccountServices } from '../src/utils/AccountServicesEnum';
import { ActivityPeriod, TransactionType } from '../src/utils/AccountActivityEnum';
import AccountDetailsPage from '../src/pages/AccountDetailsPage';
import BillPayPage from '../src/pages/BillPayPage';
import RequestLoanPage from '../src/pages/RequestLoanPage';
import RegisterPage from '../src/pages/RegisterPage';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');

    if (testInfo.title !== 'User registration') {
        const homePage = new HomePage(page);
        await homePage.enterUsername('johnsmith55');
        await homePage.enterPassword('test1234');
        await homePage.clickLoginButton();
    }
});

test.describe('Test Cases - User Registration', () => {

    test('User registration', async ({ page }) => {
        const homePage = new HomePage(page);
        const registerPage = new RegisterPage(page);

        await homePage.clickPageLink(Login.REGISTER);
        await expect(page).toHaveURL(/.*register.htm/);
        await registerPage.enterSignupInfo(
            "John",
            "Smith",
            "Freedom Street",
            "New York",
            "New York",
            "10001",
            "4105096995",
            "555501240",
            randomUser,
            "test1234");
        await registerPage.clickRegisterButton();
        await registerPage.validateWelcomeMessage(randomUser);
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
        await transferFundsPage.selectDestinationAccount('13677');
        await transferFundsPage.clickTransferButton();
        await transferFundsPage.validateTransferCompleteMessage();
    });

    test('Account statement', async ({ page }) => {
        const homePage = new HomePage(page);
        const accountsOverviewPage = new AccountsOverviewPage(page);
        const accountDetailsPage = new AccountDetailsPage(page);

        await homePage.clickPageLink(AccountServices.ACCT_OVERVIEW);
        await expect(page).toHaveURL(/.*overview.htm/);
        await accountsOverviewPage.clickOnAccount("13566");
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
        const homePage = new HomePage(page);
        const requestLoanPage = new RequestLoanPage(page);

        await homePage.clickPageLink(AccountServices.REQ_LOAN);
        await requestLoanPage.enterLoanInfo("2000","100");
        await requestLoanPage.selectOriginAccount("13566");
        await requestLoanPage.clickAppyNowButton();
        await requestLoanPage.validateBillPaymentCompleteMessage();
    });
});
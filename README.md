# Test Automation Exercise

This repository contains an exercise for practicing test automation using Playwright with TypeScript. The exercise is based on the [Parabank](https://parabank.parasoft.com/parabank/index.html) website, where participants will write automated test scripts to validate various functionalities.

## Exercise Overview

The exercise consists of several test cases that cover different scenarios on the Parabank website. Participants are required to implement the test cases using Playwright with TypeScript and follow the Page Object Model (POM) design pattern.

## Prerequisites

Before starting the exercise, make sure you have the following dependencies installed:

- [Node.js](https://nodejs.org) (v18 or higher)
- [Playwright](https://playwright.dev) (v1.35.1 or higher)

## Getting Started

To get started with the exercise, follow these steps:

1. Clone this repository to your local machine.
2. Install the project dependencies by running the following command: `npm i && npx playwright install`
3. Open the project in your favorite code editor.
4. Navigate to the `tests` directory to find an example: `tests/navigate.spec.ts`
5. Implement the test cases based on the provided examples using Playwright and TypeScript.
6. Run the test scripts using the following command: `npx playwright test`

## Test Cases

The exercise includes the following test cases:

1. User Registration: Validates the registration process by filling out the registration form and verifying the success message.
2. Account Login: Verifies the login functionality by entering valid credentials and checking the welcome message.
3. Transfer Funds: Tests the fund transfer process by entering the transfer details and verifying the success message.
4. Account Statement: Generates an account statement by selecting the account and days, then validates the presence of the statement table.
5. Bill Payment: Performs a bill payment by entering the payment details and confirming the success message.
6. Loan Application: This test scenario validates the loan application process by submitting a loan application form with valid details.


## More Challenges

### E2E

1. Account Closure

   Description: This scenario tests the end-to-end process of closing a user account.

   Steps:
     1. Log in to the Parabank website using valid credentials.
     2. Navigate to the account closure page.
     3. Provide any required information or confirmations to initiate the account closure process.
     4. Verify that a confirmation message is displayed, indicating that the account closure request has been submitted.
     5. Attempt to log in again using the same account credentials.
     5. Validate that the login is no longer possible and the user is unable to access any account-related functionality.

2. Account Profile Update

   Description: This scenario tests the end-to-end process of updating the user account profile information.
   
   Steps:
     1. Log in to the Parabank website using valid credentials.
     2. Navigate to the account profile page.
     3. Update one or more account profile fields, such as contact information or preferences.
     4. Save the updated profile information.
     5. Verify that a success message is displayed, indicating that the account profile has been updated successfully.
     6. Validate that the updated information is reflected on subsequent pages or in the account overview.


### API
The challenges are as follows:

1. User Registration

    Description: This test scenario validates the User Registration API by sending a request with valid user registration data.
   
    Steps:
      1. Prepare valid user registration data (e.g., first name, last name, email, password).
      2. Send a POST request to the User Registration API endpoint with the valid user data.
      3. Verify the response status code to ensure a successful registration (e.g., 200 or 201).
      4. Optionally, validate the response body to ensure it contains the expected data or success message.
      5. Verify that the registered user can successfully log in using the registered credentials.
    
    Expected Outcome: The registered user can successfully log in using the registered credentials.


2. Account Balance

   Description: This test scenario validates that the account balance is displayed correctly after logging in.

   Steps:
      1. Log in to the Parabank website using valid credentials.
      2. Retrieve the account balance from the UI.
      3. Perform a backend API call to get the actual account balance.
      4. Compare the UI account balance with the actual account balance obtained from the API.
   
   Expected Outcome: The account balance displayed on the UI should match the actual account balance retrieved from the API.

3. Transaction History

   Description: This test scenario verifies that the transaction history is displayed accurately for a specific account.

   Steps:
      1. Log in to the Parabank website using valid credentials.
      2. Navigate to the transaction history page.
      3. Select a specific account.
      4. Retrieve the transaction history table from the UI.
      5. Perform a backend API call to get the actual transaction history for the selected account.
      6. Compare the UI transaction history table with the actual transaction history obtained from the API.
   
   Expected Outcome: The transaction history table displayed on the UI should match the actual transaction history retrieved from the API.


### CI
In order to run using Github Actions the candidate can use the `.github/workflows/playwright.yml` as starting point and implement the follows challenges under that file or similar.
The challenges are as follows:
  1. Implement a way to execute all the browser in parallel under .github/workflows/playwright.yml
  2. Implement a way to share the results to a Slack channel (can be #automation-reports) under .github/workflows/playwright.yml
  3. Implement a way to share the link for the HTML report to a Slack channel (can be #automation-reports) under .github/workflows/playwright.yml

Disclaimer: The `.github/workflows/playwright.yml` file is not ready to run!


## Contributing

Contributions to this exercise are welcome! If you have any ideas for improvements or additional test cases, feel free to open an issue or submit a pull request.





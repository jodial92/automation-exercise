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
2. Install the project dependencies by running the following command: `npm i && npx playwright install --with-deps`
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


## More Challenges

In order to run using Github Actions the candidate can use the `.github/workflows/playwright.yml` as starting point. It's not ready to run!


## Contributing

Contributions to this exercise are welcome! If you have any ideas for improvements or additional test cases, feel free to open an issue or submit a pull request.





# Task Description

To see the description of the task assignment [follow the link](https://github.com/mate-academy/qa_pw_parabank_test_framework/blob/main/TaskDescription.md). 

# Repository Overview

This repository contains a test automation framework for the [Parabank](https://parabank.parasoft.com/parabank/index.htm) bank application testing. 

# How to use this project

## Installation steps

To install the project follow the next steps:

1. Install Node.js.
2. Run the installation command in the project root.:
```bash
npm ci
```
3. Run the browsers installation in the project root.
```bash
npx playwright install
```
4. Install Allure commandline tool (Allure requires Java 8 or higher).
```bash
npm install -g allure-commandline
```

## How to run the tests

Run all tests:

```
npm test
```

Run a specific suite:

```
npm run test:not-logged-in
npm run test:logged-in
```

Run a single file or filter tests by name:

```
npx playwright test tests/loggedInUser/payments/billPay
npx playwright test -g "Sign in with valid credentials"
```

Run in headed mode or in the Playwright UI mode for debugging:

```
npm run test:headed
npm run test:ui
```

### Notes on the test environment

The tests run against the public ParaBank demo application, which is shared
between all its users and protected by Cloudflare. Because of that:

- Each test creates its own user via a fixture, so the tests do not depend on
  any pre-existing account.
- Static resources (images, fonts) are blocked in tests to reduce the number of
  requests sent to the demo site.
- The tests run sequentially (`workers: 1`). Running them in parallel triggers
  the bot protection of the demo site.
- Occasional failures on registration or page load usually mean the demo site is
  rate limiting the requests, not that the application is broken. Check the
  screenshot attached to the failed test to confirm.

## How to generate report

The tests are executed with the Allure reporter, so every run writes its raw
results into the `allure-results` folder. Allure requires Java 8 or higher and
the `allure-commandline` tool (see the installation steps above).

Generate the report and open it in a browser:

```
npm run report:generate
npm run report:open
```

Or generate a temporary report and open it in one command:

```
npm run report
```

The results of several runs are accumulated in `allure-results`. Delete the
folder before a run to report on that run only.

The report contains:

- the test tree under **Suites**, built automatically from the test folder
  structure (`parentSuite` / `suite` / `subSuite`);
- the steps of every test, including the actions and assertions of the page
  objects;
- the severity of every test;
- screenshots and traces attached to the failed tests;
- the tests marked with the `known-bug` tag, which document the defects found in
  the application.

import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Loan request is processed and returns a decision', async ({
  registeredUser,
  accountsOverviewPage,
  accountServicesPanel,
  requestLoanPage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);

  await accountsOverviewPage.open();
  const [fromAccount] = await accountsOverviewPage.getAccountNumbers();

  await accountServicesPanel.clickLink('Request Loan');
  await requestLoanPage.assertOpened();
  await requestLoanPage.requestLoan({
    amount: '1000',
    downPayment: '100',
    fromAccount,
  });
  await requestLoanPage.assertLoanApproved();
});

test('Loan request is denied when down payment exceeds balance', async ({
  registeredUser,
  accountsOverviewPage,
  requestLoanPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);

  await accountsOverviewPage.open();
  const [fromAccount] = await accountsOverviewPage.getAccountNumbers();

  await requestLoanPage.open();
  await requestLoanPage.requestLoan({
    amount: '1000',
    downPayment: '99999999',
    fromAccount,
  });
  await requestLoanPage.assertLoanDenied();
});

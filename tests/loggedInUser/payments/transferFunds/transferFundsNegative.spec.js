import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

const invalidAmounts = [
  { title: 'empty amount', amount: '' },
  { title: 'non-numeric amount', amount: 'abc' },
];

for (const { title, amount } of invalidAmounts) {
  test(`Transfer is rejected for ${title}`, async ({
    userWithTwoAccounts,
    accountsOverviewPage,
    accountServicesPanel,
    transferFundsPage,
  }) => {
    await allure.severity(allure.Severity.CRITICAL);
    await allure.description(
      'Known UX issue: the app shows a generic "internal error" message instead of a field validation message.',
    );
    const [from, to] = userWithTwoAccounts.accounts;

    await accountsOverviewPage.open();
    const fromBalanceBefore =
      await accountsOverviewPage.getAccountBalance(from);
    const toBalanceBefore = await accountsOverviewPage.getAccountBalance(to);

    await accountServicesPanel.clickLink('Transfer Funds');
    const response = await transferFundsPage.transfer({ amount, from, to });
    await transferFundsPage.assertTransferRejected(response);
    await transferFundsPage.assertErrorMessageIsVisible(
      'An internal error has occurred and has been logged.',
    );

    await accountServicesPanel.clickLink('Accounts Overview');
    await accountsOverviewPage.assertAccountBalance(from, fromBalanceBefore);
    await accountsOverviewPage.assertAccountBalance(to, toBalanceBefore);
  });
}

const knownBugCases = [
  {
    title: 'negative amount',
    getTransfer: ([from, to]) => ({ amount: '-50', from, to }),
  },
  {
    title: 'zero amount',
    getTransfer: ([from, to]) => ({ amount: '0', from, to }),
  },
  {
    title: 'amount exceeding balance',
    getTransfer: ([from, to]) => ({ amount: '99999999', from, to }),
  },
  {
    title: 'transfer to the same account',
    getTransfer: ([from]) => ({ amount: '10', from, to: from }),
  },
];

for (const { title, getTransfer } of knownBugCases) {
  test(`Transfer is rejected for ${title}`, async ({
    userWithTwoAccounts,
    transferFundsPage,
  }) => {
    test.fail(true, `Known bug: Parabank accepts transfer with ${title}`);
    await allure.severity(allure.Severity.CRITICAL);
    await allure.tag('known-bug');

    await transferFundsPage.open();
    const response = await transferFundsPage.transfer(
      getTransfer(userWithTwoAccounts.accounts),
    );
    await transferFundsPage.assertTransferRejected(response);
  });
}

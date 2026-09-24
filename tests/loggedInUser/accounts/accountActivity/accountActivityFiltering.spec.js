import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

const monthName = date => date.toLocaleString('en-US', { month: 'long' });

for (const type of ['Debit', 'Credit']) {
  test(`Filter account activity by ${type} type`, async ({
    accountWithTransactions,
    accountDetailsPage,
  }) => {
    await allure.severity(allure.Severity.NORMAL);

    await accountDetailsPage.open(accountWithTransactions);
    await accountDetailsPage.filterActivity({ period: 'All', type });
    await accountDetailsPage.assertAllTransactionsOfType(type);
  });
}

test('Filter account activity by current month', async ({
  accountWithTransactions,
  accountDetailsPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);
  const today = new Date();

  await accountDetailsPage.open(accountWithTransactions);
  await accountDetailsPage.filterActivity({
    period: monthName(today),
    type: 'All',
  });
  await accountDetailsPage.assertAllTransactionsInMonth(today);
  await accountDetailsPage.assertBothTransactionTypesPresent();
});

test('Filter account activity by month without transactions', async ({
  accountWithTransactions,
  accountDetailsPage,
}) => {
  await allure.severity(allure.Severity.MINOR);
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  await accountDetailsPage.open(accountWithTransactions);
  await accountDetailsPage.filterActivity({
    period: monthName(nextMonth),
    type: 'All',
  });
  await accountDetailsPage.assertNoTransactionsFound();
});

import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { formatDate } from '../../../../src/common/helpers/stringHelpers';

test('Find transaction by amount', async ({
  accountWithKnownTransaction,
  findTransactionsPage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);
  const { account, amount } = accountWithKnownTransaction;

  await findTransactionsPage.open();
  await findTransactionsPage.assertOpened();
  await findTransactionsPage.selectAccount(account);
  await findTransactionsPage.findByAmount(amount);
  await findTransactionsPage.assertResultsContainAmount(amount);
});

test('Find transactions by date', async ({
  accountWithKnownTransaction,
  findTransactionsPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);
  const { account, amount } = accountWithKnownTransaction;

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(account);
  await findTransactionsPage.findByDate(formatDate(new Date()));
  await findTransactionsPage.assertResultsContainAmount(amount);
});

test('Find transactions by date range', async ({
  accountWithKnownTransaction,
  findTransactionsPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);
  const { account, amount } = accountWithKnownTransaction;
  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
  );

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(account);
  await findTransactionsPage.findByDateRange(
    formatDate(yesterday),
    formatDate(today),
  );
  await findTransactionsPage.assertResultsContainAmount(amount);
});

test('Search fails when amount is empty', async ({
  accountWithKnownTransaction,
  findTransactionsPage,
}) => {
  await allure.severity(allure.Severity.MINOR);

  await findTransactionsPage.open();
  await findTransactionsPage.selectAccount(accountWithKnownTransaction.account);
  await findTransactionsPage.assertSearchIsNotSent(() =>
    findTransactionsPage.findByAmount('', { expectRequest: false }),
  );
  await findTransactionsPage.assertValidationErrorIsVisible();
});

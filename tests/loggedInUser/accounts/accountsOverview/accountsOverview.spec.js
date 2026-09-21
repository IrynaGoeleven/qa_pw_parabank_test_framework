import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test(
  'New user sees one account and correct total in Accounts Overview',
  async ({
  registeredUser,
  accountsOverviewPage,
  }) => {
  await allure.severity(allure.Severity.CRITICAL);

  await accountsOverviewPage.open();
  await accountsOverviewPage.assertOpened();
  await accountsOverviewPage.assertAccountsCount(1);
  await accountsOverviewPage.assertTotalEqualsSumOfBalances();
});

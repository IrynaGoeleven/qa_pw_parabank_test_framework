import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Account Details shows data consistent with Accounts Overview', async ({
  registeredUser,
  accountsOverviewPage,
  accountDetailsPage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);

  await accountsOverviewPage.open();
  const [accountNumber] = await accountsOverviewPage.getAccountNumbers();
  const balance = await accountsOverviewPage.getAccountBalance(accountNumber);

  await accountsOverviewPage.clickAccount(accountNumber);
  await accountDetailsPage.assertOpened();
  await accountDetailsPage.assertAccountDetails({
    accountNumber,
    accountType: 'CHECKING',
    balance,
  });
});

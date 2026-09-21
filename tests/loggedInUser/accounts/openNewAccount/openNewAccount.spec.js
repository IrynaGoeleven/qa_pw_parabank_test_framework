import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

const accountTypes = ['CHECKING', 'SAVINGS'];

for (const accountType of accountTypes) {
  test(`Open new ${accountType} account funded from existing account`, async ({
    registeredUser,
    accountsOverviewPage,
    accountServicesPanel,
    openNewAccountPage,
    accountDetailsPage,
  }) => {
    await allure.severity(allure.Severity.CRITICAL);

    await accountsOverviewPage.open();
    const [sourceAccount] = await accountsOverviewPage.getAccountNumbers();
    const sourceBalanceBefore =
      await accountsOverviewPage.getAccountBalance(sourceAccount);

    await accountServicesPanel.clickLink('Open New Account');
    await openNewAccountPage.assertOpened();
    const minimumDeposit = await openNewAccountPage.getMinimumDeposit();
    const newAccount = await openNewAccountPage.openAccount(
      accountType,
      sourceAccount,
    );
    await openNewAccountPage.assertAccountOpened();

    await accountServicesPanel.clickLink('Accounts Overview');
    await accountsOverviewPage.assertAccountsCount(2);
    await accountsOverviewPage.assertAccountBalance(newAccount, minimumDeposit);
    await accountsOverviewPage.assertAccountBalance(
      sourceAccount,
      sourceBalanceBefore - minimumDeposit,
    );

    await accountsOverviewPage.clickAccount(newAccount);
    await accountDetailsPage.assertAccountDetails({
      accountNumber: newAccount,
      accountType,
      balance: minimumDeposit,
    });
  });
}

import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

const validAmounts = ['0.01', '25.50', '100'];

for (const amount of validAmounts) {
  test(`Transfer ${amount} between own accounts`, async ({
    userWithTwoAccounts,
    accountsOverviewPage,
    accountServicesPanel,
    transferFundsPage,
  }) => {
    await allure.severity(allure.Severity.CRITICAL);
    const [from, to] = userWithTwoAccounts.accounts;
    const amountValue = Number(amount);

    await accountsOverviewPage.open();
    const fromBalanceBefore =
      await accountsOverviewPage.getAccountBalance(from);
    const toBalanceBefore = await accountsOverviewPage.getAccountBalance(to);

    await accountServicesPanel.clickLink('Transfer Funds');
    await transferFundsPage.assertOpened();
    await transferFundsPage.transfer({ amount, from, to });
    await transferFundsPage.assertTransferComplete({
      amount: amountValue,
      from,
      to,
    });

    await accountServicesPanel.clickLink('Accounts Overview');
    await accountsOverviewPage.assertAccountBalance(
      from,
      fromBalanceBefore - amountValue,
    );
    await accountsOverviewPage.assertAccountBalance(
      to,
      toBalanceBefore + amountValue,
    );
  });
}

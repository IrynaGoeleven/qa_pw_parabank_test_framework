import { test as authTest } from './fixturesAuth';

export const test = authTest.extend<{
  userWithTwoAccounts;
  accountWithTransactions;
}>({
  userWithTwoAccounts: async (
    { registeredUser, accountsOverviewPage, openNewAccountPage },
    use,
  ) => {
    await accountsOverviewPage.open();
    const [firstAccount] = await accountsOverviewPage.getAccountNumbers();

    await openNewAccountPage.open();
    const secondAccount = await openNewAccountPage.openAccount(
      'CHECKING',
      firstAccount,
    );
    await openNewAccountPage.assertAccountOpened();

    await use({ ...registeredUser, accounts: [firstAccount, secondAccount] });
  },

  accountWithTransactions: async (
    { userWithTwoAccounts, transferFundsPage },
    use,
  ) => {
    const [mainAccount, secondAccount] = userWithTwoAccounts.accounts;

    await transferFundsPage.open();
    await transferFundsPage.transfer({
      amount: '10',
      from: mainAccount,
      to: secondAccount,
    });
    await transferFundsPage.assertTransferComplete({
      amount: 10,
      from: mainAccount,
      to: secondAccount,
    });

    await transferFundsPage.open();
    await transferFundsPage.transfer({
      amount: '5',
      from: secondAccount,
      to: mainAccount,
    });
    await transferFundsPage.assertTransferComplete({
      amount: 5,
      from: secondAccount,
      to: mainAccount,
    });

    await use(mainAccount);
  },
});

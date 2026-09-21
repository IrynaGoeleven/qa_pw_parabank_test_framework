import { test as authTest } from './fixturesAuth';

export const test = authTest.extend<{
  userWithTwoAccounts: { accounts: string[] };
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
});

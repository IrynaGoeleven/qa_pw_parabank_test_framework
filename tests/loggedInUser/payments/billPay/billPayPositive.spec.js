import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generatePayee } from '../../../../src/common/helpers/testDataHelpers';

test('Pay a bill from an existing account', async ({
  registeredUser,
  accountsOverviewPage,
  accountServicesPanel,
  billPayPage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);
  const payee = generatePayee();
  const amount = '50';

  await accountsOverviewPage.open();
  const [fromAccount] = await accountsOverviewPage.getAccountNumbers();
  const balanceBefore =
    await accountsOverviewPage.getAccountBalance(fromAccount);

  await accountServicesPanel.clickLink('Bill Pay');
  await billPayPage.assertOpened();
  await billPayPage.payBill({ payee, amount, fromAccount });
  await billPayPage.assertPaymentComplete({
    payeeName: payee.name,
    amount: Number(amount),
    fromAccount,
  });

  await accountServicesPanel.clickLink('Accounts Overview');
  await accountsOverviewPage.assertAccountBalance(
    fromAccount,
    balanceBefore - Number(amount),
  );
});

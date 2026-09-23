import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generatePayee } from '../../../../src/common/helpers/testDataHelpers';

const requiredPayeeFields = [
  {
    field: 'name',
    errorId: 'validationModel-name',
    error: 'Payee name is required.',
  },
  {
    field: 'address',
    errorId: 'validationModel-address',
    error: 'Address is required.',
  },
  {
    field: 'city',
    errorId: 'validationModel-city',
    error: 'City is required.',
  },
  {
    field: 'state',
    errorId: 'validationModel-state',
    error: 'State is required.',
  },
  {
    field: 'zipCode',
    errorId: 'validationModel-zipCode',
    error: 'Zip Code is required.',
  },
  {
    field: 'phone',
    errorId: 'validationModel-phoneNumber',
    error: 'Phone number is required.',
  },
];

for (const { field, errorId, error } of requiredPayeeFields) {
  test(`Bill payment fails when payee ${field} is empty`, async ({
    registeredUser,
    accountsOverviewPage,
    billPayPage,
  }) => {
    await allure.severity(allure.Severity.NORMAL);
    const payee = { ...generatePayee(), [field]: '' };

    await accountsOverviewPage.open();
    const [fromAccount] = await accountsOverviewPage.getAccountNumbers();

    await billPayPage.open();
    await billPayPage.payBill({ payee, amount: '50', fromAccount });
    await billPayPage.assertOnlyFieldErrorIsVisible(errorId, error);
  });
}

test('Bill payment fails when account numbers do not match', async ({
  registeredUser,
  accountsOverviewPage,
  billPayPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);
  const payee = { ...generatePayee(), verifyAccount: '99999' };

  await accountsOverviewPage.open();
  const [fromAccount] = await accountsOverviewPage.getAccountNumbers();

  await billPayPage.open();
  await billPayPage.payBill({ payee, amount: '50', fromAccount });
  await billPayPage.assertFieldErrorIsVisible(
    'validationModel-verifyAccount-mismatch',
    'The account numbers do not match.',
  );
});

test('Bill payment fails when amount is empty', async ({
  registeredUser,
  accountsOverviewPage,
  billPayPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);

  await accountsOverviewPage.open();
  const [fromAccount] = await accountsOverviewPage.getAccountNumbers();

  await billPayPage.open();
  await billPayPage.payBill({
    payee: generatePayee(),
    amount: '',
    fromAccount,
  });
  await billPayPage.assertFieldErrorIsVisible(
    'validationModel-amount-empty',
    'The amount cannot be empty.',
  );
});

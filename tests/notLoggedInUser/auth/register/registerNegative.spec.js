import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generateUser } from '../../../../src/common/helpers/testDataHelpers';

const requiredFields = [
  { field: 'firstName', error: 'First name is required.' },
  { field: 'lastName', error: 'Last name is required.' },
  { field: 'address', error: 'Address is required.' },
  { field: 'city', error: 'City is required.' },
  { field: 'state', error: 'State is required.' },
  { field: 'zipCode', error: 'Zip Code is required.' },
  { field: 'ssn', error: 'Social Security Number is required.' },
  { field: 'username', error: 'Username is required.' },
  { field: 'password', error: 'Password is required.' },
  { field: 'confirmPassword', error: 'Password confirmation is required.' },
];

for (const { field, error } of requiredFields) {
  test(`Registration fails when ${field} is empty`, async ({
    registerPage,
  }) => {
    await allure.severity(allure.Severity.NORMAL);
    const user = { ...generateUser(), [field]: '' };

    await registerPage.open();
    await registerPage.register(user);
    await registerPage.assertErrorMessageIsVisible(error);
  });
}

test('Registration fails when passwords do not match', async ({
  registerPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);
  const user = { ...generateUser(), confirmPassword: 'differentPass123' };

  await registerPage.open();
  await registerPage.register(user);
  await registerPage.assertErrorMessageIsVisible('Passwords did not match.');
});

test('Registration fails with already existing username', async ({
  registerPage,
  existingUser,
}) => {
  await allure.severity(allure.Severity.CRITICAL);
  const user = { ...generateUser(), username: existingUser.username };

  await registerPage.open();
  await registerPage.register(user);
  await registerPage.assertErrorMessageIsVisible(
    'This username already exists.',
  );
});

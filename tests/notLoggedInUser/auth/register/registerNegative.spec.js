import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generateUser } from '../../../../src/common/helpers/testDataHelpers';
import {
  customerRequiredFields,
  credentialsRequiredFields,
} from '../../../../src/common/testData/requiredFieldErrors';

const requiredFields = [
  ...customerRequiredFields,
  ...credentialsRequiredFields,
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

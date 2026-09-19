import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generateUser } from '../../../../src/common/helpers/testDataHelpers';

test('Register a new user with valid data', async ({ registerPage }) => {
  await allure.severity(allure.Severity.BLOCKER);
  const user = generateUser();

  await registerPage.open();
  await registerPage.register(user);
  await registerPage.assertSuccessfulRegistration(user.username);
});

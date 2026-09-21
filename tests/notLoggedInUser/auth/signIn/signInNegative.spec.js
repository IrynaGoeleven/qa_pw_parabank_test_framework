import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

const emptyFieldCases = [
  { title: 'username is empty', username: '', password: 'somePass123' },
  { title: 'password is empty', username: 'someUser', password: '' },
  { title: 'both fields are empty', username: '', password: '' },
];

for (const { title, username, password } of emptyFieldCases) {
  test(`Sign in fails when ${title}`, async ({ homePage }) => {
    await allure.severity(allure.Severity.NORMAL);

    await homePage.open();
    await homePage.login(username, password);
    await homePage.assertLoginErrorMessage(
      'Please enter a username and password.',
    );
  });
}

test('Sign in fails with wrong password', async ({
  existingUser,
  homePage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);

  await homePage.open();
  await homePage.login(existingUser.username, 'wrongPass123');
  await homePage.assertLoginErrorMessage(
    'The username and password could not be verified.',
  );
});

test('Sign in fails with non-existent username', async ({ homePage }) => {
  await allure.severity(allure.Severity.CRITICAL);

  await homePage.open();
  await homePage.login(`noSuchUser${Date.now()}`, 'somePass123');
  await homePage.assertLoginErrorMessage(
    'The username and password could not be verified.',
  );
});

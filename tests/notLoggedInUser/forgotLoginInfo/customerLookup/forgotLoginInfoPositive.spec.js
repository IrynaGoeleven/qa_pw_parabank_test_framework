import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Recover login info with valid customer data', async ({
  existingUser,
  homePage,
  forgotLoginInfoPage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);

  await homePage.open();
  await homePage.clickForgotLoginInfoLink();
  await forgotLoginInfoPage.assertOpened();
  await forgotLoginInfoPage.findLoginInfo(existingUser);
  await forgotLoginInfoPage.assertLoginInfoIsShown(
    existingUser.username,
    existingUser.password,
  );
});

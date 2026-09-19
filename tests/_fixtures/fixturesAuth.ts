import { test as pagesTest } from './fixturesPages';
import { generateUser } from '../../src/common/helpers/testDataHelpers';
import { testStep } from '../../src/common/helpers/pwHelpers';

export const test = pagesTest.extend<{
  registeredUser;
  existingUser;
}>({
  registeredUser: async ({ registerPage }, use) => {
    const user = generateUser();

    await registerPage.open();
    await registerPage.register(user);
    await registerPage.assertSuccessfulRegistration(user.username);

    await use(user);
  },
  existingUser: async ({ registeredUser, page }, use) => {
    await testStep('End session of the registered user', async () => {
      await page.context().clearCookies();
    });

    await use(registeredUser);
  },
});

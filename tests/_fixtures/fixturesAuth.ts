import { test as pagesTest } from './fixturesPages';
import { generateUser } from '../../src/common/helpers/testDataHelpers';

export const test = pagesTest.extend<{
  registeredUser;
}>({
  registeredUser: async ({ registerPage }, use) => {
    const user = generateUser();

    await registerPage.open();
    await registerPage.register(user);
    await registerPage.assertSuccessfulRegistration(user.username);

    await use(user);
  },
});

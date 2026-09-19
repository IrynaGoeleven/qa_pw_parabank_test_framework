import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';

export const test = base.extend<{
  homePage: HomePage;
  registerPage: RegisterPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

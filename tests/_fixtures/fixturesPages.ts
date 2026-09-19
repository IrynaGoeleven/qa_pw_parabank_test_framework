import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';

export const test = base.extend<{
  homePage: HomePage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

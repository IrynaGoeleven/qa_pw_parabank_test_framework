import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as pagesTest } from './fixturesPages';
import { test as authTest } from './fixturesAuth';
import { test as accountsTest } from './fixturesAccounts';

export const test = mergeTests(genericTest, pagesTest, authTest, accountsTest);

import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as pagesTest } from './fixturesPages';
import { test as authTest } from './fixturesAuth';

export const test = mergeTests(genericTest, pagesTest, authTest);

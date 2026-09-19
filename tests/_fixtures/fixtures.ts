import { mergeTests } from '@playwright/test';
import { test as genericTest } from './fixturesGeneric';
import { test as pagesTest } from './fixturesPages';

export const test = mergeTests(genericTest, pagesTest);

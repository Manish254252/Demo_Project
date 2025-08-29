import { test as base } from '@playwright/test';
import { HomeSteps } from '../../src/steps/HomeSteps';
import { DavidJeremiahSteps } from '../../src/steps/DavidJeremiahSteps';

type TestFixtures = {
  homeSteps: HomeSteps;
  davidJeremiahSteps: DavidJeremiahSteps;
};

export const test = base.extend<TestFixtures>({
  homeSteps: async ({ page }, use) => {
    const homeSteps = new HomeSteps(page);
    await use(homeSteps);
  },
  davidJeremiahSteps: async ({ page }, use) => {
    const davidJeremiahSteps = new DavidJeremiahSteps(page);
    await use(davidJeremiahSteps);
  },
});

export { expect } from '@playwright/test';
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright end-to-end testing framework using the Page Object Model (POM) pattern with TypeScript. The main project is located in `dina_demo_project/`.

## Common Commands

### Testing
- `npm test` - Run all tests
- `npm run test:headed` - Run tests in headed mode (visible browser)
- `npm run test:ui` - Run tests with UI mode for debugging
- `npm run test:debug` - Debug tests step by step
- `npm run test:report` - View test report
- `npm run install:browsers` - Install Playwright browsers (required after fresh install)

### Development
- `npm run type-check` - TypeScript type checking
- `npm run lint` - Run ESLint on src/ and tests/
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier

## Architecture

### Page Object Model Structure
The project follows a strict POM pattern with three layers:

1. **Pages** (`src/pages/`): Page classes that encapsulate page elements and basic actions
   - All page classes extend `BasePage` which provides common methods like `clickElement()`, `fillInput()`, `waitForElement()`
   - Page classes should only contain page-specific locators and basic interactions

2. **Steps** (`src/steps/`): Business logic and complex workflows
   - All step classes extend `BaseSteps` which provides common assertions like `verifyPageTitle()`, `verifyCurrentUrl()`
   - Step classes orchestrate multiple page actions and contain test assertions
   - Step classes are injected into tests via custom fixtures

3. **Test Fixtures** (`tests/fixtures/`): Dependency injection for steps
   - `test-base.ts` extends Playwright's base test with custom fixtures
   - Automatically provides step class instances to tests

### Key Design Patterns
- **Inheritance**: Both pages and steps use base classes for common functionality
- **Dependency Injection**: Steps are provided to tests through fixtures
- **Separation of Concerns**: Pages handle UI interactions, Steps handle business logic, Tests handle scenarios

### Configuration
- Tests are configured to run on multiple browsers (Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari)
- Default base URL is `https://example.com` (modify in `playwright.config.ts`)
- Screenshots and videos are captured on failure
- Tests run in parallel by default

## Working Directory

Always work within the `dina_demo_project/` directory when making changes to the test framework.
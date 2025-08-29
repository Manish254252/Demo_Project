# Automated Demo Project - David Jeremiah Website Testing

A Playwright end-to-end testing framework for testing the David Jeremiah website workflow using the Page Object Model (POM) pattern with TypeScript.

## Project Overview

This project automates testing of the David Jeremiah website (davidjeremiah.org) workflow including:
- Navigation through splash page
- Book browsing and preorder functionality  
- User login process
- Homepage navigation

## Project Structure

```
automated_demo_project/
├── src/
│   ├── pages/           # Page Object Model classes
│   │   ├── BasePage.ts           # Base page class with common methods
│   │   ├── BookDetailsPage.ts    # Book details page interactions
│   │   ├── DavidJeremiahHomePage.ts # Main homepage interactions
│   │   ├── LoginPage.ts          # Login page functionality
│   │   └── SplashPage.ts         # Splash page interactions
│   ├── steps/           # Step classes for test actions
│   │   ├── BaseSteps.ts          # Base steps class with common assertions
│   │   ├── DavidJeremiahSteps.ts # David Jeremiah specific workflows
│   │   └── HomeSteps.ts          # Home page test steps
│   └── utils/           # Utility classes and helpers
│       ├── Logger.ts             # Logging utility
│       └── TestData.ts           # Test data management
├── tests/
│   ├── fixtures/        # Test fixtures and base test setup
│   │   └── test-base.ts          # Extended test fixture with steps
│   └── specs/           # Test specifications
│       └── davidJeremiah.spec.ts         # Main David Jeremiah test suite
├── allure-results/      # Allure test results
├── allure-report/       # Generated Allure HTML reports
├── playwright-report/   # Playwright HTML reports
├── test-results/        # Test execution results and artifacts
├── screenshots/         # Test screenshots
├── playwright.config.ts # Playwright configuration
└── tsconfig.json       # TypeScript configuration
```

### Key Features

- **Page Object Model (POM)** - Clean separation of page elements and test logic
- **Step-based Testing** - Business logic abstraction for readable tests
- **Allure Reporting** - Comprehensive test reporting with screenshots and videos
- **Multi-browser Support** - Tests can run across different browsers
- **Screenshot Capture** - Automatic screenshot capture on failures

## What is Page Object Model (POM)?

Page Object Model is a design pattern that creates an abstraction layer between tests and web pages. Instead of writing locators and actions directly in test files, POM organizes them into separate page classes:

- **Separation of Concerns** - Page elements and actions are separated from test logic
- **Reusability** - Page methods can be reused across multiple tests
- **Maintainability** - When UI changes, you only update the page class, not every test
- **Readability** - Tests become more readable with descriptive method names

**Example:**
```typescript
// Instead of: page.click('#login-button')
// Use: loginPage.clickLoginButton()
```

This approach makes tests more maintainable and easier to understand.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd automated_demo_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npm run install:browsers
   ```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run specific test by name pattern
npm run test davidJeremiah

# Run tests in debug mode
npm run test:debug

# Run tests across all browsers
npm run test:all-browsers

# View Playwright test report
npm run test:report
```

### Test Reporting

This project includes comprehensive reporting with Allure:

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Serve Allure report
npm run allure:serve
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

## Test Scenarios

The project currently contains **2 test cases** in `davidJeremiah.spec.ts`:

### 1. Complete David Jeremiah Website Workflow
- Navigate to David Jeremiah splash page
- Skip splash and go to main site
- Verify homepage elements and navigation
- Browse and interact with book content (Promise of Heaven)
- Return to main page and verify homepage
- Test login functionality with credentials
- Final verification and cleanup
- **Status**: ✅ Passing

### 2. Intentionally Failing Test for Demo
- Navigate to homepage
- Intentional assertion failure (expect 1 to equal 2)
- **Status**: ❌ Failing (by design)

This setup demonstrates both passing and failing test scenarios for testing and reporting purposes.

## Project Configuration

- **TypeScript**: Full TypeScript support with strict type checking
- **ESLint**: Code linting with Playwright-specific rules
- **Prettier**: Code formatting
- **Allure**: Advanced test reporting with screenshots and videos
- **Multi-browser**: Support for Chromium, Firefox, and WebKit



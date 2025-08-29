export interface TestUser {
  username: string;
  email: string;
  password: string;
}

export interface TestEnvironment {
  baseUrl: string;
  apiUrl: string;
  timeout: number;
}

export class TestData {
  static readonly USERS = {
    VALID_USER: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'SecurePassword123!'
    } as TestUser,
    
    ADMIN_USER: {
      username: 'admin',
      email: 'admin@example.com',
      password: 'AdminPass123!'
    } as TestUser
  };

  static readonly ENVIRONMENTS = {
    DEV: {
      baseUrl: 'https://dev.example.com',
      apiUrl: 'https://api-dev.example.com',
      timeout: 30000
    } as TestEnvironment,
    
    STAGING: {
      baseUrl: 'https://staging.example.com',
      apiUrl: 'https://api-staging.example.com',
      timeout: 30000
    } as TestEnvironment,
    
    PROD: {
      baseUrl: 'https://example.com',
      apiUrl: 'https://api.example.com',
      timeout: 60000
    } as TestEnvironment
  };

  static readonly TEST_DATA = {
    SEARCH_QUERIES: [
      'playwright',
      'automation',
      'testing'
    ],
    
    FORM_DATA: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      address: '123 Test Street'
    }
  };

  static getCurrentEnvironment(): TestEnvironment {
    const env = process.env.TEST_ENV || 'DEV';
    return this.ENVIRONMENTS[env as keyof typeof this.ENVIRONMENTS] || this.ENVIRONMENTS.DEV;
  }
}
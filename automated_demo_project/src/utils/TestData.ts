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
export type UserIdentity = {
  firstName: string;
  lastName: string;
  email: string;
};

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Arjun", "Reyansh",
  "Ishaan", "Kabir", "Rohan", "Manish", "Rahul",
  "Ananya", "Diya", "Meera", "Priya", "Neha"
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Patel", "Singh",
  "Kumar", "Reddy", "Nair", "Iyer", "Solanki"
];

const domains = ["gmail.com", "outlook.com", "yahoo.com"];

const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const normalize = (s: string) => s.toLowerCase();

export function generateUser(): UserIdentity {
  const firstName = rand(firstNames);
  const lastName = rand(lastNames);

  const patterns = [
    `${normalize(firstName)}.${normalize(lastName)}`,
    `${normalize(firstName)}${normalize(lastName)}`,
    `${normalize(firstName)}${Math.floor(Math.random() * 100)}`
  ];

  const local = rand(patterns);
  const email = `${local}@${rand(domains)}`;

  return { firstName, lastName, email };
}

// useful for negative tests
export const invalidEmail = () => `invalid_${Date.now()}`;


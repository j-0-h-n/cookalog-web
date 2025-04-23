import '@testing-library/jest-dom';

// Mock the config file
vi.mock('../config', () => ({
  API_BASE_URL: 'http://localhost:3000',
})); 
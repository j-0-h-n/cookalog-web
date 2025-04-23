import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import App from '../App';

const mockSignIn = vi.fn();
const mockSignOut = vi.fn();

// Mock the hooks
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    token: '',
    loggedInUser: '',
    errorMessage: '',
    signIn: mockSignIn,
    signOut: mockSignOut,
  }),
}));

vi.mock('../hooks/useSearch', () => ({
  useSearch: () => ({
    searchQuery: '',
    setSearchQuery: vi.fn(),
    results: [],
    search: vi.fn(),
  }),
}));

// Mock the config
vi.mock('../config.js', () => ({
  API_BASE_URL: 'http://localhost:3000',
  SEARCH_API_URL: 'https://localhost:5003/api/Search/TextOnlySearch',
}));

describe('App Component', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockSignOut.mockClear();
  });

  it('renders login form when not authenticated', () => {
    render(<App />);
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles sign in form submission', async () => {
    render(<App />);
    
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);
    });

    expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
}); 
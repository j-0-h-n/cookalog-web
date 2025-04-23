import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useAuth } from '../hooks/useAuth';

// Mock fetch
global.fetch = vi.fn();

describe('useAuth Hook', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('handles successful sign in', async () => {
    const mockToken = 'test-token';
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        text: () => Promise.resolve(mockToken),
        ok: true,
      })
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn('test@example.com', 'password123');
    });

    expect(result.current.token).toBe(mockToken);
    expect(result.current.loggedInUser).toBe('test@example.com');
    expect(result.current.errorMessage).toBe('');
  });

  it('handles failed sign in', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 401,
        ok: false,
      })
    );

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn('test@example.com', 'wrongpassword');
    });

    expect(result.current.token).toBe('');
    expect(result.current.loggedInUser).toBe('');
    expect(result.current.errorMessage).toBe('Login failed');
  });

  it('handles sign out', async () => {
    const mockToken = 'test-token';
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          text: () => Promise.resolve(mockToken),
          ok: true,
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          ok: true,
        })
      );

    const { result } = renderHook(() => useAuth());

    // First sign in
    await act(async () => {
      await result.current.signIn('test@example.com', 'password123');
    });

    // Then sign out
    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.token).toBe('');
    expect(result.current.loggedInUser).toBe('');
  });
}); 
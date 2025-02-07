import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App Component', () => {
  test('renders sign-in form initially', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('signs in and shows search functionality', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => expect(screen.getByText('Sign Out')).toBeInTheDocument());
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('signs out and shows sign-in form again', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => expect(screen.getByText('Sign Out')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Sign Out'));

    await waitFor(() => expect(screen.getByText('Sign In')).toBeInTheDocument());
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('searches and displays results', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign In'));

    await waitFor(() => expect(screen.getByText('Sign Out')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'query' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(screen.getByText('No results found')).toBeInTheDocument());
  });
});
import { useState } from 'react';
import { API_BASE_URL } from '../config';

export const useAuth = () => {
  const [token, setToken] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signIn = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Auth/SignIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const token = await response.text();
        setToken(token);
        setLoggedInUser(email);
        setErrorMessage('');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrorMessage('Login failed');
    }
  };

  const signOut = async () => {
    try {
      await fetch(`${API_BASE_URL}/Auth/SignOut`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setToken('');
      setLoggedInUser('');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return { token, loggedInUser, errorMessage, signIn, signOut };
};
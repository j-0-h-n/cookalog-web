import { useState } from 'react';
import { SEARCH_API_URL } from '../config';

export const useSearch = (token) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const response = await fetch(SEARCH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ searchText: searchQuery }),
      });
      const data = await response.json();
      setResults(data.recipes);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return { searchQuery, setSearchQuery, results, search };
};
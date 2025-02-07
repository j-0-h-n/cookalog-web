import { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:13617/api/Auth/SignIn', {
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

  const handleSignOut = async () => {
    try {
      await fetch('http://localhost:13617/api/Auth/SignOut', {
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

  const handleSearch = async () => {
    try {
      const response = await fetch('https://localhost:5003/api/Search/TextOnlySearch', {
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

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <>
      <h1>Cookalog</h1>
      {token ? (
        <>
          <div className="auth-container">
            <span>Welcome, {loggedInUser}</span>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="results-container">
            <p>Found {results.length} results</p>
            {results.map((recipe) => (
              <div key={recipe.id} className="card" onClick={() => toggleCard(recipe.id)}>
                <h2>{recipe.recipeName}</h2>
                <p>{recipe.bookTitle}</p>
                <p>{recipe.author}</p>
                <p>Page - {recipe.recipeStartPage}</p>
                {expandedCard === recipe.id && (
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.ingredientText}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="auth-container">
          <span>Welcome to Cookalog</span>
          <p></p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <p></p>
          <button onClick={handleSignIn}>Sign In</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
    </>
  );
}

export default App;
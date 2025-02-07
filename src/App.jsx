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
          <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Cookalog</h1>
            {token ? (
              <>
                <div className="auth-container flex justify-between items-center mb-4">
                  <span className="text-lg">Welcome, {loggedInUser}</span>
                  <button className="btn btn-primary" onClick={handleSignOut}>Sign Out</button>
                </div>
                <div className="search-container flex mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="input input-bordered flex-grow mr-2"
                  />
                  <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
                <div className="results-container">
                  <p className="text-lg mb-4">Found {results.length} results</p>
                  {results.map((recipe) => (
                    <div key={recipe.id} className="card mb-4 p-4 border rounded-lg shadow-lg" onClick={() => toggleCard(recipe.id)}>
                      <h2 className="text-2xl font-semibold">{recipe.recipeName}</h2>
                      <p className="text-gray-600">{recipe.bookTitle}</p>
                      <p className="text-gray-600">{recipe.author}</p>
                      <p className="text-gray-600">Page - {recipe.recipeStartPage}</p>
                      {expandedCard === recipe.id && (
                        <ul className="mt-2">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-gray-800">{ingredient.ingredientText}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="auth-container text-center">
                <span className="text-2xl">Welcome to Cookalog</span>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="input input-bordered mb-2"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="input input-bordered mb-2"
                  />
                  <button className="btn btn-primary mt-2" onClick={handleSignIn}>Sign In</button>
                  {errorMessage && <p className="error-message mt-2">{errorMessage}</p>}
                </div>
              </div>
            )}
          </div>
        );
      }

      export default App;
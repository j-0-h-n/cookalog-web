import React, { useState } from 'react';
                                    import './App.css';
                                    import { useAuth } from './hooks/useAuth';
                                    import { useSearch } from './hooks/useSearch';

                                    function App() {
                                      const { token, loggedInUser, errorMessage, signIn, signOut } = useAuth();
                                      const { searchQuery, setSearchQuery, results, search } = useSearch(token);
                                      const [email, setEmail] = useState('');
                                      const [password, setPassword] = useState('');
                                      const [expandedCard, setExpandedCard] = useState(null);

                                      const handleSignIn = () => signIn(email, password);
                                      const handleSignOut = () => signOut();
                                      const handleSearch = () => search();

                                      const toggleCard = (id) => {
                                        setExpandedCard(expandedCard === id ? null : id);
                                      };

                                      return (
                                        <div className={`min-h-screen flex items-center justify-center ${!token ? 'bg-cover bg-center' : ''}`} style={{ backgroundImage: !token ? "url('/src/assets/images/a female character looking for a cook book in the bookshelf with a magnifying glass.png')" : 'none' }}>
                                          {token ? (
                                            <div className="container mx-auto p-4 bg-white bg-opacity-75 rounded-lg shadow-lg">
                                              <h1 className="text-4xl font-bold text-center mb-8">Cookalog</h1>
                                              <div className="auth-container flex justify-between items-center mb-4">
                                                <span className="text-lg">Welcome, {loggedInUser}</span>
                                                <button className="btn btn-primary" onClick={handleSignOut}>
                                                  <i className="fas fa-sign-out-alt"></i> Sign Out
                                                </button>
                                              </div>
                                              <div className="search-container flex mb-4">
                                                <input
                                                  type="text"
                                                  value={searchQuery}
                                                  onChange={(e) => setSearchQuery(e.target.value)}
                                                  placeholder="Search..."
                                                  className="input input-bordered flex-grow mr-2"
                                                />
                                                <button className="btn btn-primary" onClick={handleSearch}>
                                                  <i className="fas fa-search"></i> Search
                                                </button>
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
                                            </div>
                                          ) : (
                                            <div className="auth-container text-center bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
                                              <h2 className="text-2xl font-bold mb-6">Welcome to Cookalog</h2>
                                              <div className="bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
                                                <input
                                                  type="email"
                                                  value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                                  placeholder="Email"
                                                  className="input input-bordered mb-2 w-fit text-sm"
                                                />
                                                <input
                                                  type="password"
                                                  value={password}
                                                  onChange={(e) => setPassword(e.target.value)}
                                                  placeholder="Password"
                                                  className="input input-bordered mb-2 w-fit text-sm"
                                                />
                                                <button className="btn btn-primary mt-2 w-fit text-sm" onClick={handleSignIn}>
                                                  <i className="fas fa-sign-in-alt"></i> Sign In
                                                </button>
                                                {errorMessage && <p className="error-message mt-2 text-red-500">{errorMessage}</p>}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }

                                    export default App;
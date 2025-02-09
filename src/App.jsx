import { useState } from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { useSearch } from './hooks/useSearch';

function App() {
  const { token, loggedInUser, errorMessage, signIn, signOut } = useAuth();
  const { searchQuery, setSearchQuery, results, search } = useSearch(token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

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
        <div className="bg-gray-200 flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Cookalog</h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">Login</button>
              {errorMessage && <p className="error-message mt-2 text-red-500">{errorMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
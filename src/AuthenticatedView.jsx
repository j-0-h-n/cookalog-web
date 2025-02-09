import PropTypes from 'prop-types';

function AuthenticatedView({ loggedInUser, handleSignOut, searchQuery, setSearchQuery, handleSearch, results, toggleCard, expandedCard }) {
  return (
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
  );
}

AuthenticatedView.propTypes = {
  loggedInUser: PropTypes.string.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleCard: PropTypes.func.isRequired,
  expandedCard: PropTypes.string,
};

export default AuthenticatedView;
import { useState } from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { useSearch } from './hooks/useSearch';
import LoginForm from './LoginForm';
import AuthenticatedView from './AuthenticatedView';

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
        <AuthenticatedView
          loggedInUser={loggedInUser}
          handleSignOut={handleSignOut}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          results={results}
          toggleCard={toggleCard}
          expandedCard={expandedCard}
        />
      ) : (
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSignIn={handleSignIn}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}

export default App;
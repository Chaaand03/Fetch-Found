import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import { logout as apiLogout } from './api/Dogs';

// Defines all app routes and handles protected navigation & logout logic
function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  // Called when the user clicks “Log Out”
  const handleLogout = async () => {
    try {
      await apiLogout();        // Tell backend we're logging out (if it tracks sessions)
    } catch (e) {
      console.error('Logout failed:', e);
    }

    localStorage.removeItem('token');       // Remove local session storage of 'logged-in' token
    localStorage.removeItem('favorites')         // Remove local session storage of 'favorites' token
    setIsLoggedIn(false);

    window.dispatchEvent(new Event('favoritesChanged'));        // Update any favorite-count listeners
    navigate('/login', { replace: true });        // Redirect back to login screen
  };

  return (
    <>
      {/* Navbar shown on all pages once logged in */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        {/* Root path: go to Search if logged in, otherwise force login */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Search /> : <Navigate to="/login" replace />
          }
        />

        {/* Login page: redirect to /search if already authenticated */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to='/search' replace /> :

              <Login
                onLogin={() => {
                  // Update state and navigate into the app
                  setIsLoggedIn(true);
                  navigate('/search', { replace: true });
                }}
              />

          }
        />

        {/* Search page: protected route */}
        <Route
          path="/search"
          element={
            isLoggedIn ? <Search /> : <Navigate to="/login" replace />
          }
        />

        {/* Favorites page: protected route */}
        <Route
          path="/favorites"
          element={
            isLoggedIn ? <Favorites /> : <Navigate to="/login" replace />
          }
        />


      </Routes>
    </>
  );
}

// Root App component: bootstraps router and persists login state
export default function App() {
  // Initialize login state from localStorage token presence
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return Boolean(token && token.trim());
  });

  return (
    // Wrap all routes in a BrowserRouter
    <BrowserRouter>
      <AppRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </BrowserRouter>
  );
}


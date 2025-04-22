import React, { useState, useEffect } from 'react';
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

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {
      console.error('Logout failed:', e);
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('favorites')
    setIsLoggedIn(false);
    
    window.dispatchEvent(new Event('favoritesChanged'));
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>

      <Routes>

      <Route
          path="/"
          element={
            isLoggedIn ? <Search /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to='/search' replace /> :
            
            <Login
              onLogin={() => {
                setIsLoggedIn(true);
                navigate('/search', { replace: true });
              }}
            />
            
          }
        />

        <Route
          path="/search"
          element={
            isLoggedIn ? <Search /> : <Navigate to="/login" replace />
          }
        />
        
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

export default function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return Boolean(token && token.trim());
  });

  return (
    <BrowserRouter>
      <AppRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </BrowserRouter>
  );
}


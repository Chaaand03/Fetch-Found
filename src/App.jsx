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
import MatchFound from './pages/Match-Found';
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
    
    navigate('/login', { replace: true });
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>

      <Routes>
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
          path="/"
          element={
            isLoggedIn ? <Search /> : <Navigate to="/search" replace />
          }
        />
        <Route
          path="/search"
          element={
            isLoggedIn ? <Search /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/matchfound"
          element={
            isLoggedIn ? <MatchFound /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/search" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let timer;
  
    if (token !== null && token.trim() !== "") {
      // delay the “true” for 1 second
      timer = setTimeout(() => {
        setIsLoggedIn(true);
        console.log("after delay:", !!localStorage.getItem("token"));
      }, 300);
    } else {
      setIsLoggedIn(false);
      console.log("no token:", !!token);
    }
  
    // cleanup in case the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </BrowserRouter>
  );
}


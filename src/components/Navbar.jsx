import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

// Navbar shows links once the user is logged in (and hides on the login page).
// It also tracks the number of favorites and provides a mobile “hamburger” menu.
export default function Navbar({ isLoggedIn, onLogout }) {
  const { pathname } = useLocation();       // Grab current path so we can hide nav on /login
  const isLoginPage = pathname === '/login';
  const showNav = isLoggedIn && !isLoginPage;     // Only display the nav when the user is authenticated AND not on the login screen.
  
  // Keep track of how many dogs are in favorites (reads from localStorage).
  const [favCount, setFavCount] = useState(
    () => JSON.parse(localStorage.getItem('favorites') || '[]').length
  );

  useEffect(() => {
    // Update favCount whenever any component fires our custom "favoritesChanged" event.
    function updateCount() {
      const arr = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavCount(arr.length);
    }
    window.addEventListener('favoritesChanged', updateCount);       // Listen for our custom "favoritesChanged" event.
    return () => window.removeEventListener('favoritesChanged', updateCount);     // Cleanup listener when Navbar unmounts.
  }, []);

  // Function to close the mobile menu by unchecking the hidden checkbox.
  function closeMenu() {
    const toggle = document.getElementById('nav-toggle');
    if (toggle) toggle.checked = false;
  }

  return (
    <nav className="navbar">
      <div className="brand">Fetch</div>

      {/* Only render the navigation if user is logged in (and off of /login) */}
      {showNav && (
        <>
          <input type="checkbox" id="nav-toggle" className="nav-toggle" />        {/* Hidden checkbox that toggles mobile menu */}
          <label htmlFor="nav-toggle" className="menu-btn">&#9776;</label>        {/* Hamburger icon label */}

          <ul className="nav-list">
            <li>
              <NavLink to="/search" onClick={closeMenu}>
                Search
              </NavLink>
            </li>
            <li className="favorites-item">
              <NavLink to="/favorites" onClick={closeMenu}>
                Favorites
                {/* Show badge only when there’s at least one favorite */}
                {favCount > 0 && (
                  <span className='badge'>{favCount}</span>
                )}
              </NavLink>
            </li>
            <li>
              {/* Log out button calls onLogout prop, then closes the menu */}
              <button
                className="logout-button"
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
           {/* Semi-transparent overlay behind the menu for mobile render; clicking it closes the menu */}
          <div className="nav-overlay" onClick={closeMenu} />
        </>
      )}

    </nav>
  );
}

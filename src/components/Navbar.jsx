import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // optional, for your styles

export default function Navbar( { isLoggedIn, onLogout } ) {
  return (
<nav className="navbar">
      <div className="brand">Fetch</div>

      <ul className="nav-list">
        {isLoggedIn ? (
          <>
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/matchfound">Favorites</NavLink></li>
            <li>
              <button className="logout-button" onClick={onLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
}

import React from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import './Navbar.css'; // optional, for your styles

export default function Navbar( { isLoggedIn, onLogout } ) {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';
  const showNav = isLoggedIn && !isLoginPage;

  function closeMenu() {
    const toggle = document.getElementById('nav-toggle');
    if (toggle) toggle.checked = false;
  }

  return (
<nav className="navbar">
      <div className="brand">Fetch</div>

{showNav && (
        <>
          <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
          <label htmlFor="nav-toggle" className="menu-btn">&#9776;</label>

          <ul className="nav-list">
            <li>
              <NavLink to="/search" onClick={closeMenu}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/matchfound" onClick={closeMenu}>
                Favorites
              </NavLink>
            </li>
            <li>
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
        </>
      )}

    </nav>
  );
}

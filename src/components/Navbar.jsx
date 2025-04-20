import React, {useState, useEffect}from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import './Navbar.css'; // optional, for your styles

export default function Navbar( { isLoggedIn, onLogout, favoritesCount} ) {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';
  const showNav = isLoggedIn && !isLoginPage;

  const [favCount, setFavCount] = useState(
    () => JSON.parse(localStorage.getItem('favorites') || '[]').length
  );

  useEffect(() => {
    // 2) Handler to update from localStorage
    function updateCount() {
      const arr = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavCount(arr.length);
      console.log(favCount);
    }

    // // 3) Listen & cleanup
    // window.addEventListener('favoritesChanged', updateCount);
    // return () => window.removeEventListener('favoritesChanged', updateCount);
  }, []);

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
            <li className="favorites-item">
              <NavLink to="/matchfound" onClick={closeMenu}>
              ♥
              {/* {favCount > 0 && (
                  <span className="badge">{favoritesCount}</span>
                )} */}
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

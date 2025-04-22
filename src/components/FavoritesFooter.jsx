import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FavoritesFooter.css';

// A sticky footer that prompts the user to view their favorites when there are any.
export default function FavoritesFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Initialize favorite count from localStorage on first render.
  const [favCount, setFavCount] = useState(
    () => JSON.parse(localStorage.getItem('favorites') || '[]').length
  );

  useEffect(() => {
    // Handler to refresh the count whenever favorites change.
    function updateCount() {
      const arr = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavCount(arr.length);
    }

    window.addEventListener('favoritesChanged', updateCount);       // Listen for our custom "favoritesChanged" event.
    return () => window.removeEventListener('favoritesChanged', updateCount);       // Clean up the listener when this component unmounts.
  }, []);

  if (pathname === '/matchfound') return null;        // Hide this footer on the match-found screen

  return (
    <>
      {/* Only show the footer if there's at least one favorite */}
      {favCount > 0 && (
        <div
          className="favorites-footer"
          onClick={() => navigate('/favorites')}
        >
          {/* Display the current number of favorites */}
          <span className="favorites-footer__text">
            View my Favorites ({favCount})
          </span>
        </div>
      )}
    </>
  );
}

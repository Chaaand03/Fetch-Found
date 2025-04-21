import React, {useState, useEffect}from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './FavoritesFooter.css';

export default function FavoritesFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [favCount, setFavCount] = useState(
    () => JSON.parse(localStorage.getItem('favorites') || '[]').length
  );

  useEffect(() => {
    function updateCount() {
      const arr = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavCount(arr.length);
    }

    window.addEventListener('favoritesChanged', updateCount);
    return () => window.removeEventListener('favoritesChanged', updateCount);
  }, []);

  // don’t show on the favorites page itself
  if (pathname === '/matchfound') return null;

  return (
    <>
    {favCount > 0 && (
        <div
        className="favorites-footer"
        // optional: also close if you click anywhere in the footer
        onClick={() => navigate('/matchfound')}
      > 
        <span className="favorites-footer__text">
          View my Favorites ({favCount})
        </span>
        <button
          className="favorites-footer__btn"
          onClick={e => {
            e.stopPropagation();      // prevent the outer div’s onClick
            navigate('/matchfound');
          }}
        >
          ♥
        </button>
      </div>
    )}
    </>
  );
}

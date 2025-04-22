import './Favorites.css'
import { getDogsByIds, matchDogs } from '../api/Dogs';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Favorites() {
  const [favIds, setFavIds] = useState([]);
  const [favDogs, setFavDogs] = useState([]);
  const [matchDog, setMatchDog] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(false);
  const navigate = useNavigate();


  // 1️⃣ Load the raw IDs from localStorage and log them
  useEffect(() => {
    function loadFavorites() {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavIds(stored);
    }
    loadFavorites();

    // Optional: if you ever update localStorage elsewhere and want this page to auto-refresh:
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  // 2️⃣ Fetch full Dog objects when IDs change
  useEffect(() => {
    async function loadDogs() {
      if (favIds.length === 0) {
        setFavDogs([]);
        return;
      }
      try {
        const dogs = await getDogsByIds(favIds);
        setFavDogs(dogs);
      } catch (err) {
        console.error('Failed to fetch favorite dogs:', err);
      }
    }
    loadDogs();
  }, [favIds]);

  const removeFavorite = (id) => {
    const updated = favIds.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavIds(updated);
    window.dispatchEvent(new Event('favoritesChanged'));
  };

  // Handler for “Make a Match”
  const handleMakeMatch = async () => {
    if (!favIds.length) return;
    setLoadingMatch(true);
    try {
      const { match } = await matchDogs(favIds);
      const [dog] = await getDogsByIds([match]);
      setMatchDog(dog);
    } catch (err) {
      console.error('Match error:', err);
    } finally {
      setLoadingMatch(false);
    }
  };

  const handleNewSearch = () => {
    const ok = window.confirm(
      'Are you sure you want to give up this match and look for a new one?'
    );
    if (ok) navigate('/search');
  };
  
  return (
    <>
      <div className="favorites-page">
        {matchDog ? (
          <div className="intro">
            <div className="maintext">
              <h1>Congratulations!</h1>
            </div>
            <div className="subtext">
              <h4>
                You’ve been matched with {matchDog.name} 🎉<br />
                Get ready for your new best friend!
              </h4>
            </div>
          </div>
          
        ) : (
          <div className="intro">
            <div className="maintext">
              <h1>All of your favorites!</h1>
            </div>
            <div className="subtext">
              <h4>
                Take a look at the adorable<br />
                bunch that you liked...
              </h4>
            </div>
            <button
          className="match-button"
          onClick={handleMakeMatch}
          disabled={loadingMatch || matchDog || !favIds.length}
        >
          {loadingMatch ? 'Matching…' : 'Make a Match'}
        </button>
          </div>
        )}
        {matchDog ? (
          <div className="match-result">
            <div className="match-block">
              <img
                src={matchDog.img}
                alt={matchDog.name}
                className="match-image"
              />
              <div className="match-details">
                <p>
                <b>{matchDog.name}</b> is a&ensp;
                <b>{matchDog.breed}</b> who is&ensp;
                  {matchDog.age} year{matchDog.age !== 1 ? 's' : ''} old
                and lives at {matchDog.zip_code} zip-location.</p>
              </div>
            </div>
            <button
              className="continue-button"
              onClick={handleNewSearch}
            >Make a New Search</button>
          </div>
        ) : favDogs.length ? (

          <div className="fav-circle-grid">
            {favDogs.map(dog => (
              <div className="circle-card" key={dog.id}>
                <div
                  className="circle-image"
                  style={{ backgroundImage: `url(${dog.img})` }}
                >
                  <div className="info-overlay">
                    <h3>{dog.name}</h3>
                    <p>{dog.breed}</p>
                    <p>
                      {dog.age} year{dog.age !== 1 ? 's' : ''} old
                    </p>
                    <p>Zip: {dog.zip_code}</p>
                  </div>
                </div>
                <button
                    className="remove-button"
                    onClick={() => removeFavorite(dog.id)}
                  >
                    Remove
                  </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-favs">No favorites yet!</p>
        )}
      </div>
    </>
  )
}
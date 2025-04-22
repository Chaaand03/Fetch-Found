import './Favorites.css'
import { getDogsByIds, matchDogs } from '../api/Dogs';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Favorites page: shows your saved dogs, lets you remove them or find a match.
export default function Favorites() {
  const navigate = useNavigate();

  const [favIds, setFavIds] = useState([]);       // Keep track of favorite IDs stored in localStorage.
  const [favDogs, setFavDogs] = useState([]);       // Once we have IDs, fetch the full dog objects.
  const [matchDog, setMatchDog] = useState(null);        // If the user chooses “Make a Match,” store the matched dog here.
  const [loadingMatch, setLoadingMatch] = useState(false);        // Show a loading state while match is being fetched.
  
  // On mount: load the favorites from localStorage and listen for changes.
  useEffect(() => {
    function loadFavorites() {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavIds(stored);
    }
    loadFavorites();

    window.addEventListener('storage', loadFavorites);        // If some other tab updates localStorage, refresh our list.
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  // Whenever favIds changes, fetch the corresponding dog data
  useEffect(() => {
    async function loadDogs() {
      if (favIds.length === 0) {
        setFavDogs([]);       // No favorites → clear the list
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

  // Remove a dog from favorites both in state and in localStorage.
  const removeFavorite = (id) => {
    const updated = favIds.filter(favId => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavIds(updated);
    window.dispatchEvent(new Event('favoritesChanged'));        // Let other components know the count changed.
  };

  // Ask the backend to pick a match from the favorites.
  const handleMakeMatch = async () => {
    if (!favIds.length) return;       // nothing to match
    setLoadingMatch(true);
    
    try {
      const { match } = await matchDogs(favIds);
      const [dog] = await getDogsByIds([match]);        // Fetch the matched dog’s full data
      setMatchDog(dog);
    } catch (err) {
      console.error('Match error:', err);
    } finally {
      setLoadingMatch(false);
    }
  };

  // If they give up on the current match, confirm and navigate back to search.
  const handleNewSearch = () => {
    const ok = window.confirm(
      'Are you sure you want to give up this match and look for a new one?'
    );
    if (ok) navigate('/search');
  };

  return (
    <>
      {/*Intro for when a match has been made.*/}
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
          //Intro for when no match has been made yet.
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
            { /*Only show the “Make a Match” button if there are favorites*/ }
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
          // Show the matched dog and a button to start over.
          <div className="match-result">
            <div className="match-block">
              {/* Matched dog’s picture */}
              <img
                src={matchDog.img}
                alt={matchDog.name}
                className="match-image"
              />
              <div className="match-details">
                {/* Basic details about the matched Dog. */}
                <p>
                  <b>{matchDog.name}</b> is a&ensp;
                  <b>{matchDog.breed}</b> who is&ensp;
                  {matchDog.age} year{matchDog.age !== 1 ? 's' : ''} old
                  and lives at {matchDog.zip_code} zip-location.</p>
              </div>
            </div>
            {/* Button to abandon this match and search again */}
            <button
              className="continue-button"
              onClick={handleNewSearch}
            >Make a New Search</button>
          </div>
        ) : favDogs.length ? (
          // Grid of favorite dog circles with remove buttons.
          <div className="fav-circle-grid">
            {favDogs.map(dog => (
              <div className="circle-card" key={dog.id}>
                {/* Dog’s image as a circle */}
                <div
                  className="circle-image"
                  style={{ backgroundImage: `url(${dog.img})` }}
                >
                  {/* Overlay with name, breed, age, and ZIP */}
                  <div className="info-overlay">
                    <h3>{dog.name}</h3>
                    <p>{dog.breed}</p>
                    <p>
                      {dog.age} year{dog.age !== 1 ? 's' : ''} old
                    </p>
                    <p>Zip: {dog.zip_code}</p>
                  </div>
                </div>
                {/* Button to remove this dog from favorites */}
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
          // Fallback when there are absolutely no favorites.
          <p className="no-favs">No favorites yet!</p>
        )}
      </div>
    </>
  )
}
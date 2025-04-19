import './Match-Found.css'
import { getDogsByIds } from '../api/Dogs';
import React, { useState, useEffect } from 'react';
import DogCard from '../components/DogCard';


export default function MatchFound() {
  const [favIds, setFavIds] = useState([]);
  const [favDogs, setFavDogs] = useState([]);

  // 1️⃣ Load the raw IDs from localStorage and log them
  useEffect(() => {
    function loadFavorites() {
      const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
      console.log('Cart now contains:', stored);
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
  
  return (
    <>
        <div className='intro'>
          <div className='maintext'>
            <h1>All of your favorites!</h1>
          </div>
          <div className='subtext'>
            <h4>Take a look at the adorable <br></br>
            bunch that you liked...</h4>
          </div>
        </div>

      <div className="match-found-page">
      {favDogs.length === 0 ? (
        <p className="no-favs">No favorites yet!</p>
      ) : (
        <div className="fav-circle-grid">
          {favDogs.map(dog => (
            <div className="circle-card" key={dog.id}>
              <div
                className="circle-image"
                style={{ backgroundImage: `url(${dog.img})` }}
              >
                <div className="info-overlay">
                  <h2>{dog.name}</h2>
                  <p>{dog.breed}</p>
                  <p>
                    {dog.age} year{dog.age !== 1 ? 's' : ''} old
                  </p>
                  <p>Zip: {dog.zip_code}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    </>
  )
}
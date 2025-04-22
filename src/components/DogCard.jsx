import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DogCard.css';

// A single card that displays a dog’s info and lets the user favorite/unfavorite it
export default function DogCard({ dog, favCount }) {
  const [isFav, setIsFav] = useState(false);     // Track whether this dog is currently in the favorites list

  // When the component mounts or the dog ID changes,
  // load the favorites array from localStorage and set initial state
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFav(stored.includes(dog.id));
  }, [dog.id]);

  // Handle clicks on the favorite button
  const handleFavClick = () => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]');     // Read the existing favorites list (or start with an empty array)
    let updated;

    if (stored.includes(dog.id)) {
      updated = stored.filter(id => id !== dog.id);       // If this dog is already a favorite, remove it
      setIsFav(false);
    } else {
      updated = [...stored, dog.id];         // Otherwise, add it to the favorites
      setIsFav(true);
    }

    localStorage.setItem('favorites', JSON.stringify(updated));         // Save the new list back to localStorage
    window.dispatchEvent(new Event('favoritesChanged'));        // Notify any other components listening for changes
  };


  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image" />        {/* Dog’s photo */}
      <div className="dog-info"> 
        {/* Basic details */}       
        <h3 className="dog-name">{dog.name}</h3>
        <h4 className="dog-breed">{dog.breed}</h4>
        <p className="dog-age">{dog.age} year{dog.age !== 1 ? 's' : ''} old</p>
        <p className="dog-zip">Zip Code: {dog.zip_code}</p>
      </div>
      {/* Favorite/unfavorite button */}
      <button
        className={`fav-button${isFav ? ' fav' : ''}`}
        onClick={handleFavClick}
      >
        {isFav ? '♥ Added!' : '♡ Favorite'}
      </button>
    </div>
  );
}

// Runtime prop validation to catch mistakes early
DogCard.propTypes = {
  dog: PropTypes.shape({
    id: PropTypes.string.isRequired,         // Unique identifier for the dog
    img: PropTypes.string.isRequired,        // URL of the dog’s image
    name: PropTypes.string.isRequired,       // Dog’s name
    age: PropTypes.number.isRequired,        // Dog’s age in years
    zip_code: PropTypes.string.isRequired,   // Owner’s ZIP code
    breed: PropTypes.string.isRequired,      // Dog’s breed
  }).isRequired,
};
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DogCard.css';

export default function DogCard({ dog }) {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFav(stored.includes(dog.id));
      }, [dog.id]);

    const handleFavClick = () => {
        const stored = JSON.parse(localStorage.getItem('favorites') || '[]');
        let updated;
    
        if (stored.includes(dog.id)) {
          // remove from favorites
          updated = stored.filter(id => id !== dog.id);
          setIsFav(false);
        } else {
          // add to favorites
          updated = [...stored, dog.id];
          setIsFav(true);
        }
    
        localStorage.setItem('favorites', JSON.stringify(updated));
    };
    

  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h3 className="dog-name">{dog.name}</h3>
        <h4 className="dog-breed">{dog.breed}</h4>
        <p className="dog-age">{dog.age} year{dog.age !== 1 ? 's' : ''} old</p>
        <p className="dog-zip">Zip Code: {dog.zip_code}</p>
      </div>
      <button
        className={`fav-button${isFav ? ' fav' : ''}`}
        onClick={handleFavClick}
      >
        {isFav ? '♥ Added!' : '♡ Favorite'}
      </button>
      </div>
  );
}

DogCard.propTypes = {
  dog: PropTypes.shape({
    id:       PropTypes.string.isRequired,
    img:      PropTypes.string.isRequired,
    name:     PropTypes.string.isRequired,
    age:      PropTypes.number.isRequired,
    zip_code: PropTypes.string.isRequired,
    breed:    PropTypes.string.isRequired,
  }).isRequired,
};
import  React, { useState, useEffect, useRef} from 'react'
import './Search.css'
import { searchDogs, getDogsByIds, getBreeds,getZipCodes } from '../api/Dogs';
import DogCard from '../components/DogCard';

export default function Search() {
  const [dogs, setDogs] = useState([]);
  const [breedsList, setBreedsList] = useState([]);
  const [breedFilter, setBreedFilter] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]); 
  const [sortOrder, setSortOrder] = useState('breed:asc');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const [cursor, setCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);

  useEffect(() => {
    async function loadBreeds() {
      try {
        const allBreeds = await getBreeds();
        setBreedsList(allBreeds);
      } catch (err) {
        console.error('Failed to fetch breeds:', err);
      }
    }

    loadBreeds();
  }, []);

  const toggleBreed = breed => {
    setSelectedBreeds(prev =>
      prev.includes(breed) 
        ? prev.filter(b => b !== breed) 
        : [...prev, breed]
    );
  };

  const applyFilter = () => {
    setBreedFilter(selectedBreeds);
    setCursor(null);
    setIsOpen(false);
  };

  const clearFilter = () => {
    setSelectedBreeds([]);
    setBreedFilter([]);
    setCursor(null);
    setIsOpen(false);
  };
  const cancelFilter = () => {
    setIsOpen(false);      
  };
  useEffect(() => {
    async function loadDogs() {
      console.log(selectedBreeds)
      setLoading(true);
      try {
        const opts = { size: 30, sort: sortOrder };
        if (selectedBreeds) opts.breeds = selectedBreeds;
        if (cursor) opts.from = cursor;

        const { resultIds, next, prev } = await searchDogs(opts);
        setNextCursor(next || null);
        setPrevCursor(prev || null);

        const fullDogs = await getDogsByIds(resultIds);
        setDogs(fullDogs);
      } catch (err) {
        console.error('Error fetching dogs:', err);
        setDogs([]);
        setNextCursor(null);
        setPrevCursor(null);
      } finally {
        setLoading(false);
      }
    }
    loadDogs();
  }, [breedFilter, sortOrder, cursor]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className='intro'>
        <div className='maintext'>
          <h1>Welcome to Fetch!</h1>
        </div>
        <div className='subtext'>
          <h4>The right place to find the pet <br></br>
            you always wanted to have!</h4>
        </div>
      </div>


        <div className="controls">
        <div className={`breed-dropdown${isOpen ? ' open' : ''}`}
          ref = {dropdownRef}
        >
      <button
        type="button"
        className="dropdown-toggle"
        onClick={() => setIsOpen(o => !o)}
      >
        Filter by breed
      </button>

      <div className="dropdown-menu">
        <div className="breed-checkboxes">
          {breedsList.map(breed => (
            <label key={breed}>
              <input
                type="checkbox"
                checked={selectedBreeds.includes(breed)}
                onChange={() => toggleBreed(breed)}
              />
              {breed}
            </label>
          ))}
        </div>

        <div className="dropdown-actions">
          <button onClick={applyFilter}>Apply</button>
          <button onClick={clearFilter}>Clear</button>
        </div>
      </div>
    </div>

          <button
            className="sort-toggle"
            onClick={() =>
              setSortOrder(o =>
                o === 'breed:asc' ? 'breed:desc' : 'breed:asc'
              )
            }
          >
            Sort by Breed: {sortOrder === 'breed:asc' ? 'A → Z' : 'Z → A'}
          </button>
        </div>

        {/* Dog Grid or Loading */}
        {loading ? (
          <p className="loading">Loading dogs…</p>
        ) : (
          <>
            <div className='dog-container'>
              <div className="dog-grid">
                {dogs.map(dog => (
                  <DogCard
                    key={dog.id}
                    dog={dog}
                  />
                ))}
                {dogs.length === 0 && <p>No dogs found.</p>}
              </div>

              <div className="pagination">
                <button
                  onClick={() => setCursor(prevCursor)}
                  disabled={!prevCursor || loading}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setCursor(nextCursor)}
                  disabled={!nextCursor || loading}
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </>
      );
}
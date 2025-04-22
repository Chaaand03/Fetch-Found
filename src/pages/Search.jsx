import React, { useState, useEffect, useRef } from 'react'
import './Search.css'
import { searchDogs, getDogsByIds, getBreeds } from '../api/Dogs';
import DogCard from '../components/DogCard';
import FavoritesFooter from '../components/FavoritesFooter';

export default function Search() {
  const [dogs, setDogs] = useState([]);       // State for the list of dogs to display
  const [breedsList, setBreedsList] = useState([]);       // Full list of breeds for the filter dropdown
  const [breedFilter, setBreedFilter] = useState([]);       // Active filter applied to the search request
  const [selectedBreeds, setSelectedBreeds] = useState([]);       // To keep track of selected Breeds form Breeds drop-down
  const [toggledBreeds, setToggledBreeds] = useState([]);        // Internal filter criteria before user clicks Apply
  const [sortOrder, setSortOrder] = useState('breed:asc');        // Sort order: 'breed:asc' or 'breed:desc'
  const [loading, setLoading] = useState(false);        // Loading flag while fetching data
  const [isOpen, setIsOpen] = useState(false);        // Control whether the dropdown is open
  const dropdownRef = useRef(null);

  // Cursor state for pagination
  const [cursor, setCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);

  // On mount: fetch the list of all breeds
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

  // Toggle a breed in the temporary checklist
  const toggleBreed = breed => {
    setToggledBreeds(prev =>
      prev.includes(breed)
        ? prev.filter(b => b !== breed)
        : [...prev, breed])
  };

  // Apply the filter: commit toggledBreeds to breedFilter, reset cursor, close dropdown
  const applyFilter = () => {
    setSelectedBreeds(toggledBreeds)
    setBreedFilter(selectedBreeds);
    setCursor(null);
    setIsOpen(false);
  };

  // Clear all filters and reset state
  const clearFilter = () => {
    setToggledBreeds([]);
    setSelectedBreeds([]);
    setBreedFilter([]);
    setCursor(null);
    setIsOpen(false);
  };

  // Whenever breedFilter, sortOrder, or cursor changes, fetch dogs
  useEffect(() => {
    async function loadDogs() {
      setLoading(true);
      try {
        // Build query options
        const opts = { size: 30, sort: sortOrder };
        if (selectedBreeds) opts.breeds = selectedBreeds;
        if (cursor) opts.from = cursor;

        // Search API returns IDs plus next/prev cursors
        const { resultIds, next, prev } = await searchDogs(opts);
        setNextCursor(next || null);
        setPrevCursor(prev || null);

        // Fetch full dog objects by ID
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

  // Close dropdown when clicking outside of it anywhere on screen
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setToggledBreeds(selectedBreeds);       // Reset toggledBreeds to the last applied filter
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Intro section */}
      <div className='intro'>
        <div className='maintext'>
          <h1>Welcome to Fetch!</h1>
        </div>
        <div className='subtext'>
          <h4>The right place to find the pet <br></br>
            you always wanted to have!</h4>
        </div>
      </div>

      {/* Controls: filter dropdown and sort button */}
      <div className="controls">
        <div className={`breed-dropdown${isOpen ? ' open' : ''}`}
          ref={dropdownRef}
        >
          {/* Button that toggles dropdown */}
          <button
            type="button"
            className="dropdown-toggle"
            onClick={() => setIsOpen(o => !o)}
          >
            Filter by breed
          </button>

          {/* Dropdown menu containing checkboxes and action buttons */}
          <div className="dropdown-menu">
            <div className="breed-checkboxes">
              {breedsList.map(breed => (
                <label key={breed}>
                  <input
                    type="checkbox"
                    checked={toggledBreeds.includes(breed)}
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
        {/* Button to toggle sort order */}
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
      {/* Loading state */}
      {loading ? (
        <p className="loading">Loading dogs…</p>
      ) : (
        <>
          {/* Dog grid */}
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

            {/* Pagination controls */}
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
            {/* Footer sticky panel component prompting to view favorites */}
            <FavoritesFooter />
          </div>

        </>
      )}
    </>
  );
}
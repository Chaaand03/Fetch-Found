import  React, { useState, useEffect } from 'react'
import './Search.css'
import { searchDogs, getDogsByIds, getBreeds } from '../api/Dogs';
import DogCard from '../components/DogCard';

export default function Search() {
  const [dogs, setDogs] = useState([]);
  const [breedsList, setBreedsList] = useState([]);
  const [breedFilter, setBreedFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('name:asc', 'age:asc');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    async function loadDogs() {
      setLoading(true);
      try {
        const opts = { size: 30, sort: sortOrder };
        if (breedFilter) opts.breeds = [breedFilter];
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
        <select
          value={breedFilter}
          onChange={e => {
            setBreedFilter(e.target.value);
            setCursor(null);    // reset pagination when filter changes
          }}
          className="breed-select"
        >
          <option value="">All Breeds</option>
          {breedsList.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <button
          className="sort-toggle"
          onClick={() =>
            setSortOrder(o =>
              o === 'name:asc' ? 'name:desc' : 'name:asc'
            )
          }
        >
          Sort by Name: {sortOrder === 'name:asc' ? 'A → Z' : 'Z → A'}
        </button>

        <button
          className="sort-toggle"
          onClick={() =>
            setSortOrder(o =>
              o === 'age:asc' ? 'age:desc' : 'age:asc'
            )
          }
        >
          Sort by Age: {sortOrder === 'age:asc' ? 'Ascending' : 'Decending'}
        </button>
      </div>

      {/* Dog Grid or Loading */}
      {loading ? (
        <p className="loading">Loading dogs…</p>
      ) : (
        <>
          <div className="dog-grid">
            {dogs.map(dog => (
              <DogCard 
                key={dog.id} 
                dog={dog}
                // isFavorite={favorites.includes(dog.id)}
                // onToggleFavorite={() => toggleFavorite(dog.id)} 
              />
            ))}
            {dogs.length === 0 && <p>No dogs found.</p>}
          </div>

          {/* Pagination */}
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
        </>
      )}
    </>
  )
}
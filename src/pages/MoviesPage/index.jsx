import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { searchMovies } from '@/services/api';
import MovieList from '@/components/MovieList';
import Loader from '@/components/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchMovies(query)
      .then(data => {
        setMovies(data.results);
        if (data.results.length === 0) {
          toast.info(
            `No movies found for "${query}". Try a different search term.`
          );
        }
      })
      .catch(() => {
        toast.error('Failed to search movies. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value) {
      setSearchParams({ query: value });
    } else {
      toast('Please enter a search term.', {
        icon: '⚠️',
      });
    }
  };

  return (
    <main className={css.page}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          className={css.searchInput}
          placeholder="Search for movies..."
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {loading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;

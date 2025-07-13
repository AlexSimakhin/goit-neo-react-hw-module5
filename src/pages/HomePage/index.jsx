import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getTrendingMovies } from '@/services/api';
import MovieList from '@/components/MovieList';
import Loader from '@/components/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then(data => setMovies(data.results))
      .catch(() => {
        toast.error('Failed to load trending movies. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={css.page}>
      <h1 className={css.title}>Trending Today</h1>
      {loading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;

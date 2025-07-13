import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Outlet, useLocation, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMovieDetails } from '@/services/api';
import { getPosterUrl } from '@/utils/imageUtils';
import Loader from '@/components/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId)
      .then(setMovie)
      .catch(() => {
        toast.error('Failed to load movie details. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (!movie) return null;

  const { 
    title, 
    overview, 
    genres, 
    poster_path, 
    release_date, 
    runtime, 
    vote_average, 
    vote_count, 
    tagline, 
    status,
    budget,
    revenue,
    production_countries,
    spoken_languages,
    homepage
  } = movie;

  return (
    <main className={css.page}>
      <Link to={backLinkRef.current} className={css.backLink}>
        ← Go back
      </Link>
      
      <div className={css.movieDetails}>
        <div className={css.movieHeader}>
          <img
            src={getPosterUrl(poster_path)}
            alt={title}
            className={css.moviePoster}
          />
          <div className={css.movieInfo}>
            <h1 className={css.movieTitle}>{title}</h1>
            {tagline && <p className={css.movieTagline}>"{tagline}"</p>}
            <p className={css.movieOverview}>{overview}</p>
            
            <div className={css.movieStats}>
              {vote_average > 0 && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Rating:</span>
                  <span className={css.statValue}>⭐ {vote_average.toFixed(1)}/10 ({vote_count} votes)</span>
                </div>
              )}
              {release_date && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Release Date:</span>
                  <span className={css.statValue}>{new Date(release_date).toLocaleDateString()}</span>
                </div>
              )}
              {runtime && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Runtime:</span>
                  <span className={css.statValue}>{runtime} minutes</span>
                </div>
              )}
              {status && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Status:</span>
                  <span className={css.statValue}>{status}</span>
                </div>
              )}
              {budget > 0 && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Budget:</span>
                  <span className={css.statValue}>${budget.toLocaleString()}</span>
                </div>
              )}
              {revenue > 0 && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Revenue:</span>
                  <span className={css.statValue}>${revenue.toLocaleString()}</span>
                </div>
              )}
              {production_countries && production_countries.length > 0 && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Country:</span>
                  <span className={css.statValue}>
                    {production_countries.map(country => country.name).join(', ')}
                  </span>
                </div>
              )}
              {spoken_languages && spoken_languages.length > 0 && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Languages:</span>
                  <span className={css.statValue}>
                    {spoken_languages.map(lang => lang.english_name).join(', ')}
                  </span>
                </div>
              )}
              {homepage && (
                <div className={css.statItem}>
                  <span className={css.statLabel}>Website:</span>
                  <a href={homepage} target="_blank" rel="noopener noreferrer" className={css.websiteLink}>
                    Official Site
                  </a>
                </div>
              )}
            </div>

            {genres && genres.length > 0 && (
              <div className={css.genresSection}>
                <span className={css.genresLabel}>Genres:</span>
                <ul className={css.genresList}>
                  {genres.map(genre => (
                    <li key={genre.id} className={css.genreItem}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3 className={css.additionalTitle}>Additional Information</h3>
        <ul className={css.navList}>
          <li className={css.navItem}>
            <NavLink to="cast" className={css.navLink}>Cast</NavLink>
          </li>
          <li className={css.navItem}>
            <NavLink to="reviews" className={css.navLink}>Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;

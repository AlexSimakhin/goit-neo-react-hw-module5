import { Link, useLocation } from 'react-router-dom';
import { getBackdropUrl, getPlaceholderImage } from '@/utils/imageUtils';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title, backdrop_path }) => (
        <li key={id} className={css.movieItem}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }}
            className={css.movieLink}
          >
            <img
              src={
                backdrop_path
                  ? getBackdropUrl(backdrop_path, 'w500')
                  : getPlaceholderImage(500, 280, 'No Image')
              }
              alt={title}
              className={css.movieImage}
            />
            <h3 className={css.movieTitle}>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

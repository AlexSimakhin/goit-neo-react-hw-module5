import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMovieCredits } from '@/services/api';
import { getProfileUrl, getPlaceholderImage } from '@/utils/imageUtils';
import Loader from '@/components/Loader';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieCredits(movieId)
      .then(data => setCast(data.cast))
      .catch(error => {
        setError(error);
        toast.error('Failed to load cast information.');
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return null;
  if (!cast.length) return <p className={css.message}>Cast information is not available.</p>;

  return (
    <ul className={css.castList}>
      {cast.map(({ cast_id, name, character, profile_path }) => (
        <li key={cast_id} className={css.castItem}>
          <img
            src={profile_path ? getProfileUrl(profile_path) : getPlaceholderImage(200, 300, 'No Photo')}
            alt={name}
            className={css.castPhoto}
          />
          <div className={css.castInfo}>
            <p className={css.actorName}>{name}</p>
            <p className={css.character}>as {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;

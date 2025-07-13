import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMovieReviews } from '@/services/api';
import Loader from '@/components/Loader';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMovieReviews(movieId)
      .then(data => setReviews(data.results))
      .catch(() => {
        toast.error('Failed to load reviews.');
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (!reviews.length)
    return <p className={css.message}>No reviews available.</p>;

  return (
    <ul className={css.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.reviewItem}>
          <h4 className={css.reviewAuthor}>{author}</h4>
          <p className={css.reviewContent}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;

import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={css.container}>
    <h2 className={css.title}>404</h2>
    <p className={css.message}>
      Oops! The page you are looking for does not exist.
    </p>
    <Link to="/" className={css.homeLink}>
      ← Go to Home
    </Link>
  </div>
);

export default NotFoundPage;

import { SquareLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => (
  <div className={css.loader}>
    <SquareLoader color="#8b9aff" size={60} />
  </div>
);

export default Loader;

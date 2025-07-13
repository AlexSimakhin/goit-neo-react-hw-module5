import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => (
  <nav className={css.nav}>
    <NavLink 
      to="/" 
      className={({ isActive }) => 
        isActive ? `${css.navLink} ${css.active}` : css.navLink
      }
    >
      Home
    </NavLink>
    <span className={css.separator}>|</span>
    <NavLink 
      to="/movies" 
      className={({ isActive }) => 
        isActive ? `${css.navLink} ${css.active}` : css.navLink
      }
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;

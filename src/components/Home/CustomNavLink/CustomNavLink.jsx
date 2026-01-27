import { NavLink } from 'react-router';

import styles from './CustomNavLink.module.scss';

export default function CustomNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles['nav-link']} ${isActive ? styles.active : ''}`
      }
    >
      {children}
    </NavLink>
  );
}

import { NavLink } from 'react-router';

import CustomNavLink from '../CustomNavLink/CustomNavLink';

import styles from './Header.module.scss';

import checkoutIconActive from '../../assets/icons/shopping-cart-active.svg';
import checkoutIcon from '../../assets/icons/shopping-cart.svg';
import logoIconGreen from '../../assets/icons/logo-green.svg';
import logoIconPurple from '../../assets/icons/logo-purple.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles['nav-container']}>
        <NavLink data-testid='header-logo' to='/'>
          {({ isActive }) => (
            <img
              className={styles.logo}
              src={isActive ? logoIconPurple : logoIconGreen}
              alt='Logo Icon'
            />
          )}
        </NavLink>
        <CustomNavLink to='/shop'>Shop</CustomNavLink>
        <NavLink data-testid='checkout-logo' to='/checkout'>
          {({ isActive }) => (
            <div className={styles['checkout-container']}>
              <img
                className={`${styles['checkout-icon']} ${isActive ? styles.active : ''}`}
                src={isActive ? checkoutIconActive : checkoutIcon}
                alt='Checkout Icon'
              />
              <div className={styles['cart-capacity']}></div>
            </div>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

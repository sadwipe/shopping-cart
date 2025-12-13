import { NavLink } from 'react-router';

import CustomNavLink from '../CustomNavLink/CustomNavLink';

import styles from './Header.module.scss';

import checkoutIconActive from '../../assets/icons/shopping-cart-active.svg';
import checkoutIcon from '../../assets/icons/shopping-cart.svg';
import logoIcon from '../../assets/icons/logo.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles['nav-container']}>
        <div className={styles['home-container']}>
          <img className={styles.logo} src={logoIcon} alt='Creeper Logo' />
          <CustomNavLink to='/'>Home</CustomNavLink>
        </div>
        <CustomNavLink to='/shop'>Shop</CustomNavLink>
        <NavLink to='/checkout'>
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

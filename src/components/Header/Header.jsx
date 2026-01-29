import { NavLink } from 'react-router';

import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';

import styles from './Header.module.scss';

import checkoutIconActive from '../../assets/icons/shopping-cart-active.svg';
import checkoutIcon from '../../assets/icons/shopping-cart.svg';
import logoIconGreen from '../../assets/icons/logo-green.svg';
import logoIconPurple from '../../assets/icons/logo-purple.svg';

export default function Header() {
  const { cartItemsLength } = useContext(ShopContext);

  const displayCount = cartItemsLength > 99 ? '99+' : cartItemsLength;

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
        <NavLink
          to='/shop'
          className={({ isActive }) =>
            `${styles['nav-link']} ${isActive ? styles.active : ''}`
          }
        >
          Shop
        </NavLink>
        <NavLink data-testid='checkout-logo' to='/checkout'>
          {({ isActive }) => (
            <div className={styles['checkout-container']}>
              <img
                className={styles['checkout-icon']}
                src={isActive ? checkoutIconActive : checkoutIcon}
                alt='Checkout Icon'
              />
              {cartItemsLength !== 0 && (
                <div className={styles['cart-capacity']}>{displayCount}</div>
              )}
            </div>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

import { Link } from 'react-router';

import styles from './EmptyCart.module.scss';

export default function EmptyCart() {
  return (
    <div className={styles['empty-cart']}>
      <p>Your cart is empty!</p>
      <Link className={styles.link} to='/shop'>
        [ Enter the Shop → ]
      </Link>
    </div>
  );
}

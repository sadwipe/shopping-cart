import { useContext } from 'react';
import { Link } from 'react-router';
import ShopContext from '../../../context/ShopContext';

import styles from './SummaryContent.module.scss';

import emerald from '../../../assets/icons/emerald.png';

export default function SummaryContent() {
  const { cartItems, cartItemsLength } = useContext(ShopContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.cost,
    0,
  );

  return (
    <div className={styles['summary-content']}>
      <div className={styles['summary-details']}>
        <p>Total: {cartItemsLength} items</p>
        <p>
          Total Price:{' '}
          <img className={styles.emerald} src={emerald} alt='emerald icon' />
          {totalPrice}{' '}
        </p>
      </div>
      <Link className={styles['checkout-btn']}>[ Checkout → ]</Link>
    </div>
  );
}

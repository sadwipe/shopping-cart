import CheckoutItem from '../CheckoutItem/CheckoutItem';
import CheckoutHeader from '../CheckoutHeader/CheckoutHeader';

import styles from './CheckoutItemsList.module.scss';

export default function CheckoutItemsList({ cartItems, setCartItems }) {
  return (
    <div className={styles['checkout-container']}>
      <CheckoutHeader />
      <ul className={styles['checkout-items']}>
        {cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            item={item}
            setCartItems={setCartItems}
            cartItems={cartItems}
          />
        ))}
      </ul>
    </div>
  );
}

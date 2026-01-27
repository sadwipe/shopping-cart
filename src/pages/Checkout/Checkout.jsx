import styles from './Checkout.module.scss';

import CheckoutHeader from '../../components/Checkout/CheckoutHeader/CheckoutHeader';
import CheckoutItemsList from '../../components/Checkout/CheckoutItemList/CheckoutItemList';

export default function Cart() {
  return (
    <div className={styles['checkout-page']}>
      <CheckoutHeader />
      <CheckoutItemsList />
    </div>
  );
}

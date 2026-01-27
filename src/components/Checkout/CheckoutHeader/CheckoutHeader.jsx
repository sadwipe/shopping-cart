import styles from './CheckoutHeader.module.scss';

export default function CheckoutHeader() {
  return (
    <div className={styles['checkout-header']}>
      <div>Item</div>
      <div>Quantity</div>
      <div>Total</div>
    </div>
  );
}

import { useId, useState } from 'react';

import styles from './AddToCart.module.scss';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';

export default function AddToCart() {
  const id = useId();

  const [quantity, setQuantity] = useState(0);

  function clamp(value) {
    return Math.min(100, Math.max(0, value));
  }

  function handleIncreaseQuantity() {
    if (quantity === 100) {
      return;
    }
    setQuantity((q) => q + 1);
  }

  function handleDecreaseQuantity() {
    if (quantity === 0) {
      return;
    }
    setQuantity((q) => q - 1);
  }

  function handleInputChange(e) {
    const value = e.target.value;

    if (value === '') {
      setQuantity('');
      return;
    }

    const parsed = Number(value);

    if (Number.isNaN(parsed)) return;

    setQuantity(clamp(parsed));
  }

  function handleBlur() {
    if (quantity === '') {
      setQuantity(0);
    }
  }

  return (
    <div className={styles['add-to-cart']}>
      <div className={styles['quantity-container']}>
        <img
          className={styles['change-quantity']}
          src={minus}
          alt='Decrease Button'
          onClick={() => handleDecreaseQuantity()}
        />
        <input
          id={`quantity-${id}`}
          type='number'
          className={styles.quantity}
          value={quantity}
          max={100}
          min={0}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />

        <img
          className={styles['change-quantity']}
          src={plus}
          alt='Increase Button'
          onClick={() => handleIncreaseQuantity()}
        />
      </div>
      <button className={styles['add-button']}>ADD TO CART</button>
    </div>
  );
}

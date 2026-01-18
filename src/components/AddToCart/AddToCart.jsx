import { useId, useContext, useState } from 'react';
import ShopContext from '../../context/ShopContext';

import styles from './AddToCart.module.scss';
import minus from '../../assets/icons/minus.svg';
import plus from '../../assets/icons/plus.svg';

import { clamp } from '../../utils/utils';

export default function AddToCart({ item }) {
  const id = useId();

  const { setCartItems } = useContext(ShopContext);

  const [quantity, setQuantity] = useState(0);

  // + Button
  function handleIncreaseQuantity() {
    if (quantity === 100) {
      return;
    }
    setQuantity((q) => q + 1);
  }

  // - Button
  function handleDecreaseQuantity() {
    if (quantity === 0) {
      return;
    }
    setQuantity((q) => q - 1);
  }

  // Typing in input
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

  // Typing a word instead of a number
  function handleBlur() {
    if (quantity === '') {
      setQuantity(0);
    }
  }

  // Add item to cart
  function addItemToCart(item) {
    if (quantity <= 0) {
      return;
    }

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);

      if (existingItem) {
        return prevCart.map((i) => {
          if (i.id === item.id) {
            return {
              ...i,
              quantity: i.quantity + quantity,
            };
          } else {
            return i;
          }
        });
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: quantity,
        },
      ];
    });
    setQuantity(0);
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
      <div className={styles['price-container']}>
        <span className={styles.cost}>{`$${item.cost}`}</span>
        <button
          onClick={() => addItemToCart(item)}
          className={styles['add-button']}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

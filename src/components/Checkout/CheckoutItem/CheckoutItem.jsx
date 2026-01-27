import styles from './CheckoutItem.module.scss';

import minus from '../../../assets/icons/minus.svg';
import plus from '../../../assets/icons/plus.svg';
import emerald from '../../../assets/icons/emerald.png';

export default function CheckoutItem({ item, cartItems, setCartItems }) {
  function updateQuantity(id, delta) {
    const updatedItem = cartItems.find((item) => item.id === id);

    if (!updatedItem) {
      return;
    }

    if (
      (updatedItem.quantity <= 1 && delta < 0) ||
      (updatedItem.quantity >= 100 && delta > 0)
    ) {
      return;
    }

    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + delta,
        };
      } else {
        return item;
      }
    });

    setCartItems(newCart);
  }

  function handleDeleteItem(id) {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
  }

  return (
    <li>
      <div className={styles['name-container']}>
        <img src={item.image} alt={item.name} />
        <span>{item.name}</span>
      </div>
      <div className={styles['quantity-controls']}>
        <img
          className={styles['change-quantity']}
          src={minus}
          alt='decrease button'
          onClick={() => updateQuantity(item.id, -1)}
        />
        <span className={styles['quantity-display']}>{item.quantity}</span>
        <img
          className={styles['change-quantity']}
          src={plus}
          alt='increase button'
          onClick={() => updateQuantity(item.id, 1)}
        />
      </div>
      <div className={styles['item-total']}>
        <span>
          <img
            className={styles['total-image']}
            src={emerald}
            alt='emerald icon'
          />
          {item.cost * item.quantity}
        </span>
        <button
          onClick={() => handleDeleteItem(item.id)}
          className={styles['remove-item']}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

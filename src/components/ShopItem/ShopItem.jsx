import styles from './ShopItem.module.scss';
import { summarizeDescription } from '../../utils/utils';

import AddToCart from '../AddToCart/AddToCart';

export default function ShopItem({ element }) {
  return (
    <div className={styles['item-card']}>
      <div className={styles['card-header']}>
        <img
          className={styles['item-image']}
          src={element.image}
          alt={element.name}
        />
        <h3 className={styles['item-title']}>{element.name}</h3>
      </div>
      <div className={styles['description-container']}>
        <p className={styles['item-description']}>
          {summarizeDescription(element.description)}
        </p>
      </div>
      <AddToCart />
    </div>
  );
}

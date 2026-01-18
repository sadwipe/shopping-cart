import styles from './ShopItem.module.scss';
import { summarizeDescription } from '../../utils/utils';

import AddToCart from '../AddToCart/AddToCart';

export default function ShopItem({ item }) {
  return (
    <div className={styles['item-card']}>
      <div className={styles['card-header']}>
        <img
          className={styles['item-image']}
          src={item.image}
          alt={item.name}
        />
        <h3 className={styles['item-title']}>{item.name}</h3>
      </div>
      <div className={styles['description-container']}>
        <p className={styles['item-description']}>
          {summarizeDescription(item.description)}
        </p>
      </div>
      <AddToCart item={item} />
    </div>
  );
}

import { useContext } from 'react';

import ShopContext from '../../context/ShopContext';

import ShopItem from '../ShopItem/ShopItem';

import styles from './ShopItemsList.module.scss';

export default function ShopItemsList() {
  const { items, error } = useContext(ShopContext);

  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  if (error) {
    return <p>The data could not be loaded: {error}</p>;
  }

  return (
    <ul className={styles['items-container']}>
      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

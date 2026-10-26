import { useContext } from 'react';

import ShopContext from '../../../context/ShopContext';

import ShopItem from '../../../components/Shop/ShopItem/ShopItem';

import styles from './ShopItemsList.module.scss';

export default function ShopItemsList() {
  const { items } = useContext(ShopContext);

  if (!items || items.length === 0) {
    return <p>No items available</p>;
  }

  return (
    <ul className={styles['items-container']}>
      {items.map((item) => (
        <ShopItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

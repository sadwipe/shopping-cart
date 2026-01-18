import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';

import styles from './ShopHeader.module.scss';

import Dropdown from '../Dropdown/Dropdown';

export default function ShopHeader() {
  const { items } = useContext(ShopContext);

  return (
    <div className={styles['shop-header']}>
      <h1 className={styles['shop-title']}>Shop</h1>

      <div className={styles['sorting-container']}>
        <button className={styles['sorting-button']}>
          Sort
          <span className={styles['chevron']} aria-hidden='true'></span>
        </button>
        <Dropdown />
      </div>

      <div className={styles['item-count']}>
        {items.lenght !== 1 ? `${items.length} items` : '1 Item'}
      </div>
    </div>
  );
}

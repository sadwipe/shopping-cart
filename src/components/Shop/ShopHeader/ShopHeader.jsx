import { useContext, useState } from 'react';
import ShopContext from '../../../context/ShopContext';

import styles from './ShopHeader.module.scss';

import Dropdown from '../Dropdown/Dropdown';

export default function ShopHeader() {
  const { items } = useContext(ShopContext);

  const [isOpen, setIsOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState('Alphabetical: A-Z');

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles['shop-header']}>
      <h1 className={styles['shop-title']}>Shop</h1>

      <div className={styles['sorting-container']}>
        <button onClick={toggleDropdown} className={styles['sorting-button']}>
          Sort: {sortingOption}
          {isOpen ? (
            <span
              data-testid='chevron-up'
              className={styles['chevron-up']}
              aria-hidden='true'
            ></span>
          ) : (
            <span
              data-testid='chevron-down'
              className={styles['chevron-down']}
              aria-hidden='true'
            ></span>
          )}
        </button>
        {isOpen && (
          <Dropdown
            sortingOption={sortingOption}
            setSortingOption={setSortingOption}
            setIsOpen={setIsOpen}
          />
        )}
      </div>

      <div className={styles['item-count']}>
        {items.length !== 1 ? `${items.length} items` : '1 Item'}
      </div>
    </div>
  );
}

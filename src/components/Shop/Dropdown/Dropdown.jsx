import { useContext } from 'react';
import ShopContext from '../../../context/ShopContext';

import styles from './Dropdown.module.scss';

export default function Dropdown({ setSortingOption, setIsOpen }) {
  const { sortItems } = useContext(ShopContext);

  const SORT_OPTIONS = [
    'Alphabetical: A-Z',
    'Alphabetical: Z-A',
    'Price: Low to High',
    'Price: High to Low',
  ];

  function handleSort(option) {
    setSortingOption(option);
    sortItems(option);
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdown}>
      {SORT_OPTIONS.map((option) => {
        return (
          <button key={option} onClick={() => handleSort(option)}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';

import ShopContext from './context/ShopContext';
import { getShopItems } from './utils/shopUtils';
import { ITEMS_DATA } from './utils/itemsData';

import './styles/App.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      return getShopItems(ITEMS_DATA);
    } catch {
      return [];
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const cartItemsLength = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  function sortItems(option) {
    const sorted = [...items].sort((a, b) => {
      switch (option) {
        case 'Price: Low to High':
          return a.cost - b.cost;
        case 'Price: High to Low':
          return b.cost - a.cost;
        case 'Alphabetical: Z-A':
          return b.name.localeCompare(a.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setItems(sorted);
  }

  return (
    <ShopContext
      value={{
        items,
        cartItems,
        setCartItems,
        cartItemsLength,
        sortItems,
      }}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ShopContext>
  );
}

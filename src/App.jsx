import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';

import ShopContext from './context/ShopContext';

import { getShopItems } from './utils/utils';

import './styles/App.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function App() {
  const apiUrl = 'https://minecraft-api.vercel.app/api/items';

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUrl() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          setError(response.status);
        }

        const result = await response.json();

        const processedItems = getShopItems(result);

        setItems(processedItems);
      } catch (error) {
        setError(error);
      }
    }

    fetchUrl();
  }, []);

  return (
    <>
      <ShopContext value={{ items, error, cartItems, setCartItems }}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ShopContext>
    </>
  );
}

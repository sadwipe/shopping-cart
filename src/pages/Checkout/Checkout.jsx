import { useContext } from 'react';
import ShopContext from '../../context/ShopContext';

import EmptyCart from '../../components/Checkout/EmptyCart/EmptyCart';
import SummaryContent from '../../components/Checkout/SummaryContent/SummaryContent';

import styles from './Checkout.module.scss';

import CheckoutItemsList from '../../components/Checkout/CheckoutItemList/CheckoutItemsList';

export default function Cart() {
  const { cartItems, setCartItems } = useContext(ShopContext);

  return (
    <div className={styles['shop-page']}>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CheckoutItemsList
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
          <SummaryContent />
        </>
      )}
    </div>
  );
}

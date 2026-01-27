import styles from './Shop.module.scss';
import ShopHeader from '../../components/Shop/ShopHeader/ShopHeader';
import ShopItemsList from '../../components/Shop/ShopItemsList/ShopItemsList';

export default function Shop() {
  return (
    <div className={styles['shop-page']}>
      <ShopHeader />
      <ShopItemsList />
    </div>
  );
}

import { Link } from 'react-router';

import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles['home-page']}>
      <h1 className={styles.title}>Welcome to MineRetro Shop</h1>
      <pre className={styles.description}>
        {`< Your one-stop terminal for rare Minecraft items

< Browse our collection of swords, blocks, and treasures.

< Add your favorite items to the cart and craft your adventure.`}
      </pre>
      <Link className={styles.link} to='/shop'>
        [ Enter the Shop → ]
      </Link>
    </div>
  );
}

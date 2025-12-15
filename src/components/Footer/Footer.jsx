import { useState, useEffect } from 'react';

import styles from './Footer.module.scss';

import { getTime } from '../../utils/utils';

export default function Footer() {
  const currentTime = getTime();
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <footer className={styles.footer}>
      <span>Mode: Survival</span>
      <span>{time}</span>
    </footer>
  );
}

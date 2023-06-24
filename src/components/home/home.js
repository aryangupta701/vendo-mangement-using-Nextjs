'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';

function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <div>
      <div className={styles.container}>
      <h1>Welcome to the Vendor Portal</h1>
      </div>
      <div className={styles.container}>
        <button className={styles['continue-btn']} onClick={handleClick}>
          Click Here to Continue
        </button>
      </div>
    </div>
  );
}

export default HomePage;
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import './home.module.css';

function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome to the Vendor Portal</h1>
      <div className='container'>
        <button className="continue-btn" onClick={handleClick}>
          Click Here to Continue
        </button>
      </div>
    </div>
  );
}

export default HomePage;
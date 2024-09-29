import React from 'react';
import Footer from './utilities/UILibrary/components/Footer';
import Navbar from './utilities/UILibrary/components/Nabvar';
import styles from './page.module.css';
import Login from './pages/login';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <div className={styles['main-container']}>
          <h1>Parrot: Software para Restaurantes en México</h1>
          <Login />
        </div>
      </main>
      <Footer />
    </div>
  );
}

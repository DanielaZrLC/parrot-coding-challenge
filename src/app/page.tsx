import React from 'react';
import Footer from './utilities/UILibrary/components/Footer';
import Navbar from './utilities/UILibrary/components/Nabvar';
import Login from '../pages/login';
// import Dashboard from '@/pages/dashboard';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Login />
        {/* <Dashboard/>  */}
      </main>
      <Footer />
    </div>
  );
}

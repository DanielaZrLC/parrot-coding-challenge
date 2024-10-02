import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import StoreProvider from './StoreProvider';
import Navbar from './utilities/UILibrary/components/Navbar/Nabvar';
import Footer from './utilities/UILibrary/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Parrot Challenge',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/hooks';
import { selectIsAuthenticated } from '@/app/lib/features/auth/authSlice';
import { NavbarContainer, NavLinks } from './Navbar.styles';
import Image from 'next/image';

const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  //const user = useAppSelector((state) => state.auth.user);

  return (
    <NavbarContainer>
      <Link href="/">
        <Image src="/logo.png" alt="Parrot Logo" width={200} height={90} />
      </Link>
      <NavLinks>
        {isAuthenticated ? (
          <div>
            <p>
              <span>Bienvenido,</span>
            </p>
            <p>
              <Link href="/checkout">Cerrar sesión</Link>
            </p>
          </div>
        ) : (
          <div>
            <p>
              <a
                href="https://parrotsoftware.com.mx/blog"
                target="_blank"
                rel="noreferrer"
              >
                Blog
              </a>
            </p>
            <p>
              <a
                href="https://parrotsoftware.com.mx/parrot-pay-terminal-de-pagos"
                target="_blank"
                rel="noreferrer"
              >
                Terminal de Pagos
              </a>
            </p>
          </div>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

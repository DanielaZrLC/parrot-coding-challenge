'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/app/lib/hooks';
import {
  selectIsAuthenticated,
  selectUser,
} from '@/app/lib/features/auth/authSlice';
import { NavbarContainer, NavLinks } from './Navbar.styles';
import Image from 'next/image';

const Navbar = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const username = useAppSelector(selectUser);

  return (
    <NavbarContainer>
      <Link href="/">
        <Image src="/logo.png" alt="Parrot Logo" width={200} height={90} />
      </Link>
      <NavLinks>
        {isAuthenticated ? (
          <div>
            <p>
              Bienvenido:
              <span>{username}</span>
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

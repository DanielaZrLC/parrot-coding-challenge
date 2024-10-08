'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectIsAuthenticated } from '../app/lib/features/auth/authSlice';
import Loader from './utilities/UILibrary/components/Loader';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    }
  }, [isAuthenticated, router]);

  if (loading) return <Loader />;

  return <>{isAuthenticated ? children : null}</>;
};

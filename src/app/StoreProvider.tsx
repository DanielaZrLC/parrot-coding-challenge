'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/app/lib/store'; // Don't import AppStore anymore

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize the store without including the persistor in the type
  const storeRef = useRef<ReturnType<typeof makeStore>['store'] | null>(null);

  // Assign only the store part
  if (!storeRef.current) {
    const { store } = makeStore(); // Destructure to get only the store
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

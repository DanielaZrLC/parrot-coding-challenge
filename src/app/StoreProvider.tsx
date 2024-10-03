'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/app/lib/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReturnType<typeof makeStore>['store'] | null>(null);
  if (!storeRef.current) {
    const { store } = makeStore();
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

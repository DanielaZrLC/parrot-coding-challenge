'use client';
import ProtectedRoute from '@/app/lib/features/auth/ProtectedRoute';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectStore,
  selectProducts,
  Product,
} from '../lib/features/stores/storeSlice';
import { Spin } from 'antd'; // For showing spinner while loading

const Dashboard = () => {
  const store = useSelector(selectStore);
  const products = useSelector(selectProducts);

  if (!store || products.length === 0) {
    return <Spin tip="Loading store and products..." />;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1>Mis Productos:</h1>
      </div>
      <div>
        <ul>
          {products.map((product: Product) => (
            <li key={product.uuid}>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>Precio: {product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

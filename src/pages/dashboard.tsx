/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { ProtectedRoute } from '@/app/lib/features/auth/ProtectedRoute';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectStore,
  selectProducts,
} from '@/app/lib/features/stores/storeSlice';
// import { Spin } from 'antd';
import {
  CategoriesSection,
  DashboardMain,
  Header,
  ProductsSection,
} from './dashboard.styles';

const Dashboard = () => {
  const store = useSelector(selectStore);
  const products = useSelector(selectProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category.name)),
  );

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.name === selectedCategory)
    : [];

  // if (!store || products.length === 0) {
  //   return <Spin tip="Loading store and products..." />;
  // }

  return (
    // <ProtectedRoute>
    <DashboardMain>
      <Header>
        <h1>Mis Productos</h1>
      </Header>
      <CategoriesSection>
        <ul>
          {categories.map((category) => (
            <li key={category} onClick={() => setSelectedCategory(category)}>
              {category}
            </li>
          ))}
        </ul>
      </CategoriesSection>

      <ProductsSection>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.uuid}>
              <img src={product.imageUrl} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <p>
                {product.availability === 'AVAILABLE'
                  ? 'Available'
                  : 'Unavailable'}
              </p>
              <div className="toggle">
                <input
                  type="checkbox"
                  checked={product.availability === 'AVAILABLE'}
                  readOnly
                />
              </div>
            </li>
          ))}
        </ul>
      </ProductsSection>
    </DashboardMain>
    // </ProtectedRoute>
  );
};

export default Dashboard;

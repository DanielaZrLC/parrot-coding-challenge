/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { ProtectedRoute } from '@/app/lib/features/auth/ProtectedRoute';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStore,
  selectProducts,
  fetchStoreAndProducts,
} from '@/app/lib/features/stores/storeSlice';
// import { Spin } from 'antd';
import {
  CategoriesSection,
  DashboardMain,
  Header,
  ProductsSection,
} from './dashboard.styles';
import Image from 'next/image';
import { AppDispatch } from '../lib/store';
import { Switch } from 'antd';
import Card from 'antd/es/card/Card';

const Dashboard = () => {
  // const dispatch: AppDispatch = useDispatch();
  // const store = useSelector(selectStore);
  const products = useSelector(selectProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Extract unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category.name)),
  );
  const gridStyle: React.CSSProperties = {
    width: '40%',
    textAlign: 'center',
    margin: '2rem',
  };

  console.log(products, 'products');
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
        <h1>Productos</h1>
      </Header>
      <CategoriesSection>
        <h3>Selecciona una categoría</h3>
        <div className="cards-section">
          {categories.map((category) => (
            <Card
              style={{ marginBottom: 10 }}
              size="small"
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Card>
          ))}
        </div>
      </CategoriesSection>

      <ProductsSection>
        {filteredProducts.map((product) => (
          <Card style={gridStyle} key={product.uuid}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={100}
              height={100}
            />
            <h2>{product.name}</h2>
            <h4>${product.price}</h4>
            <p>{product.description}</p>
            <h5>
              {product.availability === 'AVAILABLE'
                ? 'Available'
                : 'Unavailable'}
            </h5>
            <div className="toggle">
              <Switch checked={product.availability === 'AVAILABLE'} />
            </div>
          </Card>
        ))}
      </ProductsSection>
    </DashboardMain>
    // </ProtectedRoute>
  );
};

export default Dashboard;

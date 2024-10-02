'use client';
import { ProtectedRoute } from '@/app/ProtectedRoute';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProducts,
  fetchStoreAndProducts,
  Product,
  updateProductAvailability,
} from '@/app/lib/features/stores/storeSlice';
import {
  CategoriesSection,
  DashboardMain,
  Header,
  ProductsSection,
} from './dashboard.styles';
import Image from 'next/image';
import { AppDispatch, persistor } from '../lib/store';
import { message, Switch } from 'antd';
import Card from 'antd/es/card/Card';
import { useRouter } from 'next/navigation';
import { logout } from '../lib/features/auth/authSlice';
import { LogoutOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const products = useSelector(selectProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  // Function to extract unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category.name)),
  );

  //Function to filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.name === selectedCategory)
    : [];

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    router.push('/');
  };

  const handleSwitchChange = async (product: Product, checked: boolean) => {
    const newAvailability = checked ? 'AVAILABLE' : 'UNAVAILABLE';
    setLoadingProduct(product.uuid);
    const resultAction = await dispatch(
      updateProductAvailability({
        productId: product.uuid,
        availability: newAvailability,
      }),
    );
    if (updateProductAvailability.fulfilled.match(resultAction)) {
      await dispatch(fetchStoreAndProducts());
      setLoadingProduct(null);
    } else {
      setLoadingProduct(null);
      message.error('Failed to update product availability');
    }
  };

  return (
    <ProtectedRoute>
      <DashboardMain>
        <Header>
          <h4 onClick={handleLogout}>
            Cerrar sesión <LogoutOutlined />
          </h4>
        </Header>
        <CategoriesSection>
          <p>¡Actualiza tus productos aquí!</p>
          <h3>Selecciona una categoría</h3>
          <div className="cards-section">
            {categories.map((category) => (
              <p
                style={{ marginBottom: 10 }}
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </p>
            ))}
          </div>
        </CategoriesSection>

        <ProductsSection>
          {filteredProducts.map((product) => (
            <Card hoverable className="card-style" key={product.uuid}>
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
                  ? 'Disponible'
                  : 'No Disponible'}
              </h5>
              <div className="toggle">
                <Switch
                  loading={loadingProduct === product.uuid}
                  checked={product.availability === 'AVAILABLE'}
                  onChange={(checked) => handleSwitchChange(product, checked)}
                />
              </div>
            </Card>
          ))}
        </ProductsSection>
      </DashboardMain>
    </ProtectedRoute>
  );
};

export default Dashboard;

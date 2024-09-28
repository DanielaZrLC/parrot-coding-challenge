'use client';
import ProtectedRoute from '@/app/lib/features/auth/ProtectedRoute';
import React from 'react';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>Categorías:</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

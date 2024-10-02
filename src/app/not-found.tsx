'use client';

import { Button } from 'antd';
import React from 'react';
import './not-found.css';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="notFound-container">
      <div className="notFound-section">
        <p>Error 404</p>
        <h1>
          Lo sentimos
          <br />
          La página que estás buscando no está aquí
        </h1>
      </div>
      <Button onClick={() => router.push('/')}>
        Regresar a la página principal
      </Button>
    </div>
  );
}

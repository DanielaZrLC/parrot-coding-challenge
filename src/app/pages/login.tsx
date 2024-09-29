'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
import { AppDispatch, RootState } from '@/app/lib/store';
import { login } from '@/app/lib/features/auth/authSlice';
import { Button } from '../utilities/UILibrary/components/Button';
import { LoginContainer } from './login.styles';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  // const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));

    if (login.fulfilled.match(resultAction)) {
      // router.push('/dashboard');
    }
  };

  return (
    <LoginContainer>
      <h2>Inicia sesión</h2>
      <p>¿No tienes cuenta?</p>
      <h3>CONTACTO</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <p>Correo electrónico</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>Contraseña</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Ingresar</Button>
      </form>
    </LoginContainer>
  );
};

export default Login;

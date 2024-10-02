'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/lib/store';
import {
  loginSlice,
  selectIsAuthenticated,
} from '@/app/lib/features/auth/authSlice';
import { Button } from '@/app/utilities/UILibrary/components/Button';
import { useRouter } from 'next/navigation';
import {
  HomeContainer,
  LoginContainer,
  LoginFormWrapper,
  MainSection,
  TextHeader,
} from './login.styles';
import { Form, Input } from 'antd';
import Loader from '@/app/utilities/UILibrary/components/Loader';
import { fetchStoreAndProducts } from '@/app/lib/features/stores/storeSlice';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    await dispatch(loginSlice({ username, password })).then(() => {
      dispatch(fetchStoreAndProducts());
    });
  };
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
      console.log('User authenticated, redirecting to dashboard...');
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  type FieldType = {
    username?: string;
    password?: string;
  };

  return (
    <HomeContainer>
      {loading ? (
        <Loader />
      ) : (
        <MainSection>
          <TextHeader>
            <h1>Parrot: Software para Restaurantes en México</h1>
          </TextHeader>
          <LoginContainer>
            <h2>Inicia sesión</h2>
            <p>¿No tienes cuenta?</p>
            <h3>CONTACTO</h3>
            <LoginFormWrapper>
              <Form
                name="auth-form"
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="Correo electrónico"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu correo electrónico',
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item<FieldType>
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu contraseña',
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Button type="submit">Ingresar</Button>
              </Form>
            </LoginFormWrapper>
          </LoginContainer>
        </MainSection>
      )}
    </HomeContainer>
  );
};

export default Login;

'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/lib/store';
import {
  authenticationRequest,
  selectIsAuthenticated,
} from '@/app/lib/features/auth/authSlice';
import { Button } from '@/app/utilities/UILibrary/components/Button';
import { useRouter } from 'next/navigation';
import {
  ButtonSection,
  HomeContainer,
  LoginContainer,
  LoginFormWrapper,
  MainSection,
  TextHeader,
} from './login.styles';
import { Form, Input, Modal } from 'antd';
import Loader from '@/app/utilities/UILibrary/components/Loader';
import { fetchStoreAndProducts } from '@/app/lib/features/stores/storeSlice';
import axios from 'axios';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      await dispatch(authenticationRequest({ username, password })).unwrap();
      await dispatch(fetchStoreAndProducts());
      router.push('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const url = process.env.NEXT_PUBLIC_SES_URL;
  console.log(url);

  const showModal = () => {
    setIsModalVisible(true);
    setIsSubmitted(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsSubmitted(false);
  };

  const handleOk = async (values: { email: string }) => {
    setLoading(true);
    setMessage(null);
    setIsError(false);
    try {
      const response = await axios.post(`${url}/dev/recover-account`, {
        email: values.email,
      });
      console.log('Email sent successfully', response.data);
      setMessage(
        'Hemos enviado a tu correo la información para recuperar tu contraseña.',
      );
      setIsError(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email', error);
      setMessage('Ocurrió un error, inténtalo más tarde.');
      setIsError(true);
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
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
            <p>¿No recuerdas tu contraseña?</p>
            <h3 onClick={showModal} style={{ cursor: 'pointer' }}>
              CONTÁCTANOS
            </h3>
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
                <ButtonSection>
                  <Button type="submit">Ingresar</Button>
                </ButtonSection>
              </Form>
            </LoginFormWrapper>
          </LoginContainer>
          <Modal
            title="Recuperar Cuenta"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            {!isSubmitted ? (
              <Form layout="vertical" onFinish={handleOk}>
                <Form.Item
                  label="Correo electrónico"
                  name="email"
                  rules={[
                    { required: true, message: 'Por favor ingresa tu correo!' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <ButtonSection>
                  <Button style={{ alignSelf: 'center' }}>Enviar</Button>
                </ButtonSection>
              </Form>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: isError ? '#EF4C4D' : '#47455F',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '15% 0',
                }}
              >
                {message}
              </div>
            )}
          </Modal>
        </MainSection>
      )}
    </HomeContainer>
  );
};

export default Login;

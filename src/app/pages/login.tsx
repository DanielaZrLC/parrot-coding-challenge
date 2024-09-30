'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/router';
import { AppDispatch } from '@/app/lib/store';
import { loginSlice, selectAuthError } from '@/app/lib/features/auth/authSlice';
import { Button } from '../utilities/UILibrary/components/Button';
import {
  LoginContainer,
  LoginFormWrapper,
  MainSection,
  TextHeader,
} from './login.styles';
import { Form, FormProps, Input, Modal } from 'antd';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  // const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectAuthError);

  const onFinish = async (values: { username: string; password: string }) => {
    console.log(values, 'values');
    const resultAction = await dispatch(loginSlice({ username, password }));
    console.log(resultAction, 'result action');
  };
  useEffect(() => {
    if (error) {
      Modal.error({
        title: 'Error',
        content: error,
      });
    }
  }, [error]);

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
  };

  return (
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
            onFinishFailed={onFinishFailed}
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
                { required: true, message: 'Por favor ingresa tu contraseña' },
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
  );
};

export default Login;

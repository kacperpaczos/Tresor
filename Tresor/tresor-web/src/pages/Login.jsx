import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useTranslation } from 'react-i18next';
import '@emotion/react';
import styled from '@emotion/styled';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
  }
`;

const Login = () => {
  const { t } = useTranslation();
  const { error, loading, fetchData } = useAxios();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    fetchData({
      url: '/login',
      method: 'post',
      body: { login, password },
    });
  };

  return (
    <LoginWrapper>
      <h1>Dupa</h1>
      <h1>{t('loginForm')}</h1>

      <input type="text" placeholder={t('login')} value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
      <LoginButton onClick={handleLogin} disabled={loading}>{t('login')}</LoginButton>
      {loading && <p>{t('loading')}...</p>}
      {error && <p>{t('error')}: {error.toString()}</p>}
    </LoginWrapper>
  );
};

export default Login;

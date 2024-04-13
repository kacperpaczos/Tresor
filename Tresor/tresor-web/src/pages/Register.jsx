import React, { useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useTranslation } from 'react-i18next';
import '@emotion/react';
import styled from '@emotion/styled';

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const RegisterButton = styled.button`
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

const Register = () => {
  const { t } = useTranslation();
  const { error, loading, fetchData } = useAxios();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    fetchData({
      url: '/register',
      method: 'post',
      body: { login, email, password },
    });
  };

  return (
    <RegisterWrapper>
      <h1>{t('registerForm')}</h1>
      <input type="text" placeholder={t('login')} value={login} onChange={(e) => setLogin(e.target.value)} />
      <input type="email" placeholder={t('email')} value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} />
      <RegisterButton onClick={handleRegister} disabled={loading}>{t('register')}</RegisterButton>
      {loading && <p>{t('loading')}...</p>}
      {error && <p>{t('error')}: {error.toString()}</p>}
    </RegisterWrapper>
  );
};

export default Register;

import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect to="/login" />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* Możesz dodać więcej ścieżek i komponentów tutaj */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routes;

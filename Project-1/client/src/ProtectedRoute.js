// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
  const userId = localStorage.getItem('userId');
  return userId ? <Element /> : <Navigate to="/" />;
};

export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const AuthRoute = ({ requiredRole = 'user' }) => {
  const [status, setStatus] = useState('checking');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setStatus('unauthenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/validate', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (!data.valid || (requiredRole && data.role !== requiredRole)) {
          throw new Error('Acesso não autorizado');
        }

        setUserRole(data.role);
        setStatus('authenticated');
      } catch (error) {
        localStorage.removeItem('token');
        setStatus('unauthenticated');
      }
    };

    validateToken();
  }, [requiredRole]);

  if (status === 'checking') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ userRole }} />;
};

export default AuthRoute;
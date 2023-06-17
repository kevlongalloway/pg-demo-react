import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const withAuth = (WrappedComponent) => {
  const AuthComponent = () => {
    const navigate = useNavigate();

    // Check authentication status here
    const isAuthenticated = localStorage.getItem('access_token'); // Replace with your own logic

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return <LoginPage />
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent />;
  };

  return AuthComponent;
};

export default withAuth;

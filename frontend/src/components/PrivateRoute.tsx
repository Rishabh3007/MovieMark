import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const PrivateRoute = ({ element } : any) => {
  const { isLoggedIn, loading } = useUser();
  console.log("PrivateRoute - isLoggedIn:", isLoggedIn);  // Add logging here
  if (loading) {
    // Show a loading spinner or a placeholder while loading
    return <div>Loading...</div>;
  }

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
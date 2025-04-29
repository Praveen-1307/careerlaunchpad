import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// A wrapper for routes that should be accessible only to authenticated users
const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  console.log('PrivateRoute:', { user, loading });

  if (loading) return null; // or a loading spinner

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute; 
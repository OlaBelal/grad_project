// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/authService';

const ProtectedRoute = () => {
  return authService.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
import { Navigate } from "react-router-dom";
import authService from "../utils/token";

export function PrivateRoute({ element, requiredRole }) {
  const isAuthenticated = authService.isTokenValid(); 
  const userRole = authService.getUserRole(); 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

export function PublicRoute({ element }) {
  const isAuthenticated = authService.isTokenValid();
  const userRole = authService.getUserRole();

  if (isAuthenticated) {
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (userRole === "user") {
      return <Navigate to="/user" replace />;
    }
  }

  return element;
}









import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User logged in, render children components
  return children;
};

export default ProtectedRoute;

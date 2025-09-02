import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { getToken } from "../utils/auth";

const AppRoutes = () => {
  const token = getToken();

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/login"
        element={token ? <Navigate to="/homepage" replace /> : <LoginPage />}
      />

      {/* Homepage (protected) */}
      <Route
        path="/homepage"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />

      {/* Default route */}
      <Route
        path="*"
        element={<Navigate to={token ? "/homepage" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;

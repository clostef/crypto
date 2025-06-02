import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <div className="h-screen bg-gray-900 text-white flex justify-center items-center">
              <h1 className="text-3xl font-bold">
                Bienvenue sur la page Home protégée !
              </h1>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

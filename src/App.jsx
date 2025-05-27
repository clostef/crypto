import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-3xl">
      Bienvenue sur la page d'accueil 🏠
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;

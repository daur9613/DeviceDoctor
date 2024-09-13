import React from "react";
import { Navigate } from "react-router-dom";

// Компонент защищенного маршрута
const ProtectedRoute = ({ loggedIn, children }) => {
  if (!loggedIn) {
    // Если пользователь не авторизован, перенаправляем его на страницу входа
    return <Navigate to="/login" />;
  }

  // Если пользователь авторизован, рендерим дочерние компоненты
  return children;
};

export default ProtectedRoute;

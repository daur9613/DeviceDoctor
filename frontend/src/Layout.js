import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/header";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderRoutes = ["/registration", "/login", '/']; // Add routes where the header should be hidden

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <main>{children}</main>
    </>
  );
};

export default Layout;

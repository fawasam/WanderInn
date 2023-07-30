import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <div className="p-5 px-22 flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Toaster position="top-center" reverseOrder={true} />;
    </div>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import { App } from "antd";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <App>
      <div className="layout flex flex-col items-center gap-4 bg-slate-100 min-h-screen shadow-md">
        <NavBar />

        <div className="container w-[1000px] rounded-lg">
          <Outlet />
        </div>

        <Footer />
      </div>
    </App>
  );
};

export default Layout;

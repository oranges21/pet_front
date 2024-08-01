import React from "react";
import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Auth from "./components/Auth";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    <div className="App">
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: "#6E48C2",
          },
        }}>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
};

export default App;

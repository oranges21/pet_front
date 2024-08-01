import React, { useState, useEffect } from "react";
import { Avatar, Dropdown, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import type { MenuProps } from "antd";

import Logo from "./../../assets/logo.png";
import { logoutHandle, type AuthState } from "../../stores/modules/user";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: AuthState) => (state.user as Record<string, any>).user);

  useEffect(() => {}, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      // label: user.username,
      label: "个人中心",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "退出登录",
      icon: <LogoutOutlined />,
      onClick: () => {
        dispatch(logoutHandle());
        message.success("退出登录", 1.5, () => {
          navigate("/login");
        });
      },
    },
  ];

  return (
    <div className="h-14 w-full flex justify-center bg-white sticky top-0 z-10">
      <div className="w-[1000px] flex justify-between items-center">
        <div
          className="h-full flex items-center gap-1 leading-none cursor-pointer"
          onClick={() => {
            navigate("/");
          }}>
          <img className="h-5" src={Logo} alt="LOGO" />
          <span className="font-bold text-lg">宠物知识网</span>
        </div>

        <div className="link">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar
              src={<img src={user.avatar} alt="avatar" />}
              className="cursor-pointer"
              style={{ backgroundColor: "#6E48C2" }}
              size="default"></Avatar>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

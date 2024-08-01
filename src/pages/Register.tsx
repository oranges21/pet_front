import React, { useEffect } from "react";
import { Button, Form, Input, message, App } from "antd";
import { LockOutlined, UserOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { create } from "../api/user";
import { useSelector } from "react-redux";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const token = useSelector((state: { token: string; user: Record<string, any> }) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onFinish = (values: { [key: string]: any }) => {
    create({
      username: values.username,
      account: values.account,
      password: values.password,
    })
      .then((res) => {
        message.success("注册成功", 1.5, () => {
          navigate("/login");
        });
      })
      .catch(() => {});
  };

  return (
    <App>
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <Form className="w-[340px] bg-white p-8 rounded-lg shadow-md" onFinish={onFinish}>
          <div className="text-2xl mb-6 font-bold">用户注册</div>
          <Form.Item name="username" rules={[{ required: true, message: "请输入用户名", validateTrigger: "onFinish" }]}>
            <Input prefix={<CustomerServiceOutlined />} placeholder="用户名" size="large" />
          </Form.Item>
          <Form.Item name="account" rules={[{ required: true, message: "请输入账号", validateTrigger: "onFinish" }]}>
            <Input prefix={<UserOutlined />} placeholder="账号" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码", validateTrigger: "onFinish" }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full mt-2" type="primary" htmlType="submit" size="large">
              立即注册
            </Button>
            <a onClick={() => navigate("/login")} className="text-[#6E48C2] mt-2 block">
              已有账号？
            </a>
          </Form.Item>
        </Form>
      </div>
    </App>
  );
};

export default Register;

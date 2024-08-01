import React, { useEffect } from "react";
import { Button, Form, Input, message, App } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { loginHandle, type AuthState } from "../stores/modules/user";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state: { token: string; user: Record<string, any> }) => state.user.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onFinish = (values: { [key: string]: any }) => {
    login({
      account: values.account,
      password: values.password,
    })
      .then((res) => {
        dispatch(loginHandle(res));
        message.success("登录成功", 1.5, () => {
          navigate("/");
        });
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <App>
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <Form className="w-[340px] bg-white p-8 rounded-lg shadow-md" onFinish={onFinish}>
          <div className="text-2xl mb-6 font-bold">用户登录</div>
          <Form.Item name="account" rules={[{ required: true, message: "请输入账号", validateTrigger: "onFinish" }]}>
            <Input prefix={<UserOutlined />} placeholder="账号" size="large" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码", validateTrigger: "onFinish" }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" size="large" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full mt-2" type="primary" htmlType="submit" size="large">
              登录
            </Button>
            <a onClick={() => navigate("/register")} className="text-[#6E48C2] mt-2 block">
              没有账号？
            </a>
          </Form.Item>
        </Form>
      </div>
    </App>
  );
};

export default Login;

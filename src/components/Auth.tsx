import React from "react";
import { useSelector } from "react-redux";
import type { AuthState } from "./../stores/modules/user";
import Layout from "./../layouts";
import { Navigate } from "react-router-dom";

const Auth: React.FC = () => {
  const token = useSelector((state: AuthState) => (state.user as Record<string, any>).token);

  if (token) {
    return <Layout />;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Auth;

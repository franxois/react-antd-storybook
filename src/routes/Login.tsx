import React from "react";
import { Button } from "antd";
import { useSession } from "../contexts/Session";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";

export const Login: React.FC = () => {
  const { dispatch } = useSession();
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      onClick={() => {
        dispatch({ type: "loginAsAdmin" });
        navigate("/");
      }}
      className="center"
    >
      <LoginOutlined />
      Login as admin
    </Button>
  );
};

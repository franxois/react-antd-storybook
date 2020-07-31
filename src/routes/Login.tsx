import React from "react";
import { Button } from "antd";
import { useSession } from "../contexts/Session";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { dispatch } = useSession();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          dispatch({ type: "login" });
          navigate("/");
        }}
      >
        Login
      </Button>
    </div>
  );
};

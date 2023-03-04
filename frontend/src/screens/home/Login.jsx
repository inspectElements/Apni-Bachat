import { Auth } from "@arcana/auth-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBlock: "50px" }}>
        Welcome to Apni Bachat
      </h1>
      <div>
        <Auth
          externalWallet={false}
          theme="dark"
          onLogin={() => {
            navigate("/create");
          }}
        ></Auth>
      </div>
    </div>
  );
};

export default Login;

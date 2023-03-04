import { Auth } from "@arcana/auth-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="bg min-h-screen">
      <h1 style={{ textAlign: "center", paddingTop: "100px", paddingBottom: "50px", fontSize: "1.75rem", fontWeight: "bold" }}>
        अपनी Bachat
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

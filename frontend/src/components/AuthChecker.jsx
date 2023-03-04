import { useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";
import React from "react";

const AuthChecker = ({ children }) => {
  const auth = useAuth();

  if (!auth.user)
    return (
      <div className="center-container">
        <CircularProgress />
      </div>
    );

  return <>{children}</>;
};

export default AuthChecker;

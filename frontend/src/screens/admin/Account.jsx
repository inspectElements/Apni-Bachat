import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const RequestItem = () => {
  return (
    <div>
      <h1>Requests</h1>
    </div>
  );
}

function Account() {
  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
      <Sidebar />

      <div style={{ flex: 8 }}>
        <RequestItem />
      </div>
    </Box>
  );
}

export default Account;

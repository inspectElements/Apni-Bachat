import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="">
      <Typography variant="h4" component="h1" gutterBottom
      sx = {{
        color:"blue",
        // padding: "10px",
        fontWeight: "bold",
        fontFamily: "monospace",
        margin:"auto",
      }}
      >
        apni bachat
      </Typography>

      <Button variant="contained">
        <Typography variant="h6" component="h1" >
          Trust Score
        </Typography>
      </Button>
      <Button variant="outlined">
        <Typography variant="h6" component="h1" >
          Login Khata
        </Typography>
      </Button>
    </div>
    </>
  );

}

export default Home;

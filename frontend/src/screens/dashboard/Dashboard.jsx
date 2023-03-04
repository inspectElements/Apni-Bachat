import React from "react";
import { Typography, Button, Paper } from "@mui/material";

const Card = (props) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "300px",
          height: "75px",
          background:
            "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
          border: "3px solid #fff",
          borderRadius: "13px",
        }}
      >
        <div className="flex justify-between items-center">
          <Typography
            variant="h4"
            component="h2"
            color="primary.contrastText"
            sx={{
              fontSize: "1.25rem",
              color: "#fff",
              textAlign: "left",
              pt: 2.5,
              pl: 2,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {props.title}
          </Typography>
          <svg
            style={{
              marginTop: "1.25rem",
              marginRight: 20,
            }}
            className="w-7 rotate-180"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      </Paper>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className="container pt-10 h-[100vh]">
        <Typography
          variant="h4"
          component="h2"
          color="primary.contrastText"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mt: "10vh",
            mb: 1,
            textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.1rem",
          }}
        >
          Hi, Eshan
        </Typography>
        <p
              style={{
                fontSize: "1.25rem",
                textAlign: "center",
                color: "#f4f4f4",
                marginBottom: "5rem",
              }}
            >
              Welcome to <span>अपनी Bachat</span>
            </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-10">
          <Card title="Transact" route="route" />
          <Card title="Loan" route="route" />
          <Card title="Trade" route="route" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

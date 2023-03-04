import React from "react";
import { Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
    const navigate = useNavigate();
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
          backdropFilter: "blur(5px)",
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
            onClick={() => navigate(`/${props.route}`)}
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      </Paper>
    </>
  );
};

const Home = () => {
  return (
    <>
      <div className="container pt-10 overflow-hidden">
        <Typography
          variant="h4"
          color="primary.contrastText"
          sx={{
            fontSize: "2.7rem",
            fontWeight: "bold",
            textAlign: "center",
            mt: "20vh",
            mb: 2.5,
            textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "0.1rem",
          }}
        >
          अपनी Bachat
        </Typography>
        <Typography
          variant="h6"
          color="primary.contrastText"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.9rem",
            fontStyle: "italic",
            letterSpacing: "0.1rem",
            textAlign: "center",
            textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
            mb: 15,
          }}
        >
          "Reliable and Trustworthy"
        </Typography>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-10">
          <Card title="My Khata" route="dashboard" />
          <Card title="My Score" route="credit" />
          <Card title="Update Documents" route="update" />
        </div>
      </div>
    </>
  );
};

export default Home;

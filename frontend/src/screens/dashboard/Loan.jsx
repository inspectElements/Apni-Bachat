import React from 'react';
import { Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Overlay from '../../components/Overlay';

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
          border: "2px solid black",
          borderRadius: "13px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex justify-between items-center">
          <Typography
            variant="h4"
            component="h2"
            color="black"
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "black",
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
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => navigate(`/dashboard/loan/${props.route}`)}
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      </Paper>
    </>
  );
};

const Loan = () => {
  const navigate = useNavigate();
  if (window.innerWidth > 600) {
    return <Overlay />;
  }
  return (
    <>
    <div className="bg">
      <div className="pt-10 h-[100vh]">
      <div className="absolute inset-0 mt-5 ml-5">
      <svg
            className="w-7"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => navigate("/dashboard")}
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
        <Typography
          variant="h4"
          component="h2"
          color="bold"
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
          Loan
        </Typography>
        <p
              style={{
                fontSize: "1.25rem",
                textAlign: "center",
                color: "bold",
                marginBottom: "5rem",
              }}
            >
              Get Easy Loans Fast and Secure
            </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-7 mt-10">
          <Card title="Apply" route="apply" />
          <Card title="Status" route="status" />
          <Card title="Repay" route="repay" />
        </div>
      </div>
      </div>
    </>
  );
}

export default Loan
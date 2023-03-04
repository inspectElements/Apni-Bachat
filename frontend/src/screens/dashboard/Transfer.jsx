import React from 'react';
import { Typography, TextField, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "90vw",
          height: "auto",
          padding: "1.5rem",
          background:
            "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
          border: "2px solid black",
          borderRadius: "13px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="h4"
            component="h2"
            color="black"
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {props.title}
          </Typography>
          {props.children}
        </div>
      </Paper>
    </>
  );
};

const Transfer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg min-h-[100vh]">
        <div className="pt-20 pb-14">
          <div className="absolute inset-0 mt-5 ml-5">
            <svg
              className="w-7"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => window.history.back()}
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.95rem",
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
              pt: { mobile: 15, tablet: 5, laptop: 5 },
              mb: 1,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Transact
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Deposit and Withdraw Money now
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Card title="Transfer">
            <TextField
              label="Wallet Address"
              variant="outlined"
              sx={{ width: "95%", marginTop: "3rem" }}
            />
            <TextField
              label="Amount"
              variant="outlined"
              sx={{ width: "95%", margin: "2rem"}}
            />
            <Button
              variant="contained"
              sx={{
                disableRipple: true,
                width: "95%",
                background:
                  "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
                height: "50px",
                color: "#000",
                border: "2px solid #000",
                borderRadius: "10px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textTransform: "none",
                marginTop: "1rem",
                backdropFilter: "blur(5px)",
              }}
              onClick={() => navigate(`/dashboard`)}
            >
              Deposit
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Transfer
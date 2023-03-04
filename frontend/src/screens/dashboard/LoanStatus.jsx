import React from "react";
import {
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";

const Card = (props) => {
  const navigate = useNavigate();
  let color;
  if (props.status === "approved") {
    color = "#00FF00";
  } else if (props.status === "pending") {
    color = "#FFFF00";
  } else {
    color = "#FF0000";
  }
  let type;
  if (props.type === "9") {
    type = "Home Loan";
  } else if (props.type === "12") {
    type = "Personal Loan";
  } else if (props.type === "7") {
    type = "Car Loan";
  } else if (props.type === "5") {
    type = "Education Loan";
  } else if (props.type === "14") {
    type = "Business Loan";
  }
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
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center items-start w-[100%]">
            <div className="flex justify-between items-center w-[100%]">
              <Typography
                variant="h4"
                component="h2"
                color="black"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {props.title}
              </Typography>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: color,
                  color: "#000",
                  border: "2px solid #000",
                  borderRadius: "100%",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textTransform: "none",
                }}
              ></div>
            </div>
            <div className="mt-[1.5rem] flex flex-col justify-center items-start gap-2">
              <Typography
                variant="h4"
                component="h2"
                color="black"
                sx={{
                  fontSize: "1.25rem",
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Amount: {props.amount}
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                color="black"
                sx={{
                  fontSize: "1.25rem",
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Time Period: {props.time} Months
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                color="black"
                sx={{
                  fontSize: "1.25rem",
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Type: {type}
              </Typography>
            </div>
            <Typography
                variant="h4"
                component="h2"
                color="black"
                sx={{
                  fontSize: "1.3rem",
                  marginTop: "1.5rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                status: {props.status}
              </Typography>
          </div>
        </div>
      </Paper>
    </>
  );
};

const LoanRepay = () => {
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
            Loan Status
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Check your Loan Application Status
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Card
            title="Loan 1"
            status="approved"
            amount="0.5"
            time="12"
            type="5"
          />
          <Card
            title="Loan 2"
            status="pending"
            amount="0.5"
            time="12"
            type="5"
          />
        </div>
      </div>
    </>
  );
};

export default LoanRepay;

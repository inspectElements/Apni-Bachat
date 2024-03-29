import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Update = () => {
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
            onClick={() => navigate("/home")}
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
          Update Account
        </Typography>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Fill in the form to Continue
        </p>
      </div>
      <div className="flex flex-col gap-7 justify-center items-center mb-12">
        <TextField
          label="Mobile Number"
          variant="outlined"
          sx={{ width: "85vw" }}
        />
        <TextField
          label="Update Income"
          variant="outlined"
          sx={{ width: "85vw" }}
        />
      </div>
      <div className="flex flex-col gap-7 justify-center items-center">
        <label htmlFor="raised-button-file">
          <Button
            variant="raised"
            component="span"
            sx={{
              width: "85vw",
              backgroundColor: "#e5e7eb",
              height: "50px",
              border: "1px solid #000",
            }}
          >
            Upload PAN Card
          </Button>
        </label>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="raised"
            component="span"
            sx={{
              width: "85vw",
              backgroundColor: "#e5e7eb",
              height: "50px",
              border: "1px solid #000",
            }}
          >
            Upload Income Proof
          </Button>
        </label>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
        />
      </div>
      <div className="flex flex-col justify-center items-center p-20">
        <Button
          variant="contained"
          sx={{
            disableRipple: true,
            width: "85vw",
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
            backdropFilter: "blur(5px)",
          }}
          onClick={() => navigate(`/home`)}
        >
          Complete
        </Button>
      </div>
      </div>
    </>
  );
};

export default Update;

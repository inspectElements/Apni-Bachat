import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="my-16">
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
      <div className="flex flex-col justify-center items-center m-20">
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
          }}
          onClick={() => navigate(`/home`)}
        >
          Complete
        </Button>
      </div>
    </>
  );
};

export default Update;

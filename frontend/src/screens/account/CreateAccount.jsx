import React from "react";
import { Typography, TextField, Button } from "@mui/material";

const CreateAccount = () => {
  return (
    <>
      <div className="m-14">
        <Typography
          variant="h4"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#000",
            textAlign: "center",
            pt: { mobile: 15, tablet: 5, laptop: 5 },
            mb: 1,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Create Account
        </Typography>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Fill in the form to Continue
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center mb-10">
        <TextField
          label="Full Name"
          variant="outlined"
          sx={{ width: "85vw" }}
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          sx={{ width: "85vw" }}
        />
        <TextField
          label="Aadhar Card Number"
          variant="outlined"
          sx={{ width: "85vw" }}
        />
        <TextField
          label="Pan Card Number"
          variant="outlined"
          sx={{ width: "85vw" }}
        />
        <TextField label="Income" variant="outlined" sx={{ width: "85vw" }} />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <label htmlFor="raised-button-file">
          <Button
            variant="raised"
            component="span"
            sx={{ width: "85vw", backgroundColor: "#e5e7eb", height: "50px", border : "1px solid #000" }}
          >
            Upload Aadhar Card
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
            sx={{ width: "85vw", backgroundColor: "#e5e7eb", height: "50px", border : "1px solid #000" }}
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
            sx={{ width: "85vw", backgroundColor: "#e5e7eb", height: "50px", border : "1px solid #000" }}
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
        <label htmlFor="raised-button-file">
          <Button
            variant="raised"
            component="span"
            sx={{ width: "85vw", backgroundColor: "#e5e7eb", height: "50px", border : "1px solid #000" }}
          >
            Upload Signature
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
        <Button variant="contained" sx={{
          width: "85vw",
          backgroundColor: "#3b82f680",
          height: "50px",
        }}>
          Complete
        </Button>
      </div>
    </>
  );
};

export default CreateAccount;

import React from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Trade = () => {
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
          Trade
        </Typography>
        <p
          style={{
            textAlign: "center",
          }}
        >
          Trade Tokens Now
        </p>
      </div>
      <div className="flex flex-col gap-7 justify-center items-center mb-12">
        <TextField label="Amount" variant="outlined" sx={{ width: "85vw" }} />
        <FormControl sx={{ width: "85vw" }}>
          <InputLabel id="outputType-label">From</InputLabel>
          <Select labelId="outputType-label" id="outputType" label="From">
            <MenuItem value="Decimal">Decimal</MenuItem>
            <MenuItem value="Binary">Binary</MenuItem>
            <MenuItem value="Octal">Octal</MenuItem>
            <MenuItem value="Hexadecimal">Hexadecimal</MenuItem>
            <MenuItem value="BCD">BCD</MenuItem>
            <MenuItem value="XS3">XS3</MenuItem>
            <MenuItem value="Gray">Gray</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "85vw" }}>
          <InputLabel id="outputType-label">To</InputLabel>
          <Select labelId="outputType-label" id="outputType" label="To">
            <MenuItem value="Decimal">Decimal</MenuItem>
            <MenuItem value="Binary">Binary</MenuItem>
            <MenuItem value="Octal">Octal</MenuItem>
            <MenuItem value="Hexadecimal">Hexadecimal</MenuItem>
            <MenuItem value="BCD">BCD</MenuItem>
            <MenuItem value="XS3">XS3</MenuItem>
            <MenuItem value="Gray">Gray</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outputValue"
          placeholder="Output Amount"
          variant="outlined"
          disabled
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#001220",
            },
            width: "85vw",  
          }}
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
          }}
          onClick={() => navigate(`/dashboard`)}
        >
          Complete
        </Button>
      </div>
    </div>
    </>
  );
};

export default Trade;

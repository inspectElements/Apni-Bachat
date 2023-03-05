import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@arcana/auth-react";
import { storage, db } from "../../configs/firebase";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";

function calculateMaturityValue(principal, interestRate, tenure) {
  // convert interest rate to decimal
  interestRate = interestRate / 100;

  // calculate the total number of compounding periods
  let n = 1 * tenure;

  // calculate the maturity value using the formula
  let maturityValue = principal * Math.pow(1 + interestRate / 1, n);

  // round the maturity value to 2 decimal places
  maturityValue = Math.round(maturityValue * 100) / 100;

  return maturityValue;
}

const Card = (props) => {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "90vw",
          height: "auto",
          padding: "1.5rem",
          marginBottom: "5rem",
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

const FD = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [principal, setPrincipal] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(0);
  const [monthlyPayment, setMonthlyPayment] = React.useState();
  let a = [
    { month: 1, interest: 5 },
    { month: 1.5, interest: 5.5 },
    { month: 2, interest: 6 },
    { month: 3, interest: 7.5 },
    { month: 4, interest: 8 },
  ];
  useEffect(() => {
    if (principal && interestRate) console.log(principal, interestRate);
    setMonthlyPayment(
      parseFloat(
        calculateMaturityValue(
          parseFloat(principal),
          parseFloat(a[interestRate].interest),
          parseInt(a[interestRate].month)
        )
      )
    );
  }, [principal, interestRate]);
  const applyLoan = async () => {
    if (auth.user) {
      setLoading(true);
      let docRef = await getDocs(collection(db, "user"));
      let r = {};
      docRef.forEach((doc) => {
        if (doc.data().uid === auth.user.address)
          r = { id: doc.id, fd: doc.data().fd, balance: doc.data().balance };
      });
      if (parseFloat(principal) < parseFloat(r.balance)) {
        const fd = {
          principal: parseFloat(principal),
          interestRate: parseFloat(a[interestRate].interest),
          monthlyPayment: parseFloat(monthlyPayment),
          loanPeriod: parseInt(a[interestRate].month),
          borrower: auth.user.address,
          id: uuid(),
        };
        r.fd.push(fd);
        await updateDoc(doc(db, "user", r.id), {
          fd: r.fd,
        });
      }
      else{
        alert("Insufficient Balance")
      }
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#2e2e2e69] z-50 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <div className="bg min-h-[100vh]">
        <div className="pt-20 pb-14">
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
            Fixed Deposit
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Earn upto 8% interest on your fixed deposit
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Card title={`Fixed Deposit at ${a[interestRate].interest}%`}>
            <TextField
              label="Amount"
              variant="outlined"
              sx={{ width: "95%", marginTop: "2rem" }}
              onChange={(e) => setPrincipal(e.target.value)}
              type="number"
            />
            <FormControl
              sx={{ width: "95%", marginY: "1rem", marginTop: "2rem" }}
            >
              <InputLabel id="outputType-label">Time Period</InputLabel>
              <Select
                labelId="outputType-label"
                id="outputType"
                label="Loan Type"
                onChange={(e) => setInterestRate(e.target.value)}
              >
                <MenuItem value={0}>12 Months</MenuItem>
                <MenuItem value={1}>18 Months</MenuItem>
                <MenuItem value={2}>24 Months</MenuItem>
                <MenuItem value={3}>36 Months</MenuItem>
                <MenuItem value={4}>48 Months</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outputValue"
              placeholder="Estimated Maturity Value"
              variant="outlined"
              disabled
              value={monthlyPayment}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#001220",
                },
                width: "95%",
                margin: "1rem",
              }}
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
              }}
              onClick={() => applyLoan()}
            >
              Apply
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FD;

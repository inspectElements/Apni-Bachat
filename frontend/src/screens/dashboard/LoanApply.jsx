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

function calculateEMI(principal, interestRate, loanPeriod) {
  // Convert interest rate from percentage to decimal
  interestRate = interestRate / 100 / 12;

  // Calculate monthly payment (EMI)
  const numerator =
    principal * interestRate * Math.pow(1 + interestRate, loanPeriod);
  const denominator = Math.pow(1 + interestRate, loanPeriod) - 1;
  const monthlyPayment = (numerator / denominator).toFixed(2);

  return monthlyPayment;
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

const LoanApply = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [principal, setPrincipal] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(0);
  const [loanPeriod, setLoanPeriod] = React.useState(0);
  const [monthlyPayment, setMonthlyPayment] = React.useState();
  const [collatralImg, setCollatralImg] = React.useState(null);
  useEffect(() => {
    if (principal && interestRate && loanPeriod)
      setMonthlyPayment(
        parseFloat(
          calculateEMI(
            parseFloat(principal),
            parseFloat(interestRate),
            parseFloat(loanPeriod)
          )
        )
      );
  }, [principal, interestRate, loanPeriod]);
  const applyLoan = async () => {
    if (auth.user && collatralImg) {
      setLoading(true);
      const storageRef = ref(storage, `collateral/${uuid()}`);
      let storageSnap = await uploadBytes(storageRef, collatralImg);
      const url = await getDownloadURL(storageSnap.ref);
      let docRef = await getDocs(collection(db, "user"));
      let r = {};
      docRef.forEach((doc) => {
        if (doc.data().uid == auth.user.address)
          r = { id: doc.id, loan: doc.data().loansApplied };
      });
      r.loan = r.loan || [];
      const loan = {
        principal: parseFloat(principal),
        interestRate: parseFloat(interestRate),
        loanPeriod: parseInt(loanPeriod),
        monthlyPayment: parseFloat(monthlyPayment),
        collateral: url,
        approved: false,
        borrower: auth.user.address,
      };
      r.loan.push(loan)
      await updateDoc(doc(db, "user", r.id), {
        loan: r.loan,
      });
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
            Apply Loan
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Apply for Loan Fast and Easy
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Card title={`Loan at ${interestRate}%`}>
            <TextField
              label="Amount"
              variant="outlined"
              sx={{ width: "95%", marginTop: "2rem" }}
              onChange={(e) => setPrincipal(e.target.value)}
              type="number"
            />
            <TextField
              label="Time Period"
              placeholder="in months"
              variant="outlined"
              sx={{ width: "95%", marginTop: "2rem", marginBottom: "1rem" }}
              onChange={(e) => setLoanPeriod(e.target.value)}
              type="number"
            />
            <FormControl sx={{ width: "95%", marginY: "1rem" }}>
              <InputLabel id="outputType-label">Loan Type</InputLabel>
              <Select
                labelId="outputType-label"
                id="outputType"
                label="Loan Type"
                onChange={(e) => setInterestRate(e.target.value)}
              >
                <MenuItem value={9}>Home Loans</MenuItem>
                <MenuItem value={12}>Personal Loans</MenuItem>
                <MenuItem value={7}>Car Loans</MenuItem>
                <MenuItem value={5}>Education Loans</MenuItem>
                <MenuItem value={14}>Business Loans</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outputValue"
              placeholder="Estimated Monthly EMI"
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
            <label
              htmlFor="income"
              className="relative"
              style={{ width: "95%" }}
            >
              <Button
                variant="raised"
                component="span"
                sx={{
                  marginY: "1rem",
                  width: "100%",
                  height: "50px",
                  border: "1px solid #000",
                }}
              >
                Upload Collateral Proof
              </Button>
            </label>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="income"
              multiple
              type="file"
              onChange={(e) => setCollatralImg(e.target.files[0])}
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

export default LoanApply;

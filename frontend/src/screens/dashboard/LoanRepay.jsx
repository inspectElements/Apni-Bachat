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
import Overlay from "../../components/Overlay";
import { useAuth } from "@arcana/auth-react";
import { db } from "../../configs/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  apniBachatConractAddress,
  credibilityScoreConractAddress,
} from "../../constants";
import ApniBachat from "../../artifacts/contracts/ApniBachat.sol/ApniBachat.json";
import CredibilityScore from "../../artifacts/contracts/CredibilityScore.sol/CredibilityScore.json";
import { arcanaProvider } from "../../index";
import { providers, Contract, utils } from "ethers";

// json for month number to month name
const month = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const Card = (props) => {
  const navigate = useNavigate();

  const provider = new providers.Web3Provider(arcanaProvider.provider);
  // get the end user
  const signer = provider.getSigner();
  // get the smart contract
  const contract = new Contract(
    apniBachatConractAddress,
    ApniBachat.abi,
    signer
  );

  const pay = async (amt) => {
    const amountInWei = utils.parseUnits(amt.toString().slice(0, 10), 18);

    await contract.makeLoanPayment(props.data.pan, amountInWei);

    if (!props.data.loan[parseInt(props.title) - 1].periodRemaining) {
      props.data.loan[parseInt(props.title) - 1]["periodRemaining"] =
        parseInt(props.data.loan[parseInt(props.title) - 1].loanPeriod) - 1;
    } else {
      props.data.loan[parseInt(props.title) - 1].periodRemaining -= 1;
    }
    if (!props.data.loan[parseInt(props.title) - 1].amountPaid) {
      props.data.loan[parseInt(props.title) - 1]["amountPaid"] = parseFloat(
        props.amount
      );
    } else {
      props.data.loan[parseInt(props.title) - 1].amountPaid += parseFloat(
        props.amount
      );
    }
    if (props.data.loan[parseInt(props.title) - 1].periodRemaining === 0) {
      props.data.loan[parseInt(props.title) - 1].status = "paid";
    }
    await updateDoc(doc(db, "user", props.data.id), {
      balance: parseFloat(props.data.balance) - parseFloat(props.amount),
      loan: props.data.loan,
    });
    let ref = await getDoc(doc(db, "transactions", props.data.id));

    let type = "";
    if (props.interest === 9) {
      type = "Home Loan";
    } else if (props.interest === 12) {
      type = "Personal Loan";
    } else if (props.interest === 7) {
      type = "Car Loan";
    } else if (props.interest === 5) {
      type = "Education Loan";
    } else if (props.interest === 14) {
      type = "Business Loan";
    }
    let a = ref.data();
    if (ref.exists()) {
      a.transactions.push({
        amount: parseFloat(props.amount),
        date: new Date().toLocaleDateString(),
        type: type,
        status: "on_time",
      });
      await updateDoc(doc(db, "transactions", props.data.id), {
        transactions: a.transactions,
      });
    } else {
      ref = await setDoc(doc(db, "transactions", props.data.id), {
        transactions: [
          {
            amount: parseFloat(props.amount),
            date: new Date().toLocaleDateString(),
            type: type,
            status: "on_time",
          },
        ],
      });
    }
    navigate(0);
  };
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
          <div className="flex flex-col justify-center items-start">
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
              id: {props.title}
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
              due for: {month[3 + props.loanPeriod - props.due]}
            </Typography>
          </div>
        </div>
        <Button
          variant="contained"
          sx={{
            disableRipple: true,
            width: "auto",
            background:
              "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
            color: "#000",
            border: "2px solid #000",
            borderRadius: "10px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textTransform: "none",
          }}
          onClick={() => pay(props.amount)}
        >
          {props.amount.toString().slice(0, 10)}
        </Button>
      </Paper>
    </>
  );
};

const LoanRepay = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  useEffect(() => {
    if (!auth) return;
    if (auth.user) {
      setLoading(true);
      getDocs(collection(db, "user")).then((querySnapshot) => {
        let r = {};
        querySnapshot.forEach((doc) => {
          if (doc.data().uid == auth.user.address)
            r = {
              id: doc.id,
              loan: doc.data().loan,
              pan: doc.data().pan,
              balance: doc.data().balance,
            };
        });
        setData(r);
      });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth) return;
    if (!data) return;
    setLoading(false);
  }, [data]);
  if (window.innerWidth > 600) {
    return <Overlay />;
  }
  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
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
              onClick={() => navigate("/dashboard/loan")}
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
            Repay Loan
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Repay your pendings Dues here
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          {data.loan &&
            data.loan.map((item, index) => {
              return (
                <>
                  {item.status === "approved" && (
                    <Card
                      title={index + 1}
                      due={item.periodRemaining}
                      amount={item.monthlyPayment}
                      data={data}
                      loanPeriod={item.loanPeriod}
                      balance={data.balance}
                      interest={item.interestRate}
                    />
                  )}
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LoanRepay;

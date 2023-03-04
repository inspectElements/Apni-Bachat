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
import DoneIcon from "@mui/icons-material/Done";
import { useAuth } from "@arcana/auth-react";
import { db } from "../../configs/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const Card = (props) => {
  const navigate = useNavigate();
  const pay = async () => {
    if(!props.data.loan[parseInt(props.title) - 1].periodRemaining){
      props.data.loan[parseInt(props.title) - 1]["periodRemaining"] = parseInt(props.data.loan[parseInt(props.title) - 1].loanPeriod)-1;
    }
    else{
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
      props.data.loan[parseInt(props.title) - 1].paid = true;
    }
    await updateDoc(doc(db, "user", props.data.id), {
      loan: props.data.loan,
    });
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
              due for: {props.due}
            </Typography>
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
            onClick={() => pay()}
          >
            {props.amount}
          </Button>
        </div>
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
            r = { id: doc.id, loan: doc.data().loan };
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
                  {(item.approved && !item.paid) && (
                    <Card
                      title={index + 1}
                      due={item.periodRemaining || item.loanPeriod}
                      amount={item.monthlyPayment}
                      data={data}
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

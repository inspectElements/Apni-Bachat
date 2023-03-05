import React, { useEffect } from "react";
import { Typography, TextField, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { utils } from "ethers";
import { useAuth } from "@arcana/auth-react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";

const Transactions = (props) => {
  const navigate = useNavigate();
  let color, stat;
  if (props.status === "on_time") {
    color =
      "linear-gradient(91.47deg, rgba(50, 253, 70, 0.5) 0.58%, rgba(17, 174, 3, 0.5) 95.65%)";
    stat = "On Time";
  } else if (props.status === "semi_delayed") {
    color =
      "linear-gradient(91.47deg, rgba(253, 255, 50, 0.5) 0.58%, rgba(174, 174, 3, 0.5) 95.65%)";
    stat = "Semi Delayed";
  } else if (props.status === "delayed") {
    color =
      "linear-gradient(91.47deg, rgba(253, 50, 50, 0.5) 0.58%, rgba(174, 3, 3, 0.5) 95.65%)";
    stat = "Delayed";
  }
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "90vw",
          height: "auto",
          padding: "1.5rem",
          background: color,
          border: "2px solid black",
          borderRadius: "13px",
          backdropFilter: "blur(5px)",
          overflow: "hidden",
        }}
      >
        <div className="flex flex-col justify-between items-start">
          <Typography
            variant="h4"
            component="h2"
            color="black"
            sx={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {props.title}
          </Typography>
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
              Status:{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {stat}
              </span>
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
              Amount: {props.amount.toString().slice(0, 7)}, Rate : 10%
            </Typography>
          </div>
        </div>
      </Paper>
    </>
  );
};

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
          overflow: "hidden",
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

const Payments = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [transactions, setTransactions] = React.useState();
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (!auth) return;
    if (!auth.user) return;
    if (!auth.isLoggedIn) return;
    getDocs(collection(db, "user")).then((query) => {
      setLoading(true);
      query.forEach((docu) => {
        let temp = docu.data();
        console.log(temp);
        if (docu.data().uid === auth.user.address) {
          setData({ id: docu.id, ...temp });
        }
      });
      setLoading(false);
    });
  }, [auth]);
  const [pending, setPending] = React.useState(0);
  const [approved, setApproved] = React.useState(0);
  useEffect(() => {
    if (!data) return;
    else {
      let p = 0,
        a = 0;
      data.loan.forEach((loans) => {
        if (loans.status === "applied") p += 1;
        if (loans.status === "approved" || loans.status === 'paid') a += 1;
      });
      console.log(p, a);
      setPending(p);
      setApproved(a);
      getDoc(doc(db, "transactions", data.id)).then((docu) => {
        setTransactions(docu.data());
      });
    }
  }, [data]);
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
              onClick={() => navigate("/credit")}
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
            Payments
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Last updated on "2023-03-04, 18:58:28"
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Card title="High Impact">
            <Button
              variant="contained"
              disabled
              sx={{
                disableRipple: true,
                width: "50%",
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
                margin: "2rem",
                backdropFilter: "blur(5px)",
                "&:disabled": {
                  color: "#fff000",
                },
              }}
              onClick={() => navigate(`/dashboard`)}
            >
              Good
            </Button>
            <div className="border-2 border-black w-[100vw] pt-5 pb-8 flex justify-center items-center">
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
                <div className="flex flex-col justify-center items-start">
                  {pending}
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "normal",
                    }}
                  >
                    Pending Loans
                  </span>
                </div>
              </Typography>
            </div>
            <div className="w-[100vw] py-5 flex justify-center items-center">
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
                <div className="flex flex-col justify-center items-start">
                  {approved}
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "normal",
                    }}
                  >
                    Approved Loans
                  </span>
                </div>
              </Typography>
            </div>
          </Card>
          <Typography
            variant="h4"
            component="h2"
            color="black"
            sx={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              fontFamily: "Poppins, sans-serif",
              marginY: "1rem",
              marginTop: "2rem",
              width: "80%",
            }}
          >
            Transactions
          </Typography>
          {transactions?.transactions.map((loan) => (
            <Transactions
              title={loan.type}
              status={loan.status}
              amount={loan.amount}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Payments;

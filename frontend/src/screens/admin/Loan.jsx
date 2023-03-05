import React, { useState } from "react";
import { Box, Button, Modal, Typography, Paper } from "@mui/material";
import Sidebar from "./Sidebar";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import {
  apniBachatConractAddress,
  credibilityScoreConractAddress,
} from "../../constants";
import ApniBachat from "../../artifacts/contracts/ApniBachat.sol/ApniBachat.json";
import CredibilityScore from "../../artifacts/contracts/CredibilityScore.sol/CredibilityScore.json";
import { arcanaProvider } from "../../index";
import { providers, Contract } from "ethers";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          height: "auto",
          background:
            "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
          border: "2px solid #000",
          borderRadius: "13px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex justify-between items-start px-10 py-5">
          <div className="flex flex-col justify-center items-between pb-5">
            <Typography
              variant="h4"
              component="h2"
              color="primary.contrastText"
              sx={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "#000",
                textAlign: "left",
                pt: 2.5,
                pl: 2,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Loan Number: {props.title}
            </Typography>
            <div className="pl-4 mt-[1.5rem] flex flex-col justify-center items-start gap-1">
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
                Loan ID: {props.id}
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
                Loan Amount: {props.amount}
              </Typography>
            </div>
          </div>
          {props.children}
        </div>
      </Paper>
    </>
  );
};

const RequestItem = (props) => {
  return (
    <>
      <Card title={props.index} id={props.index} amount={props.principal}>
        <Button
          variant="contained"
          onClick={() => {
            props.setPan(props.pan);
            props.handleOpen();
            props.setId(props.id);
            props.setBorrower(props.borrower);
          }}
          sx={{
            disableRipple: true,
            width: "100px",
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
            marginRight: "1rem",
          }}
        >
          Verify
        </Button>
      </Card>
    </>
  );
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Loan() {
  const navigate = useNavigate();
  const provider = new providers.Web3Provider(arcanaProvider.provider);
  // get the end user
  const signer = provider.getSigner();
  // get the smart contract
  const contract = new Contract(
    credibilityScoreConractAddress,
    CredibilityScore.abi,
    signer
  );

  const apniBachatContract = new Contract(
    apniBachatConractAddress,
    ApniBachat.abi,
    signer
  );

  const [panCard, setPanCard] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openAccept, setOpenAccept] = React.useState(false);
  const [openRejected, setOpenRejected] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAccept = () => setOpenAccept(true);
  const handleCloseAccept = () => navigate(0);
  const handleOpenRejected = () => setOpenRejected(true);
  const handleCloseRejected = () => navigate(0);
  const [data, setData] = React.useState();
  const [id, setId] = React.useState();
  const [borrower, setBorrower] = React.useState();

  const [parsedCreditScore, setParsedCreditScore] = React.useState(null);

  React.useEffect(() => {
    let r = [];
    getDocs(collection(db, "user")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.data().loan.forEach((item) => {
          if (item.status === "applied") {
            item["pan"] = doc.data().pan;
            r.push(item);
          }
        });
      });
      setData(r);
    });
  }, []);

  const fetchCreditScore = async () => {
    console.log("approve", panCard);

    if (!panCard?.length > 0) return;

    const creditScore = await contract.calculateCreditScore(panCard);
    const _parsedCreditScore = parseInt(creditScore._hex.substring(2), 16);
    setParsedCreditScore(_parsedCreditScore);
  };
  const approveOnClick = async () => {
    await arcanaProvider.connect();

    const result = await apniBachatContract.approveLoan(panCard);

    console.log(result);

    if (result === "approved") {
      let r = {};
      await getDocs(collection(db, "user")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === borrower) {
            r["id"] = doc.id;
            r["balance"] = doc.data().balance;
            r["loan"] = [];
            doc.data().loan.forEach((item) => {
              console.log(item.id, id);
              if (item.id === id) {
                r["balance"] = r["balance"] + item.principal;
                item.status = "approved";
              }
              r["loan"].push(item);
            });
          }
        });
      });
      console.log(r);
      await updateDoc(doc(db, "user", r.id), {
        balance: r.balance,
        loan: r.loan,
      }).then(() => {
        handleClose();
        handleOpenAccept();
      });
    } else {
      await rejectLoanRequest();
      handleOpenRejected();
    }
    return;
  };

  const getScore = (credit) => {
    if (credit < 300) {
      return 1;
    } else if (credit < 700) {
      return 2;
    } else {
      return 3;
    }
  };
  const rejectLoanRequest = async () => {
    let r = {};
    await getDocs(collection(db, "user")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === borrower) {
          r["id"] = doc.id;
          r["loan"] = [];
          doc.data().loan.forEach((item) => {
            console.log(item.id, id);
            if (item.id === id) {
              item.status = "rejected";
            }
            r["loan"].push(item);
          });
        }
      });
    });
    console.log(r);
    await updateDoc(doc(db, "user", r.id), {
      loan: r.loan,
    }).then(() => {
      console.log("Document successfully updated!");
    });
  };
  return (
    <>
      <Box sx={{ display: "flex", width: "100vw", height: "100vh", borderRadius: "10px !important" }} className="admin-bg">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="relative">
            <img src={`/meter${getScore(parsedCreditScore)}.png`} alt="meter" />
            {parsedCreditScore !== null && (
              <Typography
                id="modal-modal-title"
                variant="h2"
                component="h2"
                className="text-center"
                style={{ position: "absolute", top: "40%", left: "38%" }}
              >
                {parsedCreditScore}
              </Typography>
            )}
            <div className="w-full flex justify-center items-start">
              <Button
                variant="contained"
                onClick={fetchCreditScore}
                sx={{
                  disableRipple: true,
                  // width: "100px",
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
                  marginRight: "1rem",
                  paddingX: "1rem",
                }}
              >
                Fetch
              </Button>
              <Button
                variant="contained"
                onClick={approveOnClick}
                sx={{
                  disableRipple: true,
                  // width: "100px",
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
                  marginRight: "1rem",
                  paddingX: "1rem",
                }}
              >
                Approve
              </Button>
              {/* <Button
                variant="contained"
                nClick={rejectLoanRequest}
                sx={{
                  disableRipple: true,
                  // width: "100px",
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
                  marginRight: "1rem",
                  paddingX: "1rem",
                }}
              >
                Reject
              </Button> */}
            </div>
          </Box>
        </Modal>
        <Modal
          open={openRejected}
          onClose={handleCloseRejected}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="relative">
            <img src="/cross.final.gif" alt="rejected" />
            <h2 className="text-center font-bold my-3">
              Contract rejected the loan due to bad credibility
            </h2>
            <div className="w-full flex justify-center items-start">
            <Button
                variant="contained"
                onClick={handleCloseRejected} 
                sx={{
                  disableRipple: true,
                  width: "100px",
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
                  marginRight: "1rem",
                }}
              >
                Ok
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openAccept}
          onClose={handleCloseAccept}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="relative">
            <img src="/tick.final.gif" />
            <h2 className="text-center font-bold my-3 text-xl">
              Contract has accepted the loan
            </h2>
            <div className="w-full flex justify-center items-start">
            <Button
                variant="contained"
                fullWidth
                onClick={handleCloseAccept} 
                sx={{
                  disableRipple: true,
                  // width: "100px",
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
                  marginRight: "1rem",
                }}
              >
                Ok
              </Button>
            </div>
          </Box>
        </Modal>
        <Sidebar />
        <div className="flex flex-col justify-start items-start w-[70%]">
          <Typography
            variant="h4"
            color="black"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0.1rem",
              my: "5rem",
              mb: "4rem",
              ml: "5rem",
            }}
          >
            Account Loan Requests
          </Typography>
          <div className="flex-[8] flex w-full justify-start items-center flex-col gap-4 pt-2">
          {(!data || data.length === 0) && (
              <div className="w-[90%] p-5 text-2xl flex justify-start items-start">
                <h1 className="text-left ml">No requests</h1>
              </div>
            )}
            {data?.map((item, index) => (
              <RequestItem
                handleOpen={handleOpen}
                setPan={setPanCard}
                setId={setId}
                setBorrower={setBorrower}
                {...item}
                index={index}
              />
            ))}
          </div>
        </div>
      </Box>
    </>
  );
}

export default Loan;

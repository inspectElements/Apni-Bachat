import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";

import { useAuth } from "@arcana/auth-react";
import {
  apniBachatConractAddress,
  credibilityScoreConractAddress,
} from "../../constants";
import ApniBachat from "../../artifacts/contracts/ApniBachat.sol/ApniBachat.json";
import CredibilityScore from "../../artifacts/contracts/CredibilityScore.sol/CredibilityScore.json";
import { arcanaProvider } from "../../index";
import CustomizedDialogs from "../../components/CustomizedDialogs";

import { providers, Contract, utils } from "ethers";

const RequestItem = (props) => {
  console.log(props);
  return (
    <div className="w-[90%] bg-white shadow-lg">
      <div className="w-full flex justify-between p-5">
        <div>
          <h1>Loan id: {props.index}</h1>
          <h3>Loan amount: {props.principal}</h3>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            props.setPan(props.pan);
            props.handleOpen();
            props.setId(props.id);
            props.setBorrower(props.borrower);
          }}
        >
          Approve
        </Button>
      </div>
    </div>
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
  const handleCloseAccept = () => setOpenAccept(false);
  const handleOpenRejected = () => setOpenRejected(true);
  const handleCloseRejected = () => setOpenRejected(false);
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
            r["loan"] = [];
            doc.data().loan.forEach((item) => {
              console.log(item.id, id);
              if (item.id === id) {
                item.status = "approved";
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
        handleClose();
        handleOpenAccept();
      });
    } else {
      await rejectLoanRequest();
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
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
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
            <Button onClick={fetchCreditScore}>fetch</Button>
            <Button onClick={approveOnClick}>approve</Button>
            <Button onClick={rejectLoanRequest}>reject</Button>
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
          <img src="https://png.pngtree.com/png-vector/20210414/ourmid/pngtree-red-cross-vector-icon-no-symbol-rejected-cancel-negative-sign-deny-png-image_3216548.jpg" alt="rejected" />
          <div className="w-full flex justify-center items-start">
            <Button onClick={handleCloseRejected} variant="contained">Ok</Button>
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/2143/2143150.png"
            alt="approved"
          />
          <div className="w-full flex justify-center items-start">
            <Button onClick={handleCloseAccept} variant="contained">
              OKII
            </Button>
          </div>
        </Box>
      </Modal>
      <Sidebar />

      <div className="flex-[8] flex w-full justify-start items-center flex-col gap-4 pt-2">
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
    </Box>
  );
}

export default Loan;

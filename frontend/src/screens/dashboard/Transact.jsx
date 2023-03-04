import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useAuth } from "@arcana/auth-react";

import { providers, Contract, utils } from "ethers";
import { apniBachatConractAddress } from "../../constants";
import ApniBachat from "../../artifacts/contracts/ApniBachat.sol/ApniBachat.json";
import { arcanaProvider } from "../../index";
import CustomizedDialogs from "../../components/CustomizedDialogs";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
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

const Transact = () => {
  const provider = new providers.Web3Provider(arcanaProvider.provider);
  // get the end user
  const signer = provider.getSigner();
  // get the smart contract
  const contract = new Contract(
    apniBachatConractAddress,
    ApniBachat.abi,
    signer
  );

  const [modal, setModal] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [error, setError] = useState(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [depMoney, setDepMoney] = useState("");
  const [withMoney, setWithMoney] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    if (!auth.user) return;
    const getProperties = async () => {
      const snapshot = await getDocs(collection(db, "user"));
      let tData = [];
      snapshot.forEach((doc) => {
        let temp = doc.data();
        if (temp.uid === auth.user.address) {
          if (!temp.kyc_done) navigate("/home");
          tData.push({ ...doc.data(), id: doc.id });
        }
      });
      setData(tData);
    };
    getProperties();
  }, [auth]);

  useEffect(() => {
    setLoading(true);
    if (data) setLoading(false);
  }, [data]);

  const deposit = async () => {
    if (!depMoney) return;
    setLoading(true);
    setModal(true);
    setStepCount(0);

    const amountInWei = utils.parseEther(depMoney.toString());

    console.log("amountInWei", amountInWei);

    let docRef = await getDocs(collection(db, "user"));
    let r = {};
    docRef.forEach((doc) => {
      if (doc.data().uid == auth.user.address)
        r = { id: doc.id, amount: doc.data().balance, pan: doc.data().pan };
    });

    setStepCount((prev) => prev + 1);

    await contract.deposit(r.pan, {
      value: amountInWei,
    });

    await updateDoc(doc(db, "user", r.id), {
      balance: parseFloat(parseFloat(r.amount) + parseFloat(depMoney)),
    });

    setStepCount((prev) => prev + 1);
    setDepMoney("");

    setLoading(false);
    navigate(0);
  };

  const withdraw = async () => {
    if (!withMoney) return;
    if (data[0].balance < withMoney) return alert("Insufficient Balance");
    setLoading(true);

    setModal(true);
    setStepCount(0);

    const amountInWei = utils.parseEther(withMoney.toString());
    console.log("amountInWei", amountInWei);

    let docRef = await getDocs(collection(db, "user"));
    let r = {};
    docRef.forEach((doc) => {
      if (doc.data().uid === auth.user.address)
        r = {
          id: doc.id,
          amount: doc.data().balance,
          kyc_done: doc.data().kyc_done,
          pan: doc.data().pan,
        };
    });
    if (parseFloat(r.amount) < parseFloat(withMoney)) return;

    setStepCount((prev) => prev + 1);

    await contract.withdraw(amountInWei, r.pan);

    await updateDoc(doc(db, "user", r.id), {
      balance: parseFloat(parseFloat(r.amount) - parseFloat(withMoney)),
    });

    setStepCount((prev) => prev + 1);
    setWithMoney("");

    setLoading(false);
    navigate(0);
  };
  console.log(data);
  return (
    <>
      <CustomizedDialogs
        open={modal}
        setOpen={setModal}
        stepCount={stepCount}
        error={error}
        steps={[
          "Initiating contract interaction",
          "Transacting with Apni Bachat smart contract",
          "Success",
        ]}
      />

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
            Transact
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Deposit and Withdraw Money now
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center pb-15">
          <Card title={`Balance: ${(data && data[0]?.balance) || 0}`} />
          <Card title="Deposit">
            <TextField
              label="Amount"
              variant="outlined"
              value={depMoney}
              sx={{ width: "95%", margin: "2rem", marginTop: "3rem" }}
              onChange={(e) => setDepMoney(e.target.value)}
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
              }}
              onClick={() => deposit()}
            >
              Deposit
            </Button>
          </Card>
          <Card title="Withdraw">
            <TextField
              label="Amount"
              variant="outlined"
              value={withMoney}
              sx={{ width: "95%", margin: "2rem", marginTop: "3rem" }}
              onChange={(e) => setWithMoney(e.target.value)}
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
              }}
              onClick={() => withdraw()}
            >
              Withdraw
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Transact;

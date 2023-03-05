import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useAuth } from "@arcana/auth-react";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { providers, Contract } from "ethers";
import { apniBachatConractAddress } from "../../constants";
import ApniBachat from "../../artifacts/contracts/ApniBachat.sol/ApniBachat.json";
import { arcanaProvider } from "../../index";
import CustomizedDialogs from "../../components/CustomizedDialogs";

import axios from "axios";

const Card = (props) => {
  const navigate = useNavigate();
return (
  <>
    <Paper
      elevation={3}
      sx={{
        width: "90%",
        height: "75px",
        background:
          "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
        border: "2px solid #000",
        borderRadius: "13px",
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="flex justify-between items-center">
        <Typography
          variant="h4"
          component="h2"
          color="primary.contrastText"
          sx={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#000",
            textAlign: "left",
            pt: 2.5,
            pl: 2,
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

const OcrSpaceApi = () => {
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.ocr.space/parse/image", {
        apikey: "YOUR_API_KEY",
        url: "IMAGE_URL",
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Send Request</button>
      </form>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

const RequestItem = (props) => {
  const provider = new providers.Web3Provider(arcanaProvider.provider);
  // get the end user
  const signer = provider.getSigner();
  // get the smart contract
  const contract = new Contract(
    apniBachatConractAddress,
    ApniBachat.abi,
    signer
  );

  const [data, setData] = useState("");

  const [modal, setModal] = useState(false);
  const [stepCount, setStepCount] = useState(0);
  const [error, setError] = useState(null);

  const onClickApprove = async () => {
    setModal(true);

    await arcanaProvider.connect();
    const personalData = {
      name: props.name,
      dateOfBirth: "01-01-1980",
      panNumber: props.pan,
    };

    setStepCount((prev) => prev + 1);

    await contract.enroll(personalData, personalData.panNumber, {
      employerName: props.name,
      occupation: "SWE",
      incomePerYear: props.income,
    });

    props.approve(props.id);

    setStepCount((prev) => prev + 1);
  };

  const onClickOcr = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.ocr.space/parse/image", {
        apikey: "YOUR_API_KEY",
        url: "IMAGE_URL",
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Card title={props.name}>
    <Button variant="contained" onClick={onClickApprove} sx={{
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
    }}>
          Approve
        </Button>
    </Card>
    <div className="w-[90%] bg-white shadow-lg">
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
      <div className="w-full flex justify-between p-5">
        <div>
          <h1 className="text-lg">Name: {props.name}</h1>
          <h3>Pan card: {props.pan}</h3>
          <h3>Phone: {props.mobile}</h3>
          <h3>Income: {props.income}</h3>
          <div className="flex gap-3 my-2">
            <Button variant="outlined">
              <a href={props.panImg} target="_blank">
                pan card
              </a>
            </Button>
            <Button variant="outlined">
              <a href={props.aadharImg} target="_blank">
                aadhar proof
              </a>
            </Button>
            <Button variant="outlined">
              <a href={props.incomeImg} target="_blank">
                income proof
              </a>
            </Button>
            <img src={props.signatureImg} alt="signature" className="h-16" />
          </div>
        </div>
        <Button variant="contained" onClick={onClickApprove} className="h-12">
          Approve
        </Button>
        <Button variant="contained" onClick={onClickOcr} className="h-12">
          ocr
        </Button>
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
    </>
  );
};
function Account() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!auth.user) return;
    const getProperties = async () => {
      const snapshot = await getDocs(collection(db, "user"));
      let tData = [];
      snapshot.forEach((doc) => {
        let temp = doc.data();
        console.log(temp);
        if (!temp.kyc_done) {
          tData.push({ ...doc.data(), id: doc.id });
        }
      });
      setData(tData);
    };
    getProperties();
  }, [auth]);
  useEffect(() => {
    console.log(data);
    setLoading(true);
    if (data) setLoading(false);
  }, [data]);
  const approve = async (id) => {
    await updateDoc(doc(db, "user", id), {
      kyc_done: true,
    });
    setData(data.filter((item) => item.id !== id));
  };
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#2e2e2e69] z-50 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }} className="admin-bg">
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
          Account KYC Requests
        </Typography>
        <div className="flex-[8] flex w-full justify-start items-center flex-col gap-4 pt-2 overflow-y-auto">
          {(!data || data.length === 0) && (
            <div className="w-[90%] bg-white p-5 text-2xl flex justify-start items-start">
              <h1 className="text-left ml">No requests</h1>
            </div>
          )}
          {data?.map((item) => (
            <RequestItem approve={approve} {...item} />
          ))}
        </div>
        </div>
      </Box>
    </>
  );
}

export default Account;

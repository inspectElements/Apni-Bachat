import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/firebase";
import ChatIcon from "@mui/icons-material/Chat";
import { useTranslation } from "react-i18next";
import CreditMeter from "./CreditMeter";

const Score = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "300px",
          height: "auto",
          background:
            "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
          border: "2px solid black",
          borderRadius: "13px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex flex-col justify-between items-center">
          <Typography
            variant="h4"
            component="h2"
            color="black"
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              pt: 2.5,
              pl: 2,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {t(props.title)}
          </Typography>
          <CreditMeter creditScore="500" style="height: 100px !important"/>
        </div>
      </Paper>
    </>
  );
};

const Card = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "300px",
          height: "75px",
          background:
            "linear-gradient(91.47deg, rgba(201, 72, 247, 0.39) 0.58%, rgba(143, 0, 167, 0.39) 95.65%)",
          border: "2px solid black",
          borderRadius: "13px",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="flex justify-between items-center">
          <Typography
            variant="h4"
            component="h2"
            color="black"
            sx={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "black",
              textAlign: "left",
              pt: 2.5,
              pl: 2,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {t(props.title)}
          </Typography>
          <svg
            style={{
              marginTop: "1.25rem",
              marginRight: 20,
            }}
            className="w-7 rotate-180"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={() => navigate(`/credit/${props.route}`)}
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </div>
      </Paper>
    </>
  );
};

const Credit = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  let auth = useAuth();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [kyc, setKyc] = useState();
  useEffect(() => {
    if (!auth.user) return;
    const getProperties = async () => {
      const snapshot = await getDocs(collection(db, "user"));
      let tData = [];
      snapshot.forEach((doc) => {
        let temp = doc.data();
        if (!temp.kyc_done) {
          tData.push({ ...doc.data(), id: doc.id });
        }
      });
      setData(tData);
    };
    getProperties();
  }, [auth]);
  useEffect(() => {
    setLoading(true);
    if (data) {
      getDocs(collection(db, "user")).then((docRef) => {
        docRef.forEach((doc) => {
          if (doc.data().uid == auth.user.address) {
            let temp = doc.data();
            setKyc(temp.kyc_done);
          }
        });
      });
    }
  }, [data]);
  console.log(kyc);
  if (kyc === false) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-2xl bg font-bold">
        KYC under process
      </div>
    );
  } 
  else if (kyc === undefined) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-2xl bg  font-bold">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className="bg min-h-[100vh] py-10">
          <div className="flex justify-between">
            <svg
              className="w-7 absolute inset-0 mt-5 ml-5"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              onClick={() => navigate("/home")}
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <ChatIcon
              className="absolute top-0 right-0 mt-5 mr-5"
              sx={{ fontSize: "2rem" }}
              onClick={() => navigate("/chat")}
            />
          </div>
          <Typography
            variant="h4"
            component="h2"
            color="bold"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mt: "10vh",
              mb: 1,
              textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0.1rem",
            }}
          >
            {t("hi")}, Eshan
          </Typography>
          <p
            style={{
              fontSize: "1.25rem",
              textAlign: "center",
              color: "bold",
              marginBottom: "2rem",
            }}
          >
            {t("welcome to")}
          </p>

          <div className="flex justify-center">
            <FormControl
              sx={{
                width: "120px",
              }}
            >
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  fontSize: 16,
                }}
              >
                Lang
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Lang"
                defaultValue={"en"}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
                sx={{
                  borderRadius: "15px",

                  "& fieldset": {
                    height: "50px",
                    border: "2px solid gray",
                  },
                }}
              >
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"hi"}>Hindi</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-7 py-10">
            <Score title="credibility score" />
            <Card title="check payments" route="payments" />
            <Card title="account age" route="age" />
            <Card title="my accounts" route="accounts" />
            <Card title="credits used" route="" />
            <Card title="enquiry" route="" />
          </div>
      </div>
    </>
  );
};

export default Credit;

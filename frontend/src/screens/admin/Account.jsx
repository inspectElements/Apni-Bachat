import React, { useState, useEffect } from "react";
import { Box, Button, Modal, Typography, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase";
import { useAuth } from "@arcana/auth-react";

const RequestItem = (props) => {
  return (
    <div className="w-[90%] bg-white shadow-lg">
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
        <Button
          variant="contained"
          onClick={() => props.approve(props.id)}
          className="h-12"
        >
          Approve
        </Button>
      </div>
    </div>
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
  }
  return (
    <>
    {loading &&
      <div className="fixed top-0 left-0 w-screen h-screen bg-[#2e2e2e69] z-50 flex justify-center items-center">
        <CircularProgress/>
      </div>
    }
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar />

      <div className="flex-[8] flex w-full justify-start items-center flex-col gap-4 pt-2 overflow-y-auto">
        {(!data  || data.length===0) && 
        <div className="w-[90%] bg-white shadow-lg p-5">
          <h1 className="m-auto w-fit">No requests</h1>
        </div>
        }
        {data?.map((item) => (
          <RequestItem approve={approve} {...item} />
          ))}
      </div>
    </Box>
    </>
  );
}

export default Account;

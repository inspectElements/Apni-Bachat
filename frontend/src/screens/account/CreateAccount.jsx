import React, { useEffect } from "react";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useAuth } from "@arcana/auth-react";
import { storage, db } from "../../configs/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-uuid";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [name, setName] = React.useState();
  const [mobile, setMobile] = React.useState();
  const [aadhar, setAadhar] = React.useState();
  const [pan, setPan] = React.useState();
  const [income, setIncome] = React.useState();
  const [aadharImg, setAadharImg] = React.useState();
  const [panImg, setPanImg] = React.useState();
  const [incomeImg, setIncomeImg] = React.useState();
  const [signatureImg, setSignatureImg] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState();

  useEffect(() => {
    if (!auth) return;
    if (auth.isLoggedIn) {
      setLoading(true);
      getDocs(collection(db, "user")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === auth.user.address) {
            setData("data");
          }
        });
      });
      setLoading(false);
    }
  }, [auth]);
  useEffect(() => {
    setLoading(false);
    if (data) return navigate("/home");
  }, [data]);
  const create = async () => {
    if (auth.isLoggedIn) {
      setLoading(true);
      let panImgUploadRef = ref(storage, `pan_images/${uuid()}`);
      let incomeImgUploadRef = ref(storage, `income_proof_images/${uuid()}`);
      let signatureImgUploadRef = ref(storage, `signature_images/${uuid()}`);
      let aadharImgUploadRef = ref(
        storage,
        `aadhar_proof_certificate/${uuid()}`
      );

      let panSnap = await uploadBytes(panImgUploadRef, panImg[0]);
      let incomeSnap = await uploadBytes(incomeImgUploadRef, incomeImg[0]);
      let signatureSnap = await uploadBytes(
        signatureImgUploadRef,
        signatureImg[0]
      );
      let aadharSnap = await uploadBytes(aadharImgUploadRef, aadharImg[0]);

      let panDownloadURL = await getDownloadURL(panSnap.ref);
      let incomeDownloadURL = await getDownloadURL(incomeSnap.ref);
      let signatureDownloadURL = await getDownloadURL(signatureSnap.ref);
      let aadharDownloadURL = await getDownloadURL(aadharSnap.ref);
      let data = {
        name,
        mobile: parseFloat(mobile),
        aadhar: parseFloat(aadhar),
        pan,
        income: parseFloat(income),
        panImg: panDownloadURL,
        incomeImg: incomeDownloadURL,
        signatureImg: signatureDownloadURL,
        aadharImg: aadharDownloadURL,
        uid: auth.user.address,
        kyc_done: false,
        balance: 0,
        loan: [],
        fd: [],
      };
      await addDoc(collection(db, "user"), data);
      setLoading(false);
      navigate("/home");
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#2e2e2e69] z-50 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
      <div className="bg">
        <div className="p-14">
          <Typography
            variant="h4"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
              pt: { mobile: 15, tablet: 5, laptop: 5 },
              mb: 1,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Create Account
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Fill in the form to Continue
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center mb-10">
          <TextField
            label="Full Name"
            variant="outlined"
            sx={{ width: "85vw" }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            sx={{ width: "85vw" }}
            onChange={(e) => setMobile(e.target.value)}
            type="number"
          />
          <TextField
            label="Aadhar Card Number"
            variant="outlined"
            sx={{ width: "85vw" }}
            onChange={(e) => setAadhar(e.target.value)}
            type="number"
          />
          <TextField
            label="Pan Card Number"
            variant="outlined"
            sx={{ width: "85vw" }}
            onChange={(e) => setPan(e.target.value)}
          />
          <TextField
            label="Income"
            variant="outlined"
            sx={{ width: "85vw" }}
            onChange={(e) => setIncome(e.target.value)}
            type="number"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <label htmlFor="aadhar" className="relative">
            <Button
              variant="raised"
              component="span"
              sx={{
                width: "85vw",
                backgroundColor: "#e5e7eb",
                height: "50px",
                border: "1px solid #000",
              }}
            >
              Upload Aadhar Card
            </Button>
            {aadharImg && (
              <DoneIcon
                color="success"
                className="absolute top-[50%] translate-y-[-50%] right-7"
              />
            )}
          </label>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="aadhar"
            multiple
            type="file"
            onChange={(e) => setAadharImg(e.target.files)}
          />
          <label htmlFor="pan" className="relative">
            <Button
              variant="raised"
              component="span"
              sx={{
                width: "85vw",
                backgroundColor: "#e5e7eb",
                height: "50px",
                border: "1px solid #000",
              }}
            >
              Upload PAN Card
            </Button>
            {panImg && (
              <DoneIcon
                color="success"
                className="absolute top-[50%] translate-y-[-50%] right-7"
              />
            )}
          </label>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="pan"
            multiple
            type="file"
            onChange={(e) => setPanImg(e.target.files)}
          />
          <label htmlFor="income" className="relative">
            <Button
              variant="raised"
              component="span"
              sx={{
                width: "85vw",
                backgroundColor: "#e5e7eb",
                height: "50px",
                border: "1px solid #000",
              }}
            >
              Upload Income Proof
            </Button>
            {incomeImg && (
              <DoneIcon
                color="success"
                className="absolute top-[50%] translate-y-[-50%] right-7"
              />
            )}
          </label>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="income"
            multiple
            type="file"
            onChange={(e) => setIncomeImg(e.target.files)}
          />
          <label htmlFor="signature" className="relative">
            <Button
              variant="raised"
              component="span"
              sx={{
                width: "85vw",
                backgroundColor: "#e5e7eb",
                height: "50px",
                border: "1px solid #000",
              }}
            >
              Upload Signature
            </Button>
            {signatureImg && (
              <DoneIcon
                color="success"
                className="absolute top-[50%] translate-y-[-50%] right-7"
              />
            )}
          </label>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="signature"
            multiple
            type="file"
            onChange={(e) => setSignatureImg(e.target.files)}
          />
        </div>
        <div className="flex flex-col justify-center items-center p-20">
          <Button
            variant="contained"
            sx={{
              disableRipple: true,
              width: "85vw",
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
              backdropFilter: "blur(5px)",
            }}
            onClick={() => create()}
          >
            Complete
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;

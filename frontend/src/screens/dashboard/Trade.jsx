import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  Paper,
} from "@mui/material";
import Overlay from "../../components/Overlay";
import { useNavigate } from "react-router-dom";
import { arcanaProvider } from "../..";
import { providers, Contract, utils } from "ethers";
import { useAuth } from "@arcana/auth-react";

function calculateTransit(amount, rate) {
  return amount * rate;
}

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

const Trade = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [amount, setAmount] = React.useState(0);
  const [rate, setRate] = React.useState(0);
  const [transit, setTransit] = React.useState(0);
  useEffect(() => {
    setTransit(
      parseFloat(calculateTransit(parseFloat(amount), parseFloat(rate)))
    );
  }, [amount, rate]);

  const onClickTrade = () => {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    // get the end user
    const signer = provider.getSigner();

    const tx = {
      from: auth.user.address,
      to: auth.user.address,
      value: utils.parseEther(amount),
      nonce: provider.getTransactionCount(auth.user.address, "latest"),
      gasLimit: utils.hexlify(100000),
      gasPrice: provider.getGasPrice(),
    };

    signer.sendTransaction(tx).then((transaction) => {
      console.dir(transaction);
      // setSendAccount("");
      // setSendTokenAmount("");
      // navigate(0);
    });
  };

  if (window.innerWidth > 600) {
    return <Overlay />;
  }
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
              onClick={() => navigate("/dashboard")}
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
            Trade
          </Typography>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Trade Tokens Now
          </p>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          <Card title="Swap Token">
            <TextField
              label="Amount"
              variant="outlined"
              sx={{ width: "95%", marginTop: "3rem" }}
              onChange={(e) => setAmount(e.target.value)}
            />
            <FormControl sx={{ width: "95%", marginTop: "2rem" }}>
              <InputLabel id="outputType-label">From</InputLabel>
              <Select
                labelId="outputType-label"
                id="outputType"
                label="From"
                onChange={(e) => setRate(e.target.value)}
              >
                <MenuItem value="19538.70">Bitcoin</MenuItem>
                <MenuItem value="1369.73">Ethereum</MenuItem>
                <MenuItem value="0.85209">Binance Coin</MenuItem>
                <MenuItem value="66.4006">Aave</MenuItem>
                <MenuItem value="0.87749">Tether</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Matic"
              disabled
              variant="outlined"
              sx={{ width: "95%", margin: "2rem" }}
              value={transit}
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
                marginTop: "1rem",
                backdropFilter: "blur(5px)",
              }}
              onClick={onClickTrade}
            >
              Convert
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Trade;

import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Sidebar from "./Sidebar";

const RequestItem = (props) => {
  return (
    <div className="w-[90%] bg-white shadow-lg">
      <div className="w-full flex justify-between p-5">
        <div>
          <h1>Loan id: 12</h1>
          <h3>Loan amount: 4000</h3>
        </div>
        <Button variant="contained" onClick={props.handleOpen}>
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src="https://t4.ftcdn.net/jpg/03/21/80/19/360_F_321801932_i0XO5LAnSNpKnMxeF4OijfIrOEC9aEB8.jpg" alt="meter"/>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center"
          >
            Credit Score: 52
          </Typography>
          <div className="w-full flex justify-center items-start">
            <Button>approve</Button>
            <Button>reject</Button>
          </div>
        </Box>
      </Modal>
      <Sidebar />

      <div className="flex-[8] flex w-full justify-start items-center flex-col gap-4 pt-2">
        <RequestItem handleOpen={handleOpen} />
        <RequestItem handleOpen={handleOpen} />
        <RequestItem handleOpen={handleOpen} />
      </div>
    </Box>
  );
}

export default Loan;
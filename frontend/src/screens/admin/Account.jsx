import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Sidebar from "./Sidebar";

const RequestItem = (props) => {
  return (
    <div className="w-[90%] bg-white shadow-lg">
      <div className="w-full flex justify-between p-5">
        <div>
          <h1 className="text-lg">Name: Kunal</h1>
          <h3>Address: nycvnriubhi ijriodjg vjan burhanpur</h3>
          <h3>Pan card: C214234JIfenj</h3>
          <h3>Phone: 1234567890</h3>
          <div className="flex gap-3 my-2">
            <Button variant="outlined">pan card</Button>
            <Button variant="outlined">address proof</Button>
            <Button variant="outlined">income proof</Button>
            <Button variant="outlined">signature proof</Button>
          </div>
        </div>
        <Button variant="contained" onClick={props.handleOpen} className="h-12">
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
function Account() {
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

      <div className="flex-[8] flex w-full justify-start items-center flex-col gap-4 pt-2 overflow-y-auto">
        <RequestItem handleOpen={handleOpen} />
        <RequestItem handleOpen={handleOpen} />
        <RequestItem handleOpen={handleOpen} />
        <RequestItem handleOpen={handleOpen} />
        <RequestItem handleOpen={handleOpen} />
      </div>
    </Box>
  );
}

export default Account;

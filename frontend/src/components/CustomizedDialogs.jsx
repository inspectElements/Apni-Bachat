import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import Stepper from "@mui/material/Stepper";
import { Box, LinearProgress, Step, StepLabel } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  // const [open, setOpen] = React.useState(props.open);

  const steps = props.steps;

  const handleClose = (_event, reason) => {
    if (reason && reason === "backdropClick") return;
    props.setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography sx={{ textAlign: "center", mb: 4 }} variant="h4">
            Interacting with blockchain
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent>
          {!props.error ? (
            <>
              <Stepper activeStep={props.stepCount} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {props.stepCount !== steps.length - 1 ? (
                <Box sx={{ my: 4 }}>
                  <LinearProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  success!
                  {/* <SuccessTick /> */}
                </Box>
              )}
            </>
          ) : (
            <Typography color={"red"}>{props.error}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            // disabled={
            //     !(props.stepCount !== steps.length - 1) ||
            //     !(props.error?.length > 0)
            // }
            onClick={handleClose}
            fullWidth
          >
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

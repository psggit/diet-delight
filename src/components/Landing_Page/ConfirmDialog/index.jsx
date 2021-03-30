import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useHistory } from "react-router";

import "./confirm_dialog.css";

const ConfirmDialog = ({ open, setOpen }) => {
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    history.push("/signup");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="confirm_dialog_bg">
        <DialogContent
          style={{
            margin: "3rem",
            backgroundColor: "rgb(119 131 143 / 20%)",
            borderRadius: "20px",
            boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
          }}
        >
          <DialogContentText style={{ color: "white" }}>
            Hello there!
          </DialogContentText>
          <DialogContentText style={{ color: "white" }}>
            You need to create an account to use this feature.
          </DialogContentText>
          <DialogContentText style={{ color: "white" }}>
            Please login or create an account to proceed further.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          style={{
            backgroundColor: "rgb(119 131 143 / 80%)",
            padding: "0",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Button
            onClick={handleClose}
            style={{ color: "white", width: "100%", height: "50px" }}
          >
            NO THANKS
          </Button>
          <Button
            onClick={handleAgree}
            style={{ color: "white", width: "100%", height: "50px" }}
            autoFocus
          >
            OKAY
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;

import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import "../Primary address Dialog/PrimaryaddDialog.css";
import "./SelectionAddressMain.css";

export default function PrimaryaddDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [address, setAddress] = React.useState("");
  const [locality, setLocality] = React.useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleLocalityChange = (e) => {
    setLocality(e.target.value);
  };

  const handleAddAddress = () => {
    const addressData = {
      address: address,
      locality: locality,
    };
    props.makeAddAddress(addressData);
  };
  return (
    <div>
      <Dialog
        open={open}
        //onClose={handleCloseOtp}
        style={{ borderRadius: 40 }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          className="selection_dialog_address_bg"
          id="responsive-dialog-title"
        >
          {/* <div className="row">
            <select name="address" className="selction_bar_dialog" id="address">
              <option value="volvo">Primary</option>
              <option value="saab">Secondary</option>
            </select>
          </div> */}

          <div className="row">
            <input
              className="selction_input_dialog"
              type="text"
              value={props.addressType.split("_")[0]}
              disabled
            />
          </div>

          <div className="row">
            <input
              type="text"
              className="selction_input_dialog"
              id="house"
              onChange={handleAddressChange}
              name="house"
              placeholder="House #, House name, Street name"
            ></input>
          </div>

          <div className="row">
            <input
              type="text"
              className="selction_input_dialog"
              id="area"
              onChange={handleLocalityChange}
              name="area"
              placeholder="Area name"
            ></input>
          </div>

          <div className="btn_container_dialog_address">
            <button
              className="btn add_btn_dialog"
              onClick={handleAddAddress}
              disabled={props.addingAddress}
            >
              ADD
            </button>
          </div>
        </DialogTitle>
      </Dialog>
    </div>
  );
}

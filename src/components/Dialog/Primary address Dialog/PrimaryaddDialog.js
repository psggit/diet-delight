import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogTitle from "@material-ui/core/DialogTitle";

import "./PrimaryaddDialog.css";

import TitleComponents from "./TitleComponent.js";

export default function PrimaryaddDialog(props) {
  console.log("primary", props);
  const [open, setOpen] = React.useState(true);
  const [addressType, setAddressType] = useState(
    props.userData.primary_address_line1
    ? "primary_address"
    : props.userData.secondary_address_line1
    ? "secondary_address"
    : ""
    );

  useEffect(() => {
    setAddressType(
      props.userData.primary_address_line1
      ? "primary_address"
      : props.userData.secondary_address_line1
      ? "secondary_address"
      : ""
      );
  }, [props.userData]);

  const withBackground = {
    background: "#8BC53F",
    color: "#FFF",
  };

  const withoutBackground = {
    background: "#77838f59",
    color: "#fff",
  };

  function selectAddress(id) {
    setAddressType(id);
    props.makeChangeAdderess(id);
  }

  function handleAddAddress(data) {
    props.makeAddAddressBox(data);
  }

  if (props.changeAddressBox === true) {
    return (
      <Dialog
      open={open}
      style={{ borderRadius: 40 }}
      aria-labelledby="responsive-dialog-title"
      >
      <DialogTitle
      className="primary_address_bg"
      id="responsive-dialog-title"
      >

      <div>

      <i className="fa fa-times  close_primary_dialog_icon" aria-hidden="true"></i>

      </div> 


      <TitleComponents titleDialogName="Primary Address" />

      <p
      id="primary_address"
      className="text_area_dialog"
      style={
        addressType === "primary_address"
        ? withBackground
        : withoutBackground
      }
      rows="2"
      cols="25"
            //onClick={() => selectAddress("primary_address")}
            >
            {addressType !== "primary_address" &&
            props.userData.primary_address_line1 && (
              <h6
              className="select_text_dialog"
              onClick={() => selectAddress("primary_address")}
              >
              SELECT
              </h6>
              )}

              {addressType !== "primary_address" &&
              !props.userData.primary_address_line1 && (
              <h6
              className="select_text_dialog"
              onClick={() => handleAddAddress("primary_address")}
              >
              ADD
              </h6>
              )}

              <p>
              {props.userData.primary_address_line1 === null ||
                props.userData.primary_address_line1 === ""
                ? " "
                : props.userData.primary_address_line1}
                </p>
                <p>
                {props.userData.primary_address_line2 === null ||
                  props.userData.primary_address_line2 === ""
                  ? " "
                  : props.userData.primary_address_line2}
                  </p>
                  </p>

                  <TitleComponents titleDialogName="Secondary Address" />

                  <p
                  id="secondary_address"
            //className="text_area_dialog"
            className="text_area_dialog"
            style={
              addressType === "secondary_address"
              ? withBackground
              : withoutBackground
            }
            rows="2"
            cols="25"
            //onClick={() => selectAddress("secondary_address")}
            >
            {addressType !== "secondary_address" &&
            props.userData.secondary_address_line1 && (
              <h6
              className="select_text_dialog"
              onClick={() => selectAddress("secondary_address")}
              >
              SELECT
              </h6>
              )}

              {addressType !== "secondary_address" &&
              !props.userData.secondary_address_line1 && (
              <h6
              className="select_text_dialog"
              onClick={() => handleAddAddress("secondary_address")}
              >
              ADD
              </h6>
              )}
              <p>
              {props.userData.secondary_address_line1 === null ||
                props.userData.secondary_address_line1 === ""
                ? ""
                : props.userData.secondary_address_line1}
                </p>
                <p>
                {props.userData.secondary_address_line2 == null ||
                  props.userData.secondary_address_line2 === ""
                  ? " "
                  : props.userData.secondary_address_line2}
                  </p>
                  </p>

                  <div className="btn_container_dialog_address">
                  <button
                  className="btn done_btn_dialog"
                  onClick={() => props.makeAddressBox(false)}
                  >
                  DONE
                  </button>
                  </div>
                  </DialogTitle>
                  </Dialog>
                  );
          } else {
            return <></>;
          }
        }

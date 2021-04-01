import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";

import axios from "../../../axiosInstance";
import "./Changepwd.css";

function Change_pro(props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successErrorDialog, setSuccessErrorDialog] = useState(false);

  useEffect(() => {
    if (props.ChangePassword) {
      // document.getElementById("oldPassword").style.visibility = "visible";
      // document.getElementById("oldPassword").style.display = "block";
    } else {
      // document.getElementById("oldPassword").style.visibility = "hidden";
      // document.getElementById("oldPassword").style.display = "none";
    }
  }, [props.ChangePassword]);

  const handlePasswordCheck = (e) => {
    var getMessageBox = document.getElementById("successErrorMessage");
    if (e.target.value === newPassword) {
      getMessageBox.innerHTML = "";
      setConfirmPassword(e.target.value);
    } else {
      getMessageBox.innerHTML = "Password doesn't Matched";
    }
  };

  const handlePasswordChange = () => {
    console.log(currentPassword);
    var getMessageBox = document.getElementById("successErrorMessage");
    if (newPassword === confirmPassword) {
      getMessageBox.innerHTML = "";
      axios
        .post(`update-password`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          old_password: currentPassword,
          new_password: newPassword,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("Password Changed Successfully");
            props.closeChangePassword();
          }
        });
    } else {
      getMessageBox.innerHTML = "Password Mismatched";
    }
  };

  const handleNewPassword = () => {
    console.log("new password");
    var getMessageBox = document.getElementById("successErrorMessage");
    if (newPassword === confirmPassword) {
      getMessageBox.innerHTML = "";
      axios
        .post(`reset-password`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          username: props.email,
          firebase_uid: props.firebaseUid,
          new_password: newPassword,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // alert("Password Changed Successfully");
            setSuccessErrorDialog(true);
            setTimeout(() => {
              setSuccessErrorDialog(false);
              props.closeChangePassword();
            }, 2000);
          }
        })
        .catch((err) => {
          setSuccessErrorDialog(true);
          console.log(err);
          document.getElementById("updatedMessage").innerHTML =
            "Something Didn't went as expected";
          setTimeout(() => {
            setSuccessErrorDialog(false);
            props.closeChangePassword();
          }, 2000);
        });
    } else {
      getMessageBox.innerHTML = "Password Mismatched";
    }
  };
  return (
    <div className="trail">
      <Form style={{ backgroundColor: "transparent" }}>
        <div style={{ marginBottom: "15px" }}>
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" enabled />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" />
        </div>
      </Form>
      <Button
        style={{ backgroundColor: "#8BC441", border: "none" }}
        type="submit"
        onClick={(e) => {
          if (props.ChangePassword) {
            handlePasswordChange();
          } else {
            handleNewPassword();
          }
        }}
      >
        Change Password
      </Button>
    </div>
  );
}

export default Change_pro;

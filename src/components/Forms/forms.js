import React, { useEffect, useState } from "react";
import logo_web from "../../assets/logoweb.png";

import "./main.css";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import Mealchoose from "../Mealchoose";
// import Popup from "reactjs-popup";
import Modal from "react-bootstrap/Modal";
// import "reactjs-popup/dist/index.css";

import axios from "../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import BmiMain from "../BMI/BmiMain";
import Bmireport from "../BMI Report/Bmireport";
import ChangePassword from "../Auth/ResetChangePassword/ChangePassword";
import "./main.css";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

function Forms({
  firstname,
  lastname,
  phone,
  email,
  addline1,
  addline2,
  age,
  gender,
  cal,
  bmi,
  sedline1,
  sedline2,
}) {
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = () => {
    axios
      .get(`user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.gender);
        setUser(res.data.gender);
      });
  };

  const [user, setUser] = useState({});
  const [edit_firstname, setFirstName] = useState("");
  const [edit_lastname, setLastName] = useState("");
  const [edit_email, setEmail] = useState("");
  const [edit_pradd, setPrimaryAddress] = useState("");
  const [edit_pradd2, setPrimaryAddressLine2] = useState("");
  const [edit_secadd1, setSecondaryAddress] = useState("");
  const [edit_secadd2, setSecondaryAddressLine2] = useState("");
  const [edit_phone, setPhone] = useState("");
  const [edit_age, setAge] = useState("");
  const [edit_gen, setGender] = useState("");
  const saveUpdate = () => {
    console.log("Save Update");

    axios
      .put(`user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        first_name: edit_firstname === "" ? user.firstName : edit_firstname,
        last_name: edit_lastname === "" ? user.lastName : edit_lastname,
        mobile: edit_phone === "" ? user.mobile : edit_phone,
        primary_address_line1:
          edit_pradd === "" ? user.primary_address_line1 : edit_pradd,
        primary_address_line2:
          edit_pradd2 === "" ? user.primary_address_line2 : edit_pradd2,
        age: edit_age === "" ? user.age : edit_age,
        secondary_address_line1:
          edit_secadd1 === "" ? user.secondary_address_line1 : edit_secadd1,
        secondary_address_line2:
          edit_secadd2 === "" ? user.secondary_address_line2 : edit_secadd2,
      })
      .then((res) => {
        console.log(res);

        setUser(res.data);
        console.log(user);
      });
  };
  return (
    <div>
      <Form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              enabled
              defaultValue={firstname}
              placeholder="First name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              placeholder="Last name"
              defaultValue={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <Form.Group style={{ width: "200px" }}>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Gender"
              defaultValue={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group style={{ width: "200px" }}>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Gender"
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </Form.Group>
        </div>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            defaultValue={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Text className="text-muted">Primary Address</Form.Text>
        <div
          style={{
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
            marginBottom: "10px",
          }}
        >
          <Form.Group controlId="formGridAddress2">
            <Form.Control
              placeholder="Address Line 1"
              defaultValue={addline1}
              onChange={(e) => {
                setPrimaryAddress(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress2">
            <Form.Control
              placeholder="Address Line 2"
              defaultValue={addline2}
              onChange={(e) => {
                setPrimaryAddressLine2(e.target.value);
              }}
            />
          </Form.Group>
        </div>
        <Form.Text className="text-muted">Secondary Address</Form.Text>
        <div
          style={{
            width: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
            marginBottom: "10px",
          }}
        >
          <Form.Group controlId="formGridAddress2">
            <Form.Control
              placeholder="Address Line 1"
              defaultValue={sedline1}
              onChange={(e) => {
                setSecondaryAddress(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress2">
            <Form.Control
              placeholder="Address Line 2"
              defaultValue={sedline2}
              onChange={(e) => {
                setSecondaryAddressLine2(e.target.value);
              }}
            />
          </Form.Group>
        </div>

        {/* <div style={{display:"flex", justifyContent: 'space-between', width:"100%", marginBottom:"10px"}}>
    <Form.Group  controlId="formGridCity">
      <Form.Label>BMI</Form.Label>
      <Form.Control disabled value={bmi} />
    </Form.Group>

  <Form.Group  controlId="formGridCity">
      <Form.Label>Recommended Calories</Form.Label>
      <Form.Control disabled value={cal} />
    </Form.Group>
    </div> */}

        <Button
          style={{ backgroundColor: "#8BC441", border: "none" }}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log(edit_firstname);
            saveUpdate();
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Forms;

import React, { useEffect, useState } from "react";
import logo_web from "../../assets/logoweb.png";
import Mealchoose from "../Mealchoose";
import {
  LeadContainer,
  MainContainer,
  LeftContainer,
  UpperContainer,
  UpperLeftContainer,
  UpperMiddleContainer,
  RightContainer,
  ForeFrontText,
  FormContent,
  Button,
  Input,
  EmailInput,
  TextArea,
  Anchor,
  InsideCircleText,
  RoundCircle,
  UpperRightContainerText,
  BMIButton,
  GrandContainer,
} from "./UserDashboardElements";
import axios from "../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import BmiMain from "../BMI/BmiMain";
import Bmireport from "../BMI Report/Bmireport";
import ChangePassword from "../Auth/ResetChangePassword/ChangePassword";
export default function UserDashboardMain() {
  let history = useHistory();
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [primaryAddress, setPrimaryAddress] = useState("");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toggleBMI, setToggleBMI] = useState(false);
  const [toggleBMIReport, setToggleBMIReport] = useState(false);
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const [editProfile, setEditProfile] = useState(true);
  const [bmiReport, setBMIReport] = useState({});

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
        console.log(res);
        setUser(res.data);
      });
  };

  const handleUpdate = () => {
    console.log("handled update");
    setEditProfile(false);
  };

  const closeBMI = () => {
    console.log("handled update");
    setToggleBMI(false);
  };

  const closeChangePassword = () => {
    console.log("handled update");
    setToggleChangePassword(false);
  };

  const toggleBMIReportVisibility = (
    BmiScore,
    heightInMeter,
    category,
    calorieInTake
  ) => {
    setToggleBMI(false);
    setBMIReport({
      BmiScore: BmiScore,
      heightInMeter: heightInMeter,
      category: category,
      calorieInTake: calorieInTake,
    });
    setToggleBMIReport(true);
  };

  const toggleReport = () => {
    setToggleBMI(false);
    setToggleBMIReport(false);
  };

  const saveUpdate = () => {
    console.log("Save Update");

    axios
      .put(`user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        email: email === "" ? user.email : email,
        password: password === "" ? user.password : password,
        first_name: firstName === "" ? user.firstName : firstName,
        last_name: lastName === "" ? user.lastName : lastName,
        mobile: phone === "" ? user.phone : phone,
        primary_address_line1:
          primaryAddress === "" ? user.primary_address_line1 : primaryAddress,
        primary_address_line2: user.primary_address_line2,
        secondary_address_line1:
          secondaryAddress === ""
            ? user.secondary_address_line1
            : secondaryAddress,
        secondary_address_line2: user.secondary_address_line2,
      })
      .then((res) => {
        console.log(res);

        setUser(res.data);
        setEditProfile(true);
        console.log(user);
        history.push("/");
      });
  };

  return (
    <LeadContainer>
      {toggleBMI && (
        <BmiMain
          closeBMI={closeBMI}
          toggleReportBMI={toggleBMIReportVisibility}
        />
      )}
      {toggleChangePassword && (
        <ChangePassword closeChangePassword={closeChangePassword} />
      )}
      {toggleBMIReport && (
        <Bmireport bmiReport={bmiReport} toggleReport={toggleReport} />
      )}

      {/* <img src={logo_web} className="logo_web"></img> */}

      <Mealchoose name="User Dashboard" />
      <GrandContainer>
        <UpperContainer>
          <UpperLeftContainer>
            <h6>
              <b
                style={{
                  color: "hsl(288, 55%, 35%)",
                  fontFamilt: "Roboto",
                  fontWeight: "700",
                }}
              >
                Recommended
              </b>
            </h6>
            <h2>
              <b
                style={{
                  color: "hsl(288, 55%, 35%)",
                  fontFamilt: "Roboto",
                  fontWeight: "700",
                }}
              >
                {user.recommended_calories} Kcal/day
              </b>
            </h2>
          </UpperLeftContainer>
          <UpperMiddleContainer>
            <RoundCircle>
              <InsideCircleText>
                {parseFloat(user.bmi).toFixed(1)}
              </InsideCircleText>
            </RoundCircle>
            <BMIButton onClick={() => setToggleBMI(true)}>
              RECALCULATE BMI
            </BMIButton>
          </UpperMiddleContainer>
          <UpperRightContainerText
            style={{
              color: "hsl(288, 55%, 35%)",
              fontFamilt: "Roboto",
              fontWeight: "700",
            }}
          >
            Normal Weight
          </UpperRightContainerText>
        </UpperContainer>
        <MainContainer
          style={{
            background: "hsla(0, 0%, 98.4%, 0.3411764705882353)",
            backdropFilter: "blur(4px)",
          }}
        >
          <LeftContainer>
            <FormContent>
              <ForeFrontText>First Name</ForeFrontText>
              <Input
                style={{ background: "white" }}
                defaultValue={user.first_name}
                disabled={editProfile}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFirstName(e.target.value);
                }}
              ></Input>
            </FormContent>

            <FormContent>
              <ForeFrontText>Last Name</ForeFrontText>
              <Input
                style={{ background: "white" }}
                defaultValue={user.last_name}
                disabled={editProfile}
                onChange={(e) => setLastName(e.target.value)}
              ></Input>
            </FormContent>

            <FormContent>
              <ForeFrontText>Email</ForeFrontText>
              <EmailInput
                style={{ background: "white" }}
                defaultValue={user.email}
                disabled={editProfile}
                onChange={(e) => setEmail(e.target.value)}
              ></EmailInput>
            </FormContent>

            <FormContent>
              <ForeFrontText>Age</ForeFrontText>
              <Input
                defaultValue={user.age}
                style={{
                  border: "none",
                  textDecoration: "none",
                  background: "none",
                }}
              ></Input>
            </FormContent>

            <FormContent>
              <ForeFrontText>Gender</ForeFrontText>
              <Input
                defaultValue={user.gender === 0 ? "Male" : "Female"}
                style={{
                  border: "none",
                  textDecoration: "none",
                  background: "none",
                }}
              ></Input>
            </FormContent>

            <FormContent>
              <ForeFrontText>Username</ForeFrontText>
              <Input
                defaultValue={user.email}
                style={{
                  border: "none",
                  textDecoration: "none",
                  background: "none",
                }}
              ></Input>
            </FormContent>

            <FormContent>
              <ForeFrontText>Password</ForeFrontText>
              <Anchor
                onClick={(e) => {
                  e.preventDefault();
                  setToggleChangePassword(true);
                }}
              >
                Change
              </Anchor>
            </FormContent>
          </LeftContainer>
          <RightContainer>
            <FormContent>
              <ForeFrontText>Primary Address Line1</ForeFrontText>
              <TextArea
                style={{ background: "white" }}
                defaultValue={user.primary_address_line1}
                disabled={editProfile}
                onChange={(e) => setPrimaryAddress(e.target.value)}
              />
            </FormContent>

            <FormContent>
              <ForeFrontText>Primary Address Line2</ForeFrontText>
              <TextArea
                style={{ background: "white" }}
                defaultValue={user.primary_address_line2}
                disabled={editProfile}
                onChange={(e) => setPrimaryAddress(e.target.value)}
              />
            </FormContent>

            <FormContent>
              <ForeFrontText>Secondary Address Line1</ForeFrontText>
              <TextArea
                style={{ background: "white" }}
                defaultValue={user.secondary_address_line1}
                disabled={editProfile}
                onChange={(e) => setPrimaryAddress(e.target.value)}
              />
            </FormContent>

            <FormContent>
              <ForeFrontText>Secondary Address Line2</ForeFrontText>
              <TextArea
                style={{ background: "white" }}
                defaultValue={user.secondary_address_line2}
                disabled={editProfile}
                onChange={(e) => setSecondaryAddress(e.target.value)}
              />
            </FormContent>
            <FormContent>
              <ForeFrontText>Phone Number</ForeFrontText>
              {/* <input type="text" id="mobileNo" className="inputField" value="+917874658301" style={{}}></input> */}
              <Input
                style={{ background: "white" }}
                defaultValue={user.mobile}
                disabled={editProfile}
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </FormContent>
            <Link to="/">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                UPDATE PROFILE
              </Button>
            </Link>

            <Button
              onClick={(e) => {
                e.preventDefault();
                saveUpdate();
              }}
            >
              SAVE
            </Button>
          </RightContainer>
        </MainContainer>
      </GrandContainer>
    </LeadContainer>
  );
}

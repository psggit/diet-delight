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
  const [primaryAddressLine2, setPrimaryAddressLine2] = useState("");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [secondaryAddressLine2, setSecondaryAddressLine2] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toggleBMI, setToggleBMI] = useState(false);
  const [toggleBMIReport, setToggleBMIReport] = useState(false);
  const [toggleChangePassword, setToggleChangePassword] = useState(false);
  const [editProfile, setEditProfile] = useState(true);
  const [bmiReport, setBMIReport] = useState({});
  const [userCategory, setCategory] = useState("")
  const [userGender, setUserGender] = useState("");
  


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
        console.log(typeof(res.data.gender))
        let BmiScore = parseFloat(res.data.bmi);  
        if(BmiScore < 18.5){
          setCategory('Under Weight') 
      }else if(BmiScore >= 18.5 && BmiScore <= 24.9){
          setCategory('Normal Weight') 
      }else if(BmiScore >= 25 && BmiScore <= 29.9){
          setCategory('OverWeight')
      }else{
          setCategory('Obesity');
      }

      let genderInNumber = res.data.gender;
      console.log(genderInNumber)
      if(genderInNumber > 0){
        setUserGender("Female")
      }else{
        setUserGender("Male")
      }
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
          first_name: firstName === "" ? user.firstName : firstName,
        last_name: lastName === "" ? user.lastName : lastName,
        mobile: phone === "" ? user.phone : phone,
        primary_address_line1:
          primaryAddress === "" ? user.primary_address_line1 : primaryAddress,
        primary_address_line2: primaryAddressLine2 === "" ? user.primary_address_line2 : primaryAddressLine2,
        secondary_address_line1:
          secondaryAddress === ""
            ? user.secondary_address_line1
            : secondaryAddress,
        secondary_address_line2: secondaryAddressLine2 === ""
        ? user.secondary_address_line2
        : secondaryAddressLine2,
      })
      .then((res) => {
        console.log(res);

        setUser(res.data);
        setEditProfile(true);
        console.log(user);
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
            {userCategory}
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
                defaultValue={userGender}
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
                onChange={(e) => setPrimaryAddressLine2(e.target.value)}
              />
            </FormContent>

            <FormContent>
              <ForeFrontText>Secondary Address Line1</ForeFrontText>
              <TextArea
                style={{ background: "white" }}
                defaultValue={user.secondary_address_line1}
                disabled={editProfile}
                onChange={(e) => setSecondaryAddress(e.target.value)}
              />
            </FormContent>

            <FormContent>
              <ForeFrontText>Secondary Address Line2</ForeFrontText>
              <TextArea
                style={{ background: "white" }}
                defaultValue={user.secondary_address_line2}
                disabled={editProfile}
                onChange={(e) => setSecondaryAddressLine2(e.target.value)}
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

/* global grecaptcha */

import React, { useState, forwardRef, useEffect, useRef } from "react";
import {
  Main,
  Route,
  Container,
  SetBg,
  RouteContainer,
  BackgroundImageContainer,
} from "./SignupElements";

import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { Cookies } from "react-cookie";
import { Slide } from "@material-ui/core";

import "./signup.css"
import axios from "../../../axiosInstance";

import logo from "../../../assets/logo.png";
import { Image, Line, Subheading } from "../../MainComponents";
import { useDispatch } from "react-redux";
import { setNew } from "../../../features/userSlice";
import firebase from "../SignInMethods/firebaseConfig";
import SignUpForm from "./SignUpForm";
import VerifyOTP from "./VerifyOTP";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let cookie = new Cookies();

  const { enqueueSnackbar } = useSnackbar();
  const reCaptcha = useRef("");
  const verificationOTP = useRef("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const [token, setToken] = useState({});

  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    check: "",
    countryCode: "",
    phone: "",
    firebase_uid: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "access_token",
      token.access_token ? token.access_token : ""
    );
    localStorage.setItem(
      "refresh_token",
      token.refresh_token ? token.refresh_token : ""
    );
  }, [token]);

  useEffect(() => {
    if (!verifyingOTP) {
      renderCaptcha();
    }
  }, []);

  const resendOtp = () => {
    grecaptcha.reset();
    const _values = { ...formValues };
    phoneAuth(_values);
  };

  const handleCodeByUser = (confirmationResult, userValues) => {
    setVerifyingOTP(true);
    const captureButtonClick = document.getElementById("verifyOtp");

    captureButtonClick.onclick = (e) => {
      console.log("OTP : ", verificationOTP);
      if (verificationOTP.current.length !== 6) return;

      confirmationResult
        .confirm(verificationOTP.current)
        .then(async (result) => {
          const user = result.user;
          console.log("User : ", user);
          console.log(user.phoneNumber);

          enqueueSnackbar("Otp Verification Completed");
          handleRegistration(userValues, user.phoneNumber, user.uid);

          setTimeout(() => {
            setVerifyingOTP(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar("Invalid Otp Please try Again");
        });
    };
  };

  const phoneAuth = async (values) => {
    setFormValues({ ...formValues, ...values });

    const fullMobileNumber = values.countryCode + values.phone;
    console.log("Full Number : ", fullMobileNumber);

    await firebase
      .auth()
      .signInWithPhoneNumber(fullMobileNumber, reCaptcha.current)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("Phone Auth : ", confirmationResult);
        handleCodeByUser(confirmationResult, values);
      })
      .catch((error) => {
        console.log("Phone Auth Error : ", error);
        grecaptcha.reset();
      });
  };

  const renderCaptcha = () => {
    firebase.auth().languageCode = "en";
    let recaptcha = new firebase.auth.RecaptchaVerifier("sign-up", {
      size: "invisible",
      callback: (response) => {
        // phoneAuth();
        // this.resendOtp();
        console.log("Re Captcha res", response);
      },
    });
    reCaptcha.current = recaptcha;
    console.log("Re Captcha", recaptcha);
    console.log("Phone auth");
  };

  const handleSignUp = (token, user) => {
    console.log("from handle sign up", token, user);
    console.log("called handle signup");
    var fullName = user.displayName;
    var nameArray = fullName.split(" ");
    var fname = nameArray[0];
    var lname = nameArray[1];
    var email = user.email;
    var password = "DietDelight@123ForEnigmaty";
    var firebase_uid = user.uid;
    var phone = null;
    console.log(fname, lname, fullName, nameArray);
    var values = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      firebase_uid: firebase_uid,
      phone: phone,
      check: password,
    };
    handleRegistration(values, phone, firebase_uid);
  };

  const handleRegistration = (values, mobileNumber, firebase_uid) => {
    console.log("called registration");

    if (values.check === values.password) {
      let Name = values.fname + " " + values.lname;
      let firebase_Uid =
        firebase_uid === "" ? values.firebase_uid : firebase_uid;

      axios
        .post("register", {
          name: Name,
          email: values.email,
          password: values.password,
          first_name: values.fname,
          last_name: values.lname,
          mobile: mobileNumber,
          firebase_uid: firebase_Uid,
        })
        .then((res) => {
          console.log(res);
          setToken(res.data);
          cookie.set("access_token", res.data.access_token, {
            path: "/",
            maxAge: res.data.expires_in,
          });
          enqueueSnackbar("Account Created SuccessFully");

          setTimeout(() => {
            dispatch(setNew());
            history.push("/");
          }, 6000);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("Failed To Create Account!! Please try Again.....");
        });
    }
  };

  return (
    <BackgroundImageContainer>
      <Main>
        {verifyingOTP ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "inherit",
              alignItems: "center",
            }}
          >
            <SetBg>
              <VerifyOTP
                setVerifyingOTP={setVerifyingOTP}
                resendOtp={resendOtp}
                verificationOTP={verificationOTP}
              />
            </SetBg>
          </div>
        ) : (
          <>
            <Route to="/">
              <Image src={logo} alt="logo" height="80px" mar="10px 0 0 0" />
            </Route>
            <RouteContainer>
              <Route opacity="0.7" to="/signin">
                <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                  SIGN IN
                </Subheading>
              </Route>
              <Route to="/signup">
                <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                  SIGN UP
                </Subheading>
                <Line back="rgba(137,197,63,1)" top="0" height="3px" />
              </Route>
            </RouteContainer>
            <SetBg>
              <Container>
                <SignUpForm formValues={formValues} handleSignUp={handleSignUp} phoneAuth={phoneAuth} />
              </Container>
            </SetBg>
          </>
        )}
      </Main>
    </BackgroundImageContainer>
  );
};

export default Signup;

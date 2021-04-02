import React, { useRef, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import axios from "../../../axiosInstance";

import {
  Main,
  BackgroundImageContainer,
  SetBg,
  Route,
  RouteContainer,
  Container,
} from "./../Signin/SignInElements";
import MobileNumberForm from "./MobileNumberForm";
import logo from "../../../assets/logo.png";

import { Image, Subheading, Line } from "../../MainComponents";
import firebase from "../SignInMethods/firebaseConfig";
import ResetPassword from "./ResetPassword";
import VerifyOTPForgotPassword from "./VerifyOTPForgotPassword";

const LABELS = {
  form: "FORGOT PASSWORD",
  otp: "VERIFY OTP",
  reset: "RESET PASSWORD",
};

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const reCaptcha = useRef("");
  const verificationOTP = useRef("");
  const history = useHistory();

  const [formValues, setFormValues] = useState({
    countryCode: "",
    phone: "",
  });

  const [formValuesResetPassword, setFormValuesResetPassword] = useState({
    password: "",
    check: "",
  });

  const [userValues, setUserValues] = useState({
    phoneNumber: "",
    firebaseUID: "",
  });

  //   1- form 2-otp 3-reset
  const [stepName, setStepName] = useState("form");

  const resendOtp = () => {
    // grecaptcha.reset();
    if (reCaptcha.current) reCaptcha.current.reset();
    const _values = { ...formValues };
    phoneAuth(_values);
  };

  const handleCodeByUser = (confirmationResult, userValues) => {
    setStepName("otp");
    const captureButtonClick = document.getElementById("sign-up");

    captureButtonClick.onclick = (e) => {
      console.log("OTP : ", verificationOTP);
      if (verificationOTP.current.length !== 6) return;

      confirmationResult
        .confirm(verificationOTP.current)
        .then(async (result) => {
          const user = result.user;
          console.log("User : ", user);
          console.log(user.phoneNumber);
          setUserValues({
            ...userValues,
            phoneNumber: user.phoneNumber,
            firebaseUID: user.uid,
          });

          enqueueSnackbar("Otp Verification Completed");

          setTimeout(() => {
            setStepName("reset");
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
        // grecaptcha.reset();
        if (reCaptcha.current) reCaptcha.current.reset();
      });
  };

  const handleNewPassword = (values) => {
    console.log("new password :: ", values);
    axios
      .post(`reset-password`, {
        username: userValues.phoneNumber,
        firebase_uid: userValues.firebaseUID,
        new_password: values.password,
      })
      .then((res) => {
        console.log("Result : ", res);
        if (res.status === 200) {
          enqueueSnackbar("Password Changed Successfully");
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Something didn't went as expected");
      });
  };

  const renderCaptcha = () => {
    firebase.auth().languageCode = "en";
    let recaptcha = new firebase.auth.RecaptchaVerifier("sign-up", {
      size: "invisible",
      callback: (response) => {
        console.log("Re Captcha res", response);
      },
    });
    reCaptcha.current = recaptcha;
    console.log("Re Captcha", recaptcha);
    console.log("Phone auth");
  };

  useEffect(() => {
    renderCaptcha();
  }, []);

  return (
    <div>
      <BackgroundImageContainer>
        <Main>
          <div>
            <Route to="/">
              <Image src={logo} alt="logo" height="80px" mar="10px 0 0 0" />
            </Route>
            <RouteContainer>
              <Route>
                <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                  {LABELS[stepName]}
                </Subheading>
                <Line back="rgba(137,197,63,1)" top="0" height="3px" />
              </Route>
            </RouteContainer>
            <SetBg>
              <Container>
                {stepName === "form" && (
                  <MobileNumberForm
                    formValues={formValues}
                    phoneAuth={phoneAuth}
                  />
                )}
                {stepName === "otp" && (
                  <VerifyOTPForgotPassword
                    resendOtp={resendOtp}
                    verificationOTP={verificationOTP}
                  />
                )}
                {stepName === "reset" && (
                  <ResetPassword
                    formValues={formValuesResetPassword}
                    handleNewPassword={handleNewPassword}
                  />
                )}
              </Container>
            </SetBg>
          </div>
        </Main>
      </BackgroundImageContainer>
    </div>
  );
};

export default ForgotPassword;

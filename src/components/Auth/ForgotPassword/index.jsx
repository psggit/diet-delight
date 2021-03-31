import React, { useRef, useState, useEffect } from "react";

import { useSnackbar } from "notistack";

import axios from "../../../axiosInstance";

import {
  Main,
  BackgroundImageContainer,
  SetBg,
} from "./../Signin/SignInElements";
import MobileNumberForm from "./MobileNumberForm";
// import logo from "../../../assets/logo.png";

import { Image } from "../../MainComponents";
import firebase from "../SignInMethods/firebaseConfig";
import VerifyOTP from "./../Signup/VerifyOTP";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const reCaptcha = useRef("");
  const verificationOTP = useRef("");

  const [formValues, setFormValues] = useState({
    countryCode: "",
    phone: "",
  });

  const [formValuesResetPassword, setFormValuesResetPassword] = useState({
    password: "",
    check: "",
  });

  //   1- form 2-otp 3-reset
  const [stepName, setStepName] = useState("form");

  const resendOtp = () => {
    // grecaptcha.reset();
    // if (reCaptcha.current) reCaptcha.current.reset();
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
        // if (reCaptcha.current) reCaptcha.current.reset();
      });
  };

  const handleNewPassword = (values) => {
    console.log("new password :: ", values);
    // axios
    //   .post(`reset-password`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    //     username: props.email,
    //     firebase_uid: firebaseUid,
    //     new_password: formValuesResetPassword.password,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       enqueueSnackbar("Password Changed Successfully");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     enqueueSnackbar("Something didn't went as expected");
    //   });
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

  useEffect(() => {
    renderCaptcha();
  }, []);

  return (
    <div>
      <BackgroundImageContainer>
        <Main>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "inherit",
              alignItems: "center",
            }}
          >
            <SetBg>
              {stepName === "form" && (
                <MobileNumberForm
                  formValues={formValues}
                  phoneAuth={phoneAuth}
                />
              )}
              {stepName === "otp" && (
                <VerifyOTP
                  resendOtp={resendOtp}
                  verificationOTP={verificationOTP}
                />
              )}
              {stepName === "reset" && (
                <ResetPassword
                  formValues={formValuesResetPassword}
                  phoneAuth={handleNewPassword}
                />
              )}
            </SetBg>
          </div>
        </Main>
      </BackgroundImageContainer>
    </div>
  );
};

export default ForgotPassword;

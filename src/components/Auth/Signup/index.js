/* global grecaptcha */

import React, { useState, forwardRef, useEffect, useMemo, useRef } from "react";
import {
  Main,
  Route,
  Container,
  Section,
  Phone,
  Facebook,
  Google,
  IconBox,
  CustomButton,
  SetBg,
  RouteContainer,
  ErrorPara,
  BackgroundImageContainer,
} from "./SignupElements";

import { useHistory } from "react-router-dom";

import axios from "../../../axiosInstance";
import { Cookies } from "react-cookie";

import signInWithGoogle from "../SignInMethods/GoogleSignIn";
import signInWithFaceBook from "../SignInMethods/FaceBookSignIn";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from "@material-ui/core";

import { Formik } from "formik";

import * as Yup from "yup";

import logo from "../../../assets/logo.png";
import { Image, Para, Line, Subheading } from "../../MainComponents";
import { useDispatch } from "react-redux";
import { setNew } from "../../../features/userSlice";
import countryList from "react-select-country-list";
import OtpDialog from "../OtpDialog";
import firebase from "../SignInMethods/firebaseConfig";
import logo_img from "../../../assets/logoweb.png";

import SelectCountryCode from "./SelectCountryCode";
import InputTextBox from "./InputTextBox";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let cookie = new Cookies();

  const [otpDialog, setOtpDialog] = useState(false);
  // const options = useMemo(() => countryList().getValues(), []);
  // const [disabled, setDisabled] = useState(false);

  const [open, setOpen] = useState(false);

  // const code = useRef("");
  // let phoneNumber = useRef("");
  // const [countryCode, setCountryCode] = useState("");

  const reCaptcha = useRef("");
  const [otp, setOtp] = useState("");

  const [token, setToken] = useState({});
  const [successErrorMessage, setSuccessErrorMessage] = useState(
    "Account Created SuccessFully"
  );
  // const [autofocus, setAutoFocus] = useState(true);

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [num5, setNum5] = useState("");
  const [num6, setNum6] = useState("");

  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    check: "",
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

  const handleCloseOtp = () => {
    // props.handleOtpDialog();
  };

  const ValidateSchema = Yup.object().shape({
    fname: Yup.string().required().label("First Name"),
    lname: Yup.string().required().label("Last Name"),
    phone: Yup.number().required().label("Phone"),
    countryCode: Yup.string().required().label("Country Code"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
  });

  const resendOtp = () => {
    grecaptcha.reset();
    const values = { ...formValues };
    phoneAuth(values);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setNew());
    history.push("/");
  };

  useEffect(() => {
    renderCaptcha();
  }, []);

  const handleCodeByUser = (confirmationResult, userValues) => {
    setOtpDialog(true);
    var captureButtonClick = document.getElementById("verifyOtp");
    captureButtonClick.onclick = (e) => {
      console.log(e);
      var otpEnteredList = document.getElementsByClassName(
        "input_dialog_signup"
      );
      var otpEntered = "";
      for (var i = 0; i < otpEnteredList.length; i++) {
        console.log(otpEnteredList[i].value);
        otpEntered = otpEntered + otpEnteredList[i].value.toString();
      }
      console.log(otpEntered);
      confirmationResult
        .confirm(otpEntered)
        .then(async (result) => {
          // User signed in successfully.
          const user = result.user;
          var errorMessage = document.getElementById(
            "successErrorMessageForWrongOtp"
          );
          errorMessage.innerHTML = "";
          console.log(user);
          console.log(user.phoneNumber);
          handleRegistration(userValues, user.phoneNumber, user.uid);
          setSuccessErrorMessage("Otp Verification Completed");
          setOpen(true);
          setTimeout(() => {
            setOtpDialog(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          var errorMessage = document.getElementById(
            "successErrorMessageForWrongOtp"
          );
          errorMessage.innerHTML = "Invalid Otp Please try Again";
        });
    };
    captureButtonClick.onKeyPress = (e) => {
      if (e.code === "Enter") {
        var otpEnteredList = document.getElementsByClassName(
          "input_dialog_signup"
        );
        var otpEntered = "";
        for (var i = 0; i < otpEnteredList.length; i++) {
          console.log(otpEnteredList[i].value);
          otpEntered = otpEntered + otpEnteredList[i].value.toString();
        }
        console.log(otpEntered);
        confirmationResult
          .confirm(otpEntered)
          .then(async (result) => {
            // User signed in successfully.
            const user = result.user;
            var errorMessage = document.getElementById(
              "successErrorMessageForWrongOtp"
            );
            errorMessage.innerHTML = "";
            console.log(user);
            console.log(user.phoneNumber);
            handleRegistration(userValues, user.phoneNumber, user.uid);
            setSuccessErrorMessage("Otp Verification Completed");
            setOpen(true);
            setTimeout(() => {
              setOtpDialog(false);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
            var errorMessage = document.getElementById(
              "successErrorMessageForWrongOtp"
            );
            errorMessage.innerHTML = "Invalid Otp Please try Again";
          });
      }
    };

    // return otpEntered;
  };

  const phoneAuth = async (values) => {
    // let number = countryCode + phoneNumber.current;
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

  const storeOtp = (e) => {
    console.log("Hello");
    if (e.target.value.length <= 6) {
      setOtp(e.target.value);
    }
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

  const validateIfNumeric = (e, relatedTo) => {
    const data = e.target.value;
    console.log(data, relatedTo);
    var numeric = "^[0-9]*$";
    if (data.match(numeric)) {
      if (relatedTo === "num1") {
        console.log("hello num1");
        setNum1(data);
      } else if (relatedTo === "num2") {
        setNum2(data);
      } else if (relatedTo === "num3") {
        setNum3(data);
      } else if (relatedTo === "num4") {
        setNum4(data);
      } else if (relatedTo === "num5") {
        setNum5(data);
      } else {
        setNum6(data);
      }
    }
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
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setSuccessErrorMessage(
            "Failed To Create Account!! Please try Again....."
          );
          setOpen(true);
        });
    }
  };

  return (
    <>
      <div style={{ zIndex: 5 }}>
        <Dialog
          open={otpDialog}
          onClose={handleCloseOtp}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle className="otp_bg" id="responsive-dialog-title">
            <div className="row dialog_signup_new">
              <div className="col-2">
                <i
                  className="fa fa-long-arrow-left left_icon_dialog"
                  aria-hidden="true"
                  onClick={() => setOtpDialog(false)}
                ></i>
              </div>

              <div className="col-10">
                <div className="img_container_dialog">
                  <img
                    src={logo_img}
                    className="logo_dialog_signup"
                    alt="logo"
                  ></img>
                </div>
              </div>
            </div>

            <h6 className="your_phone_text">VERIFY YOUR PHONE NUMBER</h6>

            <h6 className="received_text">
              You would have received an otp on your phone...
            </h6>

            <h6 className="enter_otp_text">Enter OTP</h6>

            <div className="row justify-content-center">
              <input
                type="text"
                required
                value={num1}
                minlength="1"
                maxlength="1"
                className="input_dialog_signup"
                id="num1"
                onInput={(e) => validateIfNumeric(e, "num1")}
                autofocus
              ></input>
              <input
                type="text"
                required
                value={num2}
                minlength="1"
                maxlength="1"
                className="input_dialog_signup"
                id="num2"
                onInput={(e) => validateIfNumeric(e, "num2")}
              ></input>
              <input
                type="text"
                required
                value={num3}
                minlength="1"
                maxlength="1"
                className="input_dialog_signup"
                id="num3"
                onInput={(e) => validateIfNumeric(e, "num3")}
              ></input>
              <input
                type="text"
                required
                value={num4}
                minlength="1"
                maxlength="1"
                className="input_dialog_signup"
                id="num4"
                onInput={(e) => validateIfNumeric(e, "num4")}
              ></input>
              <input
                type="text"
                required
                value={num5}
                minlength="1"
                maxlength="1"
                className="input_dialog_signup"
                id="num5"
                onInput={(e) => validateIfNumeric(e, "num5")}
              ></input>
              <input
                type="text"
                required
                value={num6}
                minlength="1"
                maxlength="1"
                className="input_dialog_signup"
                id="num6"
                onInput={(e) => validateIfNumeric(e, "num6")}
              ></input>
            </div>

            <span
              id="successErrorMessageForWrongOtp"
              style={{
                color: "red",
                size: "0.8rem",
                weight: "700",
                align: "none",
                top: "0",
              }}
            ></span>

            <h6 className="resend_otp_text" onClick={() => resendOtp()}>
              Resend OTP
            </h6>

            <button className="btn verify_btn_dialog" id="verifyOtp">
              VERIFY
            </button>
          </DialogTitle>
        </Dialog>
      </div>

      <BackgroundImageContainer>
        <Main>
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
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {"Diet Delight!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {successErrorMessage}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>

              <div
                style={{
                  display: "flex",
                  maxWidth: "300px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Formik
                  initialValues={{
                    countryCode: "",
                    phone: "",
                    fname: "",
                    lname: "",
                    email: "",
                    password: "",
                    check: "",
                    firebase_uid: "",
                  }}
                  validationSchema={ValidateSchema}
                  onSubmit={(values) => {
                    console.log("Values :", values);
                    phoneAuth(values);
                  }}
                >
                  {({ handleChange, handleSubmit, errors, touched }) => (
                    <>
                      <Para
                        color="rgba(137,197,63,1)"
                        size="0.8rem"
                        weight="700"
                        align="none"
                      >
                        PHONE NUMBER
                      </Para>
                      <Section width="auto">
                        <SelectCountryCode
                          handleOnChange={handleChange("countryCode")}
                        />
                        <Phone
                          type="number"
                          placeholder="Enter Phone Number"
                          onChange={handleChange("phone")}
                          onKeyPress={(e) => {
                            if (e.code === "Enter") {
                              handleSubmit();
                            }
                          }}
                        />
                      </Section>
                      {errors.countryCode && touched.countryCode ? (
                        <ErrorPara>{errors.countryCode}</ErrorPara>
                      ) : (
                        errors.phone &&
                        touched.phone && <ErrorPara>{errors.phone}</ErrorPara>
                      )}

                      <InputTextBox
                        label="FIRST NAME"
                        placeholder="Enter First Name"
                        error={errors.fname}
                        isTouched={touched.fname}
                        handleOnChange={handleChange("fname")}
                        handleOnKeyPress={(e) => {
                          if (e.code === "Enter") {
                            handleSubmit();
                          }
                        }}
                      />
                      <InputTextBox
                        label="LAST NAME"
                        placeholder="Enter Last Name"
                        error={errors.lname}
                        isTouched={touched.lname}
                        handleOnChange={handleChange("lname")}
                        handleOnKeyPress={(e) => {
                          if (e.code === "Enter") {
                            handleSubmit();
                          }
                        }}
                      />
                      <InputTextBox
                        label="EMAIL ADDRESS"
                        placeholder="Enter Email"
                        error={errors.email}
                        inputType="email"
                        isTouched={touched.email}
                        handleOnChange={handleChange("email")}
                        handleOnKeyPress={(e) => {
                          if (e.code === "Enter") {
                            handleSubmit();
                          }
                        }}
                      />
                      <InputTextBox
                        label="PASSWORD"
                        placeholder="Enter Password"
                        error={errors.password}
                        inputType="password"
                        isTouched={touched.password}
                        handleOnChange={handleChange("password")}
                        handleOnKeyPress={(e) => {
                          if (e.code === "Enter") {
                            handleSubmit();
                          }
                        }}
                      />
                      <InputTextBox
                        label="CONFIRM PASSWORD"
                        placeholder="Confirm Password"
                        // error={errors.password}
                        // isTouched={touched.password}
                        inputType="password"
                        handleOnChange={handleChange("check")}
                        handleOnKeyPress={(e) => {
                          if (e.code === "Enter") {
                            handleSubmit();
                          }
                        }}
                      />

                      <Section width="auto">
                        <Line back="rgba(137,197,63,1)" height="1px" />
                        <Para
                          width="30px"
                          color="rgba(137,197,63,1)"
                          size="0.8rem"
                          weight="700"
                        >
                          OR
                        </Para>
                        <Line back="rgba(137,197,63,1)" height="1px" />
                      </Section>
                      <Section>
                        <IconBox
                          back="darkblue"
                          onClick={() => signInWithFaceBook(handleSignUp)}
                        >
                          <Facebook />
                        </IconBox>
                        <IconBox
                          back="red"
                          onClick={() => signInWithGoogle(handleSignUp)}
                        >
                          <Google />
                        </IconBox>
                      </Section>
                      <CustomButton
                        id="sign-up"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        SIGN UP
                      </CustomButton>
                    </>
                  )}
                </Formik>
              </div>
            </Container>
          </SetBg>
        </Main>
      </BackgroundImageContainer>
    </>
  );
};

export default Signup;

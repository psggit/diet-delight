/* global grecaptcha */

import React, { useEffect, useState, useRef } from "react";
import { Image, Para, Line, Subheading } from "../../MainComponents";
import {
  Main,
  Container,
  Route,
  Button,
  SetBg,
  RouteContainer,
  BackgroundImageContainer,
} from "./SignInElements";

import dotenv from "dotenv";

import axios from "../../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";

import logo from "../../../assets/logo.png";
import ClientOAuth2 from "client-oauth2";
import { SetTrue, login, selectUser } from "../../../features/userSlice";

import firebase from "../SignInMethods/firebaseConfig";

import SignInForm from "./SignInForm";

import "../Signin/Signin.css";

dotenv.config();

const Auth = new ClientOAuth2({
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  accessTokenUri: process.env.REACT_APP_ACCESS_TOKEN_URL,
  authorizationUri: process.env.REACT_APP_AUTHORIZATION_URL,
  redirectUri: "http://localhost:3000/",
});

const Signin = () => {
  const cookie = new Cookies();
  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  let getaccess = cookie.get("access_token");
  let getrefresh = cookie.get("refresh_token");

  const [err, setErr] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState({});

  const reCaptcha = useRef("");

  useEffect(() => {
    localStorage.setItem(
      "access_token",
      token.access_token ? token.access_token : getaccess
    );
    localStorage.setItem(
      "refresh_token",
      token.refresh_token ? token.refresh_token : getrefresh
    );
  }, [token, getaccess, getrefresh]);

  useEffect(() => {
    renderCaptcha();
  }, []);

  const handleForgotPassword = () => {
    // setMobileDialog(true);
    history.push("/forgotpassword");
  };

  const renderCaptcha = () => {
    firebase.auth().languageCode = "en";
    let recaptcha = new firebase.auth.RecaptchaVerifier("sign-in-btn", {
      size: "invisible",
      callback: (response) => {
        this.phoneAuth();
        this.resendOtp();
        console.log(response);
      },
    });
    console.log(recaptcha);
    reCaptcha.current = recaptcha;

    console.log("Phone auth");
  };

  const handleSignIn = (token, user) => {
    console.log("handleSignIn : ", token, user);
    console.log(user.email);
    setEmail(user.email);
    setPassword("DietDelight@123ForEnigmaty");

    handleLogin({
      email_phone: user.email,
      password: "DietDelight@123ForEnigmaty",
    });
  };

  const handleLogin = (values) => {
    console.log("E : ", values);
    setEmail(values.email_phone);
    setPassword(values.password);
    const { email_phone, password: _password } = values;

    Auth.owner
      .getToken(email_phone, _password)
      .then((res) => {
        console.log("Result : ", res.data);
        setToken(res.data);
        setErr(false);
        cookie.set("access_token", res.data.access_token, {
          path: "/",
          maxAge: res.data.expires_in,
        });
        cookie.set("refresh_token", res.data.refresh_token, {
          path: "/",
          maxAge: res.data.expires_in,
        });
        if (email_phone === process.env.REACT_APP_ADMIN) {
          dispatch(SetTrue());
          localStorage.setItem("isAdmin", true);
          history.push("/admin");
        } else {
          axios
            .get("user", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              dispatch(
                login({
                  id: res.data.id,
                  name: res.data.name,
                  email: res.data.email,
                  mobile: res.data.mobile,
                  first_name: res.data.first_name,
                  last_name: res.data.last_name,
                  roles: res.data.roles["0"],
                })
              );
              if (res.data.roles["0"].name === "Consultant") {
                history.push("/consultant");
              } else if (res.data.roles["0"].name === "Kitchen") {
                history.push("/kitchen");
              } else if (res.data.roles["0"].name === "Accountant") {
                history.push("/Accountant");
              } else {
                history.push("/");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  };

  return (
    <>
      <BackgroundImageContainer>
        <Main>
          <Route to="/">
            <Image src={logo} alt="logo" height="80px" mar="10px 0 0 0" />
          </Route>
          {user?.id ? (
            <>
              <Para color="red" size="2rem" weight="700">
                Already Logged IN
              </Para>
              <Button
                onClick={() => {
                  history.push("/");
                }}
              >
                GO Back
              </Button>
            </>
          ) : (
            <>
              <RouteContainer>
                <Route to="/signin">
                  <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                    SIGN IN
                  </Subheading>
                  <Line back="rgba(137,197,63,1)" top="0" height="3px" />
                </Route>
                <Route opacity="0.7" to="/signup">
                  <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                    SIGN UP
                  </Subheading>
                </Route>
              </RouteContainer>
              <SetBg>
                <Container>
                  <SignInForm
                    handleSignUp={handleSignIn}
                    handleForgotPassword={handleForgotPassword}
                    handleLogin={handleLogin}
                    err={err}
                  />
                </Container>
              </SetBg>
            </>
          )}
        </Main>
      </BackgroundImageContainer>
    </>
  );
};

export default Signin;

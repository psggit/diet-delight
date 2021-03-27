import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Section, Facebook, Google, IconBox } from "./../Signup/SignupElements";
import { Button } from "./SignInElements";

import { Para, Line } from "../../MainComponents";

import signInWithGoogle from "../SignInMethods/GoogleSignIn";
import signInWithFaceBook from "../SignInMethods/FaceBookSignIn";
import InputTextBox from "./../Signup/InputTextBox";

const SignInForm = ({ handleLogin, handleSignUp, handleForgotPassword, err }) => {
  const ValidateSchema = Yup.object().shape({
    email_phone: Yup.string().required().label("Email/Phone"),
    password: Yup.string().required().label("Password"),
  });

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "340px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Formik
        initialValues={{
          email_phone: "",
          password: "",
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values) => {
          console.log("Values :", values);
          handleLogin(values);
        }}
      >
        {({ handleChange, handleSubmit, errors, touched }) => (
          <>
            <InputTextBox
              label="EMAIL / PHONE"
              error={errors.email_phone}
              isTouched={touched.email_phone}
              handleOnChange={handleChange("email_phone")}
              handleOnKeyPress={(e) => {
                if (e.code === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <InputTextBox
              label="ENTER PASSWORD"
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

            <Para
              color="rgba(137,197,63,1)"
              size="0.9rem"
              weight="700"
              align="end"
              cursor="pointer"
              onClick={handleForgotPassword}
            >
              Forgot password ?
            </Para>

            {err && (
              <Para color="purple" size="0.8rem" weight="700">
                Invalid Credentials, Please check again !
              </Para>
            )}

            <Button id="sign-in-btn" type="submit" onClick={handleSubmit}>
              SIGN IN
            </Button>

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
          </>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;

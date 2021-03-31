import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  Section,
  Phone,
  Facebook,
  Google,
  IconBox,
  CustomButton,
  ErrorPara,
} from "./SignupElements";
import { Para, Line } from "../../MainComponents";

import signInWithGoogle from "../SignInMethods/GoogleSignIn";
import signInWithFaceBook from "../SignInMethods/FaceBookSignIn";
import SelectCountryCode from "./SelectCountryCode";
import InputTextBox from "./InputTextBox";

const SignUpForm = ({ formValues, phoneAuth, handleSignUp }) => {
  const ValidateSchema = Yup.object().shape({
    fname: Yup.string().required().label("First Name"),
    lname: Yup.string().required().label("Last Name"),
    phone: Yup.number().required().label("Phone"),
    countryCode: Yup.string().required().label("Country Code"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
    check: Yup.string()
      .required("Confirm Password is a required field")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
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
          ...formValues,
          // fname: "",
          // lname: "",
          // email: "",
          // password: "",
          // check: "",
          // countryCode: "",
          // phone: "",
          // firebase_uid: "",
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values) => {
          console.log("Values :", values);
          phoneAuth(values);
        }}
      >
        {({ handleChange, handleSubmit, errors, touched, values }) => (
          <>
            <Para
              color="rgba(137,197,63,1)"
              size="0.8rem"
              weight="700"
              align="none"
            >
              PHONE NUMBER
            </Para>
            <div>
              <SelectCountryCode inputValue={values.countryCode} handleOnChange={handleChange("countryCode")} />
              <Phone
                type="number"
                value={values.phone}
                onChange={handleChange("phone")}
                onKeyPress={(e) => {
                  if (e.code === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            {errors.countryCode && touched.countryCode ? (
              <ErrorPara>{errors.countryCode}</ErrorPara>
            ) : (
              errors.phone &&
              touched.phone && <ErrorPara>{errors.phone}</ErrorPara>
            )}

            <InputTextBox
              label="FIRST NAME"
              error={errors.fname}
              isTouched={touched.fname}
              inputValue={values.fname}
              handleOnChange={handleChange("fname")}
              handleOnKeyPress={(e) => {
                if (e.code === "Enter") {
                  handleSubmit();
                }
              }}
              />
            <InputTextBox
              label="LAST NAME"
              error={errors.lname}
              isTouched={touched.lname}
              inputValue={values.lname}
              handleOnChange={handleChange("lname")}
              handleOnKeyPress={(e) => {
                if (e.code === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <InputTextBox
              label="EMAIL ADDRESS"
              error={errors.email}
              inputType="email"
              isTouched={touched.email}
              inputValue={values.email}
              handleOnChange={handleChange("email")}
              handleOnKeyPress={(e) => {
                if (e.code === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <InputTextBox
              label="PASSWORD"
              error={errors.password}
              inputType="password"
              isTouched={touched.password}
              inputValue={values.password}
              handleOnChange={handleChange("password")}
              handleOnKeyPress={(e) => {
                if (e.code === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <InputTextBox
              label="CONFIRM PASSWORD"
              error={errors.check}
              isTouched={touched.check}
              inputType="password"
              inputValue={values.check}
              handleOnChange={handleChange("check")}
              handleOnKeyPress={(e) => {
                if (e.code === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <CustomButton
              style={{ marginTop: "1.5rem" }}
              id="sign-up"
              type="submit"
              onClick={handleSubmit}
            >
              SIGN UP
            </CustomButton>

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

export default SignUpForm;

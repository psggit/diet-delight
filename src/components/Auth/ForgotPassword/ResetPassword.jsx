import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Para } from "../../MainComponents";
import logo_img from "../../../assets/logoweb.png";
import { CustomButton } from "./../Signup/SignupElements";
import InputTextBox from "./../Signup/InputTextBox";

const ResetPassword = ({ formValues, handleNewPassword }) => {
  const ValidateSchema = Yup.object().shape({
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
        height: "350px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div className="row dialog_signup_new">
        <div className="col-10">
          <div className="img_container_dialog">
            <img src={logo_img} className="logo_dialog_signup" alt="logo"></img>
          </div>
        </div>
      </div>
      <div>
        <Para
          color="rgba(137,197,63,1)"
          size="1.5rem"
          weight="700"
          align="center"
        >
          RESET PASSWORD
        </Para>
      </div>
      <Formik
        initialValues={{
          ...formValues,
        }}
        validationSchema={ValidateSchema}
        onSubmit={(values) => {
          console.log("Values :", values);
          handleNewPassword(values);
        }}
      >
        {({ handleChange, handleSubmit, errors, touched, values }) => (
          <>
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
              CHANGE PASSWORD
            </CustomButton>
          </>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;

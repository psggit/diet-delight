import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import logo_img from "../../../assets/logoweb.png";
import { Phone, CustomButton, ErrorPara } from "./../Signup/SignupElements";
import { Para } from "../../MainComponents";
import SelectCountryCode from "../Signup/SelectCountryCode";

const MobileNumberForm = ({ formValues, phoneAuth }) => {
  const ValidateSchema = Yup.object().shape({
    phone: Yup.number().required().label("Phone"),
    countryCode: Yup.string().required().label("Country Code"),
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
          FORGOT PASSWORD
        </Para>
      </div>
      <Formik
        initialValues={{
          ...formValues,
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
              <SelectCountryCode
                inputValue={values.countryCode}
                handleOnChange={handleChange("countryCode")}
              />
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

            <CustomButton
              style={{ marginTop: "1.5rem" }}
              id="sign-up"
              type="submit"
              onClick={handleSubmit}
            >
              SEND OTP
            </CustomButton>
          </>
        )}
      </Formik>
    </div>
  );
};

export default MobileNumberForm;

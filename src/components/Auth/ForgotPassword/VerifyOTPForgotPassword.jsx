import React from "react";

import OTPInput from "../OTPInput";
import { ResendOTPBtn, VerifyOTPBtn } from "./../Signup/SignupElements";

const VerifyOTPForgotPassword = ({ verificationOTP, resendOtp }) => {
  return (
    <div style={{ margin: "auto" }}>
      <div style={{ padding: "1rem" }}>

        <h6 className="your_phone_text">VERIFY YOUR PHONE NUMBER</h6>

        <h6 className="received_text">
          You would have received an otp on your phone...
        </h6>

        <h6 className="enter_otp_text">Enter OTP</h6>

        <OTPInput
          autoFocus
          isNumberInput
          length={6}
          className="row justify-content-center"
          onChangeOTP={(otp) => (verificationOTP.current = otp)}
        />

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

        <div style={{ textAlign: "end" }}>
          <ResendOTPBtn onClick={() => resendOtp()}>Resend OTP</ResendOTPBtn>
        </div>

        <VerifyOTPBtn className="btn" id="sign-up">
          VERIFY
        </VerifyOTPBtn>
      </div>
    </div>
  );
};

export default VerifyOTPForgotPassword;

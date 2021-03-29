import React from "react";

import logo_img from "../../../assets/logoweb.png";
import OTPInput from "../OTPInput";
import { ResendOTPBtn, VerifyOTPBtn } from "./SignupElements";

const VerifyOTP = ({ setVerifyingOTP, verificationOTP, resendOtp }) => {
  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <div style={{ padding: "1rem" }}>
        <div className="row dialog_signup_new">
          <div className="col-2">
            <i
              className="fa fa-long-arrow-left back_icon"
              aria-hidden="true"
              onClick={() => setVerifyingOTP(false)}
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

        <VerifyOTPBtn className="btn" id="verifyOtp">
          VERIFY
        </VerifyOTPBtn>
      </div>
    </div>
  );
};

export default VerifyOTP;

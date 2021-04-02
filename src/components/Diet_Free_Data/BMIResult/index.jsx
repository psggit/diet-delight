import React from "react";
import "./Bmireport.css";

const BMIResult = ({ bmiReport }) => {
  return (
    <>
      <h6
        style={{
          fontSize: "26px",
          color: "#303960",
          fontFamily: "Roboto Condensed bold",
          letterSpacing: "1px",
          textAlign: "center",
        }}
      >
        Your BMI Report
      </h6>
      <div className="row bmi_report_row">
        <div className="col-md-4">
          <h6 className="recommm_text">Recommended</h6>
          <h6 className="day_text_bmireport">
            {bmiReport.calorieInTake} Kcal/day
          </h6>
        </div>

        <div className="col-md-4 number_text_container">
          <div
            className="outerer"
            style={{ borderColor: "#ac83f7", backgroundColor: "#6f42c1" }}
          >
            <h6 className="ten_number" style={{ color: "white" }}>
              {bmiReport.BMIScore}
            </h6>
          </div>
        </div>

        <div className="col-md-4">
          <h6 className="normal_text">{bmiReport.category}</h6>
        </div>
      </div>

      <div className="row text-center justify-content-center">
        <div className="col-md-8">
          <h6 className="please_bmi_report">
            Please consult a medical practitioner if you
          </h6>
          <ul
            style={{
              color: "#303960",
              fontFamily: "Roboto",
              fontSize: "14px",
              opacity: "0.8",
              listStyle: "disc",
              textAlign: "left",
              marginLeft: "3rem",
            }}
          >
            <li style={{ listStyle: "disc" }}>
              Have a pre-existing medical condition
            </li>
            <li style={{ listStyle: "disc" }}>
              Are less than 18 or more than 60 years of age
            </li>
            <li style={{ listStyle: "disc" }}>
              Are trying to gain weight, are an athlete or a body-builder
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BMIResult;

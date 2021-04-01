import React from "react";

import BmiQueandTextfield from "./BmiQueandTextfield";
// import "./BMiMain.css";

const BMICalculator = ({ BMIData, setBMIData }) => {
  const validateOnlyNumeric = (data, relatedTo) => {
    console.log(data, relatedTo);
    var numeric = "^[0-9]*$";
    if (data.match(numeric)) {
      setBMIData({ ...BMIData, [relatedTo]: data });
    }
  };

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
        Let's calculate your BMI
      </h6>

      <div className="row row_bmi_bmi">
        <div className="col-md-6 col-sm-12 col_container">
          <h6 className="ques_title_bmi">What is your gender?</h6>

          <div className="row icon_container_main_bmi">
            <div
              className="icon_container_bmi"
              id="maleContainer"
              onClick={() => {
                var selectMaleContainer = document.getElementById(
                  "maleContainer"
                );
                var selectMale = document.getElementById("male");
                selectMale.style.color = "#fff";
                selectMaleContainer.style.background = "#8BC441";
                var selectFemaleContainer = document.getElementById(
                  "femaleContainer"
                );
                var selectFemale = document.getElementById("female");
                selectFemale.style.color = "#000";
                selectFemaleContainer.style.background = "#fff";
                setBMIData({ ...BMIData, gender: "male" });
                console.log("male");
              }}
            >
              <i
                className="fa fa-mars icon_bmi"
                id="male"
                aria-hidden="true"
              ></i>
              <h6 className="male_text_btn_bmi">Male</h6>
            </div>

            <div
              className="icon_container_bmi"
              id="femaleContainer"
              onClick={() => {
                var selectFemaleContainer = document.getElementById(
                  "femaleContainer"
                );
                var selectFemale = document.getElementById("female");
                selectFemale.style.color = "#fff";
                selectFemaleContainer.style.background = "#8BC441";
                var selectMaleContainer = document.getElementById(
                  "maleContainer"
                );
                var selectMale = document.getElementById("male");
                selectMale.style.color = "#000";
                selectMaleContainer.style.background = "#fff";
                setBMIData({ ...BMIData, gender: "female" });
                console.log("female");
              }}
            >
              <i
                className="fa fa-venus icon_bmi"
                aria-hidden="true"
                id="female"
              ></i>
              <h6 className="male_text_btn_bmi">Female</h6>
            </div>
          </div>
        </div>

        <BmiQueandTextfield
          bmiQuestion="What is your weight? (kg)"
          id="weight"
          captureChange={validateOnlyNumeric}
          userData={BMIData.weight}
          question="weight"
        />

        <BmiQueandTextfield
          bmiQuestion="What is your height?  (cm)"
          captureChange={validateOnlyNumeric}
          userData={BMIData.height}
          question="height"
        />

        <BmiQueandTextfield
          bmiQuestion="What is your age? "
          id="age"
          captureChange={validateOnlyNumeric}
          userData={BMIData.age}
          question="age"
        />
      </div>
    </>
  );
};

export default BMICalculator;

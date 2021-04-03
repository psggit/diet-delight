import React from "react";

import SliderInput from "./SliderInput";

// import "./BMiMain.css";
import GenderInputContainer from "./GenderInputContainer";

const BMICalculator = ({ BMIData, setBMIData }) => {
  const validateOnlyNumeric = (data, relatedTo) => {
    var numeric = "^[0-9]*$";
    if (data.match(numeric)) {
      setBMIData({ ...BMIData, [relatedTo]: data });
    }
  };

  const handleGenderChange = (value) => {
    setBMIData({ ...BMIData, gender: value });
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

      <div
        className="row"
        style={{
          maxHeight: "20rem",
          overflowY: "auto",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <GenderInputContainer
          handleGenderChange={handleGenderChange}
          selectedGender={BMIData.gender}
        />

        <SliderInput
          handleOnChange={(e, b) => {
            validateOnlyNumeric(b.toString(), "height");
          }}
          min={120}
          max={220}
          question="What is your height? (cm)"
          value={BMIData.height}
          isMale={BMIData.gender === "" || BMIData.gender === "male"}
        />
        <SliderInput
          handleOnChange={(e, b) => {
            validateOnlyNumeric(b.toString(), "age");
          }}
          min={16}
          max={100}
          question="What is your age?"
          value={BMIData.age}
          isMale={BMIData.gender === "" || BMIData.gender === "male"}
        />
        <SliderInput
          handleOnChange={(e, b) => {
            validateOnlyNumeric(b.toString(), "weight");
          }}
          min={40}
          max={180}
          question="What is your weight? (kg)"
          value={BMIData.weight}
          isMale={BMIData.gender === "" || BMIData.gender === "male"}
        />
      </div>
    </>
  );
};

export default BMICalculator;

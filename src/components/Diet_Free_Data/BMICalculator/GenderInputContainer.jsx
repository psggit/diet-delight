import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  genderInput: {
    padding: ".5rem",
    width: "65px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
  bgGreen: {
    "&:hover": {
      backgroundColor: "#8BC441",
    },
  },
  bgPurple: {
    "&:hover": {
      backgroundColor: "purple",
    },
  },
  selectedGreen: {
    backgroundColor: "#8BC441",
    color: "white",
  },
  selectedPurple: {
    backgroundColor: "purple",
    color: "white",
  },
});

const GenderInputField = ({ label, isSelected, handleOnClick }) => {
  const classes = useStyles();
  return (
    <div
      className={`${classes.genderInput} ${
        isSelected
          ? label === "Male"
            ? classes.selectedGreen
            : classes.selectedPurple
          : label === "Male"
          ? classes.bgGreen
          : classes.bgPurple
      }  `}
      id="maleContainer"
      onClick={handleOnClick}
    >
      <i
        className="fa fa-mars"
        style={{ fontSize: "18px" }}
        aria-hidden="true"
      ></i>
      <h6 style={{ fontSize: "13px", marginTop: "8px" }}>{label}</h6>
    </div>
  );
};

const GenderInputContainer = ({ handleGenderChange, selectedGender }) => {
  return (
    <div
      className="col-10 col-sm-5"
      style={{
        color: "#303960",
        textAlign: "center",
        fontSize: "17px",
        letterSpacing: "1px",
        margin: "5%",
        fontWeight: "bold",
      }}
    >
      <h6 className="title">What is your gender?</h6>

      <div className="row" style={{ justifyContent: "space-evenly" }}>
        <GenderInputField
          label="Male"
          isSelected={selectedGender === "male"}
          handleOnClick={() => handleGenderChange("male")}
        />
        <GenderInputField
          label="Female"
          isSelected={selectedGender === "female"}
          handleOnClick={() => handleGenderChange("female")}
        />
      </div>
    </div>
  );
};

export default GenderInputContainer;

import React from "react";

import { makeStyles } from "@material-ui/core";

import "./index.css";
import SelectOptionBtn from "./SelectOptionBtn";

const useStyles = makeStyles({
  textArea: {
    borderRadius: "15px",
    border: "none",
    boxShadow: "0 2px 4px #000000a8",
    padding: ".2rem 1rem",
    color: "#727272",
    fontSize: "1.2rem",
    fontWeight: "500",
    "&::placeholder": {
      color: "#909090",
    },
  },
});

export default function DietYesNoComponent({
  question,
  selectedOption,
  options,
  updateSelectedOption,
  answer,
  updateAnswerText,
}) {
  const classes = useStyles();

  return (
    <div
      style={{
        flex: "1",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <h1>{question.question}</h1>

      <div className="row">
        {options.map((value, index) => (
          <div key={index} className="col-6">
            <SelectOptionBtn
              isSelected={selectedOption && selectedOption.id === value.id}
              label={value.option}
              handleOnClick={() => updateSelectedOption(value)}
            />
          </div>
        ))}
      </div>
      {selectedOption && (
        <div>
          <textarea
            id="specify"
            rows={4}
            placeholder="Please Specify"
            value={answer || ""}
            className={classes.textArea}
            onInput={(e) => updateAnswerText(e.target.value)}
          ></textarea>
        </div>
      )}
    </div>
  );
}

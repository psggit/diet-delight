import React from "react";

import TextField from "@material-ui/core/TextField";

import "./index.css";
import SelectOptionBtn from "./SelectOptionBtn";

export default function DietYesNoComponent({
  question,
  selectedOption,
  options,
  updateSelectedOption,
  answer,
  updateAnswerText,
}) {
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
          <TextField
            id="specify"
            multiline
            rows={4}
            placeholder="Please Specify"
            variant="outlined"
            value={answer || ""}
            onInput={(e) => updateAnswerText(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

import React from "react";
import "./index.css";
import SelectOptionBtn from "./SelectOptionBtn";

export default function DietYesNoComponent({
  question,
  selectedOption,
  options,
  updateSelectedOption,
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
    </div>
  );
}

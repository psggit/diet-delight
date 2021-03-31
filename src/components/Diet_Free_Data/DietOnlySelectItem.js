import React from "react";

import "./index.css";
import SelectOptionBtn from "./SelectOptionBtn";

export default function DietOnlySelectItem({
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

      <div className="row" style={{justifyContent: "center"}}>
        {options.map((value, index) => (
          <SelectOptionBtn
            key={index}
            btnClassName={Math.floor(options.length / 4) === 0 ? "col-6 mx-2" : "col-5"}
            isSelected={selectedOption && selectedOption.id === value.id}
            label={value.option}
            handleOnClick={() => updateSelectedOption(value)}
          />
        ))}
      </div>
    </div>
  );
}

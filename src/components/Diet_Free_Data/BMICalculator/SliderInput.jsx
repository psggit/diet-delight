import React from "react";

import { PrettoSliderGreen, PrettoSliderPurple } from "./PrettoSlider";

export default function SliderInput({
  handleOnChange,
  value,
  min,
  max,
  question,
  isMale,
}) {
  return (
    <div className="col-10 col-sm-5">
      <p
        style={{
          color: "#303960",
          textAlign: "center",
          fontSize: "14px",
          letterSpacing: "1px",
          marginBottom: "8px",
          marginTop: "23px",
        }}
      >
        {value}
      </p>
      {isMale ? (
        <PrettoSliderGreen
          min={min}
          max={max}
          onChange={handleOnChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          orientation="horizontal"
          value={value}
        />
      ) : (
        <PrettoSliderPurple
          min={min}
          max={max}
          onChange={handleOnChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          orientation="horizontal"
          value={value}
        />
      )}
      <h6
        style={{
          color: "#303960",
          textAlign: "center",
          fontSize: "14px",
          letterSpacing: "1px",
          marginBottom: "8px",
          marginTop: "23px",
        }}
      >
        {question}
      </h6>
    </div>
  );
}

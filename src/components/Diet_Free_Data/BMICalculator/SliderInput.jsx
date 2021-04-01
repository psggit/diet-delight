import React from "react";

import PrettoSlider from "../PrettoSlider";

export default function SliderInput({
  handleOnChange,
  value,
  min,
  max,
  question,
}) {
  return (
    <div className="col-md-6 col-sm-12 que_text_container_div">
      <div
        className="text_field_container_bmi"
        style={{ flexDirection: "column" }}
      >
        <p style={{ textAlign: "center" }}>{value}</p>
        <PrettoSlider
          style={{ display: "flex" }}
          min={min}
          max={max}
          onChange={handleOnChange}
          valueLabelDisplay="active"
          aria-labelledby="range-slider"
          orientation="horizontal"
          value={value}
        />
        <h6 className="ques_title_bmi">{question}</h6>
      </div>
    </div>
  );
}

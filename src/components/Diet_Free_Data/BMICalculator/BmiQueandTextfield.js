import React from "react";
// import "./BMiMain.css";

export default function BmiQueandTextfield(props) {
  return (
    <>
      <div className="col-md-6 col-sm-12 que_text_container_div">
        <h6 className="ques_title_bmi">{props.bmiQuestion}</h6>

        <div className="text_field_container_bmi">
          <input
            type="text"
            className="bmi_que_textfiled"
            value={props.userData}
            name="bmi"
            onChange={(e) =>
              props.captureChange(e.target.value, props.question)
            }
          ></input>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import "./index.css";
import SelectOptionBtn from "./SelectOptionBtn";

export default function DietYesNoComponent({
  question,
  selectedOption,
  id1,
  id2,
}) {
  const [currentSelectedOptionId, setCurrentSelectedOptionId] = useState();

  const selectAnswer = (selectedValue, id) => {
    selectedOption.current = { option: selectedValue, id: id };
    console.log("SS : ", selectedOption);
    setCurrentSelectedOptionId(id);
  };

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
        {[
          { value: "Yes", id: id1 },
          { value: "No", id: id2 },
        ].map((value, index) => (
          <div key={index} className="col-6">
            <SelectOptionBtn
              isSelected={currentSelectedOptionId === value.id}
              label={value.value}
              handleOnClick={() => selectAnswer(value.value, value.id)}
            />
          </div>
        ))}
        {/* <button
          type="button"
          id={id1}
          className={question.id}
          style={{
            border: "1px solid #800080",
            color: "#800080",
            opacity: 1,
            outline: "none",
            paddingLeft: "8%",
            paddingRight: "8%",
            borderRadius: "5px",
          }}
          onClick={() => selectAnswer("Yes", id1)}
        >
          Yes
        </button>
        <button
          type="button"
          id={id2}
          className={question.id}
          style={{
            border: "1px solid #800080",
            color: "#800080",
            opacity: 1,
            outline: "none",
            paddingLeft: "8%",
            paddingRight: "8%",
            borderRadius: "5px",
          }}
          onClick={() => selectAnswer("No", id2)}
        >
          No
        </button> */}
      </div>
    </div>
  );
}

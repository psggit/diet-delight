import React from "react";
import "./index.css";

export default function DietYesNoComponent({
  question,
  selectedOption,
  id1,
  id2,
}) {
  const uploadAnswer = (selectedValue, id) => {
    selectedOption.current = { option: selectedValue, id: id };
    console.log("SS : ", selectedOption);
  };

  return (
    <div className="col-md-3 col-sm-12 mb-3">
      <p className="gender_question">{question.question}</p>

      <div className="btn_container_gender">
        <button
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
          onClick={() => uploadAnswer("Yes", id1)}
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
          onClick={() => uploadAnswer("No", id2)}
        >
          No
        </button>
      </div>
    </div>
  );
}

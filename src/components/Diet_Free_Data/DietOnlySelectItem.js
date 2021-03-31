import React, { useEffect, useState } from "react";

import "./index.css";
import axios from "../../axiosInstance";
import SelectOptionBtn from "./SelectOptionBtn";

export default function DietOnlySelectItem({ question, selectedOption }) {
  const [selectOptions, setSelectOptions] = useState([]);
  const [currentSelectedOptionId, setCurrentSelectedOptionId] = useState();

  useEffect(() => {
    axios
      .get(`answer-options`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        let storeOptions = [];
        res.data.data.forEach((answerOption) => {
          if (answerOption.question_id === question.id) {
            storeOptions.push(answerOption);
          }
        });
        console.log("storeOptions", storeOptions);
        setSelectOptions(storeOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectAnswer = (selectedValue) => {
    console.log("selectedValue", selectedValue);
    selectedOption.current = selectedValue;
    setCurrentSelectedOptionId(selectedValue.id);
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
        {selectOptions.map((value, index) => (
          <div key={index} className="col-6">
            <SelectOptionBtn
              isSelected={currentSelectedOptionId === value.id}
              label={value.option}
              handleOnClick={() => selectAnswer(value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

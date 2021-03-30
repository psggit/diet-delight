import React, { useEffect, useState, useRef } from "react";

import "./index.css";
import axios from "../../axiosInstance";

export default function DietOnlySelectItem({ question, selectedOption }) {
  const [selectOptions, setSelectOptions] = useState([]);

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
    console.log(selectedValue);
    let selected = JSON.parse(selectedValue);
    selectedOption.current = selected;
  };

  return (
    <div className="col-md-3 col-sm-12 mb-3">
      <p className="second_que_title">{question.question}</p>

      <div className="dropdown_container">
        <div className="dropdown">
          <select
            name="cars"
            id="cars"
            className="select_menu_diet"
            onChange={(e) => {
              selectAnswer(e.target.value);
            }}
          >
            {selectOptions.map((selectData) => (
              <option key={Math.random()} value={JSON.stringify(selectData)}>
                {selectData.option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

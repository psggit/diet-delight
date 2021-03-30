import React, { useState, useRef } from "react";

import IconButton from "@material-ui/core/IconButton";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import RenderQuestion from "./RenderQuestion";
import axios from "../../axiosInstance";

const QuestionCarousel = ({ QuestionsData }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const selectedOption = useRef(null);

  const submitAnswer = () => {
    const _currentQuestion = QuestionsData[activeQuestion];
    const _selectedOption = selectedOption.current;
    console.log("Question : ", _currentQuestion);
    console.log("selectedOption : ", _selectedOption);
    // axios
    //   .post("my-answers", {
    //     question_id: _currentQuestion.id,
    //     answer_option_id: _selectedOption.id,
    //     answer: _selectedOption.option,
    //     question_question: _currentQuestion.question,
    //     question_type: _currentQuestion.type,
    //     question_additional_text: _currentQuestion.additional_text,
    //     answer_option_option: _selectedOption.option,
    //   })
    //   .then((res) => {
    //     console.log("Submit Answer Result : ", res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log("Submit Answer Error : ", err);
    //   });
  };

  return (
    <>
      <RenderQuestion
        question={QuestionsData[activeQuestion]}
        selectedOption={selectedOption}
      />
      <div>
        {activeQuestion !== 0 && (
          <IconButton
            onClick={() => {
              setActiveQuestion(activeQuestion - 1);
            }}
            color="secondary"
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        )}
        {activeQuestion !== QuestionsData.length - 1 && (
          <IconButton
            onClick={() => {
              setActiveQuestion(activeQuestion + 1);
              submitAnswer();
            }}
            color="secondary"
          >
            <DoneAllIcon fontSize="large" />
          </IconButton>
        )}
      </div>
    </>
  );
};

export default QuestionCarousel;

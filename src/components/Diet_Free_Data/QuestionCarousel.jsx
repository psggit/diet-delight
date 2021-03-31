import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core";

import RenderQuestion from "./RenderQuestion";
import axios from "../../axiosInstance";

const useStyles = makeStyles({
  iconBtn: {
    backgroundColor: "purple",
    color: "white",
    "&:hover": {
      background: "white",
      color: "purple",
      boxShadow: "0 2px 4px purple",
    },
  },
});

const QuestionCarousel = ({ QuestionsData, setQuestionData }) => {
  const classes = useStyles();
  const [activeQuestion, setActiveQuestion] = useState(0);

  const submitAnswer = () => {
    const _currentQuestion = QuestionsData[activeQuestion].question;
    const _selectedOption = QuestionsData[activeQuestion].selectedOption;
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

  const updateSelectedOption = (_selectedOption) => {
    setQuestionData((prev) => {
      const newArray = [...prev];
      newArray[activeQuestion] = {
        ...newArray[activeQuestion],
        selectedOption: _selectedOption,
      };
      return newArray;
    });
  };

  return (
    <>
      <RenderQuestion
        question={QuestionsData[activeQuestion].question}
        selectedOption={QuestionsData[activeQuestion].selectedOption}
        options={QuestionsData[activeQuestion].options}
        updateSelectedOption={updateSelectedOption}
      />
      <div
        style={{
          display: "flex",
          justifyContent: activeQuestion === 0 ? "flex-end" : "space-between",
        }}
      >
        {activeQuestion !== 0 && (
          <IconButton
            onClick={() => {
              setActiveQuestion(activeQuestion - 1);
            }}
            className={classes.iconBtn}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            if (activeQuestion < QuestionsData.length - 1)
              setActiveQuestion(activeQuestion + 1);
            submitAnswer();
          }}
          className={classes.iconBtn}
        >
          <DoneAllIcon fontSize="large" />
        </IconButton>
      </div>
    </>
  );
};

export default QuestionCarousel;

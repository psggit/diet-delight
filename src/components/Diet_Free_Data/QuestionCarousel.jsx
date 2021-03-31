import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core";

import RenderQuestion from "./RenderQuestion";
import axios from "../../axiosInstance";
import BMICalculator from "./BMICalculator";

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
    const _answerText = QuestionsData[activeQuestion].answer;
    console.log("Question : ", _currentQuestion);
    console.log("selectedOption : ", _selectedOption);
    console.log("selectedOption : ", _answerText);
    // axios
    //   .post("my-answers", {
    //     question_id: _currentQuestion.id,
    //     answer_option_id: _selectedOption.id,
    //     answer: _answerText || _selectedOption.option,
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

  const updateAnswerText = (_text) => {
    setQuestionData((prev) => {
      const newArray = [...prev];
      newArray[activeQuestion] = {
        ...newArray[activeQuestion],
        answer: _text,
      };
      return newArray;
    });
  };

  const isCurrentAnswered = () => {
    if (activeQuestion < QuestionsData.length) {
      const _currentQuestion = QuestionsData[activeQuestion];
      const _a = !!_currentQuestion.selectedOption;
      const _b =
        _currentQuestion.question.type === 1 ? !!_currentQuestion.answer : true;

      return _a && _b;
    } else {
      return true;
    }
  };

  return (
    <>
      {activeQuestion < QuestionsData.length && (
        <RenderQuestion
          question={QuestionsData[activeQuestion].question}
          selectedOption={QuestionsData[activeQuestion].selectedOption}
          options={QuestionsData[activeQuestion].options}
          answer={QuestionsData[activeQuestion].answer}
          updateSelectedOption={updateSelectedOption}
          updateAnswerText={updateAnswerText}
        />
      )}
      {activeQuestion === QuestionsData.length && <BMICalculator />}
      {activeQuestion === QuestionsData.length + 1 && (
        <h2>Hello Ths is Test 22</h2>
      )}
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
            <ArrowBackIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            if (
              isCurrentAnswered()
              // &&
              // activeQuestion < QuestionsData.length - 1
            )
              setActiveQuestion(activeQuestion + 1);
          }}
          className={classes.iconBtn}
        >
          <DoneAllIcon />
        </IconButton>
      </div>
    </>
  );
};

export default QuestionCarousel;

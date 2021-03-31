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
  const [BMIData, setBMIData] = useState({
    height: 0,
    weight: 0,
    age: 0,
    gender: 0,
  });

  const [BMICalculatedResult, setBMICalculatedResult] = useState({
    BMIScore: 0,
    calorieInTake: 0,
  });

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

  const isFineToMoveToNext = () => {
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

  const calculateBMI = () => {
    const { age, gender, height, weight } = BMIData;
    let heightInMeter = height / 100;
    let BmiScoreWithoutFixDecimal = weight / (heightInMeter * heightInMeter);
    let BmiScore = BmiScoreWithoutFixDecimal.toFixed(1);
    let calorieInTake = null;
    let category = "";
    console.log(heightInMeter, BmiScore);
    if (BmiScore < 18.5) {
      category = "Under Weight";
      if (gender === "male") {
        calorieInTake = 1800;
      } else {
        calorieInTake = 1600;
      }
      console.log(calorieInTake);
      handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
    } else if (BmiScore >= 18.5 && BmiScore <= 24.9) {
      category = "Normal Weight";
      if (gender === "male") {
        calorieInTake = 1400;
      } else {
        calorieInTake = 1200;
      }
      console.log(calorieInTake);
      handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
    } else if (BmiScore >= 25 && BmiScore <= 29.9) {
      category = "OverWeight";
      if (gender === "male") {
        calorieInTake = 1400;
      } else {
        calorieInTake = 1200;
      }
      console.log(calorieInTake);
      handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
    } else {
      category = "Obesity";
      if (gender === "male") {
        calorieInTake = 1600;
      } else {
        calorieInTake = 1400;
      }
      console.log(calorieInTake);
      handleNavigation(BmiScore, heightInMeter, category, calorieInTake);
    }
  };

  const handleNavigation = (
    BmiScore,
    heightInMeter,
    category,
    calorieInTake
  ) => {
    let genderInNumber = BMIData.gender === "male" ? 0 : 1;
    let bmiInString = BmiScore.toString();
    let calorieInTakeString = calorieInTake.toString();
    console.log("AA : ", BmiScore, heightInMeter, category, calorieInTake);
    setBMICalculatedResult({
      ...BMICalculatedResult,
      BMIScore: BmiScore,
      calorieInTake: calorieInTake,
    });
    // axios
    //   .put("user", {
    //     age: age,
    //     gender: genderInNumber,
    //     bmi: bmiInString,
    //     recommended_calories: calorieInTakeString,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       alert("Updated Successfully");
    //       // props.toggleReportBMI(
    //       //   BmiScore,
    //       //   heightInMeter,
    //       //   category,
    //       //   calorieInTake
    //       // );
    //     }
    //   });
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
      {activeQuestion === QuestionsData.length && (
        <BMICalculator
          BMIData={BMIData}
          calculateBMI={calculateBMI}
          setBMIData={setBMIData}
        />
      )}
      {activeQuestion === QuestionsData.length + 1 && (
        <div>
          <h2>BMI Report</h2>
          <p>BMI Score: {BMICalculatedResult.BMIScore}</p>
          <p>Calorie In Take: {BMICalculatedResult.calorieInTake}</p>
        </div>
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
            if (isFineToMoveToNext()) setActiveQuestion(activeQuestion + 1);

            if (activeQuestion === 3) {
              calculateBMI();
            }
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

import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core";

import RenderQuestion from "./RenderQuestion";
import axios from "../../axiosInstance";
import BMICalculator from "./BMICalculator";
import BMIResult from "./BMIResult";

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

const QuestionCarousel = ({
  QuestionsData,
  setQuestionData,
  handleDialogClose,
}) => {
  const classes = useStyles();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [BMIData, setBMIData] = useState({
    height: 120,
    weight: 40,
    age: 16,
    gender: "",
  });
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [BMICalculatedResult, setBMICalculatedResult] = useState({
    BMIScore: 0,
    calorieInTake: 0,
    category: "",
  });

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
    let rv = true;
    if (activeQuestion < QuestionsData.length) {
      const _currentQuestion = QuestionsData[activeQuestion];
      const _a = !!_currentQuestion.selectedOption;
      // const _b =
      // _currentQuestion.question.type === 1 ? !!_currentQuestion.answer : true;

      rv = _a;
    }

    if (!rv) {
      // alert("Please Select the Option first.")
      setShowValidationMessage(true);
      setTimeout(() => {
        setShowValidationMessage(false);
      }, 3000);
    } else {
      setShowValidationMessage(false);
    }

    return rv;
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

  const handleNavigation = async (
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
      category: category,
    });

    try {
      // For Question Data
      for (let _questionData of QuestionsData) {
        const _currentQuestion = _questionData.question;
        const _selectedOption = _questionData.selectedOption;
        const _answerText = _questionData.answer;

        const questionResponse = await axios.post("my-answers", {
          question_id: _currentQuestion.id,
          answer_option_id: _selectedOption.id,
          answer: _answerText || _selectedOption.option,
          question_question: _currentQuestion.question,
          question_type: _currentQuestion.type,
          question_additional_text: _currentQuestion.additional_text,
          answer_option_option: _selectedOption.option,
        });

        console.log("Submit Answer Result : ", questionResponse.data.data);
      }

      // For BMI Result
      const BMIResponse = await axios.put("user", {
        age: BMIData.age,
        gender: genderInNumber,
        bmi: bmiInString,
        recommended_calories: calorieInTakeString,
        questionnaire_status: 1,
      });

      console.log("BMI Response : ", BMIResponse.data);

      // For updating in User profile
    } catch (error) {
      console.log("Submit Answer Error : ", error);
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
      {activeQuestion === QuestionsData.length && (
        <BMICalculator
          BMIData={BMIData}
          calculateBMI={calculateBMI}
          setBMIData={setBMIData}
        />
      )}
      {activeQuestion === QuestionsData.length + 1 && (
        <BMIResult bmiReport={BMICalculatedResult} />
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
        {showValidationMessage && (
          <div
            style={{
              position: "absolute",
              right: "6rem",
              bottom: "1.2rem",
              color: "purple",
              fontWeight: "bold",
              fontSize: ".9rem",
            }}
          >
            Please Select the Option first.
          </div>
        )}
        <IconButton
          onClick={() => {
            if (isFineToMoveToNext()) setActiveQuestion(activeQuestion + 1);

            if (activeQuestion === 3) {
              calculateBMI();
            }
            if (activeQuestion === 4) {
              handleDialogClose();
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

import React, { useEffect, useState } from "react";
import DietYesNoComponent from "./DietYesNoComponent";
import DietOnlySelectItem from "./DietOnlySelectItem";
import "./index.css";
import DietTextareaBtnItem from "./DietTextareaBtnItem";
import DietSelectandText from "./DietSelectandText";
import cancel_icon from "../../assets/cancel.png";
import axios from "../../axiosInstance";

const DietDataDetails = (props) => {
  const [questionData, setQuestionData] = useState([]);
  const [question, setQuestion] = useState({});
  const [submitAnswer, setSubmitAnswer] = useState(false);

  useEffect(() => {
    axios
      .get(`questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setQuestionData(res.data.data);
        var questions = res.data.data;
        for (var i = 0; i < questions.length; i++) {
          console.log(questions[i]);
          setQuestion(questions[i]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // const fetchSelectedValue = (value) => {
  //     console.log(value)
  // }

  const changeAnsweredStatus = () => {
    console.log("change answer status");
    setSubmitAnswer(true);
    axios
      .get("my-answers")
      .then((res) => {
        console.log(res);
        let myAnswers = res.data.data;
        if (myAnswers.length > 0) {
          axios
            .put("user", {
              questionnaire_status: 1,
            })
            .then((res) => {
              console.log(res.data);
              props.closeBMI();
            })
            .catch((err) => console.log(err));
        } else {
          alert("Please Answer the Question");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAnswerByUser = (
    question_id,
    selected_value,
    question,
    question_type,
    question_additional_text,
    option_id,
    option_value
  ) => {
    console.log(
      question_id,
      selected_value,
      question,
      question_type,
      question_additional_text,
      option_id,
      option_value
    );
  };

  const renderDiet = questionData.map((question) => {
    return (
      <>
        {question.type === 0 && (
          <DietTextareaBtnItem
            question={question}
            handleAnswerGiven={handleAnswerByUser}
            submitAnswer={submitAnswer}
          />
        )}
        {question.type === 1 && (
          <DietYesNoComponent
            question={question}
            handleAnswerGiven={handleAnswerByUser}
            submitAnswer={submitAnswer}
            id1={Math.random()}
            id2={Math.random()}
          />
        )}
        {question.type === 2 && (
          <DietOnlySelectItem
            question={question}
            handleAnswerGiven={handleAnswerByUser}
            submitAnswer={submitAnswer}
          />
        )}
        {question.type === 3 && (
          <DietSelectandText
            question={question}
            handleAnswerGiven={handleAnswerByUser}
            submitAnswer={submitAnswer}
          />
        )}
      </>
    );
  });
  return (
    <div className="main_container">
      <div className="close_diet">
        <img
          src={cancel_icon}
          className="cancel_icon"
          onClick={() => props.handleCancel()}
        ></img>
      </div>

      <div className="container fluid container_main">
        <h3 className="title_text text-center">
          Start by calculating your dietary needs for free
        </h3>
        <hr className="line_green"></hr>
        <div className="row" style={{ justifyContent: "center" }}>
          {renderDiet}
        </div>
        <button
          className="btn next_diet_free_btn"
          onClick={() => changeAnsweredStatus()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DietDataDetails;

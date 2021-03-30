import React, { useEffect, useState } from "react";
import DietYesNoComponent from "./DietYesNoComponent";
import DietOnlySelectItem from "./DietOnlySelectItem";
import "./index.css";
import DietTextareaBtnItem from "./DietTextareaBtnItem";
import DietSelectandText from "./DietSelectandText";
import cancel_icon from "../../assets/cancel_violet.png";
import axios from "../../axiosInstance";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { makeStyles } from "@material-ui/core/styles";
import QuestionCarousel from "./QuestionCarousel";

const useStyles = makeStyles({
  paper: {
    borderRadius: 20,
    maxWidth: "800px",
    width: "800px",
  },
});

const DietDataDetails = (props) => {
  const [questionData, setQuestionData] = useState([]);
  // const [question, setQuestion] = useState({});
  // const [submitAnswer, setSubmitAnswer] = useState(false);

  useEffect(() => {
    axios
      .get(`questions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log("Result : Question :: ", res.data);
        setQuestionData(res.data.data);
        // var questions = res.data.data;
        // for (var i = 0; i < questions.length; i++) {
        //   console.log(questions[i]);
        //   setQuestion(questions[i]);
        // }
      })
      .catch((err) => console.log(err));
  }, []);

  // const changeAnsweredStatus = () => {
  //   console.log("change answer status");
  //   setSubmitAnswer(true);
  //   axios
  //     .get("my-answers")
  //     .then((res) => {
  //       console.log(res);
  //       let myAnswers = res.data.data;
  //       if (myAnswers.length > 0) {
  //         axios
  //           .put("user", {
  //             questionnaire_status: 1,
  //           })
  //           .then((res) => {
  //             console.log(res.data);
  //             props.closeBMI();
  //           })
  //           .catch((err) => console.log(err));
  //       } else {
  //         alert("Please Answer the Question");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleAnswerByUser = (
  //   question_id,
  //   selected_value,
  //   question,
  //   question_type,
  //   question_additional_text,
  //   option_id,
  //   option_value
  // ) => {
  //   console.log(
  //     question_id,
  //     selected_value,
  //     question,
  //     question_type,
  //     question_additional_text,
  //     option_id,
  //     option_value
  //   );
  // };

  // const renderDiet = questionData.map((question) => {
  //   return (
  //     <>
  //       {question.type === 0 && (
  //         <DietTextareaBtnItem
  //           question={question}
  //           handleAnswerGiven={handleAnswerByUser}
  //           submitAnswer={submitAnswer}
  //         />
  //       )}
  //       {question.type === 1 && (
  //         <DietYesNoComponent
  //           question={question}
  //           handleAnswerGiven={handleAnswerByUser}
  //           submitAnswer={submitAnswer}
  //           id1={Math.random()}
  //           id2={Math.random()}
  //         />
  //       )}
  //       {question.type === 2 && (
  //         <DietOnlySelectItem
  //           question={question}
  //           handleAnswerGiven={handleAnswerByUser}
  //           submitAnswer={submitAnswer}
  //         />
  //       )}
  //       {question.type === 3 && (
  //         <DietSelectandText
  //           question={question}
  //           handleAnswerGiven={handleAnswerByUser}
  //           submitAnswer={submitAnswer}
  //         />
  //       )}
  //     </>
  //   );
  // });

  const classes = useStyles();

  // const handleClose = () => {
  //   // setOpen(false);
  // };

  // const handleAgree = () => {
  //   alert("Agree");
  // };

  return (
    <div>
      {/* <div className="main_container"> */}
      {/* <div className="close_diet">
        <img
          src={cancel_icon}
          className="cancel_icon"
          onClick={() => props.handleCancel()}
        ></img>
      </div> */}

      {/* <div className="container fluid container_main">
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
      </div> */}
      <Dialog
        open={props.open}
        onClose={() => props.handleCancel()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paper: classes.paper,
        }}
      >
        <div className="questions_dialog_bg">
          <DialogContent>
            {questionData.length && (
              <QuestionCarousel QuestionsData={questionData} />
            )}
          </DialogContent>

          {/* <DialogActions
            style={{
              backgroundColor: "rgb(119 131 143 / 80%)",
              padding: "0",
              width: "100%",
              justifyContent: "space-around",
            }}
          >
            <Button
              onClick={() => props.handleCancel()}
              style={{ color: "white", width: "100%", height: "50px" }}
            >
              NO THANKS
            </Button>
            <Button
              onClick={handleAgree}
              style={{ color: "white", width: "100%", height: "50px" }}
              autoFocus
            >
              OKAY
            </Button>
          </DialogActions> */}
        </div>
      </Dialog>
    </div>
  );
};

export default DietDataDetails;

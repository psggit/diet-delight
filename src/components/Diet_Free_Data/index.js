import React, { useEffect, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import "./index.css";
import axios from "../../axiosInstance";
import QuestionCarousel from "./QuestionCarousel";

const useStyles = makeStyles({
  contentRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  paper: {
    borderRadius: 20,
    maxWidth: "800px",
    width: "800px",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#303960",
    },
  },
});

const DietDataDetails = (props) => {
  const classes = useStyles();
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const BEARER_TOKEN = `Bearer ${localStorage.getItem("access_token")}`;
        const HEADERS = {
          headers: {
            Authorization: BEARER_TOKEN,
          },
        };
        const questionResponse = await axios.get(`questions`, HEADERS);
        const _allQuestions = questionResponse.data.data;
        const optionResponse = await axios.get(`answer-options`, HEADERS);
        const _allOptions = optionResponse.data.data;

        const questionWithOptions = _allQuestions.map((_question) => {
          let _options = [];
          if (_question.type === 1) {
            _options = [
              { id: Math.random(), option: "Yes" },
              { id: Math.random(), option: "No" },
            ];
          } else {
            _options = _allOptions.filter(
              (_option) => _option.question_id === _question.id
            );
          }

          return {
            question: _question,
            options: _options,
            selectedOption: null,
            answer: null
          };
        });

        setQuestionData(questionWithOptions);
      } catch (error) {
        console.log("Error in fetching Questions");
      }
    })();
  }, []);



  return (
    <ThemeProvider theme={theme}>
      <div>
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
            <DialogContent
              classes={{
                root: classes.contentRoot,
              }}
            >
              {questionData.length && (
                <QuestionCarousel QuestionsData={questionData} setQuestionData={setQuestionData} />
              )}
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default DietDataDetails;

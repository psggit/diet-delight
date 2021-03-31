import React from "react";

import DietOnlySelectItem from "./DietOnlySelectItem";
import DietYesNoComponent from "./DietYesNoComponent";

const RenderQuestion = ({ question, selectedOption }) => {
  return (
    <>
      {/* {question.type === 0 && (
        <DietTextareaBtnItem
          question={question}
            handleAnswerGiven={handleAnswerByUser}
            submitAnswer={submitAnswer}
        />
      )} */}
      {question.type === 1 && (
        <DietYesNoComponent
          question={question}
          selectedOption={selectedOption}
          id1={Math.random()}
          id2={Math.random()}
        />
      )}
      {question.type === 2 && (
        <DietOnlySelectItem
          question={question}
          selectedOption={selectedOption}
        />
      )}
      {/* {question.type === 3 && (
        <DietSelectandText
          question={question}
          handleAnswerGiven={handleAnswerByUser}
          submitAnswer={submitAnswer}
        />
      )} */}
    </>
  );
};

export default RenderQuestion;

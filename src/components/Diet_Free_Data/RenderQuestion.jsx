import React from "react";

import DietOnlySelectItem from "./DietOnlySelectItem";
import YesNoTypeQuestion from "./YesNoTypeQuestion";

const RenderQuestion = ({
  question,
  selectedOption,
  options,
  updateSelectedOption,
  answer,
  updateAnswerText,
}) => {
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
        <YesNoTypeQuestion
          question={question}
          selectedOption={selectedOption}
          options={options}
          updateSelectedOption={updateSelectedOption}
          answer={answer}
          updateAnswerText={updateAnswerText}
        />
      )}
      {question.type === 2 && (
        <DietOnlySelectItem
          question={question}
          selectedOption={selectedOption}
          options={options}
          updateSelectedOption={updateSelectedOption}
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

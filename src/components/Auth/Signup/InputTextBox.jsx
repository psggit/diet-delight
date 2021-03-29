import React from "react";

import { Para } from "../../MainComponents";
import { Input, ErrorPara } from "./SignupElements";

const InputTextBox = ({
  label,
  error,
  isTouched,
  handleOnChange,
  handleOnKeyPress,
  placeholder,
  inputType = "text",
}) => {
  return (
    <>
      <Para
        color="rgba(137,197,63,1)"
        size="0.8rem"
        weight="700"
        align="none"
        top="0"
      >
        {label}
      </Para>
      <Input
        type={inputType}
        placeholder={placeholder}
        onChange={handleOnChange}
        onKeyPress={handleOnKeyPress}
      />
      {error && isTouched && <ErrorPara>{error}</ErrorPara>}
    </>
  );
};

export default InputTextBox;

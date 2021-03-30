import React from "react";

import Button from "@material-ui/core/Button";

const SelectOptionBtn = ({ handleOnClick, label, isSelected }) => {
  return (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      color="secondary"
      onClick={handleOnClick}
      className="my-4 p-2"
    >
      {label}
    </Button>
  );
};

export default SelectOptionBtn;

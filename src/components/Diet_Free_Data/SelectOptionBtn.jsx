import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  optionBtn: {
    borderRadius: "30px",
    padding: ".8rem 2rem",
    margin: "1rem 0"
  },
});

const SelectOptionBtn = ({ handleOnClick, label, isSelected }) => {
  const classes = useStyles();

  return (
    <Button
      variant={isSelected ? "contained" : "outlined"}
      color="primary"
      onClick={handleOnClick}
      className={classes.optionBtn}
    >
      {label}
    </Button>
  );
};

export default SelectOptionBtn;

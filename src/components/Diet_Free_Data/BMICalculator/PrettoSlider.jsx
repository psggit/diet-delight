import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

export const PrettoSliderGreen = withStyles({
  disabled: {
    color: "black",
  },
  root: {
    color: "#ffffff",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    color: "#8BC441",

    backgroundColor: "#8BC441",
    border: "4px solid #8BC441",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
      backgroundColor: "#8BC441",
    },
  },
  valueLabelDisplay: {
    backgroundColor: "red",
  },
  active: {
    backgroundColor: "red",
  },
  track: {
    height: 8,
    borderRadius: 9,
    color: "#8BC441",
  },
  rail: {
    height: 8,
    borderRadius: 9,
    opacity: 1,
    boxShadow: "0 0 2px #b3b3b3",
  },
})(Slider);

export const PrettoSliderPurple = withStyles({
  disabled: {
    color: "black",
  },
  root: {
    color: "#ffffff",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    color: "purple",

    backgroundColor: "purple",
    border: "4px solid purple",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
      backgroundColor: "purple",
    },
  },
  valueLabelDisplay: {
    backgroundColor: "red",
  },
  active: {
    backgroundColor: "red",
  },
  track: {
    height: 8,
    borderRadius: 9,
    color: "purple",
  },
  rail: {
    height: 8,
    borderRadius: 9,
    opacity: 1,
    boxShadow: "0 0 2px #b3b3b3",
  },
})(Slider);

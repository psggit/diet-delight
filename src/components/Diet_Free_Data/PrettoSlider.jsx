import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const PrettoSlider = withStyles({
  disabled: {
    color: "black",
  },
  root: {
    color: "#EFEFEF",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    color: "#8BC441",

    backgroundColor: "#8BC441",
    border: "4px solid #8BC441 r",
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
    borderRadius: 0,
    opacity: 1,
  },
})(Slider);

export default PrettoSlider;

import React, { useState } from "react";
import "./OrderHistory.css";
import logo_web from "../../assets/logoweb.png";
import MealpkgOrderHistory from "./MealpkgOrderHistory.js";
import ConsultationPkgOrderHistory from "./ConsultationPkgOrderHistory.js";
import Mealchoose from "../Mealchoose";
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { withStyles } from "@material-ui/core/styles";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function OrderHistory() {
  const [timePeriod, setTimePeriod] = useState(-6);
  const [isMealPlan, setIsMealPlan] = useState(true);
  const [isConsultation, setIsConsulatation] = useState(false);

  function selectedTimePeriod(timePeriod) {
    console.log(timePeriod);
    console.log(typeof timePeriod);
    switch (timePeriod) {
      case "-12":
        console.log(-12);
        setTimePeriod(-12);
        break;

      case "6":
        console.log(6);
        setTimePeriod(6);
        break;

      case "12":
        console.log(12);
        setTimePeriod(12);
        break;

      default:
        console.log(-6);
    }

    // var newDate = new Date(date.setMonth(date.getMonth()+8));
  }

  const handleMealChange = (e) => {
    setIsMealPlan(!isMealPlan);
  };

  const handleConsultationChange = (e) => {
    setIsConsulatation(!isConsultation);
  };

  return (
    <div className="order_bg_container">
      <Mealchoose name="Order History" />

      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}

      {/*         
            <div className="row row_bg mt-4" >
            <div className="col-md-12 col-sm-12 text_icon_container">
            
            <p className="choose_your_meal_text">Order History</p> 
            
            
            <select name="Last 6 Months" id="cars" className="select_orderhistory">
            <option value="volvo">Last 6 Months</option>
            <option value="saab">Last 12 Months</option>
            <option value="opel">After 6 Months</option>
            <option value="audi">After 12 Months</option>
            </select>
            
            
            </div> 
        </div> */}

      {/* <div className="d-flex justify-content-end select_container_order_histroy">
        <select name="Last 6 Months" id="cars" className="select_orderhistory"
onChange={(e) => 
           { e.preventDefault()
            console.log(e)
            selectedTimePeriod(e.target.value)}}>
          <option value="-6">Last 6 Months</option>
          <option value="-12">Last 12 Months</option>
          <option value="6">After 6 Months</option>
          <option value="12">After 12 Months</option>
        </select>
      </div> */}
      <div className="order_history_container">
        <div className="order_history_filter">
          <FormGroup row>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={isMealPlan}
                  onChange={handleMealChange}
                  name="meal"
                />
              }
              label="Meal Plan Purchases"
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={isConsultation}
                  onChange={handleConsultationChange}
                  name="consultation"
                />
              }
              label="Consulation Package Purchases"
            />
          </FormGroup>
        </div>

        {isMealPlan && <MealpkgOrderHistory timePeriod={timePeriod} />}

        {isConsultation && (
          <ConsultationPkgOrderHistory timePeriod={timePeriod} />
        )}
      </div>
    </div>
  );
}

import React,{useState} from "react";
import "./OrderHistory.css";
import logo_web from "../../assets/logoweb.png";
import MealpkgOrderHistory from "./MealpkgOrderHistory.js";
import ConsultationPkgOrderHistory from "./ConsultationPkgOrderHistory.js";
import Mealchoose from "../Mealchoose";

export default function OrderHistory() {

  const [timePeriod ,setTimePeriod] = useState(-6)

  function selectedTimePeriod(timePeriod){
    console.log(timePeriod) 
    console.log(typeof(timePeriod))
    switch(timePeriod){
      case "-12":
        console.log(-12);
        setTimePeriod(-12)
        break;

      case "6":
        console.log(6);
        setTimePeriod(6)
        break;

      case "12":
        console.log(12);
        setTimePeriod(12)
        break;

      default:console.log(-6)

    }

// var newDate = new Date(date.setMonth(date.getMonth()+8));
  }
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

      <div className="d-flex justify-content-end select_container_order_histroy">
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
      </div>

      <MealpkgOrderHistory timePeriod={timePeriod}/>

      <ConsultationPkgOrderHistory timePeriod={timePeriod}/>
    </div>
  );
}

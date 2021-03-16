import React from "react";
import "./OrderHistory.css";
import logo_web from "../../assets/logoweb.png";
import MealpkgOrderHistory from "./MealpkgOrderHistory.js";
import ConsultationPkgOrderHistory from "./ConsultationPkgOrderHistory.js";
import Mealchoose from "../Mealchoose";

export default function OrderHistory() {
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
        <select name="Last 6 Months" id="cars" className="select_orderhistory">
          <option value="volvo">Last 6 Months</option>
          <option value="saab">Last 12 Months</option>
          <option value="opel">After 6 Months</option>
          <option value="audi">After 12 Months</option>
        </select>
      </div>

      <MealpkgOrderHistory />

      <ConsultationPkgOrderHistory />
    </div>
  );
}

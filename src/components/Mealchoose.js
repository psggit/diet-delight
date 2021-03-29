import React from "react";
import "./MealPackageSubsciption/MealpkgSubscription.css";
import food_icon from "../assets/meal.png";
import logo_web from "../assets/logo.png";
import { Link } from "react-router-dom"; 

export default function Mealchoose(props) {
  return (
    <div className="row row_bg meal_choosecontainer">
      <div className="col-md-12 col-sm-12 text_icon_container">
        <Link
          to={{
            pathname: "/",
          }}
        >
          <img
            href="http://localhost:3000/"
            src={logo_web}
            className="logo_web"
          ></img>
        </Link>

        <a href="/" className="choose_your_meal_text">
          {props.name}
        </a>

        <div className="d-flex justify-content-center a_link_text_mealchoose">
          <a href="/" className="choose_your_meal_text2">
            Consulting
          </a>
          <a href="/" className="choose_your_meal_text2">
            Meal Plan
          </a>
          <a href="/" className="choose_your_meal_text2">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

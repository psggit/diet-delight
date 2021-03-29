import React, { useEffect, useState } from "react";
import logo_web from "../../assets/logoweb.png";
import axios from "../../axiosInstance";
import "../MealPackageSubsciption/MealpkgSubscription.css";
import Mealchoose from "../Mealchoose";
import "./OnGoing.css";
import { Link, useHistory } from "react-router-dom";

export default function OngoingMain() {
  let history = useHistory();
  const [meals, setMeal] = useState([]);
 
  useEffect(() => {
      axios
      .get(`my-meal-purchases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMeal(res.data.data);
      });
  }, []);

  function pushScreen(meal) {
    history.push({pathname:"/SelectMealPlan",
    state:{
      recentPurchase:meal
    }
  }
    );
   
  }

  

  const renderMeal = meals.map((meal) => {
    return (
      <div onClick={() =>pushScreen(meal)}>
        <div className="main_container_ongoing">
          <div className="card fullcard_container_ongoing">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div className="img_container_ongoing">
                      <img
                        src={meal.meal_plan.picture}
                        alt="rounded_img"
                        className="rounded-circle card_img_rounded_ongoing"
                      ></img>
                    </div>
                  </div>

                  <div className="col-md-8 col-sm-12 meal_ongoing">
                    <h5 className="title_ongoing">{meal.meal_plan_name}</h5>
                    <h5 className="subtitle_ongoing">{meal.meal_plan_duration} Day</h5>
                    <h6 className="calories_text_ongoing">{meal.kcal} Calories</h6>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="vertical_line_ongoing"></div>

                  <div className="col-md-11 col-sm-12">
                    <h6 className="date_content_ongoing">
                      Start Date - {meal.start_date}
                    </h6>
                    <h6 className="date_content_ongoing_subtext">
                      {meal.meal_plan.details}
                    </h6>
                    <h6 className="weekend_content_text">
                      {meal.meal_plan.type == 0 ? "With Weekend" : "Without Weekend"}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="ongoing_bg">
      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}

      {/* choose meal component */}

      <Mealchoose name="Ongoing Meal Plan" />
      {renderMeal}

      {/* card component */}
    </div>
  );
}

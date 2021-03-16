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
      .get(`meal-plans`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMeal(res.data.data);
      });
  }, []);

  function pushScreen() {
    history.push("/");
  }

  const renderMeal = meals.map((meal) => {
    return (
      <div onClick={pushScreen}>
        <div className="main_container_mealpkg">
          <div className="card fullcard_container_ongoing">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-md-4 col-sm-12">
                    <div className="img_container_ongoing">
                      <img
                        src={meal.picture}
                        alt="rounded_img"
                        className="rounded-circle card_img_rounded_mealpkgsub"
                      ></img>
                    </div>
                  </div>

                  <div className="col-md-8 col-sm-12 meal_ongoing">
                    <h5 className="title_ongoing">{meal.name}</h5>
                    <h5 className="subtitle_ongoing">{meal.duration} Day</h5>
                    <h6 className="calories_text_ongoing">2564 Calories</h6>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="vertical_line_ongoing"></div>

                  <div className="col-md-11 col-sm-12">
                    <h6 className="date_content_ongoing">
                      Start date 22-oct-2021
                    </h6>
                    <h6 className="date_content_ongoing_subtext">
                      {meal.details}
                    </h6>
                    <h6 className="weekend_content_text">
                      {meal.type == 0 ? "With Weekend" : "Without Weekend"}
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

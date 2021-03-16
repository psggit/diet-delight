import React, { useEffect, useState } from "react";
import "./MealpkgSubscription.css";
import logo_web from "../../assets/logoweb.png";
import Mealchoose from "../Mealchoose.js";
import { Link } from "react-router-dom";
import axios from "../../axiosInstance";

export default function MealpkgSubscription(props) {
  console.log(props);
  const [meals, setMeal] = useState([]);
  useEffect(() => {
    axios
      .get(`meal-plans?duration_id=` + props.location.state.duration.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMeal(res.data.data);
      });
  }, []);

  const renderMeal = meals.map((meal) => {
    return (
      <div className="main_container_mealpkg" key={Math.random()}>
        <div className="card fullcard_container">
          <div className="row under_card_mealsubscription">
            <div className="col-md-5 col-sm-12">
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <div className="img_container">
                    <img
                      src={meal.picture}
                      alt="rounded_img"
                      className="rounded-circle card_img_rounded_mealpkgsub"
                    ></img>
                  </div>
                </div>

                <div className="col-md-8 col-sm-12 media_meal">
                  <h5 className="mt-0 immunne_text_mealpkgsub">{meal.name}</h5>
                  <div className="d-flex justify-content-around">
                    <h5 className="mt-0 bhd_text_mealpkgsub">
                      {meal.price} BHD
                    </h5>
                    <p className="with_weekend_text">
                      {meal.type == 0 ? "With Weekend" : "Without Weekend"}
                    </p>
                  </div>

                  <a href="#" className="link_text">
                    View Menu
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-7 col-sm-12">
              <div className="row">
                <div className="vertical_line"></div>

                <div className="col-md-6 col-sm-12">
                  <p className="breakfast_text_mealpkgsub">{meal.subtitle}</p>

                  <p className="something_text">- {meal.details}</p>

                  <br />
                  <br />

                  <button className="btn btn-default mealbtn_subscription">
                    <Link
                      className="text_subscription_text"
                      style={{ color: "#fff", textDecoration: "none" }}
                      to={{
                        pathname: "/MealAddressMain",
                        state: {
                          id: meal.id,
                          mealType: meal.type,
                          meal: meals,
                        },
                      }}
                    >
                      Buy Subscription
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="red">
      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}

      {/* choose meal component */}

      <Mealchoose name="Meal Plan" />
      {renderMeal}

      {/* card component */}
    </div>
  );
}

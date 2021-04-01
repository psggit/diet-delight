import React, { useEffect, useState } from "react";
import "./MealpkgSubscription.css";
import logo_web from "../../assets/logoweb.png";
import Mealchoose from "../Mealchoose.js";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axiosInstance";
import Snackbar from "../Snack bar/Snackbar.js";
import ConfirmDialog from '../Landing_Page/ConfirmDialog'

export default function MealpkgSubscription(props) {
  console.log(props);
  let history = useHistory();
  const [meals, setMeal] = useState([]);
  const [user, setUser] = useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  useEffect(() => {
    axios
      .get(`meal-plans?duration_id=` +props.location.state.duration.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMeal(res.data.data);
      });
  }, [props.location.state.duration.id]);

  function handleSubscription(meal) {
    console.log(user.length);
    if(!localStorage.getItem('access_token')) {
      console.log("dashboard");
      setOpenConfirmDialog(true)
     
    } else { 
      console.log("mealaddressmain"); 
      setOpenConfirmDialog(false)
      history.push({
        pathname: "/MealAddressMain",
        state: {
          id: meal.id,
          mealType: meal.type,
          meal: meal,
        },
      });
      
    } 
  }

  const renderMeal = meals.map((meal) => {
    return (
      <div className="card fullcard_container">
        <div className="row under_card_mealsubscription">
          <div className="col-md-6 col-sm-12">
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
                <h5 className="immunne_text_mealpkgsub">{meal.name}</h5>
                {/*<div className="d-flex justify-content-around bhd_weekend_container">
                    <h5 className=" bhd_text_mealpkgsub">
                      {meal.price} BHD
                    </h5>
                    <p className="with_weekend_text">
                      {meal.type == 0 ? "With Weekend" : "Without Weekend"}
                    </p>
                  </div> */}

                <div className="row bhd_weekend_container">
                  <div className="col-md-5 col-5">
                    <h5 className=" bhd_text_mealpkgsub">{meal.price} BHD</h5>
                  </div>
                  <div className="col-md-7 col-7">
                    <p className="with_weekend_text">
                      {meal.type == 0 ? "With Weekend" : "Without Weekend"}
                    </p>
                  </div>
                </div>

                <a href="#" className="link_text">
                  View Menu
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="vertical_line"></div>

              <div className="col-md-11 col-sm-11 right_side_subs">
                <p className="breakfast_text_mealpkgsub">{meal.subtitle}</p>

                <p className="something_text">- {meal.details}</p>
                <ConfirmDialog 
                    open={openConfirmDialog} 
                    setOpen={setOpenConfirmDialog}  
                />

                <button className="btn btn-default mealbtn_subscription" onClick={() =>handleSubscription(meal)}>
                
                    Buy Subscription
                
                </button>
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
      <div className="meal_pkg_subscription_container">{renderMeal}</div>

      {/* card component */}
    </div>
  );
}

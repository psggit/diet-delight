import React, { useEffect, useState } from "react";
import "./PaymentPlan.css";
import WeekData from "./WeekData";
import Mealchoose from "../Mealchoose";
import logo_web from "../../assets/logoweb.png";
import axios from "../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import master_card from "../../assets/mastercard.jpg";
import {
  weeksInList,
  addDays,
  getDayDetails,
  formatedDate,
} from "../CommonFunctionality.js";
import { useSnackbar } from "notistack";

export default function PaymentPlan(props) {
  let history = useHistory();
  const [meal, setMeal] = useState([]);
  const [dateformat, setDateFormat] = useState({});
  const [endDate, setEndDate] = useState("");
  const [totalCharge, setTotalCharge] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponScheme, setCouponScheme] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  console.log(props.location.state);
  console.log(JSON.stringify(props.location.state.weekDays));
  console.log(props.location.state.weekDays.toString());

  useEffect(() => {
    console.log(couponScheme);
    if (couponScheme != {}) {
      if (couponScheme.flat_discount != null) {
        setDiscountAmount(parseInt(couponScheme.flat_discount));
        console.log(couponScheme.flat_discount);
      } else {
        let percentage_discount = parseInt(couponScheme.percentage_discount);
        let discountedAmount = (totalCharge * percentage_discount) / 100;
        setDiscountAmount(parseFloat(discountedAmount));
      }
    }
  }, [couponScheme]);

  useEffect(() => {
    console.log(discountAmount, taxAmount);
    let totalChargeUpdated = 0;
    if (discountAmount > 0 || taxAmount > 0) {
      totalChargeUpdated = totalCharge + taxAmount - discountAmount;
    }
    setTotalCharge(totalChargeUpdated);
  }, [discountAmount, taxAmount]);

  useEffect(() => {
    var planDays = props.location.state.meal.duration;
    var i = 0;
    var weekDayInList = weeksInList(props.location.state.weekDays);
    var newDate = props.location.state.date;
    while (i < planDays) {
      var date = addDays(newDate, 1);
      newDate = date;
      var dayInWeek = date.getDay();
      if (weekDayInList.includes(dayInWeek)) {
        i++;
      }
    }
    console.log(weekDayInList, newDate);

    var formatDate = new Date(props.location.state.date);
    console.log(formatDate);
    setDateFormat(formatDate);
    // var date = addDays(props.location.state.date, 30)
    console.log(newDate);
    let dayFormat = getDayDetails(newDate);
    let concatedDate = formatedDate(
      dayFormat.year,
      dayFormat.month,
      dayFormat.date
    );
    console.log(concatedDate);
    setEndDate(concatedDate);
  }, [
    props.location.state.date,
    props.location.state.meal.duration,
    props.location.state.weekDays,
  ]);

  useEffect(() => {
    axios
      .get(`meal-plans/` + props.location.state.mealId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMeal(res.data.data);
        let mealPrice =
          parseInt(res.data.data.price) + props.location.state.extraCharge;
        setTotalCharge(mealPrice);
      });
  }, [props.location.state.mealId]);

  function checkCoupon(code) {
    console.log(coupon === code.code);
    return coupon === code.code;
  }

  const applyCoupon = () => {
    axios
      .get("coupons")
      .then((res) => {
        console.log(res.data.data);
        var verifyCoupon = res.data.data.findIndex(checkCoupon);
        console.log(verifyCoupon);
        if (verifyCoupon >= 0) {
          var couponExpiryDate = res.data.data[verifyCoupon].expiry_date;
          console.log(new Date(couponExpiryDate) < new Date());
          if (new Date(couponExpiryDate) < new Date()) {
            var errorMessage = document.getElementById("successCoupon");
            enqueueSnackbar("Coupon Code Expired");
            errorMessage.innerHTML = "";

            setCoupon("");
          } else {
            var errorMessage = document.getElementById("successCoupon");
            errorMessage.innerHTML = "&#10003; Coupon Successfully Applied";
            errorMessage.style.color = "green";

            console.log(res.data.data[verifyCoupon]);
            setCouponScheme(res.data.data[verifyCoupon]);
          }
        } else {
          var errorMessage = document.getElementById("successCoupon");
          errorMessage.innerHTML = "";
          enqueueSnackbar("Invalid coupon code");
        }
        console.log(couponScheme);
      })
      .catch((err) => console.log(err));
  };

  function handlePayment() {
    axios
      .post(`my-meal-purchases`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        user_id: props.location.state.id,
        meal_plan_id: props.location.state.mealId,
        payment_id: 1,
        status: 1,
        billing_address_line1: meal.billing_address_line1,
        billing_address_line2: meal.billing_address_line2,
        shipping_address_line1: meal.shipping_address_line1,
        shipping_address_line2: meal.shipping_address_line2,
        meal_plan_name: meal.name,
        meal_plan_duration: meal.duration,
        amount_paid: totalCharge,
        start_date: props.location.state.date,
        end_date: endDate,
        weekdays: JSON.stringify(props.location.state.weekDays),
        kcal: 1800,
        portions: 0,
        duration_id: meal.duration_id,
      })
      .then((res) => {
        console.log(res);
        // history.push("/SelectMealPlan?purchase_id="+res.data.data.id)
        history.push({
          pathname: "/SelectMealPlan",
          state: {
            recentPurchase: res.data.data,
            start_date: props.location.state.start_date,
            end_date: endDate,
          },
        });
      });
  }

  return (
    <div className="address_screen_bg">
      {/* <img src={logo_web} alt="logo_web"  className="logo_web"></img> */}

      <Mealchoose name="Purchase Meal Plan" />
      <div className="mealpayment_plan_container">
        <div className="card Meal_plan_container_payment">
          <div className="row ">
            <div className="col-md-5 col-sm-6">
              <p className="title_your_plan">Your Plan</p>
              <p className="title_menu_pkg">Menu Package</p>
              <h6 className="subtitle_immnue_booster">{meal.name}</h6>
              <h6 className="subtitle_weekends">{meal.details}</h6>
              <h6 className="subtitle_category">{meal.subtitle}</h6>
              <p className="title_date">Starting date</p>
              <h6 className="subtitle_date_detail">
                {props.location.state.date}
              </h6>
              <p className="title_sub_days">Subscription days</p>

              <div className="week_data_container">
                <WeekData daySelected={props.location.state.weekDays} />
              </div>

              <div className="coupon_container">
                <h6 className="add_coupon_title">Add Coupon</h6>

                <div className="row payment_plan_coupon">
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    className="payment_plan_input"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  ></input>
                  <button
                    className="coupon_btn_payment_plan"
                    onClick={applyCoupon}
                  >
                    Apply Coupon
                  </button>
                  <span
                    id="successCoupon"
                    style={{
                      color: "#800080",
                      fontWeight: 600,
                      paddingLeft: "20px",
                    }}
                  ></span>
                </div>
              </div>
            </div>
            <div className="vertical_line_mealplan"></div>
            <div className="col-md-6 col-sm-6 payment_plan_container_rightside">
              <h3 className="payment_title">Payment</h3>
              <div className="d-flex">
                <div className="card mastercard_container">
                  <div className="d-flex">
                    <img
                      src={master_card}
                      alt="master_card"
                      className="master_card"
                    ></img>

                    <h6 className="master_card_number">xxxx xxxx xxxx 3598</h6>
                  </div>
                </div>
                <h6 className="change_text_master_card">Change</h6>
              </div>

              <h5 className="cost_title">Cost Breakdown</h5>

              <div className="Immune_booster_container">
                <p className="immune_subtitle">{meal.name}</p>
                <span className="font-weight-bold price_subtitle">
                  {meal.price} BHD
                </span>
              </div>
              <p className="gb_plan_text">({meal.duration} days plan)</p>

              <div className="Immune_booster_container">
                <p className="extra_subtitle">Extras</p>
                <span className="font-weight-bold price_subtitle">
                  {props.location.state.extraCharge} BHD
                </span>
              </div>

              <div className="Immune_booster_container">
                <p className="tax_subtitle">Taxes</p>
                <span className="font-weight-bold price_subtitle">
                  {taxAmount > 0 ? taxAmount : "--"} BHD
                </span>
              </div>

              <div className="Immune_booster_container">
                <p className="tax_subtitle">Discount</p>
                <span className="font-weight-bold price_subtitle">
                  {discountAmount > 0 ? discountAmount : "--"} BHD
                </span>
              </div>

              <div className="row">
                <div className="col-md-12 col-12 d-flex justify-content-end">
                  <hr className="horizontal_line_mealplan"></hr>
                </div>
              </div>

              <div className="grandtotal_container">
                <span className="grand_total_subtitle mr-2 mt-1">
                  Grand Total
                </span>
                <label className="font-weight-bold total_sub_text_payment">
                  <span className="total_text">{totalCharge}</span>BHD
                </label>
              </div>

              <div className="pay_now_btn_container">
                {/* <Link to="/SelectMealPlan"> */}

                <button className="pay_now_btn" onClick={handlePayment}>
                  PAY NOW
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

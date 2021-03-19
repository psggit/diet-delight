import React, { useState, useEffect } from "react";
import "./Appointmentmain.css";
import MealchooseWithoutBtn from "../MealchooseWithoutBtn";
import { Link, useHistory } from "react-router-dom";
import SelectdatePicker from "../SelectdatePicker";
import TimeSlotByShift from "./TimeSlotByShift";
import "./toggle.css";
import Mealchoose from "../Mealchoose.js";

export default function Appointmentmain(props) {
  console.log(props);
  let history = useHistory(); 

  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [renderShift, setRenderShift] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [appointmentMode, setAppointmentMode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState();

  useEffect(() => {
    var todayDate = new Date();
    var getDate = todayDate.getDate();
    var getYear = todayDate.getFullYear();
    var getMonth = todayDate.getMonth();
    var formatedDate =
      getYear +
      "-" +
      (getMonth < 9 ? "0" + (getMonth + 1) : getMonth + 1) +
      "-" +
      (getDate < 10 ? "0" + getDate : getDate);
    setMinDate(formatedDate);
    console.log(formatedDate);
  }, []);

  function handleDateChange(date) {
    setDate(date);
  }

  function handleDayPeriod(period) {
    console.log(period);
    handleColorTheme(period);
  }

  function handleSelectedTimeSlot(selectedTimeSlot) {
  
    console.log(selectedTimeSlot);
    setTimeSlot(selectedTimeSlot);
  }

  function handleColorTheme(period) {
    var fetchUnselected = document.getElementsByClassName(
      "appoinment_tab_subcontainer"
    );
    console.log(typeof fetchUnselected);
    console.log(fetchUnselected);
    for (var i = 0; i < fetchUnselected.length; i++) {
      console.log(fetchUnselected[i].id);
      if (fetchUnselected[i].id != period) {
        fetchUnselected[i].style.background = "#fbfbfb";
        fetchUnselected[i].style.color = "#212121";
      } else {
        fetchUnselected[i].style.background = "#8BC441";
        fetchUnselected[i].style.color = "#fff";
        fetchUnselected[i].style.border = "none";
      }
    }
    setRenderShift(period);
  }

  function handleDate() {
    if (date != "") {
      if( timeSlot != ""){
        history.push({
          pathname: "/GrandtotalAppointmentmain",
          state: {
            packageId: props.location.state.packageId,
            date: date,
            time: timeSlot,
            appointmentMode: appointmentMode,
            picture: props.location.state.packagePicture,
          },
        });
      }else alert("please select Time")
    
    } else alert("Please Select Date & Time");
  }

  useEffect(() => {
    if (checked) {
      setDisabled(true);
      setRenderShift("");
      setTimeSlot("");
      setAppointmentMode("online");
      handleColorTheme();
    } else {
      setDisabled(false);
      setAppointmentMode("offline");
    }
  }, [checked]);

  return (
    <div className="main_container_appoi">
      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}

      <Mealchoose name="Book an Appointment" />

      <div className="appointment_main_container">
        <div className="card card_user_appointment">
          <div className="row">
            <div className="col-md-5 col-sm-12 silver_container">
              <img
                src={props.location.state.packagePicture}
                alt="silver"
                className="silver_img_appointment"
              ></img>

              <p className="silver_subtitle">
                {props.location.state.packageDetails}
              </p>

              <h6 className="appointmentdate_title">Select Appointment date</h6>

              <SelectdatePicker
                dateChange={handleDateChange}
                minValue={minDate}
              />
              {/*         
            <div className="row toggle_container">
            <h6 className="online_text">Online</h6>
            <input type="checkbox" id="switch" /><label className="switch_toggle" for="switch"></label>
            
        </div> */}

              <div className="row toggle_container">
                <h6 className="online_text">Online Consultation</h6>
                {/* <h6 className="online_text">Consultation at Clinic</h6> */}
                <input
                  onChange={(e) => setChecked(!checked)}
                  type="checkbox"
                  id="switch"
                />
                <label className="switch_toggle" for="switch"></label>
              </div>

              {/* <div className="male_container mt-3">
                <label htmlFor="online" className="online_text_submeal">
                  Online appointment
                </label>
                <input
                  type="radio"
                  className="male_input_submeal "
                  id="male"
                  name="male"
                  value="online"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDisabled(true);
                    setRenderShift("");
                    setTimeSlot("");
                    setAppointmentMode("online");
                    handleColorTheme();
                  }}
                ></input>
                <span className="checkmark"></span>
              </div>

              <div>
                <label htmlFor="offline" className="online_text_submeal">
                  Clinic appointment
                </label>
                <input
                  type="radio"
                  className="male_input_submeal_second"
                  id="female"
                  name="male"
                  value="offline"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDisabled(false);
                    setAppointmentMode("offline");
                  }}
                ></input>
              </div> */}
            </div>

            <div className="vertical_line_appointment"></div>

            <div className="col-md-6 col-sm-6 right_side_container_appointmentmain">
              <h5 className="timeslot_title">Select Prefered Timeslot</h5>

              {/* tabs start */}
              {checked ? (
                <div>
                  <h3 className="heading">
                    You have Selected an online consultation!
                  </h3>
                  <p className="online_details">
                    We will get in touch with you via email or whatsapp and
                    schedule the meeting at your convenient time.
                  </p>
                  <p className="online_details">
                    Please click “NEXT” to proceed further.
                  </p>
                </div>
              ) : (
                <div className="date_time_container_appointmain">
                  <ul className="nav nav-pills appoinment_tab_container mt-3">
                    <li className="active  mb-1">
                      <button
                        className="appoinment_tab_subcontainer"
                        id="morning"
                        disabled={disabled}
                        onClick={() => handleDayPeriod("morning")}
                      >
                        Morning
                      </button>
                      <p className="morning_tabs_subtitle">9 AM to 12 PM</p>
                    </li>

                    <li>
                      <button
                        className="appoinment_tab_subcontainer"
                        id="afternoon"
                        disabled={disabled}
                        onClick={() => handleDayPeriod("afternoon")}
                      >
                        Afternoon
                      </button>
                      <p className="morning_tabs_subtitle">12 PM to 3 PM</p>
                    </li>

                    <li>
                      <button
                        className="appoinment_tab_subcontainer"
                        id="evening"
                        disabled={disabled}
                        onClick={() => handleDayPeriod("evening")}
                      >
                        Evening
                      </button>
                      <p className="morning_tabs_subtitle">3 PM to 6 PM</p>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div id="morningShift">
                      <TimeSlotByShift
                        renderShift={renderShift}
                        selectedTimeSlot={handleSelectedTimeSlot}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* tabs end */}

              <div className="btn_container_appointment">
                {/* <Link to={{
            pathname:"/GrandtotalAppointmentmain",
            state:{
                packageId:props.location.state.packageId,
                date:date,
                time:timeSlot,
                appointmentMode:appointmentMode
            }
        }}> */}
                <button
                  className="btn btn-outline select_btn_next_appointmain"
                  onClick={handleDate}
                >
                  Next
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

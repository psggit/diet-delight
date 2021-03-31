import React, { useState, useEffect } from "react";
import "./Appointmentmain.css";
import { useHistory } from "react-router-dom";
import SelectdatePicker from "../SelectdatePicker";
import TimeSlotByShift from "./TimeSlotByShift";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import "./toggle.css";
import axios from "../../axiosInstance";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Mealchoose from "../Mealchoose.js";
import Moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import purple from "@material-ui/core/colors/purple";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/core";
import * as Yup from "yup";

const DEFAULT_CONSULTATION_TYPE = "online";
const useStyles = makeStyles((theme) =>
  createStyles({
    formLabel: {
      fontSize: 19,
      color: "#303960",
      fontWeight: 700,
      marginBottom: 30,
    },
    radioGroupRoot: {
      "& .Mui-checked": {
        color: "#8BC441",
      },
    },
    formLabelRootWithBorder: {
      border: "2px solid #8BC441",
    },
    formLabelRoot: {
      padding: "10px 20px",
      marginBottom: 10,
      textAlign: "left",
      background: "#ffffff",
      color: "black",
      marginLeft: 0,
    },
    radioRoot: {
      color: "#8BC441",
    },
    shiftWithColor: {
      backgroundColor: "#8BC441",
      color: "#ffffff",
      border: "none",
    },
    shiftWithoutColor: {
      backgroundColor: "#fbfbfb",
      color: "#212121",
    },
  })
);

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: purple[800],
    },
  },
});

export default function Appointmentmain(props) {
  console.log(props);
  let history = useHistory();
  const classes = useStyles();

  const [date, setDate] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  //const [minDate, setMinDate] = useState(Moment().format("YYYY-MM-DD"));
  const [renderShift, setRenderShift] = useState("morning");
  const [timeSlot, setTimeSlot] = useState("");
  const [appointmentMode, setAppointmentMode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState();
  const [consultationType, setConsultationType] = useState(
    DEFAULT_CONSULTATION_TYPE
  );
  const [packageDetails, setPackageDetails] = useState({});

  useEffect(() => {
    var todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + 48 * 60 * 60 * 1000);
    setDate(new Date(todayDate));
  }, []);

  useEffect(() => {
    console.log(props);
    axios
      .get(`consultation-packages/` + props.location.state.packageId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log("package details", res);
        setPackageDetails(res.data.data);
      });
  }, []);

  function handleDateChange(date) {
    console.log("date", date);
    setDate(date);
    // var errorMessage = document.getElementById("successDate");
    // errorMessage.innerHTML = "";
    // console.log(errorMessage);
  }

  // function Alert(props) {
  //   return <MuiAlert elevation={6} variant="filled" {...props} />;
  // }

  function handleRadioChange(e) {
    setConsultationType(e.target.value);
  }

  function handleDayPeriod(period) {
    console.log(period);
    handleColorTheme(period);
  }

  function handleSelectedTimeSlot(selectedTimeSlot) {
    console.log(selectedTimeSlot);
    setTimeSlot(selectedTimeSlot);
    // var errorMessage = document.getElementById("successTime");
    // errorMessage.innerHTML = "";
    // console.log(errorMessage);
  }

  function handleColorTheme(period) {
    // var fetchUnselected = document.getElementsByClassName(
    //   "appoinment_tab_subcontainer"
    // );
    // console.log(typeof fetchUnselected);
    // console.log(fetchUnselected);
    // for (var i = 0; i < fetchUnselected.length; i++) {
    //   console.log(fetchUnselected[i].id);
    //   if (fetchUnselected[i].id != period) {
    //     fetchUnselected[i].style.background = "#fbfbfb";
    //     fetchUnselected[i].style.color = "#212121";
    //   } else {
    //     fetchUnselected[i].style.background = "#8BC441";
    //     fetchUnselected[i].style.color = "#fff";
    //     fetchUnselected[i].style.border = "none";
    //   }
    // }
    setRenderShift(period);
  }

  const handleNotificationClose = () => {
    setShowNotification(false);
    setErrorMsg("");
  };

  function handleDate() {
    console.log("appointment type", consultationType);
    if (consultationType === "offline") {
      if (date !== "" && timeSlot != "") {
        // history.push({
        //   pathname: "/AddressAppointmentMain",
        //   state: {
        //     packageId: props.location.state.packageId,
        //     date: date,
        //     time: timeSlot,
        //     appointmentMode: consultationType,
        //     picture: props.location.state.packagePicture,
        //     packageDetails: packageDetails.details,
        //   },
        // });
        history.push({
          pathname: "/AddressAppointmentMain",
          state: {
            packageId: props.location.state.packageId,
            date: date,
            time: timeSlot,
            appointmentMode: consultationType,
            picture: props.location.state.packagePicture,
            packageName: packageDetails.name,
            packagePrice: packageDetails.price,
            packageDuration: packageDetails.duration,
          },
        });
      } else if (date === "") {
        setErrorMsg("please enter date");
        setShowNotification(true);
      } else {
        setErrorMsg("please enter time");
        setShowNotification(true);
      }
    } else {
      history.push({
        pathname: "/AddressAppointmentMain",
        state: {
          packageId: props.location.state.packageId,
          date: date,
          time: timeSlot,
          appointmentMode: consultationType,
          picture: props.location.state.packagePicture,
          packageName: packageDetails.name,
          packagePrice: packageDetails.price,
          packageDuration: packageDetails.duration,
        },
      });
    }

    // else {
    //   var errorMessage = document.getElementById("successDate");
    //   errorMessage.innerHTML = "please enter date";
    // }
    // alert("Please Select Date & Time");
  }

  // useEffect(() => {
  //   if (checked) {
  //     setDisabled(true);
  //     setRenderShift("");
  //     setTimeSlot("");
  //     setAppointmentMode("online");
  //     handleColorTheme();
  //   } else {
  //     setDisabled(false);
  //     setAppointmentMode("offline");
  //   }
  // }, [checked]);

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

              {/* {consultationType !== DEFAULT_CONSULTATION_TYPE && (
                <>
                  <h6 className="appointmentdate_title">
                    Select Appointment date
                  </h6>

                  <SelectdatePicker
                    dateChange={handleDateChange}
                    minValue={minDate}
                  />
                </>
              )}
              <span
                id="successDate"
                className="enter_text_red_alert"
                style={{ color: "red", fontWeight: 800 }}
              ></span> */}
              {/*         
            <div className="row toggle_container">
            <h6 className="online_text">Online</h6>
            <input type="checkbox" id="switch" /><label className="switch_toggle" for="switch"></label>
            </div> */}

              <div className="row toggle_container">
                {/* <h6 className="online_text">Online Consultation</h6>
                <input
                  onChange={(e) => setChecked(!checked)}
                  type="checkbox"
                  id="switch"
                />
                <label className="switch_toggle" htmlFor="switch"></label> */}
                <FormLabel
                  component="legend"
                  classes={{ root: classes.formLabel }}
                >
                  Select Mode of Consultation
                </FormLabel>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="controlled-radio-buttons-group"
                    value={consultationType}
                    onChange={handleRadioChange}
                    classes={{ root: classes.radioGroupRoot }}
                  >
                    <FormControlLabel
                      value="online"
                      control={<Radio classes={{ root: classes.radioRoot }} />}
                      label="Online Consultation"
                      labelPlacement="start"
                      className={clsx(
                        classes.formLabelRoot,
                        consultationType === "online"
                          ? classes.formLabelRootWithBorder
                          : ""
                      )}
                    />
                    <FormControlLabel
                      value="offline"
                      control={<Radio classes={{ root: classes.radioRoot }} />}
                      label="Consultation for clinic"
                      labelPlacement="start"
                      //classes={{ root: classes.formLabelRoot }}
                      className={clsx(
                        classes.formLabelRoot,
                        consultationType === "offline"
                          ? classes.formLabelRootWithBorder
                          : ""
                      )}
                    />
                  </RadioGroup>
                </FormControl>
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
              <h5 className="timeslot_title">Select Appointment Date & Time</h5>
              {consultationType !== DEFAULT_CONSULTATION_TYPE && (
                <MuiThemeProvider theme={customTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      //label="Date picker dialog"
                      format="dd MMM yyyy"
                      //defaultValue={minDate}
                      value={date}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </MuiThemeProvider>
              )}

              {/* <h6 className="appointmentdate_title">Select Appointment date</h6> */}

              {/* tabs start */}
              {consultationType === DEFAULT_CONSULTATION_TYPE ? (
                <div>
                  <h3 className="heading heading_text_appointmain">
                    You have Selected an online consultation!
                  </h3>
                  <p className="online_details online_details_appointmain">
                    We will get in touch with you via email or whatsapp and
                    schedule the meeting at your convenient time.
                  </p>
                  <p className="online_details online_details_appointmain">
                    Please click “NEXT” to proceed further.
                  </p>
                </div>
              ) : (
                <div className="date_time_container_appointmain">
                  <ul className="nav nav-pills appoinment_tab_container mt-3">
                    <li className="active  mb-1">
                      <button
                        //className="appoinment_tab_subcontainer"
                        id="morning"
                        className={clsx(
                          "appoinment_tab_subcontainer",
                          renderShift === "morning"
                            ? classes.shiftWithColor
                            : classes.shiftWithoutColor
                        )}
                        disabled={disabled}
                        onClick={() => handleDayPeriod("morning")}
                      >
                        Morning
                      </button>
                      <p className="morning_tabs_subtitle">9 AM to 12 PM</p>
                    </li>

                    <li>
                      <button
                        //className=""
                        id="afternoon"
                        disabled={disabled}
                        className={clsx(
                          "appoinment_tab_subcontainer",
                          renderShift === "afternoon"
                            ? classes.shiftWithColor
                            : classes.shiftWithoutColor
                        )}
                        onClick={() => handleDayPeriod("afternoon")}
                      >
                        Afternoon
                      </button>
                      <p className="morning_tabs_subtitle">12 PM to 3 PM</p>
                    </li>

                    <li>
                      <button
                        //className="appoinment_tab_subcontainer"
                        id="evening"
                        className={clsx(
                          "appoinment_tab_subcontainer",
                          renderShift === "evening"
                            ? classes.shiftWithColor
                            : classes.shiftWithoutColor
                        )}
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
                      <span
                        id="successTime"
                        style={{ color: "red", fontWeight: 800 }}
                      ></span>
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
      {
        <Snackbar
          open={showNotification}
          autoHideDuration={6000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          message="Warning"
        >
          <Alert onClose={handleNotificationClose} severity="warning">
            {errorMsg}
          </Alert>
        </Snackbar>
      }
    </div>
  );
}

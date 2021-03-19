import React, { useEffect, useState } from "react";
import "./GrandtotalAppointment.css";
import logo_web from "../../assets/logoweb.png";
import MealchooseWithoutBtn from "../MealchooseWithoutBtn";
import silver_img from "../../assets/silver.jpg";
import { Link } from "react-router-dom";
import axios from "../../axiosInstance";
import Mealchoose from "../Mealchoose.js";

import SelectdatePicker from "../SelectdatePicker";

export default function GrandtotalAppointmentmain(props) {
  console.log(props);
  const [date, setDate] = useState("");

  const [packageDetails, setPackageDetails] = useState({});

  // const [toggleDate, setToggleDate] = useState(true);
  const [extras, setExtras] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);

  useEffect(() => {
    console.log(props);
    axios
      .get(`consultation-packages/` + props.location.state.packageId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPackageDetails(res.data.data);
      });
  }, []);

  return (
    <div className="grand_total_appointment_main">
      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}

      <Mealchoose name="Book an Appointment" />

      <div className="main_container_grandtotalAppointment">
        <div className="card card_user_grandtotalAppointment">
          <div className="row">
            <div className="col-md-5 col-sm-12 silver_container">
              <img
                src={props.location.state.picture}
                alt="silver"
                className="silver_img_grandTotalAppointment"
              ></img>

              <p className="silver_subtitle_grandAppointment">
                {packageDetails.details}
              </p>

              <h6 className="grandTotal_appointmentdate_title">
                Scheduled Appointment date
              </h6>

              <div className="row">
                <div className="col-md-6 col-sm-12 right_side_container">
                  <input
                    type="date"
                    // disabled={toggleDate}
                    value={props.location.state.date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    name="dateofbirth"
                    id="dateofbirth"
                    className="Grandtotal_Appointmentdate_subtitle"
                  ></input>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Link  to={{
                    pathname: "/Appointmentmain",
                    state: {
                    packagePicture :props.location.state.picture,
                    packageId: props.location.state.packageId,
                    packageDetails:packageDetails.details,
                    },
                  }}>
                  <a
                    className="edit_title_grandtotal"

                    // onClick={() => setToggleDate(!toggleDate)} 
                  >
                    Edit
                  </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="vertical_line_appointment_grandtotal"></div>

            <div className="col-md-6 col-sm-6 rightSide_grandtotal">
              <h6 className="cost_breakdown_totalappointment_title">
                Cost Breakdown
              </h6>

              <div className="silverConsultancy_container">
                <p className="silverConsultancy_totalappointment_title">
                  {packageDetails.name}
                </p>
                <h5 className="silverConsultancy_totalappointment_subtitle">
                  {packageDetails.price} BHD
                </h5>
              </div>

              <div className="extra_totalappointment_container">
                <p className="extra_totalappointment_title">Extras</p>
                <h5 className="extra_totalappointment_subtitle">
                  {extras > 0 ? extras : "--"}-- BHD
                </h5>
              </div>

              <div className="taxes_totalappointment_container">
                <p className="taxes_totalappointment_title">Taxes</p>
                <h5 className="taxes_totalappointment_subtitle">
                  {taxAmount > 0 ? taxAmount : "--"} BHD
                </h5>
              </div>

              <div className="row d-flex justify-content-end ">
                <hr className="horizontal_line_grandtotalappointment"></hr>
              </div>

              <div className="grandtotal_totalappointment_container">
                <p className="grandtotal_totalappointment_title">Grand Total</p>
                <h5 className="grandtotal_totalappointment_subtitle">
                  <span className="fifteen_text">{packageDetails.price}</span>{" "}
                  BHD
                </h5>
              </div>

              <div className="btn_payonline_container">
                <Link
                  className=""
                  to={{
                    pathname: "/AddressAppointmentMain",
                    state: {
                      packageId: props.location.state.packageId,
                      packageName: packageDetails.name,
                      packagePrice: packageDetails.price,
                      packageTaxPrice: "--",
                      packageExtraPrice: "--",
                      packageTotalPrice: packageDetails.sale_price,
                      packageDate: props.location.state.date,
                      packageTime: props.location.state.time,
                      packageDuration: packageDetails.duration,
                      packageMode: props.location.state.appointmentMode,
                    },
                  }}
                >
                  <button className="payOnline_btn">PAY ONLINE</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

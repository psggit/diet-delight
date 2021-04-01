import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import axios from "../../axiosInstance";
import Moment from "moment";
import { Link } from "react-router-dom";

export default function ConsultationPkgOrderHistory(props) {
  //let history = useHistory();

  const [consultationPurchases, setconsultationPurchases] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // useEffect(() => {
  //   console.log(props.timePeriod);
  //   if (props.timePeriod < 0) {
  //     var dateTime = new Date();

  //     console.log(dateTime);
  //     var fromDate = addMonths(dateTime, props.timePeriod);
  //     console.log(fromDate);
  //     var toDate = new Date();
  //     if (fromDate > toDate) {
  //       setStartDate(toDate);
  //       setEndDate(fromDate);
  //     } else {
  //       setStartDate(fromDate);
  //       setEndDate(toDate);
  //     }
  //   }
  // }, [props.timePeriod]);

  // function addMonths(date, months) {
  //   date.setMonth(date.getMonth() + months);
  //   return date;
  // }

  useEffect(() => {
    axios
      .get(
        `my-consultation-purchases?fromDate=` +
          startDate +
          `&toDate=` +
          endDate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setconsultationPurchases(res.data.data);
        console.log(res.data.data[0].consultations);
      });
  }, []);

  function handleDateChange(created_at) {
    console.log(created_at);

    var orderDate = new Date(created_at);
    var dd = orderDate.getDate();
    var mm = orderDate.getMonth() + 1;
    var yyyy = orderDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    orderDate = yyyy + "-" + mm + "-" + dd;
    console.log(orderDate);

    return orderDate;
  }

  const renderconsultationpurchase = consultationPurchases.map(
    (consultationPur) => {
      console.log(consultationPur);
      if (consultationPur.consultations.length > 0) {
        return (
          <div className="MealpkgOrderHistory">
            <div className="card consultancy_Meal_plan_container">
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <p className="title_meal_pkg">Consultation Package</p>
                </div>

                <div className="col-md-6 col-xs-12">
                  <div className="menu_booster_container">
                    <p className="menu_pkg_title">Consultation Package:</p>
                    <h6 className="menu_pkg_subtitle">
                      {consultationPur.consultation_package_name}
                    </h6>
                  </div>

                  {consultationPur.consultations["0"].consultation_mode ===
                    0 && (
                    <>
                      <div className="menu_booster_container">
                        <p className="subscriptionplan_title">
                          Date of Appointment:
                        </p>
                        <h6 className="subscriptionplan_subtitle_cons">
                          {Moment(
                            consultationPur.consultations["0"].consultation_time
                          ).format("dd-mm-yyyy hh:mm a")}
                        </h6>
                      </div>
                      <div className="menu_booster_container">
                        <p className="menu_pkg_title">Consultant Name:</p>
                        <h6 className="menu_pkg_subtitle">
                          {consultationPur.consultations["0"].consultant_name}
                        </h6>
                      </div>
                    </>
                  )}

                  {/* <div className="menu_booster_container">
                    <p className="remaining_days_title_cons">
                      Appointment Link:
                    </p>
                    <h6 className="remaining_days_subtitle">
                      {consultationPur.consultations["0"].consultation_time}
                    </h6>
                  </div> */}

                  {/* <div className="menu_booster_container">
                    <p className="address_title">Next Appointment:</p>
                    <h6 className="address_subtitle"></h6>
                  </div> */}

                  <div className="menu_booster_container">
                    <p className="address_title">Mode of Consultation:</p>
                    <h6 className="address_subtitle">
                      {consultationPur.consultations["0"].consultation_mode ===
                      0
                        ? "Offline"
                        : "Online"}
                    </h6>
                  </div>
                </div>
                <div className="vertical_line_OrderHistory"></div>
                <div className="col-md-4 col-xs-12">
                  <div className="right_side_container_orderhistory">
                    <p className="break_title">Order date:</p>
                    <h6 className="break_subtitle">
                      {handleDateChange(consultationPur.created_at)}
                    </h6>
                  </div>

                  <div className="right_side_container_orderhistory">
                    <p className="order_id_title">Order # :</p>
                    <h6 className="order_id_subtitle">{consultationPur.id}</h6>
                  </div>

                  <div className="right_side_container_orderhistory">
                    <p className="cost_title">Cost:</p>
                    <h6 className="cost_subtitle">
                      {consultationPur.amount_paid} BHD
                    </h6>
                  </div>
                  <div className="col-md-3 col-xs-12 btn_container_orderhistory">
                    <Link
                      to={{
                        pathname: "/AppointmentMain",
                        state: {
                          packageId: consultationPur.consultation_package_id,
                          appointmentMode:
                            consultationPur.consultations["0"]
                              .consultation_mode === 0
                              ? "offline"
                              : "online",
                        },
                      }}
                      // state :{
                      //     packageDate: "2021-03-26",
                      //     packageDuration: consultationPur.consultation_package_duration,
                      //     packageExtraPrice: "--",
                      //     packageId: consultationPur.consultation_package_id,
                      //     packageMode: consultationPur.consultations['0'].consultation_mode === 0 ? "Offline" : "Online",
                      //     packageName: consultationPur.consultation_package_name,
                      //     packagePrice: consultationPur.amount_paid,
                      //     packageTaxPrice: "--",
                      //     packageTime: "10:15 AM",
                      //     packageTotalPrice: null
                      // }
                    >
                      <button className="btn btn-default renew_plan_btn_consultion">
                        Review Plan
                      </button>
                      <br></br>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  );

  return <>{renderconsultationpurchase}</>;
}

import React, { useEffect, useState } from "react";
import "../Grand total appointment/GrandtotalAppointment.css";
import MealchooseWithoutBtn from "../MealchooseWithoutBtn";
import "./AddressAppointmentMain.css";
import payment_img from "../../assets/master.jpg";
import axios from "../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import Mealchoose from "../Mealchoose.js";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddressDialogBox from "../Address Appointment/AddressDialogBox";
import AddAddress from "../Dialog/Selection Address Dialog/SelectionAddressMain";
import PrimaryaddDialog from "../Dialog/Primary address Dialog/PrimaryaddDialog";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import Moment from "moment";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/core";

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
      color: "#fff",
      border: "none",
    },
    shiftWithoutColor: {
      backgroundColor: "#fbfbfb",
      color: "#212121",
    },
  })
);
export default function AddressAppointmentMain(props) {
  console.log(props);
  let history = useHistory();
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [user, setUser] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponScheme, setCouponScheme] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);
  const [extraCharge, setExtraCharge] = useState(0);
  const [isProceedingPayment, setIsProceedingPayment] = useState(false);
  const [toggleTextarea, setToggleTextarea] = useState(true);
  const [dateTime, setDateTime] = useState([]);

  const [changeAddressData, setChangeAddressData] = useState(false);
  const [selectAddress, setSelectedAddress] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("online");

  const [addAddressData, setAddAddressData] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);

  function handleAddress(data) {
    console.log(data);
    setSelectedAddress(data);
    var changeAddress = document.getElementById("w3review");
    let primaryAddress =
      user.primary_address_line1 === null || user.primary_address_line1 === ""
        ? " "
        : user.primary_address_line1 +
          " " +
          (user.primary_address_line2 === null ||
          user.primary_address_line2 === ""
            ? " "
            : user.primary_address_line2);
    let secondaryAddress =
      user.secondary_address_line1 === null ||
      user.secondary_address_line1 === ""
        ? ""
        : user.secondary_address_line1 +
          " " +
          (user.secondary_address_line2 == null ||
          user.secondary_address_line2 === ""
            ? " "
            : user.secondary_address_line2);
    let addressValue =
      data === "primary_address" ? primaryAddress : secondaryAddress;
    changeAddress.value = addressValue;
  }

  function handleChangeAdrress(data) {
    if (data === true) {
      setChangeAddressData(true);
    } else {
      setChangeAddressData(false);
    }
  }

  function handleAddAddress(data) {
    setChangeAddressData(false);
    setSelectedAddress(data);
    if (data) {
      setAddAddressData(true);
    } else {
      setAddAddressData(false);
    }
  }

  function handleUserData() {
    setChangeAddressData(true);
    console.log("meet");
  }

  console.log(props);

  useEffect(() => {
    if (props.location.state.packageMode === "online") {
      var disableOfflineMode = document.getElementById("clinic");
      console.log(disableOfflineMode);
      disableOfflineMode.disabled = true;
      var selectOnlineMode = document.getElementById("online");
      console.log(selectOnlineMode);
      selectOnlineMode.checked = "checked";
      setSelectedPaymentMode("online");
    }
    setSelectedPaymentMode("online");
  }, [props.location.state.packageMode]);

  useEffect(() => {
    if (changeAddressData) {
      axios
        .get("user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          console.log(res.data.primary_address_line1);
          setAddress(
            user.primary_address_line1 === null ||
              user.primary_address_line2 === null
              ? " "
              : user.primary_address_line1 + " " + user.primary_address_line2
          );
        });
    }
  }, [changeAddressData]);

  useEffect(() => {
    setTotalCharge(parseInt(props.location.state.packagePrice));
    console.log(props.location.state.packagePrice);
    console.log(totalCharge);
    axios
      .get("user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        console.log(res.data.primary_address_line1);
        setAddress(
          user.primary_address_line1 === null ||
            user.primary_address_line2 === null
            ? " "
            : user.primary_address_line1 + " " + user.primary_address_line2
        );
      });
  }, [props.location.state.packagePrice]);

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
    if (discountAmount > 0 || taxAmount > 0 || extraCharge > 0) {
      totalChargeUpdated =
        totalCharge + taxAmount + extraCharge - discountAmount;
      setTotalCharge(totalChargeUpdated);
    }
  }, [discountAmount, taxAmount, extraCharge]);

  function checkCoupon(code) {
    console.log(coupon === code.code);
    return coupon === code.code;
  }

  useEffect(() => {
    console.log(props, props.location.state.date, props.location.state.time);
    var dateTime = new Date(props.location.state.date);
    var hour = "";
    var minutes = "";
    console.log(dateTime);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var date = dateTime.getDate();
    console.log("called");

    console.log(year, month, date);

    if (props.location.state.time) {
      var time = props.location.state.time;

      var timeFormated = time.split(" ");
      if (timeFormated[1] === "AM") {
        var timeFormat = timeFormated[0].split(":");
        hour = timeFormat[0];
        minutes = timeFormat[1];
      } else {
        var timeFormat = timeFormated[0].split(":");
        hour = timeFormat[0] + 12;
        minutes = timeFormat[1];
      }
      console.log(hour, minutes);
    } else {
      hour = dateTime.getHours();
      minutes = dateTime.getMinutes();
    }

    setDateTime(year + "-" + month + "-" + date + " " + hour + ":" + minutes);
    console.log(setDateTime);

    var newDate = new Date(year, month - 1, date, hour, minutes);
    console.log(newDate);
  }, [props.location.state.date, props.location.state.time]);

  // const handlePayment = () => {
  //   history.push("/orderHistory");
  // };

  const makeAddAddress = (addressData) => {
    let payload;
    if (selectAddress.includes("primary")) {
      payload = {
        primary_address_line1: addressData.address,
        primary_address_line2: addressData.locality,
      };
    } else {
      payload = {
        secondary_address_line1: addressData.address,
        secondary_address_line2: addressData.locality,
      };
    }
    setAddingAddress(true);

    axios
      .put(`user`, payload)
      .then((response) => {
        setAddAddressData(false);
        setChangeAddressData(true);
        setAddingAddress(false);
        handleAddress(selectAddress);
      })
      .catch((error) => {
        setAddingAddress(false);
        setShowNotification(true);
        setMessageType("error");
        setErrorMsg("Something went wrong, try againg later");
        console.log("error in adding address", error);
      });
    //}
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setErrorMsg("");
    setMessageType("");
  };

  const proceedPayment = () => {
    console.log(
      props,
      props.location.state.packageId,
      props.location.state.packageName,
      props.location.state.packageDuration,
      props.location.state.packagePrice
    );
    setIsProceedingPayment(true);
    axios
      .post(`my-consultation-purchases`, {
        user_id: user.user_id,
        consultation_package_id: props.location.state.packageId,
        payment_id: selectedPaymentMode === "online" ? 12345 : 0,
        status: 0,
        billing_address_line1: user.primary_address_line1,
        billing_address_line2: "",
        consultation_package_name: props.location.state.packageName,
        consultation_package_duration: props.location.state.packageDuration,
        amount_paid: props.location.state.packagePrice,
      })
      .then((res) => {
        console.log(res);
        axios
          .post("my-consultations", {
            consultation_purchase_id: res.data.data.id,
            consultant_id: res.data.data.consultation_package_id,
            status: 0,
            consultation_link: "",
            consultation_time: dateTime,
            consultation_mode:
              props.location.state.appointmentMode === "offline" ? 0 : 1,
            consultant_name: "Not Assigned",
            notes: "",
          })
          .then((res) => {
            console.log(res);
            setIsProceedingPayment(false);
            setShowNotification(true);
            setErrorMsg("Consultation package purchased successfully");
            setMessageType("success");
            setTimeout(() => {
              history.push("/orderHistory");
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
            setIsProceedingPayment(false);
            setShowNotification(true);
            setErrorMsg("Something went wrong");
            setMessageType("error");
          });
      })
      .catch((err) => {
        console.log(err);
        setShowNotification(true);
        setIsProceedingPayment(false);
        setErrorMsg("Something went wrong");
        setMessageType("error");
      });
  };

  const handlePaymentModeChange = (e) => {
    setSelectedPaymentMode(e.target.value);
  };

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
            errorMessage.innerHTML = "Coupon Code Expired";
            console.log(errorMessage);

            setCoupon("");
          } else {
            var errorMessage = document.getElementById("successCoupon");
            errorMessage.innerHTML = "Coupon applied Successfully";
            errorMessage.style.color = "green";
            console.log(errorMessage);

            console.log(res.data.data[verifyCoupon]);
            setCouponScheme(res.data.data[verifyCoupon]);
          }
        } else {
          var errorMessage = document.getElementById("successCoupon");
          errorMessage.innerHTML = "Invalid Coupon";
          console.log(errorMessage);
        }
        console.log(couponScheme);
      })
      .catch((err) => console.log(err));
  };

  // function handleTextArea(e){
  //     setPrimaryAddress()
  // }

  console.log("props", props);

  return (
    <div className="address_appointment_container">
      {changeAddressData && (
        <PrimaryaddDialog
          changeAddressBox={changeAddressData}
          makeAddressBox={handleChangeAdrress}
          makeAddAddressBox={handleAddAddress}
          userData={user}
          makeChangeAdderess={handleAddress}
        />
      )}
      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}
      {/* <AddressDialogBox
                          changeAddressBox={changeAddressData} 
                          makeAddAddressBox={handleAddAddress}
                         userData ={user}
                         makeAddAdderess={handleAddAddress}

                        /> */}

      {addAddressData && (
        <AddAddress
          makeAddAddressBox={handleAddAddress}
          userData={user}
          addressType={selectAddress}
          makeAddAddress={makeAddAddress}
          addingAddress={addingAddress}
        />
      )}
      <Mealchoose name="Book an Appointment" />
      <div className="address_appointment_main_container">
        <div className="card card_user_addressAppointment">
          <div className="row">
            <div className="col-md-5 col-sm-12 silver_container">
              <div className="title">
                <h4 className="shipping_title">Billing Address</h4>
                <h6
                  className="change_text_adressAppointment"
                  // onClick={() => setToggleTextarea(!toggleTextarea)}
                  onClick={handleUserData}
                >
                  Change
                </h6>
              </div>
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <textarea
                    id="w3review"
                    defaultValue={user.primary_address_line1}
                    placeholder="Enter Address"
                    disabled
                    name="w3review"
                    rows="2"
                    cols="20"
                    className="textarea_addressAppoinment"
                  ></textarea>
                </div>
              </div>

              {/* <h6 className="address_card_title">{user.address}</h6> */}

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
                    style={{ color: "red", fontWeight: 800 }}
                  ></span>
                </div>
              </div>

              {props.location.state.appointmentMode !== "online" && (
                <div>
                  <h5 className="payment_text_title">Payment</h5>
                  <FormControl component="fieldset">
                    <RadioGroup
                      name="controlled-radio-buttons-group"
                      value={selectedPaymentMode}
                      onChange={handlePaymentModeChange}
                      classes={{ root: classes.radioGroupRoot }}
                    >
                      <FormControlLabel
                        value="online"
                        control={
                          <Radio classes={{ root: classes.radioRoot }} />
                        }
                        label="Pay online"
                        labelPlacement="start"
                        className={clsx(
                          classes.formLabelRoot,
                          selectedPaymentMode === "online"
                            ? classes.formLabelRootWithBorder
                            : ""
                        )}
                      />
                      <FormControlLabel
                        value="offline"
                        control={
                          <Radio classes={{ root: classes.radioRoot }} />
                        }
                        label="Pay at clinic"
                        labelPlacement="start"
                        //classes={{ root: classes.formLabelRoot }}
                        className={clsx(
                          classes.formLabelRoot,
                          selectedPaymentMode === "offline"
                            ? classes.formLabelRootWithBorder
                            : ""
                        )}
                      />
                    </RadioGroup>
                  </FormControl>
                  {/* <label
                    htmlFor="online"
                    className="online_clinic_text_submeal"
                  >
                    Pay at clinic
                  </label>
                  <input
                    type="radio"
                    className="male_clinic_input_submeal "
                    id="clinic"
                    name="clinic"
                    value="offline"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedPaymentMode("offline")}
                  ></input>
                  <span className="checkmark"></span> <br></br>
                  <label
                    htmlFor="online"
                    className="online_clinic_text_submeal"
                  >
                    Pay Online
                  </label>
                  <input
                    type="radio"
                    className="male_clinic_input_submeal "
                    id="online"
                    name="online"
                    value="online"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedPaymentMode("online")}
                  ></input>
                  <span className="checkmark"></span> */}
                </div>
              )}
            </div>

            <div className="vertical_line_addressAppointment"></div>

            <div className="col-md-6 col-sm-6">
              <div className="card_payment_container">
                <div className="card payment_card">
                  <img
                    src={payment_img}
                    alt="payment_img"
                    className="payment_img_AddressAppointment"
                  ></img>
                </div>
                <h6 className="change_in_title_payment">Change</h6>
              </div>

              <h6 className="cost_breakdown_totalappointment_title">
                Cost Breakdown
              </h6>

              <div className="silverConsultancy_container">
                <p className="silverConsultancy_totalappointment_title">
                  {props.location.state.packageName}
                </p>
                <h5 className="silverConsultancy_totalappointment_subtitle">
                  {props.location.state.packagePrice} BHD
                </h5>
              </div>

              {props.location.state.appointmentMode !== "online" && (
                <h6 className="appointment_subtitle_text_date">
                  <b>First Appointment - </b> {props.location.state.time} ,{" "}
                  {Moment(props.location.state.date).format("DD MMM YYYY")}
                </h6>
              )}

              <div className="extra_totalappointment_container">
                <p className="extra_totalappointment_title">Extras</p>
                <h5 className="extra_totalappointment_subtitle">
                  {extraCharge} BHD
                </h5>
              </div>

              <div className="taxes_totalappointment_container">
                <p className="taxes_totalappointment_title">Taxes</p>
                <h5 className="taxes_totalappointment_subtitle">
                  {taxAmount > 0 ? taxAmount : "--"} BHD
                </h5>
              </div>

              <div className="taxes_totalappointment_container">
                <p className="taxes_totalappointment_title">Discount</p>
                <h5 className="taxes_totalappointment_subtitle">
                  {discountAmount > 0 ? discountAmount : "--"} BHD
                </h5>
              </div>

              <div className="row d-flex justify-content-end ">
                <hr className="horizontal_line_grandtotalappointment"></hr>
              </div>

              <div className="grandtotal_totalappointment_container">
                <p className="grandtotal_totalappointment_title">Grand Total</p>
                <h5 className="grandtotal_totalappointment_subtitle">
                  <span className="fifteen_text">{totalCharge}</span> BHD
                </h5>
              </div>

              <div className="row btn_payonline_container">
                <button
                  className="payOnline_btn_address"
                  onClick={proceedPayment}
                  disabled={isProceedingPayment}
                >
                  {selectedPaymentMode === "online"
                    ? "PAY ONLINE"
                    : "BOOK APPOINTMENT"}
                </button>
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
          message={messageType}
        >
          <Alert onClose={handleNotificationClose} severity={messageType}>
            {errorMsg}
          </Alert>
        </Snackbar>
      }
    </div>
  );
}

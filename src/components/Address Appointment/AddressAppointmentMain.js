import React, { useEffect, useState } from "react";
import "../Grand total appointment/GrandtotalAppointment.css";
import MealchooseWithoutBtn from "../MealchooseWithoutBtn";
import "./AddressAppointmentMain.css";
import payment_img from "../../assets/master.jpg";
import axios from "../../axiosInstance";
import { Link, useHistory } from "react-router-dom";
import Mealchoose from "../Mealchoose.js";
import AddressDialogBox from '../Address Appointment/AddressDialogBox'

export default function AddressAppointmentMain(props) {
  console.log(props)
  let history = useHistory();
  const [address, setAddress] = useState("");
  const [user, setUser] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponScheme, setCouponScheme] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);
  const [extraCharge, setExtraCharge] = useState(0);
  const [toggleTextarea, setToggleTextarea] = useState(true);
  const [dateTime, setDateTime] = useState([]);
      
  const [changeAddressData,setChangeAddressData] = useState(false) 
  const [selectAddress,setSelectedAddress] = useState("")

  function handleAdrress(data){
    console.log(data)
    setSelectedAddress(data)

  } 

  function handleChangeAdrress(data){
      if(data === true){
          setChangeAddressData(true)
          }else{
          setChangeAddressData(false) 
      }
       
  }  

  function handleUserData(){
      setChangeAddressData(true)
      console.log("meet")
  
 
  }

  console.log(props);
  useEffect(() => {
    setTotalCharge(parseInt(props.location.state.packagePrice));
    console.log(props.location.state.packagePrice);
    console.log(totalCharge);
    axios
      .get('user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        setAddress(res.data.primary_address_line1);
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
  //   props.location.state.packageDate + ' ' + props.location.state.packageTime,
  useEffect(() => {
    console.log(
      props.location.state.packageDate, 
      props.location.state.packageTime
    );
    var dateTime = new Date(props.location.state.packageDate);
    var hour ='';
    var minutes = '';
    console.log(dateTime)
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var date = dateTime.getDate();
    console.log("called")

    console.log(year, month, date); 



    var time = props.location.state.packageTime;
     
    var timeFormated = time.split(' ');
    if(timeFormated[1] === 'AM'){
      var timeFormat = timeFormated[0].split(":");
      hour = timeFormat[0];
      minutes = timeFormat[1];
    }else{
      var timeFormat = timeFormated[0].split(":");
      hour = timeFormat[0] + 12;
      minutes = timeFormat[1];
    }
    console.log(hour,minutes)


var newDate = new Date(year, month - 1, date, hour, minutes);
    console.log(newDate);
  },[props.location.state.packageDate, props.location.state.packageTime]);

  const proceedPayment = () => {
    console.log(
      props.location.state.packageId,
      props.location.state.packageName,
      props.location.state.packageDuration,
      props.location.state.packagePrice
    );
    axios
      .post(`my-consultation-purchases`, {
        user_id: user.user_id,
        consultation_package_id: props.location.state.packageId,
        payment_id: 12345,
        status: 0,
        billing_address_line1: address,
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
            consultant_id: 0,
            status: 0,
            consultation_link: "",
            consultation_time: dateTime,
            consultation_mode:
              props.location.state.packageMode === "offline" ? "0" : "1",
            consultant_name: "Not Assigned",
            notes: "",
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        history.push("/");
      })
      .catch((err) => console.log(err));
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
            var errorMessage = document.getElementById('successCoupon');
            errorMessage.innerHTML = 'Coupon Code Expired';
            console.log(errorMessage)
            
            setCoupon("");
          } else {
            var errorMessage = document.getElementById('successCoupon');
            errorMessage.innerHTML = 'Coupon applied Successfully';
            console.log(errorMessage)
           
            console.log(res.data.data[verifyCoupon]);
            setCouponScheme(res.data.data[verifyCoupon]);
          }
        } else {
          var errorMessage = document.getElementById('successCoupon');
          errorMessage.innerHTML = 'Invalid Coupon';
          console.log(errorMessage)
          
        }
        console.log(couponScheme);
      })
      .catch((err) => console.log(err));
  };

  // function handleTextArea(e){
  //     setPrimaryAddress()
  // }

  return (
    <div className="address_appointment_container">
      {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}
      <AddressDialogBox
                          changeAddressBox={changeAddressData} 
                         makeAddressBox={handleChangeAdrress}
                         userData ={user}
                         makeChangeAdderess={handleAdrress}

                        />

      <Mealchoose name="Book an Appointment" />

      <div className="address_appointment_main_container">
        <div className="card card_user_addressAppointment">
          <div className="row">
            <div className="col-md-5 col-sm-12 silver_container">
              <h5 className="shipping_title">Shipping Address</h5>

<div className="row">
                <div className="col-md-8 col-sm-12">
                  <textarea
                    id="w3review"
                  
                    defaultValue={user.primary_address_line1}
                    placeholder="Enter Address"
                  
                    name="w3review"
                    rows="2"
                    cols="20"
                    className="textarea_addressAppoinment"
                  >{selectAddress === "primary_address" ? user.primary_address_line1 : user.secondary_address_line2}</textarea>
                </div>
                <div className="col-md-4 col-sm-12">
                  <h6
                    className="change_text_adressAppointment"
                    // onClick={() => setToggleTextarea(!toggleTextarea)}
                    onClick={handleUserData}
                  >
                    Change
                  </h6>
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
                  <span id="successCoupon" style={{color:'red', fontWeight:800}}></span>
                </div>
              </div>

              <h5 className="payment_text_title">Payment</h5>

               <div className="online_clinic_container ">
                <label htmlFor="online" className="online_clinic_text_submeal">
                 Pay at clinic
                </label>
                <input
                  type="radio"
                  className="male_clinic_input_submeal "
                  id="clinic"
                  name="clinic"
                  value="online"
                  style={{ cursor: "pointer" }}
                ></input>
                <span className="checkmark"></span> <br></br>
                <label htmlFor="online" className="online_clinic_text_submeal">
                 Pay Online
                </label>
                <input
                  type="radio"
                  className="male_clinic_input_submeal "
                  id="clinic"
                  name="clinic"
                  value="online"
                  style={{ cursor: "pointer" }}
                ></input>
                <span className="checkmark"></span>
              </div>



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
            </div>

            <div className="vertical_line_addressAppointment"></div>

            <div className="col-md-6 col-sm-6">
              <h6 className="cost_breakdown_totalappointment_title">
                Cost Breackdown
              </h6>

              <div className="silverConsultancy_container">
                <p className="silverConsultancy_totalappointment_title">
                  {props.location.state.packageName}
                </p>
                <h5 className="silverConsultancy_totalappointment_subtitle">
                  {props.location.state.packagePrice} BHD
                </h5>
              </div>
              <h6 className="appointment_subtitle_text_date">
                First Appointment - {props.location.state.packageTime} ,{" "}
                {props.location.state.packageDate}
              </h6>

              <div className="extra_totalappointment_container">
                <p className="extra_totalappointment_title">Extras</p>
                <h5 className="extra_totalappointment_subtitle">
                  {extraCharge} BHD
                </h5>
              </div>

              <div className="taxes_totalappointment_container">
                <p className="taxes_totalappointment_title">Taxes</p>
                <h5 className="taxes_totalappointment_subtitle">
                  {taxAmount} BHD
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
                >
                  PAY ONLINE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
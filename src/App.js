import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Cookies } from "react-cookie";

import axios from "./axiosInstance";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import LandingPage from "./components/Landing_Page";
import AdminDash from "./components/Admin";
import Consultant from "./components/Consultant";
import Accountant from "./components/Accountant";
import Kitchen from "./components/Kitchen";

import { login } from "./features/userSlice";
import { setToken } from "./features/tokenSlice";

import { useDispatch } from "react-redux";

// import DietDataDetails from './components/Diet_Free_Data/index';


import MealpkgSubscription from "./components/MealPackageSubsciption/MealpkgSubscription";
import SelectMealPlan from "./components/Select Meal Plan/SelectMealPlan";
import PaymentPlan from "./components/PaymentPlan/PaymentPlan";
import MenuPkg from "./components/Menu Package/MenuPkg";
import OrderHistory from "./components/Order History/OrderHistory.js";
import Appointmentmain from "./components/Appointment/Appoinmentmain";
import GrandtotalAppointmentmain from "./components/Grand total appointment/GrandtotalAppointmentmain.js";
import AddressAppointmentMain from "./components/Address Appointment/AddressAppointmentMain";
import UserDashboardMain from "./components/User Dashboard/UserDashboardMain";
import MealAddressMain from "./components/Meal Address/MealAddressMain";
import FavouriteMain from "./components/Favourite/FavouriteMain";
import OngoingMain from "./components/Ongoing Meal Plan/OngoingMain"; 
import BmiMain from "./components/BMI/BmiMain";
import Bmireport from "./components/BMI Report/Bmireport";
import ConatctUsMain from "./components/Contact Us/ConatctUsMain";
import ChangePassword from "./components/Auth/ResetChangePassword/ChangePassword";
import AddressDialogBox from "./components/Address Appointment/AddressDialogBox";
import AddressDialogBoxDropDown from "./components/Address Appointment/AddressDialogBoxDropDown";
import OtpDialogBox from "./components/Auth/OtpDialog";
import Blogs from "./components/Blogs/Blogs";
import Termcondition from "./components/Terms and Condition/Termcondition";
import Termconditioncontent from "./components/Term condition content/Termconditioncontent";
import PrimaryaddDialog from "./components/Dialog/Primary address Dialog/PrimaryaddDialog.js";
import SelectandAddMain from "./components/Dialog/Select and Add dialog/SelectandAddMain.js";
import SelectionAddressMain from "./components/Dialog/Selection Address Dialog/SelectionAddressMain.js";
import SelectionCalenderMain from "./components/Dialog/Selection Calender Dialog/SelectionCalenderMain.js";
import CalenderDialogMain from "./components/Dialog/Calender Dialog/CalenderDialogMain";
import About from "./components/Our story page/About";
import ImportMenu from './components/Admin/Menu/ImportMenu';


function App() {
  let cookie = new Cookies();
  let dispatch = useDispatch();
  let gettingcookie = cookie.get("access_token");

  useEffect(() => {
    const ac = new AbortController();

    dispatch(
      setToken({
        access_token: gettingcookie,
      })
    );

    return () => ac.abort();
  }, [dispatch, gettingcookie]);

  useEffect(() => {
    const ac = new AbortController();

    axios
      .get("user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        dispatch(
          login({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            mobile: res.data.mobile,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
          })
        );
      })
      .catch((err) => console.log(err));

    return () => ac.abort();
  }, [dispatch]);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar isOpen={isOpen} toggle={toggle} />
          <Sidebar isOpen={isOpen} toggle={toggle} />
          <LandingPage />
        </Route>

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" exact component={AdminDash} />
        <Route path="/consultant" exact component={Consultant} />
        <Route path="/kitchen" exact component={Kitchen} />
        <Route path="/accountant" exact component={Accountant} />

        {/* <Route path="/DietDataDetails" exact component={DietDataDetails} /> */}
        <Route
          path="/MealpkgSubscription"
          exact
          component={MealpkgSubscription}
        />
        <Route path="/MealAddressMain" exact component={MealAddressMain} />
        <Route path="/PaymentPlan" exact component={PaymentPlan} />
        <Route path="/SelectMealPlan" exact component={SelectMealPlan} />
        <Route path="/Appointmentmain" exact component={Appointmentmain} />
        <Route
          path="/GrandtotalAppointmentmain"
          exact
          component={GrandtotalAppointmentmain}
        />
        <Route
          path="/AddressAppointmentMain"
          exact
          component={AddressAppointmentMain}
        />
        <Route path="/OrderHistory" exact component={OrderHistory} />
        <Route path="/MenuPkg" exact component={MenuPkg} />
        <Route path="/UserDashboardMain" exact component={UserDashboardMain} />
        <Route path="/FavouriteMain" exact component={FavouriteMain} />
        <Route path="/OngoingMain" exact component={OngoingMain} />
        <Route path="/BmiMain" exact component={BmiMain} />
        <Route path="/Bmireport" exact component={Bmireport} />
        <Route path="/ConatctUsMain" exact component={ConatctUsMain} />
        <Route path="/ChangePassword" exact component={ChangePassword} />
        <Route path="/AddressDialogBox" exact component={AddressDialogBox} />
        <Route
          path="/AddressDialogBoxDropDown"
          exact
          component={AddressDialogBoxDropDown}
        />
        <Route path="/otpVerification" exact component={OtpDialogBox} />
        <Route path="/Blogs" exact component={Blogs} />
        <Route path="/Termcondition" exact component={Termcondition} />
        <Route
          path="/Termconditioncontent"
          exact
          component={Termconditioncontent}
        />

        <Route path="/PrimaryaddDialog" exact component={PrimaryaddDialog} />
        <Route
          path="/SelectionAddressMain"
          exact
          component={SelectionAddressMain}
        />
        <Route path="/SelectandAddMain" exact component={SelectandAddMain} />
        <Route
          path="/CalenderDialogMain"
          exact
          component={CalenderDialogMain} 
        />
        <Route
          path="/SelectionCalenderMain"
          exact
          component={SelectionCalenderMain}
        />
        <Route path="/About" exact component={About} />
        <Route path='/                                                                                                                                                  ' exact component={ImportMenu}/>
    
      </Switch>
    </Router>
  );
}

export default App;

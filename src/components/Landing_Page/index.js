import React, { useState, useEffect } from "react";

import Home from "./Home";
import Mealplan from "./Mealplan";
import MealPackage from "./Menupackage";
import Feature from "./Feature";
import Expert from "./Expert";
import Work from "./Work";
import Rating from "./Rating";
import Downlaod from "./download";
import Footer from "./Footer";
import axios from "../../axiosInstance";
import DietDataDetails from "../Diet_Free_Data";
import BmiMain from "../BMI/BmiMain";
import Bmireport from "../BMI Report/Bmireport";

import ConfirmDialog from "./ConfirmDialog";

const LandingPage = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [bmiReport, setBMIReport] = useState({});
  const [toggleBMI, setToggleBMI] = useState(false);
  const [toggleBMIReport, setToggleBMIReport] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const toggleBMIReportVisibility = (
    BmiScore,
    heightInMeter,
    category,
    calorieInTake
  ) => {
    setToggleBMI(false);
    setBMIReport({
      BmiScore: BmiScore,
      heightInMeter: heightInMeter,
      category: category,
      calorieInTake: calorieInTake,
    });
    setToggleBMIReport(true);
  };
  const toggleReport = () => {
    setToggleBMI(false);
    setToggleBMIReport(false);
  };

  const closeBMI = () => {
    setShowQuestion(false);
    console.log("handled update");
    if (toggleBMI === true) {
      setToggleBMI(false);
    } else {
      setToggleBMI(true);
    }
  };

  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem("access_token");
    if (!ACCESS_TOKEN) return;
    axios
      .get("user", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        console.log("Response : ", res);
        console.log(res.data);
        setUserInfo(res.data);
        if (res.data.questionnaire_status === 0) {
          setShowQuestion(true);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  function handleCancel() {
    console.log("meet");
    setShowQuestion(false);
  }
  return (
    <>
      {showQuestion && (
        <DietDataDetails
          open={showQuestion}
          handleCancel={handleCancel}
          closeBMI={closeBMI}
        />
      )}
      {/* {toggleBMI && (
        <BmiMain
          closeBMI={closeBMI}
          toggleReportBMI={toggleBMIReportVisibility}
        />
      )} */}
      {/* {toggleBMIReport && (
        <Bmireport bmiReport={bmiReport} toggleReport={toggleReport} />
      )} */}
      <Home />
      <MealPackage />
      <Mealplan setOpenConfirmDialog={setOpenConfirmDialog} />
      <Feature setOpenConfirmDialog={setOpenConfirmDialog} />
      <Expert setOpenConfirmDialog={setOpenConfirmDialog} />
      <Work />
      <Rating />
      <Downlaod />
      <Footer />
      <ConfirmDialog open={openConfirmDialog} setOpen={setOpenConfirmDialog} />
    </>
  );
};

export default LandingPage;

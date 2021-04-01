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

import ConfirmDialog from "./ConfirmDialog";

const LandingPage = () => {
  const [showQuestion, setShowQuestion] = useState(true);
  // const [userInfo, setUserInfo] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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
        console.log("Response : ", res.data);
        // console.log(res.data);
        // setUserInfo(res.data);
        if (res.data.questionnaire_status === 0) {
          setShowQuestion(true);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  return (
    <>
      {showQuestion && (
        <DietDataDetails
          open={showQuestion}
          handleCancel={() => setShowQuestion(false)}
        />
      )}
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

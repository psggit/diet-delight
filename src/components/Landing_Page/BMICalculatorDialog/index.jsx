import React, {  useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import BMICalculator from "../../Diet_Free_Data/BMICalculator";
import BMIResult from "../../Diet_Free_Data/BMIResult";
import axiosInstance from "../../../axiosInstance";

const useStyles = makeStyles({
  contentRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  paper: {
    borderRadius: 20,
    maxWidth: "800px",
    width: "800px",
  },
  iconBtn: {
    backgroundColor: "purple",
    color: "white",
    "&:hover": {
      background: "white",
      color: "purple",
      boxShadow: "0 2px 4px purple",
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#303960",
    },
  },
});

const BMICalculatorDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  //   0--> calculate  1 --> result
  const [step, setStep] = useState(0);
  const [BMIData, setBMIData] = useState({
    height: 120,
    weight: 40,
    age: 16,
    gender: "",
  });

  const [BMICalculatedResult, setBMICalculatedResult] = useState({
    BMIScore: 0,
    calorieInTake: 0,
    category: "",
  });

  const calculateBMI = () => {
    const { gender, height, weight } = BMIData;
    let heightInMeter = height / 100;
    let BmiScoreWithoutFixDecimal = weight / (heightInMeter * heightInMeter);
    let BmiScore = BmiScoreWithoutFixDecimal.toFixed(1);
    let calorieInTake = null;
    let category = "";
    console.log(heightInMeter, BmiScore);
    if (BmiScore < 18.5) {
      category = "Under Weight";
      if (gender === "male") {
        calorieInTake = 1800;
      } else {
        calorieInTake = 1600;
      }
      console.log(calorieInTake);
      sendBMIReportToServer(BmiScore, heightInMeter, category, calorieInTake);
    } else if (BmiScore >= 18.5 && BmiScore <= 24.9) {
      category = "Normal Weight";
      if (gender === "male") {
        calorieInTake = 1400;
      } else {
        calorieInTake = 1200;
      }
      console.log(calorieInTake);
      sendBMIReportToServer(BmiScore, heightInMeter, category, calorieInTake);
    } else if (BmiScore >= 25 && BmiScore <= 29.9) {
      category = "OverWeight";
      if (gender === "male") {
        calorieInTake = 1400;
      } else {
        calorieInTake = 1200;
      }
      console.log(calorieInTake);
      sendBMIReportToServer(BmiScore, heightInMeter, category, calorieInTake);
    } else {
      category = "Obesity";
      if (gender === "male") {
        calorieInTake = 1600;
      } else {
        calorieInTake = 1400;
      }
      console.log(calorieInTake);
      sendBMIReportToServer(BmiScore, heightInMeter, category, calorieInTake);
    }
  };

  const sendBMIReportToServer = async (
    BmiScore,
    heightInMeter,
    category,
    calorieInTake
  ) => {
    let genderInNumber = BMIData.gender === "male" ? 0 : 1;
    let bmiInString = BmiScore.toString();
    let calorieInTakeString = calorieInTake.toString();
    console.log("AA : ", BmiScore, heightInMeter, category, calorieInTake);
    setBMICalculatedResult({
      ...BMICalculatedResult,
      BMIScore: BmiScore,
      calorieInTake: calorieInTake,
      category: category,
    });

    try {
      // For BMI Result
      const BMIResponse = await axiosInstance.put("user", {
        age: BMIData.age,
        gender: genderInNumber,
        bmi: bmiInString,
        recommended_calories: calorieInTakeString,
      });

      console.log("BMI Response : ", BMIResponse.data);
    } catch (error) {
      console.log("Submit BMI Error : ", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{
            paper: classes.paper,
          }}
        >
          {/* questions_dialog_bg ::: from src\components\Diet_Free_Data\index.css */}
          <div className="questions_dialog_bg">
            <DialogContent
              classes={{
                root: classes.contentRoot,
              }}
            >
              {step === 0 && (
                <BMICalculator BMIData={BMIData} setBMIData={setBMIData} />
              )}
              {step === 1 && <BMIResult bmiReport={BMICalculatedResult} />}

              <div
                style={{
                  display: "flex",
                  justifyContent: step === 0 ? "flex-end" : "space-between",
                }}
              >
                {step === 1 && (
                  <IconButton
                    onClick={() => setStep(step - 1)}
                    className={classes.iconBtn}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => {
                    if (step === 0) {
                      setStep(step + 1);
                      calculateBMI();
                    } else {
                      handleClose();
                    }
                  }}
                  className={classes.iconBtn}
                >
                  <DoneAllIcon />
                </IconButton>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default BMICalculatorDialog;

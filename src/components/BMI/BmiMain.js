import React,{useState, useEffect} from 'react'
import './BMiMain.css'
import BmiQueandTextfield from './BmiQueandTextfield'
// import { Link ,useHistory} from 'react-router-dom';
import axios from '../../axiosInstance';


export default function BmiMain(props){

    const[height,setHeight] = useState(0);
    const[weight,setWeight] = useState(0);
    const[age,setAge] = useState(0);
    const[gender,setGender] = useState(0);

    const validateOnlyNumeric = (data, relatedTo) => {

        console.log(data, relatedTo)
        var numeric = '^[0-9]*$'
        if(data.match(numeric)){
            if(relatedTo === 'weight'){
                setWeight(data)
            }else if(relatedTo === 'height'){
                setHeight(data)
            }else{
                setAge(data)
            }
        }
    }

    const calculateBMI = () => {
        let heightInMeter = height/100;
        let BmiScoreWithoutFixDecimal = weight/(heightInMeter * heightInMeter);
        let BmiScore = BmiScoreWithoutFixDecimal.toFixed(1);
        let calorieInTake = null;
        let category = '';
        console.log(heightInMeter, BmiScore)
        if(BmiScore < 18.5){
            category = 'Under Weight';
            if(gender === 'male'){
                calorieInTake = 1800;
            }else{
                calorieInTake = 1600;
            }
            console.log(calorieInTake)
        handleNavigation(BmiScore,heightInMeter,category, calorieInTake)

        }else if(BmiScore >= 18.5 && BmiScore <= 24.9){
            category = 'Normal Weight'
            if(gender === 'male'){
                calorieInTake = 1400;
            }else{
                calorieInTake = 1200;
            }
            console.log(calorieInTake)
        handleNavigation(BmiScore,heightInMeter,category, calorieInTake)

        }else if(BmiScore >= 25 && BmiScore <= 29.9){
            category = 'OverWeight'
            if(gender === 'male'){
                calorieInTake = 1400;
            }else{
                calorieInTake = 1200;
            }
            console.log(calorieInTake)
        handleNavigation(BmiScore,heightInMeter,category, calorieInTake)

        }else{
            category = 'Obesity'
            if(gender === 'male'){
                calorieInTake = 1600;
            }else{
                calorieInTake = 1400;
            }
            console.log(calorieInTake)
        handleNavigation(BmiScore,heightInMeter,category, calorieInTake)

        }

    }

    const handleNavigation = (BmiScore,heightInMeter,category,calorieInTake) => {
        let genderInNumber = gender === 'male' ? 0 : 1;
        let bmiInString = BmiScore.toString();
        let calorieInTakeString = calorieInTake.toString();
        axios.put('user',{
            age: age,
            gender: genderInNumber,
            bmi: bmiInString,
            recommended_calories: calorieInTakeString,
          })
          .then((res) => {
            console.log(res)
            if(res.status === 200){
                alert("Updated Successfully");
                props.toggleReportBMI(BmiScore,heightInMeter,category,calorieInTake)
            }
        })
    }


    return(
        
        
        
        <div className="bmi_main_container">
        
        
        
        <div className="row row_bmi">
        
        <div className="card card_bmi">
        
        <div className="icon_container_remove">
        <i className="fa fa-times icon_remove_icon" onClick={() => props.closeBMI()}></i>
        </div>
        
        <h6 className="title_bmi">Let's calculate your BMI</h6>
        
        <div className="row row_bmi_bmi">
        <div className="col-md-6 col-sm-12 col_container">
        
        <h6 className="ques_title_bmi">What is your gender?</h6>
        
        <div className="row icon_container_main_bmi">
        <div className="icon_container_bmi" id="maleContainer" onClick={() => {
            var selectMaleContainer = document.getElementById('maleContainer');
            var selectMale = document.getElementById('male')
            selectMale.style.color = '#fff';
            selectMaleContainer.style.background = '#8BC441';
            var selectFemaleContainer = document.getElementById('femaleContainer');
            var selectFemale = document.getElementById('female')
            selectFemale.style.color = '#000';
            selectFemaleContainer.style.background = '#fff';
            setGender("male")
            console.log("male")}}>
        <i className="fa fa-mars icon_bmi" id="male" aria-hidden="true" ></i>
        <h6 className="male_text_btn_bmi">Male</h6>
        </div>
        
        <div className="icon_container_bmi" id="femaleContainer" onClick={() => {
            var selectFemaleContainer = document.getElementById('femaleContainer');
            var selectFemale = document.getElementById('female')
            selectFemale.style.color = '#fff';
            selectFemaleContainer.style.background = '#8BC441';
            var selectMaleContainer = document.getElementById('maleContainer');
            var selectMale = document.getElementById('male')
            selectMale.style.color = '#000';
            selectMaleContainer.style.background = '#fff';
            setGender("female")
            console.log("female")}}>
        <i className="fa fa-venus icon_bmi" aria-hidden="true" id="female"></i>
        <h6 className="male_text_btn_bmi">Female</h6>
        </div>
        
        </div>
        
        </div>
    
        
        <BmiQueandTextfield bmiQuestion="What is your weight? (kg)" id="weight" captureChange={validateOnlyNumeric} userData={weight} question="weight" />
        
        <BmiQueandTextfield bmiQuestion="What is your height?  (cm)" captureChange={validateOnlyNumeric} userData={height} question="height"/>
        
        <BmiQueandTextfield bmiQuestion="What is your age? " id="age" captureChange={validateOnlyNumeric} userData={age} question="age"/>
        
        
        
        
        </div>
        <div className="btn_next_container">
        <button className="btn btn_next_bmi" onClick={() => calculateBMI()}>Next</button>
        </div>
        
        </div>
        
        
        </div>
        
        </div>
        
        
        
        
        )
    }
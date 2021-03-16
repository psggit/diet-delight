import React from 'react'
import './Bmireport.css'

export default function Bmireport(props){
    console.log(props)
    return(
        <>
        
        <div className="bmi_report_container">
        <div className="card bmi_report_card">
        <h6 className="title_bmi_report">Your BMI Report</h6>
        <div className="row bmi_report_row">
        
        <div className="col-md-4">
        <h6 className="recommm_text">Recommended</h6>
        <h6 className="day_text_bmireport">{props.bmiReport.calorieInTake} Kcal/day</h6>
        
        </div>
        
        <div className="col-md-4 number_text_container">
        
        <div className="outerer">
        <h6 className="ten_number">{props.bmiReport.BmiScore}</h6>
        </div>
        
        </div>
        
        <div className="col-md-4">
        <h6 className="normal_text">{props.bmiReport.category}</h6>
        
        </div>
        
        </div>
        
        
        <div className="row text-center">
        <div className="col-md-2"></div>
        <div className="col-md-8">
        <h6 className="please_bmi_report">Please consult a medical practitioner if you </h6>
        <h6 className="text_bmi_report">have a pre-existing medical condition</h6>
        <h6 className="text_bmi_report">are less than 18 or more than 60 years of age</h6>
        <h6 className="text_bmi_report">are trying to gain weight, are an athlete or a body-builder</h6>

        <button className="btn btn_next_bmireport" onClick={() => props.toggleReport()}> Done</button>
        </div>
        <div className="col-md-2"></div>
        
        </div>
        
        
        </div>
        </div>
        
        </>
        
        )
    }
    
import React from 'react'
import './MealPackageSubsciption/MealpkgSubscription.css'
import logo_web from '../assets/logo.png'

export default function Mealchoose(props){
    return(
        
        
        <div className="row row_bg meal_choosecontainer" >
        <div className="col-md-12 col-sm-12 text_icon_container">
        
        <p className="choose_your_meal_text">{props.name}</p> 
        
        <img src={logo_web} className="logo_web_order"></img>

        <p className="choose_your_meal_text" style={{color:'transparent'}}>.</p> 
        
        {/* <img src={food_icon} className="meal_icon"></img> */}
        
        
        </div>
        </div>
        
        )
    }
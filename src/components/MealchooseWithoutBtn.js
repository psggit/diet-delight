import React from 'react'
import './MealPackageSubsciption/MealpkgSubscription.css'
import logo_web from '../assets/logo.png'

export default function MealchooseWithoutBtn(props){

    console.log(props)
    return(
        <div>
        
        <div className="row row_bg" >
        <div className="col-md-12 col-sm-12 text_icon_container">
        
        <p className="choose_your_meal_text_meal_choose">{props.nameMeal}</p> 
        
        <img src={logo_web} className="logo_web"></img>
        
        <p className="choose_your_meal_text" style={{color:'transparent'}}>.</p> 
        
        
        </div>
        </div>
        </div>
        )
    }
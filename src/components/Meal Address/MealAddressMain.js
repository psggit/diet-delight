import React from 'react'
import logo_web from '../../assets/logoweb.png'
import Mealchoose from '../Mealchoose'
import SubMealAddress from './SubMealAddress'
import './MealAddressMain.css'

export default function AddressAppointmentMain(props){
    console.log(props)
    return(
        
        <div className="address_screen_bg">
        
        {/* <img src={logo_web} alt="logo" className="logo_web"></img> */}
        
        <Mealchoose name="Choose Your Meal Plan" />
        
        
      
        <div className="main_container_mealaddressMain">
        <div className="card fullcard_container_mealaddressmain">
        
        <SubMealAddress mealID={props.location.state.id} mealType={props.location.state.mealType} meal = {props.location.state.meal}/>
        
        </div>
        </div>
       
        </div>
         
      
        )
    }
import React from 'react'
import './PaymentPlan.css'


export default function WeekData(props){
    console.log(props)


    
    const renderWeek = props.daySelected.map((weekDay) => {
        return(
        <div className="week_data_by_default_selected" id={weekDay} key={Math.random()}>{weekDay}</div>            
        )
    }); 


    return(
       
        <>{renderWeek}</>
    
        )
    }
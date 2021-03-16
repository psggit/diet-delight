import React,{useEffect, useState, useMemo} from 'react'
import './PaymentPlan.css'


export default function WeekData(props){
    console.log(props)
    const [weekDays,setWeekDays] = useState(['Sun','Mon','Tue','Wed','Thu','Fri','Sat']);


    
    const renderWeek = weekDays.map((weekDay) => {
        return(
        <div className="week_data" id={weekDay} key={Math.random()}>{weekDay}</div>            
        )
    }); 

    const renderWeekLock = useMemo(() => {
        console.log("renderweeklock", weekDays)
        return renderWeek;
    }, [weekDays])

    useEffect(()=>{
        weekDays.map((day) => {
            props.daySelected.map((selectedDay) => {
                if(day === selectedDay){
                    console.log(day, selectedDay)
                    var highlightDay = document.getElementById(day);
                    highlightDay.style.backgroundColor = 'rgb(139,196,35)';
                    highlightDay.style.color = '#fff';
                    highlightDay.style.borderColor = '#6E9A34';
                }
            })
        })
    },[props.daySelected, weekDays])
    return(
       
        <>{renderWeekLock}</>
    
        )
    }
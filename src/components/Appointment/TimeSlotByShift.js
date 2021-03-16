import React,{useState, useEffect, useMemo} from 'react'

export default function TimeSlotByShift(props){

    const [renderMorning , setRenderMorning] = useState(false);
    const [renderAfternoon , setRenderAfternoon] = useState(false);
    const [renderEvening , setRenderEvening] = useState(false);
    const [timeSlotShift, setTimeSlot] = useState("")
    const [disabled, setDisabled] = useState(false);


    let morningShift = ["9:00AM","10:00AM","11:00AM","12:00PM","9:15AM","10:15AM","11:15AM","12:15PM","9:30AM","10:30AM","11:30AM","12:30PM","9:45AM","10:45AM","11:45AM","12:45PM"];
    let afternoonShift = ["1:00PM","2:00PM","3:00PM","4:00PM","1:15PM","2:15PM","3:15PM","4:15PM","1:30PM","2:30PM","3:30PM","4:30PM","1:45PM","2:45PM","3:45PM","4:45PM"];
    let eveningShift = ["5:00PM","6:00PM","7:00PM","8:00PM","5:15PM","6:15PM","7:15PM","8:15PM","5:30PM","6:30PM","7:30PM","8:30PM","5:45PM","6:45PM","7:45PM","8:45PM"];

    // const handleTimeSlot = (selectedTimeSlot) => {

    // }


    useEffect(() => {
        console.log(timeSlotShift)
        if(timeSlotShift != ''){
            var timeSlotByClass = document.getElementsByClassName('time_morning_title');
            for(var i = 0; i < timeSlotByClass.length; i++){
                if(timeSlotByClass[i].id !== timeSlotShift){
                    timeSlotByClass[i].style.background = '#fff';
                    timeSlotByClass[i].style.color = '#000';
                    timeSlotByClass[i].style.border = '1px solid #2121213b';
                }else{
                    console.log(timeSlotByClass[i])
                    timeSlotByClass[i].style.background = '#8BC441';
                    timeSlotByClass[i].style.color = '#fff';
                    timeSlotByClass[i].style.border = '1px solid #8BC441';
                    timeSlotByClass[i].style.outline = 'none';
                }
            }
            props.selectedTimeSlot(timeSlotShift);
        }
    },[props.selectedTimeSlot,timeSlotShift])


    const renderMorningShift = morningShift.map((timeSlot) => {
        return(
            <div className="col-md-3  col-3" key={Math.random()}>
            <button className="time_morning_title" id={timeSlot} onClick={() => setTimeSlot(timeSlot)} disabled={props.disabled}>{timeSlot}</button>
            </div>
        )
    })


    const renderAfternoonShift = afternoonShift.map((timeSlot) => {
        return(
            <div className="col-md-3  col-3" key={Math.random()}>
            <button className="time_morning_title" id={timeSlot} onClick={() => setTimeSlot(timeSlot)} disabled={props.disabled}>{timeSlot}</button>
            </div>
        )
    })

    const renderEveningShift = eveningShift.map((timeSlot) => {
        return(
            <div className="col-md-3  col-3" key={Math.random()}>
            <button className="time_morning_title" id={timeSlot} onClick={() => setTimeSlot(timeSlot)} disabled={props.disabled}>{timeSlot}</button>
            </div>
        )
    })

           // const renderMorningLock = useMemo(() => {
            //     return renderMorningShift
    // },[renderMorningShift])

    const renderAfternoonLock = useMemo(() => {
        return renderAfternoonShift
    },[renderAfternoonShift])

    const renderEveningLock = useMemo(() => {
        return renderEveningShift
    },[renderEveningShift])


    useEffect(() => {
        if(props.renderShift === 'morning'){
            setRenderMorning(true)
            setRenderAfternoon(false)
            setRenderEvening(false)
        }else if(props.renderShift === 'afternoon'){
            setRenderAfternoon(true)
            setRenderMorning(false)
            setRenderEvening(false)
        }else if(props.renderShift === 'evening'){
            setRenderAfternoon(false)
            setRenderMorning(false)
            setRenderEvening(true)
        }else{
            setRenderAfternoon(false)
            setRenderMorning(false)
            setRenderEvening(false)
        }

    },[props.renderShift])
           
        
        return( 
            
            <div>
            
            
            <div className="row">
            {renderMorning && renderMorningShift}
            {renderAfternoon && renderAfternoonLock}
            {renderEvening && renderEveningLock}
            </div>
            </div>
            
            
            
            )
        }


        
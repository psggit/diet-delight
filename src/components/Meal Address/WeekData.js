
import React,{useState, useEffect, useMemo} from 'react'



 export default function WeekData(props){ 
        const [weekDays,setWeekDays] = useState(['Sun','Mon','Tue','Wed','Thu','Fri','Sat']);
        let selectedWeekDays = [];

        useEffect(() => {
            console.log("running")
            console.log(props.mealType)
                if(props.mealType === 1){
                    selectedWeekDays = ["Mon","Tue","Wed","Thu","Sun"]
                }else{
                    selectedWeekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
            }
        },[props.mealType])



        const handleWeek = (weekDay, color) => {
            console.log("clicked")
            console.log(weekDay)
            var focusColorChange = document.getElementById(weekDay);
            console.log(focusColorChange)
            console.log(props.mealType,selectedWeekDays,weekDay)
            if(props.mealType === 1 && selectedWeekDays.length >= 5 && color === '#fafafa'){
                console.log(selectedWeekDays)
                alert('you already have selected 5 days per week')
                alert('Please unselect one weekDay')
            }else{
                focusColorChange.style.backgroundColor === "rgb(139, 196, 65)" ? removeElement(weekDay) : addElement(weekDay)
                focusColorChange.style.backgroundColor === "rgb(139, 196, 65)" ? focusColorChange.style.backgroundColor = "#fafafa" : focusColorChange.style.backgroundColor = '#8BC441'
                focusColorChange.style.backgroundColor === "rgb(139, 196, 65)" ? focusColorChange.style.color = "#fff" : focusColorChange.style.color = '#000'
                focusColorChange.style.backgroundColor === "rgb(139, 196, 65)" ? focusColorChange.style.borderColor = "#fff" : focusColorChange.style.borderColor = '#CFCFCF'
                }
            console.log(selectedWeekDays)
            props.handleWeekDays(selectedWeekDays);
        }

        
        const removeElement = (weekDay) => {
            console.log("remove element called")
            const indexOfSelected = selectedWeekDays.indexOf(weekDay)
            selectedWeekDays.splice(indexOfSelected,1);
            console.log(selectedWeekDays)
        }
    
        const addElement = (weekDay) => {
            console.log("add element called")
            selectedWeekDays.push(weekDay)
            console.log(selectedWeekDays)
        }



    const renderWeeks =  weekDays.map((day) => {
        console.log("Rerendered")
        let backgroundColor = (props.mealType === 1 && (day === 'Sat' || day === 'Fri')) ? '#fafafa' : 'rgb(139,196,65)';
        let fontColor = (props.mealType === 1 && (day === 'Sat' || day === 'Fri')) ? '#000' : '#fff';
        console.log(fontColor)                                                                                  
        console.log(day)
            return(
                <div style={{margin:5}} key={Math.random()}>
                <button name={day} id={day} className="week_btn_mealaddress" style={{backgroundColor:backgroundColor, color: fontColor}}  onClick={() => {
                    handleWeek(day,backgroundColor)}}>{day}</button> 
        </div>)
        })


        const renderLock = useMemo(() => {
            console.log("render lock", renderWeeks)
            return renderWeeks;
        },[weekDays])


        return(
            <>
            {renderLock}
            </>
         )
    }

    export const WeekDataMemo = React.memo(WeekData)
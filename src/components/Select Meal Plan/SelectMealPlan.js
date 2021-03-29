import React,{useEffect,useState} from 'react'
import './SelectMealPlan.css'
import logo_web from '../../assets/logoweb.png'
import Mealchoose from '../Mealchoose.js'
import Daytabs from './Daytabs'
import Submodulesecond from './Submodulesecond'
import axios from '../../axiosInstance';
import SubmoduleSelectMeal from './SubmoduleSelectMeal'

export default function SelectMealPlan(props){
    console.log(props)

    const [mealData,setMealData] = useState({}); 
    const [selectedDay, setSelectedDay] = useState(1);
    const [duration, setDuration] = useState(1);
    useEffect(() => {
        
        axios.get(`meal-plans/`+props.location.state.recentPurchase.meal_plan_id).then((res) => {
            console.log(res)
           setMealData(res.data.data) 
           setDuration(res.data.data.duration)
        })
        .catch((err) => console.log(err))
      
         
    },[])


    const handleSelectedDay = (selectedDay) => {
        console.log(selectedDay)
        setSelectedDay(selectedDay)
    }

  

 
  
     
    return(
         
        <div className="select_meal_bg">
        
        {/* <img src={logo_web} className="logo_web" alt="logo"></img> */}
         
        {/* choose meal component */}
        
        
        <Mealchoose name="Choose Your Meal Plan" />
        
        
        {/* card component */} 

        <Submodulesecond recentPurchase = {mealData} startDate={props.location.state.recentPurchase.start_date} endDate={props.location.state.recentPurchase.start_date}/>
        
        <Daytabs duration={duration} notifyParent={handleSelectedDay}/>
        
        
        <SubmoduleSelectMeal recentPurchase = {mealData}  selectedDay={selectedDay}/>
                
              
        
        
        </div>
        
        
        )
    }
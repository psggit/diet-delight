import React,{useEffect,useState} from 'react'
import './SelectMealPlan.css'
import MealPlansMenuItems from './MealPlansMenuItems'
import axios from '../../axiosInstance';


export default function SubmoduleSelectMeal(props){

    console.log(props) 
    const [category, setCategory] = useState([]);

  
    useEffect(() => {
     axios.get(`menu-categories?menu_id=`+props.mealData.menu_id, {
         headers: {
             Authorization: `Bearer ${localStorage.getItem('access_token')}`
         }
     }).then((res) => {
         
        console.log(res)
        setCategory(res.data.data)
     })
 }, [props.mealData.menu_id])
    const renderCategory = category.map((categoryData) =>  {
        console.log(categoryData)
        return(
    <MealPlansMenuItems key={Math.random()} category={categoryData} selectedDay={props.selectedDay} />)
});
   
    return(
        
        
        
        <div> 
        
       {renderCategory}
      
       
       
        </div>
        
        
        )
        
        
    }
    
    
    
    
    
    
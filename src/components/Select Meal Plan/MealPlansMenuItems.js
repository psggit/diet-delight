import React,{useState,useEffect} from 'react'
import './SelectMealPlan.css'
import veg_icon from '../../assets/vegicon.png'
import { Link } from 'react-router-dom';
import axios from '../../axiosInstance';
 
export default function MealPlansMenuItems(props){
    console.log(props)
   
    const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_border_selectedMeal")
    const [menuItems,setMenuItems] = useState([])

    useEffect(() => {
        axios.get(`menu-items?menu_id=`+props.category.menu_id+`&menu_category_id=`+props.category.id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res.data.data) 
            setMenuItems(res.data.data)
        })
    }, [props.category.menu_id,props.category.id])
    
    
    function colorHandle(){
        likeColor === "fa fa-heart-o heart_border_selectedMeal" ? setLikeColor("fa fa-heart heart_submodule_selectMeal_fill") : setLikeColor("fa fa-heart-o heart_border_selectedMeal")
        
        
    }


    const renderMenuDatas = menuItems.map((menuItem) =>{
        console.log(menuItem)
        if(menuItem.day  === props.selectedDay){
            return(
                <div className="select_meal_plan_main_container" key={Math.random()}>
    
            <div className="card fullcard_container_selectedmeal">
            <div className="row">
            
            <div className="col-md-6 col-sm-12">
            
            <div className="row">
            <div className="col-md-4 col-sm-12">
            <img src={menuItem.picture} alt="food" className="rounded-circle card_img_rounded_SelectedMeal"></img>
            </div>
            <div className="col-md-8 col-sm-12 left_side_container_selectMeal">
            <h5 className=" salad_text" >{menuItem.name}</h5>
            {/* <h5 className=" salad_details_text"> About dish like crunch with something chrunchy and salad  About dish like crunch with something chrunchy and salad</h5> */}
            <img src={veg_icon} alt="veg" className="veg_icon"></img>
            </div>
            
            </div>
            
            
            
            </div>
            
            <div className="vertical_line_Selectedmeal"></div>
            <div className="col-md-5 col-sm-12">
            <div className="row">
            <div className="col-md-9 col-sm-12">
            
            <h5 className="breakfast_paragrapgh_content">Let us know if there is something you’d want us to know about your menu, we’ll pass it on to the chef.</h5>
            
            <textarea className="textarea_container_selectmeal" id="w3review" name="w3review" rows="3" placeholder="Enter your notes here" cols="20">
            </textarea>
            
            </div>
            <div className="col-md-3 col-sm-12 col_grid_selectmeal">
            <div className="heart_icon_meal">  
            
            <i className={likeColor} aria-hidden="true" onClick={colorHandle}></i>
            {/* <HeartIcon /> */}
            </div>
            
            

            <button className="btn btn-default mealbtn_selectmeal">
            Select
            
            </button>
        
            
             
            
            
            
            </div>
            </div>
            </div>
            
            </div>
            </div>
            </div>
            )

        }
       
    })

    return(
        
        <>
        <h5 className="breakfast_title_selectmeal" key={Math.random()}>{props.category.name}</h5>
        {renderMenuDatas}
        </>
        
    )    
} 
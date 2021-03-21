import React,{useState,useEffect} from 'react'
import './SelectMealPlan.css' 
import veg_icon from '../../assets/vegicon.png'

import axios from '../../axiosInstance';
 
export default function MealPlansMenuItems(props){
    console.log(props)
   
    const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_border_selectedMeal")
    const [menuItems,setMenuItems] = useState([])
    // const [selectColor ,setSelectColor] = useState("Select");
    // const [changeColor ,setColorChange] = useState("#8bc53f");

    

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

   



    function handleSelect(e){
        console.log(e)
    //     selectColor ==="Select" ?  setSelectColor("Selected") : setSelectColor("Select");
         
    //    changeColor === "#8bc53f" ? setColorChange("blue") :  setColorChange("#8bc53f");
        var buttonText = e.target.innerHTML;
        console.log(buttonText);
        var buttonElement = document.getElementById(e.target.id)
        console.log(buttonElement);

        if(buttonText === "Select"){
        buttonElement.style.backgroundColor="#8bc53f";
        buttonElement.style.color="#fff"
        buttonElement.innerHTML="Selected"; 

        }else{
            buttonElement.style.backgroundColor="transparent";
            buttonElement.style.color="#8bc53f"
            buttonElement.innerHTML="Select";
    
        }


     }




    const renderMenuDatas = menuItems.map((menuItem) =>{
    
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
            
             

            <button id={Math.random()}   className="btn btn-default mealbtn_selectmeal" onClick ={(e) => handleSelect(e)}>
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
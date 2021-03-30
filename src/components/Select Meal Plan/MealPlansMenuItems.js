import React,{useState,useEffect, useRef} from 'react'
import './SelectMealPlan.css' 
import veg_icon from '../../assets/vegicon.png'

import axios from '../../axiosInstance';
import NonvegComponent from '../veg non veg component/NonvegComponent.js'
import VegComponent from '../veg non veg component/VegComponent.js'
import Snackbar from '../Snack bar/Snackbar.js'
export default function MealPlansMenuItems(props){ 
    console.log(props)

    const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_border_selectedMeal")
    const [menuItems,setMenuItems] = useState([])
    const selectCounter = useRef(0);
    const [maxBuy ,setMaxBuy] = useState(0);
    const[user,setUser ]=useState({});
    const [favouritesList, setFavouritesList] = useState([]);
    const [myMenuOrdersList, setMyMenuOrdersList] = useState([]);


    // const [changeColor ,setColorChange] = useState("#8bc53f");

    

    useEffect(() => {
        var max_buy = parseInt(props.category.max_buy)
        console.log(max_buy)
        setMaxBuy(max_buy)
        axios.get(`menu-items?menu_id=`+props.category.menu_id+`&menu_category_id=`+props.category.id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res.data.data)  
            setMenuItems(res.data.data)
            
        })
        axios.get(`user`,{ 

            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            
            setUser(res.data)


        }) 



    }, [props.category.menu_id,props.category.id, props.max_buy])
    
    useEffect(() =>{
        fetchFavourites()
        fetchMenuOrders()
    },[])
    
    const fetchFavourites = () => {
        axios.get('favourites').then((res) => {
            var favourites = [];
            res.data.data.forEach(favourite => {
                favourites.push(favourite.menu_item_id);
            });
            setFavouritesList([...favourites]);
        }).catch((err) => console.log(err))
    }

    

    const fetchMenuOrders = () => {
        axios.get('my-menu-orders').then((res) => {
            console.log(res)
            var myMenuOrders = [];
            res.data.data.forEach(menuOrder => {
                myMenuOrders.push(menuOrder.menu_item_id);
            });
            setMyMenuOrdersList([...myMenuOrders]);
            console.log(myMenuOrdersList)
        }).catch((err) => {
            console.log(err)
        })
    }


    function colorHandle(e,id){
        console.log(e,id)
        var buttonElement = document.getElementById(e.target.id)
        var buttonElementClassName = buttonElement.className;
        if(buttonElementClassName === "fa fa-heart heart_submodule_selectMeal_fill")
        {
            buttonElement.className="fa fa-heart heart_submodule_selectMeal"
            axios.get(`favourites?menu_item_id=`+id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }).then((res) =>{
                console.log(res)
                let favouritesList = res.data.data;
                favouritesList.forEach(favourite => {
                    axios.delete(`favourites/`+favourite.id , {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }).then((res) =>{

                        // props.notifyAddedFavourite(props.menuItem.id)
                        console.log(res)}).catch((err) =>{
                            console.log(err)
                            buttonElement.className="fa fa-heart heart_submodule_selectMeal_fill"


                        } );

                    });

            }).catch((err) =>{
                console.log(err)
            } );

        }else{
            buttonElement.className="fa fa-heart heart_submodule_selectMeal_fill"
            axios.post(`favourites`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                
                menu_item_id: id 
                
            }).then((res) => {
                console.log(res)
                // props.notifyAddedFavourite(props.menuItem.id)
                console.log("meet")
            }).catch(err => {
                console.log(err)
                buttonElement.className="fa fa-heart heart_submodule_selectMeal"


            })
        }

        
    }





    function handleSelect(e,menuItem){
        console.log(e)
    //     selectColor ==="Select" ?  setSelectColor("Selected") : setSelectColor("Select");

    //    changeColor === "#8bc53f" ? setColorChange("blue") :  setColorChange("#8bc53f");
    var buttonText = e.target.innerHTML;
    console.log(buttonText);
    var buttonElement = document.getElementById(e.target.id)
    console.log(buttonElement);

    if(buttonText === "Select"){
        if(maxBuy > selectCounter.current){
            selectCounter.current = selectCounter.current + 1;
            buttonElement.style.backgroundColor="#8bc53f";
            buttonElement.style.color="#fff"
            buttonElement.innerHTML="Selected"; 
            console.log(selectCounter)
            console.log(maxBuy)
            axios.post(`my-menu-orders`, {
                user_id: user.id,
                menu_item_id: menuItem.id, 
                menu_category_id: menuItem.menu_category_id,
                meal_purchase_id: 1, 
                status: user.status,
                kcal: 1800,
                menu_item_date: "2020-11-26 06:50:41",
                menu_item_day: menuItem.day, 
                menu_item_name: menuItem.name,
                first_name: user.first_name,
                last_name: user.last_name,
                mobile: user.mobile,
                delivery_address: user.primary_address_line1,
                delivery_time: 0,
                notes: "" 
            }).then((res) => {
                console.log(res.data.data)  

            }) .catch((err) => console.log(err));
            
        } 
    }else{
        axios.get(`my-menu-orders?menu_item_id=`+menuItem.id, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }).then((res) =>{
            console.log(res)
            let myMenuOrders = res.data.data;
            myMenuOrders.forEach(menuOrder => {
                axios.delete(`my-menu-orders/`+menuOrder.id , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }).then((res) =>{
                    console.log(res)}).catch((err) =>{
                        console.log(err)
                    } );
                    
                });
            
        }).catch((err) =>{
            console.log(err)
        } );
        selectCounter.current = selectCounter.current - 1;
        buttonElement.style.backgroundColor="transparent";
        buttonElement.style.color="#000"
        buttonElement.innerHTML="Select";
        buttonElement.style.border = "1px solid #8bc53f";
        console.log(selectCounter)
        console.log(maxBuy)

    }      
} 




const renderMenuDatas = menuItems.map((menuItem) =>{
 

  if(menuItem.day  === props.selectedDay){
    var ifFavourite = favouritesList.includes(menuItem.id)
    var ifOrdered = myMenuOrdersList.includes(menuItem.id)

    console.log(ifFavourite,ifOrdered)
    if(ifFavourite && ifOrdered){


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
    {/* <img src={veg_icon} alt="veg" className="veg_icon"></img> */}
    
    {menuItem.veg === 0 ? <VegComponent/> :   <NonvegComponent/>}
    </div>

    </div>



    </div>

    <div className="vertical_line_Selectedmeal"></div> 
    <div className="col-md-5 col-sm-12"> 
    <div className="row">
    <div className="col-md-9 col-sm-12">

    <h5 className="breakfast_paragrapgh_content">Let us know if there is something you’d want us to know about your menu, we’ll pass it on to the chef.</h5>

    <p id="w3review" style={{background:'#fff', height:'80px', width:'100%', paddingLeft:'5px', fontSize:'0.8em', borderRadius:'5px'}}></p>

    </div>
    <div className="col-md-3 col-sm-12 col_grid_selectmeal">
    <div className="heart_icon_meal">  

    <i id={Math.random()}  className={"fa fa-heart heart_submodule_selectMeal_fill"} aria-hidden="true" onClick={(e) =>colorHandle(e,menuItem.id)}></i>


    </div>


    
    <button id={Math.random()}   className="btn btn-default mealbtn_selectedmeal"  onClick ={(e) => handleSelect(e,menuItem)}>
    Selected

    </button>






    </div>
    </div>
    </div>

    </div>
    </div>
    </div>
    )


    }else if(ifOrdered){

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
    {/* <img src={veg_icon} alt="veg" className="veg_icon"></img> */}
    
    {menuItem.veg === 0 ? <VegComponent/> :   <NonvegComponent/>}
    </div>

    </div>



    </div>

    <div className="vertical_line_Selectedmeal"></div>
    <div className="col-md-5 col-sm-12"> 
    <div className="row">
    <div className="col-md-9 col-sm-12">

    <h5 className="breakfast_paragrapgh_content">Let us know if there is something you’d want us to know about your menu, we’ll pass it on to the chef.</h5>




    <p id="w3review" style={{background:'#fff', height:'80px', width:'100%', paddingLeft:'5px', fontSize:'0.8em', borderRadius:'5px'}}></p>

    </div>
    <div className="col-md-3 col-sm-12 col_grid_selectmeal">
    <div className="heart_icon_meal">  

    <i id={Math.random()}  className={"fa fa-heart-o heart_border_selectedMeal"} aria-hidden="true" onClick={(e) =>colorHandle(e,menuItem.id)}></i>


    </div>



    <button id={Math.random()}   className="btn btn-default mealbtn_selectedmeal" onClick ={(e) => handleSelect(e,menuItem)}>
    Selected

    </button>






    </div>
    </div>
    </div>

    </div>
    </div>
    </div>
    )


    }else if(ifFavourite){

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
    {/* <img src={veg_icon} alt="veg" className="veg_icon"></img> */}
    
    {menuItem.veg === 0 ? <VegComponent/> :   <NonvegComponent/>}
    </div>

    </div>



    </div>

    <div className="vertical_line_Selectedmeal"></div>
    <div className="col-md-5 col-sm-12"> 
    <div className="row">
    <div className="col-md-9 col-sm-12">

    <h5 className="breakfast_paragrapgh_content">Let us know if there is something you’d want us to know about your menu, we’ll pass it on to the chef.</h5>




    <p id="w3review" style={{background:'#fff', height:'80px', width:'100%', paddingLeft:'5px', fontSize:'0.8em', borderRadius:'5px'}}></p>

    </div>
    <div className="col-md-3 col-sm-12 col_grid_selectmeal">
    <div className="heart_icon_meal">  

    <i id={Math.random()}  className={"fa fa-heart-o heart_border_selectedMeal_fill"} aria-hidden="true" onClick={(e) =>colorHandle(e,menuItem.id)}></i>


    </div>



    <button id={Math.random()}   className="btn btn-default mealbtn_selectmeal" onClick ={(e) => handleSelect(e,menuItem)}>
    Select

    </button>






    </div>
    </div>
    </div>

    </div>
    </div>
    </div>
    )


    }else{

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
    {/* <img src={veg_icon} alt="veg" className="veg_icon"></img> */}
    
    {menuItem.veg === 0 ? <VegComponent/> :   <NonvegComponent/>}
    </div>

    </div>



    </div>

    <div className="vertical_line_Selectedmeal"></div>
    <div className="col-md-5 col-sm-12"> 
    <div className="row">
    <div className="col-md-9 col-sm-12">

    <h5 className="breakfast_paragrapgh_content">Let us know if there is something you’d want us to know about your menu, we’ll pass it on to the chef.</h5>




    <p id="w3review" style={{background:'#fff', height:'80px', width:'100%', paddingLeft:'5px', fontSize:'0.8em', borderRadius:'5px'}}></p>

    </div>
    <div className="col-md-3 col-sm-12 col_grid_selectmeal">
    <div className="heart_icon_meal">  

    <i id={Math.random()}  className={"fa fa-heart-o heart_border_selectedMeal"} aria-hidden="true" onClick={(e) =>colorHandle(e,menuItem.id)}></i>


    </div>



    <button id={Math.random()}   className="btn btn-default mealbtn_selectmeal" onClick ={(e) => handleSelect(e,menuItem)}>
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
}

})

return(

    <>
    <Snackbar/>
    <h5 className="breakfast_title_selectmeal" key={Math.random()}>{props.category.name}</h5>
    {renderMenuDatas}
    </>

    )    
} 
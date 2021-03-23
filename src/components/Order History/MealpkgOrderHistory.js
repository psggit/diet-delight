import React,{useEffect,useState} from 'react'
import './OrderHistory.css' 
import { Link } from 'react-router-dom';
import axios from '../../axiosInstance'; 

export default function MealpkgOrderHistory(props){
    const [mealPurchases, setMealPurchases] = useState([]);
    const [startDate,setStartDate] = useState("")
    const [endDate,setEndDate] = useState("")
    // const[remainingDay,setRemainingDay] = useState(0)

    useEffect(() =>{
        console.log(props.timePeriod)
            var dateTime = new Date();
           
            console.log(dateTime)
            var fromDate = addMonths(dateTime,props.timePeriod)
            console.log(fromDate);
            var toDate = new Date();


            if(fromDate > toDate){
                setStartDate(toDate)
                setEndDate(fromDate)
            }else{
                setStartDate(fromDate)
                setEndDate(toDate)
            }
    },[props.timePeriod])
    function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
      }
    useEffect(() => {
        
        axios.get(`my-meal-purchases?fromDate=`+startDate+`&toDate=`+endDate, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setMealPurchases(res.data.data)
        })
        
    },[])
     function remainingDays(end_date){
         var currentDate = new Date();
            console.log(currentDate);

            var endDate = new Date(end_date) ;
            console.log(endDate)


            const diffTime = Math.abs(endDate - currentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffTime + " milliseconds");
            console.log(diffDays + " days");
            
            return diffDays
           
     }

     function orderDate(created_at){
         console.log(created_at)

         var orderDate = new Date(created_at)
         var dd = orderDate.getDate();
            var mm = orderDate.getMonth()+1; 
            var yyyy = orderDate.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 
            orderDate = yyyy+'-'+mm+'-'+dd;
            console.log(orderDate)

            return orderDate
     }


const rendermealpurchase = mealPurchases.map((mealPurchase) => {

    return(
        
        <div className="MealpkgOrderHistory">
        
        <div className="card Meal_plan_container">
        <div className="row">
         
        <div className="col-md-12 col-xs-12">
        <p className="title_meal_pkg">Meal Package</p>
        </div>
         
        <div className="col-md-4 col-xs-12">
        
        <div className="menu_booster_container">
        <p  className="menu_pkg_title">Menu Package:</p>
     
        <h6 className="menu_pkg_subtitle">{mealPurchase.meal_plan_name}</h6>
       
        </div>
        
        <div className="menu_booster_container">
        <p  className="subscriptionplan_title">Subscription Plan:</p>

        <h6 className="subscriptionplan_subtitle">{mealPurchase.meal_plan_duration}</h6>
  
        </div>
        
        <div className="menu_booster_container">
        <p  className="remaining_days_title">Remaining Days:</p>
        <h6 className="remaining_days_subtitle">{remainingDays(mealPurchase.end_date)}</h6>
        </div> 
        
        <div className="menu_booster_container">
        <p  className="address_title">Addresses:</p>
        <h6 className="address_subtitle">{mealPurchase.shipping_address_line1}</h6>
        </div>
        
        
        </div>
        <div className="vertical_line_OrderHistory"></div>
        <div className="col-md-4 col-xs-12 right_side_row_container">
        
        <div className="right_side_container_orderhistory">
        <p  className="break_title">Breaks:</p>
        <h6 className="break_subtitle">View Breaks</h6>
        </div>
        
        <div className="right_side_container_orderhistory">
        <p  className="order_title">Order date:</p>
        {/* <h6 className="order_subtitle">{mealPurchase.created_at}</h6> */}
        <h6 className="order_subtitle">{orderDate(mealPurchase.created_at)}</h6>
        </div>
        
        <div className="right_side_container_orderhistory">
        <p  className="order_id_title">Order # :</p>
        <h6 className="order_id_subtitle">{mealPurchase.id}</h6>
        </div>
        
        
        <div className="right_side_container_orderhistory">
        <p  className="cost_title">Cost:</p>
        <h6 className="cost_subtitle">{mealPurchase.amount_paid} BHD</h6>
        
        </div>
        
        
        </div>
        <div className="col-md-3 col-xs-12 btn_container_orderhistory">
        <Link to='/'>
        <button className="btn btn-default renew_plan_btn">Renew Plan</button>
        </Link><br></br>
        <Link to={{
            pathname:"/SelectMealPlan",
            state:{
                recentPurchase :mealPurchase 
            }
        }}>
        <button className="btn btn-default select_menu_btn" >Select Menu</button>
        </Link> 
        </div>
        </div>
        </div>
        
        
        </div>  
        )});

return( 
    <>
    {rendermealpurchase}
    </>
)





    
    }
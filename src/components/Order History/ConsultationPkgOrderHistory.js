import React,{useEffect,useState} from 'react'
import './OrderHistory.css'
import axios from '../../axiosInstance'; 
import { Link } from 'react-router-dom';

export default function ConsultationPkgOrderHistory(){ 

        const [consultationPurchases, setconsultationPurchases] = useState([]);
        useEffect(() => {
            
            axios.get(`my-consultation-purchases`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            }).then((res) => {
                console.log(res)
                setconsultationPurchases(res.data.data)
            })
            
        },[])

        function handleDateChange(created_at){
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
        
        const renderconsultationpurchase = consultationPurchases.map((consultationPur) => {
            return(
        
                <div className="MealpkgOrderHistory">
        
                <div className="card consultancy_Meal_plan_container">
                <div className="row">
                 
                <div className="col-md-12 col-xs-12">
                <p className="title_meal_pkg">Consultation Package</p>
                </div>
                
                <div className="col-md-4 col-xs-12">
                
                <div className="menu_booster_container">
                <p  className="menu_pkg_title">Menu Package:</p>
                <h6 className="menu_pkg_subtitle">{consultationPur.consultation_package_name}</h6>
                </div>
                
                <div className="menu_booster_container">
                <p  className="subscriptionplan_title">Appointment Date:</p>
                <h6 className="subscriptionplan_subtitle">{consultationPur.consultation_package_id}</h6>
                </div>
                
                <div className="menu_booster_container">
                <p  className="remaining_days_title">Appointment Link:</p>
                <h6 className="remaining_days_subtitle">{consultationPur.consultations.consultation_link}</h6>
                </div>
                
                <div className="menu_booster_container">
                <p  className="address_title">Next Appointment:</p>
                <h6 className="address_subtitle">{consultationPur.billing_address_line1}</h6>
                </div>

                <div className="menu_booster_container">
                <p  className="address_title">Mode:</p>
                <h6 className="address_subtitle">{consultationPur.consultations.consultation_mode}</h6>
                </div>
                
                
                </div>
                <div className="vertical_line_OrderHistory"></div>
                <div className="col-md-4 col-xs-12">
                
                <div className="right_side_container_orderhistory">
                <p  className="break_title">Order date:</p>
                <h6 className="break_subtitle">{handleDateChange(consultationPur.created_at)}</h6>
                </div>
                
                <div className="right_side_container_orderhistory">  
                <p  className="order_id_title">Order # :</p>
                <h6 className="order_id_subtitle">{consultationPur.id}</h6>
                </div>
                
                
                <div className="right_side_container_orderhistory">
                <p  className="cost_title">Cost:</p> 
                <h6 className="cost_subtitle">{consultationPur.amount_paid}BHD</h6>
                
                </div>
                
                
                </div>
                <div className="col-md-3 col-xs-12 btn_container_orderhistory">
                <Link  to = {{ pathname :"/AddressAppointmentMain",
                state :{
                    consultationPur:consultationPur
                }
                    
                }}>
                <button className="btn btn-default renew_plan_btn_consultion">Renew Plan</button><br></br>
                </Link>
                
                
                </div>
                </div>
                
                </div>
                </div>  
                );
        })

        return(
            <>
                {renderconsultationpurchase}
            </>
        )

    }
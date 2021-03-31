import React,{useState,useEffect,useRef} from 'react'
import './MealAddressMain.css'
import card_img_rounded from '../../assets/food1.jpg'

import SelectdatePicker from '../SelectdatePicker'
import axios from '../../axiosInstance';
import { Link ,useHistory} from 'react-router-dom';
import WeekDataMemo from './WeekData';

import PrimaryaddDialog from '../Dialog/Primary address Dialog/PrimaryaddDialog'


export default function SubMealAddress(props){
    console.log(props) 
    let history = useHistory(); 
    const [value, setValue] = React.useState('female');
    const RadioChange = (event) => {
        setValue(event.target.value);
    };
    const[meal,setMeal ]=useState({}); 
    const[user,setUser ]=useState({});
    const[address,setAddress ]=useState('');
    const [date,setDate] = useState("");
    const [weekDays,setWeekDays] = useState([]);
    const [selectedTimingSlot,setSelectedTimimgSlot] = useState('morning')
    const [toggleTextarea,setToggleTextarea] = useState(true);
    const [extraCharge,setExtraCharge] = useState(0);
    const [incrementedDate,setIncrementedDate] = useState("");
    
      const [changeAddressData,setChangeAddressData] = useState(false) 
      const [selectAddress,setSelectedAddress] = useState("")
      const [maximumSelectionMessage, setmaximumSelectionMessage] = useState('');
     

    function handleAddress(data){
      console.log(data)
      setSelectedAddress(data)
    //   var changeAddress = document.getElementById('addressValue');
      let primaryAddress = (user.primary_address_line1 === null || user.primary_address_line1 === '') ? " " : user.primary_address_line1+ " " + ((user.primary_address_line2 === null || user.primary_address_line2 === '') ? " " : user.primary_address_line2)
      let secondaryAddress = (user.secondary_address_line1 === null || user.secondary_address_line1 === '') ? "" : user.secondary_address_line1  + " " + ((user.secondary_address_line2 == null || user.secondary_address_line2 === '')? " ": user.secondary_address_line2)
      let addressValue = data === 'primary_address' ? primaryAddress : secondaryAddress;
    //   changeAddress.value = addressValue;
      setAddress(addressValue)

    } 

    function handleChangeAdrress(data){
        if(data === true){
            setChangeAddressData(true)
            }else{
            setChangeAddressData(false) 
        }
         
    }  

    function handleUserData(){
        setChangeAddressData(true)
        console.log("meet")
    

    }



    const handleWeekDays = (weekDays) => {
        console.log(weekDays);
        setWeekDays([...weekDays])
    }


    function handleDateChange(date){
                setDate(date)  
                var errorMessage = document.getElementById('successDate');
                errorMessage.innerHTML = '';
                console.log(errorMessage)         
    }


    const handleExtraChargeForSelectedTimingSlot = (timeSlot) => {

        axios.get('key-values?key=afternoon_delivery')
        .then((res) => {
            console.log(res.data)
            let extraCharge = parseInt(res.data.value)
            setExtraCharge(extraCharge)
        })
        .catch((err) => console.log(err))
        console.log(timeSlot)
    }

    const handleMaximumSelection = (message) => {
        setmaximumSelectionMessage(message)
    }

    useEffect(() => {
        var byDefaultTimeSelection = document.getElementById('morning');
        byDefaultTimeSelection.checked=true;
    },[])

            
    useEffect(() => {
                console.log(props);
                
                axios.get(`meal-plans/`+props.mealID, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }).then((res) => {
                    console.log(res)
                    setMeal(res.data.data)
                    
                }) 
                
                axios.get(`user`,{
                    
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                }).then((res) => {
                    console.log(res)
                    
                    setUser(res.data)
                    let addressValue = (res.data.primary_address_line1 === null || res.data.primary_address_line1 === '') ? " " : res.data.primary_address_line1+ " " + ((res.data.primary_address_line2 === null || res.data.primary_address_line2 === '') ? " " : res.data.primary_address_line2)
                    setAddress(addressValue)
                })


                var todayDate = new Date();
                var date = new Date();
                // var year = todayDate.getFullYear();
                // var month = todayDate.getMonth();
                var today = date.getDate();
                var incrementedDays = date.setDate(today + 2);
                var incrementedDate = new Date(incrementedDays)
                var incrementedDateByTwo = incrementedDate.getDate();
                var incrementedYear = incrementedDate.getFullYear();
                var incrementedMonth = incrementedDate.getMonth();
                var formatedIncrementedDate = incrementedYear+"-"+(incrementedMonth < 9 ? "0"+(incrementedMonth+1) : (incrementedMonth+1))+"-"+(incrementedDateByTwo < 10 ? "0"+incrementedDateByTwo : incrementedDateByTwo);
                setIncrementedDate(formatedIncrementedDate)

                console.log(todayDate, incrementedDate, today, incrementedDateByTwo, formatedIncrementedDate)
                
    },[]) 

    function handleData(){
        if(date != ''){
            history.push({
                pathname: '/PaymentPlan',
                        state: { id: user.id,
                            date:date,
                            weekDays: weekDays.length > 0 ? weekDays : (props.mealType === 1 ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']),
                            // address: address,
                            address: selectAddress === "primary_address" ? user.primary_address_line1 : user.secondary_address_line2,
                            mealId:props.mealID,
                            meal:props.meal,
                            selectedTimingSlot:selectedTimingSlot,
                            extraCharge:extraCharge
                        }
                })
        }else {
            var errorMessage = document.getElementById('successDate');
            errorMessage.innerHTML = 'please enter date';
      
          } 
    }
                
    return(     
      
          
                    <div className="row">
 
                        {/* <AddressDialogBoxDropDown  changeAddress={addressDialog} makeAddress={handleAdrress}  addressValue={changeAddressValue}/> */}
                        {/* <AddressDialogBox
                          changeAddressBox={changeAddressData} 
                         makeAddressBox={handleChangeAdrress}
                         userData ={user}
                         makeChangeAdderess={handleAdrress}

                        /> */}
                        <PrimaryaddDialog  changeAddressBox={changeAddressData} 
                         makeAddressBox={handleChangeAdrress}
                         userData ={user}
                         makeChangeAdderess={handleAddress}/> 
                    
                    <div className="col-md-5 col-sm-12">
                   
                    <div className="img_container_mealaddress">
                    <img src={meal.picture} alt="rounded_img" className="rounded-circle card_img_rounded_mealaddress"></img>
                    </div>
                    
                    <h5 className=" immunne_text_mealaddress" >{meal.name}</h5>
                    <h5 className=" bhd_text_mealaddress">{meal.subtitle}</h5>
                    <h5 className=" bhd_text_mealaddress_subttile">{meal.details}</h5>
                    </div>
                    
                    
                    <div className="vertical_line_appointment_submealaddress"></div>
                    
                    
                    
                    <div className="col-md-6 col-sm-12">
                    
                    <div className="row">
                    <div className="col-md-6 col-sm-12">
                    <h5 className="week_text_title">Days of the week</h5>
                    </div>
                    <div className="col-md-6 col-sm-12">
                    
                    <h6 className="subtitle_mealaddress">Days of the week you want your food to be delivered.</h6>
                    
                    </div>
                    
                    
                    </div>
                    <div className="row weekdata_mealaddress">
                     <WeekDataMemo  mealType={props.mealType} handleWeekDays={handleWeekDays} handleMaximumSelection={handleMaximumSelection}/> 
                    </div>

                    <div className="row" style={{paddingLeft: '30px'}}>
                        <span id="maximumSelectionMessage" style={{color:'#800080', fontWeight:600, fontSize:".8rem"}}>{maximumSelectionMessage}</span>
                    </div>
                    
                    <div className="row">
                    <div className="col-md-6">
                    <h6 className="select_date_mealaddress">Select Starting Date</h6>
                    
                    <div className="datepicker_container_mealaddress">
                    <SelectdatePicker dateChange={handleDateChange} minValue={incrementedDate}/>
                    <span id="successDate" style={{color:'#800080', fontWeight:600}}></span>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <h6 className="select_date_mealaddress">Delivery Time</h6>
                    
                    <div className="">
                    <div className="male_container">
                    
                    <label htmlFor="male" className="male_text_submeal">6AM to 12AM</label>
                    <input type="radio" className="male_input_submeal" id="morning" name="timeSlot" value="morning" onClick={() => setSelectedTimimgSlot("morning")}></input>
                    <span className="checkmark"></span>
                    
                    </div>

                    <div>
                    <label htmlFor="female" className="male_text_submeal_second">1PM to 4PM</label>
                    <input type="radio" className="male_input_submeal_second" id="afternoon" name="timeSlot" value="afternoon" onClick={() => handleExtraChargeForSelectedTimingSlot("afternoon")}></input>
                    </div>
                    
                    
                    </div>
                    
                    </div>
                    </div>
                    
                    
                    
                    <h6 className="shipping_title_mealaddress">Shipping Address</h6>
                    
                    <span className="change_text_mealaddress" 
                    // onClick={() => setToggleTextarea(!toggleTextarea) }
                     onClick={handleUserData}
                    
                    >Change</span>
                    
                    
                    <div className="row">
                    
                    <div className="col-md-12 col-sm-12">
                    <p id="addressValue" style={{background:'#fff', height:'80px', width:'100%', paddingLeft:'5px', fontSize:'0.8em', borderRadius:'5px'}}>
                        {address}
                    </p>
                    </div>
                    
                    
                    
                    </div>
                    
                    
                    
                    <div className="btn_Mealadresscontainer">
                    <button className="continue_btn_mealaddress" onClick={handleData}>
                
                    CONTINUE
                    </button>
                    </div>
                    
                    
                    
                    </div>
                 
                 
                    
                    </div> 
                    )
                }
                
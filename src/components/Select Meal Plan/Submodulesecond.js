import React,{useEffect,useState} from 'react'
import './SelectMealPlan.css'
import './Submodulessecond.css' 
import PrimaryaddDialog from '../Dialog/Primary address Dialog/PrimaryaddDialog';
import SelectionCalenderMain from '../Dialog/Selection Calender Dialog/SelectionCalenderMain.js'
 
export default function Submodulesecond(props){ 
    const [addressDialog,setAddressDialog] = useState(false) 

    function handleAdrress(data){
        if(data === true){
            setAddressDialog(true)
        }else{
            setAddressDialog(false) 
        }
         
    } 
  

    return(
         
        <div> 
            <PrimaryaddDialog changeAddress={addressDialog} makeAddress={handleAdrress} />
            <SelectionCalenderMain/>
{/* 
        <AddressDialogBoxDropDown  changeAddress={addressDialog} makeAddress={handleAdrress}/>
        <AddressDialogBox/> */}
        
        <div className="submodule_second_container">
           
        <div className="card submodule_second_card">
        <div className="row">
        
        <div className="col-md-2 col-sm-12">
        
        <img src={props.recentPurchase.picture} alt="food" className="rounded-circle card_img_rounded_submodul"></img>
        
        </div>
        
        <div className="col-md-8 col-sm-12 center_submodule_second">
        
        <h6 className="title_submodul_second">{props.recentPurchase.name}</h6>
        <h6 className="paragraph_submodule_second">{props.recentPurchase.details}</h6>
        
        <div className="row trippple_submodule_second">
        <h6 className="first_word_link">{props.recentPurchase.duration} day Meal Plan</h6>
        <h6 className="sec_word_link">{props.recentPurchase.type == 0 ? "With Weekend" : "Without Weekend" }</h6>
        <h6 className="third_word_link">Start Date - {props.startDate}</h6>
        </div>
        
        </div>
        
        <div className="col-md-2 col-sm-12"> 
     
        <button className="btn btn-default address_btn_submodule_second" 
        //  onClick={() => setAddressDialog(true)}
        >
        Address
        
        </button>
        
        <button className="btn btn-default breaks_btn_submodule_second_" onClick={() => setAddressDialog(true)}>
        Breaks
        
        </button>
    
        
        </div>
        
        </div>
        </div>
        </div>
        </div>
        
        
        )
        
        
    }
    
    
    
    
    
    
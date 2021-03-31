import React from 'react'
import './AddressShipping.css'


export default function AddressDialogBox(props){
    function selectAddress(id){
        props.makeChangeAdderess(id)
        var selectedAddress = document.getElementsByClassName("txtarea_secondary_address")
        for( var i=0; i<selectedAddress.length ; i++){
            if(selectedAddress[i].id === id){
                console.log(selectedAddress[i])
                selectedAddress[i].style.backgroundColor="#8BC53F"
                selectedAddress[i].style.color="#FFF"
            }else{
                selectedAddress[i].style.backgroundColor="#fbfbfb"
                selectedAddress[i].style.color="#000"
            }
        }

    } 

    console.log(props)
    if(props.changeAddressBox === true) 
    {
        return(
 
    
            <div className="shipping_address_container">
                
            
             <div className="primary_address">Primary Address</div>
                <p className="txtarea_secondary_address"  id="primary_address" onClick={() => selectAddress("primary_address")}>{((props.userData.primary_address_line1 === null || props.userData.primary_address_line1 === '') ? " " : props.userData.primary_address_line1) + " " + ((props.userData.primary_address_line2 === null || props.userData.primary_address_line2 === '') ? " " : props.userData.primary_address_line2)}</p>
                
                <div className="secondary_address__Button">
             <div className="secondary_address">Secondary Address</div>
             <div className="add_button" >ADD</div>
             </div>
              
                <p className="txtarea_secondary_address" id="secondary_address" onClick={() => selectAddress("secondary_address")}>{((props.userData.secondary_address_line1 === null || props.userData.secondary_address_line1 === '') ? "" : props.userData.secondary_address_line1 ) + " " + ((props.userData.secondary_address_line2 == null || props.userData.secondary_address_line2 === '')? " ": props.userData.secondary_address_line2)}</p>
            
                <button className="btn_done" onClick={() => props.makeAddressBox(false)}>Done</button>
         
            </div>
        ) 
    }else{
        return(
            <>
            </>
        )
    }


  
   
} 
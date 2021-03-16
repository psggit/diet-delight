import React from 'react'
import './AddressShipping.css'


export default function AddressDialogBoxDropDown(props){
   
    if(props.changeAddress === true){
        return( 
          
    
            <div className="shipping_address_container_data"> 
               
                <select name="Address"  id="Address-select" className="select_address">
                <option value="">--Please choose an address--</option>  
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>  
            
                </select>
            
            
    
                <div className="textarea_data">
             
                <textarea class="txtarea_house_address"></textarea>
                <textarea class="txtarea_house_address"></textarea>
                </div>
    
              
                    <button class="btn_add" onClick={props.addressValue}>ADD</button>
                
    
            </div> 
      
        )

    }else{
        return(
            <>
            </>
        )
    }
   
} 
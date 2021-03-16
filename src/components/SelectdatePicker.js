import React, { useState } from 'react'
import './Appointment/Appointmentmain.css'

export default function SelectdatePicker(props){
    const[date,setDate] = useState('')
    console.log(props)
    console.log(props.incrementedDate)
    console.log(document.getElementsByName('dateofbirth'))

 
    return(
        
        <div>

        <input type="date" value={date} min={props.minValue} onChange={(e) =>{setDate(e.target.value ) 
        props.dateChange(e.target.value)}} name="dateofbirth" id="dateofbirth" className="appointmentdate_subtitle"></input>
        
        </div>
        
        )
    }
     
    

// import React, { useState } from 'react'
// import './Appointment/Appointmentmain.css'
// import validator from 'validator'

// export default function SelectdatePicker(props){
//     const[date,setDate] = useState('')
//     console.log(props)
//     console.log(props.incrementedDate)
//     console.log(document.getElementsByName('dateofbirth'))


//     handleData = (value) =>{
//         if (validator.isDate(value)) { 
//             setDate('Valid Date :)') 
//           } else { 
//             setDate('Enter Valid Date!') 
//           } 

//     }

 
//     return(
        
//         <div>

//         <input type="date" value={date} min={props.incrementedDate} onChange={(e) =>{handleDate(e.target.value ) 
//         props.dateChange(e.target.value)}} name="dateofbirth" id="dateofbirth" className="appointmentdate_subtitle"></input>
        
//         </div>
        
//         )
//     }
     
    
import React,{useState} from 'react'
import NavDrawer from '../Navdrawer';



export default function Kitchen(){

    const handleDrawer = (data) => {
        // if(data === 'allConsultants'){
        //     setListOfConsultation(true)
        //     setNewConsultation(false)
        // }else{
        //     setNewConsultation(true)
        //     setListOfConsultation(false)
        // }
    }

    return(
        <>
        <NavDrawer drawerItems={[{showText:'All Consultations', connectedLink:'allConsultants'}, {showText:'Add New Consultation', connectedLink:'addNewConsultant'}]} handleDrawer={handleDrawer}/>
        <h1>"From Kitchen"</h1>
        </>
    )
}
import React,{useState} from 'react'
import NavDrawer from '../Navdrawer';
import ListofConsultation from '../Admin/Consultations/ListofConsultation';
import PostConsultation from '../Admin/Consultations/PostConsultation';







export default function Consultant(){
    const [listOfConsultation, setListOfConsultation] = useState(true);
    const [addNewConsultation, setNewConsultation] = useState(false);





    const handleDrawer = (data) => {
        if(data === 'allConsultants'){
            setListOfConsultation(true)
            setNewConsultation(false)
        }else{
            setNewConsultation(true)
            setListOfConsultation(false)
        }
    }






    return(
        <>
        <NavDrawer drawerItems={[{showText:'All Consultations', connectedLink:'allConsultants'}, {showText:'Add New Consultation', connectedLink:'addNewConsultant'}]} handleDrawer={handleDrawer}/>
        {listOfConsultation && <ListofConsultation/>}
        {addNewConsultation && <PostConsultation/>}
        </>
    )
}
import React,{useState} from 'react'
import NavDrawer from '../Navdrawer';
import ListofOrderList from '../Admin/Order/ListofOrderList';
import PostOrder from '../Admin/Order/PostOrder';






export default function Accountant(){
    const [mealPurchase, setMealPurchase] = useState(true);
    const [consultationPurchase, setConsultationPurchase] = useState(false);





    const handleDrawer = (data) => {
        if(data === 'mealPurchase'){
            setMealPurchase(true)
            setConsultationPurchase(false)
        }else{
            setConsultationPurchase(true)
            setMealPurchase(false)
        }
    }






    return(
        <>
        <NavDrawer drawerItems={[{showText:'Meal Purchase', connectedLink:'mealPurchase'}, {showText:'Consultation Purchase', connectedLink:'consultationPurchase'}]} handleDrawer={handleDrawer}/>
        {mealPurchase && <ListofOrderList/>}
        {consultationPurchase && <PostOrder/>}
        </>
    )
}
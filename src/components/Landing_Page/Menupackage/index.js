import React,{useEffect,useState} from 'react'
import { Menupack, Packup, Packdown, Downup } from './MenupacakgeElement'
import axios from '../../../axiosInstance'
import Menubox from './Menubox';
import { Heading, Subheading, Para, Line } from '../../MainComponents';


const MenuPackage = () => {
    const [mealup, setMealup] = useState([]);

    useEffect(() => {

        axios.get(`menus?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setMealup(res.data.data) 
        })

    },[])
 

    const meals = mealup.map((meal) =>  <Menubox
    key={Math.random()}
    meal={meal} 
/>); 

    return (
 
        <> 
            <Menupack id="menu">
                <Packup>
                    <Heading size="2rem" color="rgba(137,197,63,1)" length="1px">
                        We use only the finest, freshest farm-to-table ingredients.
                    </Heading>
                    <Subheading size="2rem" color="purple" length="1px">
                        OUR MENU PACKAGE
                    </Subheading>
                    <Line height="5px" back="rgba(137,197,63,1)" />
                    <Para weight="800" width="350px">
                        Our menus are fit--perfectlty balanced, calorie controlled, and portioned to satisfy.
                    </Para>
                </Packup>
                <Packdown>
                    <Downup>
                        {
                            meals
                        }
                    </Downup>
                </Packdown>
            </Menupack>
        </>
    )
}

export default MenuPackage

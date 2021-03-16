import React,{useEffect,useState} from 'react'
import MealBox from './MealBox';
import { Meal, Mealup, Mealdown } from './MealElements';
import { Heading, Line } from '../../MainComponents'
import axios from '../../../axiosInstance'

const Mealplan = () => {

    const [duration, setDuration] = useState([]);


    useEffect(() => {

        axios.get(`durations?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setDuration(res.data.data)
          
        })

    },[])
 
    const durations = duration.map((durationdata) =>  <MealBox
    key={Math.random()} 
    // title={durationdata.title}
    // selection={durationdata.subtitle}
    // description={durationdata.details}
    duration={durationdata}

/>);


    return (
        <Meal id="plan">
            <Mealup>
                <Heading weight="300" color="purple" length="1px" >
                    CHOOSE YOUR MEAL PLAN
                </Heading>
                <Line back="rgba(137,197,63,1)" width="100px" />
            </Mealup>
            <Mealdown>
                {
                    durations
                }
            </Mealdown>
        </Meal>
    )
}

export default Mealplan

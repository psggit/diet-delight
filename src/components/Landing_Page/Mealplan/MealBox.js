// import React from 'react'
// import { Mealbox, Mealbtn, Mealbtnbox } from './MealElements'

// import { Heading, Subheading, Para } from '../../MainComponents'

// const MealBox = ({ title, selection, description, }) => {
//     return (
//         <Mealbox>
//             <Heading color="white" length="1px" weight="300">{title}</Heading>
//             <Subheading color="white" length="1px" weight="200" size="1.5rem"> {selection} </Subheading>
//             <Para color="white" size="0.9rem" width="210px"> {description}   </Para>
//             <Mealbtnbox>
//                 <Mealbtn to="/MealpkgSubscription" > SUBSCRIPTION </Mealbtn>
//             </Mealbtnbox>
//         </Mealbox>
//     ) 
// }

// export default MealBox
   

import React from 'react'
import { Mealbox, Mealbtn, Mealbtnbox } from './MealElements'

import { Heading, Subheading, Para } from '../../MainComponents'

const MealBox = (props) => {

    return (
        <Mealbox>
            <Heading color="white" length="1px" weight="300">{props.duration.title}</Heading>
            <Subheading color="white" length="1px" weight="200" size="1.5rem"> {props.duration.subtitle} </Subheading>
            <Para color="white" size="0.9rem" width="210px"> {props.duration.details}   </Para>
            <Mealbtnbox>
                <Mealbtn to={{
                pathname: '/MealpkgSubscription',
                state: { duration:props.duration,
                }
                }}> SUBSCRIPTION </Mealbtn>
            </Mealbtnbox>
        </Mealbox>
    ) 
}

export default MealBox
   
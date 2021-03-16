import React from 'react'

import { Rating, Left, Right } from './RatingElements'
import { Subheading, Image, Para } from '../../MainComponents'

const RatingMap = ({ name, id, rating, desc, image }) => {
    return (
        <>
            <Rating>
                <Left>
                    <Image alt="Man" height="100px" width="100px" style={{ borderRadius: "100%" }} src={image} />
                    <Subheading color="white" size="1.2rem">
                        {name}
                    </Subheading>
                    <Para color="white" size="0.9rem">
                        {id}
                    </Para>
                </Left>
                <Right>
                    <Para color="white" align="none">
                        {rating}
                    </Para>
                    <Para color="white" align="none" size="0.9rem" Mwidth="300px">
                        {desc}
                    </Para>
                </Right>
            </Rating>
        </>
    )
}

export default RatingMap

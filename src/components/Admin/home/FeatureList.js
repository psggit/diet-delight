import React from 'react'
import { Main } from './HomeElements'

import { Image, Subheading } from '../../MainComponents'

const FeatureList = ({ picture, name }) => {
    return (
        <Main>
            <Image alt="meal" src={picture} width="320px" />
            <Subheading color="rgb(119, 131, 143, 1)" size="1.5rem" weight="500">
                {name}
            </Subheading>
        </Main>
    )
}

export default FeatureList

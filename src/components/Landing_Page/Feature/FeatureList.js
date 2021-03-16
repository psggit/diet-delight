import React from 'react'
import { Main, FeatIcons, Add, Heart, IconBox } from './FeatureElement'

import { Image, Subheading } from '../../MainComponents'

const FeatureList = ({ picture, name }) => {
    return (
        <>
            <Main>
                <Image alt="meal" src={picture} width="320px" />
                <Subheading color="rgba(137,197,63,1)" size="1.5rem" weight="500">
                    {name}
                </Subheading>
                <FeatIcons>
                    <IconBox>
                        <Add />
                    </IconBox>
                    <IconBox>
                        <Heart />
                    </IconBox>
                </FeatIcons>
            </Main>
        </>
    )
}

export default FeatureList

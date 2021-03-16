import React from 'react'

import { Work, WorkImage, Btnbox, Btn } from './WorkElement'

import { Heading, Subheading, Para } from '../../MainComponents'


const WorkMap = ({ image, title, down, descript, btn }) => {
    return (
        <Work>
            <WorkImage alt="work" src={image} />
            <Subheading weight="500" size="1.5rem" color="purple">
                {title}
            </Subheading>
            <Heading weight="500" top="0px" size="1.5rem" color="purple">
                {down}
            </Heading>
            <Para width="230px" weight="600" top='20px'>
                {descript}
            </Para>
            <Btnbox>
                <Btn>
                    {btn}
                </Btn>
            </Btnbox>
        </Work>
    )
}

export default WorkMap

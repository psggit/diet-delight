import React from 'react'

import { Work, WorkImage, Btnbox, Btn, NavLinks } from './WorkElement'

import { Heading, Subheading, Para } from '../../MainComponents'


const WorkMap = ({ image, title, down, descript, btn, to,openBMICalculator }) => {
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
                {/* <Btn to={to}>
                    {btn}
                </Btn> */}
                <NavLinks
                  spy={true}
                  to={to}
                  smooth={true}
                  offset={-80}
                  duration={200}
                  onClick={()=>{
                      if(!to){
                        openBMICalculator()
                      }
                  }}
                >
                  {btn}
                </NavLinks>
            </Btnbox>
        </Work>
    )
}

export default WorkMap

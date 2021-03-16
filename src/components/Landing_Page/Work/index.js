import React from 'react'

import weight from '../../../assets/weight.jpg'
import hand from '../../../assets/handmess.jpg'
import bowl from '../../../assets/bowl.jpg'

import WorkMap from './WorkMap'

import { Working, Head, Tail } from './WorkElement'
import { Heading, Line } from '../../MainComponents'

const Work = () => {

    const items = [
        {
            image: weight,
            title: "Let's Calculate",
            down: "Your Dietary Needs",
            descript: "Lorem ipsum dolor sit amet, conmsdasm asdasd it, ahjdhja tempor",
            btn: "CALCULATE",
        },
        {
            image: hand,
            title: "Get Consultation",
            down: " with Our Experts",
            descript: "Lorem ipsum dolor sit amet, conmsdasm asdasd it, ahjdhja tempor",
            btn: "TALK TO OUR EXPERT",
        },
        {
            image: bowl,
            title: "Let's create",
            down: "Your Diet Plan",
            descript: "Lorem ipsum dolor sit amet, conmsdasm asdasd it, ahjdhja tempor",
            btn: "CHOOSE YOUR DIET PLAN",
        }
    ]

    return (
        <>
            <Working>
                <Head>
                    <Heading color="purple" top="10px" length="1px">
                        HOW IT WORKS
                    </Heading>
                    <Line back="rgba(137,197,63,1)" />
                </Head>

                <Tail>
                    {
                        items.map((item) => (
                            <WorkMap image={item.image}
                                key={Math.random()}
                                title={item.title}
                                down={item.down}
                                descript={item.descript}
                                btn={item.btn}
                            />
                        ))
                    }
                </Tail>

            </Working>
        </>
    )
}

export default Work

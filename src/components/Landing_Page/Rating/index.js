import React from 'react'
import { Main, Up, Mid, MidLeft, MidRight, Down } from './RatingElements'

import { Heading, Subheading, Line, Para, Image } from '../../MainComponents'

import Man from '../../../assets/ratingV.jpg'
import Man2 from '../../../assets/ratingI.png'
import RatingMap from './RatingMap'

const Rating = () => {

    const ratings = [
        {
            name: "Peter James",
            id: "@peterjames",
            image: Man2,
            rating: "🌟 🌟 🌟 🌟",
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
        {
            name: "Harry Potter",
            id: "@harrypotter",
            image: Man2,
            rating: "🌟 🌟 🌟 🌟",
            desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
    ]

    return (
        <>
            <Main>
                <Up>
                    <Subheading color='white'>
                        Join thousands of people eating healthly.
                    </Subheading>
                    <Heading color='white'>
                        SUCCESS STORIES
                    </Heading>
                    <Line back="purple" />
                </Up>
                <Mid>
                    <MidLeft>
                        <Image alt="Man" src={Man} height="190px" width="330px" />
                    </MidLeft>
                    <MidRight>
                        <Subheading size="1.5rem" color="white">
                            Mohammed Saddiq
                        </Subheading>
                        <Para top="0px" color="white" align="none" Malign="center">
                            @wedohb
                        </Para>
                        <Para size="0.8rem" top="20px" color='white' width="500px" align="none" Mwidth="320px">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </Para>
                        <Para size="0.8rem" top="0px" color='white' Mwidth="320px" width="500px" align="none" >
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </Para>
                    </MidRight>
                </Mid>
                <Down>
                    {
                        ratings.map((rating) => (
                            <RatingMap
                                key={Math.random() * 100}
                                name={rating.name}
                                id={rating.id}
                                desc={rating.desc}
                                image={rating.image}
                                rating={rating.rating}
                            />
                        ))
                    }
                </Down>
            </Main>
        </>
    )
}

export default Rating

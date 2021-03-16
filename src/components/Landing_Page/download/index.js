import React from 'react'

import { Main, Up, Down, Set, Anchor } from './DownloadElements'
import { Heading, Para, Line, Image } from '../../MainComponents'

import google from '../../../assets/google.png';
import apple from '../../../assets/apple.png';


const Download = () => {
    return (
        <>
            <Main>
                <Set>
                    <Up>
                        <Heading color="purple" length="1px" size="3.5rem">
                            DOWNLOAD OUR APP
                    </Heading>
                        <Line top="20px" back="rgba(137,197,63,1)" />
                        <Para width="550px" weight="600" Mwidth="300px">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ullamcorper lacus at turpis tincidunt ullamcorper.
                    </Para>
                    </Up>
                    <Down>
                        <Anchor href="https://apps.apple.com/in/app/apple-store/id375380948" target="_blank"
                        >
                            <Image alt="apple" Mwidth="150px" height="81px" src={apple} />
                        </Anchor>
                        <Anchor href="https://play.google.com/store" target="_blank"
                        >
                            <Image alt="google" Mwidth="150px" height="80px" src={google} />
                        </Anchor>
                    </Down>
                </Set>
            </Main>
        </>
    )
}

export default Download

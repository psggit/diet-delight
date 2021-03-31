import React,{useState, useEffect} from 'react'
import { HomeMain, HomeContainer, HomeSearch, HomeIcon, Search, Searchbtn, RightArrow, Icons, Icon, Message, Heading, Whatsapp, Containerup } from './HomeElements'
import DietDataDetails from '../../Diet_Free_Data/index'
import axios from '../../../axiosInstance';
import { Link } from 'react-router-dom';

const Home = () => {

    const messageOnWhatsAppWeb = () => {
        const _adminMobile = process.env.REACT_APP_ADMIN_MOBILE;
        const _message = "Hello, This is a Dummy Message";
        const _whatsAppWebUrl = `https://api.whatsapp.com/send?phone=${_adminMobile}&text=${_message}`;
        console.log("Mobile :", _adminMobile);
        console.log("Mobile :", _whatsAppWebUrl);

        window.open(_whatsAppWebUrl,'_blank')
    };

    return (
        <div style={{position:"relative"}}>
            <HomeMain id="home">
           
                <HomeContainer>
              
                    <Containerup>
                        <Heading> 
                            EAT SMART
                </Heading>
                        <Heading>
                            EAT HEALTHLY
                </Heading>
                        {/* <HomeSearch>
                            <HomeIcon>
                                <Searchbtn />
                            </HomeIcon>
                            <Search placeholder="Search for menu, deit plan, etc.. " />
                            <HomeIcon border="0px 10px 10px 0px">
                                <RightArrow />
                            </HomeIcon>
                        </HomeSearch> */}
                    </Containerup>
                    <Icons>
                        {/* <Icon>
                            <Message />
                        </Icon> */}
                        <Icon>
                            <Whatsapp onClick={messageOnWhatsAppWeb} />
                        </Icon>
                    </Icons>
                </HomeContainer>
            </HomeMain>
        </div>
    )
}

export default Home

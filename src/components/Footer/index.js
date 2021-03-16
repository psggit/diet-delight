import React from 'react'

import { Main, Container, Up, Items, Lists, Google, Apple, Set, SetDown, SetDownDown, Anchor, Facebook, Instagram, Twitter, Whatsapp, Down, DownLeft, DownLup, DownLdown, DownRight, DownRup, DownRdown, Email, Signup } from './FooterElements';
import { Subheading, Line, Para, Image } from '../MainComponents'

import pay1 from '../../assets/pay1.png';
import pay2 from '../../assets/pay2.png';
import pay3 from '../../assets/pay3.jpeg';

const Footer = () => {

    return (
        <>
            <Main>
                <Up>
                    <Container>
                        <Subheading color="white" size="1.2rem" weight="400" align="none">
                            ABOUT DIET DELIGHT
                        </Subheading>
                        <Line back="white" width="50px" height="2px" />
                        <Lists>
                            <Items>Our Story</Items>
                            <Items>How It Works</Items>
                            <Items>Consultation Packages</Items>
                            <Items>Terms and Conditions</Items>
                            <Items>Privacy Policy</Items>
                            <Items>Carrers</Items>
                        </Lists>
                    </Container>
                    <Container>
                        <Subheading color="white" size="1.2rem" weight="400" align="none">
                            POPULAR MEAL PLANS
                        </Subheading>
                        <Line back="white" width="50px" height="2px" />
                        <Lists>
                            <Items>10 Days</Items>
                            <Items>2 Weeks</Items>
                            <Items>1 Months</Items>
                            <Items>Juicing Package</Items>
                        </Lists>
                    </Container>
                    <Container>
                        <Subheading color="white" size="1.2rem" weight="400" align="none">
                            POPULAR MENU PACKAGES
                        </Subheading>
                        <Line back="white" width="50px" height="2px" />
                        <Lists>
                            <Items>Fbd</Items>
                            <Items>Full Meal</Items>
                            <Items>Immune Booster</Items>
                            <Items>Keto</Items>
                            <Items>One Meal</Items>
                            <Items>Salad Delight</Items>
                        </Lists>
                    </Container>
                    <Container>
                        <Subheading color="white" size="1.2rem" weight="400" align="none">
                            COUSTEMER SERVICE
                        </Subheading>
                        <Line back="white" width="50px" height="2px" />
                        <Lists>
                            <Items>FAQs</Items>
                            <Items>Delivery</Items>
                            <Items>Secured Payemnt Methods</Items>
                            <Items>Exchanges & Returns</Items>
                            <Items>Order Status</Items>
                            <Items>Contact Us</Items>
                        </Lists>
                    </Container>
                    <Container>
                        <Subheading color="white" size="1.2rem" weight="400" align="none">
                            DOWNLOAD OUR APP
                        </Subheading>
                        <Line back="white" width="50px" height="2px" />
                        <Set>
                            <a style={{
                                display: "flex", textDecoration: "none", justifyContent: "center", alignItems: "center",
                                border: "2px solid white", borderRadius: "10px",
                                height: "50px",
                            }} href="https://play.google.com/store"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Google />
                                <Subheading top="0" color="white" size="1.3rem" weight="400" align="none">
                                    Play Store
                                </Subheading>
                            </a>
                        </Set>
                        <Set>
                            <a style={{
                                display: "flex", textDecoration: "none", border: "2px solid white", borderRadius: "10px", height: "50px",
                                justifyContent: "center", alignItems: "center"
                            }}
                                href="https://apps.apple.com/in/app/apple-store/id375380948" target="_blank" rel="noreferrer">
                                <Apple />
                                <Subheading top="0px" color="white" size="1.3rem" weight="400" align="none">
                                    App Store
                                </Subheading>
                            </a>
                        </Set>
                        <SetDown>
                            <Subheading color="white" size="1.2rem" weight="400" align="none">
                                FIND US ON
                        </Subheading>
                            <Line back="white" width="50px" height="2px" />
                            <SetDownDown>
                                <Anchor>
                                    <Facebook />
                                </Anchor>
                                <Anchor>
                                    <Instagram />
                                </Anchor>
                                <Anchor>
                                    <Twitter />
                                </Anchor>
                                <Anchor>
                                    <Whatsapp />
                                </Anchor>
                            </SetDownDown>
                        </SetDown>
                    </Container>
                </Up>
                <Down>
                    <DownLeft>
                        <DownLup>
                            <Para color="white">
                                KEEP IN TOUCH WITH DIET DELIGHT
                        </Para>
                            <Line back="white" width="50px" height="2px" />
                        </DownLup>
                        <DownLdown>
                            <Email placeholder="Enter Your E-mail" color="white" />
                            <Signup>
                                SIGN UP
                            </Signup>
                        </DownLdown>
                    </DownLeft>
                    <DownRight>
                        <DownRup>
                            <Image src={pay1} height="38px" width="120px" />
                            <Image src={pay2} mar="0 5px 0 0" radious="10px" fit="cover" height="35px" width="80px" />
                            <Image src={pay3} mar="0 5px 0 0" radious="10px" fit="cover" height="35px" width="80px" />
                        </DownRup>
                        <DownRdown>
                            <Para size="0.9rem" color="white">
                                &copy; 2020 DIET DELIGHT, ALL RIGHTS RESERVED
                            </Para>
                        </DownRdown>
                    </DownRight>
                </Down>
            </Main>
        </>
    )
}

export default Footer

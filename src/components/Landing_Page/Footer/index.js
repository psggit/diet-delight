import React from 'react'
import MailchimpSubscribe from "react-mailchimp-subscribe"

import { Main, Container, Up, Items, Lists, Google, Apple, Set, SetDown, SetDownDown, Anchor, Facebook, Instagram, Twitter, Whatsapp, Down, DownLeft, DownLup, DownLdown, DownRight, DownRup, DownRdown, Email, Signup } from './FooterElements';
import { Subheading, Line, Para, Image } from '../../MainComponents'

import pay1 from '../../../assets/pay1.png';
import pay2 from '../../../assets/pay2.png';
import pay3 from '../../../assets/pay3.jpeg';
import { Link } from "react-router-dom";
import { ImportExportOutlined } from '@material-ui/icons';
import { messageOnWhatsAppWeb } from '../utils';

const url = "https://gmail.us1.list-manage.com/subscribe/post?u=41bf26d4dc3702886e2411792&amp;id=3bb3679fe6";

// const NewsletterSubmit = () => {
//     const input = document.getElementById('newsletter-email').value
//     console.log(input);
// }

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
      email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });
  
    return (
      <div
        style={{
          display: "inline-block",
          paddingTop: '10px',
          paddingBottom: '10px'
        }}
      >
        
        <input
        style={{ background: 'transparent',
            border: '1px solid white',
            height: '30px',
            color: 'white',
            textDecoration: 'none',
            textAlign: 'center' }}
        ref={node => (email = node)}
        type="email"
        placeholder="Enter Your E-mail"
      />
        <button style={{ background: 'transparent',color: 'white',width: '100px',height: '30px',border: '1px solid white',marginLeft: '10px' }} onClick={submit}>
          SIGN UP
        </button>

        {status === "sending" && <div style={{ color: "#fff", fontWeight: '400', paddingLeft: '10px' }}>sending...</div>}
        {status === "error" && (
          <div
            style={{ color: "red", fontWeight: '400', paddingLeft: '10px' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "rgba(139,197,63,1)", fontWeight: '400', paddingLeft: '10px' }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      </div>
    );
  };

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
                        <Link to="/About">
                            <Items>Our Story</Items>
                            </Link>
                            <Items>How It Works</Items>
                            <Items>Consultation Packages</Items>
                            <Link to="/Termconditioncontent">
                            <Items>Terms and Conditions</Items>
                            </Link>
                            <Link to="/Termcondition">
                            <Items>Privacy Policy</Items>
                            </Link>
                            <Items>Careers</Items>
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
                            CUSTOMER SERVICE
                        </Subheading>
                        <Line back="white" width="50px" height="2px" />
                        <Lists>
                            <Items>FAQs</Items>
                            <Items>Delivery</Items>
                            <Items>Secured Payment Methods</Items>
                            <Items>Exchanges & Returns</Items>
                            <Items>Order Status</Items>
                            <Link to="/ConatctUsMain">
                                <Items>Contact Us</Items>
                            </Link>
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
                                <Anchor href="https://m.facebook.com/DietDeligh.BH/" target="_blank">
                                    <Facebook />
                                </Anchor>
                                <Anchor href="https://instagram.com/dietdelightbh?igshid=93ubathsq1zq" target="_blank">
                                    <Instagram />
                                </Anchor>
                                <Anchor href="https://twitter.com/DietDelightBH?s=08" target="_blank">
                                    <Twitter />
                                </Anchor>
                                <Anchor>
                                    <Whatsapp  onClick={messageOnWhatsAppWeb} />
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
                        {/* <DownLdown>
                            <Email placeholder="Enter Your E-mail" color="white" />
                            <Signup>
                                SIGN UP
                            </Signup>
                        </DownLdown> */}
                        <MailchimpSubscribe
                                url={url}
                                render={({ subscribe, status, message }) => (
                                    <CustomForm
                                    status={status}
                                    message={message}
                                    onValidated={formData => subscribe(formData)}
                                    />
                                )}
                                />
                    </DownLeft>
                    
                    <DownRight>
                        <DownRup>
                            <Image alt="payment" src={pay1} height="38px" width="120px" />
                            <Image alt="payment" src={pay2} mar="0 5px 0 0" radious="10px" fit="cover" height="35px" width="80px" />
                            <Image alt="payment" src={pay3} mar="0 5px 0 0" radious="10px" fit="cover" height="35px" width="80px" />
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

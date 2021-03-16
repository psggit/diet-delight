import React from 'react'
import './ConatcUs.css'
import call from '../../assets/phone.png'
import envelop from '../../assets/envelope.png'

export default function ConatctUsMain(){
    return(
        <>
        
        <div className="conatct_us_main_container">
        <div className="card contact_card">
        <div className="row conatc_row">
        
        <div className="col-md-6 ">
        <h6 className="header_conatc_us">Get in Touch with us</h6>
        
        <h6 className="number_conact"><img src={call} className="call_icon_contact_us" alt="call"></img>+12 34567 89523</h6>
        
        <h6 className="email_conatct"><img src={envelop} alt="msg" className="email_img_conatc_us"></img>something@someone.com</h6>
        
        <p className="map_conatainer">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236212.96441292003!2d73.03299761055541!3d22.32236010187252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1613989071941!5m2!1sen!2sin" 
        style={{border:"0"}} allowfullscreen="" className="map_conatc_us" loading="lazy">
        </iframe>
        </p>
        </div>
       
        
        <div className="col-md-5 right_side_conat_us">
        <h6 className="title_contact">Name</h6>
        <input className="first_name_input" type="text"></input>
        
        
        <h6 className="title_contact">Email</h6>
        <input className="first_name_input" type="text"></input>
        
        
        <h6 className="title_contact">Subject</h6>
        <input className="first_name_input" type="text"></input>
        
        <h6 className="title_contact">Message</h6>
        <textarea className="msg_textarea" id="Message" rows="2" cols="20"></textarea>
        <br></br>
        
        <div className="btn btn_submit_conact">
        <button className="btn btn_submit_contact">Submit</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        
        </>
        
        )
    }
    
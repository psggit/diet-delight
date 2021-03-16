import React from 'react'
import like_icon from '../assets/like.png'
// import unlike_icon from '../assets/unlike.png'


export default function HeartIcon(){
    return(
        <div>
        
        <img src={like_icon} alt="like" className="" style={{width:"25px"}}></img>

        {/* <img src={unlike_icon} alt="unlike" class="" style={{width:"25px"}}></img> */}
        
        
        </div>
        
        )
    }
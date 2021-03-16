import React,{useState,useEffect} from 'react'
import card_img_rounded from '../../assets/food1.jpg'
import unlike from '../../assets/unlike.png'
import veg_icon from '../../assets/vegicon.png'
import './TabMenuPkg.css'

export default function TabMenuPkg(){
    
    const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_menu_pkg")
    
    
    function colorHandle(){
        likeColor === "fa fa-heart-o heart_menu_pkg" ? setLikeColor("fa fa-heart heart_menu_pkg_fill") : setLikeColor("fa fa-heart-o heart_menu_pkg")   
    }
    
    return(
        
        
        
        <div className="col-md-6 col-xs-12">
        
        <div className="card text-center card_border_menupkg">
        
        
        <div className="row">
        <div className="col-md-3 col-sm-12">
        <img src={card_img_rounded} className="rounded-circle tabmenu_roundedimg"></img>
        
        </div>
        <div className="col-md-7 col-sm-12">
        
        <div className="media-body content_media">
        <h5 className="something_text">Something salad fgfd</h5>
        {/* <h5 className="something_about_text">About dish like crunch with something chrunchy and salad</h5> */}
        </div>
        
        </div>
        
        <div className="col-lg-2 col-md-2 col-xs-12">
        
        <img src={veg_icon} className="veg_icon_menupkg"></img>
        
        
        <i className={likeColor} aria-hidden="true" onClick={colorHandle}></i>
        {/* <img src={unlike} className="unlike_icon_menupkg"></img> */}
        
        </div>
        
        </div>
        
        
        
        </div>
        
        
        </div>
        
        
        
        
        )
    }
    
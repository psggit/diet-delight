import React,{useState,useEffect} from 'react'
import veg_icon from '../../assets/vegicon.png'
import './TabMenuPkg.css'

import axios from '../../axiosInstance';
import VegComponent from '../veg non veg component/VegComponent.js'
import NonvegComponent from '../veg non veg component/NonvegComponent.js'

export default function MainCourse(props){

    const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_menu_pkg")
    
    function colorHandle(menu_item_id){
        likeColor === "fa fa-heart-o heart_menu_pkg" ? setLikeColor("fa fa-heart heart_menu_pkg_fill") : setLikeColor("fa fa-heart-o heart_menu_pkg")
        handleLike(menu_item_id)
    }
    // useEffect(() => {
    //     axios.get(`menu-items?menu_id=`+props.categoryData.menu_id+`&menu_category_id=`+props.categoryData.id, {

    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //         }
    //     }).then((res) => {

    //         console.log(res.data.data)
    //         setMenuItems(res.data.data)
    //     })
    // }, [props.categoryData.menu_id,props.categoryData.id])
    
    // const [like ,setLike] = useState("")


    useEffect(() => {
        if(props.favouriteItem){
            setLikeColor("fa fa-heart heart_menu_pkg_fill")
        }else{
            setLikeColor("fa fa-heart-o heart_menu_pkg")
        }

    }, [props.favouriteItem])
    
    function handleLike(id){  

        if(likeColor === 'fa fa-heart-o heart_menu_pkg'){
            axios.post(`favourites`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                
                menu_item_id: id
                
            }).then((res) => {
                console.log(res)
                props.notifyAddedFavourite(props.menuItem.id)
            }).catch(err => console.log(err))
        }else{
            axios.delete('favourites/'+props.menuItem.id).then((res) =>{
                props.notifyAddedFavourite(props.menuItem.id)
                console.log(res)}).catch((err) => console.log(err));
        }


        
    } 
    
    
    return(
        <div className="col-md-6 col-xs-12">

        <div className="card text-center card_border_menupkg">
        
        
        <div className="row">
        <div className="col-md-3 col-sm-12">
        <img  src={props.menuItem.picture} alt="food" className="rounded-circle tabmenu_roundedimg"></img>
        
        </div>
        <div className="col-md-7 col-sm-12">
        
        <div className="media-body content_media">
        <h5 className="something_text">{props.menuItem.name}</h5>
    {/* <h5 className="something_about_text">About dish like crunch with something chrunchy and salad</h5> */}
    </div>

    </div>

    <div className="col-lg-2 col-md-2 col-xs-12">

       
         {/*<VegComponent/> */}

         {props.menuItem.veg === 0 ? <VegComponent/> :   <NonvegComponent/>}
      
        
        <i className={likeColor} aria-hidden="true" onClick={() => colorHandle(props.menuItem.id)}></i>
        
        
        <i className="" aria-hidden="true"></i>
        
        
        
        {/* <button style ={{height:50,width:100,backgroundColor:"green"}} onClick={handleLike}>
        <img src={unlike} alt="unlike" className="unlike_icon_menupkg"></img>
    </button> */}
    </div>
    
    </div>
    
    
    
    </div>
    
    
    </div>
    )
}

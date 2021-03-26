import React,{useState,useEffect} from 'react'
import { Main, FeatIcons, Add, Heart, IconBox } from './FeatureElement'
import './Icon.css'
import { Image, Subheading } from '../../MainComponents'
import axios from '../../../axiosInstance';
const FeatureList = (props) => {
    console.log(props)
    const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_fav_pkg")

    function colorHandle(menu_item_id){
         likeColor === "fa fa-heart-o heart_fav_pkg" ? setLikeColor("fa fa-heart heart_fav_pkg_fill") : setLikeColor("fa fa-heart-o heart_fav_pkg")
         handleLike(menu_item_id)
    }

    function handleLike(id){   

        if(likeColor === 'fa fa-heart-o heart_fav_pkg'){
            axios.post(`favourites`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                
                menu_item_id: id  
                
            }).then((res) => {
                console.log(res)
                
                console.log("meet")
            }).catch(err => console.log(err))
        }else{
            axios.get(`favourites?menu_item_id=`+id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
            }).then((res) =>{
                console.log(res)
                let favouritesList = res.data.data;
                favouritesList.forEach(favourite => {
                    axios.delete(`favourites/`+favourite.id , {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                          },
                    }).then((res) =>{
                        
                        // props.notifyAddedFavourite(props.menuItem.id)
                        console.log(res)}).catch((err) =>{
                            console.log(err)
                           
        
        
                        } );
                    
                });
            
            }).catch((err) =>{
                console.log(err)
            } );
        }


        
    }  
     useEffect(() => {
        if(props.favouriteItem){
            setLikeColor("fa fa-heart heart_fav_pkg_fill")
        }else{
            setLikeColor("fa fa-heart-o heart_fav_pkg")
        }

    }, [props.favouriteItem]) 

    
    return (
        <>
            <Main>
                <Image alt="meal" src={props.meal.picture} width="320px" fit="cover"/>
                <Subheading color="rgba(137,197,63,1)" size="1.5rem" weight="500">
                    {props.meal.name}
                </Subheading>
                <FeatIcons>
                    <IconBox>
                        <Add />
                    </IconBox>
                    <IconBox>  
                        {/* <Heart/>                     */}
                        <i className={likeColor} aria-hidden="true" onClick={() => colorHandle(props.meal.id)}></i>
                    </IconBox>
                </FeatIcons>
            </Main>
        </>
    )
}

export default FeatureList

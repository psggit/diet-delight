import React,{useState} from 'react'
import { Main, FeatIcons, Add, Heart, IconBox } from './FeatureElement'
import '../../Menu Package/TabMenuPkg.css'
import { Image, Subheading } from '../../MainComponents'

const FeatureList = ({ picture, name }) => {
    // const [likeColor,setLikeColor] = useState("fa fa-heart-o heart_menu_pkg")

    // function colorHandle(){
    //      likeColor === "fa fa-heart-o heart_menu_pkg" ? setLikeColor("fa fa-heart heart_menu_pkg_fill") : setLikeColor("fa fa-heart-o heart_menu_pkg")
    // }
    return (
        <>
            <Main>
                <Image alt="meal" src={picture} width="320px" fit="cover"/>
                <Subheading color="rgba(137,197,63,1)" size="1.5rem" weight="500">
                    {name}
                </Subheading>
                <FeatIcons>
                    <IconBox>
                        <Add />
                    </IconBox>
                    <IconBox>  
                        <Heart/>                    
                        {/* <i className={likeColor} aria-hidden="true" onClick={colorHandle}></i> */}
                    </IconBox>
                </FeatIcons>
            </Main>
        </>
    )
}

export default FeatureList

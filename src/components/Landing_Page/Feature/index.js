import React,{useState,useEffect} from 'react'
import { Feat, FeatIcons, Set, Banner, Bannerup, Left, Right, Bannermid, Bannerdown, IconBox, Call, Whatsapp, Message } from './FeatureElement'

import { Heading, Line, Para } from '../../MainComponents'
import axios from '../../../axiosInstance'

import { callOnMobile, messageOnWhatsAppWeb } from '../utils'
import { useHistory } from 'react-router'
import MainCourse from '../../Menu Package/MainCourse'



const Feature = ({setOpenConfirmDialog}) => {
    const history = useHistory();

    const [feature, setFeature] = useState([]);
    const [favouritesList, setFavouritesList] = useState([]);

    useEffect(() => {

        axios.get(`menu-items?featured=`+1, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            var resData = res.data.data; 
            setFeature(resData)        
        })
        fetchFavourites()

    },[])

    const fetchFavourites = () => {
        axios.get('favourites').then((res) => {
            var favourites = [];
            res.data.data.forEach(favourite => {
                favourites.push(favourite.menu_item_id);
            });
            setFavouritesList([...favourites]);
            console.log(setFavouritesList) 
        }).catch((err) => console.log(err))
    }



    const renderFavourites =  feature.map((meal) => {

        var ifFavourite = favouritesList.includes(meal.id)
        if(ifFavourite){ 
            return(
                // <FeatureList
                //     key={Math.random() * 100}
                //     // picture={meal.picture}
                //     // name={meal.name}
                //     meal={meal} 
                //     favouriteItem={true}
                //     setOpenConfirmDialog={setOpenConfirmDialog}
                // />
                <div key={Math.random()} className="col-10 col-md-6 col-lg-4 my-2 row" style={{justifyContent: "center"}}>
                    <MainCourse 
                        menuItem={meal}
                        notifyAddedFavourite={setOpenConfirmDialog}
                        favouriteItem={true}
                        setOpenConfirmDialog={setOpenConfirmDialog}
                    />
                </div>
                )
            }else{
                return(
                    <div key={Math.random()} className="col-10 col-md-6 col-lg-4 my-2 row" style={{justifyContent: "center"}}>
                        <MainCourse 
                            menuItem={meal}
                            notifyAddedFavourite={setOpenConfirmDialog}
                            setOpenConfirmDialog={setOpenConfirmDialog}
                        />
                    </div>
                    //     <FeatureList
                    //     key={Math.random() * 100}
                    //     meal={meal}
                    //     setOpenConfirmDialog={setOpenConfirmDialog}
                    //     // picture={meal.picture}
                    //     // name={meal.name}
                    
                    // />
            )
        }
    })


    return (
        <>
            <Feat>
                <Heading color="purple" length="1px" >
                    FEATURED MENU OF THE WEEK
                </Heading>
                <Line back="rgba(137,197,63,1)" />
                
                <Set style={{margin: "3rem 0"}}>
                    {renderFavourites}
                </Set>
            </Feat>
            <Banner>
                <Bannerup>
                    <Left>
                        <div style={{ marginRight: "20px", marginBottom: "10px" }}>
                            <Set>
                                <Heading color="white" size="2rem">
                                    SPECIAL
                        </Heading>
                            </Set>
                            <Set>
                                <Heading top="0" color="white" size="2rem">
                                    OFFER
                        </Heading>
                            </Set>
                        </div>
                    </Left>
                    <Right>
                        <Heading color="white" length="1px">
                            FAMILY PACAKAGE
                        </Heading>
                    </Right>
                </Bannerup>
                <Bannermid>
                    <Para top="0" color="white" align="none" Mwidth="300px;">
                        Having Diet Delight with your family is great oppurtunity to bond with each other. Diet Deight provides special 'Family Package' so that the harmony within the family last forever.
                    </Para>
                </Bannermid>
                <Bannerdown>
                    <Para top="0" color="white" align="none">
                        Contact us to get more information.
                    </Para>
                    <FeatIcons>
                        <IconBox>
                            <Call onClick={callOnMobile} />
                        </IconBox>
                        <IconBox>
                            <Whatsapp  onClick={messageOnWhatsAppWeb} />
                        </IconBox>
                        <IconBox>
                            <Message onClick={()=> history.push("/contact")} />
                        </IconBox>
                    </FeatIcons>
                </Bannerdown>
            </Banner>
        </>
    )
}

export default Feature

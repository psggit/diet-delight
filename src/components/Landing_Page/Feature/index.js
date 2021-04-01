import React,{useState,useEffect} from 'react'
import { Feat, FeatIcons, Set, Banner, Bannerup, Left, Right, Bannermid, Bannerdown, IconBox, Call, Whatsapp, Message } from './FeatureElement'

import { Heading, Line, Para } from '../../MainComponents'
import axios from '../../../axiosInstance'

import FeatureList from './FeatureList'
import ConfirmDialog from './../ConfirmDialog'



const Feature = () => {
    

    const [feature, setFeature] = useState([]);
    const [favouritesList, setFavouritesList] = useState([]);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);

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
        <FeatureList
            key={Math.random() * 100}
            // picture={meal.picture}
            // name={meal.name}
            meal={meal} 
            favouriteItem={true}
            setOpenConfirmDialog={setOpenConfirmDialog}
           
        />)}else{
            return(
                <FeatureList
                key={Math.random() * 100}
                meal={meal}
                setOpenConfirmDialog={setOpenConfirmDialog}
                // picture={meal.picture}
                // name={meal.name}
               
            />

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
                <ConfirmDialog 
                    open={openConfirmDialog} 
                    setOpen={setOpenConfirmDialog} 
                />
                <Set>
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
                            <Call />
                        </IconBox>
                        <IconBox>
                            <Whatsapp />
                        </IconBox>
                        <IconBox>
                            <Message />
                        </IconBox>
                    </FeatIcons>
                </Bannerdown>
            </Banner>
        </>
    )
}

export default Feature

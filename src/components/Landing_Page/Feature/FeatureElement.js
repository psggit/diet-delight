import styled from 'styled-components'

import banner from '../../../assets/banner.jpg'

import { IoIosAddCircleOutline } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'
import { TiMessages } from 'react-icons/ti'
import { BsEnvelope } from 'react-icons/bs'
import { MdPhoneInTalk } from 'react-icons/md'

export const Feat = styled.div`
    margin-top:20px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    width:100%;
`
export const Set = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content:space-evenly;
    align-items:center;

    @media only screen and (max-width:500px){
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }

`
export const Main = styled.div`
    display:flex;
    margin-top: 50px;  
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    min-width:400px;
`
export const FeaturedImage = styled.img`
    src:${props => props.src ? props.src : ""};
    alt:"Featured";
    height: 200px;
    width:350px;
`
export const Name = styled.h3`
    font-size:1.5rem;
    margin-top:5px;
    color: rgba(139,197,63,1);
    font-family:"Roboto Condensed bold";
    letter-spacing:1px;
`
export const FeatIcons = styled.div`
    display: flex;
    margin: 10px 0px;


`
export const IconBox = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:40px;
    width:40px;
    cursor:pointer;
    margin-right: 10px;

`

export const Add = styled(IoIosAddCircleOutline)`
      color: purple;
    background:transparent;
    height:30px;
    width:30px;
`
export const Heart = styled(AiOutlineHeart)`
  color: purple;
    background:transparent;
    height:30px;
    width:30px;
`

export const Banner = styled.div`
    width:100%;
    background: url(${banner}) no-repeat center center;
    display:flex;
    flex-direction:column;
    margin-right:auto;
    background-size: cover;

`
export const Bannerup = styled.div`
    display:flex;
    margin-top:5px;
    align-items:center;

    @media only screen and (max-width:500px){
        margin-top:10px;
    }
`
export const Left = styled.div`
    display:flex;
    flex-direction:column;
    min-width: 240px;
    align-items:flex-end;
    background-color:purple;
    height: 108px;

    @media only screen and (max-width:500px){
        min-width:130px;
        height:90px;
    }

`
export const Right = styled.div`
    display:flex;
    justify-content:center;
    margin-left:20px;
    align-items:flex-start;
`

export const Bannermid = styled.div`
    display:flex;
    margin-top:10px;
    max-width:700px;
    margin-left:80px;

    @media only screen and (max-width:500px){
        margin-left:0px;
    }

`
export const Bannerdown = styled.div`
    display:flex;
    margin-top:20px;
    margin-left:80px;
    flex-direction:column;

    @media only screen and (max-width:500px){
        margin-left:0px;
        margin-top:5px;
    }

`

export const Call = styled(MdPhoneInTalk)`
    height:30px;
    color: white;
    width:30px;
    background:transparent;
`
export const Whatsapp = styled(TiMessages)`
    height:30px;
    color: white;
    width:30px;
    background:transparent;
`
export const Message = styled(BsEnvelope)`
    height:30px;
    color: white;
    width:30px;
    background:transparent;
`


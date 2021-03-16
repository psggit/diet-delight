import styled from 'styled-components';

import { FaGooglePlay, FaApple, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';


export const Main = styled.div`
    width:100%;
    background-color:purple;
    display:flex;
    flex-direction:column;
`

export const Up = styled.div`
    display:flex;
    margin-top:20px;
    justify-content:space-evenly;
    flex-wrap:wrap;
    width:100%;

    @media only screen and (max-width:500px){
        align-items:flex-start;
    }

`
export const Container = styled.div`
    display:flex;
    flex-direction:column;
    min-width:210px;

    @media only screen and (max-width:500px){
        min-width:310px;
        margin-top:10px;
    }
`

export const Lists = styled.ul`
    list-style:none;
    display:flex;
    flex-direction:column;
`
export const Items = styled.li`
    color:white;
    font-family:"Open Sans";
    font-size:0.8rem;
    margin-top:15px;
`

export const Google = styled(FaGooglePlay)`
    color:white;
    background-color:transparent;
    height:25px;
    margin-right:5px;
    width:30px;
`
export const Apple = styled(FaApple)`
    color:white;
    background-color:transparent;
    height:30px;
    margin-right:5px;
    width:30px;
`

export const Set = styled.div`
    display:flex;
    align-items:center;
    margin-top:10px;
`

export const SetDown = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:20px;
`
export const SetDownDown = styled.div`
    display:flex;
    margin-top:20px;
`

export const Anchor = styled.a`
    text-decoration:none;
    height:30px;
    margin-right:10px;
    cursor:pointer;
`

export const Facebook = styled(FaFacebook)`
    color: white;
    width:30px;
    height:30px;
    background-color:transparent;
`
export const Instagram = styled(FaInstagram)`
    color: white;
    width:30px;
    height:30px;
    background-color:transparent;
`
export const Twitter = styled(FaTwitter)`
    color: white;
    width:30px;
    height:30px;
    background-color:transparent;
`
export const Whatsapp = styled(FaWhatsapp)`
    color: white;
    width:30px;
    height:30px;
    background-color:transparent;
`

export const Down = styled.div`
    display:flex;
    justify-content:space-between;
    margin:10px 0;

    @media only screen and (max-width:500px){
        flex-direction:column;
    }

`

export const DownLeft = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-left:20px;

    @media only screen and (max-width:500px){
        align-items:flex-start;
    }

`
export const DownLup = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;

`

export const DownLdown = styled.div`
    display:flex;
    align-items:center;
    margin: 10px 0;
`

export const Email = styled.input`
    background:transparent;
    border: 1px solid white;
    height:30px;
    color:white;
    text-decoration:none;
    text-align:center;

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
    }

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
    }

::-ms-input-placeholder { /* Microsoft Edge */
  color: white;
    }   

`
export const Signup = styled.button`
    background:transparent;
    color:white;
    width:100px;
    height:30px;
    border: 1px solid white;
    margin-left:10px;
`


export const DownRight = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-right:20px;
    margin-top:10px;

    @media only screen and (max-width:500px){
        margin:20px 0;
    }

`
export const DownRup = styled.div`
    display:flex;
`
export const DownRdown = styled.div`
    display:flex;
`

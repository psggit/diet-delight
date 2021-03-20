import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom'
import back from '../../../assets/mealplan.jpg'


import { FaFacebook, FaGoogle } from 'react-icons/fa'

export const Main = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height: 100vh;
    overflow:hidden;
    background:url(${back}) no-repeat center center ;
    background-size:cover;
    @media only screen 
     and (min-device-width: 768px) 
     and (max-device-width: 1024px) 
     and (-webkit-min-device-pixel-ratio: 1) {
}
`

export const RouteContainer = styled.div`
    display:flex;
    margin-top: 20px;
    min-width: 320px;
    justify-content:space-around;
    align-items:center;
`
export const Route = styled(LinkR)`
    cursor:pointer;
    opacity:${props => props.opacity ? props.opacity : "1"};
    text-decoration:none;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-decoration:none;
    &:hover{
        text-decoration:none;
      
    }
`
export const SetBg = styled.div`
    width: 370px;
    display:flex;
    border-radius:5px;
    margin:5px 0 20px 0;
    justify-content:center;
    align-items:center;
    background-color:rgba(255,255,255,0.6);
`

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    width: 350px;
    align-items:center;
    margin: 10px 0 20px 0;
    justify-content:center;
    border: 1px solid rgba(137,197,63,1);
    border-radius: 5px;
    @media only screen and (max-width:500px){
        min-width:320px;
    }
`
export const Section = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:${props => props.width ? props.width : "100%"};
    &:focus{
        outline:none;
      
      
    }
`

export const Phone = styled.input`
    height:20px;
    text-decoration:none;
    width:220px;
    margin:5px 10px;
    padding:10px;
    &:focus{
        outline:none;
      
    }
`

export const Input = styled.input`
    height:20px;
    text-decoration:none;
    width:288px;
    align-self:flex-start;
    margin:5px 10px;
    padding:10px;
    &:focus{
        outline:none;
      
    }
`

export const Facebook = styled(FaFacebook)`
    height:20px;
    width:20px;
    background:transparent;
    color:white;
`
export const Google = styled(FaGoogle)`
    height:20px;
    width:20px;
    background:transparent;
    color:white;
`

export const IconBox = styled.div`
    background-color : ${props => props.back ? props.back : "tranparent"};
    width: 100px;
    border-radius: 20px;
    height: 35px;
    cursor:pointer;
    margin: 0 20px 20px 20px;
    display: flex;
    justify-content:center;
    align-items:center;
`

export const CustomButton = styled.button`
    height:30px;
    border: 1px solid rgba(137,197,63,1);
    border-radius: 10px;
    width: 200px;
    background-color: rgba(137,197,63,1);
    font-size: 1rem;
    font-family: "Open Sans";
    color:white;
    cursor:pointer;
    font-weight:500;
    margin-bottom: 20px;
    &:focus{
        outline:none;
        border:none;
    }
`

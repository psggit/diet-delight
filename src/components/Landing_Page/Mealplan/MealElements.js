import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

import back from '../../../assets/mealplan.jpg'

export const Meal = styled.div`
   overflow:hidden;
    width:100%;
    /* height: 100vh; */
    background:url(${back}) no-repeat center center ;
    background-size:cover;
`
export const Mealup = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    margin-top: 20px;
`

export const Mealdown = styled.div`
    display: flex;
    margin-top: 50px;
    align-items:center;
    justify-content:center;
    color: white;
    flex-wrap: wrap;


    @media only screen and (max-width: 500px){
        flex-direction:column;
    }

`

export const Mealbox = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    margin-right: 30px;
    max-width: 250px;
    margin-left:20px;
    min-height: 400px;
    background-color:rgba(139,197,63,1);
    margin-bottom: 30px;
`

export const Title = styled.h2`
    font-size: 2.2rem;
    margin-top:15px;
    font-family: "Roboto Condensed Regular";
    font-weight: 300;
    margin-bottom : ${props => props.margin ? props.margin : "0px"};
    text-align:center;
    padding: 5px;
`

export const Selection = styled.h3`
    font-size: 1.5rem;
    font-family: "Roboto Condensed Regular";
    font-weight: 300;
    text-align: center;
    padding:5px;
`
export const Description = styled.p`
    font-size: 0.9rem;
    font-family:"Open Sans";
    padding:5px;
    text-align: center;
    font-weight:200;
`

export const Mealbtnbox = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    margin-top: auto;
    margin-bottom:20px;
`

export const Mealbtn = styled(LinkR)`
    height: 25px;
    border-radius: 10px;
    width: 130px;
    text-align:center;
    padding-top: 2px;
    font-size: 14px;
    text-decoration: none;  
    background-color: white;
    text-decoration:none;
    color: rgba(139,197,63,1);
    font-family: 'Roboto';
    font-weight: bold;
    border: 1px solid white;
    
    &:hover{
        background-color: transparent;
        color: white;
    }
`


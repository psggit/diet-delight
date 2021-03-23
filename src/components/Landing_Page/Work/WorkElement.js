import styled from 'styled-components'

import back from '../../../assets/workbg.jpg'

export const Working = styled.div`
height:110vh;
overflow:hidden;
display:flex;
flex-direction:column;
width:100%;
background:url(${back}) no-repeat center center ;
background-size:cover;



`
export const Head = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
export const Heading = styled.h2`
color:purple;
font-size: 2.5rem;
letter-spacing: 1px;
font-family:"Roboto Condensed bold";
font-weight:400;
`

export const Tail = styled.div`
display:flex;
margin-top:30px;
justify-content:space-evenly;
align-items:center;
flex-wrap:wrap;

@media only screen and (max-width:500px){
    flex-direction:column;
}

`
export const Work = styled.div`
display:flex;
margin-top:10px;
flex-direction:column;
align-items:center;
min-width: 300px;
height: 320px;
margin-bottom:30px;

@media only screen and (max-width:900px){
    background-color:white;
    opacity:80%;
    min-width: 210px;
    border-radius:20px;
}

@media only screen and (max-width:500px){
    background-color:white;
    opacity:80%;
    border-radius:20px;
}

`
export const WorkImage = styled.img`
src: ${props => props.src ? props.src : ""};
alt:"Icon";
`
export const Title = styled.h3`
font-size:1.3rem;
letter-spacing: 1px;
margin-top:20px;
color:purple;
font-family:"Roboto Condensed bold";
font-weight:400;
`
export const Down = styled.h3`
font-size:1.5rem;
letter-spacing: 1px;
margin-top:10px;
color:purple;
font-family:"Roboto Condensed bold";
font-weight:400;
`
export const Descript = styled.p`
font-size:1rem;
margin-top:10px;
text-align:center;
padding:10px;
font-family:"Open Sans";
`
export const Btnbox = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-top:auto;
`
export const Btn = styled.button`
cursor:pointer;
width:max-content;
height: 32px;
padding: 0px 25px;
background-color: transparent;
color: purple;
border: 1px solid purple;
margin-bottom:20px;
border-radius: 10px;
`
import styled from 'styled-components'
import backgroundImage from '../../assets/choose-meal-plan.jpg';

export const LeadContainer = styled.div`
position:relative;
height: 100%;
width: 100%;
background-image: url(${backgroundImage});
background-position: center;
background-repeat: no-repeat;
background-size: cover; 
min-height:100vh;
background-attachment:fixed;
`;

export const GrandContainer = styled.div`
display:flex;
height:auto;
width:80%;
align-items:center;
flex-direction:column;
border-radius:20px;
margin-top:3%;
margin-left:10%;
margin-right:10%;
border:none;
@media only screen and (max-width:750px){
    width:auto;
    height:auto;
    margin-left:2%;
    margin-right:2%;
    flex-direction:column;
}
@media only screen and (min-width:1440px){
    width:auto;
    height:auto;
}


`;

export const MainContainer = styled.div`
display:flex;
align-items:center;
flex-direction:row;
border-radius:20px;
margin-top:3%;
margin-bottom:2%;
padding-bottom:2%;
width:100%;
background-color:rgba(119, 131, 143, 0.1);
@media only screen and (max-width:750px){
    width:100%;
    height:auto;
    flex-direction:column;
}
@media only screen and (min-width:1440px){
    width:100%;
    height:auto;
}
`

export const UpperContainer = styled.div`
display:flex;
justify-content:space-around;
align-items:center;
width:100%;
margin-top:2%;
@media only screen and (max-width:750px){
    width:auto;
    height:auto;
    margin-left:2%;
    margin-right:2%;
    margin-top:1%;
    margin-bottom:1%;
    flex-direction:column;
}
`;

export const UpperLeftContainer = styled.div`
display:flex;
flex-direction:column;
`;

export const UpperMiddleContainer = styled.div`
display:flex;
flex-direction:column;
`;

export const RoundCircle = styled.div`
background-color:#8BC53F;
border-radius:50%;
border: 10px solid #c2daa5;
padding:20px 10px 20px 10px;
margin-left:10%;
margin-right:10%;
display:grid;
place-items:center;
background-clip: padding-box;
`;

export const InsideCircleText = styled.span`
height:auto;
font-size:60px;
color:#fff;
font-weight:900;
`;

export const UpperRightContainerText = styled.span`
color:#000;
font-size:25px;
font-weight:700;
`;


export const LeftContainer = styled.div`
height:auto;
width:50%;
font-weight:500;
@media only screen and (max-width:750px){
    width:auto;
    height:auto;
}

@media only screen and (min-width:1440px){
    margin-bottom:20px;
    margin-top:20px;
}



`
export const RightContainer = styled.div`
height:auto;
width:50%;
border-left: 1px solid grey;
@media only screen and (max-width:750px){
    width:auto;
    height:auto;
    border:none;
}
@media only screen and (min-width:1440px){
    margin-bottom:20px;
    margin-top:20px;
}


`


export const ForeFrontText = styled.div`
margin-left:5%;
width:30%;
font-weight:700;

@media only screen and (max-width:945px){
    width:30%;
    height:auto;
}
@media only screen and (max-width:750px){
    width:30%;
    height:auto;
}



`

export const FormContent = styled.div`
display:flex;
flex-direction:row;
margin-top:3%;
font-weight:700;

@media only screen and (max-width:750px){
    flex-direction:row;
    width:100%;
    float:left;
    
}



`

export const Button = styled.button`
background-color:#8BC441;
padding:5px;
padding-left:20px;
padding-right:20px;
color:white;
float:right;
border:none;
margin-right:5%;
margin-top:5%;
border-radius:10px;
padding: 9px;
font-weight: 400
@media only screen and (max-width:750px){
    width:100%;
    margin-right:0;
}
`


export const BMIButton = styled.button`
background-color:#8BC441;
margin-top:30px;
color:white;
float:right;
border:1px solid #6E9A34;
padding: 5px;
font-weight: 300;
cursor:pointer;
border-radius:10px;
font-weight:900;
padding-left:30px;
padding-right:30px;
@media only screen and (max-width:750px){
    width:100%;
    margin-right:0;
}
`


export const Input = styled.input.attrs(props => ({
    type: "text",
    defaultValue: props.defaultValue,
    value:props.value
}))`
width:50%;
margin-left:5%;
padding-left: 5px;
border-radius: 6px;
border: 1px solid grey;
font-weight: 700;
@media only screen and (max-width:750px){
    width:60%;
    margin:0;
    padding:0;
    margin-right:10%;
}
@media only screen and (max-width:600px){
    margin-left:15%;
}
`

export const EmailInput = styled.input.attrs(props => ({
    type: "email",
    defaultValue:props.defaultValue,
}))`
width:50%;
margin-left:5%;
padding-left: 5px;
border-radius: 6px;
border: 1px solid #21212170;
font-weight: 700;
// similarly, border will override Input's border
@media only screen and (max-width:750px){
    width:60%;
    margin:0;
    padding:0;
    margin-right:10%;
}

@media only screen and (max-width:600px){
    margin-left:15%;
    
}
`;


export const Anchor = styled.a.attrs({
    href:""
})`
color:#8BC441;
margin-left:5%;
text-decoration: none;
@media only screen and (max-width:750px){
    margin-left:8%;
}`;


export const TextArea = styled.textarea.attrs(props => ({
    defaultValue:props.defaultValue
}))`
margin-left:5%;
height:20%;
width:50%;
padding-left: 5px;
border-radius: 6px;
border: 1px solid #21212170;
font-weight: 500;
@media only screen and (max-width:750px){
    width:50%;
    margin:0;
    padding:0;
    margin-right:10%;
    
    
    @media only screen and (max-width:600px){
        margin-left:10%;
    }
    
}
`;
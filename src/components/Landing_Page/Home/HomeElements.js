import styled from 'styled-components';
import back from "../../../assets/homeback.jpg";
import mob from "../../../assets/hand.jpg";



import { RiArrowRightSLine } from 'react-icons/ri'
import { BiSearch } from 'react-icons/bi'
import { TiMessages } from 'react-icons/ti'
import { FaWhatsapp } from 'react-icons/fa'


export const HomeMain = styled.div`
    overflow:hidden;
    width:100%;
    height:85vh;
    background:url(${back});
    background-repeat:no-repeat;
    background-position: center;
    background-size:cover;
    position:relative;

    @media only screen and (max-width:768px){
      background:url(${mob});
    background-repeat:no-repeat;
    background-position: bottom;
    background-size:800px;
    /* background-attachment:fixed; */
    } 

    @media only screen and (max-width:500px){
      background:url(${mob});
    background-repeat:no-repeat;
    background-position: top;
    background-size:450px;
    /* background-attachment:fixed; */
    } 


`

export const Containerup = styled.div`
    display:flex;
    flex-direction:column;
    padding-left: 50px;
   
   @media only screen and (max-width:500px){
    margin-top:auto;
    margin-bottom:10%;
   }

`

export const HomeContainer = styled.div`
    display: flex;
    margin-top: 50px;
    flex-direction: column;
    height: 85vh;
    width:100%;
    margin-left: 70px;

    @media only screen and (max-width:768px){
      align-items:center;
      margin-left:0px;
    }

    @media only screen and (max-width:500px){
        background-size: 600px 600px, contain ;
        margin-top:auto;
    } 
    
`

export const Heading = styled.h1`
  color:purple;
  font-size:5rem;
  letter-spacing:2px;
  font-family:"Roboto Condensed Regular";
  font-weight:900;

  @media only screen and (max-width:768px){
        font-size:2.5rem;
    } 

    @media only screen and (max-width:500px){
      font-size:1.5rem;
    } 

`

export const HomeSearch = styled.div`
    display: flex;
    margin-top:10px;
    height: 40px;
    width: max-content;
    width: 360px;
    border-radius:10px;

    @media only screen and (max-width:500px){
       width: 250px;
       height: 30px;
    }

`
export const HomeIcon = styled.div`
    height: 40px;
    background-color:rgba(139,197,63,1);
    display: flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    margin-left: 5px;
    border-radius: ${props => props.border ? props.border : "10px 0px 0px 10px"};

    @media only screen and (max-width:500px){
      height: 30px;
    }
`

export const Searchbtn = styled(BiSearch)`
  align-self: center;
  color: white;
  padding-left: 5px;
  height: 30px;
  width:30px;
  @media only screen and (max-width:500px){
      height: 25px;
      width: 25px;
    }
`
export const Search = styled.input`
  background-color:rgba(139,197,63,1);
 border: none;
 width: 255px;
 font-size:16px;
 color:white;
 padding: 0 10px;
 font-family: "Roboto Condensed Regular";
 text-decoration: none;

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
export const RightArrow = styled(RiArrowRightSLine)`
   align-self: center;
   margin-left: auto;
   height: 30px;
   width: 30px;
  color: white;
  
    @media only screen and (max-width:500px){
      height: 25px;
      width: 25px;
    }
`

export const Icons = styled.div`
  display:flex;
  flex-direction:column;
  position:absolute;
  top:75%;
  right:2%;
  margin-top: auto;
  margin-left:auto;
`

export const Icon = styled.div`
  background-color: purple;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  width:45px;
  height:45px;
  cursor:pointer;
  margin-top:10px;

    @media only screen and (max-width: 768px){
      width:35px;
      height:35px;
    }

`

export const Message = styled(TiMessages)`
    color: white;
    height:30px;
    width:30px;

    @media only screen and (max-width: 768px){
      width:20px;
      height:20px;
    }
`

export const Whatsapp = styled(FaWhatsapp)`
    color: white;
    height:30px;
    width:30px;

    @media only screen and (max-width: 768px){
      width:20px;
      height:20px;
    }
`

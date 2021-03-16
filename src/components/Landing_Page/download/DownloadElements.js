import styled from 'styled-components'
import back from '../../../assets/Downbg.jpg'
import Mback from '../../../assets/mhand.png'

export const Main = styled.div`
    height: 100vh;
    width:100%;
    overflow: hidden;
    background: url(${back}) no-repeat center center ; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media only screen and (max-width: 500px){
    background: url(${Mback}) no-repeat top ; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
     background-size: 500px;
  }
`

export const Set = styled.div`
    height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    @media only screen and (max-width:500px){
        justify-content:initial;
        margin-top:auto;
        margin-bottom:30px;
    }

`

export const Up = styled.div`
    display:flex;
    margin-right:20px;
    margin-left:auto;
    min-width:600px;
    flex-direction:column;
    align-items:center;

    @media only screen and (max-width:500px){
        justify-content:center;
        margin:0px;
        margin-top:auto;
    }

`
export const Down = styled.div`
    display:flex;
    margin-left:auto;
    margin-right:100px;
    margin-top:20px;

    @media only screen and (max-width:500px){
        justify-content:center;
        align-items:center;
        margin:0px;
        margin-bottom:20px;
        min-width:300px;
    }

`

export const Anchor = styled.a`
    text-decoration:none;
    cursor:pointer;
    height:80px;
    margin-right:20px;
`
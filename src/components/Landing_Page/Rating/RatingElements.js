import styled from 'styled-components';

export const Main = styled.div`
    height:100vh;
    width:100%;
    overflow:hidden;
    background-color:rgba(139,197,63,1);
    display:flex;
    flex-direction:column;

    @media only screen and (max-width:500px){
        height:auto;
    }

`
export const Up = styled.div`
    margin-top:10px;
    display:flex;
    flex-direction:column;
    align-items:center;
`
export const Mid = styled.div`
    display:flex;
    margin-top:20px;
    align-items:center;
    justify-content:center;

    @media only screen and (max-width:500px){
        flex-direction:column;
        margin-bottom:50px;
    }

`
export const MidLeft = styled.div`
    margin-right:70px;

    @media only screen and (max-width:500px){
        margin-right:0px;
    }

`
export const MidRight = styled.div`
    display:flex;
    flex-direction:column;
    height:200px;
    align-items:flex-start;

    @media only screen and (max-width:500px){
       align-items:initial;
    }

`
export const Down = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;

    @media only screen and (max-width:500px){
        flex-direction:column;
    }

`
export const Rating = styled.div`
    display:flex;
    margin: 30px 0px;
    align-items:center;
    justify-content:space-evenly;
    max-width:520px;
    margin-left:50px;

    @media only screen and (max-width:500px){
        flex-direction:column;
        margin-left:0px;
    }

`
export const Left = styled.div`
    display:flex;
    flex-direction:column;
    width:100px;
`
export const Right = styled.div`
    display:flex;
    height:190px;
    margin-left:50px;
    flex-direction:column
`
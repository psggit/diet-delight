import styled from 'styled-components';

export const Main = styled.div`
    id: 'expert';
    display:flex;
    flex-direction:column;
    width:100%;
    overflow:hidden;
`

export const Expertup = styled.div`
    display:flex;
    justify-content: space-between;
    padding-left:65px;

    @media only screen and (max-width:500px){
        flex-direction:column;
        align-items:center;
        padding-left:0px;
        padding:20px;
            }

`
export const Left = styled.div`
    display:flex;
    flex-direction:column;
    padding: 10px;
`

export const Description = styled.p`
    font-size:1rem;
    color:black;
    margin-top:10px;
    font-family: "Open Sans";
`
export const Right = styled.div`
`
export const ExpertImage = styled.img`
    src: ${props => props.src ? props.src : ""};
    alt:"Expert";
    height: 260px;
    width:450px;
`
export const Expertdown = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    flex-wrap:wrap;

    @media only screen and (max-width: 500px){
        flex-direction:column;
    }

`

export const Container = styled.div`
    margin-top: 50px;
    margin-bottom:40px;
    display:flex;
    flex-direction:column;
    align-items:center;
    border: 1px solid rgba(139,197,63,1);
    max-width: 300px;
    min-width: 200px;    
    height: 420px;
    `

export const Title = styled.h2`
    color: black;
    margin-top:10px;
    font-size: 1.5rem;
    width:60%;
    text-align:center;
    font-family:"Roboto Condensed bold";
    letter-spacing: 1px;
    font-weight: 400;
    background-color:${props => props.back ? props.back : "silver"};
`
export const Data = styled.p`
    font-size: 1rem;
    text-align:center;
    padding: 20px;
    font-family:"Open Sans";
    margin:10px 0px;
`
export const Type = styled.h2`
    color: rgba(139,197,63,1);
    font-size:3rem;
    font-family:"Roboto Condensed bold";
    letter-spacing: 1px;
    font-weight:400;
`
export const Btnbox = styled.div`
    margin-top:auto;
`
export const Btn = styled.button`
    height: 35px;
    width:180px;
    background-color: rgba(139,197,63,1);
    color: white;
    font-size: 12px;
    border-radius:10px;
    cursor:pointer;
    font-family:"Open Sans";
    margin-bottom:10px;
    border: 1px solid rgba(139,197,63,1);
    font-weight: bold;
    
    :hover {
        border: 1px solid rgba(139,197,63,1);
        color: rgba(139,197,63,1);
        background-color: white;
    }
`
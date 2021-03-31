import styled from 'styled-components';

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

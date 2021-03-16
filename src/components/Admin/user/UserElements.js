import styled from 'styled-components'

export const Main = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
`

export const Container = styled.div`
    display: flex;
    flex-direction:column;
    margin-left:50px;
    align-items:flex-start;
`

export const HContainer = styled.div`
    display: flex;
    margin-left:50px;
    flex-wrap: wrap;
    align-items:center;
`

export const Title = styled.p`
    font-size:${props => props.size ? props.size : "1rem"};
    letter-spacing:${props => props.length ? props.length : "0px"};
    color:${props => props.color ? props.color : "black"};
    width:${props => props.width ? props.width : "100%"};
    font-family:"Open Sans";
    padding:${props => props.pad ? props.pad : "5px"};
    font-weight:${props => props.weight ? props.weight : "400"};
    margin: auto;
`

export const Input = styled.input`
    height:35px;
    width:200px;
    border-radius:5px;
    padding:5px;
    border: 1px solid black;
`
export const Con = styled.div`
    display:flex;
    align-items:center;
    padding:5px;
`

export const Set = styled.div`
    display:flex;
    align-items:center;
`
export const Mini = styled.div`
   display:flex;
    min-width:400px;
    padding:5px;
    align-items:center;
    justify-content:space-between;
`

export const Info = styled.p`
    color:${props => props.error ? "red" : " rgba(0,0,0,0.5)"};
    font-size:${props => props.error ? "0.6rem" : "0.8rem"};
    margin:5px 0 5px 250px;
`
import styled from 'styled-components'

export const Heading = styled.h1`
    font-size:${props => props.size ? props.size : "2.5rem"};
    letter-spacing:${props => props.length ? props.length : "0px"};
    color:${props => props.color ? props.color : "black"};
    background-color:${props => props.back ? props.back : "transparent"};
    font-family:"Roboto Condensed Regular";
    padding:${props => props.pad ? props.pad : "5px"};
    width:${props => props.width ? props.width : "100%"};
    font-weight:${props => props.weight ? props.weight : "400"};
    margin-top:${props => props.top ? props.top : "10px"};
    text-align:${props => props.align ? props.align : "center"};

    @media only screen and (max-width:768px){
        font-size: 2rem;
    }

    @media only screen and (max-width:500px){
        font-size: 1.5rem;
    }

`

export const Subheading = styled.h3`
    font-size:${props => props.size ? props.size : "2rem"};
    letter-spacing:${props => props.length ? props.length : "0px"};
    color:${props => props.color ? props.color : "black"};
    font-family:"Roboto Condensed Regular";
    padding:${props => props.pad ? props.pad : "5px"};
    font-weight:${props => props.weight ? props.weight : "400"};
    margin-top:${props => props.top ? props.top : "10px"};
    text-align:${props => props.align ? props.align : "center"};

    @media only screen and (max-width:768px){
        font-size:1.5rem;
    }

    @media only screen and (max-width:500px){
        font-size: 1.2rem;
    }

`

export const Para = styled.p`
    font-size:${props => props.size ? props.size : "1rem"};
    letter-spacing:${props => props.length ? props.length : "0px"};
    color:${props => props.color ? props.color : "black"};
    width:${props => props.width ? props.width : "100%"};
    font-family:"Open Sans";
    padding:${props => props.pad ? props.pad : "5px"};
    font-weight:${props => props.weight ? props.weight : "400"};
    margin-top:${props => props.top ? props.top : "10px"};
    text-align:${props => props.align ? props.align : "center"};


    @media only screen and (max-width:500px){
        font-size: 0.8rem;
        width:${props => props.Mwidth ? props.Mwidth : props.width};
        text-align:${props => props.Malign ? props.Malign : props.align};
    }

`
export const Line = styled.div`
    width:${props => props.width ? props.width : "100px"};
    height:${props => props.height ? props.height : "5px"};
    margin-top:${props => props.top ? props.top : "0px"};
    background-color:${props => props.back ? props.back : "black"};
    border-radius:3px;
    margin-top:5px;

`

export const Image = styled.img`
    object-fit:${props => props.fit ? props.fit : "contain"};
    src:${props => props.src ? props.src : ""};
    alt:"Photo";
    width:${props => props.width ? props.width : "200px"};
    height:${props => props.height ? props.height : "200px"};
    border-radius: ${props => props.radious ? props.radious : "0"};
    margin: ${props => props.mar ? props.mar : "0 0 0 0"};

    @media only screen and (max-width:500px){
        width:${props => props.Mwidth ? props.Mwidth : props.width};
        height:${props => props.Mheight ? props.Mheight : props.height};
    }

`

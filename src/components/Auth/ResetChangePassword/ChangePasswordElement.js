import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom'


export const Input = styled.input`
height:30px;
border:none;
border-bottom:2px solid #800080; 
background-color:#Fafafa;
&:focus {
    outline: none;
    box-shadow: 0px 0px 2px #6E9A34;
}
`

export const Button = styled.button`
background-color:#8BC441;
color:white;
font-weight:500;
border:1px solid #6E9A34;
&:focus {
    outline: none;
}
`
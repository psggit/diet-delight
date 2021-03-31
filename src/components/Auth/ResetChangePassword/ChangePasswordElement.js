import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom'


export const Input = styled.input`
::placeholder {
	color: #212121;
	opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
	color: #212121;
}

::-ms-input-placeholder { /* Microsoft Edge */
	color: #212121;
}
height: 30px;
border: none;
border-bottom: 2px solid #800080;
background-color: #fbfbfb;
color:#212121;
// box-shadow: rgb(61 61 61 / 41%) 0px 2px 7px -3px;
}


&:focus {
	outline: none;
	box-shadow: 0px 0px 2px #6E9A34;
}


@media only screen and (min-width: 1200px) {

	font-size:20px;

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
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

import { Link as LinkS } from 'react-scroll'
import { Link as LinkR } from 'react-router-dom'

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 9999;
    width:100%;
    height:100%;
    background-color: purple;
    display: grid;
    align-items: center;
    left: 0;
    transition: all 0.3s ease-in;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0%')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`

export const CloseIcon = styled(FaTimes)`
    color: white;
`

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`

export const SidebarWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

export const SidebarGroup = styled.div`
    display:flex;
    justify-content:space-around;
    width:300px;
    margin:20px 0;
`
export const Route = styled(LinkR)`
    color: white;
    display: flex;
    align-items:center;
    font-size: 2rem;
    text-decoration:none;
    font-weight: bold;
    text-decoration: none;
    padding: 0 10px;
    font-family:"Roboto Condensed Regular";
    letter-spacing:1px;
    height: 80px;
    cursor: pointer;

    @media only screen and (max-width:500px){
        font-size:1.5rem;
        height:50px;
    }
`

export const SidebarS = styled(LinkS)`
    color: white;
    display: flex;
    align-items:center;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    padding: 0 10px;
    font-family:"Roboto Condensed Regular";
    letter-spacing:1px;
    height: 80px;
    cursor: pointer;
    text-decoration:none;

    @media only screen and (max-width:500px){
        font-size:1.5rem;
        height:50px;
    }

    &.hover{
        color: rgba(139,197,63,1);
    }

    &.active{
        color: rgba(139,197,63,1);
    }
`

export const SidebarR = styled(LinkR)`
    color: purple;
    display: flex;
    align-items:center;
    justify-content:center;
    font-size: 1rem;
    font-weight: bold;
    text-align:center;
    text-decoration: none;
    padding: 0 10px;
    height: 50px;
    width:100px;
    border-radius:10px;
    background-color:white;
    cursor: pointer;
    margin:10px 0;

    @media only screen and (max-width:500px){
        font-size:1.2rem;
        height:30px;
    }

`
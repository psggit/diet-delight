import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background-color: ${(props) => (props.nav ? "#f4f4f8" : "white")};
  display: flex;
  font-family: "Roboto Condensed bold";
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  z-index: 1;
  width: 100%;
  padding: 30px 70px;
`;

export const NavLogo = styled.div`
  cursor: pointer;
`;

export const MobileIcon = styled.div`
  display: none;
  color: purple;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 100%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavMenuUp = styled.div`
  display: flex;
  margin-left: auto;
`;
export const NavMenuDown = styled.div`
  display: flex;
`;

export const NavItem = styled.li`
  height: 50px;
`;
export const NavLinks = styled(LinkS)`
  color: purple !important;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0 10px;
  height: 100%;
  cursor: pointer;

  :active {
    color: rgba(139, 197, 63, 1);
  }
  :hover {
    color: rgba(139, 197, 63, 1) !important;
  }
`;
export const NavButton = styled.nav`
  display: flex;
  align-items: center;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnlink = styled(LinkR)`
  background-color: ${(props) => (props.background ? "transparent" : "purple")};
  color: ${(props) => (props.color ? "purple" : "white")};
  margin-left: 10px;
  text-decoration: none;
  height: 25px;
  text-align: center;
  width: 90px;
  border: 1px solid purple;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: rgba(139, 197, 63, 1);
  }

  /* &:hover{
        transition: all 0.2s ease-in-out;
        background-color: white;
        color:purple;
        font-weight: bold;
        font-size: 14px;
    } */
`;

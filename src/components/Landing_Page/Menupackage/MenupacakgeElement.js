import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Menupack = styled.div`
  margin-bottom: 50px;
  background-color: white;
  width: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
`;
export const Packup = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Packdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const Menu = styled.div`
  flex: 33%;
  max-width: 33%;
  display: flex;
  margin-top: 50px;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 420px;
  min-width: 300px;
  padding-bottom: 30px;
`;
// margin-left: 20px;

export const MenuImage = styled.img`
  src: ${(props) => props.src};
  object-fit: contain;
  alt: "food";
  height: 200px;
  width: 200px;
`;
export const MenuItem = styled.h2`
  color: purple;
  font-size: 2rem;
  letter-spacing: 1px;
  font-family: "Roboto Condensed bold";
  font-weight: 400;
`;
export const Description = styled.h5`
  font-size: 0.8rem;
  font-family: "Open Sans";
  margin: 10px 0px;
  color: black;
  font-family: "Open Sans";
  text-align: center;
  max-width: 200px;
`;
export const MenubtnBox = styled(LinkR)`
  display: flex;
  margin-top: auto;
  text-decoration: none;
`;
export const Menubtn = styled.button`
  text-decoration: none;
  background-color: rgba(139, 197, 63, 1);
  color: white;
  height: 30px;
  width: 110px;
  font-family: "Open Sans";
  border: 1px solid rgba(139, 197, 63, 1);
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export const Downup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

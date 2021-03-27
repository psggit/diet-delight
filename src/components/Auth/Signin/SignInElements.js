import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import back from "../../../assets/mealplan.jpg";

export const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url(${back}) no-repeat center center;
  background-size: cover;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: auto;
`;

export const Subheading = styled.div`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export const RouteContainer = styled.div`
  display: flex;
  margin-top: 20px;
  min-width: 320px;
  justify-content: space-around;
  align-items: center;
`;

export const SetBg = styled.div`
  width: 370px;
  display: flex;
  border-radius: 5px;
  margin-top: 5px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  margin-bottom: 30px;
`;

export const Route = styled(LinkR)`
  cursor: pointer;
  opacity: ${(props) => (props.opacity ? props.opacity : "1")};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(137, 197, 63, 1);
  border-radius: 5px;
  @media only screen and (max-width: 500px) {
    min-width: 320px;
  }
`;

export const Input = styled.input`
  height: 20px;
  text-decoration: none;
  width: 288px;
  align-self: flex-start;
  margin: 5px 10px;
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  height: 30px;
  border: 1px solid rgba(137, 197, 63, 1);
  border-radius: 10px;
  width: 200px;
  background-color: rgba(137, 197, 63, 1);
  font-size: 1rem;
  font-family: "Open Sans";
  color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 30px 0;
  outline: none;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

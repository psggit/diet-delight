import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../../../axiosInstance'
import people from '../../../assets/people.png'
import questionImage from '../../../assets/question.png'
import consultantImage from '../../../assets/consultant.png'
import PlanImage from '../../../assets/plans.png'

const Main = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100vh;
    background-color:white;
`

export const Title = styled.p`
    font-size:${props => props.size ? props.size : "1rem"};
    letter-spacing:${props => props.length ? props.length : "0px"};
    color:${props => props.color ? props.color : "black"};
    width:${props => props.width ? props.width : "100%"};
    font-family:"Open Sans";
    text-align:center;
    padding:${props => props.pad ? props.pad : "5px"};
    font-weight:${props => props.weight ? props.weight : "400"};
    margin: auto;
`


const Conatiner = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-evenly;
`
const ImageContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const CustomImage = styled.img`
    object-fit:contain;
    width:100%;
    height:200px;
    cursor:pointer;
    transition: all 1s ease-out;
    :hover{
        transform:scale(1.1)
    }
`

const Home = () => {

    const [user, setUser] = useState([]);
    const [question, setQuestion] = useState([]);
    const [consultant, setConsultant] = useState([]);
    const [meal, setMealplan] = useState([]);

    useEffect(() => {
        axios.get(`users?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setUser(res.data.data)
        })

        axios.get(`questions?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setQuestion(res.data.data)
        })

        axios.get(`consultants?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setConsultant(res.data.data)
        })

        axios.get(`meal-plans?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            setMealplan(res.data.data)
        })

    }, [])

    return (
        <>
            <Main>
                <Conatiner>
                    <ImageContainer>
                        <CustomImage
                            src={people} alt="people" />
                        <Title>{`Total Users - ${user.length}`}</Title>
                    </ImageContainer>
                    <ImageContainer>
                        <CustomImage src={questionImage} alt="people" />
                        <Title>{`Total Questions - ${question.length}`}</Title>
                    </ImageContainer>
                    <ImageContainer>
                        <CustomImage src={consultantImage} alt="people" />
                        <Title>{`Total Consultants - ${consultant.length}`}</Title>
                    </ImageContainer>
                    <ImageContainer>
                        <CustomImage src={PlanImage} alt="people" />
                        <Title>{`Total Plans - ${meal.length}`}</Title>
                    </ImageContainer>
                </Conatiner>
            </Main>
        </>
    )
}

export default Home

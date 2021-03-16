import React, { useEffect, useState } from 'react'
import { Main ,Container } from './DietDataDetailsElements';
import Details from './Details'
import SelectItem from './SelectItem'
import './index.css'
import axios from '../../axiosInstance'



export default function DietTextareaBtnItem (props) {

    const [givenAnswer, setGivenAnswer] = useState("");
    const [selectedAnswer,setSelectedAnswer] = useState("");

    console.log(props)


    useEffect(() => {
        if(props.submitAnswer === true){
            console.log(true)
            axios.post('my-answers',{
                question_id: props.question.id,
                answer: selectedAnswer === '' ? givenAnswer : selectedAnswer,
                question_question: props.question.question,
                question_type: props.question.type,
                question_additional_text: props.question.additional_text,
              }).then((res) => {
                console.log(res.data.data)
            }).catch(err => console.log(err));

        }
    },[props.submitAnswer, props.question.id, props.question.question, props.question.type, props.question.additional_text, selectedAnswer, givenAnswer])


    const handleAnswer = (selectedValue) => {
        var notSelected = selectedValue === 'Yes' ? 'No' : 'Yes';

        var notSelectedTheme = document.getElementById(notSelected);
        notSelectedTheme.style.background = '#fbfbfb';
        notSelectedTheme.style.color = '#800080'
        notSelectedTheme.style.opacity = '.8'

        var selected = document.getElementById(selectedValue);
        selected.style.background = '#800080';
        selected.style.color = '#fff';

        // props.handleAnswerGiven(props.question.id, selectedValue, props.question.question, props.question.type,props.question.additional_text, null, null )

        console.log(selectedValue)
        setSelectedAnswer(selectedValue);

    }

    // const uploadAnswer = (selectedValue) => {
    //     console.log(selectedValue)
    //     setSelectedAnswer(selectedValue)
    //     // setTimeout(() => {
    //     //     props.handleAnswerGiven(props.question.id,selectedValue, props.question.question, props.question.type,props.question.additional_text, null, null)
    //     // },2000)
    //     // setTimeout(() => {
    //     //     axios.post('my-answers',{
    //     //         question_id: props.question.id,
    //     //         answer: selectedValue,
    //     //         question_question: props.question.question,
    //     //         question_type: props.question.type,
    //     //         question_additional_text: props.question.additional_text,
    //     //       }).then((res) => {
    //     //         console.log(res.data.data)
    //     //     }).catch(err => console.log(err));
    //     // },3000)
    // }
    
    
    return(
        
        
        <div className="col-md-3 col-sm-12 mb-3" >
        
        <p className="six_title">{props.textBtnQue.question}</p>
        
        <div className="six_btn_container">
        <button type="button" id="Yes" className="btn btn-outline-light btn-sm mx-3 six_btn_yes" onClick={() => handleAnswer("Yes")}>Yes</button>
        <button type="button" id="No" className="btn btn-outline-light btn-sm six_btn_no" onClick={() => handleAnswer("No")}>No</button>
        </div>
        <div className="input_container">
        <input type="text" className="textfield_six" name="name" 
        placeholder="If Yes, Please Specify" onChange={(e) => {
            setGivenAnswer(e.target.value)
        }}
        />
        </div>
        </div>
        )
    }
     
    
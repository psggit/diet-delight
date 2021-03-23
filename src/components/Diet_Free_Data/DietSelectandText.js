import React, { useEffect, useState, useRef } from 'react'
import './index.css'
import axios from '../../axiosInstance';



export default function DietSelectandText (props) {

    console.log(props)

    const [selectOptions,setSelectOptions] = useState([])
    let selectedOption = useRef({});

    useEffect(() => {
        axios.get(`answer-options`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            console.log(res)
            console.log(props.question.id)
            let storeOptions = [];
            res.data.data.forEach(answerOption => {
                if(answerOption.question_id === props.question.id){
                    console.log(answerOption)
                    storeOptions.push(answerOption);
                }
            });
            setSelectOptions(storeOptions)
            console.log(selectOptions)
        }).catch(err => console.log(err));
    }, [])
    console.log("hello thisi avla;m",selectOptions)



    useEffect(() => {
    if(props.submitAnswer === true){
       axios.post('my-answers',{
            question_id: props.question.id,
            answer_option_id: selectedOption.current.id,
            answer: selectedOption.option,
            question_question: props.question.question,
            question_type: props.question.type,
            question_additional_text: props.question.additional_text,
            answer_option_option: selectedOption.current.option
          }).then((res) => {
            console.log(res.data.data)
        }).catch(err => console.log(err));
    }
}, [props.submitAnswer, props.question.id, props.question.question, props.question.type, props.question.additional_text, selectedOption.current.id, selectedOption.current.option])
    
    const uploadAnswer = (selectedValue) => {
        console.log(selectedValue)
        let selected = JSON.parse(selectedValue)
        console.log(selected.option)
        selectedOption.current = selected;
        console.log(selectedOption)
        // props.handleAnswerGiven(props.question.id, selectedOption.option, props.question.question, props.question.type, props.question.additional_text, selectedOption.id, selectedOption.option)
    }
    
    const renderSelect = selectOptions.map((selectData) =>{
        return(
            <option key={Math.random()} value={JSON.stringify(selectData)}>{selectData.option}</option>
        )
    })


    return(
        
        
        <div className="col-md-3 col-sm-12">
        
        <p className="fifth_title">{props.question.question}</p>
        
        <div className="select_container">
        <select name="cars" id="cars" className="select_menu_diet_age" onClick={(e) => 
           { e.preventDefault()
            console.log(e)
            uploadAnswer(e.target.value)}}>
       {renderSelect}
        </select>
        </div>

        <p className=" text_fifth_subtitle">Height & Width</p>
         
        
        </div>
        
        ) 
    }
    
    
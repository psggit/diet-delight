import React, { useEffect, useState } from 'react'
import { Main ,Container } from './DietDataDetailsElements';
import Details from './Details'
import SelectItem from './SelectItem'
import './index.css'
import axios from '../../axiosInstance';



export default function DietYesNoComponent (props) {

    const [selectedAnswer, setSelectedAnswer] = useState("");

    console.log(props)


    useEffect(() => {
        if(props.submitAnswer === true){
            console.log(true)
            axios.post('my-answers',{
                question_id: props.question.id,
                answer: selectedAnswer,
                question_question: props.question.question,
                question_type: props.question.type,
                question_additional_text: props.question.additional_text,
              }).then((res) => {
                console.log(res.data.data)
            }).catch(err => console.log(err));

        }
    },[props.submitAnswer, props.question.id, props.question.question, props.question.type, props.question.additional_text, selectedAnswer])


    const uploadAnswer = (selectedValue, id) => {

        // var notSelected = selectedValue === 'Yes' ? 'No' : 'Yes';

        // var notSelectedTheme = document.getElementById(notSelected);
        // notSelectedTheme.style.background = '#fbfbfb';
        // notSelectedTheme.style.color = '#800080'
        // notSelectedTheme.style.opacity = '.8'

        // var selected = document.getElementById(selectedValue);
        // selected.style.background = '#800080';
        // selected.style.color = '#fff';

        var selected = document.getElementsByClassName(props.question.id);
        console.log(selected)
        for(var i = 0; i < selected.length; i++){
            console.log(typeof(selected[i].id), typeof(id)) 
            if(parseFloat(selected[i].id) === id){
                console.log(selected[i]);
                selected[i].style.background = '#800080';
                selected[i].style.color = '#fff';
            }else{
                selected[i].style.background = '#fbfbfb';
                selected[i].style.color = '#800080'
                selected[i].style.opacity = '.8'
            }
        }

        setSelectedAnswer(selectedValue)

        // props.handleAnswerGiven(props.question.id, selectedValue, props.question.question, props.question.type,props.question.additional_text, null, null )

        console.log(selectedValue)
        // axios.post('my-answers',{
        //     question_id: props.question.id,
        //     answer: selectedValue,
        //     question_question: props.question.question,
        //     question_type: props.question.type,
        //     question_additional_text: props.question.additional_text,
        //   }).then((res) => {
        //     console.log(res.data.data)
        // }).catch(err => console.log(err));

    }
    return(
    
        <div className="col-md-3 col-sm-12 mb-3" >
        
        <p className="gender_question">{props.question.question}</p>
        
        <div className="btn_container_gender">
        <button type="button" id={props.id1} className={props.question.id} style={{border:'1px solid #800080', color: '#800080', opacity: 1, outline:'none', paddingLeft:'8%', paddingRight:'8%', borderRadius:'5px'}} onClick={() => uploadAnswer("Yes", props.id1)}>Yes</button>
        <button type="button" id={props.id2} className={props.question.id} style={{border:'1px solid #800080', color: '#800080', opacity: 1, outline:'none', paddingLeft:'8%', paddingRight:'8%', borderRadius:'5px'}} onClick={() => uploadAnswer("No", props.id2)}>No</button>
        </div>   
        
        </div>
        
        ) 
    }

 
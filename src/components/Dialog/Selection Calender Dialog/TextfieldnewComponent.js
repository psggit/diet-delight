	import React,{useEffect} from 'react';
	import 'react-calendar/dist/Calendar.css';
	import './TextFieldCalenderDialog.css'


	export default function TextfieldnewComponent(props) {
		console.log(props)
		
		useEffect(() => {
			if(props.addressOf === 'secondaryAddress'){
				var element = document.getElementById(props.addressOf);
				console.log(element)
				element.style.background = '#800080';
			}else{
				var element = document.getElementById(props.addressOf);
				console.log(element)
				element.style.background = '#8bc53f';
			}
		},[props.addressOf])


		return (

			
			<textarea className="textarea_textfield_calender" id={props.addressOf}>

			{props.textareaDialogName}

			</textarea> 
			
			)
		}
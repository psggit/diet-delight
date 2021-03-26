	import React from 'react';
	import 'react-calendar/dist/Calendar.css';
	import './TextFieldCalenderDialog.css'



	export default function TextfieldnewComponent(props) {
		


		return (

			
			<textarea id="calender" className="textarea_textfield_calender" name="calender" rows="4" cols="25">
			
			{props.textAreaNameContent}
			</textarea>

			

			)
		}
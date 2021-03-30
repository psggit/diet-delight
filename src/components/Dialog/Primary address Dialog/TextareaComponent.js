	import React from 'react';
	import './PrimaryaddDialog.css'


	export default function TextareaComponent(props) {
		

		return (
			
			<div className="row">
			<textarea id="Primary" name="Primary" className="text_area_dialog" rows="2" cols="25">
			{props.textareaDialogName}
			</textarea>
			</div>

			);
		}
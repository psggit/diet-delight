	import React from 'react';
	import './PrimaryaddDialog.css'


	export default function TextareaComponent(props) {
		console.log(props) 
		function selectAddress(id){
			props.makeChangeAdderess(id)
			var selectedAddress = document.getElementsByClassName("txtarea_secondary_address")
			for( var i=0; i<selectedAddress.length ; i++){
				if(selectedAddress[i].id === id){
					console.log(selectedAddress[i])
					selectedAddress[i].style.backgroundColor="#8BC53F"
					selectedAddress[i].style.color="#FFF"
				}else{
					selectedAddress[i].style.backgroundColor="#fbfbfb"
					selectedAddress[i].style.color="#000"
				}
			}
	
		} 

		return (
			
			<div className="row">
			<p id={props.id} name="Primary" className="text_area_dialog" rows="2" cols="25" onClick={() => selectAddress(props.id)}>
			{props.textareaDialogName}
			</p>
			</div>

			);
		}
	import React from 'react';
	import Button from '@material-ui/core/Button';
	import Dialog from '@material-ui/core/Dialog';
	import DialogActions from '@material-ui/core/DialogActions';
	import DialogContent from '@material-ui/core/DialogContent';
	import DialogContentText from '@material-ui/core/DialogContentText';
	import DialogTitle from '@material-ui/core/DialogTitle';
	import useMediaQuery from '@material-ui/core/useMediaQuery';
	import { useTheme } from '@material-ui/core/styles';
	import './PrimaryaddDialog.css'
	import TextareaComponent from './TextareaComponent.js'
	import TitleComponents from './TitleComponent.js'

	export default function PrimaryaddDialog(props) {
		const [open, setOpen] = React.useState(true);
		console.log(props)
		


		if(props.changeAddress === true){
		return (
		
			<Dialog
			open={open}
			
			style={{borderRadius:40}}
			aria-labelledby="responsive-dialog-title">
			
			<DialogTitle className="primary_address_bg" id="responsive-dialog-title">

			
			<TitleComponents titleDialogName="Primary Address" />
			<TextareaComponent textareaDialogName="3 Newbridge Court Chino Hills, CA 91709" />

			<TitleComponents titleDialogName="Secondary Address" />
			<h6 className="select_text_dialog">SELECT</h6>
			<TextareaComponent textareaDialogName="3 Newbridge Court Chino Hills, CA 91709" />

			<div className="btn_container_dialog_address">
			<button className="btn done_btn_dialog" onClick ={() =>props.makeAddress(false)}>DONE</button>
			</div>

			</DialogTitle>


			</Dialog>
			);}
			else{
				return(
					<>
					</>
				)
			}
		}
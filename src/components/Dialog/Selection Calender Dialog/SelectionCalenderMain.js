	import React from 'react';
	import Button from '@material-ui/core/Button';
	import Dialog from '@material-ui/core/Dialog';
	import DialogActions from '@material-ui/core/DialogActions';
	import DialogContent from '@material-ui/core/DialogContent';
	import DialogContentText from '@material-ui/core/DialogContentText';
	import DialogTitle from '@material-ui/core/DialogTitle';
	import useMediaQuery from '@material-ui/core/useMediaQuery';
	import { useTheme } from '@material-ui/core/styles';
	import './SelectionCalenderMain.css'
	import CalenderComponent from './CalenderComponent.js'
	import TextareaComponent from '../Primary address Dialog/TextareaComponent.js'


	export default function SelectionCalenderMain() {
		const [open, setOpen] = React.useState(false);
		const theme = useTheme();

		const handleOpenOtp = () => {
			setOpen(true);
		};

		const handleCloseOtp = () => {
			setOpen(false);
		};

		return (
			<div>

			<Button variant="outlined" color="primary" onClick={handleOpenOtp}>
			Open responsive dialog
			</Button>

			<Dialog
			open={open}
			onClose={handleCloseOtp}
			style={{borderRadius:40}}
			aria-labelledby="responsive-dialog-title">
			
			<DialogTitle className="calender_selection_dialog_bg" id="responsive-dialog-title">

			<div className="row">
			<div className="col-md-6">
			<TextareaComponent textareaDialogName="Primary Address 
			Jane Doe,
			3 Newbridge Court 
			Chino Hills, CA 91709 " />
			</div>
			<div className="col-md-6">
			<TextareaComponent textareaDialogName="Secondary Address 
			Jane Doe,
			3 Newbridge Court 
			Chino Hills, CA 91709 " />
			</div>
			</div>
			
			<CalenderComponent/>


			</DialogTitle>


			</Dialog>
			</div>
			);
		}
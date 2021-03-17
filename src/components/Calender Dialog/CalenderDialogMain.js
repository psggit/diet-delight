	import React, { useState } from 'react';
	import Button from '@material-ui/core/Button';
	import Dialog from '@material-ui/core/Dialog';
	import DialogActions from '@material-ui/core/DialogActions';
	import DialogContent from '@material-ui/core/DialogContent';
	import DialogContentText from '@material-ui/core/DialogContentText';
	import DialogTitle from '@material-ui/core/DialogTitle';
	import useMediaQuery from '@material-ui/core/useMediaQuery';
	import { useTheme } from '@material-ui/core/styles';
	import './CalenderDialogMain.css'
	import Calendar from 'react-calendar';
	import 'react-calendar/dist/Calendar.css';
	import './CustomcalenderStyle.css'



	export default function CalenderDialogMain() {
		const [open, setOpen] = React.useState(false);
		const theme = useTheme();

		const handleOpenOtp = () => {
			setOpen(true);
		};

		const handleCloseOtp = () => {
			setOpen(false);
		};

		const [value, onChange] = useState(new Date());

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
			
			<DialogTitle className="calender_dialog_bg_new" id="responsive-dialog-title">

			<h6 className="breaks_header">Breaks</h6>

			
			<div>
			<Calendar
			onChange={onChange}
			value={value}
			/>

			</div>

			
			<div className="btn_container_dialog_calender mt-3">
			<button className="btn calender_btn_dialog"><span class="material-icons done_all_icon">done_all</span></button>
			</div>


			</DialogTitle>


			</Dialog>
			</div>
			);
	}
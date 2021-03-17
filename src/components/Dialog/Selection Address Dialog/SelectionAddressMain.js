	import React from 'react';
	import Button from '@material-ui/core/Button';
	import Dialog from '@material-ui/core/Dialog';
	import DialogActions from '@material-ui/core/DialogActions';
	import DialogContent from '@material-ui/core/DialogContent';
	import DialogContentText from '@material-ui/core/DialogContentText';
	import DialogTitle from '@material-ui/core/DialogTitle';
	import useMediaQuery from '@material-ui/core/useMediaQuery';
	import { useTheme } from '@material-ui/core/styles';
	import '../Primary address Dialog/PrimaryaddDialog.css'
	import './SelectionAddressMain.css'

	export default function PrimaryaddDialog() {
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
			
			<DialogTitle className="selection_dialog_address_bg" id="responsive-dialog-title">

			<div className="row">
			<select name="address" className="selction_bar_dialog" id="address">
			<option value="volvo">Primary</option>
			<option value="saab">Secondary</option>
			</select>
			</div>


			<div className="row">
			<input type="text" className="selction_input_dialog" id="house" name="house" placeholder="House #, House name, Street name"></input>
			</div>


			<div className="row">
			<input type="text" className="selction_input_dialog" id="area" name="area" placeholder="Area name"></input>
			</div>


			<div className="btn_container_dialog_address">
			<button className="btn add_btn_dialog">ADD</button>
			</div>

			</DialogTitle>


			</Dialog>
			</div>
			);
		}
	import React from 'react';
	import Button from '@material-ui/core/Button';
	import Dialog from '@material-ui/core/Dialog';
	import DialogActions from '@material-ui/core/DialogActions';
	import DialogContent from '@material-ui/core/DialogContent';
	import DialogContentText from '@material-ui/core/DialogContentText';
	import DialogTitle from '@material-ui/core/DialogTitle';
	import useMediaQuery from '@material-ui/core/useMediaQuery';
	import { useTheme } from '@material-ui/core/styles';
	import './CalenderDialogMain.css'


	export default function CalenderDialogMain() {
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
			
			<DialogTitle className="calender_dialog_bg" id="responsive-dialog-title">

			<h6 className="breaks_header">Breaks</h6>

			<div className="month">      
			<ul>
			<li className="prev">&#10094;</li>
			<li className="next">&#10095;</li>
			<li>
			<span className="month_text_dialog">August</span>
			<span className="year_text_dialog">2021</span>
			</li>
			</ul>
			</div>

			<ul className="weekdays">
			<li>Mon</li>
			<li>Tue</li>
			<li>Wed</li>
			<li>Thu</li>
			<li>Fri</li>
			<li>Sat</li>
			<li>Sun</li>
			</ul>

			<ul className="days">  
			<li>01</li>
			<li>02</li>
			<li>03</li>
			<li>04</li>
			<li>05</li>
			<li>06</li>
			<li>07</li>
			<li>08</li>
			<li>09</li>
			<li><label className="active"><span className="active_number">10</span></label></li>
			<li><label className="active"><span className="active_number">11</span></label></li>
			<li>12</li>
			<li>13</li>
			<li><label className="light_active"><span className="light_active_number">14</span></label></li>
			<li>15</li>
			<li>16</li>
			<li>17</li>
			<li>18</li>
			<li>19</li>
			<li>20</li>
			<li>21</li>
			<li>22</li>
			<li>23</li>
			<li>24</li>
			<li><label className="active_text_number"><span className="active_text">25 break</span></label></li>
			<li>26</li>
			<li>27</li>
			<li>28</li>
			<li>29</li>
			<li>30</li>	
			<li>31</li>
			</ul>

			


			
			<div className="btn_container_dialog_calender">
			<button className="btn calender_btn_dialog"><span class="material-icons done_all_icon">done_all</span></button>
			</div>


			</DialogTitle>


			</Dialog>
			</div>
			);
		}
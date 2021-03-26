	import React, { useState, useEffect } from 'react';
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
	import './customStyleForCalendar.css'


 
	export default function CalenderDialogMain(props) {
		const [open, setOpen] = React.useState(true);
		const theme = useTheme();
		console.log(props)
		

		console.log(new Date(2021,2,2))

		
		const [value, setValue] = useState([]);

		useEffect(() =>{
			if(value.length > 0){
			var calendar = document.getElementById('calendar');
			console.log(calendar)
		}
		},[])

		useEffect(() => {
			let dateRange = [];
			dateRange.push(props.startDate, props.endDate)
			console.log(dateRange)
			setValue([...dateRange])

			
		},[props.startDate, props.endDate])

		const onChange = (value) => {
			console.log(value)

		}


		const daySelected=(value) =>{
			console.log(value)
		}

		if(props.changeAddress === true && value.length > 0){
		return (
			<div>

			<Dialog
			open={open}
		
			style={{borderRadius:40}}
			aria-labelledby="responsive-dialog-title">
			
			<DialogTitle className="calender_dialog_bg_new" id="responsive-dialog-title">
			<div className="breaks_header">
			<span >Breaks</span>
			</div>
			
			<div>
			{/* <Calendar
			maxDate={props.endDate}
			minDate={props.startDate}
			onClickDay={daySelected}
			/> */}

			{/* <input type="date" id="calendar" name="calendar" min={props.startDate} max={props.endDate} /> */}

			<div className="month">      
  <ul>
    <li className="prev">&#10094;</li>
    <li className="next">&#10095;</li>
    <li>
      August<br></br>
      <span style={{fontSize:"18px"}}>2021</span>
    </li>
  </ul>
</div>

<ul className="weekdays">
  <li>Mo</li>
  <li>Tu</li>
  <li>We</li>
  <li>Th</li>
  <li>Fr</li>
  <li>Sa</li>
  <li>Su</li>
</ul>

<ul className="days">  
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li><span className="active">10</span></li>
  <li>11</li>
  <li>12</li>
  <li>13</li>
  <li>14</li>
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
  <li>25</li>
  <li>26</li>
  <li>27</li>
  <li>28</li>
  <li>29</li>
  <li>30</li>
  <li>31</li>
</ul>	


			</div>

			
			<div className="btn_container_dialog_calender mt-3">
			<button className="btn calender_btn_dialog"  onClick ={() =>props.makeAddress(false)}><span className="material-icons done_all_icon">done_all</span></button>
			</div>


			</DialogTitle>


			</Dialog>
			</div>
			);}else{
				return(
					<>
					</>
				)
			}
	}
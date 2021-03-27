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
		const [value, setValue] = useState([]);
		const [startDate, setStartDate] = useState("");
		const [endDate, setEndDate] = useState("");
		const weekDays = ['Mo','Tu','We', 'Th', 'Fr', 'Sa','Su' ]
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const years = ['2020','2021','2022','2023','2024','2025', '2026','2027', '2028', '2029','2030']
		const [currentYear, setCurrentYear] = useState('');
		const [currentMonth, setCurrentMonth] = useState('');
		const [totalDays, setTotalDays] = useState([]);
		const [currentMonthInNumber, setCurrentMonthInNumber] = useState('');


		useEffect(() =>{
			if(value.length > 0){
				var calendar = document.getElementById('calendar');
				console.log(calendar)
			}
		},[])


	

		const checkCurrentMonth = (value) => {
			console.log(value)
			let newValue = 0;
			if(value > 12){
				newValue = value - 12;
				let currentLastYear = parseInt(currentYear) + 1;
				setCurrentYear(currentLastYear);
			}else if(value < 1){
				newValue = value + 12;
				let currentLastYear = parseInt(currentYear) - 1;
				setCurrentYear(currentLastYear);
			}else{
				newValue = value;
			}
			setCurrentMonthInNumber(newValue)
			switch(newValue){
				case 1:
					setCurrentMonth('January')
					break;
				case 2:
					setCurrentMonth('February')
					break;
				case 3:
					setCurrentMonth('March')
					break;
				case 4:
					setCurrentMonth('April')
					break;
				case 5:
					setCurrentMonth('May')
					break;
				case 6:
					setCurrentMonth('June')
					break;
				case 7:
					setCurrentMonth('July')
					break;
				case 8:
					setCurrentMonth('August')
					break;
				case 9:
					setCurrentMonth('September')
					break;
				case 10:
					setCurrentMonth('October')
					break;
				case 11:
					setCurrentMonth('November')
					break;
				case 12:
					setCurrentMonth('December')
					break;
			}
		}

	

		useEffect(() => {
			setStartDate(props.startDate)
			setEndDate(props.endDate)
			const date = new Date(props.startDate);
			console.log(date)
			let currentFullYear = date.getFullYear();
			let currentlyMonth = date.getMonth();
			setCurrentYear(currentFullYear)
			setCurrentMonthInNumber(currentlyMonth + 1);
			// dateRange.push(props.startDate, props.endDate)
			// console.log(dateRange)
			// setValue([...dateRange])
			checkCurrentMonth(currentlyMonth + 1)

		},[props.startDate, props.endDate])




		// const onChange = (value) => {
		// 	console.log(value)

		// }


		// const daySelected=(value) =>{
		// 	console.log(value)
		// }


		const handleMonth = (data) => {
			if(data === 'prev'){
				checkCurrentMonth(parseInt(currentMonthInNumber) - 1)
			}else{
				checkCurrentMonth(parseInt(currentMonthInNumber) + 1)
			}
		}


		const getMonthDays = (month, year) => {
			return new Date(year, month, 0).getDate();
		}

		const handleDaySelection = (e,day) => {
			console.log(e,day)
			var createLabelElement = document.createElement('label');
			createLabelElement.className = 'active_break_grey';
			createLabelElement.innerHTML = day+'<br></br>'+'break';
			// var appendElement = <label className="active_break_grey">${day}<br></br> break </label>;
			var listElement = document.getElementById(e.target.id);
			listElement.innerHTML = '';
			listElement.appendChild(createLabelElement);
		}

		useEffect(() => {
			if(currentMonthInNumber != '' && currentYear != ''){
				let totalDaysInMonth = getMonthDays(currentMonthInNumber, currentYear)
				let totalDaysCount = []
				for(var i=1; i<=totalDaysInMonth; i++){
					totalDaysCount.push(i);
				}
				setTotalDays([...totalDaysCount])
			}
		}, [currentMonthInNumber, currentYear])

		const renderWeeks = weekDays.map((weekDay) => <li key={Math.random()} id={Math.random()}>{weekDay}</li>)


		const renderMonthDays = totalDays.map((day) => {
			const startDate = new Date(props.startDate)
			const endDate = new Date(props.endDate)
			var startDateDay = startDate.getDate();
			var endDateDay = endDate.getDate();
			var startDateMonth = startDate.getMonth() + 1;
			var endDateMonth = endDate.getMonth() + 1;
			var startDateYear = startDate.getFullYear();
			var endDateYear = endDate.getFullYear();

			console.log(startDateDay, endDateDay, startDateMonth, endDateMonth, startDateYear, endDateYear, startDate, endDate)
			let daysFromStartDay = [];
			let daysFromEndDay = [];

			var lastDateForStartMonth = getMonthDays(startDateMonth, startDateYear)


			if(startDateMonth != endDateMonth){
				for(var i=1; i<=endDateDay; i++){
					daysFromEndDay.push(i);
				}
			}

			for(var j=startDateDay; j<=lastDateForStartMonth; j++){
				daysFromStartDay.push(j);
			}

			console.log(lastDateForStartMonth, daysFromStartDay, daysFromEndDay)


			if((currentMonthInNumber === startDateMonth || currentMonthInNumber === endDateMonth) && (currentYear === startDateYear || currentYear === endDateYear) && (daysFromStartDay.includes(day) || daysFromEndDay.includes(day))){
				return(
					<li key={Math.random()} id={Math.random()} onClick={(e) => handleDaySelection(e,day)}><span className="active_grey">{day}</span></li>
				)
			}else{
				return(
					<li key={Math.random()} id={Math.random()}>{day}</li>
				)
 			}
			})


		if(props.changeAddress === true){
			if(props.startDate != "" && props.endDate != ''){
				return (
					<div>
	
					<Dialog
					open={open}
	
					style={{borderRadius:40}}
					aria-labelledby="responsive-dialog-title">
	
					<DialogTitle className="calender_dialog_bg_new" id="responsive-dialog-title">
					<div className="breaks_header text-light text-center">
					<span >Breaks</span>
					</div>
	
					<div>
		<div className="month">      
		<ul>
		<li className="prev" onClick={() => handleMonth("prev")}>&#10094;</li>
		<li className="next" onClick={() => handleMonth("next")}>&#10095;</li>
		<li className="month_dialog_text">
		{currentMonth}
		<span className="year_dialog_text ml-1 mr-1">{currentYear}</span>
		</li>
		</ul>
		</div>
	
		<ul className="weekdays">
		{renderWeeks}
		</ul>
	
		<ul className="days">  
		{renderMonthDays}
		</ul>	
	
	
		</div>
	
	
		<div className="btn_container_dialog_calender mt-3">
		<button className="btn calender_btn_dialog"  onClick ={() =>props.makeAddress(false)}><span className="material-icons done_all_icon">done_all</span></button>
		</div>
	
	
		</DialogTitle>
	
	
		</Dialog>
		</div>
		);
			}
			}else{
		return(
		<>
		</>
		)
	}
}

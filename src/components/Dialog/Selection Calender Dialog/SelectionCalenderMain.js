	import React,{useState, useEffect, useRef} from 'react';
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
	import TextfieldnewComponent from './TextfieldnewComponent.js'
	import './TextFieldCalenderDialog.css'
	import {getDayDetails, checkCurrentMonth, getMonthDays, formatedDate, weeksInList } from '../../CommonFunctionality';



	export default function SelectionCalenderMain(props) {
		const [open, setOpen] = React.useState(true);
		const theme = useTheme();
		const weekDays = ['Su','Mo','Tu','We', 'Th', 'Fr', 'Sa']
		const [currentYear, setCurrentYear] = useState('');
		const [currentMonth, setCurrentMonth] = useState('');
		const [totalDays, setTotalDays] = useState([]);
		const [currentMonthInNumber, setCurrentMonthInNumber] = useState('');
		const selectedWeekDays = useRef(new Array());
		const deliveryDays = useRef(new Array());
		const weekStartsAt = useRef(0);
		const [orderBreaksDates, setOrderBreaksDates] = useState([]);


		useEffect(() => {
			const date = new Date(props.startDate);
			console.log(date)
			let dayDetails = getDayDetails(date)
			console.log(dayDetails)
			setCurrentYear(dayDetails.year)
			setCurrentMonthInNumber(dayDetails.monthDateWithoutPrefix);
			let getLatestDate = checkCurrentMonth(dayDetails.monthDateWithoutPrefix, dayDetails.year)
			console.log(getLatestDate)
			setCurrentYear(getLatestDate.currentYear)
			setCurrentMonthInNumber(getLatestDate.monthValue)
			setCurrentMonth(getLatestDate.month)

		},[props.startDate, props.endDate])

		useEffect(() => {
			console.log(typeof(props.recentPurchase.weekdays))
			let weekDays = JSON.parse(props.recentPurchase.weekdays)
			console.log(weekDays, typeof(weekDays))
			let getWeekList = weeksInList(weekDays);
			deliveryDays.current = getWeekList;
			console.log(deliveryDays.current)
		},[props.recentPurchase.weekdays])

		const handleMonth = (data) => {
			let getLatestDate = {};
			if(data === 'prev'){
				getLatestDate = checkCurrentMonth(parseInt(currentMonthInNumber) - 1,currentYear)
			}else{
				getLatestDate = checkCurrentMonth(parseInt(currentMonthInNumber) + 1,currentYear)
			}
			console.log(getLatestDate)
			setCurrentYear(getLatestDate.currentYear)
			setCurrentMonthInNumber(getLatestDate.monthValue)
			setCurrentMonth(getLatestDate.month)	
		}

		useEffect(() => {
			console.log(currentYear)
			if(currentMonthInNumber != '' && currentYear != ''){
				let totalDaysInMonth = getMonthDays(currentMonthInNumber, currentYear)
				console.log(totalDaysInMonth)
				let totalDaysCount = [];
				let dayInfo = getDayDetails(new Date(currentYear, currentMonthInNumber - 1, 1));
				console.log(dayInfo);
				let weekStartValue = dayInfo.weekDay;
				weekStartsAt.current = weekStartValue;
				if(weekStartValue > 0){
					let lastMonthTotalDays = getMonthDays(currentMonthInNumber - 1, currentYear);
					let remainingDaysCount = lastMonthTotalDays - (dayInfo.weekDay - 1);
					console.log(lastMonthTotalDays, remainingDaysCount)
					let lastCurrentMonthInNumber = currentMonthInNumber - 1;
					for(var i = remainingDaysCount; i <= lastMonthTotalDays; i++ ){
						totalDaysCount.push({"date":i,"month":lastCurrentMonthInNumber});
					}
				}
				for(var j=1; j<=totalDaysInMonth; j++){
					totalDaysCount.push({"date":j,"month":currentMonthInNumber});
				}
				setTotalDays([...totalDaysCount])
			}
		}, [currentMonthInNumber, currentYear])

		const handleDaySelection = (e,day) => {
			console.log(e,day)
			var listElement = document.getElementById(e.target.id);
			console.log(listElement)
			if(listElement.className === 'active_grey'){
				listElement.className = 'active_light_grey';
				selectedWeekDays.current.push(day);
				console.log(selectedWeekDays)
			}else{
				listElement.className = 'active_grey';
				const indexOfSelected = selectedWeekDays.current.indexOf(day);
				selectedWeekDays.current.splice(indexOfSelected,1)
				console.log(selectedWeekDays)
			}

		}

		const renderWeeks = weekDays.map((weekDay) => {
		
			return(
			<li key={Math.random()} id={Math.random()}>{weekDay}</li>)
		})

		const renderMonthDays = totalDays.map((day) => {
			console.log(day)
			console.log(props.endDate)
			console.log(props.startDate)
			const startDateDay = new Date(props.startDate)
			const endDateDay = new Date(props.endDate)
			let startDateDetails = getDayDetails(startDateDay)
			let endDateDetails = getDayDetails(endDateDay)
			console.log(startDateDetails, endDateDetails)
			
			weekStartsAt.current = weekStartsAt.current - 1;
			console.log(typeof(weekStartsAt.current))

			let daysFromStartDay = [];
			let daysFromEndDay = [];

			var lastDateForStartMonth = getMonthDays(startDateDetails.monthDateWithoutPrefix, startDateDetails.year)


			if(startDateDetails.monthDateWithoutPrefix != endDateDetails.monthDateWithoutPrefix){
			for(var i=1; i<=endDateDetails.date; i++){
					daysFromEndDay.push(i);
			}	
			for(var j=startDateDetails.dayDateWithoutPrefix; j<=lastDateForStartMonth; j++){
				daysFromStartDay.push(j);
			}
			}else{		
			for(var k=startDateDetails.dayDateWithoutPrefix; k<=endDateDetails.dayDateWithoutPrefix; k++){
				daysFromStartDay.push(k);
			}
			}


			console.log(lastDateForStartMonth, daysFromStartDay, daysFromEndDay, weekStartsAt.current)

			console.log(day.month === currentMonthInNumber)
			if((day.month === currentMonthInNumber) && (currentMonthInNumber === startDateDetails.monthDateWithoutPrefix && currentYear === startDateDetails.year && daysFromStartDay.includes(day.date)) || (currentMonthInNumber === endDateDetails.monthDateWithoutPrefix && currentYear === endDateDetails.year && daysFromEndDay.includes(day.date))){
				return(
					<li key={Math.random()}  id={day.date+""+currentMonthInNumber+""+currentYear}><label className="active_com"><span className="active_number_com">{day.date}</span></label></li>
				)
			}
			return(
				<li key={Math.random()} id={day.date+""+currentMonthInNumber+""+currentYear}>{day.date}</li>
			)
			})	

			if(props.startDate != "" && props.endDate != ''){
		
		return (
			<div>

			

			<Dialog
			open={open}
			style={{borderRadius:40}}
			className="dialog_textfield_calender_new"
			aria-labelledby="responsive-dialog-title">
			
			<DialogTitle className="calender_selection_dialog_bg" id="responsive-dialog-title">

			<div className="row row_texe_field">

			<div className="col-md-6">

			<TextfieldnewComponent addressOf="primaryAddress" textareaDialogName="Primary Address 
			Jane Doe,
			3 Newbridge Court 
			Chino Hills, CA 91709 " />

			</div>

			<div className="col-md-6">

			<TextfieldnewComponent textareaDialogName="Secondary Address 
			Jane Doe,
			3 Newbridge Court 
			Chino Hills, CA 91709 " addressOf="secondaryAddress"/>

			</div>

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

			</DialogTitle>


			</Dialog>
			</div>
			);
		}else{
			return(
				<></>
			)
		}
		}
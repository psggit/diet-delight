	import React, { useState, useEffect, useRef } from 'react';
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
	import axios from '../../../axiosInstance'
import {getDayDetails, checkCurrentMonth, getMonthDays, formatedDate, weeksInList } from '../../CommonFunctionality';



	export default function CalenderDialogMain(props) {
		const [open, setOpen] = React.useState(true);
		const theme = useTheme();
		console.log(props)		
		const [value, setValue] = useState([]);
		const [startDate, setStartDate] = useState("");
		const [endDate, setEndDate] = useState("");
		const weekDays = ['Su','Mo','Tu','We', 'Th', 'Fr', 'Sa']
		const [currentYear, setCurrentYear] = useState('');
		const [currentMonth, setCurrentMonth] = useState('');
		const [totalDays, setTotalDays] = useState([]);
		const [currentMonthInNumber, setCurrentMonthInNumber] = useState('');
		const [orderBreaksDates, setOrderBreaksDates] = useState([]);
		// const [breakDaySelected, setBreakDaySelected] = useState([]);
		const selectedWeekDays = useRef(new Array());
		const deliveryDays = useRef(new Array());
		const weekStartsAt = useRef(0);



		useEffect(() =>{
			if(value.length > 0){
				var calendar = document.getElementById('calendar');
				console.log(calendar)
			}


			axios.get(`my-order-breaks?meal_purchase_id=`+props.mealData.id).then((res) => {
				console.log(res)
				let orderBreakDates = [];
				res.data.data.map((orderBreak) => {
					var dateBreak = orderBreak.date_list;
					var orderBreakDateList = dateBreak.split(',');
					orderBreakDates.push(orderBreakDateList)
				})
				orderBreaksDates([...orderBreakDates]);
				console.log(orderBreakDates)
			}).catch((err) => {
				console.log(err);
			})
		},[props.mealData.id])
	

		useEffect(() => {
			setStartDate(props.startDate)
			setEndDate(props.endDate)
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


		const handleAddDay = () => {
			props.makeAddress(false)
			const old_end_date = props.recentPurchase.end_date;
			const incrementedDays = selectedWeekDays.current.length;
			const formatedOldDate = new Date(old_end_date);
			console.log(old_end_date, incrementedDays, formatedOldDate)
			var date = formatedOldDate.setDate(formatedOldDate.getDate() + incrementedDays)

			console.log(date)
			let dayFormat = getDayDetails(new Date(date))
			console.log(dayFormat)
            let concatedDate = formatedDate( dayFormat.year,dayFormat.month,dayFormat.date);
            console.log(concatedDate)

			let selectedDaysList = selectedWeekDays.current.toString();
			axios.post('my-order-breaks',{
				meal_purchase_id:props.mealData.id,
				date_list:selectedDaysList
			}).then((res) => console.log(res)).catch((err) => console.log(err))
			axios.put('my-meal-purchases/'+props.mealData.id,{
				end_date:concatedDate
			})



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
					for(var i = remainingDaysCount; i <= lastMonthTotalDays; i++ ){
						totalDaysCount.push(i);
					}
				}
				for(var j=1; j<=totalDaysInMonth; j++){
					totalDaysCount.push(j);
				}
				setTotalDays([...totalDaysCount])
			}
		}, [currentMonthInNumber, currentYear])

		const renderWeeks = weekDays.map((weekDay) => {
		
		return(
		<li key={Math.random()} id={Math.random()}>{weekDay}</li>)})


		const renderMonthDays = totalDays.map((day) => {
			const startDateDay = new Date(props.startDate)
			const endDateDay = new Date(props.endDate)
			let startDateDetails = getDayDetails(startDateDay)
			let endDateDetails = getDayDetails(endDateDay)
			
			weekStartsAt.current = weekStartsAt.current - 1;
			console.log(typeof(weekStartsAt.current))

			let daysFromStartDay = [];
			let daysFromEndDay = [];

			var lastDateForStartMonth = getMonthDays(startDateDetails.monthDateWithoutPrefix, startDateDetails.year)


			if(startDateDetails.monthDateWithoutPrefix != endDateDetails.monthDateWithoutPrefix){
				for(var i=1; i<=endDateDetails.date; i++){
					daysFromEndDay.push(i);
				}
			}

			for(var j=startDateDetails.dayDateWithoutPrefix; j<=lastDateForStartMonth; j++){
				daysFromStartDay.push(j);
			}

			console.log(lastDateForStartMonth, daysFromStartDay, daysFromEndDay, weekStartsAt.current)


			if((currentMonthInNumber === startDateDetails.monthDateWithoutPrefix && currentYear === startDateDetails.year && daysFromStartDay.includes(day)) || (currentMonthInNumber === endDateDetails.monthDateWithoutPrefix && currentYear === endDateDetails.year && daysFromEndDay.includes(day))){
				console.log(weekStartsAt.current)
				var breakday = orderBreaksDates.includes(day)
				let generatedDate = new Date(currentYear, currentMonthInNumber, day)
				console.log(generatedDate)
				let dayInfo = getDayDetails(generatedDate)
				console.log(dayInfo)
				var deliveryDaysIncluded = deliveryDays.current.includes(dayInfo.weekDay)
				console.log(deliveryDaysIncluded, dayInfo.weekDay)
				if(breakday){
					return(
						<li><label className="active_break_grey">{day}<br></br> break </label></li>
					)
				}            
				if(deliveryDaysIncluded){
					return(
						<li key={Math.random()} id={Math.random()} onClick={(e) => handleDaySelection(e,day)}><span className="active_grey" id={Math.random()}>{day <= 9 ? 0+""+day : day}</span></li>
					)
				}
				return(
					<li key={Math.random()} id={Math.random()}><span className="active_light_grey" id={Math.random()}>{day <= 9 ? 0+""+day : day}</span></li>
				)
			}
			return(
				<li key={Math.random()} id={Math.random()}>{day}</li>
			)
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
		<button className="btn calender_btn_dialog"  onClick ={() => handleAddDay()}><span className="material-icons done_all_icon">done_all</span></button>
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

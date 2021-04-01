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
	import TextfieldnewComponent from './TextfieldnewComponent.js'
	import './TextFieldCalenderDialog.css'
	import {getDayDetails, checkCurrentMonth, getMonthDays, formatedDate, weeksInList } from '../../CommonFunctionality';
	import axios from '../../../axiosInstance'
	import './CalenderComponent.css'


	export default function SelectionCalenderMain(props) {
		console.log(props)
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
		const [daysToDeliverAtPrimaryAddress, setDaysToDeliverAtPrimaryAddress] = useState([]);
		const [daysToDeliverAtSecondaryAddress, setDaysToDeliverAtSecondaryAddress] = useState([]);


		useEffect(() =>{
			axios.get(`my-order-breaks?meal_purchase_id=`+props.mealData.id).then((res) => {
				console.log(res)
				let primaryAddressDeliveries = [];
				let secondaryAddressDeliveries = [];
				res.data.data.map((orderBreak) => {
					console.log(orderBreak)
					var primaryAddressDaysList = JSON.parse(orderBreak.primary_address_dates);
					var secondaryAddressDaysList = JSON.parse(orderBreak.secondary_address_dates);
					console.log(primaryAddressDaysList, secondaryAddressDaysList)
					if(primaryAddressDaysList != null || secondaryAddressDaysList != null){
						primaryAddressDaysList.map((primary) => {
							let dayInfo = getDayDetails(primary)
							primaryAddressDeliveries.push({"year":dayInfo.year,
								"month":dayInfo.monthDateWithoutPrefix,
								"date":dayInfo.dayDateWithoutPrefix});
						})
						secondaryAddressDaysList.map((secondary) => {
							let dayInfo = getDayDetails(secondary)
							secondaryAddressDeliveries.push({"year":dayInfo.year,
								"month":dayInfo.monthDateWithoutPrefix,
								"date":dayInfo.dayDateWithoutPrefix});
						})}
					})
				setDaysToDeliverAtPrimaryAddress([...primaryAddressDeliveries]);
				setDaysToDeliverAtSecondaryAddress([...secondaryAddressDeliveries]);
				console.log(primaryAddressDeliveries, secondaryAddressDeliveries);
			}).catch((err) => {
				console.log(err);
			})
		},[props.mealData.id])

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

		const handleChangeAddress = (e,day) => {
			console.log(e,day)
			var listElement = document.getElementById(e.target.parentNode.className);
			console.log(listElement)
			if(e.target.parentNode.className === 'active_com'){
				e.target.parentNode.className = 'active_violet';
				selectedWeekDays.current.push({
					"day":day,
					"month":currentMonthInNumber,
					"year":currentYear
				});
				console.log(selectedWeekDays)
			}else{
				e.target.parentNode.className = 'active_com';
				let indexToPop = selectedWeekDays.current.findIndex(x => x.day === day);
				selectedWeekDays.current.splice(indexToPop,1)
				console.log(selectedWeekDays)
			}

		}

		const handleSubmitDay = () => {
			let selectedDateList = [];
			selectedWeekDays.current.map((weekDay) => {
				let formatDate = formatedDate(weekDay.year, weekDay.month, weekDay.day)
				selectedDateList.push(formatDate);
			})
			axios.post('my-order-breaks',{
				meal_purchase_id:props.mealData.id,
				secondary_address_dates:selectedDateList
			}).then((res) => console.log(res)).catch((err) => console.log(err))
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
				// var deliveryDaysIncluded = deliveryDays.current.includes(dayInfo.weekDay)
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
					let secondaryAddressDate = daysToDeliverAtSecondaryAddress.findIndex(x => x.day === day.date && currentMonthInNumber === x.month && currentYear === x.year)
					let generatedDate = new Date(currentYear, currentMonthInNumber - 1, day.date)
					console.log(generatedDate)
					let dayInfo = getDayDetails(generatedDate)
					console.log(dayInfo)
					var deliveryDaysIncluded = deliveryDays.current.includes(dayInfo.weekDay)
					if(secondaryAddressDate >= 0){
						return (
						<li><label className="active_violet"><span className="active_number_com">{day.date}</span></label></li>
						)
					}
					if(deliveryDaysIncluded){
						console.log(dayInfo.weekDay)
						return(
						<li key={Math.random()}  onClick={(e) => handleChangeAddress(e,day.date)}  id={day.date+""+currentMonthInNumber+""+currentYear}><label className="active_com"><span className="active_number_com">{day.date}</span></label></li>
						)
					}
					return(
					<li key={Math.random()} id={day.date+""+currentMonthInNumber+""+currentYear}><label className="light_active_com"><span className="light_active_number_com">{day.date}</span></label></li>
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

				<div>

				<i className="fa fa-times close_primary_dialog_icon" aria-hidden="true"></i>

				</div> 
				<br></br>

				<div className="row row_texe_field">

				<div className="col-md-6">

				<TextfieldnewComponent addressOf="primaryAddress"  textareaDialogName={props.recentPurchase.billing_address_line1} />

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
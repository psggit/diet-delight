export function weeksInList(weekDays){

    var weekDayInList = [];

    weekDays.forEach(weekDay => {
        if(weekDay === "Sun"){
            weekDayInList.push(0)
        }
        if(weekDay === "Mon"){
            weekDayInList.push(1)
        }
        if(weekDay === "Tue"){
            weekDayInList.push(2)
        }
        if(weekDay === "Wed"){
            weekDayInList.push(3)
        }
        if(weekDay === "Thu"){
            weekDayInList.push(4)
        }
        if(weekDay === "Fri"){
            weekDayInList.push(5)
        }
        if(weekDay === "Sat"){
            weekDayInList.push(6)
        }   
    })

    return weekDayInList

}

export function addDays(date, days){
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}


export function getDayDetails(date){
    var month = date.getMonth() + 1;
    var monthDate = month < 10 ? "0"+month : month;
    var monthDateWithoutPrefix = month;
    var dayDate = date.getDate() < 10 ? "0"+date.getDate(): date.getDate();
    var dayDateWithoutPrefix = date.getDate();
    var yearDate = date.getFullYear();
    return {
        "month":monthDate,
        "date":dayDate,
        "year":yearDate,
        "monthDateWithoutPrefix":monthDateWithoutPrefix,
        "dayDateWithoutPrefix":dayDateWithoutPrefix
    }
}


export function lookForMonth(value){
    console.log(value)
    switch(value){
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
    }

}


export function checkCurrentMonth(value, currentYear){
    console.log(value)
    console.log(currentYear)
			let newValue = 0;
			if(value > 12){
				newValue = value - 12;
				currentYear = parseInt(currentYear) + 1;
			}else if(value < 1){
				newValue = value + 12;
				currentYear = parseInt(currentYear) - 1;
			}else{
				newValue = value;
			}
			let lookedOutMonth = lookForMonth(newValue);
			// setCurrentMonth(lookedOutMonth);
            console.log(lookedOutMonth)
            return {
                "currentYear" : currentYear,
                "monthValue" : newValue,
                "month" : lookedOutMonth
            }
}



export function getMonthDays(month,year){
    return new Date(year, month, 0).getDate();
}


export function formatedDate(year,month,date){
    return year+"-"+month+"-"+date;
} 
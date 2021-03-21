import react,{useEffect,useState} from 'react';
import axios from '../../../axiosInstance'


export default function KitchenReport(){
  const [menuOrder,setMenuOrder] = useState([])
  const [startDate,setStartDate] = useState("")
  const [endDate,setEndDate] = useState("")

const getPdf = () => {

  console.log("Hello")

  console.log(startDate, endDate)

  if(startDate !== "" && endDate != ""){
    console.log("kol")
    axios
    .get(
      `menu-orders?fromDate=`+startDate+`&toDate=`+endDate,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data.data); 
    }).catch((err) => console.log(err))

  }
}


  const selectStartDate = (e) => {
    console.log(e)
    setStartDate(e.target.value)
    document.getElementById('successErrorMessage').innerHTML = "";

  } 

  const selectEndDate = (e) => {
    console.log(e)
    if(startDate === ''){
      e.preventDefault()
      document.getElementById('successErrorMessage').innerHTML = "Please Select Start Date first";
    }else{
      setEndDate(e.target.value)
      console.log(e.target.value)
      document.getElementById('successErrorMessage').innerHTML = "";
    }
  }
  return(
    <>
    <span>Start Date</span>
  <input type="date" name="startDate" id="startDate" onChange={(e) => selectStartDate(e)}/>
  <span>End Date</span>
  <input type="date" name="endDate" min={startDate} id="endDate" onChange = {(e) => selectEndDate(e)}/>
  <span style={{color:"red"}} id="successErrorMessage"></span>

  <button id="btn" className="btn btn-primary" onClick={() => getPdf()}>Go</button>
    </>
  )
}
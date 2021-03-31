import React, { useEffect, useState } from 'react';
import axios from '../../../axiosInstance'
import Pdf from "react-to-pdf";
import './clientMealreport.css'
import ReactDOM from "react-dom";

const ref = React.createRef();

export default function ClientMealmenu() {
  const [menuOrders, setMenuOrders] = useState([])
  const [menuCategory, setMenuCategory] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [categoryName,setCategoryName] = useState("");
  const [dayCount, setDayCount] = useState([]);
  const [categories, setCategories] = useState([]);

  const getPdf = () => {
    console.log("Hello")
    console.log(startDate, endDate)
   
    if (startDate !== "" && endDate != "") {
      console.log("kol")

      // axios 
      // .get(`menu-categories?menu_id=4`)
      // .then((res) => {
      //   console.log(res.data.data);
      //   setMenuCategory(res.data.data)
      //   let menu_categories = [];
      //   res.data.data.map((category) => menu_categories.push(category.id))
      //   setCategories([...menu_categories])
      // }).catch((err) => console.log(err))


      axios
        .get(
          `menu-orders?fromDate=`+startDate+`&toDate=`+endDate+`&user_id=14`)
        .then((res) => {
          console.log(res.data.data);
          let menuOrders = [];
          let categories = [];
          let totalDays = [];
          res.data.data.map((order) => {
            if(order.menu_category.menu_id === 1){
                menuOrders.push(order);
                let checkIfDayIncluded = totalDays.includes(order.menu_item_day);
                if(!checkIfDayIncluded) totalDays.push(order.menu_item_day);
                let ifPresent = categories.includes(order.menu_category.name);
                if(!ifPresent) categories.push(order.menu_category.name);
            }
          })
          setMenuCategory([...categories]);
          setMenuOrders([...menuOrders]);
          setDayCount([...totalDays]);
          console.log(categories, menuOrders, totalDays)
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
    if (startDate === '') {
      e.preventDefault()
      document.getElementById('successErrorMessage').innerHTML = "Please Select Start Date first";
    } else {
      setEndDate(e.target.value)
      console.log(e.target.value)
      document.getElementById('successErrorMessage').innerHTML = "";
    }
  }


  const renderCategory = menuCategory.map((category) => {
    
    return(
      <>
      {/* <th class="under_data_col_style"></th>  */}
      <th class="under_data_col_style">{category}</th>
      </>
    )
  })

  const renderDay = dayCount.map((day) =>{
    let renderedMenuOrders = [];
    const renderMenuOrders = menuOrders.map((order) => {
      let ifRenderedMenuOrders = renderedMenuOrders.findIndex(x => x.day === day && x.category === order.menu_category.name);
      let ifCategoryIncluded = menuCategory.includes(order.menu_category.name);
        if(ifCategoryIncluded && order.menu_item_day === day && ifRenderedMenuOrders < 0){
          renderedMenuOrders.push({
            "category": order.menu_category.name,
            "day":day
          }); 
          return(<td class="under_data_col_style">{order.menu_item_name}</td>)}else{
            return <></>
          }
    })
    console.log(day)
    console.log(renderedMenuOrders)
    return(
      <tr>
      <th class="under_data_col_style">day {day}</th>
      {renderMenuOrders}
      </tr>
      )

  })

  return (
    <>
      <span>Start Date</span>
      <input type="date" name="startDate" id="startDate" onChange={(e) => selectStartDate(e)} />
      <span>End Date</span>
      <input type="date" name="endDate" min={startDate} id="endDate" onChange={(e) => selectEndDate(e)} />
      <span style={{ color: "red" }} id="successErrorMessage"></span>

      <button id="btn" className="btn btn-primary" onClick={() => getPdf()}>Go</button>

      <div className="App">
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
        <div ref={ref}>
          <div class="row kitchen_row_container">
            <div class="col-md-3">

              <div class="img_container_client_table" >
                <img src='./logoweb.png' alt="logo" class="logo_client"></img>
              </div>
            </div>

            <div class="col-md-9">

              <h6 class="title_kitchen_table">Ebrahim Khalil-7665</h6>
            </div>

          </div>


          <div class="row title_row_bottom">

            <div class="col-3">
              <h6 class="title_header_data">Kalorie: 1400 Kcal</h6>

            </div>

            <div class="col-3">

              <h6 class="title_header_data">Delivery Details:</h6>


            </div>

            <div class="col-3">

              <h6 class="title_header_data">Start Date: {startDate}</h6>


            </div>

            <div class="col-3">

              <h6 class="title_header_data"> End Date: {endDate}</h6>

            </div>

            <div class="col-3">

              <h6 class="title_header_data">MENU : FULL MEAL SEPT 2020</h6>

            </div>

          </div>


          <h6 class="text_clent_table_day"> Date: Wednesday, October 14, 2020 2:20:20 PM</h6>


          <div>

            <table class="kitchen_table">
            <tr>
              <th class="under_data_col_style"></th>
              {renderCategory}
            </tr>
              {renderDay}
            </table>



          </div>
        </div>
      </div>
    </>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<ClientMealmenu />, rootElement);

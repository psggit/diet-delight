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

  const [categories, setCategories] = useState([]);

  const getPdf = () => {

    console.log("Hello")

    console.log(startDate, endDate)

    if (startDate !== "" && endDate != "") {
      console.log("kol")
      axios
        .get(
          `menu-orders?fromDate=` + startDate + `&toDate=` + endDate,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          setMenuOrders(res.data.data)
        }).catch((err) => console.log(err))
        axios 
        .get(
          `menu-categories?menu_id=4`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data.data);
          setMenuCategory(res.data.data)
          let menu_categories = [];
          res.data.data.map((category) => menu_categories.push(category.id))
          setCategories([...menu_categories])
        }).catch((err) => console.log(err))

    }
  }

  const renderData = menuCategory.map((category) => {
    
    console.log(category)
    return(
      <>
      {/* <th class="under_data_col_style"></th>  */}
      <th class="under_data_col_style">{category.name}</th>
      </>
    )
  })

  const renderDay = menuOrders.map((order) =>{
      console.log(order)
      var presentcategoryMenu = categories.includes(order.menu_category_id);
      if(presentcategoryMenu){
        return(
          <>
           <tr>
        <th class="under_data_col_style">day {order.menu_item_day}</th>
        <td class="under_data_col_style">{order.menu_item_name}</td>
        </tr>
          </>
        )
      }
  })

  
  // const renderDay = menuOrders.map((day) => {
  //   console.log(day)
  //   return(
  //     <>
  //     <tr>
  //     {/* <th class="under_data_col_style"></th>  */}
  //     <th class="under_data_col_style">Day {day.menu_item_day}</th>
  //     <td class="under_data_col_style">Blueberry Waffle & Syrup*</td>
  //     <td class="under_data_col_style">Fruit* </td>
  //     <td class="under_data_col_style">Radicchio Date Salad(nuts)*</td>
  //     <td class="under_data_col_style">French Beef(Mashed Potato)*</td>
  //     <td class="under_data_col_style">Date Cookie w/Nuts*</td>
  //     <td class="under_data_col_style">Greek Salad*</td>
  //     <td class="under_data_col_style">Greek Salad*</td>
  //     <td class="under_data_col_style"></td>
  //     </tr>
  //     </>
  //   )
  // })


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

  console.log(renderDay)
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

              <h6 class="title_header_data">Start Date: 13/10/2020</h6>


            </div>

            <div class="col-3">

              <h6 class="title_header_data"> End Date: 09/11/2020</h6>

            </div>

            <div class="col-3">

              <h6 class="title_header_data">MENU : FULL MEAL SEPT 2020</h6>

            </div>

          </div>


          <h6 class="text_clent_table_day"> Date: Wednesday, October 14, 2020 2:20:20 PM</h6>


          <div>

            <table class="kitchen_table">

              {renderData}
              {/* <tr>
                <th class="under_data_col_style"></th> 
                <th class="under_data_col_style">Breakfast</th>
                <th class="under_data_col_style">Snacks 1</th>
                <th class="under_data_col_style">Lunch Starter</th>
                <th class="under_data_col_style">Lunch Main</th>
                <th class="under_data_col_style">Snacks 2</th>
                <th class="under_data_col_style">Dinner Starter</th>
                <th class="under_data_col_style">Dinner Main</th>
                <th class="under_data_col_style">Extras</th>
              </tr> */}

              {/* <tr> */}
              {renderDay}
                {/* <td class="under_data_col_style">"Day 1</td> */}
                {/* <td class="under_data_col_style">Blueberry Waffle & Syrup*</td>
                <td class="under_data_col_style">Fruit* </td>
                <td class="under_data_col_style">Radicchio Date Salad(nuts)*</td>
                <td class="under_data_col_style">French Beef(Mashed Potato)*</td>
                <td class="under_data_col_style">Date Cookie w/Nuts*</td>
                <td class="under_data_col_style">Greek Salad*</td>
                <td class="under_data_col_style">Greek Salad*</td>
                <td class="under_data_col_style"></td> */}

              {/* </tr> */}




            </table>



          </div>
        </div>
      </div>
    </>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<ClientMealmenu />, rootElement);

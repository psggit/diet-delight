import React,{useEffect,useState} from 'react';
import axios from '../../../axiosInstance'
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import './kitchenreport.css'
const ref = React.createRef();


export default function KitchenReport(){
  const [menuOrder,setMenuOrder] = useState([])
  const [startDate,setStartDate] = useState("")
  const [menuCategory, setMenuCategory] = useState([])
  const [categoryName,setCategoryName] = useState("");
  const [dayCount, setDayCount] = useState([]);
  const [categories, setCategories] = useState([]);


const getPdf = () => {


  console.log(startDate)

  if(startDate !== ""){
    axios
    .get(
      `menu-orders?fromDate=`+startDate)
    .then((res) => {
      console.log(res.data.data);
      let menuOrders = [];
      let categories = [];
      res.data.data.map((order) => {
            menuOrders.push(order);
            let ifPresent = categories.includes(order.menu_category.name);
            if(!ifPresent) categories.push(order.menu_category.name);
      })
      setMenuCategory([...categories]);
      setMenuOrder([...menuOrders]);
      console.log(categories, menuOrders)
    }).catch((err) => console.log(err))

  }
}


  const selectStartDate = (e) => {
    console.log(e)
    setStartDate(e.target.value)
    document.getElementById('successErrorMessage').innerHTML = "";

  } 

  return(
    <>
    <span>Start Date</span>
  <input type="date" name="startDate" id="startDate" onChange={(e) => selectStartDate(e)}/>
  <span style={{color:"red"}} id="successErrorMessage"></span>

  <button id="btn" className="btn btn-primary" onClick={() => getPdf()}>Go</button>

  <div className="App">
      <Pdf targetRef={ref} filename="report.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      <div ref={ref}>
      <div class="row kitchen_row_container">
            <div class="col-md-3">
                
                <div class="img_container_kitchen">
                    <img src='./logoweb.png' alt="logo" class="logo_kitchen"></img>
                </div>
                
            </div>
            
            <div class="col-md-9">
                
                <h6 class="title_kitchen_table">DAILY MENU ORDER SHEET : DAILY MENU ORDER SHEET</h6>
            </div>
            
        </div>
        
        
        <div class="row title_row_bottom">
            
            <div class="col-3">
                <h6 class="title_header_data">MENU :  Day 7</h6>
                
            </div>
            
            <div class="col-3">
                
                <h6 class="title_header_data">DATE :  06/10/2020</h6>
                
                
            </div>
            
            <div class="col-3">
                
                <h6 class="title_header_data">DAY :  Tuesday</h6>
                
                
            </div>
            
            <div class="col-3">
                
                <h6 class="title_header_data">TOTAL :   116</h6>
                
            </div>
            
        </div>
        
        <table class="kitchen_table">
            <tr>
                <th class="first_column"></th>
                <th class="total_text_kitchen">Total</th>
                <th class="under_data_col_style">--</th>
                <th class="under_data_col_style">-</th>
                <th class="under_data_col_style">R</th>
                <th class="under_data_col_style">+</th>
                <th class="under_data_col_style">++</th>
                <th class="under_data_col_style">+++</th>
                <th class="under_data_col_style">++++</th>
                <th class="under_data_col_style">Special Notes</th>
            </tr>
            
            <tr>
                <td colSpan="10" class="title_breakfast_text_">BreakFast</td>
                
            </tr>
            
            <tr>
                <td class="sec_column">Foul & Arabic bread* </td>
                <td class="total_text_kitchen">14</td>
                <td class="under_data_col_style">0</td>
                <td class="under_data_col_style">4</td>
                <td class="under_data_col_style">4</td>
                <td class="under_data_col_style">4</td>
                <td class="under_data_col_style">2</td>
                <td class="under_data_col_style">0</td>
                <td class="under_data_col_style">0</td>
                <td class="under_data_col_style"></td>
            </tr>
            
            <tr>
                <td class="sec_column">Croissant Zaatar*  </td>
                <td class="total_text_kitchen">38</td>
                <td class="under_data_col_style">0</td>
                <td class="under_data_col_style">5</td>
                <td class="under_data_col_style">19</td>
                <td class="under_data_col_style">6</td>
                <td class="under_data_col_style">6</td>
                <td class="under_data_col_style">1</td>
                <td class="under_data_col_style">1</td>
                <td class="under_data_col_style">1 R : extra care</td>
            </tr>
            
        </table>
        
      </div>
    </div>
    </>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<getPdf />, rootElement);

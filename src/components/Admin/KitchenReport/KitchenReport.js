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
  const [calories, setCalories] = useState([]);


const getpdf = () => {


  console.log(startDate)


  if(startDate !== ""){
    axios
    .get(
      `menu-orders?fromDate=`+startDate)
    .then((res) => {
      console.log(res.data.data);
      let menuOrders = [];
      let categories = [];
      let calorieOption = [];
      res.data.data.map((order) => {
      menuOrders.push(order);
            let ifPresent = categories.includes(order.menu_category.name);
            if(!ifPresent) categories.push(order.menu_category.name);

            axios.get(`menus/`+order.menu_category.menu_id)
            .then((response) => {
              console.log(response)
              let caloriesGiven = JSON.parse(response.data.data.calorie_options)
              caloriesGiven.map((calorie) => {
                let checkIfCalorieIncluded = calorieOption.includes(parseInt(calorie))
                if(!checkIfCalorieIncluded){
                  calorieOption.push(parseInt(calorie));
                }
              })
              console.log(calorieOption)
              let sortCalories = calorieOption.sort(function(a, b){return a - b});;
              console.log(sortCalories)
              setCalories([...sortCalories]);
            }).catch((err) => {
              console.log(err)
            })
      })
      setMenuCategory([...categories]);
      setMenuOrder([...menuOrders]);
      console.log(categories, menuOrders, calorieOption)
    }).catch((err) => console.log(err))

  }
}


  const selectStartDate = (e) => {
    console.log(e)
    setStartDate(e.target.value)
    document.getElementById('successErrorMessage').innerHTML = "";

  } 


  const renderCalories = calories.map((calorie) => {
    // const totalCalories = calories.length;
    let centerCalorie = (Math.floor(calories.length / 2)) - 1;
    let regularCalorie = calories[centerCalorie];

    

    
    if(calorie === regularCalorie){
    return(
      <th class="under_data_col_style">R</th>
      )}else{
        let indexOfCalorie = calories.indexOf(calorie);
        let indexDiff = centerCalorie - indexOfCalorie;
        console.log(indexDiff)
        if(indexOfCalorie < centerCalorie){
          if(indexDiff === 1){
            return(
            <th class="under_data_col_style">-</th>
          )}
          let stringToReplace = '-';
          for(let i=0; i<indexOfCalorie; i++){
            let concatString = '-';
            stringToReplace = stringToReplace.concat(concatString);
          }
          return(
            <th class="under_data_col_style">{stringToReplace}</th>
          )
        }
        indexDiff = Math.abs(indexDiff);
        if(indexDiff === 1){
          return(
            <th class="under_data_col_style">+</th>
          )
        }
        let stringToReplace = '+';
        let ReplacedString = '';
        for(let i=0; i<indexOfCalorie; i++){
          let concatString = '+';
          ReplacedString = stringToReplace.concat(concatString);
        }
        return(
          <th class="under_data_col_style">{ReplacedString}</th>
        )
    }
  })



  const renderCategory = menuCategory.map((category) => {
    let renderedMenuOrders = [];
    const renderMenuOrders = menuOrder.map((order) => {
      let ifRenderedMenuOrders = renderedMenuOrders.findIndex(x => x.category === category && order.menu_item_name === x.name && x.count >= 1);
      if(ifRenderedMenuOrders >= 0){
        let changeCounter = renderedMenuOrders[ifRenderedMenuOrders]
        changeCounter.count = changeCounter.count + 1;
      }
      console.log(ifRenderedMenuOrders)
      let ifCategoryIncluded = menuCategory.includes(order.menu_category.name);

      // const renderTotalOrders = calories.map((calorie) => {
      //   if(ifCategoryIncluded && order.menu_category.name === category){ 
      //     return(
      //       <td class="total_text_kitchen">{renderedMenuOrders[ifRenderedMenuOrders]}</td>
      //     )
      //   }
      // })


      if(ifCategoryIncluded  && ifRenderedMenuOrders < 0 && order.menu_category.name === category){ 
        renderedMenuOrders.push({
          "category": category,
          "name":order.menu_item_name,
          "count": 1
        });
        return(
          <tr>
              <td class="sec_column">{order.menu_item_name}</td>
              <td class="total_text_kitchen">0</td>
              <td class="under_data_col_style"></td>
          </tr>
        )
      }
      
    })
    console.log(renderedMenuOrders)
  return(
    <>
  <tr>
      <td colSpan="10" class="title_breakfast_text_">{category}</td>
  </tr>
  {renderMenuOrders}
  </>    
  )
  })

  return(
    <>
    <span>Start Date</span>
  <input type="date" name="startDate" id="startDate" onChange={(e) => selectStartDate(e)}/>
  <span style={{color:"red"}} id="successErrorMessage"></span>

  <button id="btn" className="btn btn-primary" onClick={() => getpdf()}>Go</button>

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
                
                <h6 class="title_header_data">DATE : {startDate}</h6>
                
                
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
                {renderCalories}
                <th class="total_text_kitchen">Special Notes</th>
            </tr>
            
     {renderCategory}            
        </table>
        
      </div>
    </div>
    </>
  )
}
const rootElement = document.getElementById("root");
ReactDOM.render(<getpdf />, rootElement);

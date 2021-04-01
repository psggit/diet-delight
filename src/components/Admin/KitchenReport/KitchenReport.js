import React,{useEffect,useState} from 'react';
import axios from '../../../axiosInstance'
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import './kitchenreport.css'
const ref = React.createRef();


export default function KitchenReport(){
  const [menuOrder,setMenuOrder] = useState([])
  const [startDate,setStartDate] = useState("2021-03-23")
  const [menuCategory, setMenuCategory] = useState([])
  const [categoryName,setCategoryName] = useState("");
  const [dayCount, setDayCount] = useState([]);
  const [categories, setCategories] = useState([]);
  const [calories, setCalories] = useState([]);


const getpdf = () => {

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
              let sortCalories = calorieOption.sort(function(a, b){return a - b});;
              setCalories([...sortCalories]);
            }).catch((err) => {
              console.log(err)
            })
      })
      let renderedMenuOrders = [];
      categories.map((category) => {
          menuOrders.map((order) => {
            // let calorieNote = "";
            // let centerCalorie = (Math.floor(calories.length / 2)) - 1;
            // let regularCalorie = calories[centerCalorie];
            // let indexOfCalorie = calories.indexOf(order.kcal);
            // let indexDiff = centerCalorie - indexOfCalorie;
            // if(order.kcal === regularCalorie && (order.notes != null || order.notes != '')){
            //   calorieNote = "R:"+ order.notes;
            // }
            let ifRenderedMenuOrders = renderedMenuOrders.findIndex(x => x.category === category && order.menu_item_name === x.name && x.count >= 1 && order.menu_category.name === x.category);

            if(ifRenderedMenuOrders >= 0){
              let changeCounter = renderedMenuOrders[ifRenderedMenuOrders]
              changeCounter.count = changeCounter.count + 1;
              changeCounter.calories.push(order.kcal);
            }      
            if(ifRenderedMenuOrders < 0 && order.menu_category.name === category){
              renderedMenuOrders.push({
                "category": category,
                "name":order.menu_item_name,
                "count": 1,
                "calories":[order.kcal],
                "notes":[]
              });
            }
          })
          console.log(renderedMenuOrders)
      })
      setMenuOrder([...renderedMenuOrders]);
      setMenuCategory([...categories]);
    }).catch((err) => console.log(err))

  }


  console.log(startDate)

  
}

useEffect(() => {
  getpdf();
},[startDate])


  const selectStartDate = (e) => {
    console.log(e)
    setStartDate(e.target.value)
    document.getElementById('successErrorMessage').innerHTML = "";

  } 

  const replaceCalories = (indexOfCalorie, stringToReplace) => {

    let replacedString = '';
    for(let i=0; i<indexOfCalorie; i++){
      let concatString = stringToReplace;
      replacedString = stringToReplace.concat(concatString);
    }
    return replacedString
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
        if(indexOfCalorie < centerCalorie){
          if(indexDiff === 1){
            return(
            <th class="under_data_col_style">-</th>
          )}
          let stringToReplace = replaceCalories(indexOfCalorie, '-');
          
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
        let stringToReplace = replaceCalories(indexOfCalorie, '+');
        return(
          <th class="under_data_col_style">{stringToReplace}</th>
        )
    }
  })



  const renderCategory = menuCategory.map((category) => {
    const renderMenuOrders = menuOrder.map((order) => {
      console.log(order)
      if(order.category === category){ 
        return(
          <tr>
            <td class="sec_column">{order.name}</td>
            <td class="total_text_kitchen">{order.count}</td>
              {calories.map((calorie) => {
                let calorieCount = 0;
                for(var i=0; i<=order.calories.length; i++){
                  if(order.calories[i] === calorie){
                    calorieCount = calorieCount + 1;
                  }
                }
                return (
                  <td class="under_data_col_style">{calorieCount}</td>
                  )
              }
              )}
            <td class="under_data_col_style"></td>
        </tr>
        )
      }
    })
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

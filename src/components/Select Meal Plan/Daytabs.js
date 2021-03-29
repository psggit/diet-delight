import React,{useState,useEffect} from "react";
import "./Daytabs.css";
import SubmoduleSelectMeal from './SubmoduleSelectMeal'


export default function Daytabs(props){

    const[days,setDays] =useState([]);

    useEffect(()=>{
        let dayArray = [];
        console.log(props)

        for(var i=1; i<=parseInt(props.duration); i++){
            dayArray.push(i)   
        }
        setDays(dayArray)

        console.log(days)
        
    },[props.duration])


    return (
        <div>
        <div className="tabsH-wrapper">
        {days.map(day => {
            return (
                <div className="day_text_container" key={Math.random()} onClick={() => {props.notifyParent(day)
                    }} >
                <p className="day_text">Day {day}</p>
                </div>
                );
            })}
            </div>
         
            </div>
            );
}

// export default class Daytabs extends React.PureComponent {
//     constructor(props) {
//         super(props);
        
//         this.state = {
//             isScrolling: false,
//             isPressedDown: false,
//             startX: 0,
//             scrollLeft: 0,
//             days:[]
//         };
       
//     }


    
//     // componentDidMount(){
//     //     console.log("Mounted method")
//     //     for(var i=1; i<=parseInt(this.props.duration); i++){
//     //         this.state.days.push(i)   
//     //     }
//     //     console.log(this.state.days)
//     // }
    

//     notifyParent(menu_id,category_id,category_name){
//         console.log(this.props)
//        this.props.filterMenu(menu_id,category_id,category_name);

//    }
    
//     render() {

       
//             }
//         }
        
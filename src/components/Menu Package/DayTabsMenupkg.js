import React,{useRef} from "react";
import "../Select Meal Plan/Daytabs.css";
import "./DayTabsMenupkg.css";

export default class DayTabsMenupkg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrolling: false,
            isPressedDown: false, 
            startX: 0,
            scrollLeft: 0,
            selectedDaytabsMenu: "day1",
            content:'crunchy salad',
            categories:[]
        };
    }                  
    
    
     notifyParent(menu_id,category_id,category_name){
         console.log(this.props)
        this.props.filterMenu(menu_id,category_id,category_name);

    }
    
    render() {
      
        return (
            <div>
            <div className="tabsH_wrapper_menupkg">
            {this.props.categories.map(category => {
                console.log(category)
                return (
                    <div onClick={() => {
                        this.notifyParent(category.menu_id,category.id,category.name)
                        }} className="day_text_container_menupkg"  key={Math.random()}>
                    <p  className="day_text_menupkg">{category.name}</p>
                    </div>
                    );
                })}
                </div>
               
                </div>
                );
            }
        }
        
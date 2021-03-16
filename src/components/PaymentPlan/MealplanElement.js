import styled from 'styled-components';




export const Main = styled.div`
display:flex;
flex-direction:column;
align-items:center;
height:100vh;
width:100%;
@media only screen and (min-width:765px){
    height: 65rem;
    flex-direction:column;
}
@media only screen and (min-width: 992px) {
    width: 100%;
    
}

@media screen and (min-width: 999px) and (min-height: 700px) {
    div.meal_plan_container{
        height: 100%;
        width: 5%;
        justify-content: center;
        align-items: center;
        display: flex;
        margin-top: -13rem;
        flex-direction: column;
    }
    img.img_meal_plan{
        height: 140px;
        width: 140px;
    }
    p.immune_text{
        font-size: 1.6rem;
        width: 19rem;
        font-weight: 600;
        text-align: center;
    }
    span.sub_content_mealplan{
        font-size: 1rem;
        font-weight: 400;
        margin-top: -.8rem;
        letter-spacing: .2px;
    }
    p.paragraph_text{
        font-size: .75rem;
        width: 15rem;
        text-align: center;
        margin-top: .5rem;
        font-weight: 400;
        letter-spacing: .5px;
    }
    div.days_container{
        height: 32rem;
        width: 17rem;
        margin-top: -10rem; 
    }
    div.days_sub_container{
        margin-left: 0;
        margin-top: -5.7rem;
    }
    span.week_text{
        font-size: .8rem;
        font-weight: 700;
        opacity: .9;
    }
    div.sun_to_wed_container{
        display: flex;
        justify-content: space-evenly;
        margin-top: 1rem;
        
    }
    div.Thu_to_sat_container{
        display: flex;
        justify-content: space-evenly;
        margin-left: 2rem;
        margin-top: 1rem;
        
    }
    h6.starting_date_text{
        font-size: 1rem;
        font-weight: 600;
        text-align: center;
        margin-left: -1rem;
        margin-top: 1.5rem;
    }
    p.week_paragraph_content{
        font-size: 0.5rem;
        margin-left: 1.8rem;
        margin-top: 14px;
        opacity: 0.8;
    }
    div.date_container{
        margin-left: 5%;
        margin-top: 3%;
    }
    div.data_text{
        height: 2rem;
        width: 80px;
        border-radius: 5px;
        font-size: .8rem;
        margin-left: 4.7rem;
        margin-top: 0.5rem;
    }
    div.shipping_container{
        
        margin-left: -1rem;
        margin-top: 2rem;
        
    }
    h6.shipping_adddress_text{
        font-size: 1rem;
        font-weight: 600;
        margin-left: -1rem;
        text-align: center;
        
    }
    div.name_text{
        height: 80px;
        width: 111%;
        font-size: 0.6rem;
        padding: .4rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: inset rgba(0, 0, 0, 0.16) 0px 0px 7px 0px;
        margin-left: -.8rem;
        margin-top: 1.5rem;
    }
    a.change_text{
        font-size: .65rem;
        text-decoration: none;
        color: #8BC441;
        margin: .5rem;
        display: flex;
        justify-content: flex-end;
        margin-top: -1.9rem;
        text-transform: capitalize;
    }
    span.change_text{
        color: #8BC441;
    }
    div.btn_container_continue{
        display: flex;
        justify-content: center;
        margin-top: 2.2rem;
    }
    button.btn_continue{
        letter-spacing: 4px;
        background-color: #8BC441;
        width: 200px;
        border-radius: 10px;
        border: none;
        font-size: 1.1rem;
    }
    
    
    
}


`

export const Containercard = styled.div`
display:flex;
margin-top: 10%;
width: 60%;
height:60%;
box-shadow: 0px 6px 17px rgba(0, 0, 0, 0.16);
align-items:center;
justify-content:space-evenly;
border-radius: 25px;
background-color:white;

@media only screen and (min-width: 768px) {
    margin-top: 32%;
    width: 95%;
    height: 42%;
    box-shadow: 0px 6px 17px rgba(0,0,0,0.16);
    -webkit-box-align: center;
    align-items: center;
}
@media only screen and (max-width:765px){
    min-width:320px;
    height: 55rem;
    flex-direction:column;
}
@media only screen and (min-width: 992px) {
    margin-top: 19%;
    width: 91%;
    height: 45%;
    -webkit-box-align: center;
    padding-left: 1.5rem;
}
@media screen and (min-width: 1024px) and (max-height: 1035px) {
    margin-top: 12%;
    width: 95%;
    height: 42%;
    box-shadow: 0px 6px 17px rgba(0,0,0,0.16);
    -webkit-box-align: center;
    align-items: center;    
}



`

export const Linevertical = styled.div`

border-left: 2px solid grey;
height: 90%;
@media only screen and (max-width:765px){
    display:none;
}
@media only screen and (min-width: 768px) {
    margin:1rem 1rem 1rem 1rem;
}
@media only screen and (min-width: 992px) {
    margin-left: -7rem;
}
@media screen and (min-width: 1024px) and (max-height: 1035px) {
    margin:1rem 1rem 1rem 1rem;
}


`

export const Week= styled.div`

width: 100%;
height:15%;
align-items:center;
justify-content:space-evenly;
border-radius: 25px;


@media only screen and (max-width:600px){
    
    height:120px;
    width:200px;
}

`
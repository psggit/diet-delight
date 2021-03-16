import React from 'react'
import {Container } from './DietDataDetailsElements';

export default function Details(props){
  return(
    <Container>
    <h3 style={{fontSize:15,color:"white"}}>{props.data}</h3>
    <div style={{display:"flex",justifyContent:"space-evenly",width:"100%",marginTop:"5%"}}>
    <button style={{borderRadius:10,width:60,borderWidth:1.5,color:"white",borderColor:"white",backgroundColor:'transparent'}}>Male</button>
    <button style={{borderRadius:10,width:60,borderWidth:1.5,color:"white",borderColor:"white",backgroundColor:'transparent'}}>Female</button>
    </div>
    </Container>
  )
}
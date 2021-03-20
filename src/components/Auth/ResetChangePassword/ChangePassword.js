import React, { useState } from 'react';
import {Input, Button} from './ChangePasswordElement'
import axios from '../../../axiosInstance';



export default function ChangePassword(props){

    const[currentPassword, setCurrentPassword] = useState('');
    const[newPassword, setNewPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');


    const handlePasswordChange = () => {
        console.log(currentPassword)
        if(newPassword === confirmPassword){

            axios.post(`update-password`,{
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('access_token')}` 
                },
                old_password: currentPassword,
                new_password: newPassword
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    alert("Password Changed Successfully");
                    props.closeChangePassword()
                }
            })
        }
    }
    return(
        <div style={{backgroundColor:'#Fafafa', display:'flex', flexDirection:'column', width:'30%', height:'300px', alignItems:'center', justifyContent:'space-around', zIndex:7, boxShadow: '1px 3px 4px -2px rgb(61 61 61 / 66%)', position:'absolute', top:'40%', left:'35%'}}>
        <div className="icon_container_remove" style={{position:'absolute', top:'10px', right:'10px'}}>
            <i className="fa fa-times" onClick={() => props.closeChangePassword()}></i>
        </div>
        <Input type="password" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)}></Input>
        <Input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)}></Input>
        <Input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></Input>
        <Button onClick={() => handlePasswordChange()}>CHANGE PASSWORD</Button>
        </div>
    );
}
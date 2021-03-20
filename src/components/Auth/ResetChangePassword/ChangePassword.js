import React, { useState } from 'react';
import {Input, Button} from './ChangePasswordElement'
import axios from '../../../axiosInstance';
import './Changepwd.css'



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
        <div className="change_pwd_dialog_container">
        <div className="icon_container_remove" style={{position:'absolute', top:'10px', right:'10px'}}>
            <i className="fa fa-times" onClick={() => props.closeChangePassword()}></i>
        </div>
        <Input type="password" className="pwd_change" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)}></Input>
        <Input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)}></Input>
        <Input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></Input>
        <Button onClick={() => handlePasswordChange()}>CHANGE PASSWORD</Button>
        </div>
    );
}
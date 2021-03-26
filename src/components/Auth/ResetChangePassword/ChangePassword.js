import React, { useState, useEffect } from 'react';
import {Input, Button} from './ChangePasswordElement'
import axios from '../../../axiosInstance';
import './Changepwd.css'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';




export default function ChangePassword(props){

    const[currentPassword, setCurrentPassword] = useState('');
    const[newPassword, setNewPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[successErrorDialog,setSuccessErrorDialog] = useState(false);


    useEffect(() => {
        console.log(props.changePassword)
        if(props.changePassword){
            document.getElementById("oldPassword").style.visibility = "visible";
            document.getElementById("oldPassword").style.display = "block";
        }else{
            document.getElementById("oldPassword").style.visibility = "hidden";
            document.getElementById("oldPassword").style.display = "none";   
        }
    },[props.ChangePassword])


  

    const handlePasswordCheck = (e) => {
        var getMessageBox = document.getElementById('successErrorMessage');
        if(e.target.value === newPassword){
            getMessageBox.innerHTML = "";
            setConfirmPassword(e.target.value)
        }else{
            getMessageBox.innerHTML = "Password doesn't Matched";
        }

    }


    const handlePasswordChange = () => {
        console.log(currentPassword)
        var getMessageBox = document.getElementById('successErrorMessage');
        if(newPassword === confirmPassword){
            getMessageBox.innerHTML = "";
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
        }else{
            getMessageBox.innerHTML = "Password Mismatched"
        }
    }


    const handleNewPassword = () => {
        console.log("new password");
        var getMessageBox = document.getElementById('successErrorMessage');
        if(newPassword === confirmPassword){
            getMessageBox.innerHTML = "";
            axios.post(`reset-password`,{
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('access_token')}` 
                },
                username:props.email,
                firebase_uid: props.firebaseUid,
                new_password: newPassword
            }).then((res) => {
                console.log(res)
                if(res.status === 200){
                    // alert("Password Changed Successfully");
                    setSuccessErrorDialog(true)
                    setTimeout(() => {
                        setSuccessErrorDialog(false)
                        props.closeChangePassword()
                    },2000)
                }
            })
            .catch((err) => {
                setSuccessErrorDialog(true)
                console.log(err)
                document.getElementById("updatedMessage").innerHTML = "Something Didn't went as expected";
                setTimeout(() => {
                    setSuccessErrorDialog(false)
                    props.closeChangePassword()
                },2000)
            })
        }else{
            getMessageBox.innerHTML = "Password Mismatched"
        }

    }
    return(
        <>
        <div>
<Dialog
open={successErrorDialog}
style={{borderRadius:40}}
aria-labelledby="responsive-dialog-title">

<DialogTitle className="calender_dialog_bg_new" id="responsive-dialog-title">
<h3 style={{fontWeight:800}} id="updatedMessage">Password Updated SuccessFully</h3>
</DialogTitle>


</Dialog>
</div>
        <div className="change_pwd_dialog_container">
        <div className="icon_container_remove" style={{position:'absolute', top:'10px', right:'10px'}}>
            <i className="fa fa-times" onClick={() => props.closeChangePassword()}></i>
        </div>
        <Input type="password" id="oldPassword" className="pwd_change" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)}></Input>
        <Input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)}></Input>
        <Input type="password" placeholder="Confirm Password" onChange={(e) => {
            handlePasswordCheck(e);
        }}></Input>
        <span id="successErrorMessage"></span>
        <Button onClick={() => {
            if(props.ChangePassword){
                handlePasswordChange()
            }else{
                handleNewPassword()
            }
            }}>CHANGE PASSWORD</Button>
        </div>
        </>
    );
}
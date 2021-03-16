import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import './DialogSign.css'
import logo_img from '../../../assets/logoweb.png'

export default function OtpDialogBox(props) {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const [otp,setOtp] = useState('');
    const [disabled,setDisabled] = useState(false)
    
    // const handleOpenOtp = () => {
    //     setOpen(true);
    // };

    useEffect(() => {   
        if(otp.length > 6){
            setDisabled(true)
            console.log(otp)
        }
    },[otp])

    
    const handleCloseOtp = () => {
        props.handleOtpDialog();
    };

    const storeOtp = (value) => {
        if(value.length <= 6){
            setOtp(value)
        }
    }


    const verifyOtp = () => {
        var enteredOtp = parseInt(otp);

        props.handleVerification(otp)
        console.log(enteredOtp)
    }
    
    return (
        <div style={{zIndex:5}}>

        <Dialog
        open={open}
        onClose={handleCloseOtp}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle className="otp_bg" id="responsive-dialog-title">
        
        <div className="row dialog_signup_new">
        
        <div className="col-2">
        <i className="fa fa-long-arrow-left left_icon_dialog" aria-hidden="true"></i>
        </div>
        
        <div className="col-10">
        <div className="img_container_dialog">
        <img src={logo_img} className="logo_dialog_signup" alt="logo"></img>
        </div>
        </div>
        
        </div>
        
        
        <h6 className="your_phone_text">VERIFY YOUR PHONE NUMBER</h6>
        
        <h6 className="received_text">You would have received an otp on your phone...</h6>
        
        
        <h6 className="enter_otp_text">Enter OTP</h6>
        
        <div className="row justify-content-center" style={{width:'100%'}}>
        
        <input type="text" value={otp} placeholder="000000" required className="input_dialog_signup" id="num1" disabled={disabled} onChange={(e) => storeOtp(e.target.value)}></input>
        </div>
        
        <h6 className="resend_otp_text">Resend OTP</h6>
        
        <button className="btn verify_btn_dialog" onClick={() => verifyOtp()}>VERIFY</button>
        
        </DialogTitle>
        
        
        
        
        
        
        
        </Dialog>
        </div>
        );
    }
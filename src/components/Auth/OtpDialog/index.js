import React,{useState} from 'react';
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

export default function OtpDialog() {
    const [open, setOpen] = React.useState(true);
    const [otp,setOtp] = useState('');
    const [disabled,setDisabled] = useState(false)
    
    const handleOpenOtp = () => {
        setOpen(true);
    };
    
    const handleCloseOtp = () => {
        setOpen(false);
    };
    
    return (
        <div>
        
        <Button variant="outlined" color="primary" onClick={handleOpenOtp}>
        Open responsive dialog
        </Button>
        
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
        
        <div className="row justify-content-center">
        
        <input type="text" required  minlength="1" maxlength="1" className="input_dialog_signup" autofocus={autofocus} id="num1"></input>
        <input type="text" required  minlength="1" maxlength="1" className="input_dialog_signup" autofocus={autofocus} id="num2"></input>
        <input type="text" required  minlength="1" maxlength="1" className="input_dialog_signup" autofocus={autofocus} id="num3"></input>
        <input type="text" required  minlength="1" maxlength="1" className="input_dialog_signup" autofocus={autofocus} id="num4"></input>
        <input type="text" required  minlength="1" maxlength="1" className="input_dialog_signup" autofocus={autofocus} id="num5"></input>
        <input type="text" required  minlength="1" maxlength="1" className="input_dialog_signup" autofocus={autofocus} id="num6"></input>
        </div>
        
        <h6 className="resend_otp_text">Resend OTP</h6>
        
        <button className="btn verify_btn_dialog">VERIFY</button>
        
        </DialogTitle>
        
        
        
        
        
        
        
        </Dialog>
        </div>
        );
    }
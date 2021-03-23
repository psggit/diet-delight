/* global grecaptcha */

import React, { useEffect, useState, useRef } from 'react'
import { Image, Para, Line, Subheading } from '../../MainComponents'
import { Main, Input, Container, Route, Button, SetBg, RouteContainer} from './SignInElements'
import {IconBox,Section,Facebook,Google,} from '../Signup/SignupElements'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import dotenv from 'dotenv'

import axios from '../../../axiosInstance'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Cookies } from 'react-cookie'

import logo from '../../../assets/logo.png'
import ClientOAuth2 from 'client-oauth2'
import { SetTrue, login, selectUser } from '../../../features/userSlice'
import signInWithGoogle from '../SignInMethods/GoogleSignIn';
import signInWithFaceBook from '../SignInMethods/FaceBookSignIn';
import firebase from '../SignInMethods/firebaseConfig'
import logo_img from '../../../assets/logoweb.png'
import ChangePassword from "../ResetChangePassword/ChangePassword";


import '../Signin/Signin.css'



dotenv.config();

const Auth = new ClientOAuth2({
    clientId: process.env.REACT_APP_CLIENT_ID,
    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    accessTokenUri: process.env.REACT_APP_ACCESS_TOKEN_URL,
    authorizationUri: process.env.REACT_APP_AUTHORIZATION_URL,
    redirectUri: 'http://localhost:3000/',
})


const Signin = () => {
    
    const cookie = new Cookies();
    let history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    
    let getaccess = cookie.get('access_token')
    let getrefresh = cookie.get('refresh_token')
    
    const [err, setErr] = useState(false);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState({});

    let phoneNumber = useRef("");
    const [open, setOpen] = useState(false);
    const code = useRef("");
    const reCaptcha = useRef("");
    const [otp,setOtp] = useState('');
    const [otpDialog, setOtpDialog] = useState(false)
    const [mobileDialog, setMobileDialog] = useState(false)
    const [num1,setNum1] = useState("");
    const [num2,setNum2] = useState("");
    const [num3,setNum3] = useState("");
    const [num4,setNum4] = useState("");
    const [num5,setNum5] = useState("");
    const [num6,setNum6] = useState("");
    const [successErrorMessage, setSuccessErrorMessage] = useState('Account Created SuccessFully');
    const [toggleChangePassword, setToggleChangePassword] = useState(false);
    const [firebaseUid, setFirebaseUid] = useState("");



    var callingCountries = require('country-data').callingCodes;

    console.log(callingCountries)

    
    
    useEffect(() => {
        localStorage.setItem('access_token', token.access_token ? token.access_token : getaccess);
        localStorage.setItem('refresh_token', token.refresh_token ? token.refresh_token : getrefresh)
    }, [token, getaccess, getrefresh])

    useEffect(() => {
            renderCaptcha()
    }, [])


    const handleForgotPassword = () => {
        setMobileDialog(true)
    }


    const validateOnlyNumeric = (data) => {

        console.log(data)
        var numeric = '^[0-9]*$'
        if(data.match(numeric)){
            phoneNumber.current = data;
        }
    }


    const validateIfNumeric = (e, relatedTo) => {
        const data = e.target.value;
        console.log(data,relatedTo)
        var numeric = '^[0-9]*$'
        if(data.match(numeric)){
            if(relatedTo === 'num1'){
                console.log("hello num1")
                setNum1(data)
            }else if(relatedTo === 'num2'){ 
                setNum2(data)
            }else if(relatedTo === 'num3'){
                setNum3(data)
            }else if(relatedTo === 'num4'){
                setNum4(data)
            }else if(relatedTo === 'num5'){
                setNum5(data)
            }else{
                setNum6(data)
            }
        }

    }

    const phoneAuth = async () => {

        let number = code.current+phoneNumber.current;
        console.log(number)

    await firebase.auth().signInWithPhoneNumber(number, reCaptcha.current)
    .then((confirmationResult) => {
      console.log(window.confirmationResult)
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult)
      handleCodeByUser(confirmationResult)
    }).catch((error) => {
        console.log(error)
        // grecaptcha.reset('sign-in')
// Or, if you haven't stored the widget ID:
// window.recaptchaVerifier.render().then(function(widgetId) {
//   grecaptcha.reset(widgetId);
// })
    });
    }


    const handleCodeByUser = (confirmationResult) => {
        setMobileDialog(false)
        setOtpDialog(true)
        var captureButtonClick = document.getElementById('verifyOtp');
        captureButtonClick.onclick =  (e) => {
            console.log(e)
            var otpEnteredList = document.getElementsByClassName('input_dialog_signup');
            var otpEntered = '';
            for(var i=0; i<otpEnteredList.length; i++){
                console.log(otpEnteredList[i].value);
                otpEntered = otpEntered + otpEnteredList[i].value.toString();
            }
            console.log(otpEntered)
                    confirmationResult.confirm(otpEntered).then(async (result) => {
                    // User signed in successfully.
                    const user = result.user;
                    var errorMessage = document.getElementById('successErrorMessageForWrongOtp');
                    errorMessage.innerHTML = '';
                    console.log(user)
                    console.log(user.phoneNumber)
                    setFirebaseUid(user.uid)
                    setSuccessErrorMessage("Otp Verification Completed")
                    setTimeout(() => {
                        setOtpDialog(false)
                        setToggleChangePassword(true)
                    },1000)
                  }).catch((error) => {
                      console.log(error)
                      var errorMessage = document.getElementById('successErrorMessageForWrongOtp');
                      errorMessage.innerHTML = 'Invalid Otp Please try Again'
                  });
        }

        // return otpEntered;
    }





    const renderCaptcha = () => {
        firebase.auth().languageCode = 'en';
        let recaptcha = new firebase.auth.RecaptchaVerifier('sign-in-btn', {
            'size': 'invisible',
            'callback': (response) => {
                this.phoneAuth();
                this.resendOtp();
                console.log(response)
            }
          });
          console.log(recaptcha)
        reCaptcha.current = recaptcha;
          
        console.log("Phone auth")
    }




    const handleSignIn = (token, user) => {
        console.log(token,user)
        console.log(user.email)
        setEmail(user.email)
        setPassword('DietDelight@123ForEnigmaty');
        handleLogin()
    }


    const renderCountryCode = callingCountries.all.map((option) => {
        return(
        <option key={Math.random()} value={option}>{option}</option>)
    });
    
    
    const handleLogin = () => {
        
        Auth.owner.getToken(email, password).then(
            (res) => {
                console.log(res.data)
                setToken(res.data)
                setErr(false)
                cookie.set('access_token', res.data.access_token, {
                    path: '/',
                    maxAge: res.data.expires_in
                })
                cookie.set('refresh_token', res.data.refresh_token, {
                    path: '/',
                    maxAge: res.data.expires_in
                })
                if (email === process.env.REACT_APP_ADMIN) {
                    dispatch(SetTrue())
                    localStorage.setItem('isAdmin', true);
                    history.push("/admin")
                } else {
                    axios.get('user', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    }).then((res) => {
                        console.log(res.data)
                        dispatch(login({
                            id: res.data.id,
                            name: res.data.name,
                            email: res.data.email,
                            mobile: res.data.mobile,
                            first_name: res.data.first_name,
                            last_name: res.data.last_name,
                            roles:res.data.roles['0']
                        }))
                        if(res.data.roles['0'].name === 'Consultant'){
                            history.push('/consultant')
                        }else if(res.data.roles['0'].name === 'Kitchen'){
                            history.push("/kitchen")
                        }else if(res.data.roles['0'].name === 'Accountant'){
                            history.push("/Accountant")
                        }else{
                            history.push("/")
                        }
                    }).catch((err) => console.log(err))
                }
            }
            ).catch((err) => {
                console.log(err)
                setErr(true)
            })
            
        }

        const closeChangePassword = () => {
            console.log("handled update");
            setToggleChangePassword(false);
          };

        const resendOtp = () => {
            // window.recaptchaVerifier.render().then(function(widgetId) {
            //     grecaptcha.reset(widgetId);
            //   })
            phoneAuth();
        }
        
        
        const handleSearch = (e) => {
            console.log("Clicked for the user get")
        }

        const handleCloseOtp = () => {
            // props.handleOtpDialog();
        }
        
        return (
            <>
             <div style={{zIndex:5}}>

<Dialog
open={otpDialog}
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
        <input type="text" required value={num1}  minlength="1" maxlength="1" className="input_dialog_signup"  id="num1" onInput={(e) => validateIfNumeric(e, 'num1')} autofocus></input>
        <input type="text" required value={num2}  minlength="1" maxlength="1" className="input_dialog_signup"  id="num2" onInput={(e) => validateIfNumeric(e, 'num2')}></input>
        <input type="text" required value={num3}  minlength="1" maxlength="1" className="input_dialog_signup"  id="num3" onInput={(e) => validateIfNumeric(e, 'num3')}></input>
        <input type="text" required value={num4}  minlength="1" maxlength="1" className="input_dialog_signup"  id="num4" onInput={(e) => validateIfNumeric(e, 'num4')}></input>
        <input type="text" required value={num5}  minlength="1" maxlength="1" className="input_dialog_signup"  id="num5" onInput={(e) => validateIfNumeric(e, 'num5')}></input>
        <input type="text" required value={num6}  minlength="1" maxlength="1" className="input_dialog_signup"  id="num6" onInput={(e) => validateIfNumeric(e, 'num6')}></input>
</div>
<span id="successErrorMessageForWrongOtp" style={{color:'red', fontWeight:800}}></span>

<h6 className="resend_otp_text" onClick = {() => resendOtp()}>Resend OTP</h6>

<button className="btn verify_btn_dialog" id="verifyOtp" >VERIFY</button>

</DialogTitle>







</Dialog>
</div>


<div style={{zIndex:5}}>

<Dialog
open={mobileDialog}
onClose={handleCloseOtp}
style={{borderRadius:40}}
aria-labelledby="responsive-dialog-title">

<DialogTitle className="calender_dialog_bg_new" id="responsive-dialog-title">

<div className="row mobile_dialog_container">

<div className="col-md-2 col-2">

<select className="select_mobile_no_dialog" name="country" id="country"
onChange={(e) => {
    e.preventDefault()
    console.log(e.target.value)
    code.current = e.target.value
}}>
{renderCountryCode}
</select>
</div>

<div className="col-md-10 col-10">

<input type="text" className="mobile_number_input_dialog" onChange={(e) => validateOnlyNumeric(e.target.value)}></input>

</div>
<br/>
{/* <div className="col-md-2 col-2">
    <label for="email" style={{color:'#6e9a34'}}>Email:</label>
</div> */}

<div className="col-md-12 col-12" id="emailForUpdatePassword" >
<input placeholder="Enter Email Address" type="email" value={email} className="mobile_number_input_dialog"  onChange={(e) => setEmail(e.target.value)}></input>
</div>

</div>

<div className="btn_container_mobile_dialog">
    <Button 
 onClick={(e) => {
                            e.preventDefault()
                            // phoneAuth();
                            phoneAuth()
                        }} >
                        SIGN IN
                        </Button>
</div>


</DialogTitle>


</Dialog>
</div>
{toggleChangePassword && (
        <ChangePassword closeChangePassword={closeChangePassword} email={email} firebaseUid={firebaseUid}/>
      )}
            <Main>
            <Route to="/">
            <Image src={logo} alt="logo" height="80px" mar="10px 0 0 0" />
            </Route>
            {user?.id ?
                (<>
                    <Para color="red" size="2rem" weight="700" >
                    Already Logged IN
                    </Para>
                    <Button onClick={() => {
                        history.push("/")
                    }}>GO Back</Button>
                    </>) : (<>
                        <RouteContainer>
                        <Route to="/signin">
                        <Subheading weight="600" pad="0" color="rgba(137,197,63,1)" >
                        SIGN IN
                        </Subheading>
                        <Line back="rgba(137,197,63,1)" top="0" height="3px" />
                        </Route>
                        <Route opacity="0.7" to="/signup">
                        <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                        SIGN UP
                        </Subheading>
                        </Route>
                        </RouteContainer>
                        <SetBg>
                        <Container>
                        <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                        EMAIL / PHONE
                        </Para>
                        <Input value={email} type="text"
                        placeholder="Enter Email/ Phone"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                        ENTER PASSWORD
                        </Para>
                        <Input type="password" placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Para color="rgba(137,197,63,1)" size="0.9rem" weight="700" align="end" cursor="pointer"
                        onClick={handleForgotPassword}
                        >
                        Forgot password ?
                        </Para>
                        {err && (<Para color="red" size="0.9rem" weight="700">
                        Email or Password is Wrong !
                        </Para>)}
                        
                        <Button id="sign-in-btn" onClick={(e) => {
                            e.preventDefault()
                            // phoneAuth();
                            handleLogin()
                        }} >
                        SIGN IN
                        </Button>
                        
                        <Section width="auto">
                        <Line back="rgba(137,197,63,1)" height="1px" />
                        <Para width="30px" color="rgba(137,197,63,1)" size="0.8rem" weight="700">
                        OR
                        </Para>
                        <Line back="rgba(137,197,63,1)" height="1px" />
                        </Section>
                        
                        <Section>
                        <IconBox back="darkblue" onClick={() => signInWithFaceBook(handleSignIn)}>
                        <Facebook />
                        </IconBox>
                        <IconBox back="red">
                        <Google onClick={() => signInWithGoogle(handleSignIn)}/>
                        </IconBox>
                        </Section>
                        </Container>
                        </SetBg>
                        </>)}
                        </Main>
                        </>
                        )
                    }
                    
                    export default Signin
                    
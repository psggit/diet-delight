import React, { useState, forwardRef, useEffect, useMemo, useRef } from 'react'
import { Main, Route, Container, Section, Phone, Input, Facebook, Google, IconBox, CustomButton, SetBg, RouteContainer } from './SignupElements'

import { useHistory } from 'react-router-dom'

import axios from '../../../axiosInstance'
import { Cookies } from 'react-cookie'

import signInWithGoogle from '../SignInMethods/GoogleSignIn';
import signInWithFaceBook from '../SignInMethods/FaceBookSignIn';


import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core'

import { Formik } from 'formik'

import * as Yup from 'yup'

import logo from '../../../assets/logo.png'
import { Image, Para, Line, Subheading } from '../../MainComponents'
import { useDispatch } from 'react-redux'
import { setNew } from '../../../features/userSlice'
import countryList from 'react-select-country-list'
import OtpDialog from '../OtpDialog'
import firebase from '../SignInMethods/firebaseConfig'



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    let cookie = new Cookies();
    var callingCountries = require('country-data').callingCodes;
    console.log(callingCountries)
    console.log(typeof(callingCountries))
    const options = useMemo(() => countryList().getValues (), [])
    const [otpDialog, setOtpDialog] = useState(false)
    const [phone, setPhone] = useState('');

    
    const [open, setOpen] = useState(false);
    const code = useRef("");
    
    const [token, setToken] = useState({});
    const [successErrorMessage, setSuccessErrorMessage] = useState('Account Created SuccessFully');
    const [verificationCode, setVerificationCode] = useState('');
    
    useEffect(() => {
        localStorage.setItem('access_token', token.access_token ? token.access_token : '');
        localStorage.setItem('refresh_token', token.refresh_token ? token.refresh_token : '')
    }, [token])


    const handleOtpDialog = () => {
        otpDialog === true ? setOtpDialog(false) : setOtpDialog(true)
    }

    const handleVerification = (code) => {
        setVerificationCode(code)
    }
    
    
    const ValidateSchema = Yup.object().shape({
        fname: Yup.string().required().label("First Name"),
        lname: Yup.string().required().label("Last Name"),
        phone: Yup.number().required().label("Phone"),
        email: Yup.string().required().email().label("Email"),
        password: Yup.string().required().min(6).label("Password"),
    })  
    
    const handleClose = () => {
        setOpen(false);
        dispatch(setNew())
        history.push("/")
    };

    useEffect(() => {
        console.log(code.current)
    }, [code.current])


    // useEffect(() => {
    //     renderCaptcha()
    // }, [])



    const renderCaptcha = () => {
        firebase.auth().languageCode = 'en';
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        let number = code.current+phone;
        console.log(number)

    firebase.auth().signInWithPhoneNumber(number, recaptcha)
    .then(() => {

      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      // ...
      window.confirmationResult = verificationCode;
    }).catch((error) => {
        console.log(error)
      // Error; SMS not sent
      // ...
    });
    }


    const phoneAuth = () => {
        renderCaptcha();
        console.log("Phone auth")
        setOtpDialog(true)
    }
    
    
    const handleSignUp = (token, user) => {
        
        console.log("from handle sign up",token,user)
        
        console.log("called handle signup")
        var fullName = user.displayName
        var nameArray = fullName.split(" ");
        var fname = nameArray[0];
        var lname = nameArray[1];
        var email = user.email;
        var password = 'DietDelight@123ForEnigmaty';
        var firebase_uid = user.uid;
        var phone = null
        console.log(fname,lname,fullName, nameArray)
        var values = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            firebase_uid: firebase_uid,
            phone:phone,
            check:password
        }
        
        handleRegistration(values);
        
        
    }
    
    
    const handleRegistration = (values) => {
        console.log("called registration")
        
        if (values.check === values.password) {
            
            let combine = values.phone === null ? null : code.current + " " + values.phone;
            let Name = values.fname + " " + values.lname;
            let firebase_uid = values.firebase_uid;
            
            axios.post('register', {
                name: Name,
                email: values.email,
                password: values.password,
                first_name: values.fname,
                last_name: values.lname,
                mobile: combine,
                firebase_uid:firebase_uid,
            }).then(
                (res) => {
                    console.log(res)
                    setToken(res.data)
                    cookie.set('access_token', res.data.access_token, {
                        path: '/',
                        maxAge: res.data.expires_in
                    })
                    setOpen(true)
                }
                ).catch(
                    err => {console.log(err)
                        setSuccessErrorMessage("Failed To Create Account!! Please try Again.....")
                        setOpen(true)
                    }
                    )
                    
                }
                
            }


            const renderCountryCode = callingCountries.all.map((option) => {
                return(
                <option key={Math.random()} value={option}>{option}</option>)
            });
                        
            
            return (
                <>
                {otpDialog && <OtpDialog handleOtpDialog={handleOtpDialog} handleVerification = {handleVerification}/>}
                <Main>
                <Route to="/">
                <Image src={logo} alt="logo" height="80px" mar="10px 0 0 0" />
                </Route>
                <RouteContainer>
                <Route opacity="0.7" to="/signin">
                <Subheading weight="600" pad="0" color="rgba(137,197,63,1)" >
                SIGN IN
                </Subheading>
                </Route>
                <Route to="/signup">
                <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                SIGN UP
                </Subheading>
                <Line back="rgba(137,197,63,1)" top="0" height="3px" />
                </Route>
                </RouteContainer>
                <SetBg>
                <Container>
                
                <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">{"Diet Delight!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                {successErrorMessage}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                OK
                </Button>
                </DialogActions>
                </Dialog>
                
                <Formik
                initialValues={
                    {
                        phone: '',
                        fname: '',
                        lname: '',
                        email: '',
                        password: '',
                        check: '',
                        firebase_uid:0,
                    }}
                    
                    onSubmit={(values) => {
                        handleRegistration(values)
                    }}
                    validationSchema={ValidateSchema}
                    >
                    
                    {({ handleChange, handleSubmit, errors, touched }) => (
                        <>
                        <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                        PHONE NUMBER
                        </Para>
                        <Section width="auto">
                        <select name="country" id="country"
                        onChange={(e) => {
                            e.preventDefault()
                            console.log(e.target.value)
                            code.current = e.target.value
                            }}
                        >
                            {renderCountryCode}
                        </select>
                        <Phone
                        type="text"
                        placeholder="Enter Phone Number"
                        onChange={(e) => {
                            e.preventDefault()
                            setPhone(e.target.value)
                            handleChange("phone")}}
                        />
                        </Section>
                        <span style={{color:'green', cursor:"pointer"}} onClick={() => phoneAuth()}>Verify Phone Number</span>
                        <Section id='recaptcha-container'>

                        </Section>
                        {errors.phone && touched.phone ?
                            (<Para color="red" size="0.8rem" weight="700">{errors.phone} </Para>)
                            : null}
                            <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none" top="0">
                            FIRST NAME
                            </Para>
                            <Input
                            type="text"
                            placeholder="Enter First Name"
                            onChange={handleChange("fname")}
                            />
                            {errors.fname && touched.fname ?
                                (<Para color="red" size="0.8rem" weight="700">{errors.fname} </Para>)
                                : null}
                                <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                LAST NAME
                                </Para>
                                <Input
                                type="text"
                                placeholder="Enter Last Name"
                                onChange={handleChange("lname")}
                                />
                                {errors.lname && touched.lname ?
                                    (<Para color="red" size="0.8rem" weight="700">{errors.lname} </Para>)
                                    : null}
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                    EMAIL ADDRESS
                                    </Para>
                                    <Input
                                    type="email"
                                    placeholder="Enter Email "
                                    onChange={handleChange("email")}
                                    />
                                    {errors.email && touched.email ?
                                        (<Para color="red" size="0.8rem" weight="700">{errors.email} </Para>)
                                        : null}
                                        <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                        PASSWORD
                                        </Para>
                                        <Input
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={handleChange("password")}
                                        />
                                        {errors.password && touched.password ?
                                            (<Para color="red" size="0.8rem" weight="700">{errors.password} </Para>)
                                            : null}
                                            <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                            CONFIRM PASSWORD
                                            </Para>
                                            <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={handleChange("check")}
                                            />
                                            
                                            <Section width="auto">
                                            <Line back="rgba(137,197,63,1)" height="1px" />
                                            <Para width="30px" color="rgba(137,197,63,1)" size="0.8rem" weight="700">
                                            OR
                                            </Para>
                                            <Line back="rgba(137,197,63,1)" height="1px" />
                                            </Section>
                                            <Section>
                                            <IconBox back="darkblue" onClick={() => signInWithFaceBook(handleSignUp)}>
                                            <Facebook />
                                            </IconBox>
                                            <IconBox back="red" onClick={() => signInWithGoogle(handleSignUp)}>
                                            <Google />
                                            </IconBox>
                                            </Section>
                                            <CustomButton type="submit" onClick={handleSubmit}>
                                            SIGN UP
                                            </CustomButton>
                                            
                                            </>
                                            )}
                                            
                                            </Formik>
                                            </Container>
                                            </SetBg>
                                            </Main>
                                            </>
                                            )
                                        }
                                        
                                        export default Signup
                                        
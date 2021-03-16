import React, { useEffect, useState } from 'react'
import { Image, Para, Line, Subheading } from '../../MainComponents'
import { Main, Input, Container, Route, Button, SetBg, RouteContainer} from './SignInElements'
import {IconBox,Section,Facebook,Google,} from '../Signup/SignupElements'

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
    
    
    useEffect(() => {
        localStorage.setItem('access_token', token.access_token ? token.access_token : getaccess);
        localStorage.setItem('refresh_token', token.refresh_token ? token.refresh_token : getrefresh)
    }, [token, getaccess, getrefresh])

    const handleSignIn = (token, user) => {
        console.log(token,user)
        console.log(user.email)
        setEmail(user.email)
        setPassword('DietDelight@123ForEnigmaty');
        handleLogin()
    }
    
    
    const handleLogin = () => {
        
        Auth.owner.getToken(email, password).then(
            (res) => {
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
        
        
        const handleSearch = (e) => {
            console.log("Clicked for the user get")
        }
        
        return (
            <>
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
                        <Para color="rgba(137,197,63,1)" size="0.9rem" weight="700" align="end"
                        onClick={handleSearch}
                        >
                        Forgot password ?
                        </Para>
                        {err && (<Para color="red" size="0.9rem" weight="700">
                        Email or Password is Wrong !
                        </Para>)}
                        
                        <Button onClick={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}>
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
                    
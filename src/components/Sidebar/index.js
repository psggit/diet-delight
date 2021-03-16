import React from 'react'
import { CloseIcon, Icon, SidebarContainer, SidebarWrapper, SidebarR, SidebarS, SidebarGroup, Route } from './SidebarElement'

import { animateScroll as scroll } from 'react-scroll'

import axios from '../../axiosInstance'

import { useHistory } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import { selectUser, logout } from '../../features/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { resetToken } from '../../features/tokenSlice'





const Sidebar = ({ isOpen, toggle }) => {
    const handletoggle = () => {
        scroll.scrollToTop({
            spy: true,
            smooth: true,
            duration: 200
        });
        toggle();
    }

    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    const cookie = new Cookies()
    let history = useHistory();


    const handleLogout = () => {
        localStorage.clear();
        cookie.remove("access_token")
        dispatch(resetToken())
        dispatch(logout());
        axios.get('logout').catch(err => console.log(err))
        history.push('/')
    }

    return (

        <>
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon>
                    <CloseIcon onClick={toggle} />
                </Icon>

                <SidebarWrapper>
                    <SidebarS
                        onClick={handletoggle}
                        to="home"
                    >
                        Home
                    </SidebarS>
                    {user ? (<Route
                        to="/profile">
                        Profile
                    </Route>) : null}
                    <SidebarS
                        to="menu"
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={200}
                        onClick={toggle}
                    >
                        Menu
                    </SidebarS>
                    <SidebarS
                        to="plan"
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={200}
                        onClick={toggle}>
                        
                    </SidebarS>
                    <SidebarS
                        to="expert"
                        spy={true}
                        smooth={true}
                        offset={-80}
                        duration={200}
                        onClick={toggle}>
                        Consulting
                    </SidebarS>
                    {user ?
                        (<>

                            <button
                                style={{
                                    color: "purple",
                                    height: "35px",
                                    fontSize: "1.2rem",
                                    fontWeight: "bold",
                                    width: "100px",
                                    borderRadius: "10px",
                                    border: "1px solid purple",
                                    marginTop: "15px",
                                    textDecoration:'none',
                                }}

                                onClick={handleLogout}

                            >Logout</button>

                        </>) : (<>
                            <SidebarGroup>
                                <SidebarR to="/signin">
                                    Sign in
                            </SidebarR>
                                <SidebarR to="/signup">
                                    Sign up
                            </SidebarR>
                            </SidebarGroup>
                        </>)}
                </SidebarWrapper>
            </SidebarContainer>
        </>
    )
}

export default Sidebar

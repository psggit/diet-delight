import React, { useState } from 'react'
import NavDrawer from '../Navdrawer'
import ListofConsultation from '../Admin/Consultations/ListofConsultation'
import MyConsultation from '../Admin/Consultations/MyConsultations'
import PostConsultation from '../Admin/Consultations/PostConsultation'
import { Icon } from "@material-ui/core";

import { elastic as Menu } from 'react-burger-menu'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import logo from '../../assets/logo.png'
import '../Admin/CustomDrawer.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import CustomNavList from '../Admin/components/CustomNavList'
import Collapse from '@material-ui/core/Collapse'

import axios from '../../axiosInstance'

import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

import { SetFalse, SetTrue } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
import ListItemText from '@material-ui/core/ListItemText'

import styled from 'styled-components'
import { Cookies } from 'react-cookie'

const HeaderLogo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;

  &:focus {
    outline: none;
  }
`

const LogoutContainer = styled.div`
  position: absolute;
  bottom: 16px;
  cursor: pointer;
`

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: '#800080',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#800080',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
}

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  notificationContent: {
    minWidth: 375,
  },
  notificationIconContent: {
    position: 'fixed',
    top: 36,
    right: 36,
    zIndex: 1000,
  },
  pageIcons: {
    color: '#800080',
    fontSize: 36,
    cursor: 'pointer'
  }
}))

const menuItems = [
  { showText: 'Dashboard', connectedLink: 'allConsultants' },
  { showText: 'My Consultations', connectedLink: 'allConsultants' },
  { showText: 'All Consultations', connectedLink: 'allConsultants' },
  { showText: 'Notifications', connectedLink: 'allConsultants' },
]

export default function Consultant() {
  const [listOfConsultation, setListOfConsultation] = useState(true)
  const [addNewConsultation, setNewConsultation] = useState(false)

  let history = useHistory()
  const dispatch = useDispatch()
  const cookie = new Cookies()

  const classes = useStyles()

  const handleLogout = (e) => {
    e.preventDefault()

    axios
      .get('logout')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    dispatch(SetFalse())
    cookie.remove('access_token')
    localStorage.clear()
    history.push('/')
  }

  const handleDrawer = (data) => {
    if (data === 'allConsultants') {
      setListOfConsultation(true)
      setNewConsultation(false)
    } else {
      setNewConsultation(true)
      setListOfConsultation(false)
    }
  }

  const navList = [
    { label: 'Dashboard', name: 'dashboard' },
    { label: 'My Consultations', name: 'myConsultants' },
    { label: 'All Consultations', name: 'allConsultants' },
  ]

  return (
    <>
      {/* <NavDrawer drawerItems={menuItems} handleDrawer={handleDrawer} /> */}
      <div id="outer-container">
        <Menu
          className="app-drawer"
          styles={styles}
          pageWrapId={'page-wrap'}
          outerContainerId={'outer-container'}
        >
          <div>
            <List color="primary">
              <ListItem
                button
                component={Link}
                to={'/admin'}
                style={{ marginBottom: '32px' }}
              >
                <HeaderLogo style={{ display: 'flex' }}>
                  <img
                    style={{
                      objectFit: 'contain',
                      height: '75px',
                      alignSelf: 'center',
                      margin: 'auto',
                    }}
                    src={logo}
                    alt="logo"
                  />
                </HeaderLogo>
              </ListItem>
            </List>
            <Collapse in={true} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {navList.map((value, index) => (
                  <ListItem
                    key={index}
                    button
                    className={classes.nested}
                    onClick={() => {
                      handleDrawer(value.name)
                    }}
                  >
                    <ListItemText primary={value.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        </Menu>
        <main
          id="page-wrap"
          style={{ width: '100%', padding: '16px 32px 0 32px' }}
        >
          <div className={classes.drawerHeader} >
            <div className={classes.notificationIconContent}>
              <Icon
                id="notification-icon"
                className={classes.pageIcons}
              //onClick={({ currentTarget }) => setNoticationIconrRef(currentTarget)}
              >
                notifications
                </Icon>
              <Icon
                className={classes.pageIcons}
                onClick={handleLogout}
                style={{ marginLeft: 16 }}
              >
                exit_to_app
                </Icon>
            </div>
          </div>
        </main>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {listOfConsultation && <ListofConsultation />}
        {addNewConsultation && <MyConsultation />}
      </div>
    </>
  )
}

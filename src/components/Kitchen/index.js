import React, { useState, useEffect } from 'react'
import NavDrawer from '../Navdrawer'
import axios from '../../axiosInstance'
import { elastic as Menu } from 'react-burger-menu'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import logo from '../../assets/logo.png'
import '../Admin/CustomDrawer.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import CustomNavList from '../Admin/components/CustomNavList'
import Collapse from '@material-ui/core/Collapse'
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
}))

export default function Kitchen() {
  let history = useHistory()
  const dispatch = useDispatch()
  const cookie = new Cookies()

  const classes = useStyles()

  const [navList, setNavList] = useState([])

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
    if (data === 'dashboard') {
      console.log('true')
    } else {
      axios.get(`menus/${data}`).then((res) => {
        console.log(res.data.data)
        // setNavList(
        //   (res?.data?.data || []).map((user) => {
        //     return {
        //       id: user.id,
        //       name: user.name,
        //       label: user.name,
        //     }
        //   }),
        // )
      })
    }
  }
  const handleMenu = () => {
    axios.get(`menus`).then((res) => {
      console.log(res.data.data)
      setNavList(
        (res?.data?.data || []).map((user) => {
          return {
            id: user.id,
            name: user.name,
            label: user.name,
          }
        }),
      )
    })
  }

  useEffect(() => {
    handleMenu()
  }, [])

  return (
    <>
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
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    handleDrawer('dashboard')
                  }}
                >
                  <ListItemText primary="Dashboard" />
                </ListItem>
                {navList &&
                  navList.map((value, index) => (
                    <ListItem
                      key={index}
                      button
                      className={classes.nested}
                      onClick={() => {
                        handleDrawer(value.id)
                      }}
                    >
                      <ListItemText primary={value.label} />
                    </ListItem>
                  ))}
              </List>
            </Collapse>
            <LogoutContainer onClick={handleLogout}>
              <AccountCircleIcon
                style={{ fontSize: '56px', margin: '0 12px' }}
              />
              <span>LOGOUT</span>
            </LogoutContainer>
          </div>
        </Menu>
      </div>
      {/* <NavDrawer
        drawerItems={[
          { showText: 'All Consultations', connectedLink: 'allConsultants' },
          {
            showText: 'Add New Consultation',
            connectedLink: 'addNewConsultant',
          },
        ]}
        handleDrawer={handleDrawer}
      /> */}
      <h1>"From Kitchen"</h1>
    </>
  )
}

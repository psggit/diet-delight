import React from 'react'
import './NavdrawerMain.css'
import { useDispatch } from 'react-redux'
import { SetFalse, logout } from '../../features/userSlice'
import { useHistory } from 'react-router-dom'
import { Cookies } from 'react-cookie'
import axios from '../../axiosInstance'
import { resetToken } from '../../features/tokenSlice'

export default function NavdrawerMain(props) {
  const dispatch = useDispatch()
  const cookie = new Cookies()
  let history = useHistory()

  function openNav(e) {
    console.log('The link was clicked.')
    document.getElementById('mySidenav').style.width = '250px'
    document.getElementById('root').style.marginLeft = '250px'
  }

  function closeNav() {
    document.getElementById('mySidenav').style.width = '0'
    document.getElementById('root').style.marginLeft = '0'
  }

  const handleLogout = (e) => {
    localStorage.clear()
    cookie.remove('access_token')
    cookie.remove('refresh_token')
    dispatch(resetToken())
    dispatch(logout())
    axios.get('logout').catch((err) => console.log(err))
    history.push('/')
  }

  const renderDrawerElements = props.drawerItems.map((item) => {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          background: '#fbfbfb',
          marginBottom: '6%',
          cursor: 'pointer',
        }}
        key={Math.random()}
      >
        <span onClick={() => props.handleDrawer(item.connectedLink)}>
          {item.showText}
        </span>
      </div>
    )
  })

  return (
    <div id="main">
      <div id="mySidenav" className="sidenav">
        <a href="#" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <div style={{ height: '85vh', paddingLeft: '30px' }}>
          {renderDrawerElements}
        </div>
        <span
          style={{
            fontSize: '20px',
            paddingLeft: '30px',
            cursor: 'pointer',
          }}
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>

      <div className="topnav">
        <span
          style={{
            fontSize: 30,
            cursor: 'pointer',
            color: '#fff',
            margin: '1%',
          }}
          onClick={openNav}
        >
          &#9776;
        </span>

        {/* <span
          style={{
            position: 'absolute',
            right: '2%',
            color: '#fff',
            fontSize: '30px',
            cursor: 'pointer',
          }}
          onClick={handleLogout}
        >
          Logout
        </span> */}
      </div>
    </div>
  )
}
